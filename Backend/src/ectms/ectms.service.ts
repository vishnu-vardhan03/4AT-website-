import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt, randomUUID, scryptSync, timingSafeEqual } from 'crypto';
import { Repository } from 'typeorm';
import { EctmsRecord, EctmsRecordType } from './ectms-record.entity';

const textValue = (value: unknown): string => typeof value === 'string' || typeof value === 'number' ? String(value) : '';
const numberValue = (value: unknown, fallback = 0): number => { const parsed = Number(value); return Number.isFinite(parsed) ? parsed : fallback; };
const radians = (degrees: number) => degrees * Math.PI / 180;
const distanceKm = (aLat: number, aLon: number, bLat: number, bLon: number) => {
  const dLat = radians(bLat - aLat), dLon = radians(bLon - aLon);
  const value = Math.sin(dLat / 2) ** 2 + Math.cos(radians(aLat)) * Math.cos(radians(bLat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
};

@Injectable()
export class EctmsService {
  constructor(@InjectRepository(EctmsRecord) private readonly records: Repository<EctmsRecord>) {}

  async snapshot(email: string, role: string) {
    const all = await this.records.find({ order: { updatedAt: 'DESC' } });
    const employee = all.find((r) => r.recordType === 'employee' && r.ownerEmail === email);
    const zone = textValue(employee?.data.zone);
    const visible = role === 'technician' || role === 'finance'
      ? all
      : role === 'nodal'
        ? all.filter((r) => !zone || !r.data.zone || textValue(r.data.zone) === zone)
        : all.filter((r) => {
          if (role === 'driver') return r.recordType === 'booking' && textValue(r.data.driverPhone) === email;
          if (r.recordType === 'booking') return r.ownerEmail === email;
          if (r.recordType === 'driver') {
            const employeeDriverPhones = all.filter((item) => item.recordType === 'booking' && item.ownerEmail === email).map((item) => textValue(item.data.driverPhone)).filter(Boolean);
            return employeeDriverPhones.includes(textValue(r.data.phone));
          }
          return ['bill', 'feedback', 'notification', 'employee'].includes(r.recordType) && r.ownerEmail === email;
        });
    const safeVisible = visible.map((record) => record.recordType === 'driver' ? { ...record, data: { ...record.data, pinHash: undefined, pinSalt: undefined } } : record);
    const bookings = safeVisible.filter((r) => r.recordType === 'booking');
    const completed = bookings.filter((r) => r.data.status === 'Completed');
    const analytics = {
      booked: bookings.length,
      boarded: bookings.filter((r) => r.data.status === 'Boarded' || r.data.status === 'Completed').length,
      noShows: bookings.filter((r) => r.data.status === 'No-Show').length,
      utilisationPercent: bookings.length ? Math.round((completed.length / bookings.length) * 100) : 0,
      kilometres: completed.reduce((sum, r) => sum + numberValue(r.data.kilometres), 0),
      cost: completed.reduce((sum, r) => sum + numberValue(r.data.cost), 0),
    };
    return { records: safeVisible, analytics, serverTime: new Date().toISOString(), role };
  }

  async createBooking(email: string, body: Record<string, unknown>) {
    for (const field of ['tripDate', 'shift', 'tripType', 'pickupPoint']) if (!textValue(body[field]).trim()) throw new BadRequestException(`${field} is required`);
    const tripDate = new Date(textValue(body.tripDate));
    if (Number.isNaN(tripDate.getTime())) throw new BadRequestException('Choose a valid trip date');
    const employee = await this.records.findOne({ where: { recordType: 'employee', ownerEmail: email } });
    const hrmsStatus = textValue(employee?.data.hrmsStatus || body.hrmsStatus || 'Active');
    if (['Leave', 'WFH', 'Inactive'].includes(hrmsStatus)) throw new BadRequestException(`CAB booking is blocked because HRMS status is ${hrmsStatus}`);
    const settings = await this.records.findOne({ where: { recordType: 'settings' } });
    const cutoffHours = numberValue(settings?.data.cutoffHours, 2);
    const shiftMatch = textValue(body.shift).match(/(\d{2}):(\d{2})/);
    if (shiftMatch) {
      const shiftStart = new Date(`${textValue(body.tripDate)}T${shiftMatch[1]}:${shiftMatch[2]}:00+05:30`);
      if (Date.now() > shiftStart.getTime() - cutoffHours * 3600000 && body.adminOverride !== true) throw new BadRequestException(`Booking cut-off is ${cutoffHours} hours before shift start`);
    }
    const existing = await this.records.find({ where: { recordType: 'booking', ownerEmail: email } });
    if (existing.some((r) => r.data.tripDate === body.tripDate && r.data.tripType === body.tripType && r.data.status !== 'Cancelled')) throw new BadRequestException('A booking already exists for this trip');
    const otp = String(randomInt(100000, 1000000));
    const shiftHour = shiftMatch ? Number(shiftMatch[1]) : 9, lateNight = shiftHour >= 20 || shiftHour < 6;
    const booking = await this.records.save(this.records.create({ recordType: 'booking', ownerEmail: email, data: { ...body, employeeName: employee?.data.name || email.split('@')[0], employeeId: employee?.data.employeeId || '', department: employee?.data.department || '', zone: employee?.data.zone || body.zone || 'Unassigned', genderFlag: employee?.data.genderFlag || '', emergencyContact: employee?.data.emergencyContact || '', bookingCode: `CAB-${Date.now().toString(36).toUpperCase()}`, status: 'Booked', otp, otpVerified: false, shareToken: randomUUID(), recurring: body.recurring === true || body.recurring === 'true', weeklyConfirmedAt: new Date().toISOString(), lateNight, escortRequired: lateNight, escortStatus: lateNight ? 'Pending assignment' : 'Not required', bookedAt: new Date().toISOString() } }));
    await this.notify(email, 'Booking confirmed', `${textValue(booking.data.bookingCode)} is confirmed for ${textValue(body.tripDate)}.`, ['in-app', 'email', 'sms', 'push'], booking.id);
    await this.audit(email, 'booking-created', booking.id, booking.data);
    return booking;
  }

  async createDriver(body: Record<string, unknown>) {
    const name = textValue(body.name).trim(), phone = textValue(body.phone).replace(/\D/g, ''), license = textValue(body.license).toUpperCase().replace(/[\s-]/g, '');
    if (name.length < 2) throw new BadRequestException('Driver name is required');
    if (!/^\d{10}$/.test(phone)) throw new BadRequestException('Driver mobile number must contain exactly 10 digits');
    if (!/^[A-Z]{2}\d{2}[A-Z0-9]{7,16}$/.test(license)) throw new BadRequestException('Enter a valid driving licence number, for example TS0920241234567');
    const existing = await this.records.find({ where: { recordType: 'driver' } });
    if (existing.some((record) => record.data.phone === phone)) throw new BadRequestException('A driver already exists with this mobile number');
    if (existing.some((record) => record.data.license === license)) throw new BadRequestException('A driver already exists with this driving licence');
    const pin = String(randomInt(100000, 1000000));
    const salt = randomUUID();
    const record = await this.records.save(this.records.create({ recordType: 'driver', ownerEmail: null, data: { ...body, name, phone, license, verificationStatus: 'Verified', active: true, pinSalt: salt, pinHash: scryptSync(pin, salt, 32).toString('hex') } }));
    return { ...record, temporaryPin: pin, data: { ...record.data, pinHash: undefined, pinSalt: undefined } };
  }

  async driverLogin(phone: string, pin: string) {
    phone = phone.replace(/\D/g, '');
    if (!/^\d{10}$/.test(phone)) return null;
    const drivers = await this.records.find({ where: { recordType: 'driver' } });
    const driver = drivers.find((r) => r.data.phone === phone && r.data.active !== false);
    if (!driver || typeof driver.data.pinHash !== 'string' || typeof driver.data.pinSalt !== 'string') return null;
    const actual = scryptSync(pin, driver.data.pinSalt, 32), expected = Buffer.from(driver.data.pinHash, 'hex');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    return { id: `driver:${driver.id}`, name: String(driver.data.name), email: phone, role: 'driver' };
  }

  async update(id: number, body: Record<string, unknown>, actor: string, actorRole: string) {
    const record = await this.records.findOneBy({ id });
    if (!record) throw new NotFoundException('Record not found');
    if (actorRole === 'employee' && (record.ownerEmail !== actor || !['cancel', 'confirm-recurring', 'share', 'employee-location'].includes(textValue(body.action)))) throw new ForbiddenException('Employees may only manage their own booking');
    if (actorRole === 'driver' && (textValue(record.data.driverPhone) !== actor || !['verify-otp', 'location'].includes(textValue(body.action)) && body.status !== 'No-Show')) throw new ForbiddenException('This route is not assigned to the signed-in driver');
    if (!['employee', 'driver', 'technician', 'nodal', 'finance'].includes(actorRole)) throw new ForbiddenException('CAB role is required');
    if (body.action === 'verify-otp' && String(body.otp) !== String(record.data.otp)) throw new BadRequestException('Incorrect boarding OTP');
    const next: Record<string, unknown> = { ...record.data, ...body, updatedBy: actor };
    if (body.action === 'verify-otp') Object.assign(next, { status: 'Boarded', otpVerified: true, otp: undefined });
    if (body.action === 'cancel') {
      const settings = await this.records.findOne({ where: { recordType: 'settings' } });
      const cutoffHours = numberValue(settings?.data.cutoffHours, 2), shiftMatch = textValue(record.data.shift).match(/(\d{2}):(\d{2})/);
      if (actorRole !== 'technician' && shiftMatch) { const start = new Date(`${textValue(record.data.tripDate)}T${shiftMatch[1]}:${shiftMatch[2]}:00+05:30`); if (Date.now() > start.getTime() - cutoffHours * 3600000) throw new BadRequestException('Cancellation cut-off has passed; contact ESS Support'); }
      Object.assign(next, { status: 'Cancelled', cancelledAt: new Date().toISOString() });
    }
    if (body.action === 'confirm-recurring') Object.assign(next, { weeklyConfirmedAt: new Date().toISOString() });
    if (body.action === 'employee-location') Object.assign(next, { employeeLatitude: numberValue(body.latitude), employeeLongitude: numberValue(body.longitude), employeeGpsAccuracy: numberValue(body.accuracy), employeeLocationSharedAt: new Date().toISOString() });
    if (body.action === 'location') {
      const latitude = numberValue(body.latitude), longitude = numberValue(body.longitude), previousLat = numberValue(record.data.latitude), previousLon = numberValue(record.data.longitude);
      const moved = previousLat && previousLon ? distanceKm(previousLat, previousLon, latitude, longitude) : 0;
      const routeLat = numberValue(record.data.routeLatitude), routeLon = numberValue(record.data.routeLongitude);
      const deviationKm = routeLat && routeLon ? distanceKm(routeLat, routeLon, latitude, longitude) : 0;
      const lastAt = new Date(textValue(record.data.lastLocationAt) || 0).getTime();
      const halted = Boolean(lastAt && Date.now() - lastAt > numberValue(record.data.haltThresholdMinutes, 10) * 60000 && moved < 0.05);
      const destinationLat = numberValue(record.data.pickupLatitude || record.data.routeLatitude), destinationLon = numberValue(record.data.pickupLongitude || record.data.routeLongitude), remainingKm = destinationLat && destinationLon ? distanceKm(latitude, longitude, destinationLat, destinationLon) : 0, speedKph = Math.max(numberValue(body.speed) * 3.6, 25), etaMinutes = remainingKm ? Math.ceil(remainingKm / speedKph * 60) : null;
      Object.assign(next, { latitude, longitude, gpsAccuracy: numberValue(body.accuracy), speedKph, heading: numberValue(body.heading), remainingKm, etaMinutes, lastLocationAt: new Date().toISOString(), deviationKm, geofenceAlert: deviationKm > numberValue(record.data.deviationThresholdKm, 2), haltAlert: halted, delayAlert: etaMinutes !== null && etaMinutes > numberValue(record.data.delayThresholdMinutes, 15) });
      if (next.geofenceAlert || next.haltAlert) await this.createSafety(record.ownerEmail || actor, { bookingId: record.id, eventType: next.geofenceAlert ? 'Geofence deviation' : 'Unexpected halt', latitude, longitude, message: next.geofenceAlert ? `Vehicle deviated ${deviationKm.toFixed(1)} km from route` : 'Vehicle halt threshold exceeded' });
      if (next.delayAlert) await this.notify(record.ownerEmail || '', 'Vehicle delay alert', `${textValue(record.data.bookingCode)} is delayed; current ETA is ${etaMinutes} minutes.`, ['in-app', 'email', 'sms', 'push'], record.id);
    }
    delete next.action;
    record.data = next;
    const saved = await this.records.save(record);
    if (body.action === 'location') {
      const routeId = numberValue(saved.data.routeId), driverPhone = textValue(saved.data.driverPhone);
      const routeBookings = await this.records.find({ where: { recordType: 'booking' } });
      for (const peer of routeBookings.filter((item) => item.id !== saved.id && (routeId ? numberValue(item.data.routeId) === routeId : driverPhone && textValue(item.data.driverPhone) === driverPhone) && !['Cancelled', 'Completed', 'No-Show'].includes(textValue(item.data.status)))) {
        peer.data = { ...peer.data, latitude: saved.data.latitude, longitude: saved.data.longitude, gpsAccuracy: saved.data.gpsAccuracy, speedKph: saved.data.speedKph, heading: saved.data.heading, lastLocationAt: saved.data.lastLocationAt, routeLocationSourceBookingId: saved.id };
        await this.records.save(peer);
      }
    }
    await this.audit(actor, textValue(body.action || body.status || 'record-updated'), id, next);
    if (body.driverPhone || body.status) await this.notify(record.ownerEmail || '', 'Trip updated', `${textValue(record.data.bookingCode)} is now ${textValue(next.status)}.`, ['in-app', 'email', 'sms', 'push'], record.id);
    return saved;
  }

  async createSafety(email: string, body: Record<string, unknown>) {
    const event = await this.records.save(this.records.create({ recordType: 'safety', ownerEmail: email, data: { ...body, eventCode: `SOS-${Date.now().toString(36).toUpperCase()}`, status: 'Open', recipients: ['ESS Support', 'Nodal Officer', 'Emergency Contact'], triggeredAt: new Date().toISOString() } }));
    await this.notify(email, 'URGENT transport safety alert', `${textValue(event.data.eventCode)}: ${textValue(body.message || body.eventType || 'SOS triggered')}`, ['in-app', 'email', 'sms', 'push'], numberValue(body.bookingId));
    await this.audit(email, 'safety-event-created', event.id, event.data);
    return event;
  }

  async createMaster(type: EctmsRecordType, body: Record<string, unknown>) {
    const expiry = textValue(body.expiryDate), expired = expiry ? new Date(expiry).getTime() < Date.now() : false;
    return this.records.save(this.records.create({ recordType: type, ownerEmail: textValue(body.ownerEmail) || null, data: { ...body, complianceStatus: expired ? 'Expired' : expiry ? 'Valid' : body.complianceStatus || 'Not required', expiryAlert: expired } }));
  }

  async createBill(email: string, body: Record<string, unknown>) {
    const vendor = textValue(body.vendor).trim(), invoiceNumber = textValue(body.invoiceNumber).trim(), amount = numberValue(body.amount);
    if (!vendor || !invoiceNumber || amount <= 0) throw new BadRequestException('Vendor, invoice number and a positive amount are required');
    const attachmentName = textValue(body.attachmentName), attachmentType = textValue(body.attachmentType), attachmentData = textValue(body.attachmentData);
    if (attachmentData.length > 7_500_000) throw new BadRequestException('Bill attachment must be 5 MB or smaller');
    if (attachmentData && !['application/pdf', 'image/png', 'image/jpeg', 'image/webp'].includes(attachmentType)) throw new BadRequestException('Bill attachment must be PDF, PNG, JPG or WebP');
    const bill = await this.records.save(this.records.create({ recordType: 'bill', ownerEmail: email, data: { ...body, vendor, invoiceNumber, amount, attachmentName, attachmentType, attachmentData, billCode: `BILL-${Date.now().toString(36).toUpperCase()}`, status: 'Submitted', submittedAt: new Date().toISOString() } }));
    await this.audit(email, 'vendor-bill-submitted', bill.id, { billCode: bill.data.billCode, vendor, invoiceNumber, amount });
    return bill;
  }

  async optimiseRoutes(actor: string) {
    const all = await this.records.find({ order: { createdAt: 'ASC' } });
    const bookings = all.filter((r) => r.recordType === 'booking' && ['Booked', 'Confirmed'].includes(textValue(r.data.status)));
    const vehicles = all.filter((r) => r.recordType === 'vehicle' && r.data.active !== false);
    const groups = new Map<string, EctmsRecord[]>();
    for (const booking of bookings) { const key = `${textValue(booking.data.tripDate)}|${textValue(booking.data.shift)}|${textValue(booking.data.zone)}`; groups.set(key, [...(groups.get(key) || []), booking]); }
    const routes: EctmsRecord[] = [];
    for (const [key, members] of groups) {
      const [date, shift, zone] = key.split('|'); let cursor = 0;
      while (cursor < members.length) {
        const vehicle = vehicles[routes.length % Math.max(vehicles.length, 1)], capacity = numberValue(vehicle?.data.capacity, 4), batch = members.slice(cursor, cursor + capacity);
        const route = await this.records.save(this.records.create({ recordType: 'route', ownerEmail: null, data: { routeCode: `RTE-${Date.now().toString(36).toUpperCase()}-${routes.length + 1}`, date, shift, zone, status: 'Draft', vehicleId: vehicle?.id || null, vehicle: vehicle?.data.registration || 'Unassigned', capacity, bookingIds: batch.map((b) => b.id), orderedStops: batch.map((b) => b.data.pickupPoint), generatedAt: new Date().toISOString() } }));
        routes.push(route); for (const booking of batch) { booking.data = { ...booking.data, routeId: route.id, routeCode: route.data.routeCode, vehicle: route.data.vehicle, status: 'Route planned' }; await this.records.save(booking); } cursor += capacity;
      }
    }
    await this.audit(actor, 'routes-optimised', 0, { routeCount: routes.length, bookingCount: bookings.length });
    return routes;
  }

  async processRecurring(actor: string) {
    const bookings = await this.records.find({ where: { recordType: 'booking' } }); let created = 0;
    for (const source of bookings.filter((r) => r.data.recurring === true && r.data.status !== 'Cancelled')) {
      const next = new Date(textValue(source.data.tripDate)); next.setDate(next.getDate() + 7); const date = next.toISOString().slice(0, 10);
      if (!bookings.some((r) => r.ownerEmail === source.ownerEmail && r.data.tripDate === date && r.data.tripType === source.data.tripType)) { await this.createBooking(source.ownerEmail || actor, { ...source.data, tripDate: date, adminOverride: true }); created++; }
    }
    return { created };
  }

  private async notify(ownerEmail: string, title: string, message: string, channels: string[], bookingId = 0) { const deliveryStatus: Record<string,string> = {}; for (const channel of channels) { const url = process.env[`ECTMS_${channel.toUpperCase()}_WEBHOOK`]; if (!url) { deliveryStatus[channel] = 'local-fallback'; continue; } try { const response = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ channel, recipient: ownerEmail, title, message, bookingId }) }); deliveryStatus[channel] = response.ok ? 'sent' : `failed-${response.status}`; } catch { deliveryStatus[channel] = 'failed'; } } return this.records.save(this.records.create({ recordType: 'notification', ownerEmail, data: { title, message, channels, bookingId, deliveryStatus, createdAt: new Date().toISOString() } })); }
  private async audit(actor: string, event: string, recordId: number, payload: Record<string, unknown>) { return this.records.save(this.records.create({ recordType: 'audit', ownerEmail: actor, data: { event, recordId, payload, retentionUntil: new Date(Date.now() + 3 * 365 * 86400000).toISOString(), timestamp: new Date().toISOString() } })); }
}
