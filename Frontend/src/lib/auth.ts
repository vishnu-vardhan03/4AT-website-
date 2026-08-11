import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AzureADProvider from "next-auth/providers/azure-ad";
import { env } from "@/lib/env";
import { isAllowedEsslEmail } from "@/lib/essl-access";
import { timingSafeEqual } from "crypto";
import { authSecret } from "@/lib/auth-secret";

const BACKEND_SESSION_MAX_AGE = 8 * 60 * 60;
function getJwtExpiry(accessToken: string): number {
  try {
    const payload = JSON.parse(Buffer.from(accessToken.split(".")[1], "base64url").toString("utf8")) as { exp?: unknown };
    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: "openid profile email User.Read" } },
      profile(profile) {
        const emailClaim = typeof profile.email === "string" ? profile.email : typeof profile.preferred_username === "string" ? profile.preferred_username : undefined;
        const email = emailClaim?.trim().toLowerCase();
        return {
          id: profile.sub,
          name: profile.name ?? profile.nickname ?? email,
          email,
          image: profile.picture ?? null,
          role: email === process.env.ESSL_ADMIN_EMAIL?.trim().toLowerCase() ? "technician" : "employee",
        };
      },
    }),
    CredentialsProvider({
      name: "Admin credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;
        try {
          const response = await fetch(`${env.BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: credentials.username, password: credentials.password }),
            cache: "no-store",
          });
          if (!response.ok) return null;
          const { accessToken } = (await response.json()) as { accessToken?: string };
          if (!accessToken) return null;
          return { id: "admin", role: "admin", accessToken };
        } catch (error) {
          // Includes an unconfigured BACKEND_URL — without this log an admin login failure
          // is indistinguishable from wrong credentials.
          console.error("[auth] Admin login request failed", error instanceof Error ? error.message : error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "essl-email",
      name: "ESSL organization email",
      credentials: { email: { label: "Work email", type: "email" } },
      async authorize(credentials) {
        if ((process.env.ESSL_AUTH_MODE ?? "legacy") !== "legacy" || !credentials?.email || !isAllowedEsslEmail(credentials.email)) return null;
        const email = credentials.email.trim().toLowerCase();
        if (email === process.env.ESSL_ADMIN_EMAIL?.trim().toLowerCase()) return null;
        return { id: email, email, name: email.split("@")[0], role: "employee", accessToken: "" };
      },
    }),
    CredentialsProvider({
      id: "essl-admin",
      name: "ESS Support",
      credentials: {
        email: { label: "ESS Support email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if ((process.env.ESSL_AUTH_MODE ?? "legacy") !== "legacy") return null;
        const configuredEmail = process.env.ESSL_ADMIN_EMAIL?.trim().toLowerCase();
        const configuredPassword = process.env.ESSL_ADMIN_PASSWORD;
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (!configuredEmail || !configuredPassword || email !== configuredEmail || !password) return null;
        const supplied = Buffer.from(password);
        const expected = Buffer.from(configuredPassword);
        if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;
        return { id: configuredEmail, email: configuredEmail, name: "ESS Support", role: "technician", accessToken: "" };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: BACKEND_SESSION_MAX_AGE },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider !== "azure-ad") return true;
      return typeof user.email === "string" && isAllowedEsslEmail(user.email);
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.accessTokenExpires = user.accessToken ? getJwtExpiry(user.accessToken) : Date.now() + BACKEND_SESSION_MAX_AGE * 1000;
      }
      const sessionEmail = typeof token.email === "string" ? token.email.trim().toLowerCase() : undefined;
      const technicianEmail = process.env.ESSL_ADMIN_EMAIL?.trim().toLowerCase();
      if (sessionEmail && isAllowedEsslEmail(sessionEmail)) {
        token.role = technicianEmail && sessionEmail === technicianEmail ? "technician" : "employee";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
  pages: {
    signIn: "/essl/login",
    error: "/essl/login",
  },
};
