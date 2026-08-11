import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { getEsslSession } from "@/lib/server/essl-auth";
import { esslInternalApiKey } from "@/lib/server/essl-api-key";

const schema = z.object({ reason: z.string().trim().min(5).max(2000) });

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getEsslSession();
  if (!session?.user?.email || session.user.role === "technician") return NextResponse.json({ error: "Employee access is required." }, { status: 403 });
  const { id } = await context.params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ error: "Invalid ticket ID." }, { status: 400 });
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Add a reason of at least 5 characters." }, { status: 400 });
    const response = await fetch(`${env.BACKEND_URL}/essl-tickets/${id}/reopen`, { method: "PATCH", headers: { "Content-Type": "application/json", "x-essl-internal-key": esslInternalApiKey }, body: JSON.stringify({ ...parsed.data, requesterEmail: session.user.email.toLowerCase() }), cache: "no-store" });
    const body = await response.json().catch(() => ({ error: "The ticket service returned an invalid response." }));
    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error("ESSL ticket reopen failed", error);
    return NextResponse.json({ error: "The ticket could not be reopened. Please try again." }, { status: 503 });
  }
}
