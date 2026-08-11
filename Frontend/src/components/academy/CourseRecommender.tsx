"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, Clock, Monitor, Sparkles } from "lucide-react";
import { SectionPill } from "@/components/academy/SectionPill";
import { Button } from "@/components/academy/Button";
import { lmsCourses } from "@/components/academy/data";

type Background = "Fresher / Student" | "Working Professional";
type Interest =
  | "Accounting"
  | "Audit"
  | "Taxation"
  | "Finance"
  | "ERP Systems"
  | "AI in Finance"
  | "Business Analytics";

const backgrounds: Background[] = ["Fresher / Student", "Working Professional"];

const interests: Interest[] = [
  "Accounting",
  "Audit",
  "Taxation",
  "Finance",
  "ERP Systems",
  "AI in Finance",
  "Business Analytics",
];

const FLAGSHIP_COURSE_TITLE = "FinTech Engineering — Acc L1";
const ACC_L2_TITLE = "FinTech Engineering — Acc L2";
const IA_L1_TITLE = "FinTech Engineering — IA L1";
const SOC2_TITLE = "FinTech Engineering — SOC 2";
const FPNA_TITLE = "FinTech Engineering — FP&A";

// Maps each answer pair to the closest-matching course in lmsCourses (data.ts).
const recommendationMap: Record<Background, Record<Interest, string>> = {
  "Fresher / Student": {
    Accounting: FLAGSHIP_COURSE_TITLE,
    Audit: IA_L1_TITLE,
    Taxation: SOC2_TITLE,
    Finance: FPNA_TITLE,
    "ERP Systems": FLAGSHIP_COURSE_TITLE,
    "AI in Finance": FLAGSHIP_COURSE_TITLE,
    "Business Analytics": FPNA_TITLE,
  },
  "Working Professional": {
    Accounting: ACC_L2_TITLE,
    Audit: IA_L1_TITLE,
    Taxation: SOC2_TITLE,
    Finance: FPNA_TITLE,
    "ERP Systems": ACC_L2_TITLE,
    "AI in Finance": ACC_L2_TITLE,
    "Business Analytics": FPNA_TITLE,
  },
};

type CourseRecommenderProps = {
  sectionId?: string;
  href?: string;
};

export function CourseRecommender({ sectionId = "course-recommender" }: CourseRecommenderProps) {
  const [background, setBackground] = useState<Background | null>(null);
  const [interest, setInterest] = useState<Interest | null>(null);

  const progress = background && interest ? 100 : background ? 50 : 0;

  const recommendation =
    background && interest
      ? lmsCourses.find((course) => course.title === recommendationMap[background][interest])
      : null;

  const fitReasons = recommendation
    ? [
        background ? `Matches your ${background.toLowerCase()} profile` : "Matches your experience level",
        interest ? `Focuses on ${interest}` : "Tailored to your interests",
        "Includes AI-powered tools",
        "Includes placement support",
      ]
    : [];

  return (
    <section
      id={sectionId}
      className="w-full section-padding font-sans select-none overflow-x-hidden relative"
      style={{ backgroundColor: "#07090D", color: "#ffffff" }}
    >
      <div
        className="absolute top-[15%] right-[-10%] w-[380px] h-[380px] rounded-full bg-[#5EEAD4]/5 blur-[110px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "14s" }}
      />
      <div
        className="absolute bottom-[5%] left-[-10%] w-[420px] h-[420px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "18s" }}
      />

      <div className="site-shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: header + conversational quiz — recommender's top lines up with the pill above */}
          <div className="flex flex-col gap-9">
            <div className="flex flex-col items-start text-left">
              <SectionPill className="mb-7">READY TO START?</SectionPill>

              <h2 className="section-title text-3xl! sm:text-4xl! lg:text-[2rem]! xl:text-[2.75rem]!">
                <span className="lg:hidden">Find your program, take the free pre-assessment.</span>
                <span className="hidden lg:inline">
                  Find your program, take<br />
                  the free pre-assessment.
                </span>
              </h2>

              <p className="section-desc">
                Tell us where you&apos;re headed — we&apos;ll recommend your track.
              </p>
            </div>

            <div className="w-full max-w-[420px] h-[3px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-start gap-4">
                <p className="section-copy-label">Where are you currently?</p>
                <div className="flex flex-wrap gap-3">
                  {backgrounds.map((option) => {
                    const isSelected = background === option;
                    return (
                      <button
                        key={option}
                        onClick={() => setBackground(option)}
                        className={`relative px-5 sm:px-6 py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "fx-primary-btn text-white shadow-[0_0_18px_rgba(45,212,191,0.25)]"
                            : "fx-ghost-btn text-slate-300 hover:text-white"
                        }`}
                      >
                        <span className="relative z-10 inline-flex items-center gap-1.5">
                          {option}
                          {isSelected && <Check className="w-3.5 h-3.5 text-teal-400" strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="w-full max-w-[420px] h-px bg-white/10" style={{ opacity: 0.15 }} />

              <div className="flex flex-col items-start gap-5">
                <p className="section-copy-label">What are you interested in?</p>
                <div className="flex flex-wrap gap-2.5 max-w-[500px]">
                  {interests.map((chip) => {
                    const isSelected = interest === chip;
                    return (
                      <motion.button
                        key={chip}
                        onClick={() => setInterest(chip)}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? "fx-primary-btn text-white shadow-[0_0_18px_rgba(45,212,191,0.25)]"
                            : "fx-ghost-btn text-slate-300 hover:text-white"
                        }`}
                      >
                        {chip}
                        {isSelected && <Check className="w-3.5 h-3.5 text-teal-400" strokeWidth={3} />}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: recommendation — appears only when options are selected */}
          <div className="relative lg:sticky lg:top-28 w-full flex flex-col items-start min-h-[460px]">
            <div className="w-full lg:max-w-[520px] lg:ml-auto flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5EEAD4]">
                Recommended Program
              </span>
            </div>

            <AnimatePresence mode="wait">
              {recommendation ? (
                <motion.div
                  key={recommendation.title}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative rounded-[26px] border border-blue-500/20 bg-gradient-to-b from-[#101726] via-[#0b0f19] to-[#080b12] shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_10px_30px_rgba(37,99,235,0.12)] flex flex-col box-border w-full max-w-[520px]"
                >
                  <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-[#8B5CF6]/10 blur-[100px] pointer-events-none z-0" />

                  {/* Image — flush to the top, inherits the card's top corners */}
                  <div className="relative w-full shrink-0 bg-[#04060f]" style={{ height: 180 }}>
                    <Image
                      src={recommendation.image}
                      alt={recommendation.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-[10px] font-bold uppercase tracking-wider text-white">
                      ★ Best Match
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col px-6 sm:px-7 pt-[18px] pb-6 sm:pb-7">
                    <h3 className="font-bold text-xl text-white font-sans">
                      {recommendation.title}
                    </h3>
                    {recommendation.subtitle && (
                      <p className="text-[13px] font-semibold text-[#818CF8] mt-1">
                        {recommendation.subtitle}
                      </p>
                    )}
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-300/80 opacity-80">
                      {recommendation.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-[18px]">
                      {recommendation.duration && (
                        <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#0F131C] border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold text-slate-200 truncate">{recommendation.duration}</p>
                            <p className="text-[9.5px] text-slate-500 uppercase tracking-wide">Duration</p>
                          </div>
                        </div>
                      )}
                      {recommendation.mode && (
                        <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#0F131C] border border-white/10">
                          <Monitor className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold text-slate-200 truncate">{recommendation.mode}</p>
                            <p className="text-[9.5px] text-slate-500 uppercase tracking-wide">Mode</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#0F131C] border border-white/10">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-slate-200 truncate">Placement Support</p>
                          <p className="text-[9.5px] text-slate-500 uppercase tracking-wide">Outcome</p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.15em] text-[#5EEAD4]">
                      Why this fits you
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-2.5">
                      {fitReasons.map((reason) => (
                        <div key={reason} className="flex items-center gap-1.5 text-[12px] text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={3} />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5">
                      <p className="text-[11px] text-slate-400 font-mono leading-relaxed mb-4">
                        Fee: <span className="text-white font-semibold">₹999 + GST</span> to confirm seat. Flow: <span className="text-emerald-400 font-semibold">Free pre-assessment → ₹999 → train → certify → intern → placed</span>
                      </p>
                      <div className="flex flex-wrap gap-3 w-full">
                        <Button
                          variant="primary"
                          className="w-full"
                          href="/academy/register"
                        >
                          Take the free pre-assessment
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-placeholder"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-[26px] border border-blue-500/20 bg-gradient-to-b from-[#101726] via-[#0b0f19] to-[#080b12] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_10px_30px_rgba(37,99,235,0.12)] p-8 sm:p-12 flex flex-col items-center justify-center text-center w-full max-w-[520px] min-h-[380px]"
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(45,212,191,0.15)] animate-pulse">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 font-sans">
                    Select Your Preferences
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed font-sans">
                    Choose your current stage and area of interest on the left to reveal your recommended program.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
