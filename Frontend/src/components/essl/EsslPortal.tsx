"use client";

import { FormEvent, Fragment, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import logo from "@/assets/logo.png";
import {
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Inbox,
  LayoutDashboard,
  ListFilter,
  LogOut,
  MonitorCog,
  MoreVertical,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings,
  Ticket,
  UserRound,
  Utensils,
  X,
  Zap,
  ChevronDown,
  ExternalLink,
  Film,
  ImageIcon,
} from "lucide-react";

type Role = "employee" | "technician";
type PortalView = "Dashboard" | "My tickets" | "Ticket queue" | "Assigned to me" | "Reports";
type TicketStatus = "New" | "In progress" | "Waiting" | "Resolved" | "Closed";
type NotificationRecord = { id: number; ticketId: number | null; title: string; message: string; isRead: boolean; createdAt: string };
type TicketAttachment = { id: number; originalName: string; mimeType: string; sizeBytes: number };

type TicketRecord = {
  id: number;
  subject: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: TicketStatus;
  requesterEmail: string | null;
  createdAt: string;
  updatedAt: string;
  attachments: TicketAttachment[];
  adminComment: string | null;
};

type NewTicket = Pick<TicketRecord, "subject" | "description" | "category" | "priority"> & { attachment?: File };

const formatTicketId = (id: number) => `ESSL-${String(id).padStart(4, "0")}`;
const formatUpdated = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recently" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
};

const categories = [
  { label: "IT & Access", description: "Accounts, devices, software, VPN and network", icon: MonitorCog, color: "bg-sky-500/15 text-sky-300" },
  { label: "Facilities", description: "Office equipment, workspace and maintenance", icon: Settings, color: "bg-blue-500/15 text-blue-300" },
  { label: "Food", description: "Meals, pantry supplies and catering requests", icon: Utensils, color: "bg-sky-400/10 text-sky-300" },
];

const priorityStyle = {
  Low: "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  Medium: "border border-amber-400/25 bg-amber-400/10 text-amber-300",
  High: "border border-red-400/25 bg-red-400/10 text-red-300",
};

const statusStyle: Record<TicketStatus, string> = {
  New: "border border-red-400/25 bg-red-400/10 text-red-300",
  "In progress": "border border-amber-400/25 bg-amber-400/10 text-amber-300",
  Waiting: "border border-amber-400/25 bg-amber-400/10 text-amber-300",
  Resolved: "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  Closed: "border border-sky-400/25 bg-sky-400/10 text-sky-300",
};

function Brand() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Back to 4AT website">
      <span
        aria-label="4AT Logo"
        role="img"
        className="brand-logo-gradient relative z-10 !h-8 !w-12 shrink-0"
        style={{ WebkitMaskImage: `url(${logo.src})`, maskImage: `url(${logo.src})` }}
      />
      <span className="whitespace-nowrap text-[28px] font-black uppercase leading-8 tracking-wide text-white">4AT</span>
    </Link>
  );
}

const employeeNavItems = [
  [LayoutDashboard, "Dashboard"],
  [Ticket, "My tickets"],
] as const;

const technicianNavItems = [
  [LayoutDashboard, "Dashboard"],
  [Inbox, "Ticket queue"],
  [UserRound, "Assigned to me"],
  [BarChart3, "Reports"],
] as const;

function PortalNavigation({ items, activeView, onSelect, mobile = false }: { items: ReadonlyArray<readonly [typeof LayoutDashboard, string]>; activeView: PortalView; onSelect: (view: PortalView) => void; mobile?: boolean }) {
  return (
    <nav className={mobile ? "flex min-w-max items-center gap-1" : "hidden items-center gap-1 lg:flex"} aria-label="ESSL navigation">
      {items.map(([Icon, label]) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(label as PortalView)}
          aria-current={activeView === label ? "page" : undefined}
          className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold transition ${activeView === label ? "bg-sky-500/15 text-sky-300" : "text-sky-100/65 hover:bg-white/[.055] hover:text-white"}`}
        >
          <Icon className="size-4" />
          {label}
        </button>
      ))}
    </nav>
  );
}

function NotificationBell({ notifications, onOpen }: { notifications: NotificationRecord[]; onOpen: (notification: NotificationRecord) => void }) {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((item) => !item.isRead).length;
  return <div className="relative"><button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`} className="relative grid size-10 place-items-center rounded-lg text-sky-100/60 hover:bg-white/[.055]"><Bell className="size-5" />{unread > 0 && <span className="absolute right-1.5 top-1 min-w-4 rounded-full bg-sky-400 px-1 text-center text-[10px] font-black leading-4 text-[#01030e]">{unread > 9 ? "9+" : unread}</span>}</button>{open && <div className="absolute right-0 top-12 z-[70] w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-white/10 bg-[#05081c] shadow-[0_20px_55px_rgba(0,0,0,.5)]"><div className="border-b border-white/10 px-4 py-3"><h2 className="text-sm font-bold text-white">Notifications</h2></div><div className="max-h-80 overflow-y-auto">{notifications.length ? notifications.map((item) => <button key={item.id} type="button" onClick={() => { onOpen(item); setOpen(false); }} className={`block w-full border-b border-white/[.07] px-4 py-3 text-left transition hover:bg-white/[.04] ${item.isRead ? "opacity-60" : "bg-sky-400/[.055]"}`}><span className="text-sm font-bold text-white">{item.title}</span><span className="mt-1 block text-xs leading-5 text-sky-100/65">{item.message}</span><span className="mt-1.5 block text-[10px] text-sky-100/40">{formatUpdated(item.createdAt)}</span></button>) : <p className="px-4 py-8 text-center text-sm text-sky-100/55">No notifications yet.</p>}</div></div>}</div>;
}

function Topbar({ role, activeView, notifications, onOpenNotification, onNavigate, onCreate }: { role: Role; activeView: PortalView; notifications: NotificationRecord[]; onOpenNotification: (notification: NotificationRecord) => void; onNavigate: (view: PortalView) => void; onCreate: () => void }) {
  const items = role === "employee" ? employeeNavItems : technicianNavItems;

  return (
    <header className="fixed left-1/2 top-3 z-50 w-[min(1500px,calc(100%-1.5rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#05081c]/95 shadow-[0_16px_45px_rgba(0,0,0,.38)] backdrop-blur-xl">
      <div className="flex min-h-16 items-center gap-4 px-3 md:px-4">
        <Brand />
        <div className="mx-auto"><PortalNavigation items={items} activeView={activeView} onSelect={onNavigate} /></div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="relative hidden w-56 2xl:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sky-100/45" />
            <input aria-label="Search tickets and help articles" placeholder="Search tickets…" className="h-9 w-full rounded-lg border border-white/10 bg-[#0a0d24] pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-sky-100/45 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20" />
          </div>
          <span className="hidden rounded-lg border border-white/10 bg-[#111535] px-3 py-2 text-xs font-bold capitalize text-sky-300 xl:inline-flex">{role === "technician" ? "IT support" : "Employee"}</span>
          <NotificationBell notifications={notifications} onOpen={onOpenNotification} />
          <button type="button" className="hidden size-10 place-items-center rounded-lg text-sky-100/60 hover:bg-white/[.055] sm:grid" aria-label="Help"><CircleHelp className="size-5" /></button>
          <button type="button" onClick={() => void signOut({ callbackUrl: "/essl/login" })} className="grid size-10 place-items-center rounded-lg text-sky-100/60 hover:bg-white/[.055] hover:text-white" aria-label="Sign out"><LogOut className="size-5" /></button>
          <button type="button" onClick={onCreate} aria-label="Create ticket" className="inline-flex h-10 items-center gap-2 rounded-lg bg-sky-500 px-3.5 text-sm font-bold text-[#01030e] shadow-[0_6px_16px_rgba(56,189,248,.2)] transition hover:bg-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/25"><Plus className="size-4" /><span className="hidden sm:inline">Create ticket</span></button>
        </div>
      </div>
      <div className="no-scrollbar overflow-x-auto border-t border-white/8 px-2 py-1.5 lg:hidden">
        <PortalNavigation items={items} activeView={activeView} onSelect={onNavigate} mobile />
      </div>
    </header>
  );
}

function StatCard({ label, value, note, icon: Icon, tone = "blue" }: { label: string; value: string; note: string; icon: typeof Ticket; tone?: "blue" | "green" | "amber" | "red" }) {
  const tones = { blue: "bg-sky-400/10 text-sky-300", green: "bg-sky-500/10 text-sky-300", amber: "bg-blue-500/12 text-blue-300", red: "bg-blue-600/15 text-blue-200" };
  return (
    <div className="rounded-xl border border-white/10 bg-[#05081c] p-4 shadow-[0_1px_2px_rgba(15,23,42,.03)]">
      <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-sky-100/60">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</p></div><span className={`grid size-9 place-items-center rounded-lg ${tones[tone]}`}><Icon className="size-[18px]" /></span></div>
      <p className="mt-2 text-xs text-sky-100/60">{note}</p>
    </div>
  );
}

function TicketTable({ tickets, employee = false, title, subtitle, highlightedTicketId, onStatusChange }: { tickets: TicketRecord[]; employee?: boolean; title?: string; subtitle?: string; highlightedTicketId?: number | null; onStatusChange?: (ticketId: number, status: TicketStatus, adminComment?: string) => void }) {
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "All">("All");
  const [priorityFilter, setPriorityFilter] = useState<TicketRecord["priority"] | "All">("All");
  const [expandedTicketId, setExpandedTicketId] = useState<number | null>(null);
  const [adminComments, setAdminComments] = useState<Record<number, string>>({});
  const visibleTickets = tickets.filter((ticket) =>
    (statusFilter === "All" || ticket.status === statusFilter) &&
    (priorityFilter === "All" || ticket.priority === priorityFilter)
  );

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#05081c]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
        <div><h2 className="font-bold text-white">{title ?? (employee ? "My recent tickets" : "Recent ticket queue")}</h2><p className="mt-0.5 text-xs text-sky-100/60">{subtitle ?? (employee ? "Updates on requests you have raised" : `${visibleTickets.length} of ${tickets.length} tickets shown`)}</p></div>
        {employee ? (
          <button type="button" className="text-xs font-bold text-sky-400 hover:underline">View all</button>
        ) : (
          <div className="flex flex-wrap items-center gap-2" aria-label="Ticket filters">
            <ListFilter className="size-4 text-sky-100/60" aria-hidden="true" />
            <label className="flex items-center gap-2">
              <span className="sr-only">Filter by status</span>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as TicketStatus | "All")} className="h-9 rounded-lg border border-white/10 bg-[#0a0d24] px-3 text-xs font-semibold text-white outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20">
                <option value="All">All statuses</option>
                <option>New</option>
                <option>In progress</option>
                <option>Waiting</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              <span className="sr-only">Filter by priority</span>
              <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as TicketRecord["priority"] | "All")} className="h-9 rounded-lg border border-white/10 bg-[#0a0d24] px-3 text-xs font-semibold text-white outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20">
                <option value="All">All priorities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-[#0a0d24] text-[11px] font-bold uppercase tracking-[.06em] text-sky-100/60"><tr><th className="px-4 py-2.5">Ticket</th>{!employee && <th className="px-4 py-2.5">Raised by</th>}<th className="px-4 py-2.5">Priority</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5">Updated</th><th className="px-4 py-2.5 text-right">Category</th></tr></thead>
          <tbody className="divide-y divide-white/8">
            {visibleTickets.map((ticket) => {
              const expanded = expandedTicketId === ticket.id;
              return <Fragment key={ticket.id}>
              <tr id={`ticket-${ticket.id}`} className={`scroll-mt-28 transition ${highlightedTicketId === ticket.id ? "bg-sky-400/15 ring-1 ring-inset ring-sky-400/50" : "hover:bg-[#0a0d24]"}`}>
                <td className="max-w-md px-4 py-3"><button type="button" onClick={() => setExpandedTicketId(expanded ? null : ticket.id)} aria-expanded={expanded} aria-controls={`ticket-details-${ticket.id}`} className="group w-full text-left"><span className="flex items-start gap-2"><span className="line-clamp-2 min-w-0 flex-1 break-words font-semibold text-white group-hover:text-sky-300">{ticket.subject}</span><ChevronDown className={`mt-0.5 size-4 shrink-0 text-sky-100/50 transition-transform ${expanded ? "rotate-180" : ""}`} /></span><span className="mt-0.5 block font-mono text-[11px] text-sky-100/60">#{formatTicketId(ticket.id)}{ticket.attachments?.length ? ` · ${ticket.attachments.length} attachment${ticket.attachments.length === 1 ? "" : "s"}` : ""}</span></button></td>
                {!employee && <td className="max-w-56 px-4 py-3"><p className="truncate text-xs font-semibold text-sky-100/80" title={ticket.requesterEmail ?? "Requester unavailable"}>{ticket.requesterEmail ?? "Legacy ticket"}</p></td>}
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-[11px] font-bold ${priorityStyle[ticket.priority]}`}>{ticket.priority}</span></td>
                <td className="px-4 py-3">
                  {employee ? (
                    <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${statusStyle[ticket.status]}`}>{ticket.status}</span>
                  ) : (
                    <select
                      value={ticket.status}
                      onChange={(event) => { onStatusChange?.(ticket.id, event.target.value as TicketStatus, adminComments[ticket.id]); setAdminComments((current) => ({ ...current, [ticket.id]: "" })); }}
                      aria-label={`Update status for ${ticket.subject}`}
                      className={`h-8 rounded-lg px-2 text-xs font-bold outline-none transition focus:ring-4 focus:ring-sky-400/20 ${statusStyle[ticket.status]}`}
                    >
                      <option className="bg-[#05081c] text-white">New</option>
                      <option className="bg-[#05081c] text-white">In progress</option>
                      <option className="bg-[#05081c] text-white">Waiting</option>
                      <option className="bg-[#05081c] text-white">Resolved</option>
                      <option className="bg-[#05081c] text-white">Closed</option>
                    </select>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-sky-100/60">{formatUpdated(ticket.updatedAt)}</td>
                <td className="px-4 py-3 text-right text-xs font-semibold text-sky-100/75">{ticket.category}</td>
              </tr>
              {expanded && <tr id={`ticket-details-${ticket.id}`} className="bg-[#080c22]"><td colSpan={employee ? 5 : 6} className="px-4 py-5 md:px-6"><div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,.65fr)]"><section><h3 className="text-xs font-bold uppercase tracking-[.06em] text-sky-300">Request details</h3><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-sky-100/80">{ticket.description || "No description was provided."}</p>{ticket.adminComment && <div className="mt-4"><h4 className="text-xs font-bold text-sky-300">Latest admin comment / resolution</h4><p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-sky-100/75">{ticket.adminComment}</p></div>}{!employee && <label className="mt-4 block"><span className="text-xs font-bold text-sky-100/75">Comment for the next status email (optional)</span><textarea value={adminComments[ticket.id] ?? ""} onChange={(event) => setAdminComments((current) => ({ ...current, [ticket.id]: event.target.value }))} maxLength={5000} rows={3} placeholder="Resolution, next step, or reason for this status change" className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-[#05081c] p-3 text-sm text-white outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20" /></label>}</section><section><h3 className="text-xs font-bold uppercase tracking-[.06em] text-sky-300">Attachments</h3>{ticket.attachments?.length ? <div className="mt-2 space-y-3">{ticket.attachments.map((attachment) => { const url = `/api/essl-attachments/${attachment.id}`; return <div key={attachment.id} className="overflow-hidden rounded-lg border border-white/10 bg-[#05081c]">{attachment.mimeType.startsWith("image/") && <Image src={url} alt={`Attachment: ${attachment.originalName}`} width={960} height={540} unoptimized className="max-h-72 w-full object-contain bg-black/20" />}{attachment.mimeType.startsWith("video/") && <video src={url} controls preload="metadata" className="max-h-72 w-full bg-black" aria-label={`Video attachment: ${attachment.originalName}`} />}<a href={url} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2 px-3 py-2.5 text-xs font-semibold text-sky-100/80 hover:bg-white/[.04] hover:text-white">{attachment.mimeType.startsWith("image/") ? <ImageIcon className="size-4 shrink-0" /> : attachment.mimeType.startsWith("video/") ? <Film className="size-4 shrink-0" /> : <Paperclip className="size-4 shrink-0" />}<span className="min-w-0 flex-1 truncate">{attachment.originalName}</span><span className="shrink-0 text-sky-100/45">{(attachment.sizeBytes / 1024 / 1024).toFixed(2)} MB</span><ExternalLink className="size-3.5 shrink-0" /></a></div>; })}</div> : <p className="mt-2 text-sm text-sky-100/55">No files were attached to this ticket.</p>}</section></div></td></tr>}
              </Fragment>;
            })}
            {visibleTickets.length === 0 && (
              <tr>
                <td colSpan={employee ? 5 : 6} className="px-4 py-10 text-center">
                  <p className="font-semibold text-white">No tickets match these filters</p>
                  <p className="mt-1 text-xs text-sky-100/60">Choose another status or priority to see more tickets.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployeeDashboard({ tickets, onCreate }: { tickets: TicketRecord[]; onCreate: (category?: string) => void }) {
  return (
    <div className="mx-auto max-w-[1440px] p-4 md:p-6 lg:p-8">
      <section className="relative overflow-hidden rounded-2xl bg-[#05081c] px-5 py-7 text-white shadow-[0_18px_45px_rgba(56,189,248,.1)] md:px-8 md:py-9">
        <div className="absolute -right-16 -top-24 size-72 rounded-full border-[44px] border-sky-400/10" />
        <div className="absolute bottom-0 right-24 h-28 w-48 skew-x-[-22deg] bg-sky-400/10" />
        <div className="relative max-w-2xl"><span className="inline-flex items-center gap-2 rounded-full bg-[#05081c]/10 px-3 py-1 text-xs font-semibold text-sky-100"><Zap className="size-3.5" /> Employee support</span><h1 className="mt-4 text-2xl font-bold tracking-[-.025em] md:text-3xl">How can we help today?</h1><p className="mt-2 max-w-xl text-sm leading-6 text-sky-100/75">Report an issue or request help from the right internal team. You can follow every update from this workspace.</p><button type="button" onClick={() => onCreate()} className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-sky-500 px-4 text-sm font-bold text-[#01030e] shadow-sm transition hover:bg-sky-400"><Plus className="size-4" /> Raise a new ticket</button></div>
      </section>
      <section className="mt-7"><div className="mb-3 flex items-end justify-between"><div><h2 className="text-lg font-bold text-white">Choose a support area</h2><p className="mt-1 text-sm text-sky-100/60">We’ll route your request to the right team.</p></div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{categories.map(({ label, description, icon: Icon, color }) => <button key={label} type="button" onClick={() => onCreate(label)} className="group flex min-h-32 flex-col items-start rounded-xl border border-white/10 bg-[#05081c] p-4 text-left transition hover:-translate-y-0.5 hover:border-sky-400/60 hover:shadow-[0_8px_24px_rgba(15,23,42,.07)]"><span className={`grid size-9 place-items-center rounded-lg ${color}`}><Icon className="size-[18px]" /></span><span className="mt-3 text-sm font-bold text-white">{label}</span><span className="mt-1 text-xs leading-5 text-sky-100/60">{description}</span></button>)}</div></section>
      <section className="mt-7 grid gap-4 sm:grid-cols-2"><StatCard label="Open tickets" value={String(tickets.filter((t) => t.status !== "Resolved").length)} note="Across all support teams" icon={Ticket} /><StatCard label="Waiting for you" value="1" note="Additional information needed" icon={Clock3} tone="amber" /></section>
      <section className="mt-7"><TicketTable tickets={tickets} employee /></section>
    </div>
  );
}

function EmployeeTicketsView({ tickets, highlightedTicketId, onCreate }: { tickets: TicketRecord[]; highlightedTicketId?: number | null; onCreate: () => void }) {
  return <div className="mx-auto max-w-[1440px] p-4 md:p-6 lg:p-8"><div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-bold tracking-[-.025em] text-white md:text-3xl">My tickets</h1><p className="mt-1 text-sm text-sky-100/60">Track every request you have raised and its latest status.</p></div><button type="button" onClick={onCreate} className="inline-flex h-10 items-center gap-2 rounded-lg bg-sky-500 px-4 text-sm font-bold text-[#01030e] hover:bg-sky-400"><Plus className="size-4" /> Raise a new ticket</button></div><TicketTable tickets={tickets} employee highlightedTicketId={highlightedTicketId} title="All my tickets" subtitle={`${tickets.length} ticket${tickets.length === 1 ? "" : "s"}`} /></div>;
}

function LineChart() {
  return <svg viewBox="0 0 480 190" className="h-[190px] w-full" role="img" aria-label="Ticket volume over seven days"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2f80ed" stopOpacity=".22"/><stop offset="1" stopColor="#2f80ed" stopOpacity="0"/></linearGradient></defs>{[35,75,115,155].map((y) => <line key={y} x1="35" x2="465" y1={y} y2={y} stroke="#1e2b4f" />)}<path d="M35 143 C75 132 86 82 125 100 S185 135 220 60 S292 52 330 75 S370 160 410 148 S445 123 465 132 L465 170 L35 170 Z" fill="url(#area)"/><path d="M35 143 C75 132 86 82 125 100 S185 135 220 60 S292 52 330 75 S370 160 410 148 S445 123 465 132" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round"/><path d="M35 152 C83 142 98 120 138 117 S193 90 230 101 S282 64 326 67 S370 129 407 139 S444 148 465 151" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round"/></svg>;
}

function TechnicianDashboard({ tickets, view, highlightedTicketId, onStatusChange }: { tickets: TicketRecord[]; view: PortalView; highlightedTicketId?: number | null; onStatusChange: (ticketId: number, status: TicketStatus) => void }) {
  const [dateFilter, setDateFilter] = useState<"today" | "tomorrow" | "custom">("today");
  const [customDate, setCustomDate] = useState("");

  return (
    <div className="mx-auto max-w-[1440px] p-4 md:p-6 lg:p-8">
      {view === "Dashboard" && <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="Dashboard date filter">
        <CalendarDays className="mr-1 size-4 text-sky-300" aria-hidden="true" />
        {(["today", "tomorrow", "custom"] as const).map((option) => (
          <button key={option} type="button" onClick={() => setDateFilter(option)} aria-pressed={dateFilter === option} className={`h-9 rounded-lg px-3 text-xs font-bold capitalize transition ${dateFilter === option ? "bg-sky-500 text-[#01030e]" : "border border-white/10 bg-[#05081c] text-sky-100/75 hover:bg-white/[.055] hover:text-white"}`}>
            {option === "custom" ? "Choose date" : option}
          </button>
        ))}
        {dateFilter === "custom" && (
          <input type="date" value={customDate} onChange={(event) => setCustomDate(event.target.value)} aria-label="Choose dashboard date" className="h-9 rounded-lg border border-white/10 bg-[#05081c] px-3 text-xs font-semibold text-white outline-none [color-scheme:dark] focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20" />
        )}
      </div>}
      <div><h1 className="text-2xl font-bold tracking-[-.025em] text-white md:text-3xl">{view === "Dashboard" ? "IT Support Dashboard" : view}</h1><p className="mt-1 text-sm text-sky-100/60">{view === "Dashboard" ? `Service overview for ${dateFilter === "custom" && customDate ? customDate : dateFilter}.` : view === "Reports" ? "Review ticket volume and resolution performance." : view === "Assigned to me" ? "Tickets currently available to the IT support account." : "Review, filter, and update incoming requests."}</p></div>
      {view === "Dashboard" && <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"><StatCard label="New tickets" value={String(tickets.filter((ticket) => ticket.status === "New").length)} note="Awaiting triage" icon={Inbox} /><StatCard label="Assigned to me" value={String(tickets.length)} note="IT support queue" icon={UserRound} /><StatCard label="In progress" value={String(tickets.filter((ticket) => ticket.status === "In progress").length)} note="Currently being worked" icon={Zap} tone="amber" /><StatCard label="Waiting" value={String(tickets.filter((ticket) => ticket.status === "Waiting").length)} note="Pending response" icon={Clock3} /><StatCard label="Resolved" value={String(tickets.filter((ticket) => ticket.status === "Resolved").length)} note="All recorded tickets" icon={CheckCircle2} tone="green" /></div>}
      {view !== "Reports" && <div className="mt-5"><TicketTable tickets={tickets} highlightedTicketId={highlightedTicketId} title={view === "Assigned to me" ? "Assigned tickets" : undefined} subtitle={view === "Assigned to me" ? "Assignment ownership will become user-specific with Microsoft login." : undefined} onStatusChange={onStatusChange} /></div>}
      {(view === "Dashboard" || view === "Reports") && <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="grid gap-5 md:grid-cols-2"><div className="rounded-xl border border-white/10 bg-[#05081c] p-4"><div className="flex items-center justify-between"><div><h2 className="font-bold text-white">Ticket volume</h2><p className="mt-0.5 text-xs text-sky-100/60">Received vs resolved</p></div><MoreVertical className="size-5 text-sky-100/45" /></div><LineChart /><div className="flex justify-center gap-5 text-xs text-sky-100/60"><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-sky-500" />Received</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-sky-500" />Resolved</span></div></div><div className="rounded-xl border border-white/10 bg-[#05081c] p-4"><div className="flex items-center justify-between"><div><h2 className="font-bold text-white">Resolution time</h2><p className="mt-0.5 text-xs text-sky-100/60">Tickets by completion window</p></div><MoreVertical className="size-5 text-sky-100/45" /></div><div className="mt-7 flex h-[178px] items-end gap-4 border-b border-white/10 px-3">{[["<1h",88],["1–4h",65],["4–8h",42],["1–2d",25],[">2d",11]].map(([label,height]) => <div key={label} className="flex h-full flex-1 flex-col justify-end gap-2"><div className="mx-auto w-full max-w-10 rounded-t bg-sky-400" style={{height: `${height}%`}} /><span className="pb-2 text-center text-[10px] text-sky-100/60">{label}</span></div>)}</div></div></div>
        <aside><div className="rounded-xl border border-sky-400/20 bg-gradient-to-br from-sky-500/10 to-transparent p-5"><div className="flex items-center gap-2 font-bold text-white"><span className="grid size-8 place-items-center rounded-lg bg-sky-400/15 text-sky-400"><Zap className="size-4" /></span> Support insight</div><p className="mt-3 text-sm leading-6 text-sky-100/75">Two similar VPN tickets were resolved today. Review their resolution notes before investigating.</p><button type="button" className="mt-4 w-full rounded-lg border border-sky-400/30 bg-[#05081c] py-2.5 text-xs font-bold text-sky-400 hover:bg-sky-400/10">View related solutions</button></div></aside>
      </div>}
    </div>
  );
}

function CreateTicketModal({ open, onClose, onSubmit, defaultCategory, submitting, error }: { open: boolean; onClose: () => void; onSubmit: (ticket: NewTicket) => void; defaultCategory: string; submitting: boolean; error: string }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(defaultCategory || "IT & Access");
  const [priority, setPriority] = useState<TicketRecord["priority"]>("Medium");
  const [attachment, setAttachment] = useState<File>();
  const [fileError, setFileError] = useState("");
  if (!open) return null;

  const chooseFile = (file?: File) => {
    setFileError("");
    if (!file) { setAttachment(undefined); return; }
    const allowed = new Set(["image/png", "image/jpeg", "image/webp", "video/mp4", "video/webm", "video/quicktime", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
    if (!allowed.has(file.type)) { setFileError("Choose a PNG, JPG, WebP, MP4, WebM, MOV, PDF, DOC, or DOCX file."); return; }
    if (file.size > 10 * 1024 * 1024) { setFileError("The attachment must be 10 MB or smaller."); return; }
    setAttachment(file);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!subject.trim() || !description.trim() || submitting || fileError) return;
    onSubmit({ subject: subject.trim(), description: description.trim(), category, priority, attachment });
  };

  return <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="create-ticket-title"><form onSubmit={submit} className="my-6 w-full max-w-xl overflow-hidden rounded-2xl bg-[#05081c] shadow-[0_30px_90px_rgba(15,23,42,.28)]"><div className="flex items-start justify-between border-b border-white/10 px-5 py-4"><div><h2 id="create-ticket-title" className="text-lg font-bold text-white">Raise a new ticket</h2><p className="mt-1 text-xs text-sky-100/60">Tell us what happened and we’ll route it to the right team.</p></div><button type="button" onClick={onClose} disabled={submitting} className="grid size-9 place-items-center rounded-lg text-sky-100/60 hover:bg-[#111535] disabled:opacity-50" aria-label="Close"><X className="size-5" /></button></div><div className="space-y-4 p-5"><label className="block"><span className="mb-1.5 block text-xs font-bold text-sky-100">Subject</span><input autoFocus required minLength={2} maxLength={255} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="A short summary of the issue" className="h-10 w-full rounded-lg border border-white/10 px-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20" /></label><div className="grid gap-4 sm:grid-cols-2"><label><span className="mb-1.5 block text-xs font-bold text-sky-100">Support area</span><select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 w-full rounded-lg border border-white/10 bg-[#05081c] px-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20">{categories.map((item) => <option key={item.label}>{item.label}</option>)}</select></label><label><span className="mb-1.5 block text-xs font-bold text-sky-100">Priority</span><select value={priority} onChange={(e) => setPriority(e.target.value as TicketRecord["priority"])} className="h-10 w-full rounded-lg border border-white/10 bg-[#05081c] px-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20"><option>Low</option><option>Medium</option><option>High</option></select></label></div><label className="block"><span className="mb-1.5 block text-xs font-bold text-sky-100">What do you need help with?</span><textarea required minLength={2} maxLength={5000} value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Include what you expected, what happened, and anything you already tried…" className="w-full resize-none rounded-lg border border-white/10 p-3 text-sm leading-6 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20" /></label><label className="flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-sky-400/50 bg-sky-400/[.06] px-4 py-3 text-sm font-semibold text-sky-100/80 transition hover:border-sky-300 hover:bg-sky-400/10 focus-within:ring-4 focus-within:ring-sky-400/20"><Paperclip className="size-4 shrink-0" /><span className="min-w-0 truncate">{attachment ? attachment.name : "Add image, video, or document"}</span><input type="file" className="sr-only" accept=".png,.jpg,.jpeg,.webp,.mp4,.webm,.mov,.pdf,.doc,.docx" onChange={(event) => chooseFile(event.target.files?.[0])} disabled={submitting} /></label>{attachment && <div className="flex items-center justify-between gap-3 text-xs text-sky-100/60"><span>{(attachment.size / 1024 / 1024).toFixed(2)} MB · ready to upload</span><button type="button" onClick={() => chooseFile()} className="font-bold text-sky-400 hover:text-sky-300">Remove</button></div>}{fileError && <p role="alert" className="text-sm text-red-300">{fileError}</p>}{error && <p role="alert" className="rounded-lg border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p>}</div><div className="flex justify-end gap-2 border-t border-white/10 bg-[#0a0d24] px-5 py-4"><button type="button" onClick={onClose} disabled={submitting} className="h-10 rounded-lg border border-white/10 bg-[#05081c] px-4 text-sm font-bold text-sky-100/75 disabled:opacity-50">Cancel</button><button type="submit" disabled={submitting || Boolean(fileError)} className="inline-flex h-10 items-center gap-2 rounded-lg bg-sky-500 px-4 text-sm font-bold text-white hover:bg-sky-400 disabled:cursor-wait disabled:opacity-60"><Send className="size-4" /> {submitting ? "Uploading…" : "Submit ticket"}</button></div></form></div>;
}

export function EsslPortal({ initialRole }: { initialRole: Role }) {
  const role = initialRole;
  const [activeView, setActiveView] = useState<PortalView>("Dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState("");
  const [tickets, setTickets] = useState<TicketRecord[]>([]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [highlightedTicketId, setHighlightedTicketId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [lastStatusUpdate, setLastStatusUpdate] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const knownNotificationIdsRef = useRef<Set<number> | null>(null);
  const title = role === "employee" ? "Employee support workspace" : "Technician operations workspace";
  const loadTickets = useCallback(async () => {
    setLoading(true); setLoadError("");
    try {
      const response = await fetch("/api/essl-tickets", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Tickets could not be loaded.");
      setTickets(body);
    } catch (error) { setLoadError(error instanceof Error ? error.message : "Tickets could not be loaded."); }
    finally { setLoading(false); }
  }, []);
  const playNotificationChime = useCallback(() => {
    const context = audioContextRef.current;
    if (!context || context.state !== "running") return;
    const start = context.currentTime;
    [659.25, 880].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.12, start + index * 0.12 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + index * 0.12 + 0.18);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start + index * 0.12);
      oscillator.stop(start + index * 0.12 + 0.2);
    });
  }, []);
  const loadNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/essl-notifications", { cache: "no-store" });
      if (response.ok) {
        const incoming = await response.json() as NotificationRecord[];
        const known = knownNotificationIdsRef.current;
        if (known && incoming.some((item) => !item.isRead && !known.has(item.id))) playNotificationChime();
        knownNotificationIdsRef.current = new Set(incoming.map((item) => item.id));
        setNotifications(incoming);
      }
    } catch { /* Polling retries automatically. */ }
  }, [playNotificationChime]);
  useEffect(() => { void loadTickets(); }, [loadTickets]);
  useEffect(() => {
    const enableAudio = () => {
      if (!audioContextRef.current) audioContextRef.current = new AudioContext();
      if (audioContextRef.current.state === "suspended") void audioContextRef.current.resume();
    };
    window.addEventListener("pointerdown", enableAudio, { once: true });
    window.addEventListener("keydown", enableAudio, { once: true });
    return () => { window.removeEventListener("pointerdown", enableAudio); window.removeEventListener("keydown", enableAudio); };
  }, []);
  useEffect(() => {
    void loadNotifications();
    const timer = window.setInterval(() => void loadNotifications(), 15_000);
    return () => window.clearInterval(timer);
  }, [loadNotifications]);
  const readNotification = async (id: number) => {
    setNotifications((current) => current.map((item) => item.id === id ? { ...item, isRead: true } : item));
    const response = await fetch(`/api/essl-notifications/${id}/read`, { method: "PATCH" });
    if (!response.ok) void loadNotifications();
  };
  const openNotification = (notification: NotificationRecord) => {
    void readNotification(notification.id);
    if (!notification.ticketId) return;
    setActiveView(role === "employee" ? "My tickets" : "Ticket queue");
    setHighlightedTicketId(notification.ticketId);
  };
  useEffect(() => {
    if (!highlightedTicketId) return;
    const timer = window.setTimeout(() => {
      document.getElementById(`ticket-${highlightedTicketId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
    const clear = window.setTimeout(() => setHighlightedTicketId(null), 3500);
    return () => { window.clearTimeout(timer); window.clearTimeout(clear); };
  }, [activeView, highlightedTicketId]);
  const createTicket = (category = "") => { setDefaultCategory(category); setSubmitError(""); setModalOpen(true); };
  const submitTicket = async (ticket: NewTicket) => {
    setSubmitting(true); setSubmitError("");
    try {
      const formData = new FormData();
      formData.set("subject", ticket.subject); formData.set("description", ticket.description); formData.set("category", ticket.category); formData.set("priority", ticket.priority);
      if (ticket.attachment) formData.set("attachment", ticket.attachment);
      const response = await fetch("/api/essl-tickets", { method: "POST", body: formData });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "The ticket could not be saved.");
      setTickets((current) => [body, ...current]); setModalOpen(false); setLastStatusUpdate(`${formatTicketId(body.id)} was created`);
    } catch (error) { setSubmitError(error instanceof Error ? error.message : "The ticket could not be saved."); }
    finally { setSubmitting(false); }
  };
  const updateTicketStatus = async (ticketId: number, status: TicketStatus, adminComment?: string) => {
    const previous = tickets.find((ticket) => ticket.id === ticketId);
    if (!previous) return;
    setTickets((current) => current.map((ticket) => ticket.id === ticketId ? { ...ticket, status, updatedAt: new Date().toISOString() } : ticket));
    try {
      const response = await fetch(`/api/essl-tickets/${ticketId}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, adminComment: adminComment?.trim() || undefined }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "The status could not be updated.");
      setTickets((current) => current.map((ticket) => ticket.id === ticketId ? body : ticket)); setLastStatusUpdate(`${formatTicketId(ticketId)} updated to ${status}`);
    } catch (error) {
      setTickets((current) => current.map((ticket) => ticket.id === ticketId ? previous : ticket));
      setLastStatusUpdate(error instanceof Error ? error.message : "The status could not be updated.");
    }
  };
  return (
    <div className="services-page min-h-dvh bg-background font-[family-name:var(--font-geist-sans)] text-foreground">
      <a href="#essl-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-lg focus:bg-[#05081c] focus:px-4 focus:py-2">Skip to content</a>
      <Topbar role={role} activeView={activeView} notifications={notifications} onOpenNotification={openNotification} onNavigate={setActiveView} onCreate={() => createTicket()} />
      <p className="sr-only" aria-live="polite">{lastStatusUpdate}</p>
      <main id="essl-main" className="pt-32 lg:pt-24" aria-label={title}>
        {loading ? <div className="mx-auto max-w-[1440px] px-4 py-16 text-center text-sm text-sky-100/70">Loading tickets…</div> : loadError ? <div role="alert" className="mx-auto mt-8 max-w-xl rounded-xl border border-red-400/25 bg-red-400/10 p-5 text-center text-red-100"><p>{loadError}</p><button type="button" onClick={() => void loadTickets()} className="mt-3 rounded-lg bg-sky-500 px-4 py-2 text-sm font-bold text-[#01030e]">Try again</button></div> : role === "employee" ? activeView === "My tickets" ? <EmployeeTicketsView tickets={tickets} highlightedTicketId={highlightedTicketId} onCreate={() => createTicket()} /> : <EmployeeDashboard tickets={tickets} onCreate={createTicket} /> : <TechnicianDashboard tickets={tickets} view={activeView} highlightedTicketId={highlightedTicketId} onStatusChange={updateTicketStatus} />}
      </main>
      <CreateTicketModal key={`${defaultCategory}-${modalOpen}`} open={modalOpen} defaultCategory={defaultCategory} submitting={submitting} error={submitError} onClose={() => setModalOpen(false)} onSubmit={(ticket) => void submitTicket(ticket)} />
    </div>
  );
}



