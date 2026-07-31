"use client";

import React from "react";
import { SectionPill } from "./SectionPill";
import { GraduationCap, BadgeCheck, Briefcase } from "lucide-react";

const aboutCards = [
  {
    id: "01",
    eyebrow: "FOUNDATION",
    title: "Train",
    body: "Hands-on training on live ERP systems, core accounting standards, AI automation tools, and real-world client workflows.",
    icon: GraduationCap,
    features: ["LIVE ERP SYSTEMS", "REAL WORKFLOWS", "AI TOOLS"],
    borderColor: "rgba(16, 201, 129, 0.35)",
    glowColor: "rgba(16, 201, 129, 0.14)",
    innerShadow: "inset 0 0 20px rgba(16, 201, 129, 0.18), inset 0 0 60px rgba(16, 201, 129, 0.07), 0 8px 32px rgba(0,0,0,0.7)",
    badgeColors: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    numColor: "text-emerald-400/[0.06] group-hover:text-emerald-400/[0.12]",
    iconBox: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[inset_0_1px_rgba(255,255,255,0.15),0_0_15px_rgba(16,201,129,0.3)]",
    dotClass: "bg-emerald-400 shadow-[0_0_6px_#10B981]",
  },
  {
    id: "02",
    eyebrow: "ASSESSMENT",
    title: "Hire",
    body: "Rigorous role-based capability evaluation, interview readiness, and direct employer matching for placement.",
    icon: BadgeCheck,
    features: ["INTERVIEW READY", "ROLE READY", "PORTFOLIO READY"],
    borderColor: "rgba(6, 182, 212, 0.35)",
    glowColor: "rgba(6, 182, 212, 0.14)",
    innerShadow: "inset 0 0 20px rgba(6, 182, 212, 0.18), inset 0 0 60px rgba(6, 182, 212, 0.07), 0 8px 32px rgba(0,0,0,0.7)",
    badgeColors: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    numColor: "text-cyan-400/[0.06] group-hover:text-cyan-400/[0.12]",
    iconBox: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[inset_0_1px_rgba(255,255,255,0.15),0_0_15px_rgba(6,182,212,0.3)]",
    dotClass: "bg-cyan-400 shadow-[0_0_6px_#06B6D4]",
  },
  {
    id: "03",
    eyebrow: "CAREER",
    title: "Deploy",
    body: "Seamless integration into active finance & accounting teams with 2–3 years of capability & leader mentorship.",
    icon: Briefcase,
    features: ["CAREER READY", "GLOBAL STANDARDS", "LEADER MENTORED"],
    borderColor: "rgba(168, 85, 247, 0.35)",
    glowColor: "rgba(168, 85, 247, 0.14)",
    innerShadow: "inset 0 0 20px rgba(168, 85, 247, 0.18), inset 0 0 60px rgba(168, 85, 247, 0.07), 0 8px 32px rgba(0,0,0,0.7)",
    badgeColors: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    numColor: "text-purple-400/[0.06] group-hover:text-purple-400/[0.12]",
    iconBox: "text-purple-400 border-purple-500/30 bg-purple-500/10 shadow-[inset_0_1px_rgba(255,255,255,0.15),0_0_15px_rgba(168,85,247,0.3)]",
    dotClass: "bg-purple-400 shadow-[0_0_6px_#A855F7]",
  },
];

export function About() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="about"
      className="w-full bg-transparent text-white section-padding overflow-x-hidden relative flex items-center"
    >
      <div className="site-shell relative z-10 w-full">
        {/* Header Block */}
        <div className="max-w-[1050px] w-full flex flex-col gap-4 text-left">
          <div>
            <SectionPill>
              ABOUT ACADEMY
            </SectionPill>
          </div>
          <h2 className="section-title w-full">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-sans">A 4AT Initiative</span>, trained by the firm that runs <br className="hidden md:inline" />
            finance & accounting for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">global clients</span>.
          </h2>
          <p className="section-desc max-w-[850px] mt-2">
            We don&apos;t just teach accounting; we build finance talent and put it to work. <br className="hidden sm:inline" />
            From training to placement through our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-sans font-bold">THD model</span>.
          </p>
        </div>

        {/* 3 Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mt-12 md:mt-16 w-full">
          {aboutCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                onMouseMove={handleMouseMove}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 sm:p-8 h-full transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                style={{
                  background: "#090B0F",
                  border: `1px solid ${card.borderColor}`,
                  boxShadow: card.innerShadow,
                }}
              >
                {/* Interactive Radial Mouse Hover Glow */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${card.glowColor}, transparent 80%)`,
                  }}
                />

                {/* Corner Ambient Radial Glow */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-60 transition duration-500 group-hover:opacity-90 z-0"
                  style={{
                    background: `radial-gradient(300px circle at 100% 0%, ${card.glowColor}, transparent 70%)`,
                  }}
                />

                {/* Watermark Card Number Aligned INSIDE TOP RIGHT CORNER */}
                <span
                  className={`absolute top-6 right-7 sm:top-7 sm:right-8 text-[65px] sm:text-[75px] md:text-[80px] font-black font-display tracking-tight leading-none transition-colors duration-500 pointer-events-none select-none z-0 ${card.numColor}`}
                >
                  {card.id}
                </span>

                {/* Card Header Zone: Icon & Eyebrow Pill */}
                <div className="relative z-10 flex items-center justify-between w-full mb-8 pr-14">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${card.iconBox}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-mono tracking-[0.15em] uppercase font-semibold transition-all duration-300 ${card.badgeColors}`}
                    >
                      {card.eyebrow}
                    </span>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="relative z-10 flex flex-col justify-start flex-grow">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-[1.85rem] font-bold leading-[1.15] text-white/95 font-display group-hover:text-white transition-colors duration-300">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-[13.5px] sm:text-[14.5px] font-normal leading-[1.65] text-white/70 font-sans tracking-wide group-hover:text-white/85 transition-colors duration-300">
                    {card.body}
                  </p>
                </div>

                {/* Divider Line before Feature Bullets */}
                <div className="w-full h-[1px] bg-white/[0.06] mt-6 mb-4 relative z-10" />

                {/* Lower Section: Single-Row Bulleted Text Items */}
                <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 w-full relative z-10">
                  {card.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${card.dotClass}`} />
                      <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.15em] uppercase text-white/70 group-hover:text-white/90 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
