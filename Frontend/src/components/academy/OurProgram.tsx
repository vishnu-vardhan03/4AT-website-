"use client";

import React from "react";
import { SectionPill } from "./SectionPill";
import { HowItWorks } from "./HowItWorks";
import { BookOpen, Target, ShieldCheck, Zap, Layers, Award } from "lucide-react";

export function OurProgram({ sectionId = "program" }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="w-full bg-transparent text-white py-24 overflow-x-hidden relative flex flex-col items-center"
    >
      {/* Decorative Grid Mesh & Ambient Particle Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
      <div className="absolute inset-0 pipeline-grid opacity-40 pointer-events-none" />

      <div className="site-shell relative z-10 w-full">

        {/* ── 1. PARENT SECTION HEADER ────────────────────────────────────── */}
        <div className="flex flex-col items-start text-left max-w-4xl mb-14">
          <SectionPill className="mb-4">
            OUR PROGRAM
          </SectionPill>

          <h2 className="section-title text-left text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-sans">
              The FinTech Engineering Program
            </span>
          </h2>
        </div>

        {/* ── 2. TOP EDITORIAL 2-COLUMN SPLIT (WHAT & WHY) ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-[72px] relative items-stretch">
          {/* Subtle Vertical Gradient Divider between What and Why (Desktop) */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none" />

          {/* LEFT COLUMN: WHAT IS THE PROGRAM? */}
          <div className="flex flex-col justify-between w-full space-y-6 md:pr-4">
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,201,129,0.2)]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-emerald-400">
                  WHAT IS THE PROGRAM?
                </h3>
              </div>


              <h4 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight mb-4">
                About the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">program</span>
              </h4>

              <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed">
                The FinTech Engineering Program (FEP) is a practice-led program that takes commerce graduates to the capability of a 2–3-year professional — through to certification, internship and placement. Advanced tracks are available for experienced professionals.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: WHY THE PROGRAM EXISTS */}
          <div className="flex flex-col justify-between w-full space-y-6 md:pl-4">
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-cyan-400">
                  WHY THE PROGRAM EXISTS
                </h3>
              </div>


              <h4 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight mb-4">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">careers</span>, not just <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">certificates</span>.
              </h4>

              <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed mb-3">
                A degree gives you theory. Employers want the job done.
              </p>

              <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed">
                Recording transactions, reconciling accounts, closing the books, preparing financial statements, auditing the numbers, and engaging clients — that&apos;s what finance and audit teams hire for. 4AT Academy bridges that gap with practice-led training, built and run by a working finance, accounting and audit firm.
              </p>
            </div>
          </div>
        </div>

        {/* ── 3. SUBTLE HORIZONTAL DIVIDER ABOVE HOW IT WORKS ──────────────── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mt-14 mb-12" />

        {/* ── 4. BOTTOM SUBSECTION: HOW IT WORKS ───────────────────────────── */}
        <div className="w-full">
          <div className="flex flex-col items-start mb-8">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-purple-400">
                HOW IT WORKS
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-3">
              Every learner is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">evaluated</span> before becoming job-ready.
            </h3>
            <p className="text-white/60 font-sans text-sm sm:text-base">
              From pre-assessment to placement — a guided path.
            </p>
          </div>

          {/* Autoplay Process Timeline Embedded Cleanly */}
          <HowItWorks hideHeader={true} />

          {/* Qualifier */}
          <div className="mt-3 flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
            <div className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24] mt-1" />
            <p className="text-[13px] sm:text-sm text-white/50 font-sans leading-relaxed">
              Only learners who successfully complete every evaluation stage proceed to internship and placement support.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
