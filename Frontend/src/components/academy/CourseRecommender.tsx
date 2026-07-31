"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

type CourseRecommenderProps = {
  sectionId?: string;
  href?: string;
};

export function CourseRecommender({ sectionId = "course-recommender", href = "/academy/register" }: CourseRecommenderProps) {
  const router = useRouter();
  const [background, setBackground] = useState<Background | null>(null);
  const [interest, setInterest] = useState<Interest | null>(null);

  const progress = background && interest ? 100 : background ? 50 : 0;

  const recommendation =
    background && interest
      ? lmsCourses.find((course) => course.title === recommendationMap[background][interest])
      : null;

  const displayCourse = recommendation ?? lmsCourses.find((course) => course.title === FLAGSHIP_COURSE_TITLE)!;

  const fitReasons = [
    background ? `Matches your ${background.toLowerCase()} profile` : "Matches your experience level",
    interest ? `Focuses on ${interest}` : "Tailored to your interests",
    "Includes AI-powered tools",
    "Includes placement support",
  ];

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
        <div className="flex flex-col items-start text-left max-w-[850px] mb-14">
          <SectionPill className="mb-7">FIND YOUR PROGRAM</SectionPill>

          <h2 className="section-title">
            Not sure where to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">
              start?
            </span>
          </h2>

          <p className="section-desc">
            Answer two quick questions and we&apos;ll recommend the best learning path based on your background and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 lg:gap-16 items-start">
          {/* Left: conversational quiz */}
          <div className="flex flex-col gap-9">
            <div className="w-full max-w-[420px] h-[3px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            <div className="flex flex-col items-start gap-4">
              <p className="section-copy-label">Where are you currently?</p>
              <div className="relative inline-flex p-1 rounded-full border border-white/10 bg-white/[0.02] flex-wrap">
                {backgrounds.map((option) => {
                  const isSelected = background === option;
                  return (
                    <button
                      key={option}
                      onClick={() => setBackground(option)}
                      className={`relative px-5 sm:px-7 py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                        isSelected ? "text-black" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="recommender-segment-bg"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 -z-10"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 inline-flex items-center gap-1.5">
                        {option}
                        {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
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
                      whileTap={{ scale: 0.94 }}
                      animate={{ scale: isSelected ? 1.06 : 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border cursor-pointer transition-[background,border-color,box-shadow,color] duration-300 ${
                        isSelected
                          ? "text-black border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 shadow-[0_0_20px_rgba(167,139,250,0.35)]"
                          : "text-slate-300 border-[rgba(94,234,212,0.18)] bg-white/[0.02] hover:border-[#5EEAD4] hover:shadow-[0_0_12px_rgba(94,234,212,0.12)] hover:text-white"
                      }`}
                    >
                      {chip}
                      {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: recommendation — always visible, content re-flows as answers refine it */}
          <div className="relative lg:sticky lg:top-28 w-full">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5EEAD4]">
                Recommended Program
              </span>
            </div>

            <motion.div
              layout
              className="relative rounded-[26px] border border-[rgba(167,139,250,0.3)] bg-[#090B12] shadow-[0_0_60px_rgba(139,92,246,0.15)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)] flex flex-col box-border"
            >
              <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-[#8B5CF6]/10 blur-[100px] pointer-events-none z-0" />

              {/* Image — flush to the top, inherits the card's top corners */}
              <div className="relative w-full shrink-0 bg-[#04060f]" style={{ height: 180 }}>
                <Image
                  src={displayCourse.image}
                  alt={displayCourse.title}
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
                  {displayCourse.title}
                </h3>
                {displayCourse.subtitle && (
                  <p className="text-[13px] font-semibold text-[#818CF8] mt-1">
                    {displayCourse.subtitle}
                  </p>
                )}
                <p className="mt-2 text-[13px] leading-relaxed text-slate-300/80 opacity-80">
                  {displayCourse.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-[18px]">
                  {displayCourse.duration && (
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#0F131C] border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-slate-200 truncate">{displayCourse.duration}</p>
                        <p className="text-[9.5px] text-slate-500 uppercase tracking-wide">Duration</p>
                      </div>
                    </div>
                  )}
                  {displayCourse.mode && (
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#0F131C] border border-white/10">
                      <Monitor className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-slate-200 truncate">{displayCourse.mode}</p>
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

                <div className="flex gap-3 w-full mt-6">
                  <Button
                    variant="primary"
                    className="flex-1 px-6 py-3 text-xs rounded-xl font-bold"
                    onClick={() => router.push(`/academy/courses/${slugify(displayCourse.title)}`)}
                  >
                    View Program
                  </Button>
                  <Button
                    variant="secondary"
                    href={href}
                    className="flex-1 px-6 py-3 text-xs rounded-xl font-bold backdrop-blur-md bg-white/[0.02] border-white/10"
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
