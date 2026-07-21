import type { LeadsStats } from "@/components/dashboard/types";
import { env } from "@/lib/env";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

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

const leadsStatsSchema = z.object({
  academyLeads: z.number().finite().nonnegative(),
  consultingLeads: z.number().finite().nonnegative(),
  aiLeads: z.number().finite().nonnegative(),
  totalLeads: z.number().finite().nonnegative(),
});

const leadRecordSchema = z.object({
  id: z.number(),
  fullName: z.string().nullable(),
  company: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  message: z.string().nullable(),
  createdAt: z.string().nullable(),
  category: z.enum(["academy", "consulting", "ai"]),
});

const leadsPageSchema = z.object({
  data: z.array(leadRecordSchema),
  meta: z.object({
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    totalPages: z.number().int().nonnegative(),
  }),
});

function unwrapDataEnvelope(value: unknown): unknown {
  if (!value || typeof value !== "object" || !("data" in value)) return value;
  const nested = (value as { data?: unknown }).data;
  return nested && typeof nested === "object" && !Array.isArray(nested) ? nested : value;
}

export function parseLeadsSummary(value: unknown): LeadsStats | null {
  const candidate = unwrapDataEnvelope(value);
  const parsed = leadsStatsSchema.safeParse(candidate);
  if (!parsed.success) {
    console.error("[leads-api] Invalid GET /leads/summary response", {
      issues: parsed.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
      received: value,
    });
    return null;
  }
  return parsed.data;
}

export function parseLeadsPage(value: unknown): LeadsPage | null {
  const candidate = unwrapDataEnvelope(value);
  const parsed = leadsPageSchema.safeParse(candidate);
  if (!parsed.success) {
    console.error("[leads-api] Invalid GET /leads response", {
      issues: parsed.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
      received: value,
    });
    return null;
  }
  return parsed.data;
}

async function dashboardHeaders(accessToken?: string): Promise<HeadersInit | undefined> {
  const token = accessToken ?? (await getServerSession(authOptions))?.accessToken;
  if (!token) {
    console.error("[leads-api] Cannot request admin lead data: the server session has no backend access token");
    return undefined;
  }
  return { Authorization: `Bearer ${token}` };
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    const cause = error.cause instanceof Error ? `; cause: ${error.cause.message}` : "";
    return `${error.name}: ${error.message}${cause}`;
  }
  return String(error);
}

export async function getLeadsSummary(accessToken?: string): Promise<LeadsStats | null> {
  const headers = await dashboardHeaders(accessToken);
  if (!headers) return null;
  try {
    const url = `${env.BACKEND_URL}/leads/summary`;
    const response = await fetch(url, {
      cache: "no-store",
      headers,
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error(`[leads-api] GET ${url} failed with ${response.status} ${response.statusText}`, detail);
      return null;
    }
    return parseLeadsSummary(await response.json());
  } catch (error) {
    console.error(`[leads-api] Failed to load ${env.BACKEND_URL}/leads/summary: ${errorMessage(error)}`);
    return null;
  }
}

export async function getLeads(query: LeadsQuery = {}, accessToken?: string): Promise<LeadsPage | null> {
  const headers = await dashboardHeaders(accessToken);
  if (!headers) return null;
  const params = new URLSearchParams();
  if (query.category) params.set("category", query.category);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  if (query.search) params.set("search", query.search);

  try {
    const suffix = params.size ? `?${params.toString()}` : "";
    const response = await fetch(`${env.BACKEND_URL}/leads${suffix}`, {
      cache: "no-store",
      headers,
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error(`[leads-api] GET ${response.url} failed with ${response.status} ${response.statusText}`, detail);
      return null;
    }
    return parseLeadsPage(await response.json());
  } catch (error) {
    console.error(`[leads-api] Failed to load ${env.BACKEND_URL}/leads: ${errorMessage(error)}`);
    return null;
  }
}
