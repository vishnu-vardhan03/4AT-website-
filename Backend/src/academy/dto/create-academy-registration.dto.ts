import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Trim } from '../../common/decorators/trim.decorator';

export class CreateAcademyRegistrationDto {
  @Trim() @IsString() @IsNotEmpty() @MaxLength(100)
  firstName: string;

  @Trim() @IsString() @IsNotEmpty() @MaxLength(100)
  lastName: string;

  @Trim() @IsString() @IsNotEmpty() @MaxLength(50)
  gender: string;

  @Trim() @IsString() @IsNotEmpty() @MaxLength(100)
  country: string;

  @Trim() @IsString() @IsNotEmpty() @MaxLength(100)
  state: string;

  @Trim() @IsString() @IsNotEmpty() @MaxLength(100)
  city: string;

  @Trim() @IsEmail() @IsNotEmpty() @MaxLength(255)
  email: string;

  @Trim() @IsString() @IsNotEmpty() @MaxLength(50)
  mobileNumber: string;

  @Trim() @IsString() @IsNotEmpty() @MaxLength(50)
  applicantType: string;

  // Student specific (optional)
  @Trim() @IsOptional() @IsString() @MaxLength(255)
  college?: string;

  @Trim() @IsOptional() @IsString() @MaxLength(255)
  programName?: string;

  @Trim() @IsOptional() @IsString() @MaxLength(100)
  academicYear?: string;

  @Trim() @IsOptional() @IsString() @MaxLength(255)
  department?: string;

  // Professional specific (optional)
  @Trim() @IsOptional() @IsString() @MaxLength(255)
  companyName?: string;

  @Trim() @IsOptional() @IsString() @MaxLength(255)
  jobTitle?: string;

  @Trim() @IsOptional() @IsString() @MaxLength(255)
  industry?: string;

  @Trim() @IsOptional() @IsString() @MaxLength(100)
  yearsOfExperience?: string;

  // Shared metadata
  @Trim() @IsString() @IsNotEmpty() @MaxLength(255)
  highestEducation: string;

  @Trim() @IsOptional() @IsString() @MaxLength(255)
  referredBy?: string;
}
