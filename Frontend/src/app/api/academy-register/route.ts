import { NextResponse } from "next/server";

const API_URL = process.env.BACKEND_API_URL ?? "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.firstName || !body.lastName || !body.email || !body.mobileNumber) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const message = [
      `Program: ${body.programName || "Not specified"}`,
      `Academic year: ${body.academicYear || "Not specified"}`,
      `Education: ${body.highestEducation || "Not specified"}`,
      `Department: ${body.department || "Not specified"}`,
      `Location: ${[body.city, body.state, body.country].filter(Boolean).join(", ")}`,
    ].join("\n");

    const response = await fetch(`${API_URL}/academy-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: `${body.firstName} ${body.lastName}`.trim(),
        company: body.college || "",
        email: body.email,
        phone: body.mobileNumber,
        message,
      }),
      cache: "no-store",
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("Nest academy API rejected request", { status: response.status, result });
      return NextResponse.json(result ?? { error: "Unable to save registration." }, { status: response.status });
    }
    return NextResponse.json({ success: true, registration: result }, { status: 201 });
  } catch (error) {
    console.error("Registration API error", error);
    return NextResponse.json({ error: "An error occurred during registration." }, { status: 502 });
  }
}
