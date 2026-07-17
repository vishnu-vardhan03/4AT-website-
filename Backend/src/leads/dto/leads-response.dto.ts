import { LeadCategory } from './leads-query.dto';

export interface LeadsSummaryResponse {
  academyLeads: number;
  consultingLeads: number;
  aiLeads: number;
  totalLeads: number;
}

export interface LeadResponse {
  id: number;
  fullName: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  createdAt: Date | null;
  category: LeadCategory;
}

export interface LeadsPageResponse {
  data: LeadResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
