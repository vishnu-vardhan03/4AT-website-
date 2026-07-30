export const SERVICE_OPTIONS = [
  "Hybrid Services",
  "Re-engineering & Transformation",
  "4AT.AI",
  "4AT Academy",
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
