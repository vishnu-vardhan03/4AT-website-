import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { getEsslSession } from "@/lib/server/essl-auth";
import { esslInternalApiKey } from "@/lib/server/essl-api-key";

const schema = z.object({
  subject: z.string().trim().min(2).max(255),
  description: z.string().trim().min(2).max(5000),
  category: z.enum(["IT & Access", "Facilities", "Food"]),
  priority: z.enum(["Low", "Medium", "High"]),
});

async function forward(path: string, init?: RequestInit) {
  try {
    const response = await fetch(`${env.BACKEND_URL}${path}`, {
      ...init,
      headers: { ...Object.fromEntries(new Headers(init?.headers).entries()), "x-essl-internal-key": esslInternalApiKey },
      cache: "no-store",
    });
    const body = await response.json().catch(() => ({ error: "The ticket service returned an invalid response." }));
    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error("ESSL ticket service is unavailable", error);
    return NextResponse.json({ error: "The ticket service is unavailable. Please try again." }, { status: 503 });
  }
}

export async function GET() {
  const session = await getEsslSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Sign in with your organization account." }, { status: 401 });
  const query = session.user.role === "technician" ? "" : `?email=${encodeURIComponent(session.user.email)}`;
  return forward(`/essl-tickets${query}`);
}

export async function POST(request: Request) {
  const session = await getEsslSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Sign in with your organization email." }, { status: 401 });
  try {
    const formData = await request.formData();
    const parsed = schema.safeParse({
      subject: formData.get("subject"), description: formData.get("description"),
      category: formData.get("category"), priority: formData.get("priority"),
    });
    if (!parsed.success) return NextResponse.json({ error: "Please complete all ticket details." }, { status: 400 });
    const attachment = formData.get("attachment");
    if (attachment instanceof File) {
      const allowed = new Set(["image/png", "image/jpeg", "image/webp", "video/mp4", "video/webm", "video/quicktime", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
      if (!allowed.has(attachment.type)) return NextResponse.json({ error: "Choose a PNG, JPG, WebP, MP4, WebM, MOV, PDF, DOC, or DOCX file." }, { status: 400 });
      if (attachment.size > 10 * 1024 * 1024) return NextResponse.json({ error: "The attachment must be 10 MB or smaller." }, { status: 400 });
    }
    const outgoing = new FormData();
    Object.entries(parsed.data).forEach(([key, value]) => outgoing.set(key, value));
    outgoing.set("requesterEmail", session.user.email.toLowerCase());
    if (attachment instanceof File && attachment.size > 0) outgoing.set("attachment", attachment);
    return forward("/essl-tickets", { method: "POST", body: outgoing });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
