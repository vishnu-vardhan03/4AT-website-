import { NextResponse } from "next/server";

const API_URL = process.env.BACKEND_API_URL ?? "http://localhost:5000";

const cleanString = (val: any) => {
  if (typeof val !== "string") return val;
  return val.trim().replace(/\s+/g, " ");
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.firstName || !body.lastName || !body.email || !body.mobileNumber) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/academy-leads/registrations`, {
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
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("Nest registrations API rejected request", { status: response.status, result });
      return NextResponse.json(result ?? { error: "Unable to save registration." }, { status: response.status });
    }
    return NextResponse.json({ success: true, registration: result }, { status: 201 });
  } catch (error) {
    console.error("Registration API error", error);
    return NextResponse.json({ error: "An error occurred during registration." }, { status: 502 });
  }
}
