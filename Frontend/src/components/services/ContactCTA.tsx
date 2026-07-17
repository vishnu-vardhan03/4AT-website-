"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];

    const controls = animate(0, target, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(`${prefix}${Math.floor(latest)}${suffix}`);
      }
    });

    return () => controls.stop();
  }, [value, isInView]);

  return <span ref={ref}>{displayValue}</span>;
}

export function ContactCTA() {
  const stats = [
    { value: "200+", label: "engagements delivered" },
    { value: "50+", label: "active subscribers" },
    { value: "4", label: "countries" },
    { value: "90%+", label: "retention" }
  ];

  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
  
  const [typedText1, setTypedText1] = useState("");
  const [typedText2, setTypedText2] = useState("");

  const text1 = "Ready to build value";
  const text2 = "for your enterprise?";

  useEffect(() => {
    if (!isHeadingInView) return;

    let index1 = 0;
    let index2 = 0;

    const timer = setInterval(() => {
      if (index1 < text1.length) {
        index1++;
        setTypedText1(text1.substring(0, index1));
      } else if (index2 < text2.length) {
        index2++;
        setTypedText2(text2.substring(0, index2));
      } else {
        clearInterval(timer);
      }
    }, 45); // Typing speed (45ms per character)

    return () => clearInterval(timer);
  }, [isHeadingInView]);

  const isTypingText1 = typedText1.length > 0 && typedText1.length < text1.length;
  const isTypingText2 = typedText1.length === text1.length && typedText2.length < text2.length;

  return (
    <section id="contact" className="relative bg-[#01030e] text-ink-foreground overflow-hidden py-24 md:py-32 flex items-center justify-center">
      {/* Animated gradient field */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_60%_at_20%_30%,color-mix(in_oklab,var(--brand)_30%,transparent),transparent_60%),radial-gradient(60%_60%_at_80%_70%,color-mix(in_oklab,var(--brand-glow)_25%,transparent),transparent_60%)]"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative mx-auto max-w-6xl px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Content & Call to Action */}
          <div className="lg:col-span-7 text-left flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start w-full"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-6 select-none">
                Let&apos;s build
              </div>
              <h2 ref={headingRef} className="text-display text-[clamp(2.5rem,4.5vw,4rem)] text-white font-black leading-[1.05] tracking-tight min-h-[85px] sm:min-h-[105px] lg:min-h-[125px] w-full">
                {typedText1}
                {isTypingText1 && <span className="animate-pulse text-sky-400 ml-1">|</span>}
                {typedText1.length === text1.length && (
                  <span className="block mt-2 py-2 px-1 text-[clamp(1.4rem,2.8vw,2.4rem)] tracking-tight bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.25)] animate-gradient-x">
                    {typedText2}
                    {isTypingText2 && <span className="animate-pulse text-purple-400 ml-1">|</span>}
                  </span>
                )}
              </h2>
              <p className="mt-6 text-base md:text-lg text-zinc-300 font-light leading-relaxed max-w-xl">
                A 30-minute conversation with a senior practitioner. No decks, no
                templates, just the right questions.
              </p>
              <div className="mt-10">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 text-base font-semibold hover:bg-sky-400 hover:text-black transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-sky-400/20 active:scale-95 cursor-pointer select-none"
                >
                  Let&apos;s talk
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Trust Bar Stats (2x2 Grid format) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-[#0b1020]/45 p-6 flex flex-col justify-center items-start gap-1 backdrop-blur-sm hover:border-sky-500/20 transition-colors group cursor-default"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)" }}
                >
                  <span className="text-3xl font-black text-sky-400 group-hover:text-white transition-colors duration-300 tracking-tight filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.2)] group-hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)]">
                    <Counter value={stat.value} />
                  </span>
                  <span className="uppercase tracking-[0.1em] text-[10px] font-bold text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 mt-1 leading-snug">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
