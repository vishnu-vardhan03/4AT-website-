"use client";

import Image from "next/image";
import TiltCard from "@/components/ui/TiltCard";
import AmbientBackground from "@/components/product/AmbientBackground";

const agents = [
  {
    id: "iris",
    badge: "Reconciliation",
    badgeColor: "t",
    name: "Iris",
    role: "GL · AP · AR · Bank Feeds",
    desc: "Transaction matching specialist. Works across all ledgers simultaneously — handles FX, inter-company eliminations, and bank statement reconciliation. Proposes journal entries with full explainability.",
    stat: "99.7% match accuracy · 14,892 txns/night",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    imgAlt: "Reconciliation dashboard showing matched transaction tables and ledger audit trails",
    service: "FastAPI / Python",
  },
  {
    id: "guardian",
    badge: "Fraud Detection",
    badgeColor: "v",
    name: "Guardian",
    role: "Risk · Compliance · Anomaly",
    desc: "Real-time compliance monitor powered by the Python/FastAPI AI Service Layer. Detects duplicate payments, policy violations, and segregation-of-duties conflicts. Generates SOX-ready evidence.",
    stat: "Sub-200ms detection latency",
    img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
    imgAlt: "Fraud detection heatmap dashboard showing transaction risk scores and anomaly alerts",
    service: "FastAPI / Python",
  },
  {
    id: "atlas",
    badge: "Analytics",
    badgeColor: "b",
    name: "Atlas",
    role: "Forecasting · Reporting · Insights",
    desc: "Financial intelligence layer. Synthesizes data from every connected ERP and banking API into narrative dashboards. Answers 'why is EBITDA down?' in plain language.",
    stat: "Connected to 100+ data sources",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    imgAlt: "Financial analytics dashboard showing P&L charts, cash flow forecasting, and variance analysis",
    service: "FastAPI / Python",
  },
  {
    id: "connector",
    badge: "Integration",
    badgeColor: "p",
    name: "Connector",
    role: "ERP · Banking · Payroll · Billing",
    desc: "The data orchestrator managed via NestJS API layer. Maintains live sync between ERPs, Open Banking APIs, Razorpay/Stripe payment gateways, and QuickBooks/Zoho accounting tools.",
    stat: "8s average ERP posting latency",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    imgAlt: "Integration flow diagram showing ERP, banking, and payment gateway connections",
    service: "NestJS / Node.js",
  },
];

const badgeColorMap: Record<string, { bg: string; text: string }> = {
  t: { bg: "rgba(45,212,191,.15)",  text: "#5eead4" },
  v: { bg: "rgba(167,139,250,.15)", text: "#c4b5fd" },
  b: { bg: "rgba(125,211,252,.12)", text: "#7dd3fc" },
  p: { bg: "rgba(192,132,252,.12)", text: "#d8b4fe" },
};
const glowColorMap: Record<string, string> = {
  t: "rgba(45,212,191,0.15)",
  v: "rgba(167,139,250,0.18)",
  b: "rgba(125,211,252,0.14)",
  p: "rgba(192,132,252,0.14)",
};

export default function AgentsSection() {
  return (
    <section id="agents" className="section" style={{ background: "#04060f", padding: "8" }}>
      <AmbientBackground variant="mixed" intensity={0.6} />

      <div className="section-inner">
        <div className="text-center mb-14">
          <div className="eyebrow mb-6 justify-center"><span className="dot" />AI Agents</div>
          <h2 className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(4rem,4vw,3.2rem)" }}>
            Your Autonomous <span className="grad-v">Finance Team</span>
          </h2>
          <p className="text-white mx-auto" style={{ maxWidth: 600, fontSize: "1.2rem" }}>
            Four specialized agents, each trained for a distinct finance function. Powered by Python / FastAPI AI Service Layer + NestJS API backbone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => {
            const bc = badgeColorMap[agent.badgeColor];
            return (
              <TiltCard
                key={agent.id}
                glowColor={glowColorMap[agent.badgeColor]}
                className="glass-card rounded-[18px] overflow-hidden transition-all duration-300 hover:border-white/15"
              >
                {/* Dashboard image */}
                <div className="relative" style={{ height: 160 }}>
                  <Image
                    src={agent.img}
                    alt={agent.imgAlt}
                    fill
                    className="object-cover opacity-55"
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(8,11,26,.95)]" />

                  {/* Service tag */}
                  <div className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1.5 rounded-lg
                    bg-black/50 backdrop-blur-sm text-white/50 border border-white/10">
                    {agent.service}
                  </div>
                </div>

                <div className="p-7 pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide"
                      style={{ background: bc.bg, color: bc.text }}
                    >
                      {agent.badge}
                    </span>
                    <span className="text-xs text-white/35">{agent.role}</span>
                  </div>

                  <h3 className="text-[40px] font-bold mb-2">{agent.name}</h3>
                  <p className="text-m text-white leading-relaxed mb-5">{agent.desc}</p>

                  <div className="flex items-center gap-2 text-xs text-white/38">
                    <span
                      className="w-4 h-px"
                      style={{ background: bc.text }}
                    />
                    {agent.stat}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
