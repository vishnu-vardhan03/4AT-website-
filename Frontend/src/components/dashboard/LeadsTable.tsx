"use client";

import { useMemo, useState } from "react";
import { Download, Search, X } from "lucide-react";
import type { LeadsPage } from "@/lib/leads-api";

const categoryStyles = {
  academy: "bg-sky-400/10 text-sky-200",
  consulting: "bg-violet-400/10 text-violet-200",
  ai: "bg-emerald-400/10 text-emerald-200",
} as const;

export function LeadsTable({ leads }: { leads: LeadsPage | null }) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return (leads?.data ?? []).filter((lead) => {
      if (category !== "all" && lead.category !== category) return false;
      if (!query) return true;
      return [lead.fullName, lead.email, lead.phone, lead.company, lead.message]
        .some((value) => value?.toLocaleLowerCase().includes(query));
    });
  }, [category, leads, search]);

  function exportToExcel() {
    const columns = ["ID", "Name", "Email", "Phone", "Company", "Category", "Message", "Created At"];
    const rows = filteredLeads.map((lead) => [
      String(lead.id), lead.fullName, lead.email, lead.phone, lead.company, lead.category,
      lead.message, lead.createdAt ? new Date(lead.createdAt).toISOString() : null,
    ]);
    const escapeXml = (value: string | null) => (value ?? "")
      .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;").replaceAll("'", "&apos;");
    const excelRow = (values: Array<string | null>) =>
      `<Row>${values.map((value) => `<Cell><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`).join("")}</Row>`;
    const workbook = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Leads"><Table>${excelRow(columns)}${rows.map(excelRow).join("")}</Table></Worksheet></Workbook>`;
    const url = URL.createObjectURL(new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `4at-leads-${new Date().toISOString().slice(0, 10)}.xls`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section aria-labelledby="leads-heading" className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
      <div className="border-b border-white/[0.08] px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="leads-heading" className="font-semibold text-white">Recent leads</h2>
            <p className="mt-1 text-xs text-white/40">
              Showing {filteredLeads.length} of {leads?.data.length ?? 0} loaded records.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative">
              <span className="sr-only">Search leads</span>
              <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, phone…"
                className="h-10 w-full rounded-lg border border-white/10 bg-black/20 pl-9 pr-9 text-xs text-white outline-none placeholder:text-white/30 focus:border-sky-400/40 sm:w-64"
              />
              {search ? (
                <button type="button" onClick={() => setSearch("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/35 hover:text-white">
                  <X aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </label>
            <label>
              <span className="sr-only">Filter by category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 rounded-lg border border-white/10 bg-[#090c16] px-3 text-xs text-white/70 outline-none focus:border-sky-400/40">
                <option value="all">All categories</option>
                <option value="academy">Academy</option>
                <option value="consulting">Consulting</option>
                <option value="ai">AI</option>
              </select>
            </label>
            <button
              type="button"
              onClick={exportToExcel}
              disabled={filteredLeads.length === 0}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.08] px-4 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/[0.14] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {!leads ? (
        <p className="px-6 py-8 text-sm text-red-200">Lead records could not be loaded.</p>
      ) : leads.data.length === 0 ? (
        <p className="px-6 py-8 text-sm text-white/45">No lead records are available yet.</p>
      ) : filteredLeads.length === 0 ? (
        <p className="px-6 py-8 text-sm text-white/45">No leads match the selected filters.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/[0.025] text-[11px] uppercase tracking-[0.14em] text-white/35">
              <tr>
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredLeads.map((lead) => (
                <tr key={`${lead.category}-${lead.id}`} className="text-white/65">
                  <td className="px-6 py-4 font-medium text-white/85">{lead.fullName || "—"}</td>
                  <td className="px-4 py-4">
                    <div>{lead.email || "—"}</div>
                    {lead.phone ? <div className="mt-1 text-xs text-white/35">{lead.phone}</div> : null}
                  </td>
                  <td className="px-4 py-4">{lead.company || "—"}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${categoryStyles[lead.category]}`}>
                      {lead.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/45">
                    {lead.createdAt ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lead.createdAt)) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
