import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEsslTicketDto } from './dto/create-essl-ticket.dto';
import { UpdateEsslTicketStatusDto } from './dto/update-essl-ticket-status.dto';
import { EsslTicket } from './essl-ticket.entity';
import { EsslTicketAttachment } from './essl-ticket-attachment.entity';
import { EsslNotification } from './essl-notification.entity';
import { EsslEmailService } from './essl-email.service';
import { EsslTicketActivity } from './essl-ticket-activity.entity';
import { ReopenEsslTicketDto } from './dto/reopen-essl-ticket.dto';
import { EditEsslTicketDto } from './dto/edit-essl-ticket.dto';

@Injectable()
export class EsslTicketService {
  private readonly logger = new Logger(EsslTicketService.name);

  constructor(
    @InjectRepository(EsslTicket) private readonly repo: Repository<EsslTicket>,
    @InjectRepository(EsslTicketAttachment) private readonly attachmentRepo: Repository<EsslTicketAttachment>,
    @InjectRepository(EsslTicketActivity) private readonly activityRepo: Repository<EsslTicketActivity>,
    @InjectRepository(EsslNotification) private readonly notificationRepo: Repository<EsslNotification>,
    private readonly emailService: EsslEmailService,
  ) {}

  findAll(requesterEmail?: string) {
    return this.repo.find({
      where: requesterEmail ? { requesterEmail: requesterEmail.toLowerCase() } : undefined,
      relations: { attachments: true, activities: true },
      order: { createdAt: 'DESC' },
      take: 500,
    });
  }

  async create(dto: CreateEsslTicketDto, file?: Express.Multer.File) {
    try {
      const ticket = await this.repo.save(this.repo.create({ ...dto, status: 'New' }));
      if (file) {
        const attachment = await this.attachmentRepo.save(this.attachmentRepo.create({
          ticketId: ticket.id,
          originalName: file.originalname,
          storedName: file.filename,
          mimeType: file.mimetype,
          sizeBytes: file.size,
          filePath: `/uploads/essl/${file.filename}`,
        }));
        ticket.attachments = [attachment];
      } else {
        ticket.attachments = [];
      }
      const activity = await this.activityRepo.save(this.activityRepo.create({ ticketId: ticket.id, eventType: 'created', previousStatus: null, newStatus: 'New', comment: null, actorLabel: dto.requesterEmail }));
      ticket.activities = [activity];
      await this.notificationRepo.save(this.notificationRepo.create({ recipientEmail: 'esssupport@consult-4at.com', ticketId: ticket.id, type: 'ticket-created', title: 'New ticket raised', message: `${dto.requesterEmail} raised ${ticket.subject}.`, isRead: false }));
      try { await this.emailService.sendTicketCreated(ticket); }
      catch (error) { this.logger.error(`Unexpected ticket-created email failure for ticket ${ticket.id}`, error instanceof Error ? error.stack : String(error)); }
      return ticket;
    } catch (error) {
      this.logger.error('Failed to save ESSL ticket', error instanceof Error ? error.stack : String(error));
      throw new InternalServerErrorException('Failed to save ticket');
    }
  }

  async updateStatus(id: number, dto: UpdateEsslTicketStatusDto) {
    const ticket = await this.repo.findOne({ where: { id }, relations: { attachments: true, activities: true } });
    if (!ticket) throw new NotFoundException('Ticket not found');
    const previousStatus = ticket.status;
    const nextComment = dto.adminComment?.trim() || null;
    const statusChanged = previousStatus !== dto.status;
    const commentChanged = dto.adminComment !== undefined && ticket.adminComment !== nextComment;
    if (!statusChanged && !commentChanged) return ticket;
    ticket.status = dto.status;
    if (dto.adminComment !== undefined) ticket.adminComment = nextComment;
    const saved = await this.repo.save(ticket);
    const activity = await this.activityRepo.save(this.activityRepo.create({ ticketId: saved.id, eventType: 'status-updated', previousStatus, newStatus: dto.status, comment: saved.adminComment, actorLabel: 'ESS Support' }));
    saved.activities = [...(saved.activities ?? []), activity];
    if (statusChanged && ticket.requesterEmail) await this.notificationRepo.save(this.notificationRepo.create({ recipientEmail: ticket.requesterEmail, ticketId: ticket.id, type: 'status-updated', title: 'Ticket status updated', message: `${ticket.subject} is now ${dto.status}.`, isRead: false }));
    if (statusChanged && ticket.requesterEmail) {
      try { await this.emailService.sendStatusChanged({ ticket: saved, previousStatus, newStatus: dto.status, adminComment: saved.adminComment }); }
      catch (error) { this.logger.error(`Unexpected status email failure for ticket ${ticket.id}`, error instanceof Error ? error.stack : String(error)); }
    }
    return saved;
  }

  async reopen(id: number, dto: ReopenEsslTicketDto) {
    const ticket = await this.repo.findOne({ where: { id }, relations: { attachments: true, activities: true } });
    if (!ticket || ticket.requesterEmail?.toLowerCase() !== dto.requesterEmail.toLowerCase()) throw new NotFoundException('Ticket not found');
    if (ticket.status !== 'Closed') throw new BadRequestException('Only a closed ticket can be reopened');
    const previousStatus = ticket.status;
    ticket.status = 'Reopened';
    ticket.reopenCount = (ticket.reopenCount ?? 0) + 1;
    ticket.escalationLevel = Math.min(ticket.reopenCount, 3);
    const saved = await this.repo.save(ticket);
    const activity = await this.activityRepo.save(this.activityRepo.create({ ticketId: saved.id, eventType: 'reopened', previousStatus, newStatus: 'Reopened', comment: dto.reason, actorLabel: dto.requesterEmail }));
    saved.activities = [...(saved.activities ?? []), activity];
    await this.notificationRepo.save(this.notificationRepo.create({ recipientEmail: 'esssupport@consult-4at.com', ticketId: saved.id, type: 'ticket-reopened', title: `Escalation level ${saved.escalationLevel}: ticket reopened`, message: `${dto.requesterEmail} reopened ${saved.subject}.`, isRead: false }));
    try { await this.emailService.sendStatusChanged({ ticket: saved, previousStatus, newStatus: 'Reopened', adminComment: dto.reason }); }
    catch (error) { this.logger.error(`Unexpected reopened email failure for ticket ${ticket.id}`, error instanceof Error ? error.stack : String(error)); }
    return saved;
  }

  async edit(id: number, dto: EditEsslTicketDto, file?: Express.Multer.File) {
    const ticket = await this.repo.findOne({ where: { id }, relations: { attachments: true, activities: true } });
    if (!ticket || ticket.requesterEmail?.toLowerCase() !== dto.requesterEmail.toLowerCase()) throw new NotFoundException('Ticket not found');
    if (ticket.status === 'Closed') throw new BadRequestException('A closed ticket cannot be edited');
    const changedFields: string[] = [];
    for (const field of ['subject', 'description', 'category', 'priority'] as const) {
      if (ticket[field] !== dto[field]) changedFields.push(field);
      ticket[field] = dto[field] as never;
    }
    let attachment: EsslTicketAttachment | undefined;
    if (file) {
      attachment = await this.attachmentRepo.save(this.attachmentRepo.create({ ticketId: ticket.id, originalName: file.originalname, storedName: file.filename, mimeType: file.mimetype, sizeBytes: file.size, filePath: `/uploads/essl/${file.filename}` }));
      changedFields.push('attachment');
    }
    if (!changedFields.length) return ticket;
    const saved = await this.repo.save(ticket);
    if (attachment) saved.attachments = [...(saved.attachments ?? []), attachment];
    const comment = `Employee updated: ${changedFields.join(', ')}.`;
    const activity = await this.activityRepo.save(this.activityRepo.create({ ticketId: saved.id, eventType: 'edited', previousStatus: saved.status, newStatus: saved.status, comment, actorLabel: dto.requesterEmail }));
    saved.activities = [...(saved.activities ?? []), activity];
    await this.notificationRepo.save(this.notificationRepo.create({ recipientEmail: 'esssupport@consult-4at.com', ticketId: saved.id, type: 'status-updated', title: 'Ticket details updated', message: `${dto.requesterEmail} updated ${saved.subject}.`, isRead: false }));
    return saved;
  }

  findNotifications(email: string) {
    return this.notificationRepo.find({ where: { recipientEmail: email.toLowerCase() }, order: { createdAt: 'DESC' }, take: 30 });
  }

  async findAttachment(id: number, requesterEmail?: string) {
    const attachment = await this.attachmentRepo.findOne({ where: { id }, relations: { ticket: true } });
    if (!attachment || (requesterEmail && attachment.ticket.requesterEmail?.toLowerCase() !== requesterEmail.toLowerCase())) {
      throw new NotFoundException('Attachment not found');
    }
    return attachment;
  }

  async markNotificationRead(id: number, email: string) {
    const notification = await this.notificationRepo.findOneBy({ id, recipientEmail: email.toLowerCase() });
    if (!notification) throw new NotFoundException('Notification not found');
    notification.isRead = true;
    return this.notificationRepo.save(notification);
  }
}
