"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/academy/Magnetic";
import Link from "next/link";

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
    { text: "Finance", delay: 0.5, highlight: false },
    { text: "training", delay: 0.522, highlight: false },
    { text: "built", delay: 0.624, highlight: false },
    { text: "for", delay: 0.646, highlight: false },
    { text: "careers,", delay: 0.668, highlight: "careers" },
    { text: "not", delay: 0.69, highlight: false },
    { text: "just", delay: 0.792, highlight: false },
    { text: "certificates.", delay: 0.814, highlight: "certificates" }
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

      {/* Career Badge */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12, scale: prefersReducedMotion ? 1 : 0.96 }}
        animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.5,
          delay: prefersReducedMotion ? 0 : 0.3,
          ease: [0.34, 1.56, 0.64, 1] // ease-out-back
        }}
        className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.2)] mb-6 select-none"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
        </span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#A7A9C4] font-sans">
          Career-Focused Training
        </span>
      </motion.div>

      {/* Main Heading */}
      <h1 className="font-bricolage font-extrabold text-[2.5rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4rem] xl:text-[4.25rem] tracking-tight leading-[1.08] text-white max-w-[850px] w-full flex flex-wrap">
        {headlineWords.map((word, i) => {
          if (word.highlight === "careers") {
            return (
              <span key={i} className="inline-block mr-[0.25em]">
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : "0.4em", filter: prefersReducedMotion ? "none" : "blur(6px)" }}
                  animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                  transition={{
                    duration: prefersReducedMotion ? 0.3 : 0.6,
                    delay: prefersReducedMotion ? 0 : word.delay,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block hero-gradient-word font-sans"
                >
                  careers
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : "0.4em", filter: prefersReducedMotion ? "none" : "blur(6px)" }}
                  animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                  transition={{
                    duration: prefersReducedMotion ? 0.3 : 0.6,
                    delay: word.delay,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block text-white"
                >
                  ,
                </motion.span>
              </span>
            );
          }
          if (word.highlight === "certificates") {
            return (
              <span key={i} className="inline-block mr-[0.25em]">
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : "0.4em", filter: prefersReducedMotion ? "none" : "blur(6px)" }}
                  animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                  transition={{
                    duration: prefersReducedMotion ? 0.3 : 0.6,
                    delay: prefersReducedMotion ? 0 : word.delay,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block hero-gradient-word-2 font-sans"
                >
                  certificates
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : "0.4em", filter: prefersReducedMotion ? "none" : "blur(6px)" }}
                  animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                  transition={{
                    duration: prefersReducedMotion ? 0.3 : 0.6,
                    delay: word.delay,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block text-white"
                >
                  .
                </motion.span>
              </span>
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
        className="font-sans font-light text-[#A7A9C4] text-base md:text-[1.125rem] leading-[1.6] max-w-[560px] mt-6"
      >
        From{" "}
        <span className="text-[#A86DFF] font-semibold">training</span> to{" "}
        <span className="text-[#C86DFF] font-semibold">hiring</span> to{" "}
        <span className="text-[#53E7FF] font-semibold">deployment</span>, our
        model is designed to turn finance learners into employer-ready talent.
      </motion.p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-start gap-4 mt-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.94 }}
          animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            delay: prefersReducedMotion ? 0 : 1.55,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <Magnetic range={80} strength={0.32}>
            <Link
              href="/academy/courses"
              className="fx-primary-btn relative group inline-flex items-center justify-center font-sans font-bold capitalize tracking-[0.05em] text-sm text-white px-7 py-3.5 rounded-xl active:scale-[0.98] select-none cursor-pointer"
            >
              <span className="flex items-center gap-2">
                Explore Courses
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.94 }}
          animate={isRevealed ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            delay: prefersReducedMotion ? 0 : 1.65,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <Magnetic range={70} strength={0.28}>
            <a
              href="/contact"
              className="fx-ghost-btn relative group inline-flex items-center justify-center font-sans font-bold capitalize tracking-[0.05em] text-sm text-white px-7 py-3.5 rounded-xl active:scale-[0.98] select-none cursor-pointer"
            >
              <span className="flex items-center gap-2">
                Book a Free Call
                <Phone className="w-4 h-4 text-[#A7A9C4] group-hover:text-white transition-colors duration-300" />
              </span>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </div>
  );
}
