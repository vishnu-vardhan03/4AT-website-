import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import nodemailer, { type Transporter } from 'nodemailer';
import { Repository } from 'typeorm';
import { EsslEmailLog } from './essl-email-log.entity';
import type { EsslTicket, EsslTicketStatus } from './essl-ticket.entity';

export interface StatusChangedEmail {
  ticket: EsslTicket;
  previousStatus: EsslTicketStatus;
  newStatus: EsslTicketStatus;
  adminComment?: string | null;
}

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character);

@Injectable()
export class EsslEmailService {
  private readonly logger = new Logger(EsslEmailService.name);
  private readonly transporter: Transporter | null;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(EsslEmailLog) private readonly logRepo: Repository<EsslEmailLog>,
  ) {
    const host = this.config.get<string>('SMTP_HOST');
    const enabled = this.config.get<string>('EMAIL_ENABLED', 'false') === 'true';
    this.transporter = enabled && host ? nodemailer.createTransport({
      host,
      port: Number(this.config.get<string>('SMTP_PORT', '587')),
      secure: this.config.get<string>('SMTP_SECURE', 'false') === 'true',
      auth: {
        user: this.config.getOrThrow<string>('SMTP_USERNAME'),
        pass: this.config.getOrThrow<string>('SMTP_PASSWORD'),
      },
    }) : null;
  }

  async sendTicketCreated(ticket: EsslTicket): Promise<boolean> {
    const recipient = this.config.get<string>('IT_SUPPORT_EMAIL');
    if (!recipient) {
      this.logger.error(`Ticket-created email failed ticket=${ticket.id}: IT_SUPPORT_EMAIL is not configured`);
      return false;
    }
    const ticketLabel = `ESSL-${String(ticket.id).padStart(4, '0')}`;
    const baseUrl = this.config.get<string>('ESSL_TICKET_BASE_URL') ?? `${this.config.get<string>('FRONTEND_URL', 'http://localhost:3000')}/essl`;
    const ticketUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}ticket=${ticket.id}`;
    const subject = `[${ticketLabel}] New ${ticket.priority} priority ticket: ${ticket.subject}`;
    const text = [`Ticket ID: ${ticketLabel}`, `Issue: ${ticket.subject}`, `Raised by: ${ticket.requesterEmail ?? 'Unknown employee'}`, `Category: ${ticket.category}`, `Priority: ${ticket.priority}`, `Description: ${ticket.description}`, `View ticket: ${ticketUrl}`].join('\n');
    const html = `<h2>New IT support ticket</h2><p><strong>Ticket ID:</strong> ${escapeHtml(ticketLabel)}</p><p><strong>Issue:</strong> ${escapeHtml(ticket.subject)}</p><p><strong>Raised by:</strong> ${escapeHtml(ticket.requesterEmail ?? 'Unknown employee')}</p><p><strong>Category:</strong> ${escapeHtml(ticket.category)}</p><p><strong>Priority:</strong> ${escapeHtml(ticket.priority)}</p><p><strong>Description:</strong><br>${escapeHtml(ticket.description).replace(/\n/g, '<br>')}</p><p><a href="${escapeHtml(ticketUrl)}">View ticket</a></p>`;
    return this.deliver(ticket, recipient, 'ticket-created', subject, text, html, null, null);
  }

  async sendStatusChanged(input: StatusChangedEmail): Promise<boolean> {
    const recipient = input.ticket.requesterEmail;
    if (!recipient) return false;
    const ticketLabel = `ESSL-${String(input.ticket.id).padStart(4, '0')}`;
    const baseUrl = this.config.get<string>('ESSL_TICKET_BASE_URL') ?? `${this.config.get<string>('FRONTEND_URL', 'http://localhost:3000')}/essl`;
    const ticketUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}ticket=${input.ticket.id}`;
    const comment = input.adminComment?.trim();
    const subject = `[${ticketLabel}] Status changed to ${input.newStatus}`;
    const text = [
      `Ticket ID: ${ticketLabel}`,
      `Issue: ${input.ticket.subject}`,
      `Previous status: ${input.previousStatus}`,
      `New status: ${input.newStatus}`,
      comment ? `Admin comment/resolution: ${comment}` : null,
      `View ticket: ${ticketUrl}`,
    ].filter(Boolean).join('\n');
    const html = `<h2>Ticket status updated</h2><p><strong>Ticket ID:</strong> ${escapeHtml(ticketLabel)}</p><p><strong>Issue:</strong> ${escapeHtml(input.ticket.subject)}</p><p><strong>Previous status:</strong> ${escapeHtml(input.previousStatus)}</p><p><strong>New status:</strong> ${escapeHtml(input.newStatus)}</p>${comment ? `<p><strong>Admin comment/resolution:</strong><br>${escapeHtml(comment).replace(/\n/g, '<br>')}</p>` : ''}<p><a href="${escapeHtml(ticketUrl)}">View ticket</a></p>`;

    return this.deliver(input.ticket, recipient, 'status-changed', subject, text, html, input.previousStatus, input.newStatus);
  }

  private async deliver(ticket: EsslTicket, recipient: string, eventType: 'ticket-created' | 'status-changed', subject: string, text: string, html: string, previousStatus: EsslTicketStatus | null, newStatus: EsslTicketStatus | null): Promise<boolean> {
    let result: unknown;
    try {
      if (!this.transporter) throw new Error('Email transport is not configured or EMAIL_ENABLED is not true');
      result = await this.transporter.sendMail({
        from: this.config.getOrThrow<string>('SMTP_FROM'),
        to: recipient,
        replyTo: this.config.get<string>('SMTP_REPLY_TO') || undefined,
        subject,
        text,
        html,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown email delivery error';
      this.logger.error(`Email failed event=${eventType} ticket=${ticket.id} recipient=${recipient}: ${message}`);
      try { await this.writeLog(ticket, recipient, eventType, previousStatus, newStatus, 'failed', null, message.slice(0, 2000)); }
      catch (logError) { this.logger.error('Failed to persist email delivery log', logError instanceof Error ? logError.stack : String(logError)); }
      return false;
    }
    const messageId = typeof result === 'object' && result !== null && 'messageId' in result && typeof result.messageId === 'string'
      ? result.messageId : null;
    this.logger.log(`Email sent event=${eventType} ticket=${ticket.id} recipient=${recipient} messageId=${messageId ?? 'unavailable'}`);
    try { await this.writeLog(ticket, recipient, eventType, previousStatus, newStatus, 'sent', messageId, null); }
    catch (logError) { this.logger.error('Email was sent but its delivery log could not be persisted', logError instanceof Error ? logError.stack : String(logError)); }
    return true;
  }

  private async writeLog(ticket: EsslTicket, recipient: string, eventType: 'ticket-created' | 'status-changed', previousStatus: EsslTicketStatus | null, newStatus: EsslTicketStatus | null, outcome: 'sent' | 'failed', providerMessageId: string | null, errorMessage: string | null) {
    await this.logRepo.save(this.logRepo.create({
      ticketId: ticket.id, recipientEmail: recipient.toLowerCase(), eventType, previousStatus,
      newStatus, outcome, providerMessageId, errorMessage,
    }));
  }
}
