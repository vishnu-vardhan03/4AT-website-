import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bot, BriefcaseBusiness, GraduationCap, UsersRound } from "lucide-react";

import { GoogleAnalyticsPanel } from "@/components/dashboard/GoogleAnalyticsPanel";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { LeadsChart } from "@/components/dashboard/LeadsChart";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { getLeads, getLeadsSummary } from "@/lib/leads-api";

export const metadata: Metadata = {
  title: "Lead Analytics | 4AT",
  description: "4AT lead analytics dashboard.",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, leads] = await Promise.all([getLeadsSummary(), getLeads({ page: 1, limit: 100 })]);

  return (
    <main className="constant-site-background relative min-h-screen overflow-hidden bg-[#04060f] text-white">
      <div className="pointer-events-none absolute -left-48 top-0 h-96 w-96 rounded-full bg-sky-400/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute -right-48 top-64 h-96 w-96 rounded-full bg-violet-400/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <header className="mb-10 flex flex-col gap-6 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.8)]" />
              4AT Operations
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Lead Analytics</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
              A live view of inbound demand across Consulting, Academy, and AI.
            </p>
          </div>
          <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-semibold text-white/55 transition hover:border-white/20 hover:text-white">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to website
          </Link>
        </header>

        {stats ? (
          <div className="space-y-6">
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="sr-only">Lead overview</h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <KpiCard label="Total Leads" value={stats.totalLeads} icon={UsersRound} accent="brand" />
                <KpiCard label="Academy Leads" value={stats.academyLeads} icon={GraduationCap} accent="sky" />
                <KpiCard label="Consulting Leads" value={stats.consultingLeads} icon={BriefcaseBusiness} accent="violet" />
                <KpiCard label="AI Leads" value={stats.aiLeads} icon={Bot} accent="emerald" />
              </div>
            </section>
            <LeadsChart stats={stats} />
            <LeadsTable leads={leads} />
            <GoogleAnalyticsPanel />
          </div>
        ) : (
          <div role="alert" className="rounded-2xl border border-red-400/15 bg-red-400/[0.055] p-8 text-center">
            <p className="font-semibold text-red-200">Lead analytics are temporarily unavailable.</p>
            <p className="mt-2 text-sm text-white/45">Check that the leads API is running, then refresh this page.</p>
          </div>
        )}
      </div>
    </main>
  );
}
