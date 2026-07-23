import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { getAcademyRegistrations, getLeads, getLeadsSummary } from "@/lib/leads-api";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = { title: "Lead Analytics | 4AT", description: "4AT lead analytics dashboard." };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) redirect("/admin/login?reason=session-expired");

  const [stats, leads, registrations] = await Promise.all([
    getLeadsSummary(session.accessToken),
    getLeads({ page: 1, limit: 100 }, session.accessToken),
    getAcademyRegistrations(session.accessToken),
  ]);

  return (
    <main className="constant-site-background relative min-h-screen overflow-hidden bg-[#04060f] text-white">
      <div className="pointer-events-none absolute -left-48 top-0 h-96 w-96 rounded-full bg-sky-400/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute -right-48 top-64 h-96 w-96 rounded-full bg-violet-400/[0.07] blur-[120px]" />
      <DashboardContainer stats={stats} leads={leads} registrations={registrations} />
    </main>
  );
}
