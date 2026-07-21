import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AcademyModule } from './academy/academy.module';
import { AiModule } from './ai/ai.module';
import { CommonModule } from './common/common.module';
import { ConsultingModule } from './consulting/consulting.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { LeadsModule } from './leads/leads.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.local', '.env'] }),
    ThrottlerModule.forRoot([{ name: 'default', ttl: 60_000, limit: 100 }]),
    DatabaseModule, CommonModule, AuthModule, AcademyModule, ConsultingModule, AiModule, LeadsModule, HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
