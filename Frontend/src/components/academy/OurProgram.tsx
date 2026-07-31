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

              {/* Subtle Glowing Accent Line */}
              <div className="h-[2px] w-12 bg-gradient-to-r from-emerald-400 to-transparent mb-6" />

              <h4 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight mb-4">
                An intensive, role-based <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">finance engineering</span> track.
              </h4>

              <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed">
                The FinTech Engineering Program (FEP) bridges the gap between academia and industry — equipping commerce graduates with the practical skills of a finance professional with 2–3 years&apos; experience, and a path to certification, internship and placement.
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

              {/* Subtle Glowing Accent Line */}
              <div className="h-[2px] w-12 bg-gradient-to-r from-cyan-400 to-transparent mb-6" />

              <h4 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight mb-4">
                A degree gives you theory. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Employers want the job done.</span>
              </h4>

              <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed">
                Closing the books, reconciling accounts, working live ERP systems, engaging clients — that&apos;s what finance teams hire for. 4AT Academy bridges that gap: practice-led training, built and run by a working finance &amp; accounting consulting firm, that takes a commerce graduate to the capability of a professional with 2–3 years&apos; experience.
              </p>
            </div>
          </div>
        </div>

        {/* ── 3. SUBTLE HORIZONTAL DIVIDER ABOVE HOW IT WORKS ──────────────── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mt-14 mb-12" />

        {/* ── 4. BOTTOM SUBSECTION: HOW IT WORKS ───────────────────────────── */}
        <div className="w-full">
          <div className="flex flex-col items-start mb-8">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-purple-400">
                HOW IT WORKS
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Every learner is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">evaluated</span> before becoming job-ready.
            </h3>
          </div>

          {/* Autoplay Process Timeline Embedded Cleanly */}
          <HowItWorks hideHeader={true} />
        </div>

      </div>
    </section>
  );
}
