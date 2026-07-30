import React, { useState, useEffect, useRef } from "react";
import { Sparkles, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { NeonGlowOrb } from "@/components/academy/NeonGlowOrb";
import { SectionPill } from "@/components/academy/SectionPill";

export interface TestimonialItem {
  id?: string;
  name: string;
  profession: string;
  description: string;
  avatar?: string;
  image?: string;
  rating?: number;
}

interface SlidingTestimonialProps {
  testimonials?: TestimonialItem[];
}

const TAGLINES = [
  "REAL STORIES.",
  "REAL PEOPLE.",
  "REAL OUTCOMES.",
  "REAL STORIES. REAL PEOPLE. REAL OUTCOMES.",
];

const ContinuousTypewriterTagline: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20px" });

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(TAGLINES[3]);
      return;
    }

    if (!isInView) return;

    const currentFullPhrase = TAGLINES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentFullPhrase) {
      // Pause at full phrase completion (2 seconds for full combined phrase, 1.2s for single phrases)
      const pauseDuration = phraseIndex === 3 ? 2000 : 1200;
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayedText === "") {
      // Finished deleting current phrase; move to next phrase in loop
      setIsDeleting(false);
      setPhraseIndex((prevIndex) => (prevIndex + 1) % TAGLINES.length);
    } else {
      // Natural typewriter timing: ~45ms for typing, ~25ms for deleting
      const speed = isDeleting ? 25 : 45;
      timeout = setTimeout(() => {
        const nextLength = isDeleting
          ? displayedText.length - 1
          : displayedText.length + 1;

        setDisplayedText(currentFullPhrase.slice(0, nextLength));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex, isInView, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="pt-4 border-t border-teal-500/20 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-teal-300 font-sans min-h-[36px] select-none"
    >
      <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
      <span className="inline-flex items-center">
        <span>{displayedText}</span>
        {!shouldReduceMotion && (
          <span className="inline-block w-[2px] h-[0.95em] bg-teal-400 ml-1 animate-pulse" />
        )}
      </span>
    </div>
  );
};

const FUITestimonialWithSlide: React.FC<SlidingTestimonialProps> = ({
  testimonials = [],
}) => {
  const hasTestimonials = testimonials.length > 0;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="site-shell overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-[72px]">

        {/* Left Column — Pill + Heading + Subheading */}
        <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-start text-center lg:text-left relative">
          <SectionPill className="relative z-10">ALUMNI TESTIMONIALS</SectionPill>
          <h2 className="section-title max-w-[620px] relative z-10 mt-4">
            Career transformations from learners who moved into finance{" "}
            <span className="font-serif italic text-accent">roles</span>.
          </h2>
          <p className="section-desc relative z-10 mt-7 max-w-[540px] leading-relaxed text-sm sm:text-base">
            Structured mentorship, real case work, and placement support are
            helping our first cohorts move from theory into finance roles.
          </p>
        </div>

        {/* Right Column — Placeholder Card */}
        <div className="w-full lg:w-[42%] flex justify-center lg:justify-end relative z-10">
          {hasTestimonials ? (
            <div className="relative w-full max-w-[500px] overflow-hidden shrink-0 min-w-0">
              <div className="flex gap-5 overflow-x-auto py-4">
                {testimonials.map((testimonial, indx) => (
                  <div
                    key={testimonial.id || indx}
                    className="border border-[#151e2e] flex flex-col bg-[#121212] rounded-2xl shrink-0 w-[min(300px,calc(100vw-2.5rem))] sm:w-[480px] md:w-[580px] justify-between overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
                  >
                    <p className="px-6 py-6 text-body font-normal text-ink-secondary font-sans leading-relaxed">
                      &quot;{testimonial.description}&quot;
                    </p>
                    <div className="border-t border-white/8 w-full flex items-center justify-between px-6 py-4">
                      <div>
                        <h5 className="text-small font-semibold text-white font-sans">
                          {testimonial.name}
                        </h5>
                        <p className="text-ink-secondary text-xs font-sans">
                          {testimonial.profession}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.6,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="relative w-full max-w-[500px] border border-teal-500/35 bg-gradient-to-b from-[#141c28]/95 via-[#0f1520]/95 to-[#0b0e16]/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(45,212,191,0.15),0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-teal-400/50 transition-all duration-300"
            >
              {/* Ambient glows inside card */}
              <div className="absolute -top-20 -left-20 w-44 h-44 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* Static Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-teal-500/25 to-teal-500/10 border border-teal-400/40 text-teal-300 mb-4 shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
              </div>

              {/* Static Card Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight mb-3">
                Alumni Stories Coming Soon
              </h3>

              {/* Static Body Text */}
              <p className="text-ink-secondary text-xs sm:text-sm font-sans leading-relaxed max-w-md mx-auto mb-5 font-normal">
                Our first cohorts are progressing through real case work and
                placement preparation. Alumni stories will be published soon.
              </p>

              {/* Tagline with Continuous Typewriter Animation */}
              <ContinuousTypewriterTagline />
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

FUITestimonialWithSlide.displayName = "FUITestimonialWithSlide";

export default FUITestimonialWithSlide;
