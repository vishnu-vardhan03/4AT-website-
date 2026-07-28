import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { NeonGlowOrb } from "@/components/academy/NeonGlowOrb";
import { SectionPill } from "@/components/academy/SectionPill";

// Title words for smooth staggered reveal
const TITLE_WORDS = ["Alumni", "Stories", "Coming", "Soon"];
const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

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

const FUITestimonialWithSlide: React.FC<SlidingTestimonialProps> = ({
  testimonials = [],
}) => {
  const hasTestimonials = testimonials.length > 0;
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: EASE_OUT_QUART,
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.5,
        ease: EASE_OUT_QUART,
      },
    },
  };

  const wordContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 8,
      filter: shouldReduceMotion ? "none" : "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.45,
        ease: EASE_OUT_QUART,
      },
    },
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full overflow-hidden">
      <div className="w-full mx-auto px-4 md:px-10 overflow-hidden">
        {/* Heading Section */}
        <div
          id="testimonials-heading"
          className="mb-8 sm:mb-10 text-center flex flex-col items-center relative"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
            <NeonGlowOrb
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 max-w-full"
              size={450}
              opacity={0.18}
              blur={50}
            />
          </div>
          <SectionPill className="relative z-10">ALUMNI TESTIMONIALS</SectionPill>
          <h2 className="section-title text-center max-w-3xl mx-auto relative z-10">
            Career transformations from learners who moved into finance{" "}
            <span className="font-serif italic text-accent">roles</span>.
          </h2>
          <p className="section-desc text-center mt-3 max-w-xl mx-auto relative z-10 leading-relaxed text-sm sm:text-base">
            Structured mentorship, real case work, and placement support are
            helping our first cohorts move from theory into finance roles.
          </p>
        </div>

        {/* Testimonials Content or High-Visibility Animated Placeholder */}
        {hasTestimonials ? (
          <div className="relative w-full max-w-full overflow-hidden shrink-0 min-w-0">
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
          <div className="max-w-xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
              className="relative border border-teal-500/35 bg-gradient-to-b from-[#141c28]/95 via-[#0f1520]/95 to-[#0b0e16]/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(45,212,191,0.15),0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-teal-400/50 transition-all duration-300"
            >
              {/* Vibrant background ambient glows inside card */}
              <div className="absolute -top-20 -left-20 w-44 h-44 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

              {/* 1. Icon Reveal */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-teal-500/25 to-teal-500/10 border border-teal-400/40 text-teal-300 mb-4 shadow-[0_0_15px_rgba(45,212,191,0.3)]"
              >
                <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
              </motion.div>

              {/* 2. Staggered Word Reveal for Card Title */}
              <motion.h3
                variants={itemVariants}
                className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight mb-3 flex items-center justify-center gap-1.5 flex-wrap"
              >
                <motion.span
                  variants={wordContainerVariants}
                  className="inline-flex flex-wrap justify-center gap-x-2"
                >
                  {TITLE_WORDS.map((word, i) => (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h3>

              {/* 3. Body Text Reveal */}
              <motion.p
                variants={itemVariants}
                className="text-ink-secondary text-xs sm:text-sm font-sans leading-relaxed max-w-md mx-auto mb-5 font-normal"
              >
                Our first cohorts are progressing through real case work and
                placement preparation. Alumni stories will be published soon.
              </motion.p>

              {/* 4. Footer Tagline Reveal */}
              <motion.div
                variants={itemVariants}
                className="pt-4 border-t border-teal-500/20 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-teal-300 font-sans"
              >
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>REAL STORIES. REAL PEOPLE. REAL OUTCOMES.</span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

FUITestimonialWithSlide.displayName = "FUITestimonialWithSlide";

export default FUITestimonialWithSlide;
