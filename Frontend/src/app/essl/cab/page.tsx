import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getEsslSession } from "@/lib/server/essl-auth";
import { CabPortal } from "@/components/cab/CabPortal";

export const metadata: Metadata = { title: "CAB Operations | ESSL", robots: { index: false, follow: false } };
export default async function CabPage() {
  const session = await getEsslSession();
  if (!session?.user?.email) redirect("/essl/login?callbackUrl=/essl/cab");
  if (session.user.role === "driver") redirect("/cab/driver");
  return <CabPortal role={session.user.role as "employee" | "technician" | "driver" | "nodal" | "finance"} identity={session.user.email} />;
}
