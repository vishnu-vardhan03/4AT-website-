"use client";

import AmbientBackground from "@/components/product/AmbientBackground";

const ctaStats = [
  { val: "99.7%", label: "Match accuracy", color: "#5eead4" },
  { val: "<200ms", label: "Detection", color: "#c4b5fd" },
  { val: "50+", label: "Enterprise clients", color: "#7dd3fc" },
  { val: "24/7", label: "Support", color: "#c084fc" },
];

export default function ProductCTA() {
  return (
    <section
      id="cta-final"
      className="relative overflow-hidden site-section"
      style={{
        background: "linear-gradient(135deg,#0d0820 0%,#060916 100%)",
      }}
    >
      <AmbientBackground variant="violet" intensity={0.9} />
      <div
        className="relative z-10 mx-auto flex items-center gap-12 flex-wrap"
        style={{ maxWidth: 1100 }}
      >
        {/* Left: message + actions */}
        <div style={{ flex: "1 1 420px", minWidth: 300 }}>
          <div className="eyebrow mb-5">
            <span className="dot" />Get Started
          </div>
          <h2 className="site-heading mb-4">
            Bring AI into{" "}
            <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              Finance Workflows
            </span>{" "}
            that matters most
          </h2>
          <p className="site-subheading mb-7" style={{ maxWidth: 540 }}>
            See how 4AT helps teams automate high-friction processes, strengthen control, and turn finance operations into a faster, more scalable system.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-bold text-white transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(167,139,250,.45)]"
              style={{ background: "linear-gradient(90deg,#a78bfa,#c084fc)" }}
            >
              Start Free Trial →
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-bold text-white border border-white/22 bg-white/5 transition-all hover:bg-white/10 hover:border-white/35"
            >
              Book a Demo
            </a>
          </div>
        </div>

        {/* Right: metric tiles */}
        <div
          className="grid grid-cols-2 gap-3"
          style={{ flex: "1 1 300px", minWidth: 280 }}
        >
          {ctaStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl px-5 py-5"
              style={{
                border: "1px solid rgba(255,255,255,.08)",
                background: "linear-gradient(160deg,rgba(16,12,34,.7),rgba(8,11,26,.7))",
              }}
            >
              <div className="text-3xl font-bold leading-none" style={{ color: s.color }}>
                {s.val}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-white/40 mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
