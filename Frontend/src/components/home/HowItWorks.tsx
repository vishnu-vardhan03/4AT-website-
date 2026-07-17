"use client";

import { useRef, useState, useEffect } from "react";

const steps = [
  {
    number: "01",
    timing: "Day 0",
    title: "Subscribe",
    body: "Pick your plan on the website. Pay your first month. Your team starts immediately.",
    detail: "No legal review. No 6-week sales cycle.",
    color: "#38bdf8",
  },
  {
    number: "02",
    timing: "Days 1–7",
    title: "Onboard",
    body: "Connector ingests your ERP, ledgers, and policies. Your dedicated pod, combining AI agents with senior practitioners, is live within 7 days.",
    detail: "You don't change tools. We meet you inside the systems you already use.",
    color: "#2dd4bf",
  },
  {
    number: "03",
    timing: "Day 8 onward",
    title: "We run it",
    body: "Iris reconciles. Guardian monitors controls. Atlas builds your reports. Senior practitioners review everything before it reaches you.",
    detail: "You see it all in one dashboard. One bill. One team.",
    color: "#a78bfa",
  },
  {
    number: "04",
    timing: "Month 3 and beyond",
    title: "You scale",
    body: "Add controls. Add tax. Add audit readiness. Add a vCFO. Every new service line plugs into the same subscription: no new vendor, no new contract, no new onboarding.",
    detail: "This is where most clients start with one service and end the year running their entire finance function on 4AT.",
    color: "#38bdf8",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top; // positive once the section enters viewport
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      // Map scroll progress → number of cards visible (0 to 4)
      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1);
      const count = Math.ceil(progress * steps.length);
      setVisibleCount(count);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount in case page is already scrolled
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /*
     * Outer div is (steps.length + 1) × 100vh tall so the user scrolls through
     * one full viewport per card before the section releases them.
     */
    <div ref={containerRef} style={{ height: `${(steps.length + 1) * 100}vh` }}>
      <section
        id="how-it-works"
        className="sticky top-0 h-screen overflow-hidden bg-transparent text-white"
      >
        {/* Grid background texture */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col site-section">

          {/* ── Heading ── */}
          <div className="max-w-4xl shrink-0">
            <span className="section-badge">
              How an engagement works
            </span>
            <h2 className="mt-3 site-heading">
              <span className="text-brand-gradient-flow">Four steps.</span>
            </h2>
            <p className="site-subheading mt-3 max-w-3xl text-white/70">
            The teams who switch to 4AT Hybrid all share one thing: they&apos;re done
              choosing between expensive firms and risky AI.
            </p>
          </div>

          {/* ── Cards grid — each card fades + slides in as user scrolls ── */}
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, i) => {
              const isVisible = i < visibleCount;
              return (
                <div
                  key={step.number}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(40px) scale(0.96)",
                    transition: `opacity 0.55s ease, transform 0.55s ease`,
                    transitionDelay: isVisible ? `${i * 60}ms` : "0ms",
                  }}
                >
                  <article className="relative min-h-[390px] overflow-hidden rounded-2xl border border-white/20 bg-[#111114] p-6 shadow-[0_24px_70px_rgba(0,0,0,.35)]">
                    {/* Glow blob */}
                    <div
                      className="absolute -right-12 -top-12 size-36 rounded-full opacity-30 blur-2xl"
                      style={{ backgroundColor: step.color }}
                    />

                    <div className="relative flex min-h-[350px] flex-col">
                      {/* Number + timing */}
                      <div className="flex items-start justify-between">
                        <b className="text-lg" style={{ color: step.color }}>
                          {step.number}
                        </b>
                        <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white/65">
                          {step.timing}
                        </span>
                      </div>

                      {/* Step label */}
                      <span
                        className="mt-4 block text-[10px] font-bold uppercase tracking-[.2em]"
                        style={{ color: step.color }}
                      >
                        Step {step.number}
                      </span>

                      {/* Title */}
                      <h3 className="mt-2 text-xl font-black text-white">{step.title}</h3>

                      {/* Body */}
                      <p className="mt-4 text-sm leading-relaxed text-white/75">{step.body}</p>

                      {/* Detail */}
                      <p className="mt-auto border-t border-white/10 pt-4 text-sm font-medium leading-relaxed text-white">
                        {step.detail}
                      </p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* ── Progress dots ── */}
          <div className="mt-4 flex shrink-0 items-center justify-center gap-2 pb-2">
            {steps.map((step, i) => (
              <div
                key={i}
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: i < visibleCount ? 24 : 8,
                  backgroundColor:
                    i < visibleCount ? step.color : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {/* ── Scroll hint (shown before any card appears) ── */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-500"
            style={{ opacity: visibleCount === 0 ? 1 : 0 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">
              Scroll to explore
            </span>
            <svg
              className="animate-bounce text-white/30"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
