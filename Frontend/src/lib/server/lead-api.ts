import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export type LeadEndpoint = "academy-leads" | "consulting-leads" | "ai-leads";

export interface LeadPayload {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
}

const BACKEND_TIMEOUT_MS = 10_000;

export async function forwardLead(endpoint: LeadEndpoint, payload: LeadPayload): Promise<NextResponse> {
  try {
    // Resolve through the single shared chain in `@/lib/env`. A local fallback chain here
    // silently pointed public lead intake at localhost whenever the deploy configured only
    // NEXT_PUBLIC_API_URL, while the admin dashboard kept working.
    const response = await fetch(`${env.BACKEND_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
    const result: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("Lead API rejected request", { endpoint, status: response.status });
      return NextResponse.json(result ?? { error: "Unable to save submission." }, { status: response.status });
    }
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    console.error("Lead API request failed", { endpoint, timedOut });
    return NextResponse.json(
      { error: timedOut ? "The lead service timed out. Please try again." : "The lead service is unavailable." },
      { status: timedOut ? 504 : 502 },
    );
  }
}

export function validationError(issues: Record<string, string[] | undefined>): NextResponse {
  return NextResponse.json({ error: "Please check the form for errors.", issues }, { status: 400 });
}
