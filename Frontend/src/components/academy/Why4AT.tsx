"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionPill } from "./SectionPill";
import { Building2, Layers, Cpu, TrendingUp, ShieldCheck } from "lucide-react";

interface ReasonItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ElementType;
  glowColor: string;
  badgeColors: string;
  iconBox: string;
  numColor: string;
  accentBorder: string;
}

const whyItems: ReasonItem[] = [
  {
    id: "01",
    tag: "FIRM FOUNDATION",
    title: "Built by a working F&A & audit firm",
    description:
      "You learn on real client standards from a firm that delivers finance, accounting and audit for global clients, not from a textbook.",
    icon: Building2,
    glowColor: "rgba(16, 201, 129, 0.08)",
    badgeColors: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    iconBox: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-sm",
    numColor: "text-emerald-400/20 group-hover:text-emerald-400/35",
    accentBorder: "group-hover:border-emerald-500/40",
  },
  {
    id: "02",
    tag: "OUTCOME DRIVEN",
    title: "Train · Hire · Deploy",
    description:
      "Our model ends in a role: clear the assessment, intern, and get deployed at 4AT or placed with a partner.",
    icon: Layers,
    glowColor: "rgba(6, 182, 212, 0.08)",
    badgeColors: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    iconBox: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-sm",
    numColor: "text-cyan-400/20 group-hover:text-cyan-400/35",
    accentBorder: "group-hover:border-cyan-500/40",
  },
  {
    id: "03",
    tag: "PROPRIETARY TECH",
    title: "Our own AI platform",
    description:
      "You train on 4AT's AI-powered finance tools alongside industry platforms, learning to work with AI, not around it.",
    icon: Cpu,
    glowColor: "rgba(168, 85, 247, 0.08)",
    badgeColors: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    iconBox: "text-purple-400 border-purple-500/30 bg-purple-500/10 shadow-sm",
    numColor: "text-purple-400/20 group-hover:text-purple-400/35",
    accentBorder: "group-hover:border-purple-500/40",
  },
  {
    id: "04",
    tag: "DIRECT PLACEMENT",
    title: "A real and growing talent pipeline",
    description:
      "4AT has a regular, growing pipeline of client engagements that need finance and audit talent. Our best performers go directly into that pipeline, on real client work from day one.",
    icon: TrendingUp,
    glowColor: "rgba(16, 201, 129, 0.08)",
    badgeColors: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    iconBox: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-sm",
    numColor: "text-emerald-400/20 group-hover:text-emerald-400/35",
    accentBorder: "group-hover:border-emerald-500/40",
  },
  {
    id: "05",
    tag: "QUALITY GATE",
    title: "Every credential is earned",
    description:
      "Not everyone who starts completes as an FEP Certified Professional. Every candidate clears a structured assessment before certification and placement, that quality gate is what makes the credential mean something.",
    icon: ShieldCheck,
    glowColor: "rgba(6, 182, 212, 0.08)",
    badgeColors: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    iconBox: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-sm",
    numColor: "text-cyan-400/20 group-hover:text-cyan-400/35",
    accentBorder: "group-hover:border-cyan-500/40",
  },
];

export function Why4AT({ sectionId = "why-academy" }: { sectionId?: string }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id={sectionId}
      className="w-full bg-transparent text-white section-padding overflow-x-hidden relative flex flex-col items-center"
    >
      {/* Background Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="site-shell relative z-10 w-full">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1050px] w-full flex flex-col gap-4 text-left mb-12 lg:mb-16"
        >
          <div>
            <SectionPill>WHY ACADEMY</SectionPill>
          </div>
          <h2 className="section-title w-full text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-bold leading-[1.2] font-display">
            Why choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-sans">
              4AT Academy
            </span>
          </h2>
          <p className="section-desc">
            Not a coaching class, a working finance, accounting and audit firm that trains professionals to its own client standards.
          </p>
        </motion.div>

        {/* Structured Editorial Layout */}
        <div className="w-full space-y-6 lg:space-y-8">
          {/* Top Row: Items 01, 02, 03 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {whyItems.slice(0, 3).map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseMove={handleMouseMove}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-7 h-full border border-white/[0.08] transition-all duration-300 hover:-translate-y-1.5 cursor-default ${item.accentBorder}`}
                  style={{
                    background: "linear-gradient(to bottom, #101726, #0b0f19 50%, #080b12)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Interactive Radial Hover Glow */}
                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                    style={{
                      background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${item.glowColor}, transparent 80%)`,
                    }}
                  />

                  {/* Corner Ambient Glow */}
                  <div
                    className="pointer-events-none absolute -inset-px opacity-15 transition duration-500 group-hover:opacity-35 z-0"
                    style={{
                      background: `radial-gradient(280px circle at 100% 0%, ${item.glowColor}, transparent 70%)`,
                    }}
                  />

                  {/* Header Row: Icon & Tag */}
                  <div className="relative z-10 flex items-center justify-between w-full mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${item.iconBox}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-mono tracking-[0.15em] uppercase font-semibold transition-all duration-300 ${item.badgeColors}`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="relative z-10 flex flex-col justify-start flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold leading-snug text-white/95 font-display group-hover:text-white transition-colors duration-300 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] sm:text-[14.5px] font-normal leading-[1.65] text-white/70 font-sans tracking-wide group-hover:text-white/85 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Subtle Horizontal Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent my-4" />

          {/* Bottom Row: Items 04 & 05 (Wider Editorial Format) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {whyItems.slice(3, 5).map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseMove={handleMouseMove}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-8 h-full border border-white/[0.08] transition-all duration-300 hover:-translate-y-1.5 cursor-default ${item.accentBorder}`}
                  style={{
                    background: "linear-gradient(to bottom, #101726, #0b0f19 50%, #080b12)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Interactive Radial Hover Glow */}
                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${item.glowColor}, transparent 80%)`,
                    }}
                  />

                  {/* Corner Ambient Glow */}
                  <div
                    className="pointer-events-none absolute -inset-px opacity-15 transition duration-500 group-hover:opacity-35 z-0"
                    style={{
                      background: `radial-gradient(320px circle at 100% 0%, ${item.glowColor}, transparent 70%)`,
                    }}
                  />

                  {/* Header Row: Icon & Tag */}
                  <div className="relative z-10 flex items-center justify-between w-full mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${item.iconBox}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-mono tracking-[0.15em] uppercase font-semibold transition-all duration-300 ${item.badgeColors}`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="relative z-10 flex flex-col justify-start flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold leading-snug text-white/95 font-display group-hover:text-white transition-colors duration-300 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] sm:text-[14.5px] font-normal leading-[1.65] text-white/70 font-sans tracking-wide group-hover:text-white/85 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
