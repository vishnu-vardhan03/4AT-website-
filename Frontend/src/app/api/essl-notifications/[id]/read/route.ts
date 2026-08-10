import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getEsslSession } from "@/lib/server/essl-auth";
import { esslInternalApiKey } from "@/lib/server/essl-api-key";

export async function PATCH(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getEsslSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { id } = await context.params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ error: "Invalid notification." }, { status: 400 });
  try {
    const response = await fetch(`${env.BACKEND_URL}/essl-notifications/${id}/read`, { method: "PATCH", headers: { "Content-Type": "application/json", "x-essl-internal-key": esslInternalApiKey }, body: JSON.stringify({ email: session.user.email }), cache: "no-store" });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch { return NextResponse.json({ error: "Notification could not be updated." }, { status: 503 }); }
}
