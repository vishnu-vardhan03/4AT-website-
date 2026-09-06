"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { CardsParallax, type ScrollCardItem } from "@/components/home/ScrollCards";

const scenarios: ScrollCardItem[] = [
  {
    title: "Closing the books takes longer",
    pain: "Manual processes, fragmented systems, and unclear ownership create inefficiencies that compound over time, leading to missed deadlines, delayed filings, and growing compliance risk.",
    action: "Transactions reconcile in seconds, systems stay connected end-to-end, experts review exceptions, and reports are ready before you ask",
    outcome: "Close in 4-5 days. Audit-ready by default. CFO gets the results and reports in real time, with no waiting on the team to compile it, with no end of the month surprises",
    color: "#38bdf8",
  },
  {
    title: "Growth is outpacing infrastructure, and leadership needs a way to expand without losing control or quality.",
    pain: "Month-end close drags on. Quality depends on who's working. Key hires leave, taking process knowledge with them.",
    action: "AI handles reconciliations and standard entries at speed, with built-in controls. Humans apply judgment where needed.",
    outcome: "Faster, consistent close: not dependent on any one person.",
    color: "#2dd4bf",
  },
  {
    title: "They know opportunities exist, whether in automation, analytics, or market positioning: but don’t have the bandwidth or expertise to act decisively.",
    pain: "CFOs see cash position and performance days late, through static reports. Problems surface after they've already hurt the business.",
    action: "AI delivers a live view of cash, receivables, and key metrics. Finance leaders interpret and act on trends.",
    outcome: "Real-time visibility, not rear-view reporting",
    color: "#38bdf8",
  },
  {
    title: "Regulatory requirements are increasing, and they need confidence that processes are airtight and audit-ready.",
    pain: "Manual entries and filings are error-prone. Late-caught mistakes mean audit risk and costly rework.",
    action: "AI validates entries and filings in real time, flagging anomalies. Teams review only flagged items.",
    outcome: "Fewer errors, lower audit risk, without checking everything by hand.",
    color: "#a78bfa",
  },
];

export function UseCases() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the pinned storytelling container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="use-cases" className="relative text-white">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute left-0 top-1/3 size-96 rounded-full bg-[#2dd4bf]/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/2 size-96 rounded-full bg-[#a78bfa]/10 blur-[120px]" />

      {/* Pinned scroll container wrapper (height defines total scroll track length) */}
      <div ref={containerRef} className="relative h-[250vh] sm:h-[280vh] md:h-[300vh]">
        {/* Sticky viewport frame that pins during section scroll */}
        <div className="sticky top-0 flex h-screen flex-col justify-start overflow-hidden pt-6 pb-6 sm:pt-8 sm:pb-8 md:pt-10 md:pb-10">
          {/* Header remains visible throughout the pinned storytelling experience */}
          <div className="mx-auto w-full max-w-[1200px] shrink-0 px-6 md:px-12">
            <span className="section-badge">
              Where Hybrid creates the most value
            </span>
            <h2 className="mt-2.5 site-heading text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] leading-tight">
              Four moments where finance &amp; accounting processes{" "}
              <span className="text-brand-gradient-flow">switch to 4AT Hybrid Services.</span>
            </h2>
            <p className="site-subheading mt-2 max-w-3xl text-xs sm:text-sm md:text-base text-white/75">
              Our clients aren’t simply shopping for “an accounting firm” or “an AI tool.” They
              come to us because they’re navigating specific challenges where traditional
              solutions fall short. The four most common situations we hear are
            </p>
          </div>

          {/* Cards storytelling viewport driven directly by scrollYProgress with clean top gap below header */}
          <div className="relative mx-auto w-full max-w-[1200px] flex-1 px-4 pt-10 sm:px-6 md:px-12 md:pt-14">
            <CardsParallax items={scenarios} progress={scrollYProgress} />
          </div>
        </div>
      </div>

      {/* Section Footer: follows the pinned track in normal document flow */}
      <div className="relative z-30 mx-auto max-w-[1200px] px-6 pt-10 pb-14 md:px-12 md:pb-24">
        <div className="rounded-2xl border border-white/15 bg-white/[0.035] px-7 py-8 md:py-9 text-center">
          <span className="section-badge">
            What every engagement delivers
          </span>
          <p className="mt-3 text-lg font-semibold text-white sm:text-xl md:text-2xl">
            Regardless of the scenario that brings you to us, every 4AT engagement is designed to deliver the full Six Sigma experience, now enhanced through our new hybrid services engagement model
          </p>
        </div>
        <div className="mt-8 text-center">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#7dd3fc] transition hover:text-white"
          >
            Here&apos;s exactly how an engagement works <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
