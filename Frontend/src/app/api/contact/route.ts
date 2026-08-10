import { NextResponse } from "next/server";
import { forwardLead, type LeadEndpoint } from "@/lib/server/lead-api";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(255),
  company: z.string().trim().max(255).optional().default(""),
  email: z.string().trim().email(),
  phone: z.string().trim().max(50).optional().default(""),
  service: z.string().trim().max(120).optional().default("Other"),
  companySize: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(120).optional(),
  // The composed `message` sent downstream is this description plus the Service /
  // Company size / Budget prefix lines. The backend DTOs cap `message` at 5000, so the
  // description cap must leave headroom for that prefix (bounded at ~400 chars by the
  // 120-char caps above) — otherwise a long-but-valid description 400s with a generic error.
  description: z.string().trim().max(4000).optional().default(""),
  website: z.string().optional(),
});

function getLeadEndpoint(service: string): LeadEndpoint {
  switch (service.trim().toLowerCase()) {
    case "4at consulting":
    case "accounting":
    case "auditing":
    case "hybrid services":
    case "reengineering":
    case "transformation":
    case "re-engineering & transformation":
    case "other":
      return "consulting-leads";
    case "4at academy":
      return "academy-leads";
    case "4at.ai":
      return "ai-leads";
    default:
      // General enquiries belong with the consulting team. Never silently
      // classify an unknown service as an AI lead.
      return "consulting-leads";
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

    return forwardLead(endpoint, { fullName: name, company, email, phone, message: context });
  } catch (error) {
    console.error("Invalid contact request body", { malformedJson: error instanceof SyntaxError });
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
