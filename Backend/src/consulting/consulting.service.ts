import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultingLead } from './consulting-lead.entity';
import { ConsultingQueryDto } from './dto/consulting-query.dto';
import { CreateConsultingLeadDto } from './dto/create-consulting-lead.dto';
@Injectable()
export class ConsultingService {
  private readonly logger = new Logger(ConsultingService.name);
  constructor(@InjectRepository(ConsultingLead) private readonly repo: Repository<ConsultingLead>) {}
  async create(dto: CreateConsultingLeadDto) {
    this.logger.log(`Saving consulting lead for ${dto.email}`);
    try {
      const lead = await this.repo.save(this.repo.create(dto));
      this.logger.log(`Consulting lead saved with id ${lead.id}`);
      /* TODO(email-notification): Notify the Consulting team about this new lead. */
      return lead;
    } catch (error) {
      this.logger.error('Failed to save consulting lead', error instanceof Error ? error.stack : String(error));
      throw new InternalServerErrorException('Failed to save consulting lead');
    }
  }
  async findAll(query: ConsultingQueryDto) { const { page = 1, limit = 20 } = query; const [data, total] = await this.repo.findAndCount({ order: { createdAt: 'DESC' }, skip: (page - 1) * limit, take: limit }); return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } }; }
  async findOne(id: number) { const lead = await this.repo.findOneBy({ id }); if (!lead) throw new NotFoundException('Consulting lead not found'); return lead; }
  async remove(id: number) { const lead = await this.findOne(id); await this.repo.remove(lead); }
}
