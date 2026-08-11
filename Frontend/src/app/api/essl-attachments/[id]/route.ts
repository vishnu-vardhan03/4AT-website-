import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getEsslSession } from "@/lib/server/essl-auth";
import { esslInternalApiKey } from "@/lib/server/essl-api-key";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getEsslSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { id } = await context.params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ error: "Invalid attachment." }, { status: 400 });
  const query = session.user.role === "technician" ? "" : `?email=${encodeURIComponent(session.user.email)}`;
  try {
    const response = await fetch(`${env.BACKEND_URL}/essl-tickets/attachments/${id}${query}`, {
      headers: { "x-essl-internal-key": esslInternalApiKey }, cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ error: response.status === 404 ? "Attachment not found." : "Attachment is unavailable." }, { status: response.status });
    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "application/octet-stream",
        "Content-Disposition": response.headers.get("content-disposition") ?? "inline",
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Attachment service is unavailable." }, { status: 503 });
  }
}
