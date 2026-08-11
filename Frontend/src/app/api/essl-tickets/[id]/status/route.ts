import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { hasEsslTechnicianSession } from "@/lib/server/essl-auth";
import { esslInternalApiKey } from "@/lib/server/essl-api-key";

const schema = z.object({ status: z.enum(["New", "In progress", "Waiting", "Resolved", "Closed"]), adminComment: z.string().trim().max(5000).optional() });

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await hasEsslTechnicianSession())) return NextResponse.json({ error: "Technician access is required." }, { status: 403 });
  const { id } = await context.params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ error: "Invalid ticket ID." }, { status: 400 });
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Choose a valid ticket status." }, { status: 400 });
    const response = await fetch(`${env.BACKEND_URL}/essl-tickets/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json", "x-essl-internal-key": esslInternalApiKey }, body: JSON.stringify(parsed.data), cache: "no-store" });
    const body = await response.json().catch(() => ({ error: "The ticket service returned an invalid response." }));
    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error("ESSL ticket status update failed", error);
    return NextResponse.json({ error: "The status could not be updated. Please try again." }, { status: 503 });
  }
}
