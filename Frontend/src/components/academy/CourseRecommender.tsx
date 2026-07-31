"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Monitor, Sparkles } from "lucide-react";
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

// Every path currently resolves to the flagship Acc L1 track. As more courses and
// signals (education, experience, career goal) come online, this map grows without
// touching the section's UI logic below.
const recommendationMap: Record<Background, Record<Interest, string>> = {
  "Fresher / Student": {
    Accounting: FLAGSHIP_COURSE_TITLE,
    Audit: FLAGSHIP_COURSE_TITLE,
    Taxation: FLAGSHIP_COURSE_TITLE,
    Finance: FLAGSHIP_COURSE_TITLE,
    "ERP Systems": FLAGSHIP_COURSE_TITLE,
    "AI in Finance": FLAGSHIP_COURSE_TITLE,
    "Business Analytics": FLAGSHIP_COURSE_TITLE,
  },
  "Working Professional": {
    Accounting: FLAGSHIP_COURSE_TITLE,
    Audit: FLAGSHIP_COURSE_TITLE,
    Taxation: FLAGSHIP_COURSE_TITLE,
    Finance: FLAGSHIP_COURSE_TITLE,
    "ERP Systems": FLAGSHIP_COURSE_TITLE,
    "AI in Finance": FLAGSHIP_COURSE_TITLE,
    "Business Analytics": FLAGSHIP_COURSE_TITLE,
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

  const outcome = recommendation?.bullets?.[recommendation.bullets.length - 1];

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
                      <span className="relative z-10">{option}</span>
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
                      className={`px-4.5 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border cursor-pointer transition-[background,border-color,box-shadow,color] duration-300 ${
                        isSelected
                          ? "text-black border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 shadow-[0_0_20px_rgba(167,139,250,0.35)]"
                          : "text-slate-300 border-[rgba(94,234,212,0.18)] bg-white/[0.02] hover:border-[#5EEAD4] hover:shadow-[0_0_12px_rgba(94,234,212,0.12)] hover:text-white"
                      }`}
                    >
                      {chip}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: recommendation reveal — fixed-height stage, only its content swaps */}
          <div className="relative lg:sticky lg:top-28 w-full">
            <div
              className="w-full flex flex-col"
              style={{ height: 540, minHeight: 540, maxHeight: 540 }}
            >
              <AnimatePresence mode="wait">
                {recommendation ? (
                  <motion.div
                    key={recommendation.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full h-full flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-4 shrink-0">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5EEAD4]">
                        ✨ Recommended Program
                      </span>
                    </div>

                    <div className="relative flex-1 min-h-0 rounded-[26px] border border-[rgba(167,139,250,0.3)] bg-[#090B12] shadow-[0_0_60px_rgba(139,92,246,0.15)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)] flex flex-col box-border">
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
                      </div>

                      <div className="relative z-10 flex-1 min-h-0 flex flex-col px-6 sm:px-7 pt-[18px] pb-6 sm:pb-7">
                        <h3 className="font-bold text-xl text-white font-sans line-clamp-1">
                          {recommendation.title}
                        </h3>
                        {recommendation.subtitle && (
                          <p className="text-[13px] font-semibold text-[#818CF8] mt-1 line-clamp-1">
                            {recommendation.subtitle}
                          </p>
                        )}
                        <p className="mt-2 text-[13px] leading-relaxed text-slate-300/80 line-clamp-2 opacity-80">
                          {recommendation.description}
                        </p>

                        <div className="flex flex-nowrap gap-2 mt-[18px] overflow-hidden">
                          {recommendation.duration && (
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F131C] border border-white/10 text-slate-200 font-medium text-[11px] whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{recommendation.duration}</span>
                            </div>
                          )}
                          {recommendation.mode && (
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F131C] border border-white/10 text-slate-200 font-medium text-[11px] whitespace-nowrap">
                              <Monitor className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{recommendation.mode}</span>
                            </div>
                          )}
                          {outcome && (
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F131C] border border-white/10 text-slate-200 font-medium text-[11px] whitespace-nowrap">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{outcome}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3 shrink-0 w-full mt-auto pt-5">
                          <Button
                            variant="primary"
                            className="flex-1 px-6 py-3 text-xs rounded-xl font-bold"
                            onClick={() => router.push(`/academy/courses/${slugify(recommendation.title)}`)}
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
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full h-full rounded-[26px] border border-dashed border-white/10 bg-white/[0.015] flex flex-col items-center justify-center text-center px-8 box-border"
                  >
                    <Sparkles className="w-6 h-6 text-[#5EEAD4]/60 mb-4" />
                    <p className="text-sm font-semibold text-slate-300">
                      Your personalized recommendation will appear here
                    </p>
                    <p className="mt-2 text-[12.5px] text-slate-500 max-w-[280px]">
                      Answer both questions on the left to reveal the right program for you.
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
