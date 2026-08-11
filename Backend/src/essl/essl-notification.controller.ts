import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { NotificationEmailDto } from './dto/notification-email.dto';
import { EsslTicketService } from './essl-ticket.service';
import { EsslInternalGuard } from './essl-internal.guard';

@Controller('essl-notifications')
@UseGuards(EsslInternalGuard)
export class EsslNotificationController {
  constructor(private readonly service: EsslTicketService) {}

  @Get()
  findAll(@Query() query: NotificationEmailDto) { return this.service.findNotifications(query.email); }

  @Patch(':id/read')
  markRead(@Param('id', ParseIntPipe) id: number, @Body() dto: NotificationEmailDto) {
    return this.service.markNotificationRead(id, dto.email);
  }
}
