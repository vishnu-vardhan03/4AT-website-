import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CabPortal } from "@/components/cab/CabPortal";
import { getEsslSession } from "@/lib/server/essl-auth";

export const metadata: Metadata = { title: "Driver Routes | 4AT CAB", robots: { index: false, follow: false } };

export default async function DriverWorkspacePage() {
  const session = await getEsslSession();
  if (!session?.user?.email || session.user.role !== "driver") redirect("/cab/driver-login");
  return <CabPortal role="driver" identity={session.user.email} />;
}
