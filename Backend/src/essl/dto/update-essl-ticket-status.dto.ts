import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';
import type { EsslTicketStatus } from '../essl-ticket.entity';

export class UpdateEsslTicketStatusDto {
  @IsIn(['New', 'In progress', 'Waiting', 'Resolved', 'Closed', 'Reopened']) status: EsslTicketStatus;
  @Trim() @IsOptional() @IsString() @MaxLength(5000) adminComment?: string;
}
