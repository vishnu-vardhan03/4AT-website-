import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm'; import { AiLead } from './ai-lead.entity'; import { AiController } from './ai.controller'; import { AiService } from './ai.service';
@Module({ imports: [TypeOrmModule.forFeature([AiLead])], controllers: [AiController], providers: [AiService], exports: [TypeOrmModule] }) export class AiModule {}
