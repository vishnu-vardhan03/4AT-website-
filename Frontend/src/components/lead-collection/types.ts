export const SERVICE_OPTIONS = [
  "AI Consulting",
  "AI Automation",
  "Finance AI",
  "SOC2 Consulting",
  "Custom Software",
  "AI Integration",
  "Other",
] as const;

export const COMPANY_SIZE_OPTIONS = [
  "1-10 Employees",
  "11-50 Employees",
  "51-200 Employees",
  "200+ Employees",
] as const;

export const BUDGET_OPTIONS = [
  "Less than $5,000",
  "$5,000 - $20,000",
  "$20,000 - $100,000",
  "Above $100,000",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];
export type CompanySizeOption = (typeof COMPANY_SIZE_OPTIONS)[number];
export type BudgetOption = (typeof BUDGET_OPTIONS)[number];

export interface LeadFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: ServiceOption | "";
  companySize: CompanySizeOption | "";
  budget: BudgetOption | "";
  description: string;
}

export const LEAD_FORM_STORAGE_KEY = "4at:lead-widget:draft";
