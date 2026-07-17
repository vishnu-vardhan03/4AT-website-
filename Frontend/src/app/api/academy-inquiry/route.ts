import { NextResponse } from "next/server";

const API_URL = process.env.BACKEND_API_URL ?? "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = body.fullName ?? body.name;
    if (!fullName || !body.email) {
      return NextResponse.json({ error: "Full name and email are required" }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/academy-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        company: body.company ?? "",
        email: body.email,
        phone: body.phone ?? "",
        message: [body.courseInterest ? `Course: ${body.courseInterest}` : null, body.message].filter(Boolean).join("\n"),
      }),
      cache: "no-store",
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      return NextResponse.json(result ?? { error: "Unable to save inquiry." }, { status: response.status });
    }
    return NextResponse.json({ success: true, inquiry: result }, { status: 201 });
  } catch (error) {
    console.error("Academy inquiry API error", error);
    return NextResponse.json({ error: "An error occurred while saving the inquiry." }, { status: 502 });
  }
}
