import type { Metadata } from "next";
import { EsslPortal } from "@/components/essl/EsslPortal";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAllowedEsslEmail } from "@/lib/essl-access";

export const metadata: Metadata = {
  title: "ESSL | 4AT Internal Service Desk",
  description: "Raise, track, and resolve internal organization tickets.",
  robots: { index: false, follow: false },
};

export default async function EsslPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAllowedEsslEmail(session.user.email)) redirect("/essl/login");
  return <EsslPortal initialRole={session.user.role === "technician" ? "technician" : "employee"} />;
}
