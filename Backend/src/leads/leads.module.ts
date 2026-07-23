import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyLead } from '../academy/academy-lead.entity';
import { AcademyRegistration } from '../academy/academy-registration.entity';
import { AiLead } from '../ai/ai-lead.entity';
import { ConsultingLead } from '../consulting/consulting-lead.entity';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyLead, AcademyRegistration, ConsultingLead, AiLead])],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
