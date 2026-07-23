import { validationError } from "@/lib/server/lead-api";
import { NextResponse } from "next/server";
import { z } from "zod";

const optionalString = (max: number) =>
  z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    z.string().trim().max(max).optional(),
  );

const schema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  gender: z.string().trim().min(1).max(50),
  country: z.string().trim().min(1).max(100),
  state: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  mobileNumber: z.string().trim().min(5).max(50),
  applicantType: z.enum(["student", "professional"]),
  college: optionalString(255),
  programName: optionalString(255),
  academicYear: optionalString(100),
  department: optionalString(255),
  companyName: optionalString(255),
  jobTitle: optionalString(255),
  industry: optionalString(255),
  yearsOfExperience: optionalString(100),
  highestEducation: z.string().trim().min(1).max(255),
  referredBy: optionalString(255),
});

const cleanString = (value: string | undefined) => {
  return value?.trim().replace(/\s+/g, " ");
};

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);
  const body = parsed.data;

  try {
    const apiUrl = process.env.BACKEND_URL ?? process.env.BACKEND_API_URL ?? "http://localhost:5000";
    const response = await fetch(`${apiUrl}/academy-leads/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: cleanString(body.firstName),
        lastName: cleanString(body.lastName),
        gender: cleanString(body.gender),
        country: cleanString(body.country),
        state: cleanString(body.state),
        city: cleanString(body.city),
        email: cleanString(body.email),
        mobileNumber: cleanString(body.mobileNumber),
        applicantType: cleanString(body.applicantType),
        college: cleanString(body.college) || null,
        programName: cleanString(body.programName) || null,
        academicYear: cleanString(body.academicYear) || null,
        department: cleanString(body.department) || null,
        companyName: cleanString(body.companyName) || null,
        jobTitle: cleanString(body.jobTitle) || null,
        industry: cleanString(body.industry) || null,
        yearsOfExperience: cleanString(body.yearsOfExperience) || null,
        highestEducation: cleanString(body.highestEducation),
        referredBy: cleanString(body.referredBy) || null,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("Nest registrations API rejected request", { status: response.status, result });
      return NextResponse.json(result ?? { error: "Unable to save registration." }, { status: response.status });
    }
    return NextResponse.json({ success: true, registration: result }, { status: 201 });
  } catch (error) {
    const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
    console.error("Registration API error", { timedOut });
    return NextResponse.json(
      { error: timedOut ? "The registration service timed out. Please try again." : "The registration service is unavailable." },
      { status: timedOut ? 504 : 502 },
    );
  }
}
