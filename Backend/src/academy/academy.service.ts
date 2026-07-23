import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyLead } from './academy-lead.entity';
import { AcademyRegistration } from './academy-registration.entity';
import { AcademyQueryDto } from './dto/academy-query.dto';
import { CreateAcademyLeadDto } from './dto/create-academy-lead.dto';
import { CreateAcademyRegistrationDto } from './dto/create-academy-registration.dto';

@Injectable()
export class AcademyService {
  private readonly logger = new Logger(AcademyService.name);
  constructor(
    @InjectRepository(AcademyLead) private readonly repo: Repository<AcademyLead>,
    @InjectRepository(AcademyRegistration) private readonly registrationRepo: Repository<AcademyRegistration>,
  ) {}

  async create(dto: CreateAcademyLeadDto): Promise<AcademyLead> {
    this.logger.log(`Saving academy lead for ${dto.email}`);
    try {
      const lead = await this.repo.save(this.repo.create(dto));
      this.logger.log(`Academy lead saved with id ${lead.id}`);
      return lead;
    } catch (error) {
      this.logger.error('Failed to save academy lead', error instanceof Error ? error.stack : String(error));
      throw new InternalServerErrorException('Failed to save academy lead');
    }
  }

  async createRegistration(dto: CreateAcademyRegistrationDto): Promise<AcademyRegistration> {
    this.logger.log(`Saving academy registration for ${dto.email}`);
    try {
      const reg = await this.registrationRepo.save(this.registrationRepo.create(dto));
      this.logger.log(`Academy registration saved with id ${reg.id}`);
      return reg;
    } catch (error) {
      this.logger.error('Failed to save academy registration', error instanceof Error ? error.stack : String(error));
      throw new InternalServerErrorException('Failed to save academy registration');
    }
  }

  async findAll(query: AcademyQueryDto) {
    const { page = 1, limit = 20 } = query;
    const [data, total] = await this.repo.findAndCount({ order: { createdAt: 'DESC' }, skip: (page - 1) * limit, take: limit });
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findAllRegistrations(query: AcademyQueryDto) {
    const { page = 1, limit = 20 } = query;
    const [data, total] = await this.registrationRepo.findAndCount({ order: { createdAt: 'DESC' }, skip: (page - 1) * limit, take: limit });
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number): Promise<AcademyLead> {
    const lead = await this.repo.findOneBy({ id });
    if (!lead) throw new NotFoundException('Academy lead not found');
    return lead;
  }
  async remove(id: number): Promise<void> { const lead = await this.findOne(id); await this.repo.remove(lead); }
}
