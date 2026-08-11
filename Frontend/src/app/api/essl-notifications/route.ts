import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getEsslSession } from "@/lib/server/essl-auth";
import { esslInternalApiKey } from "@/lib/server/essl-api-key";

export async function GET() {
  const session = await getEsslSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  try {
    const response = await fetch(`${env.BACKEND_URL}/essl-notifications?email=${encodeURIComponent(session.user.email)}`, { headers: { "x-essl-internal-key": esslInternalApiKey }, cache: "no-store" });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch { return NextResponse.json({ error: "Notifications are unavailable." }, { status: 503 }); }
}
