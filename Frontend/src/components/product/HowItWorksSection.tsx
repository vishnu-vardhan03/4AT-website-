"use client";

import { useState } from "react";
import AmbientBackground from "@/components/product/AmbientBackground";
import Glyph, { GlyphName } from "@/components/ui/Glyph";

const steps: {
  id: number;
  glyph: GlyphName;
  title: string;
  desc: string;
  detail: string;
  color: string;
  glow: string;
}[] = [
  {
    id: 1,
    glyph: "connect",
    title: "Connect",
    desc: "Securely connect ERP, CRM, Open Banking APIs, payroll and billing platforms.",
    detail:
      "NestJS API Layer • JWT Authentication • SAP • Oracle • NetSuite",
    color: "#a78bfa",
    glow: "rgba(167,139,250,.35)",
  },
  {
    id: 2,
    glyph: "understand",
    title: "Understand",
    desc: "AI understands your financial operations using historical accounting patterns.",
    detail:
      "FastAPI AI • PostgreSQL • Knowledge Graph • Fraud Detection",
    color: "#c084fc",
    glow: "rgba(192,132,252,.35)",
  },
  {
    id: 3,
    glyph: "automate",
    title: "Automate",
    desc: "Reconciliations, journal entries and reporting happen automatically.",
    detail:
      "Finance Service • AI Workflows • Mixpanel • Google Analytics",
    color: "#7dd3fc",
    glow: "rgba(125,211,252,.3)",
  },
  {
    id: 4,
    glyph: "govern",
    title: "Govern",
    desc: "Human approval with explainability and immutable audit logs.",
    detail:
      "Dashboard • RBAC • Notifications • Audit Trail",
    color: "#2dd4bf",
    glow: "rgba(45,212,191,.3)",
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="howitworks"
      className="section"
      style={{ background: "#060916" }}
    >
      <AmbientBackground variant="violet" intensity={0.5} />

      <div className="section-inner">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="eyebrow mb-6 justify-center">
            <span className="dot" />
            Process
          </div>

          <h2
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(3.5rem,10vw,3.2rem)" }}
          >
            Transforming Finance Workflows{" "}
            <span className="grad-v">
              Step by Step
            </span>
          </h2>

          <p
            className="text-white mx-auto"
            style={{ maxWidth: 620, fontSize: "1.3rem" }}
          >
            Connect → Understand → Automate → Govern.
            <br></br>
            Every step builds on the previous one to create a
            fully autonomous finance workflow.
          </p>

        </div>
      </div>

        {/* ================= DESKTOP ================= */}

        <div className="hidden lg:block">

          <div className="relative mb-12">

            <div
              className="absolute top-[38px] left-[12.5%] right-[12.5%] h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg,#a78bfa,#c084fc,#7dd3fc,#2dd4bf)",
                opacity: .7,
              }}
            />

            <div className="absolute top-[38px] left-[12.5%] right-[12.5%] h-[2px] pointer-events-none">

              <span className="flow-pulse"/>

            </div>

            <div className="grid grid-cols-4 relative z-10">

              {steps.map((step) => (

                <div
                  key={step.id}
                  className="flex justify-center"
                  onMouseEnter={() => setActive(step.id)}
                  onMouseLeave={() => setActive(null)}
                >

                  <div
                    className="w-[76px] h-[76px] rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(160deg,#100c22,#080b1a)",
                      border:
                        `2px solid ${
                          active === step.id
                            ? step.color
                            : "rgba(167,139,250,.35)"
                        }`,
                      color: step.color,
                      boxShadow:
                        active === step.id
                          ? `0 0 25px ${step.glow}`
                          : "none",
                      transform:
                        active === step.id
                          ? "scale(1.08)"
                          : "scale(1)",
                    }}
                  >

                    <Glyph
                      name={step.glyph}
                      size={30}
                      strokeWidth={1.6}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className="grid grid-cols-4 gap-8">

            {steps.map((step) => (

              <div
                key={step.id}
                className="text-center"
                onMouseEnter={() => setActive(step.id)}
                onMouseLeave={() => setActive(null)}
              >

                <h3
                  className="text-xl font-bold mb-4 transition-colors"
                  style={{
                    color:
                      active === step.id
                        ? step.color
                        : "#fff",
                  }}
                >
                  {step.title}
                </h3>

                <p className="text-white leading-7">

                  {step.desc}

                </p>

                <div
                  className="mt-5 rounded-2xl border p-4 text-left text-sm transition-all "
                  style={{
                    background:
                      active === step.id
                        ? "rgba(14,17,30,.95)"
                        : "rgba(14,17,30,.6)",
                    border:
                      `1px solid ${
                        active === step.id
                          ? `${step.color}55`
                          : "rgba(255,255,255,.06)"
                      }`,
                  }}
                >

                  <div
                    className="font-semibold mb-2"
                    style={{ color: step.color }}
                  >
                    Tech Layer
                  </div>

                  <div className="text-white">

                    {step.detail}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* ================= MOBILE ================= */}

        <div className="lg:hidden space-y-8">

          {steps.map((step, index) => (
            <div
  key={step.id}
  className="relative pl-14"
>
  {/* Vertical connector */}
  {index !== steps.length - 1 && (
    <div
      className="absolute left-[19px] top-12 bottom-[-28px] w-px"
      style={{
        background:
          "linear-gradient(to bottom,rgba(167,139,250,.6),rgba(45,212,191,.4))",
      }}
    />
  )}

  {/* Icon */}
  <div
    className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center"
    style={{
      background:
        "linear-gradient(160deg,#100c22,#080b1a)",
      border: `2px solid ${step.color}`,
      color: step.color,
      boxShadow: `0 0 20px ${step.glow}`,
    }}
  >
    <Glyph
      name={step.glyph}
      size={18}
      strokeWidth={1.6}
    />
  </div>

  {/* Card */}
  <div
    className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5"
  >
    <div className="flex items-center justify-between mb-4">

      <h3
        className="text-lg font-bold"
        style={{
          color: step.color,
        }}
      >
        {step.title}
      </h3>

      <div className="flex items-center gap-2">

        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            background: step.color,
          }}
        />

        <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
          Live
        </span>

      </div>

    </div>

    <p className="text-white  leading-7">

      {step.desc}

    </p>

    <div
      className="mt-5 rounded-xl border p-4"
      style={{
        background: "rgba(16,12,34,.75)",
        border: `1px solid ${step.color}33`,
      }}
    >

      <div
        className="text-xs uppercase tracking-[0.18em] font-semibold mb-3"
        style={{
          color: step.color,
        }}
      >
        Tech Layer
      </div>

      <div className="text-sm text-white leading-6">

        {step.detail}

      </div>

    </div>

  </div>

    </div>
  ))}
</div>

      <style jsx>{`
        .flow-pulse {
          position: absolute;
          top: -3px;
          left: 0;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #fff;
          box-shadow: 0 0 12px 3px rgba(199,210,254,.9);
          animation: flowPulse 4.5s cubic-bezier(.45,0,.55,1) infinite;
        }

        @keyframes flowPulse {
          0% {
            left: 0%;
            opacity: 0;
            transform: scale(.6);
          }

          8% {
            opacity: 1;
            transform: scale(1);
          }

          92% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            left: 100%;
            opacity: 0;
            transform: scale(.6);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .flow-pulse {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
