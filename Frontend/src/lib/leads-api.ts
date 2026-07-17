import type { LeadsStats } from "@/components/dashboard/types";
import { env } from "@/lib/env";

export type LeadCategory = "academy" | "consulting" | "ai";

export interface LeadRecord {
  id: number;
  fullName: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  createdAt: string | null;
  category: LeadCategory;
}

export interface LeadsPage {
  data: LeadRecord[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface LeadsQuery {
  category?: LeadCategory;
  page?: number;
  limit?: number;
  search?: string;
}

function dashboardHeaders(): HeadersInit | undefined {
  return env.LEADS_API_KEY ? { Authorization: `Bearer ${env.LEADS_API_KEY}` } : undefined;
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    const cause = error.cause instanceof Error ? `; cause: ${error.cause.message}` : "";
    return `${error.name}: ${error.message}${cause}`;
  }
  return String(error);
}

export async function getLeadsSummary(): Promise<LeadsStats | null> {
  if (!env.LEADS_API_KEY) {
    console.error("[leads-api] LEADS_API_KEY is not configured; refusing to request dashboard PII");
    return null;
  }
  try {
    const url = `${env.NEXT_PUBLIC_API_URL}/leads/summary`;
    const response = await fetch(url, {
      cache: "no-store",
      headers: dashboardHeaders(),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error(`[leads-api] GET ${url} failed with ${response.status} ${response.statusText}`, detail);
      return null;
    }
    const value: unknown = await response.json();
    if (!value || typeof value !== "object") {
      console.error("[leads-api] Summary response was not a JSON object", value);
      return null;
    }
    const stats = value as Record<string, unknown>;
    const valid = ["academyLeads", "consultingLeads", "aiLeads", "totalLeads"].every(
      (key) => typeof stats[key] === "number" && Number.isFinite(stats[key]) && stats[key] >= 0,
    );
    if (!valid) {
      console.error("[leads-api] Summary response did not match the expected shape", value);
      return null;
    }
    return stats as unknown as LeadsStats;
  } catch (error) {
    console.warn(`[leads-api] Unable to reach ${env.NEXT_PUBLIC_API_URL}/leads/summary: ${errorMessage(error)}`);
    return null;
  }
}

export async function getLeads(query: LeadsQuery = {}): Promise<LeadsPage | null> {
  if (!env.LEADS_API_KEY) {
    console.error("[leads-api] LEADS_API_KEY is not configured; refusing to request dashboard PII");
    return null;
  }
  const params = new URLSearchParams();
  if (query.category) params.set("category", query.category);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.search) params.set("search", query.search);

  try {
    const suffix = params.size ? `?${params.toString()}` : "";
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/leads${suffix}`, {
      cache: "no-store",
      headers: dashboardHeaders(),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error(`[leads-api] GET ${response.url} failed with ${response.status} ${response.statusText}`, detail);
      return null;
    }
    return (await response.json()) as LeadsPage;
  } catch (error) {
    console.warn(`[leads-api] Unable to reach ${env.NEXT_PUBLIC_API_URL}/leads: ${errorMessage(error)}`);
    return null;
  }
}
