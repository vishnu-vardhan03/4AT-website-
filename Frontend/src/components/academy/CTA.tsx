"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionPill } from "@/components/academy/SectionPill";
import { Button } from "@/components/academy/Button";

export function CTA({ sectionId = "enroll" }: { sectionId?: string }) {
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
        <SectionPill>NEXT COHORT · ENROLMENT OPEN</SectionPill>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-bold text-center pt-10"
          style={{
            fontSize: "clamp(1.9rem, 3.2vw, 4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Transforming Careers.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">
            Building Professionals
          </span>
        </motion.h2>

        <p
          className="text-center pt-8"
          style={{
            maxWidth: 760,
            color: "var(--academy-ink-secondary)",
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            lineHeight: 1.6,
          }}
        >
          The pre-assessment is free and takes a few minutes. Everything after, training, certification, a real role in finance, is built to end in a career, not just a certificate.
        </p>

        <p
          className="text-center pt-4"
          style={{
            maxWidth: 760,
            color: "var(--academy-ink-secondary)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          No commitment until you confirm your seat. Start with the free pre-assessment.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Button href="/academy/register" variant="primary">
            Check your eligibility, it&apos;s free
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button href="/contact" variant="secondary">
            Talk to us →
          </Button>
        </div>

        <p
          className="text-center pt-8 text-sm"
          style={{ color: "var(--academy-ink-secondary)" }}
        >
          Next cohort: [date] · Seats limited to 100
        </p>
      </motion.div>
    </section>
  );
}
