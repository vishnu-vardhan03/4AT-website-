"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, ChevronLeft, Bot, BriefcaseBusiness, GraduationCap, UsersRound, UserCheck, Briefcase, School } from "lucide-react";
import { GoogleAnalyticsPanel } from "@/components/dashboard/GoogleAnalyticsPanel";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { LeadsChart } from "@/components/dashboard/LeadsChart";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { RegistrationsTable } from "@/components/dashboard/RegistrationsTable";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import type { LeadsPage, LeadsStats, RegistrationsPage } from "@/lib/leads-api";

interface DashboardContainerProps {
  stats: LeadsStats | null;
  leads: LeadsPage | null;
  registrations: RegistrationsPage | null;
}

export function DashboardContainer({ stats, leads, registrations }: DashboardContainerProps) {
  const [activeView, setActiveView] = useState<"analytics" | "registrations">("analytics");

  const totalRegs = registrations?.data.length ?? 0;
  const studentRegs = registrations?.data.filter((r) => r.applicantType === "student").length ?? 0;
  const proRegs = registrations?.data.filter((r) => r.applicantType === "professional").length ?? 0;

  return (
    <div className="relative mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
      <header className="mb-10 flex flex-col gap-6 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.8)]" />
            4AT Operations
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl text-white">
              {activeView === "analytics" ? "Lead Analytics" : "Academy Registrations"}
            </h1>

            {activeView === "analytics" ? (
              <button
                type="button"
                onClick={() => setActiveView("registrations")}
                className="group inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-xs font-semibold text-teal-300 transition hover:border-teal-400/50 hover:bg-teal-400/20"
                title="Shift to Academy Registrations"
              >
                <span>Academy Registrations</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveView("analytics")}
                className="group inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-semibold text-sky-300 transition hover:border-sky-400/50 hover:bg-sky-400/20"
                title="Shift back to Lead Analytics"
              >
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Lead Analytics</span>
              </button>
            )}
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
            {activeView === "analytics"
              ? "A live view of inbound demand across Consulting, Academy, and AI."
              : "Full relational directory of student and working professional course registrations."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-semibold text-white/55 transition hover:border-white/20 hover:text-white"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to website
          </Link>
          <LogoutButton />
        </div>
      </header>

      {activeView === "analytics" ? (
        stats ? (
          <div className="space-y-6">
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="sr-only">
                Lead overview
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        )
      ) : (
        <div className="space-y-6">
          <section aria-labelledby="registrations-overview-heading">
            <h2 id="registrations-overview-heading" className="sr-only">
              Registrations overview
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <KpiCard label="Total Registrations" value={totalRegs} icon={UserCheck} accent="cyan" />
              <KpiCard label="Student Registrations" value={studentRegs} icon={School} accent="sky" />
              <KpiCard label="Working Professionals" value={proRegs} icon={Briefcase} accent="violet" />
            </div>
          </section>
          <RegistrationsTable registrations={registrations} />
          <GoogleAnalyticsPanel />
        </div>
      )}
    </div>
  );
}
