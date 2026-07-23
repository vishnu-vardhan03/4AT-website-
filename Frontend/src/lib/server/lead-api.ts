import { NextResponse } from "next/server";

export type LeadEndpoint = "academy-leads" | "consulting-leads" | "ai-leads";

export interface LeadPayload {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
}

const BACKEND_TIMEOUT_MS = 10_000;

function backendUrl(): string {
  return process.env.BACKEND_URL ?? process.env.BACKEND_API_URL ?? "http://localhost:5000";
}

export async function forwardLead(endpoint: LeadEndpoint, payload: LeadPayload): Promise<NextResponse> {
  try {
    const response = await fetch(`${backendUrl()}/${endpoint}`, {
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
