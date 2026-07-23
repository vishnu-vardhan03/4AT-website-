"use client";

import { useMemo, useState } from "react";
import { Download, Search, X, User, Building2, MapPin } from "lucide-react";
import type { RegistrationsPage } from "@/lib/leads-api";

export function RegistrationsTable({ registrations }: { registrations: RegistrationsPage | null }) {
  const [applicantTypeFilter, setApplicantTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (registrations?.data ?? []).filter((reg) => {
      if (applicantTypeFilter !== "all" && reg.applicantType !== applicantTypeFilter) return false;
      if (!query) return true;
      return [
        reg.firstName,
        reg.lastName,
        reg.email,
        reg.mobileNumber,
        reg.college,
        reg.companyName,
        reg.jobTitle,
        reg.programName,
        reg.country,
        reg.state,
        reg.city,
      ].some((val) => val?.toLowerCase().includes(query));
    });
  }, [applicantTypeFilter, registrations, search]);

  function exportToExcel() {
    const columns = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Mobile",
      "Applicant Type",
      "College/Company",
      "Program/Job Title",
      "Department/Industry",
      "Academic Year/Experience",
      "Highest Education",
      "Referred By",
      "City",
      "State",
      "Country",
      "Created At",
    ];
    const rows = filtered.map((reg) => [
      String(reg.id),
      reg.firstName,
      reg.lastName,
      reg.email,
      reg.mobileNumber,
      reg.applicantType,
      reg.applicantType === "student" ? reg.college : reg.companyName,
      reg.applicantType === "student" ? reg.programName : reg.jobTitle,
      reg.applicantType === "student" ? reg.department : reg.industry,
      reg.applicantType === "student" ? reg.academicYear : reg.yearsOfExperience,
      reg.highestEducation,
      reg.referredBy || "",
      reg.city,
      reg.state,
      reg.country,
      reg.createdAt ? new Date(reg.createdAt).toISOString() : "",
    ]);

    const escapeXml = (val: string | null | undefined) =>
      (val ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
    const excelRow = (values: Array<string | null | undefined>) =>
      `<Row>${values.map((v) => `<Cell><Data ss:Type="String">${escapeXml(v)}</Data></Cell>`).join("")}</Row>`;
    const workbook = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Academy Registrations"><Table>${excelRow(columns)}${rows.map(excelRow).join("")}</Table></Worksheet></Workbook>`;
    const url = URL.createObjectURL(new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `academy-registrations-${new Date().toISOString().slice(0, 10)}.xls`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section aria-labelledby="registrations-heading" className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
      <div className="border-b border-white/[0.08] px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="registrations-heading" className="font-semibold text-white">Academy Registrations Directory</h2>
            <p className="mt-1 text-xs text-white/40">
              Showing {filtered.length} of {registrations?.data.length ?? 0} total submissions.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative">
              <span className="sr-only">Search registrations</span>
              <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, college, city..."
                className="h-10 w-full rounded-lg border border-white/10 bg-black/20 pl-9 pr-9 text-xs text-white outline-none placeholder:text-white/30 focus:border-teal-400/40 sm:w-64"
              />
              {search ? (
                <button type="button" onClick={() => setSearch("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/35 hover:text-white">
                  <X aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </label>
            <label>
              <span className="sr-only">Filter by applicant type</span>
              <select
                value={applicantTypeFilter}
                onChange={(e) => setApplicantTypeFilter(e.target.value)}
                className="h-10 rounded-lg border border-white/10 bg-[#090c16] px-3 text-xs text-white/70 outline-none focus:border-teal-400/40"
              >
                <option value="all">All Applicants</option>
                <option value="student">Students</option>
                <option value="professional">Working Professionals</option>
              </select>
            </label>
            <button
              type="button"
              onClick={exportToExcel}
              disabled={filtered.length === 0}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-teal-400/20 bg-teal-400/[0.08] px-4 text-xs font-semibold text-teal-200 transition hover:bg-teal-400/[0.14] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {!registrations ? (
        <p className="px-6 py-8 text-sm text-red-200">Academy registrations could not be loaded.</p>
      ) : registrations.data.length === 0 ? (
        <p className="px-6 py-8 text-sm text-white/45">No registration records found in PostgreSQL.</p>
      ) : filtered.length === 0 ? (
        <p className="px-6 py-8 text-sm text-white/45">No registrations match your search filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-white/[0.025] text-[11px] uppercase tracking-[0.14em] text-white/35">
              <tr>
                <th className="px-6 py-3 font-semibold">Applicant Name</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Contact Info</th>
                <th className="px-4 py-3 font-semibold">Institution / Company</th>
                <th className="px-4 py-3 font-semibold">Program / Role</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-6 py-3 font-semibold">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filtered.map((reg) => {
                const isStudent = reg.applicantType === "student";
                return (
                  <tr key={reg.id} className="text-white/65 hover:bg-white/[0.015] transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white/90">
                        {reg.firstName} {reg.lastName}
                      </div>
                      <div className="mt-0.5 text-xs text-white/40">{reg.highestEducation}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          isStudent ? "bg-sky-400/10 text-sky-300 border border-sky-400/20" : "bg-purple-400/10 text-purple-300 border border-purple-400/20"
                        }`}
                      >
                        {isStudent ? <User className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
                        {isStudent ? "Student" : "Professional"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-xs text-white/80">{reg.email}</div>
                      <div className="mt-0.5 text-xs text-white/40">{reg.mobileNumber}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-white/80">{isStudent ? reg.college || "—" : reg.companyName || "—"}</div>
                      <div className="mt-0.5 text-xs text-white/40">{isStudent ? reg.department || "" : reg.industry || ""}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-xs text-white/80">{isStudent ? reg.programName || "—" : reg.jobTitle || "—"}</div>
                      <div className="mt-0.5 text-xs text-white/40">
                        {isStudent ? (reg.academicYear ? `Year: ${reg.academicYear}` : "") : reg.yearsOfExperience ? `Exp: ${reg.yearsOfExperience} yrs` : ""}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <MapPin className="h-3 w-3 text-white/30 shrink-0" />
                        {[reg.city, reg.state, reg.country].filter(Boolean).join(", ") || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/45 whitespace-nowrap">
                      {reg.createdAt
                        ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(reg.createdAt))
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
