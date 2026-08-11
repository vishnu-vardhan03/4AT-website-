import * as assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SchedulerRegistry } from '@nestjs/schedule';
import type { Repository, SelectQueryBuilder } from 'typeorm';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { getLocalDayUtcRange, EsslEodSummaryService } from '../src/essl/essl-eod-summary.service';
import type { EsslEmailService, GraphEmail } from '../src/essl/essl-email.service';
import type { EsslTicketActivity } from '../src/essl/essl-ticket-activity.entity';
import type { EsslTicket } from '../src/essl/essl-ticket.entity';

type RawResult = { count: string } | Array<{ status: string; count: string }>;

function queryBuilder(result: RawResult, ranges: Array<{ start?: Date; end?: Date }>): SelectQueryBuilder<never> {
  const parameters: { start?: Date; end?: Date } = {};
  const builder = {
    select: () => builder, addSelect: () => builder, groupBy: () => builder,
    where: (_sql: string, values?: { start?: Date; end?: Date }) => { Object.assign(parameters, values); return builder; },
    andWhere: (_sql: string, values?: { start?: Date; end?: Date }) => { Object.assign(parameters, values); return builder; },
    getRawOne: async () => { ranges.push(parameters); return result; },
    getRawMany: async () => result,
  };
  return builder as unknown as SelectQueryBuilder<never>;
}

function createService(sendResult = true) {
  const ranges: Array<{ start?: Date; end?: Date }> = [];
  let ticketQuery = 0;
  const ticketRepo = {
    createQueryBuilder: () => queryBuilder(ticketQuery++ === 0 ? { count: '18' } : [
      { status: 'New', count: '2' }, { status: 'Reopened', count: '1' }, { status: 'In progress', count: '3' },
      { status: 'Waiting', count: '2' }, { status: 'Resolved', count: '10' }, { status: 'Closed', count: '4' },
    ], ranges),
  } as unknown as Repository<EsslTicket>;
  const activityRepo = { createQueryBuilder: () => queryBuilder({ count: '10' }, ranges) } as unknown as Repository<EsslTicketActivity>;
  const emails: GraphEmail[] = [];
  const emailService = { sendEmail: async (email: GraphEmail) => { emails.push(email); return sendResult; } } as EsslEmailService;
  const scheduler = { doesExist: () => false } as unknown as SchedulerRegistry;
  const config = new ConfigService({ EOD_SUMMARY_ENABLED: 'false', EOD_SUMMARY_TIMEZONE: 'Asia/Kolkata', EOD_SUMMARY_RECIPIENT: 'manager@example.com', ESS_FRONTEND_URL: 'http://localhost:3000/essl' });
  return { service: new EsslEodSummaryService(config, scheduler, emailService, ticketRepo, activityRepo), emails, ranges };
}

describe('ESSL EOD ticket summary', () => {
  it('uses the organization-local day and excludes both adjacent days', () => {
    const range = getLocalDayUtcRange(new Date('2026-08-11T12:00:00Z'), 'Asia/Kolkata');
    assert.equal(range.start.toISOString(), '2026-08-10T18:30:00.000Z');
    assert.equal(range.end.toISOString(), '2026-08-11T18:30:00.000Z');
    assert.equal(new Date('2026-08-10T18:29:59.999Z') >= range.start, false);
    assert.equal(new Date('2026-08-11T18:30:00.000Z') < range.end, false);
  });

  it('counts raised and resolution activity separately and maps exact live statuses', async () => {
    const { service, ranges } = createService();
    const summary = await service.getSummary(new Date('2026-08-11T12:00:00Z'));
    assert.deepEqual({ raised: summary.raisedToday, resolvedToday: summary.resolvedToday, open: summary.open, inProgress: summary.inProgress, waiting: summary.waiting, resolved: summary.resolved, active: summary.activeTotal },
      { raised: 18, resolvedToday: 10, open: 3, inProgress: 3, waiting: 2, resolved: 10, active: 8 });
    assert.equal(ranges.length, 2);
    assert.equal(ranges[0].start?.toISOString(), '2026-08-10T18:30:00.000Z');
    assert.equal(ranges[1].end?.toISOString(), '2026-08-11T18:30:00.000Z');
  });

  it('sends a Graph email containing the calculated statistics', async () => {
    const { service, emails } = createService();
    const result = await service.sendEodSummary(new Date('2026-08-11T12:00:00Z'));
    assert.equal(result.sent, true);
    assert.equal(emails.length, 1);
    assert.match(emails[0].subject, /11 August 2026/);
    assert.match(emails[0].subject, /^EOD ESS Ticket Summary/);
    assert.match(emails[0].htmlBody, />18</);
    assert.match(emails[0].htmlBody, /Total active/);
    assert.match(emails[0].htmlBody, /href="http:\/\/localhost:3000\/essl"[^>]*>Track in the ESS Portal<\/a>/);
  });

  it('reports a Graph failure without throwing and the scheduled wrapper catches exceptions', async () => {
    const failed = createService(false);
    assert.equal((await failed.service.sendEodSummary()).sent, false);
    const service = createService().service;
    service.sendEodSummary = async () => { throw new Error('Graph unavailable'); };
    await assert.doesNotReject(() => service.runScheduledSummary());
  });

  it('rejects unauthenticated and non-admin manual-trigger users', () => {
    const guard = new JwtAuthGuard();
    assert.throws(() => guard.handleRequest(null, false), UnauthorizedException);
    assert.throws(() => guard.handleRequest(null, { sub: 'employee', username: 'employee', role: 'employee' } as never), UnauthorizedException);
  });
});
