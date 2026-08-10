import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { createReadStream, existsSync } from 'fs';
import type { Response } from 'express';
import { CreateEsslTicketDto } from './dto/create-essl-ticket.dto';
import { UpdateEsslTicketStatusDto } from './dto/update-essl-ticket-status.dto';
import { EsslTicketService } from './essl-ticket.service';
import { EsslInternalGuard } from './essl-internal.guard';
import { NotificationEmailDto } from './dto/notification-email.dto';

@Controller('essl-tickets')
@UseGuards(EsslInternalGuard)
export class EsslTicketController {
  constructor(private readonly service: EsslTicketService) {}

  @Get()
  findAll(@Query() query: Partial<NotificationEmailDto>) {
    return this.service.findAll(query.email);
  }

  @Post()
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @UseInterceptors(FileInterceptor('attachment', {
    storage: diskStorage({
      destination: (_request, _file, callback) => {
        const directory = join(process.cwd(), 'uploads', 'essl');
        mkdirSync(directory, { recursive: true });
        callback(null, directory);
      },
      filename: (_request, file, callback) => callback(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`),
    }),
    limits: { fileSize: 10 * 1024 * 1024, files: 1 },
    fileFilter: (_request, file, callback) => {
      const allowed = new Set(['image/png', 'image/jpeg', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
      callback(allowed.has(file.mimetype) ? null : new BadRequestException('Only PNG, JPG, WebP, MP4, WebM, MOV, PDF, DOC, and DOCX files are allowed.'), allowed.has(file.mimetype));
    },
  }))
  create(@Body() dto: CreateEsslTicketDto, @UploadedFile() file?: Express.Multer.File) {
    return this.service.create(dto, file);
  }

  @Get('attachments/:id')
  async openAttachment(@Param('id', ParseIntPipe) id: number, @Query() query: Partial<NotificationEmailDto>, @Res({ passthrough: true }) response: Response) {
    const attachment = await this.service.findAttachment(id, query.email);
    const absolutePath = join(process.cwd(), 'uploads', 'essl', attachment.storedName);
    if (!existsSync(absolutePath)) throw new BadRequestException('Attachment file is unavailable');
    response.set({
      'Content-Type': attachment.mimeType,
      'Content-Length': String(attachment.sizeBytes),
      'Content-Disposition': `inline; filename*=UTF-8''${encodeURIComponent(attachment.originalName)}`,
      'Cache-Control': 'private, no-store',
    });
    return new StreamableFile(createReadStream(absolutePath));
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEsslTicketStatusDto) {
    return this.service.updateStatus(id, dto);
  }
}
