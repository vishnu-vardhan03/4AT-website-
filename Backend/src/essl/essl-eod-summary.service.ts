import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';
import { EsslEmailService } from './essl-email.service';
import { EsslTicketActivity } from './essl-ticket-activity.entity';
import { EsslTicket } from './essl-ticket.entity';

const JOB_NAME = 'essl-eod-ticket-summary';
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character);

export interface EodTicketSummary {
  dateLabel: string;
  timeZone: string;
  raisedToday: number;
  resolvedToday: number;
  open: number;
  inProgress: number;
  waiting: number;
  resolved: number;
  closed: number;
  activeTotal: number;
}

function timeZoneParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);
  return { year: value('year'), month: value('month'), day: value('day'), hour: value('hour'), minute: value('minute'), second: value('second') };
}

function zonedMidnightUtc(year: number, month: number, day: number, timeZone: string): Date {
  const target = Date.UTC(year, month - 1, day);
  let result = target;
  for (let iteration = 0; iteration < 2; iteration += 1) {
    const parts = timeZoneParts(new Date(result), timeZone);
    const represented = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    result -= represented - target;
  }
  return new Date(result);
}

export function getLocalDayUtcRange(now: Date, timeZone: string): { start: Date; end: Date } {
  const local = timeZoneParts(now, timeZone);
  const nextCalendarDay = new Date(Date.UTC(local.year, local.month - 1, local.day + 1));
  return {
    start: zonedMidnightUtc(local.year, local.month, local.day, timeZone),
    end: zonedMidnightUtc(nextCalendarDay.getUTCFullYear(), nextCalendarDay.getUTCMonth() + 1, nextCalendarDay.getUTCDate(), timeZone),
  };
}

const countValue = (row: { count?: string | number } | undefined) => Number(row?.count ?? 0);

@Injectable()
export class EsslEodSummaryService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(EsslEodSummaryService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly emailService: EsslEmailService,
    @InjectRepository(EsslTicket) private readonly ticketRepo: Repository<EsslTicket>,
    @InjectRepository(EsslTicketActivity) private readonly activityRepo: Repository<EsslTicketActivity>,
  ) {}

  onModuleInit(): void {
    if (!this.enabled()) {
      this.logger.log('EOD ticket summary schedule is disabled');
      return;
    }
    const cronTime = this.config.get<string>('EOD_SUMMARY_CRON', '0 18 * * *');
    const timeZone = this.timeZone();
    const job = CronJob.from({ cronTime, timeZone, start: true, onTick: () => void this.runScheduledSummary() });
    this.schedulerRegistry.addCronJob(JOB_NAME, job);
    this.logger.log(`EOD ticket summary scheduled cron=${cronTime} timezone=${timeZone}`);
  }

  onModuleDestroy(): void {
    if (!this.schedulerRegistry.doesExist('cron', JOB_NAME)) return;
    this.schedulerRegistry.deleteCronJob(JOB_NAME);
  }

  async runScheduledSummary(): Promise<void> {
    try {
      const result = await this.sendEodSummary();
      if (!result.sent) this.logger.error('Scheduled EOD ticket summary was not sent');
    } catch (error) {
      this.logger.error('Scheduled EOD ticket summary failed', error instanceof Error ? error.stack : String(error));
    }
  }

  async sendEodSummary(now = new Date()): Promise<{ sent: boolean; summary: EodTicketSummary }> {
    const recipients = (this.config.get<string>('EOD_SUMMARY_RECIPIENT') ?? '').split(',').map((value) => value.trim()).filter(Boolean);
    if (!recipients.length) throw new Error('EOD_SUMMARY_RECIPIENT is not configured');
    this.logger.log('Starting EOD ticket summary');
    const summary = await this.getSummary(now);
    const portalUrl = this.config.get<string>('ESS_FRONTEND_URL') ?? `${this.config.get<string>('FRONTEND_URL', 'http://localhost:3000')}/essl`;
    this.logger.log(`Tickets raised today=${summary.raisedToday} resolved today=${summary.resolvedToday} open=${summary.open} in progress=${summary.inProgress} waiting=${summary.waiting}`);
    this.logger.log(`Sending EOD ticket summary recipient=${recipients.join(',')}`);
    const sent = await this.emailService.sendEmail({
      to: recipients,
      subject: `EOD ESS Ticket Summary - ${summary.dateLabel}`,
      textBody: this.textBody(summary, portalUrl),
      htmlBody: this.htmlBody(summary, portalUrl),
    });
    if (sent) this.logger.log('EOD ticket summary email sent successfully');
    return { sent, summary };
  }

  async getSummary(now = new Date()): Promise<EodTicketSummary> {
    const timeZone = this.timeZone();
    const { start, end } = getLocalDayUtcRange(now, timeZone);
    const raisedQuery = this.ticketRepo.createQueryBuilder('ticket').select('COUNT(ticket.id)', 'count')
      .where('ticket.created_at >= :start', { start }).andWhere('ticket.created_at < :end', { end });
    const resolvedQuery = this.activityRepo.createQueryBuilder('activity').select('COUNT(DISTINCT activity.ticket_id)', 'count')
      .where('activity.event_type = :eventType', { eventType: 'status-updated' }).andWhere('activity.new_status = :status', { status: 'Resolved' })
      .andWhere('activity.created_at >= :start', { start }).andWhere('activity.created_at < :end', { end });
    const statusQuery = this.ticketRepo.createQueryBuilder('ticket').select('ticket.status', 'status').addSelect('COUNT(ticket.id)', 'count').groupBy('ticket.status');
    const [raisedRow, resolvedRow, statusRows] = await Promise.all([raisedQuery.getRawOne<{ count: string }>(), resolvedQuery.getRawOne<{ count: string }>(), statusQuery.getRawMany<{ status: string; count: string }>()]);
    const status = new Map(statusRows.map((row) => [row.status, Number(row.count)]));
    const open = (status.get('New') ?? 0) + (status.get('Reopened') ?? 0);
    const inProgress = status.get('In progress') ?? 0;
    const waiting = status.get('Waiting') ?? 0;
    return {
      dateLabel: new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone }).format(now), timeZone,
      raisedToday: countValue(raisedRow), resolvedToday: countValue(resolvedRow), open, inProgress, waiting,
      resolved: status.get('Resolved') ?? 0, closed: status.get('Closed') ?? 0, activeTotal: open + inProgress + waiting,
    };
  }

  private enabled(): boolean {
    return this.config.get<string>('EOD_SUMMARY_ENABLED', 'false').toLowerCase() === 'true';
  }

  private timeZone(): string {
    return this.config.get<string>('EOD_SUMMARY_TIMEZONE', 'Asia/Kolkata');
  }

  private textBody(summary: EodTicketSummary, portalUrl: string): string {
    return [`EOD ESS Ticket Summary — ${summary.dateLabel}`, `Raised today: ${summary.raisedToday}`, `Resolved today: ${summary.resolvedToday}`, `Open: ${summary.open}`, `In Progress: ${summary.inProgress}`, `Waiting: ${summary.waiting}`, `Resolved: ${summary.resolved}`, `Closed: ${summary.closed}`, `Total active: ${summary.activeTotal}`, `Timezone: ${summary.timeZone}`, `Track in the ESS Portal: ${portalUrl}`].join('\n');
  }

  private htmlBody(summary: EodTicketSummary, portalUrl: string): string {
    const metric = (label: string, value: number, color: string) => `<td style="padding:8px;width:33.33%"><div style="border:1px solid #e5e7eb;border-top:4px solid ${color};border-radius:8px;padding:16px;background:#fff"><div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em">${label}</div><div style="font-size:28px;font-weight:700;color:#111827;margin-top:6px">${value}</div></div></td>`;
    return `<div style="margin:0;padding:24px;background:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;color:#111827"><div style="max-width:680px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb"><div style="padding:24px 28px;background:#071226;color:#fff"><div style="font-size:12px;color:#38bdf8;font-weight:700;letter-spacing:.12em">ESS SUPPORT</div><h1 style="margin:8px 0 4px;font-size:24px">EOD ESS Ticket Summary</h1><div style="color:#cbd5e1;font-size:14px">${summary.dateLabel}</div></div><div style="padding:20px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>${metric('Raised today', summary.raisedToday, '#0ea5e9')}${metric('Resolved today', summary.resolvedToday, '#10b981')}${metric('Total active', summary.activeTotal, '#8b5cf6')}</tr></table><h2 style="font-size:16px;margin:24px 8px 8px">Current ticket status</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>${metric('Open', summary.open, '#0284c7')}${metric('In Progress', summary.inProgress, '#7c3aed')}${metric('Waiting', summary.waiting, '#f59e0b')}</tr><tr>${metric('Resolved', summary.resolved, '#059669')}${metric('Closed', summary.closed, '#64748b')}<td></td></tr></table><div style="text-align:center;margin:24px 8px"><a href="${escapeHtml(portalUrl)}" style="display:inline-block;background:#0ea5e9;color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 22px;border-radius:7px">Track in the ESS Portal</a></div><p style="font-size:12px;color:#6b7280;margin:20px 8px 4px">Reporting timezone: ${summary.timeZone}. Open includes New and Reopened tickets.</p></div></div></div>`;
  }
}
