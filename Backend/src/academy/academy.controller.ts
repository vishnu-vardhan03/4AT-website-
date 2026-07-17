import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AcademyService } from './academy.service';
import { AcademyQueryDto } from './dto/academy-query.dto';
import { CreateAcademyLeadDto } from './dto/create-academy-lead.dto';

@ApiTags('Academy') @Controller('academy-leads')
export class AcademyController {
  private readonly logger = new Logger(AcademyController.name);
  constructor(private readonly service: AcademyService) {}
  @Post() @Throttle({ default: { limit: 5, ttl: 60_000 } }) create(@Body() dto: CreateAcademyLeadDto) { this.logger.log(`Received academy lead: ${JSON.stringify(dto)}`); return this.service.create(dto); }
  @Get() findAll(@Query() query: AcademyQueryDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
