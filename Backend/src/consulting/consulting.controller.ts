import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ConsultingService } from './consulting.service';
import { ConsultingQueryDto } from './dto/consulting-query.dto';
import { CreateConsultingLeadDto } from './dto/create-consulting-lead.dto';
@ApiTags('Consulting') @Controller('consulting-leads')
export class ConsultingController {
  private readonly logger = new Logger(ConsultingController.name);
  constructor(private readonly service: ConsultingService) {}
  @Post() @Throttle({ default: { limit: 5, ttl: 60_000 } }) create(@Body() dto: CreateConsultingLeadDto) { this.logger.log(`Received consulting lead: ${JSON.stringify(dto)}`); return this.service.create(dto); }
  @Get() @UseGuards(JwtAuthGuard) findAll(@Query() query: ConsultingQueryDto) { return this.service.findAll(query); }
  @Get(':id') @UseGuards(JwtAuthGuard) findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Delete(':id') @UseGuards(JwtAuthGuard) @HttpCode(HttpStatus.NO_CONTENT) remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
