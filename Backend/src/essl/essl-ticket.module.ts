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
import { EsslTicketActivity } from './essl-ticket-activity.entity';
import { EsslEodSummaryController } from './essl-eod-summary.controller';
import { EsslEodSummaryService } from './essl-eod-summary.service';

@Module({
  imports: [TypeOrmModule.forFeature([EsslTicket, EsslTicketAttachment, EsslTicketActivity, EsslNotification, EsslEmailLog])],
  controllers: [EsslTicketController, EsslNotificationController, EsslEodSummaryController],
  providers: [EsslTicketService, EsslInternalGuard, EsslEmailService, EsslEodSummaryService],
})
export class EsslTicketModule {}
