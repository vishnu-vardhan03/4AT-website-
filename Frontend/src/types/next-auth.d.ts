import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    accessTokenExpires: number;
    user: DefaultSession["user"] & { role: string };
  }
  interface User { role: string; accessToken: string; }
}

declare module "next-auth/jwt" {
  interface JWT { role: string; accessToken: string; accessTokenExpires: number; }
}
