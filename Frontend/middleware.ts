import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { isAllowedEsslEmail } from "@/lib/essl-access";
import { authSecret } from "@/lib/auth-secret";

const SESSION_COOKIE_NAMES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "authjs.session-token",
  "__Secure-authjs.session-token",
] as const;

function clearSessionCookies(response: NextResponse): NextResponse {
  for (const name of SESSION_COOKIE_NAMES) response.cookies.delete(name);
  return response;
}

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: authSecret });
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authorized = token?.role === "admin" && typeof token.accessToken === "string" && typeof token.accessTokenExpires === "number" && token.accessTokenExpires > Date.now();
    if (!authorized) return clearSessionCookies(NextResponse.redirect(new URL("/admin/login", request.url)));
  }
  if (pathname.startsWith("/essl") && pathname !== "/essl/login") {
    const authorized = typeof token?.email === "string" && (isAllowedEsslEmail(token.email) || token.role === "driver") && typeof token.accessTokenExpires === "number" && token.accessTokenExpires > Date.now();
    if (!authorized) {
      const login = new URL("/essl/login", request.url);
      login.searchParams.set("callbackUrl", `${pathname}${search}`);
      return clearSessionCookies(NextResponse.redirect(login));
    }
  }
  if (pathname === "/cab/driver") {
    const authorized = token?.role === "driver" && typeof token.email === "string" && typeof token.accessTokenExpires === "number" && token.accessTokenExpires > Date.now();
    if (!authorized) return clearSessionCookies(NextResponse.redirect(new URL("/cab/driver-login", request.url)));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin", "/admin/:path*", "/essl", "/essl/:path*", "/cab/driver"] };
