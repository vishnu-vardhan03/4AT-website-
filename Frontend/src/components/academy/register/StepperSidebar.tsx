"use client";

import React from "react";
import { STEPS_INFO } from "./constants";

interface StepperSidebarProps {
  currentStep: number;
}

/**
 * Left-column stepper roadmap with heading, step indicators, and trust signals.
 * Extracted verbatim from the original RegisterForm.tsx left column.
 */
export function StepperSidebar({ currentStep }: StepperSidebarProps) {
  return (
    <div className="lg:sticky lg:top-24">
      <span className="section-eyebrow mb-6 text-accent uppercase tracking-widest text-[11px] font-bold">
        LMS Academy Enrollment
      </span>
      <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-white mt-6 leading-none">
        Register{" "}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">
          Yourself
        </span>
        <br />
        For the Academy.
      </h2>
      <p className="mt-6 text-base text-ink-secondary leading-relaxed max-w-[48ch]">
        Complete your profile below to gain dashboard access, customize your
        specialized learning path, and link directly with hiring partners.
      </p>

      {/* Stepper Wizard Indicator */}
      <div className="mt-12 relative pl-8 border-l border-white/5 space-y-10">
        {STEPS_INFO.map((s) => {
          const isActive = currentStep === s.num;
          const isCompleted = currentStep > s.num;
          return (
            <div key={s.num} className="relative group">
              {/* Node Dot */}
              <div
                className={`absolute -left-[41px] top-1.5 flex items-center justify-center w-[25px] h-[25px] rounded-full text-[10px] font-bold border transition-all duration-300 ${
                  isActive
                    ? "bg-accent text-[#04060f] border-accent shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                    : isCompleted
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-[#0b0e1a] text-slate-500 border-white/10"
                }`}
              >
                {isCompleted ? "✓" : s.num}
              </div>

              <div>
                <h4
                  className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive
                      ? "text-accent font-extrabold"
                      : isCompleted
                      ? "text-emerald-400/90"
                      : "text-slate-500"
                  }`}
                >
                  {s.label}
                </h4>
                <p
                  className={`text-xs mt-1 transition-colors duration-300 ${
                    isActive ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Signals Footer Block */}
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-6 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>128-bit Secure Registration</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Auto-creates LMS Profile</span>
        </div>
      </div>
    </div>
  );
}
