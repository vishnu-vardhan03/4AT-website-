import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyLead } from './academy-lead.entity';
import { AcademyController } from './academy.controller';
import { AcademyService } from './academy.service';

@Module({ imports: [TypeOrmModule.forFeature([AcademyLead])], controllers: [AcademyController], providers: [AcademyService], exports: [TypeOrmModule] })
export class AcademyModule {}
