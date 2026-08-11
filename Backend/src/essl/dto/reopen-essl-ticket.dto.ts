import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class ReopenEsslTicketDto {
  @Trim() @IsString() @IsNotEmpty() @MinLength(5) @MaxLength(2000) reason: string;
  @Trim() @IsEmail() @MaxLength(255) requesterEmail: string;
}
