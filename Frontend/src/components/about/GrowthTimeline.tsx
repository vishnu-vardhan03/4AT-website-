"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    points: [
      "Founded with a vision to transform finance and accounting services.",
      "Established a client-centric consulting model.",
    ],
    accent: "#38bdf8",
  },
  {
    year: "2022",
    title: "Expanding Expertise",
    points: [
      "Broadened service offerings across Accounting, Audit, Tax, and Advisory.",
      "Built a strong team of industry professionals.",
    ],
    accent: "#2dd4bf",
  },
  {
    year: "2023",
    title: "Scaling Operations",
    points: [
      "Expanded global delivery capabilities.",
      "Strengthened partnerships with growing enterprises and startups.",
      "Enhanced process automation and compliance solutions.",
    ],
    accent: "#a78bfa",
  },
  {
    year: "2024",
    title: "Innovation & Technology",
    points: [
      "Introduced AI-powered finance solutions.",
      "Launched intelligent automation initiatives.",
      "Expanded digital transformation services.",
    ],
    accent: "#7dd3fc",
  },
  {
    year: "2025",
    title: "Building the Future",
    points: [
      "Launched 4AT Academy to develop next-generation finance and technology talent.",
      "Accelerated investments in AI, intelligent agents, and automation.",
      "Continued helping organizations modernize finance operations with scalable, technology-driven solutions.",
    ],
    accent: "#c084fc",
  },
  {
    year: "Today",
    title: "Growing Together",
    points: [
      "Delivering end-to-end Finance, Audit, Tax, Advisory, and AI solutions.",
      "Empowering businesses through People, Process, and Technology.",
      "Building long-term partnerships that drive sustainable growth.",
    ],
    accent: "#2dd4bf",
  },
];

export function GrowthTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 30%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="our-growth" className="relative scroll-mt-24 overflow-hidden bg-transparent site-section">
      <div className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:84px_84px]" />
      <div className="pointer-events-none absolute -left-48 top-1/4 size-[34rem] rounded-full bg-[#38bdf8]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 size-[34rem] rounded-full bg-[#a78bfa]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="section-badge">Our Growth</span>
          <h2 className="mt-3 site-heading uppercase">
            From Vision to <span className="text-brand-gradient-flow">Value</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-relaxed text-white/70 md:text-lg">
            Our journey has been defined by continuous innovation, trusted partnerships,
            and a commitment to delivering measurable business outcomes.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative mt-10 md:mt-12">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-white/12 md:left-1/2" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-[#38bdf8] via-[#a78bfa] to-[#2dd4bf] shadow-[0_0_20px_rgba(56,189,248,.65)] md:left-1/2"
            style={{ scaleY: lineProgress }}
          />

          <div className="space-y-9 md:space-y-12">
            {milestones.map((milestone, index) => {
              const cardOnRight = index % 2 === 0;

              return (
                <div
                  key={milestone.year}
                  className="relative grid items-center md:grid-cols-2 md:gap-20"
                >
                  <motion.span
                    aria-hidden="true"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.55 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    className="absolute left-5 top-2 z-20 size-4 -translate-x-1/2 rounded-full border-[3px] border-[#060914] md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                    style={{
                      backgroundColor: milestone.accent,
                      boxShadow: `0 0 0 6px ${milestone.accent}20, 0 0 28px ${milestone.accent}90`,
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: cardOnRight ? -42 : 42 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`ml-14 pb-4 md:ml-0 md:pb-0 ${
                      cardOnRight
                        ? "md:order-1 md:pr-5 md:text-right"
                        : "md:order-2 md:pl-5 md:text-left"
                    }`}
                  >
                    <span
                      className="font-mono text-4xl font-black tracking-[-0.06em] md:text-6xl"
                      style={{ color: milestone.accent }}
                    >
                      {milestone.year}
                    </span>
                  </motion.div>

                  <motion.article
                    initial={{ opacity: 0, x: cardOnRight ? 54 : -54, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative ml-14 overflow-hidden rounded-2xl border border-white/12 bg-[#090f1f]/90 p-5 shadow-[0_26px_80px_rgba(0,0,0,.34)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25 md:ml-0 md:p-6 ${
                      cardOnRight ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-35"
                      style={{ backgroundColor: milestone.accent }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 w-1"
                      style={{ backgroundColor: milestone.accent }}
                    />

                    <div className="relative">
                      <span className="text-xs font-black uppercase tracking-[0.22em] text-white/40">
                        Milestone {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-white md:text-3xl">
                        {milestone.title}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {milestone.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-sm font-semibold leading-relaxed text-white/68 md:text-base"
                          >
                            <span
                              className="mt-[0.55rem] size-1.5 shrink-0 rounded-full"
                              style={{
                                backgroundColor: milestone.accent,
                                boxShadow: `0 0 10px ${milestone.accent}`,
                              }}
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
