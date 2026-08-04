"use client";

import React from "react";
import { SectionPill } from "./SectionPill";
import { GraduationCap, Users, Briefcase, BadgeCheck, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "150+", label: "Graduates trained", color: "emerald" },
  { value: "X%",   label: "Placement rate",    color: "cyan"    },
  { value: "10+",  label: "Hiring partners",   color: "purple"  },
  { value: "100",  label: "In training now",   color: "emerald" },
] as const;

const outcomes = [
  {
    id: "01",
    icon: GraduationCap,
    eyebrow: "INTERN",
    title: "Intern at 4AT",
    body: "Selected candidates who clear the assessment join a live client account and apply the program on real work.",
    borderColor: "rgba(16, 201, 129, 0.25)",
    glowColor: "rgba(16, 201, 129, 0.06)",
    innerShadow: "inset 0 0 10px rgba(16, 201, 129, 0.05), 0 4px 16px rgba(0,0,0,0.5)",
    badgeColors: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    numColor: "text-emerald-400/[0.06] group-hover:text-emerald-400/[0.12]",
    iconBox: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-sm",
    dotClass: "bg-emerald-400",
  },
  {
    id: "02",
    icon: Briefcase,
    eyebrow: "PERMANENT ROLE",
    title: "Placed at 4AT",
    body: "Top performers are absorbed into permanent finance, accounting and audit roles — our own talent pipeline.",
    borderColor: "rgba(6, 182, 212, 0.25)",
    glowColor: "rgba(6, 182, 212, 0.06)",
    innerShadow: "inset 0 0 10px rgba(6, 182, 212, 0.05), 0 4px 16px rgba(0,0,0,0.5)",
    badgeColors: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    numColor: "text-cyan-400/[0.06] group-hover:text-cyan-400/[0.12]",
    iconBox: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-sm",
    dotClass: "bg-cyan-400",
  },
  {
    id: "03",
    icon: Building2,
    eyebrow: "PARTNER NETWORK",
    title: "Placed with partners",
    body: "Certified graduates are also placed with partner organisations that have open positions.",
    borderColor: "rgba(168, 85, 247, 0.25)",
    glowColor: "rgba(168, 85, 247, 0.06)",
    innerShadow: "inset 0 0 10px rgba(168, 85, 247, 0.05), 0 4px 16px rgba(0,0,0,0.5)",
    badgeColors: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    numColor: "text-purple-400/[0.06] group-hover:text-purple-400/[0.12]",
    iconBox: "text-purple-400 border-purple-500/30 bg-purple-500/10 shadow-sm",
    dotClass: "bg-purple-400",
  },
];

const colorMap = {
  emerald: {
    icon: "w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm",
    value: "text-white",
    dot: "bg-emerald-400",
  },
  cyan: {
    icon: "w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm",
    value: "text-white",
    dot: "bg-cyan-400",
  },
  purple: {
    icon: "w-12 h-12 rounded-full border border-purple-500/30 bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 shadow-sm",
    value: "text-white",
    dot: "bg-purple-400",
  },
};

const statIcons = [GraduationCap, Users, Building2, BadgeCheck];

export function Outcomes() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="outcomes"
      className="w-full bg-transparent text-white section-padding overflow-x-hidden relative"
    >
      <div className="site-shell relative z-10 w-full">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="max-w-[1050px] w-full flex flex-col gap-4 text-left mb-12 md:mb-16">
          <div>
            <SectionPill>PLACEMENTS &amp; OUTCOMES</SectionPill>
          </div>
          <h2 className="section-title w-full">
            Where our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-sans">
              graduates
            </span>{" "}
            end up.
          </h2>
          <p className="section-desc max-w-[700px] mt-1">
            Trained, certified, and placed —{" "}
            <span className="text-white font-semibold">at 4AT</span> or with our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
              hiring partners
            </span>.
          </p>
        </div>

        {/* ── STAT STRIP ─────────────────────────────────────────────────── */}
        <div className="border border-white/[0.06] rounded-[24px] bg-[#0b0e1a]/40 backdrop-blur-xl grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-white/[0.06] mb-12 md:mb-16">
          {stats.map((stat, i) => {
            const Icon = statIcons[i];
            const colors = colorMap[stat.color];
            return (
              <div
                key={stat.label}
                className={`p-6 sm:p-8 flex items-center gap-4 transition-colors hover:bg-white/[0.02] group${i > 0 ? " border-l border-white/[0.06]" : ""}`}
              >
                <div className={colors.icon}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-3xl font-extrabold tracking-tight text-white font-sans block leading-none">
                    {stat.value}
                  </span>
                  <span className="mt-2 text-[10px] font-semibold leading-[1.3] text-white/50 tracking-wider uppercase font-mono block max-w-[20ch]">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 3 OUTCOME CARDS ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {outcomes.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onMouseMove={handleMouseMove}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 sm:p-8 h-full transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                style={{
                  background: "#090B0F",
                  border: `1px solid ${card.borderColor}`,
                  boxShadow: card.innerShadow,
                }}
              >
                {/* Interactive mouse hover glow */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${card.glowColor}, transparent 80%)`,
                  }}
                />
                {/* Corner ambient glow */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-60 transition duration-500 group-hover:opacity-90 z-0"
                  style={{
                    background: `radial-gradient(300px circle at 100% 0%, ${card.glowColor}, transparent 70%)`,
                  }}
                />

                {/* Watermark number */}
                <span
                  className={`absolute top-6 right-7 sm:top-7 sm:right-8 text-[65px] sm:text-[75px] md:text-[80px] font-black font-display tracking-tight leading-none transition-colors duration-500 pointer-events-none select-none z-0 ${card.numColor}`}
                >
                  {card.id}
                </span>

                {/* Icon + eyebrow */}
                <div className="relative z-10 flex items-center gap-3 mb-8 pr-14">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${card.iconBox}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-mono tracking-[0.15em] uppercase font-semibold transition-all duration-300 ${card.badgeColors}`}>
                    {card.eyebrow}
                  </span>
                </div>

                {/* Body */}
                <div className="relative z-10 flex flex-col flex-grow">
                  <h3 className="text-2xl sm:text-[1.6rem] font-bold leading-[1.15] text-white/95 font-display group-hover:text-white transition-colors duration-300 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[13.5px] sm:text-[14.5px] font-normal leading-[1.65] text-white/70 font-sans tracking-wide group-hover:text-white/85 transition-colors duration-300">
                    {card.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CERTIFICATION NOTICE ────────────────────────────────────────── */}
        <div className="mt-10 flex items-start gap-3 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] backdrop-blur-sm">
          <div className="shrink-0 w-8 h-8 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <BadgeCheck className="w-4 h-4" />
          </div>
          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
            Every graduate earns the{" "}
            <span className="text-white font-semibold">4AT Academy — FinTech Engineering</span>{" "}
            certification.
          </p>
        </div>

        {/* ── EMPLOYER CTA BAR ────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full border border-purple-500/30 bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Building2 className="w-4 h-4" />
            </div>
            <p className="text-sm sm:text-base text-white/70 font-sans">
              Hiring finance, accounting or audit talent?{" "}
              <span className="text-white font-semibold">Partner with 4AT Academy</span>
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-purple-200 transition-all duration-200"
          >
            Get in touch
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
