"use client";

import { useRef } from "react";
import Image from "next/image";
import AmbientBackground from "@/components/product/AmbientBackground";

const demoVideoSrc: string | null = null;

export default function GlimpseSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    const v = videoRef.current;
    if (v) { v.style.opacity = "1"; v.play(); }
  };

  return (
    <section
      id="glimpse"
      className="section"
      style={{ background: "#04060f" }}
    >
      <AmbientBackground variant="teal" intensity={0.6} />
      <div className="section-inner text-center">
        <div className="eyebrow mb-6 justify-center">
          <span className="dot" />Product Demo
        </div>
        <h2
          className="font-bold tracking-tight mb-4"
          style={{ fontSize: "clamp(5rem,4vw,3.2rem)" }}
        >
          See 4AT <span className="grad-v">in Action</span>
        </h2>
        <p className="text-white text-lg mx-auto mb-14" style={{ maxWidth: 600, fontSize: "1.4rem" }}>
          Watch reconciliation, fraud detection, and reporting all running live connected to your actual ERP stack.
        </p>

        {/* Video frame */}
        <div
          className="relative mx-auto rounded-2xl overflow-hidden"
          style={{
            maxWidth: 920,
            border: "1px solid rgba(255,255,255,.1)",
            boxShadow: "0 0 0 1px rgba(167,139,250,.1), 0 40px 100px rgba(0,0,0,.6)",
          }}
        >
          {/* Mac-style window bar */}
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{ background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(255,255,255,.07)" }}
          >
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-white">4AT Finance Copilot — Live Demo</span>
          </div>

          {/* Dashboard screenshot placeholder */}
          <div className="relative" style={{ aspectRatio: "16/9" }}>
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
              alt="Financial analytics dashboard with real-time reconciliation data, charts, and ledger audit trails"
              fill
              className="object-cover opacity-70"
              sizes="(max-width: 768px) 100vw, 920px"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#04060f]/50" />

            {/* Play button */}
            <button
              onClick={handlePlay}
              id="play-btn"
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Play demo video"
            >
              <span
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg,#a78bfa,#c084fc)",
                  boxShadow: "0 0 0 16px rgba(167,139,250,.12), 0 0 0 32px rgba(167,139,250,.05)",
                  animation: "ring 3s ease-in-out infinite",
                }}
              >
                ▶
              </span>
            </button>
            {demoVideoSrc && (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity"
                src={demoVideoSrc}
                playsInline
              />
            )}
          </div>
        </div>

        {/* Stats below video */}
        <div className="flex justify-center gap-16 mt-14 flex-wrap">
          {[
            { val: "85%",   label: "Reduction in Manual Tasks" },
            { val: "99.9%", label: "Transaction Accuracy" },
            { val: "50+",   label: "Enterprise Clients" },
          ].map((s) => (
            <div key={s.val} className="text-center">
              <div className="text-4xl font-bold grad-v">{s.val}</div>
              <div className="text-sm text-white mt-1.5 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes ring {
          0%,100% { box-shadow: 0 0 0 16px rgba(167,139,250,.12), 0 0 0 32px rgba(167,139,250,.05); }
          50%      { box-shadow: 0 0 0 22px rgba(167,139,250,.18), 0 0 0 44px rgba(167,139,250,.08); }
        }
      `}</style>
    </section>
  );
}
