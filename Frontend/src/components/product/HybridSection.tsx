"use client";

import AmbientBackground from "@/components/product/AmbientBackground";
import TiltCard from "@/components/ui/TiltCard";

const humanExperts = [
  {
    name: "Priya Sharma",
    role: "Reconciliation Lead",
    avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Priya&backgroundColor=b6e3f4",
    spec: "10yr GL · SAP",
  },
  {
    name: "Marcus Chen",
    role: "Compliance Specialist",
    avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Marcus&backgroundColor=c0aede",
    spec: "SOX · GAAP",
  },
  {
    name: "Aisha Patel",
    role: "AI Integration Architect",
    avatar: "https://api.dicebear.com/8.x/avataaars/svg?seed=Aisha&backgroundColor=ffdfbf",
    spec: "FastAPI · NestJS",
  },
];

void humanExperts;

const aiItems = [
  "Reconciliation exceptions & variance diagnosis",
  "Data mapping and field configuration queries",
  "Account status, balance queries & diagnostics",
  "Workflow automation setup & rule configuration",
  "Report generation and data exports (PostgreSQL)",
  "Integration health checks & sync status alerts",
];

const humanItems = [
  "Complex reconciliation logic & accounting policy decisions",
  "Compliance review, audit support & regulatory guidance",
  "Custom workflow design and optimization consulting",
  "System performance tuning & architectural decisions",
  "Team training, onboarding & change management",
  "Strategic implementation for ERP rollouts",
];

export default function HybridSection() {
  return (
    <section id="hybrid" className="section" style={{ background: "#060916" }}>
      <AmbientBackground variant="mixed" intensity={0.6} />

      <div className="section-inner">
        <div className="text-center mb-14">
          <div className="eyebrow mb-6 justify-center"><span className="dot" />Support Ecosystem</div>
          <h2 className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(4rem,4vw,3.2rem)" }}>
            AI Speed. <span className="grad-v">Human Judgment.</span>
          </h2>
          <p className="text-white mx-auto" style={{ maxWidth: 640, fontSize: "1.2rem" }}>
           4AT combines automation with finance-specialized human support, so teams move faster without losing control, context, or judgment.  
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI Column */}
          <TiltCard
            glowColor="rgba(167,139,250,0.16)"
            className="rounded-[20px] overflow-hidden"style={{ border: "1px solid rgba(167,139,250,.2)",
              background: "linear-gradient(160deg,rgba(16,12,34,.9),rgba(8,11,26,.9))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-7 py-6"
              style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "linear-gradient(135deg,rgba(167,139,250,.25),rgba(192,132,252,.15))" }}>
                🤖
              </div>
              <div>
                <h3 className="text-[30px] font-bold">AI Support Layer</h3>
                <p className="text-m text-white/42 mt-0.5">Always on · Instant resolution</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              {[
                ["Response Time", "Sub-second"],
                ["Availability", "24 / 7 / 365"],
                ["Coverage", "~80% of cases"],
                ["Escalation", "Automatic"],
              ].map(([label, val]) => (
                <div key={label} className="px-5 py-4"
                  style={{ borderRight: "1px solid rgba(255,255,255,.05)", background: "rgba(4,6,15,.4)" }}>
                  <div className="text-[11px] uppercase tracking-wide mb-1"
                    style={{ color: "rgba(167,139,250,.65)" }}>{label}</div>
                  <div className="text-base font-bold" style={{ color: "#c4b5fd" }}>{val}</div>
                </div>
              ))}
            </div>

            <div className="px-7 py-6">
              <div className="text-[15px] uppercase tracking-widest text-white mb-3">
                What AI handles instantly
              </div>
              {aiItems.map((item) => (
                <div key={item} className="flex items-start gap-3 py-2.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: "#a78bfa", boxShadow: "0 0 6px rgba(167,139,250,.5)" }} />
                  <p className="text-[18px] text-white/62 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </TiltCard>

          {/* Human Column */}
          <TiltCard
            glowColor="rgba(45,212,191,0.14)"
            className="rounded-[20px] overflow-hidden relative"
            style={{ border: "1px solid rgba(45,212,191,.2)",
              background: "linear-gradient(160deg,rgba(16,12,34,.9),rgba(8,11,26,.9))" }}
          >
            {/* Human-in-the-loop label */}
            <div className="absolute top-5 right-10 px-3 py-1.5 rounded-lg text-[11px] font-bold
              uppercase tracking-wide z-10"
              style={{ background: "linear-gradient(90deg,#2dd4bf,#7dd3fc)", color: "#04060f" }}>
              Human-in-the-Loop
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 px-7 py-6 mt-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "linear-gradient(135deg,rgba(45,212,191,.2),rgba(125,211,252,.15))" }}>
                👥
              </div>
              <div>
                <h3 className="text-[30px] font-bold">Human Expert Layer</h3>
                <p className="text-m text-white/42 mt-0.5">Finance + AI specialists · Your team&apos;s extension</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              {[
                ["Response Time", "<15 min (Pro)"],
                ["Availability", "24/7 Enterprise"],
                ["Expertise", "Accounting + AI"],
                ["Enterprise", "Dedicated Spec."],
              ].map(([label, val]) => (
                <div key={label} className="px-5 py-4"
                  style={{ borderRight: "1px solid rgba(255,255,255,.05)", background: "rgba(4,6,15,.4)" }}>
                  <div className="text-[11px] uppercase tracking-wide mb-1"
                    style={{ color: "rgba(45,212,191,.65)" }}>{label}</div>
                  <div className="text-base font-bold" style={{ color: "#5eead4" }}>{val}</div>
                </div>
              ))}
            </div>

            <div className="px-7 py-6">
              <div className="text-[15px] uppercase tracking-widest text-white mb-3">
                Where humans take the lead
              </div>
              {humanItems.map((item) => (
                <div key={item} className="flex items-start gap-3 py-2.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: "#2dd4bf", boxShadow: "0 0 6px rgba(45,212,191,.4)" }} />
                  <p className="text-[17px] text-white/62 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>

        {/* Bridge */}
        <div
          className="relative p-10 rounded-2xl text-center overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,.09)",
            background: "linear-gradient(135deg,rgba(167,139,250,.06),rgba(45,212,191,.04))",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg,#a78bfa,#c084fc,#7dd3fc,#2dd4bf)" }} />
          <h3 className="text-4xl font-bold mb-3">One Unified Experience — Zero Friction</h3>
          <p className="text-white text-[17px] mx-auto mb-7" style={{ maxWidth: 680 }}>
            You never decide who to ask. 4AT routes every issue intelligently: AI resolves it instantly when it can, hands off to a specialist when it should. A single thread, full history, one resolution.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["Your Question","→","AI Triages","→","Resolved in Seconds","or","Specialist Engaged","→","Expert Resolution"]
              .map((node, i) => (
                <div key={i}>
                  {["→","or"].includes(node) ? (
                    <span className="text-white/28 text-lg">{node}</span>
                  ) : (
                    <span
                      className="px-4 py-2 rounded-full text-sm font-bold"
                      style={{
                        background: ["Resolved in Seconds","Expert Resolution"].includes(node)
                          ? "rgba(45,212,191,.12)" : "rgba(167,139,250,.12)",
                        border: `1px solid ${["Resolved in Seconds","Expert Resolution"].includes(node)
                          ? "rgba(45,212,191,.22)" : "rgba(167,139,250,.22)"}`,
                        color: ["Resolved in Seconds","Expert Resolution"].includes(node)
                          ? "#5eead4" : "#c4b5fd",
                      }}
                    >{node}</span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
