import { NextResponse } from "next/server";
import { z } from "zod";

const API_URL = process.env.BACKEND_API_URL ?? "http://localhost:5000";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(255),
  company: z.string().trim().max(255).optional().default(""),
  email: z.string().trim().email(),
  phone: z.string().trim().max(50).optional().default(""),
  service: z.string().trim().max(120).optional().default("Other"),
  companySize: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(120).optional(),
  description: z.string().trim().max(5000).optional().default(""),
  website: z.string().optional(),
});

function getLeadEndpoint(service: string) {
  switch (service.trim().toLowerCase()) {
    case "4at consulting":
    case "accounting":
    case "auditing":
    case "hybrid services":
      return "consulting-leads";
    case "4at academy":
      return "academy-leads";
    case "4at.ai":
    default:
      return "ai-leads";
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (typeof (body as { website?: unknown })?.website === "string" && (body as { website: string }).website.trim()) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check the form for errors.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, company, email, phone, service, companySize, budget, description } = parsed.data;
    const endpoint = getLeadEndpoint(service);
    const context = [
      `Service: ${service}`,
      companySize ? `Company size: ${companySize}` : null,
      budget ? `Budget: ${budget}` : null,
      description ? `Message: ${description}` : null,
    ].filter(Boolean).join("\n");

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: name, company, email, phone, message: context }),
      cache: "no-store",
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("Nest lead API rejected request", { endpoint, status: response.status, result });
      return NextResponse.json(result ?? { error: "Unable to save inquiry." }, { status: response.status });
    }

    console.info("Lead persisted", { endpoint, id: result?.id });
    return NextResponse.json({ success: true, lead: result }, { status: 201 });
  } catch (error) {
    console.error("Lead capture API error", error);
    return NextResponse.json({ error: "An error occurred while saving your inquiry." }, { status: 502 });
  }
}
