import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/**
 * Categories `GET /leads` can actually serve. Academy *registrations* live in their own
 * table with a different shape and are served by `GET /academy-leads/registrations`;
 * listing them here would make `?category=` silently return an empty page.
 */
export enum LeadCategory {
  ACADEMY = 'academy',
  CONSULTING = 'consulting',
  AI = 'ai',
}

/** Upper bound on `page`. `findAll` fetches `offset + limit` rows per table, so an
 *  unbounded page number would make a single request materialise millions of rows. */
export const MAX_PAGE = 1000;

export class LeadsQueryDto {
  @IsOptional()
  @IsEnum(LeadCategory)
  category?: LeadCategory;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(MAX_PAGE)
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
