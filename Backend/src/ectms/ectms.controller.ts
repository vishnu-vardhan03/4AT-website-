import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { EsslInternalGuard } from '../essl/essl-internal.guard';
import { EctmsRecordType } from './ectms-record.entity';
import { EctmsService } from './ectms.service';

const textValue = (value: unknown): string => typeof value === 'string' || typeof value === 'number' ? String(value) : '';

@Controller('ectms')
@UseGuards(EsslInternalGuard)
export class EctmsController {
  constructor(private readonly service: EctmsService) {}
  @Get() snapshot(@Query('email') email = '', @Query('role') role = 'employee') { return this.service.snapshot(email, role); }
  @Post('bookings') booking(@Body() body: Record<string, unknown>) { return this.service.createBooking(textValue(body.email), body); }
  @Post('drivers') driver(@Body() body: Record<string, unknown>) { return this.service.createDriver(body); }
  @Post('bills') bill(@Body() body: Record<string, unknown>) { return this.service.createBill(textValue(body.email), body); }
  @Post('driver-login') login(@Body() body: Record<string, unknown>) { return this.service.driverLogin(textValue(body.phone), textValue(body.pin)); }
  @Post('sos') sos(@Body() body: Record<string, unknown>) { return this.service.createSafety(textValue(body.email), body); }
  @Post('operations/optimise') optimise(@Body() body: Record<string, unknown>) { return this.service.optimiseRoutes(textValue(body.actor)); }
  @Post('operations/recurring') recurring(@Body() body: Record<string, unknown>) { return this.service.processRecurring(textValue(body.actor)); }
  @Post('master/:type') master(@Param('type') type: EctmsRecordType, @Body() body: Record<string, unknown>) { return this.service.createMaster(type, body); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) { return this.service.update(id, body, textValue(body.actor) || 'system', textValue(body.actorRole)); }
  @Get('reports.csv') async report(@Res() response: Response) {
    const { records } = await this.service.snapshot('', 'technician');
    const bookings = records.filter((r) => r.recordType === 'booking');
    const rows = ['Booking,Employee,Date,Shift,Trip Type,Status,Vehicle,Vendor,Kilometres', ...bookings.map((r) => [r.data.bookingCode, r.ownerEmail, r.data.tripDate, r.data.shift, r.data.tripType, r.data.status, r.data.vehicle || '', r.data.vendor || '', r.data.kilometres || ''].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))];
    response.setHeader('content-type', 'text/csv'); response.setHeader('content-disposition', 'attachment; filename="ectms-vendor-report.csv"'); response.send(rows.join('\n'));
  }
}
