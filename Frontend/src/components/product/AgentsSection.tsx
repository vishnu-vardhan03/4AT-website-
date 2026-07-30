"use client";

import Image from "next/image";
import TiltCard from "@/components/ui/TiltCard";
import AmbientBackground from "@/components/product/AmbientBackground";

const agents = [
  {
    id: "Reconciliation",
    service: "Accounting",
    badge: "Always-on",
    stat: "Continuous ledger matching",
    name: "Reconciliation",
    role: "GL · AP · AR · Bank Feeds",
    desc: "Matches and reconciles transactions across your ledgers, surfacing exceptions for review instead of guessing past them.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    imgAlt: "Reconciliation dashboard showing matched transaction tables and ledger audit trails"
  },
  {
    id: "Compliance",
    service: "Risk",
    badge: "Controls",
    stat: "Continuous anomaly monitoring",
    name: "Compliance",
    role: "Risk · Compliance · Anomaly",
    desc: "Matches and reconciles transactions across your ledgers, surfacing exceptions for review instead of guessing past them.",
    img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
    imgAlt: "Fraud detection heatmap dashboard showing transaction risk scores and anomaly alerts"
  },
  {
    id: "Analytics",
    service: "Planning",
    badge: "Insights",
    stat: "Forward-looking finance views",
    name: "Analytics",
    role: "Forecasting · Reporting · Insights",
    desc: "Turns your finance data into reports and forward-looking views.",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    imgAlt: "Financial analytics dashboard showing P&L charts, cash flow forecasting, and variance analysis",
  },
  {
    id: "Integration",
    service: "Systems",
    badge: "Connected",
    stat: "Synchronized finance data",
    name: "Integration",
    role: "ERP · Banking · Payroll · Billing",
    desc: "Keeps your ERP, ledgers, and adjacent systems in sync so the other three agents work inside your actual data.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    imgAlt: "Integration flow diagram showing ERP, banking, and payment gateway connections",
  },
];

<<<<<<< HEAD
const glowColorMap: Record<string, string> = {
  Reconciliation: "rgba(45,212,191,0.15)",
  Compliance: "rgba(167,139,250,0.18)",
  Analytics: "rgba(125,211,252,0.14)",
  Integration: "rgba(192,132,252,0.14)",
};

=======
>>>>>>> 3b6225ad00974781d77c1d2405ead8874fea5db8
export default function AgentsSection() {
  return (
    <section
      id="agents"
      className="section"
      style={{ background: "#04060f", padding: "8" }}
    >
      <AmbientBackground variant="mixed" intensity={0.6} />

      <div className="section-inner">
        <div className="text-center mb-14">
          <div className="eyebrow mb-6 justify-center">
            <span className="dot" />
            AI Agents
          </div>

          <h2
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(4rem,4vw,3.2rem)" }}
          >
            Your Autonomous <span className="grad-v">Finance Team</span>
          </h2>

          <p
            className="text-white mx-auto"
            style={{ maxWidth: 600, fontSize: "1.2rem" }}
          >
            Four specialized agents, each trained for a distinct finance
            function. Powered by Python / FastAPI AI Service Layer + NestJS API
            backbone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<<<<<<< HEAD
          {agents.map((agent) => {
            return (
              <TiltCard
                key={agent.id}
                glowColor={glowColorMap[agent.id]}
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
=======
          {agents.map((agent) => (
            <TiltCard
              key={agent.id}
              className="glass-card rounded-[18px] overflow-hidden transition-all duration-300 hover:border-white/15"
            >
              <div className="relative" style={{ height: 160 }}>
                <Image
                  src={agent.img}
                  alt={agent.imgAlt}
                  fill
                  className="object-cover opacity-55"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
>>>>>>> 3b6225ad00974781d77c1d2405ead8874fea5db8

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(8,11,26,.95)]" />

                <div className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white/50 border border-white/10" />
              </div>

              <div className="p-7 pt-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide" />
                  <span className="text-xs text-white/35">{agent.role}</span>
                </div>

                <h3 className="text-[40px] font-bold mb-2">{agent.name}</h3>

                <p className="text-m text-white leading-relaxed mb-5">
                  {agent.desc}
                </p>

                <div className="flex items-center gap-2 text-xs text-white/38">
                  <span className="w-4 h-px" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
