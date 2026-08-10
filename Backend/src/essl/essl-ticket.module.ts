import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EsslTicketController } from './essl-ticket.controller';
import { EsslTicket } from './essl-ticket.entity';
import { EsslTicketService } from './essl-ticket.service';
import { EsslTicketAttachment } from './essl-ticket-attachment.entity';
import { EsslNotification } from './essl-notification.entity';
import { EsslNotificationController } from './essl-notification.controller';
import { EsslInternalGuard } from './essl-internal.guard';
import { EsslEmailLog } from './essl-email-log.entity';
import { EsslEmailService } from './essl-email.service';

@Module({
  imports: [TypeOrmModule.forFeature([EsslTicket, EsslTicketAttachment, EsslNotification, EsslEmailLog])],
  controllers: [EsslTicketController, EsslNotificationController],
  providers: [EsslTicketService, EsslInternalGuard, EsslEmailService],
})
export class EsslTicketModule {}
