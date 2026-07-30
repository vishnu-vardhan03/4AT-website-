"use client";

import { useState } from "react";
import TiltCard from "@/components/ui/TiltCard";
import AmbientBackground from "@/components/product/AmbientBackground";

/* ── SECURITY ────────────────────────────────────────── */
export function SecuritySection() {
  const badges = [
    { icon: "🔐", title: "SOC 2 Type II",    desc: "Independently audited security controls reviewed annually by third parties." },
    { icon: "🌍", title: "GDPR Compliant",   desc: "Full EU data protection compliance. Data residency and deletion policies enforced." },
    { icon: "🏥", title: "HIPAA Ready",      desc: "Healthcare-grade encryption and data handling. Available on Enterprise tier." },
    { icon: "🔑", title: "AES-256 Encrypt.", desc: "All financial data encrypted in transit and at rest. End-to-end." },
    { icon: "📋", title: "Immutable Logs",   desc: "Every AI action timestamped and signed. Tamper-proof audit trails for regulators." },
    { icon: "🛡️", title: "SSO & MFA",       desc: "SAML-based SSO, hardware security key support, and adaptive MFA across all tiers." },
  ];
  return (
    <section id="security" className="section" style={{ background: "#04060f" }}>
      <AmbientBackground variant="teal" intensity={0.5} />
      <div className="section-inner">
        <div className="text-center mb-14">
          <div className="eyebrow mb-6 justify-center"><span className="dot" />Security</div>
          <h2 className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(4rem,4vw,3.2rem)" }}>
            Enterprise-Grade <span className="grad-v">Protection</span>
          </h2>
          <p className="text-white mx-auto" style={{ maxWidth: 560, fontSize: "1.2rem" }}>
            4AT AI is designed for environments where auditability, data protection, and access control are non-negotiable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {badges.map((b) => (
            <TiltCard key={b.title} className="glass-card rounded-2xl p-7 text-center
              transition-colors duration-300 hover:border-teal-400/25">
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="text-[25px] font-bold mb-2">{b.title}</h3>
              <p className="text-m text-white/48 leading-relaxed">{b.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ─────────────────────────────────────────── */
export function PricingSection() {
  return (
    <section
      id="pricing"
      className="section"
      style={{ background: "#060916" }}
    >
      <AmbientBackground variant="violet" intensity={0.55} />

      <div className="section-inner">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="eyebrow mb-6 justify-center">
            <span className="dot" />
            Flexible Pricing
          </div>

          <h2
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(3rem,5vw,4rem)" }}
          >
            Tailored <span className="grad-v">Enterprise Plans</span>
          </h2>

          <p className="text-white mx-auto text-xl max-w-3xl">
            Every organization is different. We'll work with you to create the
            perfect plan for your business.
          </p>
        </div>

        {/* Single Pricing Card */}
        <TiltCard
          glowColor="rgba(167,139,250,.18)"
          className="glass-card rounded-[28px] p-8 md:p-10 transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Left */}
            <div className="flex items-start gap-5 max-w-3xl">

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-semibold"
                style={{
                  background: "rgba(167,139,250,.12)",
                  color: "#a78bfa",
                  border: "1px solid rgba(167,139,250,.2)",
                }}
              >
                $
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  Need a Custom Pricing Plan?
                </h3>

                <p className="text-white/65 text-lg leading-relaxed">
                  Whether you're a startup, mid-sized company, or enterprise,
                  we'll recommend the right AI solution and pricing based on
                  your workflows, integrations, and business goals.
                </p>
              </div>
            </div>

            {/* Right */}
            <a
              href="/contact"
              className="flex items-center justify-center whitespace-nowrap px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(167,139,250,.4)]"
              style={{
                background:
                  "linear-gradient(90deg,#a78bfa 0%,#c084fc 100%)",
              }}
            >
              Contact Sales →
            </a>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────── */
const faqs = [
  { q: "How accurate is 4AT's reconciliation AI?",
    a: "4AT is built to flag exceptions rather than claim perfection — every unmatched item surfaces with a full explanation and a confidence score, one click from posted entry to raw transaction. " },
  { q: "Is my financial data secure and compliant?",
    a: "4AT is SOC 2 Type II certified, GDPR-compliant, and HIPAA-ready. All data uses AES-256 encryption. Every action produces an immutable timestamped audit log. We run on AWS (EC2 + RDS PostgreSQL + ElastiCache Redis + CloudFront CDN) with strict data residency policies." },
  { q: "Does AI post journal entries automatically?",
    a: "Only when you configure it to. The default is a human-approval workflow — AI prepares entries, your team reviews and approves before anything posts. You can configure confidence-based auto-posting for routine transactions while keeping a review step for edge cases and large values." },
  { q: "What backend stack powers 4AT?",
    a: "NestJS (Node.js) serves as the API layer handling Auth, Finance, AI Request, Academy, and Notification services. Python FastAPI powers the AI Service Layer (Fraud Detection, Audit Insights, Financial Analysis, Report Generation). PostgreSQL stores all data. Redis for caching. All on AWS." },
  { q: "Can 4AT handle multi-entity and multi-currency?",
    a: "Yes. 4AT supports unlimited entities, consolidation ledgers, inter-company eliminations, and statutory reporting. Currency translation, forex gain/loss calculations, and hedging entries are handled automatically." },
  { q: "How long does implementation take?",
    a: "Most customers go live in 4–6 weeks. Pre-built NestJS connectors, workflow templates, and a dedicated implementation specialist accelerate onboarding. Enterprise deployments with custom integrations typically take 8–12 weeks." },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section" style={{ background: "#04060f" }}>
      <AmbientBackground variant="violet" intensity={0.4} />
      <div className="section-inner">
        <div className="text-center mb-14">
          <div className="eyebrow mb-6 justify-center"><span className="dot" />FAQ</div>
          <h2 className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(4rem,4vw,3.2rem)" }}>
            Common <span className="grad-v">Questions</span>
          </h2>
        </div>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {faqs.map((f, i) => (
            <div
              key={i}
              className="mb-3 rounded-2xl overflow-hidden transition-colors duration-300"
              style={{
                border: open === i ? "1px solid rgba(167,139,250,.3)" : "1px solid rgba(255,255,255,.08)",
                background: "linear-gradient(160deg,rgba(16,12,34,.75),rgba(8,11,26,.75))",
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left
                  font-bold text-[25px] transition-colors duration-200"
                style={{ color: open === i ? "#c4b5fd" : "rgba(255,255,255,.85)" , }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {f.q}
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-m
                    flex-shrink-0 ml-4 transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,.15)",
                    transform: open === i ? "rotate(180deg)" : "rotate(0)",
                    background: open === i ? "rgba(167,139,250,.15)" : "transparent",
                    
                  }}
                >▲</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-m text-white leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
