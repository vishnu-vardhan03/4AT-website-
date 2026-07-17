import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum LeadCategory {
  ACADEMY = 'academy',
  CONSULTING = 'consulting',
  AI = 'ai',
}

export class LeadsQueryDto {
  @IsOptional()
  @IsEnum(LeadCategory)
  category?: LeadCategory;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @IsOptional()
  @IsString()
  search?: string;
}
