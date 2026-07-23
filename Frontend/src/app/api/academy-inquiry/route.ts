import { forwardLead, validationError } from "@/lib/server/lead-api";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().trim().min(2).max(255).optional(),
  name: z.string().trim().min(2).max(255).optional(),
  company: z.string().trim().max(255).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional(),
  courseInterest: z.string().trim().max(255).optional(),
  message: z.string().trim().max(4500).optional(),
}).refine((value) => value.fullName || value.name, { path: ["fullName"], message: "Full name is required" });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);
  const body = parsed.data;
  return forwardLead("academy-leads", {
    fullName: body.fullName ?? body.name!, company: body.company, email: body.email, phone: body.phone,
    message: [body.courseInterest ? `Course: ${body.courseInterest}` : null, body.message].filter(Boolean).join("\n"),
  });
}
