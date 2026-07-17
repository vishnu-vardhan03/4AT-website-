import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiLead } from './ai-lead.entity';
import { AiQueryDto } from './dto/ai-query.dto';
import { CreateAiLeadDto } from './dto/create-ai-lead.dto';
@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  constructor(@InjectRepository(AiLead) private readonly repo: Repository<AiLead>) {}
  async create(dto: CreateAiLeadDto) {
    this.logger.log(`Saving AI lead for ${dto.email}`);
    try {
      const lead = await this.repo.save(this.repo.create(dto));
      this.logger.log(`AI lead saved with id ${lead.id}`);
      /* TODO(email-notification): Notify the AI team about this new lead. */
      return lead;
    } catch (error) {
      this.logger.error('Failed to save AI lead', error instanceof Error ? error.stack : String(error));
      throw new InternalServerErrorException('Failed to save AI lead');
    }
  }
  async findAll(query: AiQueryDto) { const { page = 1, limit = 20 } = query; const [data, total] = await this.repo.findAndCount({ order: { createdAt: 'DESC' }, skip: (page - 1) * limit, take: limit }); return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } }; }
  async findOne(id: number) { const lead = await this.repo.findOneBy({ id }); if (!lead) throw new NotFoundException('AI lead not found'); return lead; }
  async remove(id: number) { const lead = await this.findOne(id); await this.repo.remove(lead); }
}
