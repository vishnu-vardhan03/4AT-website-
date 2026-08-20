import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EsslInternalGuard } from '../essl/essl-internal.guard';
import { EctmsController } from './ectms.controller';
import { EctmsRecord } from './ectms-record.entity';
import { EctmsService } from './ectms.service';

@Module({ imports: [TypeOrmModule.forFeature([EctmsRecord])], controllers: [EctmsController], providers: [EctmsService, EsslInternalGuard] })
export class EctmsModule {}
