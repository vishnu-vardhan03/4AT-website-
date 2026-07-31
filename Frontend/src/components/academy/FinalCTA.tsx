"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionPill } from "@/components/academy/SectionPill";
import { Button } from "@/components/academy/Button";

export function FinalCTA({ sectionId = "enroll" }: { sectionId?: string }) {
  return (
    <section
      id={sectionId}
      className="w-full bg-transparent overflow-x-hidden relative pt-20 pb-20 sm:pt-[140px] sm:pb-[140px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="site-shell relative z-10 mx-auto flex flex-col items-center text-center"
      >
        <SectionPill>NEXT COHORT • JULY 2026</SectionPill>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-bold text-center pt-10 lg:whitespace-nowrap"
          style={{
            fontSize: "clamp(1.9rem, 3.2vw, 4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          From graduate to finance professional.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">
            Start today.
          </span>
        </motion.h2>

        <p
          className="text-center pt-10"
          style={{
            maxWidth: 760,
            color: "var(--academy-ink-secondary)",
            fontSize: "clamp(1rem, 1.4vw, 1.375rem)",
            lineHeight: 1.6,
          }}
        >
          Take the free pre-assessment and step onto a path that ends in a job.
        </p>

        <Button href="#course-recommender" variant="primary" size="lg" className="mt-14">
          Take Free Assessment
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </section>
  );
}
