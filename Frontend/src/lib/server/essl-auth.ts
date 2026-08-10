import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAllowedEsslEmail } from "@/lib/essl-access";
import type { Session } from "next-auth";

export async function getEsslSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions);
  return typeof session?.user?.email === "string" && isAllowedEsslEmail(session.user.email) ? session : null;
}

export async function hasEsslSession(): Promise<boolean> {
  return Boolean(await getEsslSession());
}

export async function hasEsslTechnicianSession(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "technician" && session.user.email?.toLowerCase() === process.env.ESSL_ADMIN_EMAIL?.trim().toLowerCase();
}
