"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/academy/Button";

export function HeroContent() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isRevealed = true;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const headlineWords = [
    { text: "Built", delay: 0.5, highlight: false },
    { text: "for", delay: 0.522, highlight: false },
    { text: "careers,", delay: 0.624, highlight: "careers" },
    { text: "not", delay: 0.646, highlight: false },
    { text: "just", delay: 0.668, highlight: false },
    { text: "certificates.", delay: 0.792, highlight: "certificates" }
  ];

  const trustChips = [
    "Practical, hands-on training",
    "AI + industry tools",
    "Certification",
    "Internship",
    "Placement — 4AT & partners",
  ];

  return (
    <div className="flex flex-col items-start text-left max-w-full">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .hero-gradient-word {
          background: linear-gradient(90deg, #6FAEFF, #C86DFF, #14F195, #6FAEFF);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shimmer 4s linear infinite;
        }
        .hero-gradient-word-2 {
          background: linear-gradient(90deg, #47D8FF, #C86DFF, #14F195, #47D8FF);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shimmer 4s linear infinite;
        }
      `}} />

      {/* Eyebrow Pill */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12, scale: prefersReducedMotion ? 1 : 0.96 }}
        animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.5,
          delay: prefersReducedMotion ? 0 : 0.3,
          ease: [0.34, 1.56, 0.64, 1]
        }}
        className="relative inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 backdrop-blur-xl border border-emerald-400/35 shadow-[0_0_24px_rgba(16,185,129,0.28),inset_0_1px_rgba(255,255,255,0.25)] mb-6 select-none"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981] shadow-[0_0_8px_#10B981]"></span>
        </span>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-emerald-300 font-sans drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
          4AT Academy
        </span>
      </motion.div>

      {/* Main Heading */}
      <h1 className="font-bricolage font-extrabold text-[2.5rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4rem] xl:text-[4.25rem] tracking-tight leading-[1.08] text-white max-w-[850px] w-full flex flex-wrap">
        {headlineWords.map((word, i) => {
          if (word.highlight === "careers") {
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : "0.4em", filter: prefersReducedMotion ? "none" : "blur(6px)" }}
                animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                  delay: prefersReducedMotion ? 0 : word.delay,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block mr-[0.25em] hero-gradient-word font-sans"
              >
                {word.text}
              </motion.span>
            );
          }
          if (word.highlight === "certificates") {
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : "0.4em", filter: prefersReducedMotion ? "none" : "blur(6px)" }}
                animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.6,
                  delay: prefersReducedMotion ? 0 : word.delay,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block mr-[0.25em] hero-gradient-word-2 font-sans"
              >
                {word.text}
              </motion.span>
            );
          }
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : "0.4em", filter: prefersReducedMotion ? "none" : "blur(6px)" }}
              animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{
                duration: prefersReducedMotion ? 0.3 : 0.6,
                delay: prefersReducedMotion ? 0 : word.delay,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="inline-block mr-[0.25em]"
            >
              {word.text}
            </motion.span>
          );
        })}
      </h1>

      {/* Description Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.6,
          delay: prefersReducedMotion ? 0 : 1.35,
          ease: [0.25, 1, 0.5, 1]
        }}
        className="font-sans font-light text-[#A7A9C4] text-base md:text-[1.125rem] leading-[1.6] max-w-[720px] mt-8"
      >
        A <span className="text-white font-semibold">4AT Initiative</span> — built by a firm that delivers finance, accounting and audit services to global clients. We take commerce graduates from training to placement through our <span className="text-[#47D8FF] font-semibold">Train–Hire–Deploy (THD)</span> model.
      </motion.p>

      {/* Trust Chips */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.5,
          delay: prefersReducedMotion ? 0 : 1.55,
          ease: [0.25, 1, 0.5, 1]
        }}
        className="flex flex-wrap lg:flex-nowrap items-center gap-3 mt-8 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {trustChips.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide text-[#A7A9C4] bg-white/[0.06] border border-white/10 font-sans"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            {chip}
          </span>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-start gap-4 mt-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.94 }}
          animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            delay: prefersReducedMotion ? 0 : 1.7,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <Button href="/academy/register" variant="primary">
            Check your eligibility
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.94 }}
          animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            delay: prefersReducedMotion ? 0 : 1.8,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <Button href="/academy/courses" variant="secondary">
            Explore programs
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
