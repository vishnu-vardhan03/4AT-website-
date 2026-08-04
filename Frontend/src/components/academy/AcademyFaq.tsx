"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { SectionPill } from "./SectionPill";

const faqItems = [
  {
    question: "Who can apply?",
    answer:
      "Commerce, accounting or finance graduates and final-semester students. All candidates clear a short screening assessment.",
  },
  {
    question: "What does it cost?",
    answer:
      "The pre-assessment is free. You confirm your seat with ₹999 + GST.",
  },
  {
    question: "Is placement guaranteed?",
    answer:
      "Candidates who clear the assessments and interview earn an internship and a placement pathway, either at 4AT or a partner.",
  },
  {
    question: "How is this different from a normal course?",
    answer:
      "It's practice-led and run by a working Finance & Accounting consulting firm. You'll train on live ERP systems and AI-powered finance tools, work on real client-style scenarios, and follow the Train • Hire • Deploy model designed to prepare you for real finance careers.",
  },
  {
    question: "Do I need prior experience or coding skills?",
    answer:
      "No. The flagship Acc L1 track is built for freshers. You'll learn the AI and ERP tools as part of the program.",
  },
];

export function AcademyFaq({ sectionId = "faq" }: { sectionId?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(4);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id={sectionId}
      className="w-full bg-transparent text-white section-padding overflow-x-hidden relative flex items-center"
    >
      <div className="site-shell relative z-10 w-full">
        {/* Section Header Zone */}
        <div className="flex flex-col items-start text-left w-full lg:w-[65%] mb-10 md:mb-12">
          <div className="mb-3">
            <SectionPill>
              FREQUENTLY ASKED QUESTIONS
            </SectionPill>
          </div>
          <h2 className="section-title text-left w-full">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">Good to know</span> before you apply.
          </h2>
        </div>

        {/* Unified Compact Accordion Container */}
        <div className="w-full lg:w-[65%] rounded-2xl bg-[#090B0F]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] divide-y divide-white/[0.08] overflow-hidden">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="w-full transition-colors duration-200">
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-6 py-4.5 sm:px-7 sm:py-5 text-left font-bold text-base sm:text-[1.05rem] text-white/90 hover:text-white transition-colors cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 leading-snug">{item.question}</span>
                  <span className="text-emerald-400 font-bold text-lg shrink-0 ml-4 flex items-center justify-center">
                    {isOpen ? (
                      <X className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                    )}
                  </span>
                </button>

                {/* Animated Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0.5 sm:px-7 sm:pb-6 text-[#A7A9C4] text-sm sm:text-[14.5px] leading-relaxed font-sans font-normal">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
