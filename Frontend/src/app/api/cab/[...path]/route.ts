import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { getEsslSession, hasEsslTechnicianSession } from "@/lib/server/essl-auth";
import { esslInternalApiKey } from "@/lib/server/essl-api-key";

type Context = { params: Promise<{ path: string[] }> };
async function proxy(request: Request, context: Context) {
  const session = await getEsslSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Sign in through ESSL." }, { status: 401 });
  const { path } = await context.params;
  const endpoint = path.join("/");
  const adminOnly = endpoint === "drivers" || endpoint === "reports.csv" || endpoint.startsWith("operations/") || (endpoint.startsWith("master/") && endpoint !== "master/feedback");
  if (adminOnly && !(endpoint === "reports.csv" && session.user.role === "finance") && !(await hasEsslTechnicianSession())) return NextResponse.json({ error: "ESS Support admin access is required." }, { status: 403 });
  const incoming = new URL(request.url);
  if (request.method === "GET" && endpoint === "snapshot") { incoming.searchParams.set("email", session.user.email); incoming.searchParams.set("role", session.user.role); }
  let body: string | undefined;
  if (request.method !== "GET") {
    const parsed = await request.json().catch(() => ({}));
    body = JSON.stringify({ ...parsed, email: session.user.email, actor: session.user.email, actorRole: session.user.role });
  }
  const targetPath = endpoint === "snapshot" ? "" : endpoint;
  try {
    const response = await fetch(`${env.BACKEND_URL}/ectms/${targetPath}${incoming.search}`, { method: request.method, headers: { "Content-Type": "application/json", "x-essl-internal-key": esslInternalApiKey }, body, cache: "no-store" });
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/csv")) return new NextResponse(await response.text(), { status: response.status, headers: { "Content-Type": "text/csv", "Content-Disposition": response.headers.get("content-disposition") || "attachment" } });
    const responseBody = await response.json().catch(() => ({ error: "Invalid CAB service response." }));
    if (!response.ok) console.error("CAB backend request failed", { endpoint, status: response.status, response: responseBody });
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    console.error("CAB backend is unavailable", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "CAB service is unavailable." }, { status: 503 });
  }
}
export const GET = proxy; export const POST = proxy; export const PATCH = proxy;
