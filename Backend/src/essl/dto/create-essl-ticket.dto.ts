import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';
import type { EsslTicketCategory, EsslTicketPriority } from '../essl-ticket.entity';

export class CreateEsslTicketDto {
  @Trim() @IsString() @IsNotEmpty() @MaxLength(255) subject: string;
  @Trim() @IsString() @IsNotEmpty() @MaxLength(5000) description: string;
  @IsIn(['IT & Access', 'Facilities', 'Food']) category: EsslTicketCategory;
  @IsIn(['Low', 'Medium', 'High']) priority: EsslTicketPriority;
  @Trim() @IsEmail() @MaxLength(255) requesterEmail: string;
}
