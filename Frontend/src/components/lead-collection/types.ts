export const SERVICE_OPTIONS = [
  "Accounting",
  "Auditing",
  "4AT.AI",
  "4AT Academy",
  "Hybrid Services",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export interface LeadFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: ServiceOption | "";
  description: string;
}

export const LEAD_FORM_STORAGE_KEY = "4at:lead-widget:draft";
