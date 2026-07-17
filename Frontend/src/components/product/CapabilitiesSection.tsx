"use client";

import type { ReactElement } from "react";
import TiltCard from "@/components/ui/TiltCard";
import AmbientBackground from "@/components/product/AmbientBackground";

const capabilities = [
  {
    title: "Reconciliation Engine",
    badge: "Live",
    badgeColor: "t",
    desc: "Automate transaction matching, variance review, and journal preparation across multi-entity workflows",
    stat: "99.7%",
    statLabel: "Match accuracy",
    wide: true,
    color: "t",
    viz: "reconcile",
  },
  {
    title: "Anomaly  Detection",
    badge: "AI Monitor",
    badgeColor: "v",
    desc: "Python/FastAPI behavioural AI trained on financial patterns. Surfaces duplicate payments, policy violations, and anomalous transactions in real-time.",
    stat: "<200ms",
    statLabel: "Detection latency",
    color: "v",
    viz: "anomaly",
  },
  {
    title: "Document AI",
    badge: "Processing",
    badgeColor: "b",
    desc: "Extract, classify, and route invoices, contracts, and receipts. Zero manual indexing. Feeds directly into AP/AR workflows.",
    color: "b",
    viz: "document",
  },
  {
    title: "Forecasting Models",
    badge: "Next 90 Days",
    badgeColor: "v",
    desc: "Turn operational finance data into forward-looking visibility across cash flow, spend, and variance.",
    stat: "±2.1%",
    statLabel: "Forecast variance",
    color: "v",
    viz: "forecast",
  },
  {
    title: "Audit Copilot",
    badge: "Audit Readiness 92%",
    badgeColor: "t",
    desc: "Automated evidence package assembly. Maps every transaction to controls. Reduces audit prep from weeks to hours.",
    color: "t",
    viz: "audit",
  },
  {
    title: "ERP Integration",
    badge: "Connected",
    badgeColor: "b",
    desc: "Connect ERP and adjacent systems so AI runs inside live workflows, not in isolated exports.",
    color: "b",
    viz: "erp",
  },
];

const badgeColorMap: Record<string, { bg: string; text: string }> = {
  t: { bg: "rgba(45,212,191,.15)", text: "#5eead4" },
  v: { bg: "rgba(167,139,250,.15)", text: "#c4b5fd" },
  b: { bg: "rgba(125,211,252,.12)", text: "#7dd3fc" },
};

const glowMap: Record<string, string> = {
  t: "rgba(45,212,191,0.14)",
  v: "rgba(167,139,250,0.18)",
  b: "rgba(125,211,252,0.14)",
};

// Mini-visualization components
function ReconcileViz() {
  return (
    <div className="mb-5">
      <div className="flex gap-6 mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 rounded-sm flex items-center justify-center bg-[rgba(45,212,191,.2)] text-[#5eead4] text-xs">✓</span>
            <span className="text-xs text-white/60">Matched</span>
          </div>
          <div className="text-lg font-bold text-white">24,268</div>
          <div className="w-full h-1.5 bg-[rgba(255,255,255,.1)] rounded-full mt-2">
            <div className="h-full w-[94%] bg-[#5eead4] rounded-full"></div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 rounded-sm flex items-center justify-center bg-[rgba(255,255,255,.1)] text-white/50 text-xs">◯</span>
            <span className="text-xs text-white/60">Unmatched</span>
          </div>
          <div className="text-lg font-bold text-white/60">27</div>
          <div className="w-full h-1.5 bg-[rgba(255,255,255,.1)] rounded-full mt-2">
            <div className="h-full w-[6%] bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="text-xs text-white/50 mb-1">Match Accuracy</div>
      <svg height="40" viewBox="0 0 200 40" className="w-full" preserveAspectRatio="none">
        <polyline points="0,35 20,32 40,34 60,28 80,25 100,20 120,18 140,15 160,10 180,8 200,5"
          fill="none" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function AnomalyViz() {
  const dots = [
    { x: 15, y: 20, r: 3, c: "#c4b5fd" },
    { x: 35, y: 35, r: 2.5, c: "#c4b5fd" },
    { x: 50, y: 10, r: 3, c: "#c4b5fd" },
    { x: 70, y: 50, r: 2, c: "#c4b5fd" },
    { x: 85, y: 25, r: 2.5, c: "#c4b5fd" },
    { x: 65, y: 65, r: 2, c: "#c4b5fd" },
    { x: 100, y: 50, r: 5, c: "#ef4444" },
    { x: 120, y: 30, r: 2.5, c: "#c4b5fd" },
    { x: 140, y: 55, r: 2, c: "#c4b5fd" },
    { x: 160, y: 20, r: 3, c: "#c4b5fd" },
    { x: 180, y: 40, r: 2.5, c: "#c4b5fd" },
  ];
  return (
    <div className="mb-5">
      <svg height="80" viewBox="0 0 200 80" className="w-full mb-3">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={d.c === "#ef4444" ? 1 : 0.6} />
        ))}
      </svg>
      <div className="text-xs text-[#ef4444] mb-2 flex items-center gap-1.5">
        <span>▲</span> Anomalous transaction detected <span className="text-white/40 ml-auto">10:42:31 AM</span>
      </div>
    </div>
  );
}

function DocumentViz() {
  return (
    <div className="mb-5">
      <div className="flex gap-3 mb-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#7dd3fc]/30 to-[#2dd4bf]/20 flex items-center justify-center">
          <span className="text-white/40 text-xs">PDF</span>
        </div>
        <div className="flex-1 text-xs">
          <div className="text-white/80 mb-1">Invoice_8421.pdf</div>
          <div className="text-white/50 mb-2">Extracting...</div>
          <div className="w-full h-1.5 bg-[rgba(255,255,255,.1)] rounded-full">
            <div className="h-full w-[72%] bg-[#7dd3fc] rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div><span className="text-white/50">Vendor</span><div className="font-bold">Acme Corp</div></div>
        <div><span className="text-white/50">Amount</span><div className="font-bold text-[#5eead4]">$24,850.00</div></div>
        <div><span className="text-white/50">Invoice Date</span><div className="font-bold">May 24, 2024</div></div>
        <div><span className="text-white/50">Due Date</span><div className="font-bold">May 30, 2024</div></div>
      </div>
      <div className="mt-2 text-xs flex items-center gap-1 text-[#5eead4]">
        <span>✓</span> Extracted
      </div>
    </div>
  );
}

function ForecastViz() {
  return (
    <div className="mb-5">
      <div className="flex gap-4 mb-4 text-xs">
        <div>
          <div className="text-white/60 mb-1">Cash Flow</div>
          <div className="text-lg font-bold">$2.25M</div>
          <div className="text-[#c4b5fd] text-sm">↑ 12.6%</div>
        </div>
        <div className="flex-1">
          <svg height="50" viewBox="0 0 120 50" preserveAspectRatio="none" className="w-full">
            <polyline points="0,40 20,35 40,32 60,25 80,20 100,15 120,8"
              fill="none" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="120" cy="8" r="2.5" fill="#c084fc" />
          </svg>
        </div>
      </div>
      <div className="flex justify-between text-xs text-white/50">
        <span>Jul</span><span>Aug</span><span className="text-right">Sep 30<br/>$2.45M</span>
      </div>
    </div>
  );
}

function AuditViz() {
  const tasks = [
    { name: "Transaction Sampling", status: "Complete" },
    { name: "Control Mapping", status: "Complete" },
    { name: "Evidence Collection", status: "Complete" },
    { name: "Review & Sign-off", status: "In Progress" },
  ];
  return (
    <div className="mb-5 text-xs space-y-2">
      {tasks.map((t) => (
        <div key={t.name} className="flex items-center gap-2.5">
          <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
            t.status === "Complete"
              ? "bg-[rgba(45,212,191,.2)] text-[#5eead4]"
              : "bg-[rgba(255,255,255,.1)] text-white/50"
          }`}>
            {t.status === "Complete" ? "✓" : "◆"}
          </span>
          <span className="text-white/70">{t.name}</span>
          <span className={`ml-auto ${t.status === "Complete" ? "text-[#5eead4]" : "text-[#c4b5fd]"}`}>
            {t.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function ErpViz() {
  const systems = [
    { name: "NetSuite", x: 5, c: "#999" },
    { name: "Oracle", x: 47, c: "#ef4444" },
    { name: "SAP", x: 87, c: "#2563eb" },
    { name: "Dynamics 365", x: 140, c: "#7c3aed" },
  ];
  return (
    <div className="mb-5">
      <svg height="60" viewBox="0 0 180 60" className="w-full">
        {/* Connection lines */}
        <line x1="20" y1="30" x2="50" y2="30" stroke="rgba(139,92,246,.3)" strokeWidth="1.5" />
        <line x1="50" y1="30" x2="80" y2="30" stroke="rgba(139,92,246,.3)" strokeWidth="1.5" />
        <line x1="80" y1="30" x2="140" y2="30" stroke="rgba(139,92,246,.3)" strokeWidth="1.5" />
        {/* Nodes */}
        {systems.map((sys) => (
          <g key={sys.name}>
            <circle cx={sys.x} cy="30" r="8" fill={sys.c} opacity="0.3" />
            <circle cx={sys.x} cy="30" r="6" fill="none" stroke={sys.c} strokeWidth="1.5" />
            <circle cx={sys.x} cy="30" r="2.5" fill={sys.c} />
          </g>
        ))}
        {/* Labels */}
        {systems.map((sys) => (
          <text key={`${sys.name}-label`} x={sys.x} y="50" textAnchor="middle" className="text-xs fill-white/50" fontSize="10">
            {sys.name}
          </text>
        ))}
      </svg>
    </div>
  );
}

const vizComponents: Record<string, () => ReactElement> = {
  reconcile: ReconcileViz,
  anomaly: AnomalyViz,
  document: DocumentViz,
  forecast: ForecastViz,
  audit: AuditViz,
  erp: ErpViz,
};

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section" style={{ background: "#04060f" }}>
      <AmbientBackground variant="violet" intensity={0.7} />

      <div className="section-inner">
        <div className="text-center  mb-20 md:mb-28">
          <div className="eyebrow mb-8 justify-center">
            <span className="dot" />Core Capabilities
          </div>
          <h2
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(5rem,4vw,3.2rem)" }}
          >
            Finance AI <span className="grad-v">Built Different</span>
          </h2>
          <p
            className="text-white mx-auto"
            style={{ maxWidth: 580, fontSize: "1.4rem" }}
          >
            Most AI tools are built horizontally and then adapted for finance. 4AT starts with accounting logic, controls, review workflows, and implementation realities from the beginning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full">
          {capabilities.map((cap) => {
            const VizComponent = vizComponents[cap.viz];
            const bc = badgeColorMap[cap.badgeColor];
            return (
              <TiltCard
                key={cap.title}
                glowColor={glowMap[cap.color]}
                className={`glass-card rounded-[18px] p-4 sm:p-6 flex flex-col transition-colors duration-300 hover:border-white/14 ${
                  cap.wide ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {/* Header with badge */}
                <div className="flex items-center justify-between gap-3 mb-5 pb-5 border-b border-white/8">
                  <h3 className="text-base sm:text-[17px] font-bold">{cap.title}</h3>
                  <span
                    className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 uppercase tracking-wide"
                    style={{ background: bc.bg, color: bc.text }}
                  >
                    {cap.badge}
                  </span>
                </div>

                {/* Visualization */}
                {VizComponent && <VizComponent />}

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/52 leading-relaxed flex-1 mb-5">
                  {cap.desc}
                </p>

                {/* Stat */}
                {cap.stat && (
                  <div className="pt-5 border-t border-white/8">
                    <div
                      className="text-2xl sm:text-3xl font-bold"
                      style={{
                        color:
                          cap.color === "t"
                            ? "#5eead4"
                            : cap.color === "v"
                            ? "#c4b5fd"
                            : "#7dd3fc",
                      }}
                    >
                      {cap.stat}
                    </div>
                    <div className="text-xs text-white/35 uppercase tracking-widest mt-1">
                      {cap.statLabel}
                    </div>
                  </div>
                )}
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
