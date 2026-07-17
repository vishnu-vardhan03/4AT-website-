"use client";

import type { ReactElement } from "react";
import TiltCard from "@/components/ui/TiltCard";
import AmbientBackground from "@/components/product/AmbientBackground";

const cards = [
  {
    id: "architecture",
    title: "Finance-Native Architecture",
    desc: "Built on finance-first principles with a secure, scalable, and modular platform that fits your ecosystem.",
    windowTitle: "Finance AI Stack",
    badge: "Live",
    badgeColor: "#10b981",
    color: "v",
  },
  {
    id: "compliance",
    title: "Compliance by Design",
    desc: "SOC 2 Type II, GDPR, and enterprise-grade security built in—so you can scale with confidence.",
    windowTitle: "Security Status",
    badge: "Secure",
    badgeColor: "#10b981",
    color: "t",
  },
  {
    id: "human",
    title: "Human in the Loop",
    desc: "AI surfaces decisions with high confidence. Humans review, validate, and approve.",
    windowTitle: "Review Queue",
    badge: "Pending",
    badgeColor: "#f59e0b",
    color: "b",
  },
  {
    id: "timeline",
    title: "Live in 4 Weeks",
    desc: "Pre-built connectors and a proven implementation framework get you live in just 4 weeks.",
    windowTitle: "Deployment Timeline",
    badge: "On Track",
    badgeColor: "#10b981",
    color: "v",
  },
];

const glowMap: Record<string, string> = {
  v: "rgba(167,139,250,0.18)",
  t: "rgba(45,212,191,0.14)",
  b: "rgba(125,211,252,0.12)",
};

// Architecture Visualization
function ArchitectureViz() {
  return (
    <div className="p-6 space-y-4">
      {/* Top box */}
      <div className="border border-white/15 rounded-lg p-3 text-center text-sm font-medium">
        ERP / Source Systems
      </div>

      {/* Arrow down */}
      <div className="flex justify-center">
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <path d="M12 2 L12 10 M6 6 L12 10 L18 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* Three boxes in row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="border border-violet-500/30 rounded-lg p-2.5 text-center text-xs">
          <div className="font-semibold text-violet-300">AI Decision Layer</div>
        </div>
        <div className="border border-violet-500/30 rounded-lg p-2.5 text-center text-xs">
          <div className="font-semibold text-violet-300">Ledger Engine</div>
        </div>
        <div className="border border-violet-500/30 rounded-lg p-2.5 text-center text-xs">
          <div className="font-semibold text-violet-300">Reports & Analytics</div>
        </div>
      </div>

      {/* Arrows converging down */}
      <div className="flex justify-center gap-1 text-xs text-white/30">
        <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
          <line x1="8" y1="0" x2="8" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="30" y1="0" x2="30" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="52" y1="0" x2="52" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="8" y1="10" x2="30" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="52" y1="10" x2="30" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="30" y1="10" x2="30" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </svg>
      </div>

      {/* Database box */}
      <div className="border border-white/15 rounded-lg p-3 text-center text-sm">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="inline mr-1.5">
          <circle cx="10" cy="3" r="2.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M2 3 Q10 5 18 3 L18 8 Q10 10 2 8 Z" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M2 8 Q10 10 18 8 L18 13 Q10 15 2 13 Z" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </svg>
        <span className="text-xs font-medium">PostgreSQL Database</span>
      </div>

      {/* Data flow nodes at bottom */}
      <div className="flex justify-around px-2">
        <div className="w-3 h-3 rounded-full bg-violet-500 opacity-70" />
        <div className="w-3 h-3 rounded-full bg-violet-400 opacity-70" />
        <div className="w-3 h-3 rounded-full bg-teal-400 opacity-70" />
        <div className="w-3 h-3 rounded-full bg-cyan-400 opacity-70" />
      </div>
    </div>
  );
}

// Compliance Visualization
function ComplianceViz() {
  return (
    <div className="p-6 space-y-4">
      {/* Security shield */}
      <div className="flex items-center gap-3 p-3 border border-teal-500/40 rounded-lg bg-teal-500/5">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 2 L5 6 L5 14 Q5 20 14 25 Q23 20 23 14 L23 6 Z"
            fill="rgba(16,185,129,0.2)"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <path d="M10 14 L13 17 L18 12" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
        <div>
          <div className="text-sm font-bold text-teal-300">Secure</div>
          <div className="text-xs text-white/50">All systems operational</div>
        </div>
      </div>

      {/* Compliance items */}
      <div className="space-y-2 text-sm">
        {["SOC 2 Type II", "GDPR", "JWT API", "Audit Logs"].map((item) => (
          <div key={item} className="flex items-center justify-between text-white/70">
            <span className="text-xs">{item}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8 L6 11 L13 4" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="pt-2">
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-teal-400"
            style={{ width: "100%" }}
          />
        </div>
        <div className="text-xs text-white/50 mt-1 text-right">100%</div>
      </div>
    </div>
  );
}

// Human in Loop Visualization
function HumanViz() {
  return (
    <div className="p-6 space-y-4">
      {/* Review card */}
      <div className="border border-white/15 rounded-lg p-4 space-y-3">
        <div>
          <h4 className="text-lg font-bold mb-2">Invoice #8421</h4>
          <div className="space-y-1 text-sm text-white/60">
            <div>Vendor: Acme Corporation</div>
            <div>Amount: <span className="text-white font-semibold">$24,850.00</span></div>
          </div>
        </div>

        {/* Confidence meter */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/70">Confidence</span>
            <span className="text-sm font-bold text-violet-300">98%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[98%] bg-gradient-to-r from-violet-500 to-fuchsia-500" />
          </div>
        </div>

        {/* Status */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs mb-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="1.2" />
              <circle cx="8" cy="8" r="2" fill="#f59e0b" />
            </svg>
            <span className="text-amber-400">Pending Review</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 border border-emerald-500/50 text-emerald-400 rounded px-3 py-2 text-xs font-semibold hover:bg-emerald-500/10">
              ✓ Approve
            </button>
            <button className="flex-1 border border-red-500/50 text-red-400 rounded px-3 py-2 text-xs font-semibold hover:bg-red-500/10">
              ✕ Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Timeline Visualization
function TimelineViz() {
  const weeks = [
    { week: 1, label: "Discovery & Setup", done: true },
    { week: 2, label: "Integrations", done: true },
    { week: 3, label: "Configuration", done: true },
    { week: 4, label: "Testing & Launch", done: true },
  ];

  return (
    <div className="p-6 space-y-4">
      {/* Timeline items */}
      <div className="space-y-2.5">
        {weeks.map((w) => (
          <div key={w.week} className="flex items-center gap-3">
            <div className="text-xs font-bold text-white/60 w-12">Week {w.week}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/70">{w.label}</span>
                {w.done && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1" />
                    <path d="M4 8 L6.5 10.5 L12 5" stroke="#10b981" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ready status */}
      <div className="pt-3 border-t border-white/10 flex items-start gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
          <circle cx="10" cy="10" r="8" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="3" fill="#10b981" />
        </svg>
        <div>
          <div className="text-xs font-bold text-white">Ready for Production</div>
          <div className="text-xs text-white/50">All systems go</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 ml-auto text-white/40">
          <path d="M2 8 L7 13 L14 2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </div>
  );
}

// macOS Window Chrome Component
function MacOSWindow({
  title,
  badge,
  badgeColor,
  children,
}: {
  title: string;
  badge: string;
  badgeColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-xl border border-white/8 overflow-hidden">
      {/* Window chrome */}
      <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex-1 text-center text-xs font-semibold text-white/80">{title}</div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: `${badgeColor}20`, color: badgeColor }}
          >
            • {badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="text-white/80 text-sm">{children}</div>
    </div>
  );
}

export default function WhySection() {
  const vizMap: Record<string, () => ReactElement> = {
    architecture: ArchitectureViz,
    compliance: ComplianceViz,
    human: HumanViz,
    timeline: TimelineViz,
  };

  return (
    <section
      id="why"
      className="section"
      style={{ background: "linear-gradient(180deg,#04060f 0%,#060916 100%)" }}
    >
      <AmbientBackground variant="violet" intensity={0.5} />
      <div className="section-inner">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="eyebrow mb-6 justify-center">
            <span className="dot" />Why 4AT
          </div>
          <h2
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(4rem,4vw,3.4rem)", lineHeight: 1.1 }}
          >
            Built for Finance.{" "}
            <span
              className="bg-gradient-to-r from-teal-300 via-violet-400 to-white bg-clip-text text-transparent"
              style={{ background: "linear-gradient(90deg,#5eead4,#c084fc,#ffffff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Designed
            </span>{" "}
            for Impact.
          </h2>
          <p className="text-white mx-auto text-lg" style={{ maxWidth: 600, lineHeight: 1.9, fontSize: "1.2rem" }}>
            Our platform combines AI, automation, and human expertise to deliver accurate financial intelligence—faster.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const VizComponent = vizMap[card.id];
            return (
              <TiltCard
                key={card.id}
                glowColor={glowMap[card.color]}
                className="flex flex-col h-full transition-colors duration-300"
              >
                <MacOSWindow title={card.windowTitle} badge={card.badge} badgeColor={card.badgeColor}>
                  {VizComponent && <VizComponent />}
                </MacOSWindow>

                {/* Description below window */}
                <div className="mt-6">
                  <h3 className="text-[18px] font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-white leading-relaxed">{card.desc}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
