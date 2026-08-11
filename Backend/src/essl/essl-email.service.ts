import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EsslEmailLog } from './essl-email-log.entity';
import type { EsslTicket, EsslTicketCategory, EsslTicketStatus } from './essl-ticket.entity';

export interface StatusChangedEmail {
  ticket: EsslTicket;
  previousStatus: EsslTicketStatus;
  newStatus: EsslTicketStatus;
  adminComment?: string | null;
}

export interface GraphEmail {
  to: string[];
  cc?: string[];
  subject: string;
  textBody: string;
  htmlBody: string;
}

type EmailEventType = 'ticket-created' | 'status-changed';

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseMandatoryCc(value: string | undefined, primaryRecipients: string[]): string[] {
  const primary = new Set(primaryRecipients.map((email) => email.trim().toLowerCase()));
  return [...new Set((value ?? '').split(',').map((email) => email.trim().toLowerCase()).filter((email) => email && !primary.has(email) && emailPattern.test(email)))];
}

export function categoryEnvironmentKey(category: EsslTicketCategory): string {
  switch (category) {
    case 'IT & Access': return 'IT_ACCESS_EMAIL';
    case 'Food':
    case 'Cab': return 'FOOD_CAB_EMAIL';
    case 'Facilities':
    case 'Finance & Admin': return 'FINANCE_FACILITIES_EMAIL';
    case 'Others': return 'OTHER_EMAIL';
  }
}

@Injectable()
export class EsslEmailService {
  private readonly logger = new Logger(EsslEmailService.name);
  private accessToken: string | null = null;
  private accessTokenExpiresAt = 0;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(EsslEmailLog) private readonly logRepo: Repository<EsslEmailLog>,
  ) {}

  async sendTicketCreated(ticket: EsslTicket): Promise<boolean> {
    if (!this.isEnabled()) return false;
    const recipientKey = categoryEnvironmentKey(ticket.category);
    const supportRecipient = this.config.get<string>(recipientKey)?.trim().toLowerCase();
    if (!supportRecipient || !emailPattern.test(supportRecipient)) {
      this.logger.error(`Ticket-created email failed ticket=${ticket.id}: ${recipientKey} is missing or invalid`);
      return false;
    }

    const ticketLabel = this.ticketLabel(ticket.id);
    const ticketUrl = this.ticketUrl(ticket.id);
    const cc = parseMandatoryCc(this.config.get<string>('MANDATORY_CC_EMAILS'), [supportRecipient]);
    const supportSubject = `[ESS] New ${ticket.category} Ticket #${ticketLabel} - ${ticket.subject}`;
    const supportText = [
      `Ticket Number: ${ticketLabel}`, `Employee Email: ${ticket.requesterEmail ?? 'Unknown employee'}`,
      `Category: ${ticket.category}`, `Subject: ${ticket.subject}`, `Description: ${ticket.description}`,
      `Priority: ${ticket.priority}`, `Current Status: ${ticket.status}`, `Created: ${ticket.createdAt.toISOString()}`,
      `ESS Portal: ${ticketUrl}`,
    ].join('\n');
    const supportHtml = `<h2>New ESS ticket</h2><table role="presentation"><tr><td><strong>Ticket Number</strong></td><td>${escapeHtml(ticketLabel)}</td></tr><tr><td><strong>Employee Email</strong></td><td>${escapeHtml(ticket.requesterEmail ?? 'Unknown employee')}</td></tr><tr><td><strong>Category</strong></td><td>${escapeHtml(ticket.category)}</td></tr><tr><td><strong>Subject</strong></td><td>${escapeHtml(ticket.subject)}</td></tr><tr><td><strong>Priority</strong></td><td>${escapeHtml(ticket.priority)}</td></tr><tr><td><strong>Status</strong></td><td>${escapeHtml(ticket.status)}</td></tr><tr><td><strong>Created</strong></td><td>${escapeHtml(ticket.createdAt.toISOString())}</td></tr></table><p><strong>Description</strong><br>${escapeHtml(ticket.description).replace(/\n/g, '<br>')}</p><p><a href="${escapeHtml(ticketUrl)}">Review this ticket in the ESS Portal</a></p>`;
    const supportSent = await this.deliver(ticket, { to: [supportRecipient], cc, subject: supportSubject, textBody: supportText, htmlBody: supportHtml }, 'ticket-created', null, null);

    if (!ticket.requesterEmail || !emailPattern.test(ticket.requesterEmail)) return supportSent;
    const employeeSubject = `[ESS] Ticket #${ticketLabel} Created Successfully`;
    const employeeText = [`Your ESS ticket has been created successfully.`, `Ticket Number: ${ticketLabel}`, `Category: ${ticket.category}`, `Subject: ${ticket.subject}`, `Priority: ${ticket.priority}`, `Status: ${ticket.status}`, `Track your ticket: ${ticketUrl}`].join('\n');
    const employeeHtml = `<h2>Your ESS ticket was created</h2><p>Our support team has received your request.</p><p><strong>Ticket Number:</strong> ${escapeHtml(ticketLabel)}<br><strong>Category:</strong> ${escapeHtml(ticket.category)}<br><strong>Subject:</strong> ${escapeHtml(ticket.subject)}<br><strong>Priority:</strong> ${escapeHtml(ticket.priority)}<br><strong>Status:</strong> ${escapeHtml(ticket.status)}</p><p><a href="${escapeHtml(ticketUrl)}">Track your ticket in the ESS Portal</a></p>`;
    const employeeSent = await this.deliver(ticket, { to: [ticket.requesterEmail], subject: employeeSubject, textBody: employeeText, htmlBody: employeeHtml }, 'ticket-created', null, null);
    return supportSent && employeeSent;
  }

  async sendStatusChanged(input: StatusChangedEmail): Promise<boolean> {
    if (!this.isEnabled()) return false;
    const recipient = input.ticket.requesterEmail;
    if (!recipient || !emailPattern.test(recipient)) return false;
    const ticketLabel = this.ticketLabel(input.ticket.id);
    const ticketUrl = this.ticketUrl(input.ticket.id);
    const comment = input.adminComment?.trim();
    const subject = input.newStatus === 'Resolved'
      ? `[ESS] Ticket #${ticketLabel} Resolved`
      : input.newStatus === 'Reopened'
        ? `[ESS] Ticket #${ticketLabel} Reopened`
        : `[ESS] Ticket #${ticketLabel} Status Updated - ${input.newStatus}`;
    const text = [
      `Your ESS ticket has been updated.`, `Ticket Number: ${ticketLabel}`, `Category: ${input.ticket.category}`,
      `Subject: ${input.ticket.subject}`, `Previous Status: ${input.previousStatus}`, `New Status: ${input.newStatus}`,
      comment ? `Resolution / Support Comment: ${comment}` : null, `Updated: ${input.ticket.updatedAt.toISOString()}`,
      `ESS Portal: ${ticketUrl}`,
    ].filter(Boolean).join('\n');
    const html = `<h2>${input.newStatus === 'Resolved' ? 'Your ESS ticket was resolved' : input.newStatus === 'Reopened' ? 'Your ESS ticket was reopened' : 'Your ESS ticket was updated'}</h2><p><strong>Ticket Number:</strong> ${escapeHtml(ticketLabel)}<br><strong>Category:</strong> ${escapeHtml(input.ticket.category)}<br><strong>Subject:</strong> ${escapeHtml(input.ticket.subject)}<br><strong>Previous Status:</strong> ${escapeHtml(input.previousStatus)}<br><strong>New Status:</strong> ${escapeHtml(input.newStatus)}</p>${comment ? `<p><strong>Resolution / Support Comment:</strong><br>${escapeHtml(comment).replace(/\n/g, '<br>')}</p>` : ''}<p><a href="${escapeHtml(ticketUrl)}">View the latest ticket information</a></p>`;
    return this.deliver(input.ticket, { to: [recipient], subject, textBody: text, htmlBody: html }, 'status-changed', input.previousStatus, input.newStatus);
  }

  async sendEmail(email: GraphEmail): Promise<boolean> {
    if (!this.isEnabled()) return false;
    const result = await this.sendViaGraph(email);
    if (result.ok) this.logger.log(`Email accepted by Microsoft Graph recipient=${result.recipientLabel}`);
    else this.logger.error(`Email failed recipient=${result.recipientLabel}: ${result.error}`);
    return result.ok;
  }

  private isEnabled(): boolean {
    if (this.config.get<string>('EMAIL_ENABLED', 'false') === 'true') return true;
    this.logger.debug('ESS email delivery is disabled by EMAIL_ENABLED');
    return false;
  }

  private ticketLabel(id: number): string {
    return `ESSL-${String(id).padStart(4, '0')}`;
  }

  private ticketUrl(id: number): string {
    const baseUrl = this.config.get<string>('ESS_FRONTEND_URL') ?? `${this.config.get<string>('FRONTEND_URL', 'http://localhost:3000')}/essl`;
    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}ticket=${id}`;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && this.accessTokenExpiresAt > Date.now() + 60_000) return this.accessToken;
    const tenantId = this.config.getOrThrow<string>('MICROSOFT_TENANT_ID');
    const clientId = this.config.getOrThrow<string>('MICROSOFT_CLIENT_ID');
    const clientSecret = this.config.getOrThrow<string>('MICROSOFT_CLIENT_SECRET');
    const body = new URLSearchParams({ grant_type: 'client_credentials', client_id: clientId, client_secret: clientSecret, scope: 'https://graph.microsoft.com/.default' });
    const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body, signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Microsoft identity token request failed with HTTP ${response.status}`);
    const payload = await response.json() as { access_token?: unknown; expires_in?: unknown };
    if (typeof payload.access_token !== 'string') throw new Error('Microsoft identity token response did not contain an access token');
    this.accessToken = payload.access_token;
    this.accessTokenExpiresAt = Date.now() + (typeof payload.expires_in === 'number' ? payload.expires_in : 3600) * 1000;
    return this.accessToken;
  }

  private async deliver(ticket: EsslTicket, email: GraphEmail, eventType: EmailEventType, previousStatus: EsslTicketStatus | null, newStatus: EsslTicketStatus | null): Promise<boolean> {
    const result = await this.sendViaGraph(email);
    if (result.ok) {
      this.logger.log(`Email accepted by Microsoft Graph event=${eventType} ticket=${ticket.id} recipient=${result.recipientLabel}`);
      await this.writeLogSafely(ticket, result.recipientLabel, eventType, previousStatus, newStatus, 'sent', null);
      return true;
    }
    this.logger.error(`Email failed event=${eventType} ticket=${ticket.id} recipient=${result.recipientLabel}: ${result.error}`);
    await this.writeLogSafely(ticket, result.recipientLabel, eventType, previousStatus, newStatus, 'failed', result.error.slice(0, 2000));
    return false;
  }

  private async sendViaGraph(email: GraphEmail): Promise<{ ok: boolean; recipientLabel: string; error: string }> {
    const recipients = [...new Set(email.to.map((address) => address.trim().toLowerCase()).filter((address) => emailPattern.test(address)))];
    const cc = parseMandatoryCc(email.cc?.join(','), recipients);
    const recipientLabel = recipients.join(',') || 'unavailable';
    try {
      if (!recipients.length) throw new Error('Email has no valid primary recipient');
      const token = await this.getAccessToken();
      const sender = this.config.getOrThrow<string>('ESS_SENDER_EMAIL').trim();
      const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: {
            subject: email.subject,
            body: { contentType: 'HTML', content: email.htmlBody },
            toRecipients: recipients.map((address) => ({ emailAddress: { address } })),
            ccRecipients: cc.map((address) => ({ emailAddress: { address } })),
          },
          saveToSentItems: true,
        }),
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error(`Microsoft Graph sendMail failed with HTTP ${response.status}`);
      return { ok: true, recipientLabel, error: '' };
    } catch (error) {
      return { ok: false, recipientLabel, error: error instanceof Error ? error.message : 'Unknown email delivery error' };
    }
  }

  private async writeLogSafely(ticket: EsslTicket, recipient: string, eventType: EmailEventType, previousStatus: EsslTicketStatus | null, newStatus: EsslTicketStatus | null, outcome: 'sent' | 'failed', errorMessage: string | null) {
    try {
      await this.logRepo.save(this.logRepo.create({ ticketId: ticket.id, recipientEmail: recipient, eventType, previousStatus, newStatus, outcome, providerMessageId: null, errorMessage }));
    } catch (logError) {
      this.logger.error('Failed to persist email delivery log', logError instanceof Error ? logError.stack : String(logError));
    }
  }
}
