import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEsslTicketDto } from './dto/create-essl-ticket.dto';
import { UpdateEsslTicketStatusDto } from './dto/update-essl-ticket-status.dto';
import { EsslTicket } from './essl-ticket.entity';
import { EsslTicketAttachment } from './essl-ticket-attachment.entity';
import { EsslNotification } from './essl-notification.entity';
import { EsslEmailService } from './essl-email.service';

@Injectable()
export class EsslTicketService {
  private readonly logger = new Logger(EsslTicketService.name);

  constructor(
    @InjectRepository(EsslTicket) private readonly repo: Repository<EsslTicket>,
    @InjectRepository(EsslTicketAttachment) private readonly attachmentRepo: Repository<EsslTicketAttachment>,
    @InjectRepository(EsslNotification) private readonly notificationRepo: Repository<EsslNotification>,
    private readonly emailService: EsslEmailService,
  ) {}

  findAll(requesterEmail?: string) {
    return this.repo.find({
      where: requesterEmail ? { requesterEmail: requesterEmail.toLowerCase() } : undefined,
      relations: { attachments: true },
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
      await this.notificationRepo.save(this.notificationRepo.create({ recipientEmail: 'itsupport@consult-4at.com', ticketId: ticket.id, type: 'ticket-created', title: 'New ticket raised', message: `${dto.requesterEmail} raised ${ticket.subject}.`, isRead: false }));
      try { await this.emailService.sendTicketCreated(ticket); }
      catch (error) { this.logger.error(`Unexpected ticket-created email failure for ticket ${ticket.id}`, error instanceof Error ? error.stack : String(error)); }
      return ticket;
    } catch (error) {
      this.logger.error('Failed to save ESSL ticket', error instanceof Error ? error.stack : String(error));
      throw new InternalServerErrorException('Failed to save ticket');
    }
  }

  async updateStatus(id: number, dto: UpdateEsslTicketStatusDto) {
    const ticket = await this.repo.findOneBy({ id });
    if (!ticket) throw new NotFoundException('Ticket not found');
    if (ticket.status === dto.status) return ticket;
    const previousStatus = ticket.status;
    ticket.status = dto.status;
    if (dto.adminComment !== undefined) ticket.adminComment = dto.adminComment.trim() || null;
    const saved = await this.repo.save(ticket);
    if (ticket.requesterEmail) await this.notificationRepo.save(this.notificationRepo.create({ recipientEmail: ticket.requesterEmail, ticketId: ticket.id, type: 'status-updated', title: 'Ticket status updated', message: `${ticket.subject} is now ${dto.status}.`, isRead: false }));
    if (ticket.requesterEmail) {
      try { await this.emailService.sendStatusChanged({ ticket: saved, previousStatus, newStatus: dto.status, adminComment: saved.adminComment }); }
      catch (error) { this.logger.error(`Unexpected status email failure for ticket ${ticket.id}`, error instanceof Error ? error.stack : String(error)); }
    }
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
