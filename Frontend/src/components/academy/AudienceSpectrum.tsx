"use client";

import { useRef, useLayoutEffect } from "react";
import { BarChart3, Monitor, GraduationCap, Building2, Users, Target, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionPill } from "./SectionPill";

export function AudienceSpectrum({ sectionId = "audience-spectrum" }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".audience-header-animate",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Columns reveal
      gsap.fromTo(
        ".audience-column-animate",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="w-full section-padding relative overflow-hidden bg-transparent text-white border-t border-white/[0.03]"
    >
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="site-shell relative z-10">
        {/* Header Section */}
        <div className="diff-heading flex flex-col items-start mb-16 max-w-4xl audience-header-animate">
          <SectionPill className="mb-6">
            WHO IS IT FOR
          </SectionPill>

          <h2 className="section-title">
            Built for two different <span className="career-journeys-gradient font-sans">career journeys</span> <br /> without compromising either.
          </h2>

          <p className="section-desc">
            Whether you&apos;re starting your finance career or building on existing experience, each pathway is designed around your current stage while leading to the same placement-ready outcome.
          </p>
        </div>

        {/* Editorial Split Layout */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 w-full items-stretch"
        >
          {/* Central Vertical Divider (Desktop) */}
          <div className="hidden md:flex flex-col items-center absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-20 pointer-events-none">
            <div className="w-px h-full bg-gradient-to-b from-emerald-500/20 via-white/15 to-purple-500/20" />
            <div className="absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#070913] border border-white/15 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.9),0_0_10px_rgba(255,255,255,0.05)] text-[12px] font-mono text-white/50 lowercase select-none">
              or
            </div>
          </div>

          {/* ── LEFT COLUMN: Freshers Track ──────────────────────────────── */}
          <div className="audience-column-animate relative flex flex-col justify-between py-2">
            {/* Top Row: Level Badge + Translucent Number */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold font-mono tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/30 text-[#14F195] shadow-[0_0_12px_rgba(20,241,149,0.15)]">
                LEVEL 1
              </span>
              <span className="text-[64px] sm:text-[80px] font-extrabold font-mono leading-none select-none text-emerald-500/20 tracking-tight shrink-0">
                01
              </span>
            </div>

            {/* Title & Description */}
            <div className="mb-8">
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                Freshers <span className="text-[#14F195]">Track</span>
              </h3>
              <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed max-w-lg font-sans">
                Build job-ready skills and your first credible finance portfolio.
              </p>
            </div>

            {/* 3 Feature Points with Dashed Vertical Connecting Line */}
            <div className="relative space-y-7 mb-10 pl-1">
              {/* Vertical Dashed Line */}
              <div className="absolute left-[21px] top-[24px] bottom-[24px] w-px border-l border-dashed border-emerald-500/30 pointer-events-none" />

              {/* Feature 1 */}
              <div className="relative z-10 flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#14F195] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(20,241,149,0.2)] transition-transform duration-300 group-hover:scale-110">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <p className="text-white/80 text-[14px] sm:text-[15px] font-medium font-sans leading-snug">
                  Structured ERP accounting and audit tracks
                </p>
              </div>

              {/* Feature 2 */}
              <div className="relative z-10 flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#14F195] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(20,241,149,0.2)] transition-transform duration-300 group-hover:scale-110">
                  <Monitor className="w-5 h-5" />
                </div>
                <p className="text-white/80 text-[14px] sm:text-[15px] font-medium font-sans leading-snug">
                  Live case and resume calibration from day one
                </p>
              </div>

              {/* Feature 3 */}
              <div className="relative z-10 flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#14F195] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(20,241,149,0.2)] transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <p className="text-white/80 text-[14px] sm:text-[15px] font-medium font-sans leading-snug">
                  Tool-first learning with guided mentorship
                </p>
              </div>
            </div>

            {/* Horizontal Thin Separator */}
            <div className="w-full h-px bg-white/10 mb-6" />

            {/* Bottom "Ideal For" Row */}
            <div className="flex items-center gap-4 pt-1">
              <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#14F195] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(20,241,149,0.15)]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-[#14F195] uppercase block mb-0.5">
                  IDEAL FOR
                </span>
                <p className="text-white/60 text-[13px] sm:text-[14px] font-sans">
                  Students and freshers exploring the finance career.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Horizontal Divider */}
          <div className="md:hidden relative w-full my-6 flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-emerald-500/20 via-white/15 to-purple-500/20" />
            <div className="absolute w-8 h-8 rounded-full bg-[#070913] border border-white/15 flex items-center justify-center text-[11px] font-mono text-white/50 lowercase">
              or
            </div>
          </div>

          {/* ── RIGHT COLUMN: Professionals Track ──────────────────────────── */}
          <div className="audience-column-animate relative flex flex-col justify-between py-2">
            {/* Top Row: Level Badge + Translucent Number */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold font-mono tracking-widest uppercase bg-purple-500/10 border border-purple-500/30 text-[#A86DFF] shadow-[0_0_12px_rgba(168,109,255,0.15)]">
                LEVEL 2+
              </span>
              <span className="text-[64px] sm:text-[80px] font-extrabold font-mono leading-none select-none text-purple-500/20 tracking-tight shrink-0">
                02
              </span>
            </div>

            {/* Title & Description */}
            <div className="mb-8">
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                Professionals <span className="text-[#A86DFF]">Track</span>
              </h3>
              <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed max-w-lg font-sans">
                Move from experience to specialization with deeper compliance exposure.
              </p>
            </div>

            {/* 3 Feature Points with Dashed Vertical Connecting Line */}
            <div className="relative space-y-7 mb-10 pl-1">
              {/* Vertical Dashed Line */}
              <div className="absolute left-[21px] top-[24px] bottom-[24px] w-px border-l border-dashed border-purple-500/30 pointer-events-none" />

              {/* Feature 1 */}
              <div className="relative z-10 flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-purple-500/10 border border-purple-500/30 text-[#A86DFF] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,109,255,0.2)] transition-transform duration-300 group-hover:scale-110">
                  <Building2 className="w-5 h-5" />
                </div>
                <p className="text-white/80 text-[14px] sm:text-[15px] font-medium font-sans leading-snug">
                  Advanced ERP, ESG, IA, and IFRS pathways
                </p>
              </div>

              {/* Feature 2 */}
              <div className="relative z-10 flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-purple-500/10 border border-purple-500/30 text-[#A86DFF] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,109,255,0.2)] transition-transform duration-300 group-hover:scale-110">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-white/80 text-[14px] sm:text-[15px] font-medium font-sans leading-snug">
                  Promotion-oriented project modules
                </p>
              </div>

              {/* Feature 3 */}
              <div className="relative z-10 flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-purple-500/10 border border-purple-500/30 text-[#A86DFF] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,109,255,0.2)] transition-transform duration-300 group-hover:scale-110">
                  <Target className="w-5 h-5" />
                </div>
                <p className="text-white/80 text-[14px] sm:text-[15px] font-medium font-sans leading-snug">
                  Placement support for global finance teams
                </p>
              </div>
            </div>

            {/* Horizontal Thin Separator */}
            <div className="w-full h-px bg-white/10 mb-6" />

            {/* Bottom "Ideal For" Row */}
            <div className="flex items-center gap-4 pt-1">
              <div className="w-11 h-11 rounded-full bg-purple-500/10 border border-purple-500/30 text-[#A86DFF] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,109,255,0.15)]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-[#A86DFF] uppercase block mb-0.5">
                  IDEAL FOR
                </span>
                <p className="text-white/60 text-[13px] sm:text-[14px] font-sans">
                  Professionals aiming at leadership or acceleration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
