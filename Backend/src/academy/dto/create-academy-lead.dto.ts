import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';
export class CreateAcademyLeadDto {
  @Trim() @IsString() @IsNotEmpty() @MaxLength(255) fullName: string;
  @Trim() @IsOptional() @IsString() @MaxLength(255) company?: string;
  @Trim() @IsEmail() @MaxLength(255) email: string;
  @Trim() @IsOptional() @IsString() @MaxLength(50) phone?: string;
  @Trim() @IsOptional() @IsString() @MaxLength(5000) message?: string;
}
