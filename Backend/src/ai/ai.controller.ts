import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; import { Throttle } from '@nestjs/throttler'; import { AiService } from './ai.service'; import { AiQueryDto } from './dto/ai-query.dto'; import { CreateAiLeadDto } from './dto/create-ai-lead.dto';
@ApiTags('AI') @Controller('ai-leads') export class AiController {
  private readonly logger = new Logger(AiController.name);
  constructor(private readonly service: AiService) {}
  @Post() @Throttle({ default: { limit: 5, ttl: 60_000 } }) create(@Body() dto: CreateAiLeadDto) { this.logger.log(`Received AI lead: ${JSON.stringify(dto)}`); return this.service.create(dto); }
  @Get() findAll(@Query() query: AiQueryDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
