import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Repository } from 'typeorm';
import { EctmsRecord } from '../src/ectms/ectms-record.entity';
import { EctmsService } from '../src/ectms/ectms.service';

const record = (values: Partial<EctmsRecord>): EctmsRecord => ({
  id: 1,
  recordType: 'booking',
  ownerEmail: null,
  data: {},
  createdAt: new Date('2026-08-18T00:00:00Z'),
  updatedAt: new Date('2026-08-18T00:00:00Z'),
  ...values,
});

describe('EctmsService driver assignment visibility', () => {
  it('requires and normalizes a vehicle number when a driver is created', async () => {
    const saved: EctmsRecord[] = [];
    const repository = {
      find: async () => [],
      create: (value: EctmsRecord) => value,
      save: async (value: EctmsRecord) => { saved.push(value); return { ...value, id: 12 }; },
    } as unknown as Repository<EctmsRecord>;
    const service = new EctmsService(repository);

    await assert.rejects(
      service.createDriver({ name: 'Test Driver', phone: '9876543210', license: 'TS0920241234567' }),
      /Vehicle number is required/,
    );
    const created = await service.createDriver({ name: 'Test Driver', phone: '9876543210', license: 'TS0920241234567', vehicle: 'ts09 ab 1234' });

    assert.equal((created.data as Record<string, unknown>).vehicle, 'TS09 AB 1234');
    assert.equal(saved[0].data.vehicle, 'TS09 AB 1234');
    assert.equal(created.data.pinHash, undefined);
    assert.equal(created.data.pinSalt, undefined);
  });

  it('copies driver name, phone, and vehicle onto an assigned booking', async () => {
    const booking = record({ id: 7, ownerEmail: 'employee@consult-4at.com', data: { bookingCode: 'CAB-7', status: 'Booked' } });
    const driver = record({ id: 9, recordType: 'driver', data: { name: 'Test Driver', phone: '9876543210', vehicle: 'TS09AB1234' } });
    const repository = {
      findOneBy: async () => booking,
      find: async () => [driver],
      create: (value: EctmsRecord) => value,
      save: async (value: EctmsRecord) => value,
    } as unknown as Repository<EctmsRecord>;
    const service = new EctmsService(repository);

    const updated = await service.update(7, { driverPhone: '9876543210', status: 'Assigned' }, 'admin@consult-4at.com', 'technician');

    assert.equal(updated.data.driverName, 'Test Driver');
    assert.equal(updated.data.driverPhone, '9876543210');
    assert.equal(updated.data.vehicle, 'TS09AB1234');
  });

  it('shows only the assigned driver to an employee and removes PIN material', async () => {
    const employeeEmail = 'employee@consult-4at.com';
    const rows = [
      record({ id: 1, ownerEmail: employeeEmail, data: { status: 'Assigned', driverPhone: '9876543210', vehicle: 'TS09AB1234' } }),
      record({ id: 2, recordType: 'driver', data: { phone: '9876543210', vehicle: 'TS09AB1234', pinHash: 'secret-hash', pinSalt: 'secret-salt' } }),
      record({ id: 3, recordType: 'driver', data: { phone: '9123456780', vehicle: 'TS10CD5678', pinHash: 'other-hash', pinSalt: 'other-salt' } }),
    ];
    const repository = { find: async () => rows } as unknown as Repository<EctmsRecord>;
    const service = new EctmsService(repository);

    const snapshot = await service.snapshot(employeeEmail, 'employee');
    const visibleDriver = snapshot.records.find((item) => item.recordType === 'driver');

    assert.equal(snapshot.records.filter((item) => item.recordType === 'driver').length, 1);
    assert.equal(visibleDriver?.data.phone, '9876543210');
    assert.equal(visibleDriver?.data.vehicle, 'TS09AB1234');
    assert.equal(visibleDriver?.data.pinHash, undefined);
    assert.equal(visibleDriver?.data.pinSalt, undefined);
  });

  it('lets a driver mark each employee drop-off independently', async () => {
    const first = record({ id: 21, ownerEmail: 'first@consult-4at.com', data: { bookingCode: 'CAB-21', driverPhone: '9876543210', otpVerified: true, status: 'Boarded', dropLocation: 'Miyapur' } });
    const second = record({ id: 22, ownerEmail: 'second@consult-4at.com', data: { bookingCode: 'CAB-22', driverPhone: '9876543210', otpVerified: true, status: 'Boarded', dropLocation: 'Uppal' } });
    const repository = {
      findOneBy: async ({ id }: { id: number }) => id === first.id ? first : second,
      create: (value: EctmsRecord) => value,
      save: async (value: EctmsRecord) => value,
    } as unknown as Repository<EctmsRecord>;
    const service = new EctmsService(repository);

    await service.update(first.id, { action: 'drop-off' }, '9876543210', 'driver');

    assert.equal(first.data.status, 'Completed');
    assert.equal(first.data.dropStatus, 'Dropped off');
    assert.equal(typeof first.data.droppedAt, 'string');
    assert.equal(second.data.status, 'Boarded');
    assert.equal(second.data.dropStatus, undefined);
  });
});
