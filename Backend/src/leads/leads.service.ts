import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { AcademyLead } from '../academy/academy-lead.entity';
import { AiLead } from '../ai/ai-lead.entity';
import { ConsultingLead } from '../consulting/consulting-lead.entity';
import { LeadCategory, LeadsQueryDto } from './dto/leads-query.dto';
import { LeadResponse, LeadsPageResponse, LeadsSummaryResponse } from './dto/leads-response.dto';

type LeadEntity = AcademyLead | ConsultingLead | AiLead;

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(AcademyLead) private readonly academy: Repository<AcademyLead>,
    @InjectRepository(ConsultingLead) private readonly consulting: Repository<ConsultingLead>,
    @InjectRepository(AiLead) private readonly ai: Repository<AiLead>,
  ) {}

  async summary(): Promise<LeadsSummaryResponse> {
    const [academyLeads, consultingLeads, aiLeads] = await Promise.all([
      this.academy.count(),
      this.consulting.count(),
      this.ai.count(),
    ]);
    return { academyLeads, consultingLeads, aiLeads, totalLeads: academyLeads + consultingLeads + aiLeads };
  }

  async findAll(query: LeadsQueryDto): Promise<LeadsPageResponse> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const offset = (page - 1) * limit;
    const fetchLimit = offset + limit;
    const sources = this.sources(query.category);

    const results = await Promise.all(
      sources.map(async ({ category, repository }) => {
        const builder = repository.createQueryBuilder('lead').orderBy('lead.createdAt', 'DESC').take(fetchLimit);
        this.applySearch(builder, query.search);
        const [records, total] = await builder.getManyAndCount();
        return { records: records.map((record) => this.normalize(record, category)), total };
      }),
    );

    const data = results
      .flatMap((result) => result.records)
      .sort((left, right) => this.timestamp(right.createdAt) - this.timestamp(left.createdAt))
      .slice(offset, offset + limit);
    const total = results.reduce((sum, result) => sum + result.total, 0);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  private sources(category?: LeadCategory) {
    const all = [
      { category: LeadCategory.ACADEMY, repository: this.academy as Repository<LeadEntity> },
      { category: LeadCategory.CONSULTING, repository: this.consulting as Repository<LeadEntity> },
      { category: LeadCategory.AI, repository: this.ai as Repository<LeadEntity> },
    ];
    return category ? all.filter((source) => source.category === category) : all;
  }

  private applySearch<T extends ObjectLiteral>(builder: SelectQueryBuilder<T>, search?: string): void {
    const value = search?.trim();
    if (!value) return;
    builder.andWhere(
      new Brackets((where) => {
        where
          .where('lead.fullName ILIKE :search', { search: `%${value}%` })
          .orWhere('lead.email ILIKE :search', { search: `%${value}%` })
          .orWhere('lead.phone ILIKE :search', { search: `%${value}%` });
      }),
    );
  }

  private normalize(lead: LeadEntity, category: LeadCategory): LeadResponse {
    return {
      id: lead.id,
      fullName: lead.fullName,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      createdAt: lead.createdAt,
      category,
    };
  }

  private timestamp(value: Date | null): number {
    return value ? new Date(value).getTime() : 0;
  }
}
