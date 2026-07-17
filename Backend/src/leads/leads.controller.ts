import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LeadsQueryDto } from './dto/leads-query.dto';
import { LeadsApiKeyGuard } from './leads-api-key.guard';
import { LeadsService } from './leads.service';

@ApiTags('Leads')
@ApiBearerAuth()
@UseGuards(LeadsApiKeyGuard)
@Controller('leads')
export class LeadsController {
  constructor(private readonly service: LeadsService) {}

  @Get('summary')
  summary() {
    return this.service.summary();
  }

  @Get()
  findAll(@Query() query: LeadsQueryDto) {
    return this.service.findAll(query);
  }
}
