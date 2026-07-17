import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyLead } from '../academy/academy-lead.entity';
import { AiLead } from '../ai/ai-lead.entity';
import { ConsultingLead } from '../consulting/consulting-lead.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(AcademyLead) private readonly academy: Repository<AcademyLead>,
    @InjectRepository(ConsultingLead) private readonly consulting: Repository<ConsultingLead>,
    @InjectRepository(AiLead) private readonly ai: Repository<AiLead>,
  ) {}

  async stats() {
    const [academyLeads, consultingLeads, aiLeads] = await Promise.all([
      this.academy.count(), this.consulting.count(), this.ai.count(),
    ]);
    return { academyLeads, consultingLeads, aiLeads, totalLeads: academyLeads + consultingLeads + aiLeads };
  }
}
