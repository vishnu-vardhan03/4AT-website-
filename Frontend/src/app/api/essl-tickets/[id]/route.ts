import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { getEsslSession } from "@/lib/server/essl-auth";
import { esslInternalApiKey } from "@/lib/server/essl-api-key";

const schema = z.object({ subject: z.string().trim().min(2).max(255), description: z.string().trim().min(2).max(5000), category: z.enum(["IT & Access", "Facilities", "Food", "Cab", "Finance & Admin", "Others"]), priority: z.enum(["Low", "Medium", "High"]) });
const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "video/mp4", "video/webm", "video/quicktime", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getEsslSession();
  if (!session?.user?.email || session.user.role === "technician") return NextResponse.json({ error: "Employee access is required." }, { status: 403 });
  const { id } = await context.params;
  if (!/^\d+$/.test(id)) return NextResponse.json({ error: "Invalid ticket ID." }, { status: 400 });
  try {
    const formData = await request.formData();
    const parsed = schema.safeParse({ subject: formData.get("subject"), description: formData.get("description"), category: formData.get("category"), priority: formData.get("priority") });
    if (!parsed.success) return NextResponse.json({ error: "Complete all ticket fields before saving." }, { status: 400 });
    const attachment = formData.get("attachment");
    if (attachment instanceof File && attachment.size > 0) {
      if (!allowedTypes.has(attachment.type)) return NextResponse.json({ error: "Choose a PNG, JPG, WebP, MP4, WebM, MOV, PDF, DOC, or DOCX file." }, { status: 400 });
      if (attachment.size > 10 * 1024 * 1024) return NextResponse.json({ error: "The attachment must be 10 MB or smaller." }, { status: 400 });
    }
    const outgoing = new FormData();
    Object.entries(parsed.data).forEach(([key, value]) => outgoing.set(key, value));
    outgoing.set("requesterEmail", session.user.email.toLowerCase());
    if (attachment instanceof File && attachment.size > 0) outgoing.set("attachment", attachment);
    const response = await fetch(`${env.BACKEND_URL}/essl-tickets/${id}`, { method: "PATCH", headers: { "x-essl-internal-key": esslInternalApiKey }, body: outgoing, cache: "no-store" });
    const body = await response.json().catch(() => ({ error: "The ticket service returned an invalid response." }));
    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error("ESSL ticket edit failed", error);
    return NextResponse.json({ error: "The ticket could not be saved. Please try again." }, { status: 503 });
  }
}
