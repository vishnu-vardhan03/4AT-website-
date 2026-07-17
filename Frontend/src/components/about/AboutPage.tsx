"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { BlurredStagger } from "@/components/about/BlurredStaggerText";
import { MagicText } from "@/components/about/MagicText";
import { GrowthTimeline } from "@/components/about/GrowthTimeline";
import { ExecutiveTeam } from "@/components/about/ExecutiveTeam";

const statementTextClass = "text-lg font-semibold leading-relaxed tracking-normal text-white/80 md:text-2xl";

const companyValues = [
  {
    number: "01",
    title: "The expert in the room is still human",
    body: "AI runs the process. A 4AT accountant owns the judgment. We don't let a model make the call that a trained CPA should make. In every engagement, the human is accountable, not the algorithm.",
    accent: "#38bdf8",
  },
  {
    number: "02",
    title: "Domain depth before technology breadth",
    body: "We only build AI on top of real finance and accounting expertise. If we don't understand the workflow manually, we don't automate it. Shallow tools built on shallow knowledge produce shallow results, and that's not 4AT's work.",
    accent: "#a78bfa",
  },
  {
    number: "03",
    title: "Auditability is the standard, not the goal",
    body: "Every output we produce, including reconciliations, journal entries, and AI decisions, has to be defensible, traceable, and explainable. The audit trail isn't a feature we add later. It's the only way we ship.",
    accent: "#2dd4bf",
  },
  {
    number: "04",
    title: "Capability is the product. Dependency is the failure.",
    body: "We walk away from every engagement having transferred something: a cleaner process, a better-trained team, a more capable finance function. If you need us forever, we did the work wrong.",
    accent: "#7dd3fc",
  },
  {
    number: "05",
    title: "We don't sell AI we wouldn't sign off on ourselves",
    body: "Our senior accountants use the same agents we sell. If Iris, Atlas, Guardian, or Connector isn't good enough for our team's daily work, it isn't good enough for yours. Every model we ship has been pressure-tested by the people whose names go on the workpapers.",
    accent: "#c084fc",
  },
];

const leadershipPrinciples = [
  {
    number: "01",
    title: "Start with the client's real problem",
    body: "Before proposing a service, a tool, or a solution, a 4AT leader understands the actual business problem behind the request. We do not sell what we have. We solve what the client needs. If the fit is not right, we say so.",
    accent: "#38bdf8",
  },
  {
    number: "02",
    title: "Own the output, not just the process",
    body: '"I handed it to the team" is not accountability. A 4AT leader is accountable for the quality of what leaves the firm, whether it is a reconciliation, an AI model output, a curriculum module, or a client recommendation. The work is yours until the client signs off.',
    accent: "#a78bfa",
  },
  {
    number: "03",
    title: "Stay close to the detail",
    body: "Leaders at 4AT operate at every level. No engagement detail is beneath a senior leader's attention. If the numbers do not feel right, if the model output is unusual, if the client's tone shifts, a 4AT leader notices, asks, and investigates. Distance from the work is where quality dies.",
    accent: "#2dd4bf",
  },
  {
    number: "04",
    title: "Develop the next person before yourself",
    body: "A 4AT leader's primary job is to make the person below them more capable. If your team cannot operate without you, you have not led. You have created dependency. Develop, delegate, and raise the standard. Then raise it again.",
    accent: "#7dd3fc",
  },
  {
    number: "05",
    title: "Say what is true, then commit",
    body: "A 4AT leader speaks the difficult truth in the room to clients, colleagues, and leadership. They do not soften assessments to avoid discomfort. Once a decision is made after honest debate, they commit to it fully and without reservation. Silence is not diplomacy. It is a failure to lead.",
    accent: "#c084fc",
  },
  {
    number: "06",
    title: "Hold the standard when no one is watching",
    body: "In finance, the errors that matter most happen when no one is checking. A 4AT leader applies the same rigor to a routine reconciliation as to a high-stakes audit deliverable. The standard does not change based on the audience, the deadline, or the pressure.",
    accent: "#38bdf8",
  },
  {
    number: "07",
    title: "Know the domain before you use the tool",
    body: "A 4AT leader understands every workflow they automate. They do not deploy AI where they cannot explain the manual process first. Tools extend expertise. They do not replace the requirement to have it.",
    accent: "#2dd4bf",
  },
  {
    number: "08",
    title: "Move fast, but never ahead of accuracy",
    body: "Speed is expected. Cutting corners is not. When a 4AT leader faces a choice between delivering faster and delivering right, they choose right and communicate the timeline clearly rather than deliver quietly on a lower standard.",
    accent: "#a78bfa",
  },
];


export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const valuesSectionRef = useRef<HTMLElement>(null);
  const [visibleValueCount, setVisibleValueCount] = useState(0);
  const { scrollYProgress: valuesScrollProgress } = useScroll({
    target: valuesSectionRef,
    offset: ["start 62%", "end 55%"],
  });

  useMotionValueEvent(valuesScrollProgress, "change", (progress) => {
    const nextCount = prefersReducedMotion
      ? companyValues.length
      : Math.ceil(progress * companyValues.length);

    setVisibleValueCount((currentCount) =>
      currentCount === nextCount ? currentCount : nextCount
    );
  });

  const principlesSectionRef = useRef<HTMLElement>(null);
  const [visiblePrincipleCount, setVisiblePrincipleCount] = useState(0);
  const { scrollYProgress: principlesScrollProgress } = useScroll({
    target: principlesSectionRef,
    offset: ["start 62%", "end 48%"],
  });

  useMotionValueEvent(principlesScrollProgress, "change", (progress) => {
    const nextCount = prefersReducedMotion
      ? leadershipPrinciples.length
      : Math.ceil(progress * leadershipPrinciples.length);

    setVisiblePrincipleCount((currentCount) =>
      currentCount === nextCount ? currentCount : nextCount
    );
  });

  return (
    <div className="about-page constant-site-background min-h-screen overflow-x-hidden text-white">
      <Nav />

      <main>
        <section id="vision" className="relative scroll-mt-24 overflow-visible bg-transparent site-section pt-32 md:pt-36">
          <div className="absolute -left-32 top-10 size-[26rem] rounded-full bg-[#38bdf8]/12 blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-[1200px]">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl"
              >
                <span className="section-badge uppercase tracking-[0.18em]">
                  The Future We&apos;re Building
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-8 w-full"
              >
                <div className="mb-8 h-px w-full bg-gradient-to-r from-[#7dd3fc]/60 via-white/15 to-transparent" />
                <p className={statementTextClass}>
                  <BlurredStagger text="To create a future where every finance team runs on " />
                  <BlurredStagger text="hybrid services." className="text-brand-gradient-flow" />
                  <BlurredStagger text=" People, Process, and AI working together, so accounting is faster, more insightful, and always reliable." />
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="mission" className="relative scroll-mt-24 overflow-visible bg-transparent site-section">
          <div className="absolute -right-32 bottom-10 size-[28rem] rounded-full bg-[#a78bfa]/14 blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-[1200px]">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl"
              >
                <span className="section-badge uppercase tracking-[0.18em] !text-[#a78bfa]">
                  What We Do Every Day
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-8 w-full"
              >
                <div className="mb-8 h-px w-full bg-gradient-to-r from-[#a78bfa]/60 via-white/15 to-transparent" />
                <MagicText
                  text="Our mission is to unite the world of business with hybrid services. Regardless of size or stage, we are built to be the accounting, audit, assurance, advisory and transformation (4AT) partner that lasts, the one designed to outgrow the technological chaos created by outsourcing and AI, through an innovative hybrid ecosystem that integrates with ever-evolving technology and scales with every business we serve."
                  className={statementTextClass}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="our-values" ref={valuesSectionRef} className="relative scroll-mt-24 overflow-hidden bg-transparent site-section">
          <div className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:84px_84px]" />
          <div className="pointer-events-none absolute -left-40 top-20 size-[30rem] rounded-full bg-[#38bdf8]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-20 size-[30rem] rounded-full bg-[#a78bfa]/12 blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <span className="section-badge uppercase tracking-[0.18em] !text-[#2dd4bf]">
                Our Values
              </span>
              <h2 className="mt-5 site-heading uppercase">
                The standards behind{" "}
                <span className="text-brand-gradient-flow">every engagement.</span>
              </h2>
            </motion.div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {companyValues.map((value, index) => (
                <motion.article
                  key={value.number}
                  initial={false}
                  animate={visibleValueCount > index
                    ? { opacity: 1, x: 0 }
                    : {
                        opacity: 0,
                        x: prefersReducedMotion ? 0 : index % 2 === 0 ? -64 : 64,
                      }}
                  transition={{
                    duration: prefersReducedMotion ? 0.2 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative min-h-[310px] transform-gpu overflow-hidden rounded-2xl border border-white/12 bg-[#090f1f]/95 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.34)] will-change-transform transition-[border-color,box-shadow] duration-300 hover:border-white/22 md:p-8 ${index === companyValues.length - 1 ? "md:col-span-2" : ""}`}
                >
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-35"
                    style={{ backgroundColor: value.accent }}
                  />
                  <div
                    className="absolute left-0 top-0 h-full w-1 opacity-80"
                    style={{ backgroundColor: value.accent }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="mb-8 flex items-start justify-between gap-6">
                      <span
                        className="font-mono text-5xl font-black leading-none md:text-6xl"
                        style={{ color: value.accent }}
                      >
                        {value.number}
                      </span>
                      <span className="mt-4 h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
                    </div>

                    <h3 className="text-2xl font-black uppercase leading-tight tracking-tight text-white md:text-3xl">
                      {value.title}
                    </h3>
                    <p className="mt-5 text-sm font-semibold leading-relaxed text-white/66 md:text-base">
                      {value.body}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="leadership-principles" ref={principlesSectionRef} className="relative scroll-mt-24 overflow-hidden bg-transparent site-section">
          <div className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:84px_84px]" />
          <div className="pointer-events-none absolute -left-40 top-20 size-[30rem] rounded-full bg-[#38bdf8]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-20 size-[30rem] rounded-full bg-[#a78bfa]/12 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <span className="section-badge uppercase tracking-[0.18em]">
                Leadership Principles
              </span>
              <h2 className="mt-5 site-heading uppercase">
                The standard behind{" "}
                <span className="text-brand-gradient-flow">how 4AT leads.</span>
              </h2>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-relaxed text-white/70 md:text-lg">
                Eight operating principles that define how we think, decide, review,
                and deliver when client trust is on the line.
              </p>
            </motion.div>

            <div className="mt-14 flex flex-col gap-6">
              {leadershipPrinciples.map((principle, index) => (
                <motion.article
                  key={principle.number}
                  initial={false}
                  animate={visiblePrincipleCount > index
                    ? { opacity: 1, x: 0 }
                    : {
                        opacity: 0,
                        x: prefersReducedMotion ? 0 : index % 2 === 0 ? -72 : 72,
                      }}
                  transition={{
                    duration: prefersReducedMotion ? 0.2 : 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative w-full transform-gpu overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[.075] to-white/[.025] shadow-[0_22px_60px_rgba(0,0,0,.26)] will-change-transform transition-[border-color,box-shadow] duration-300 hover:border-white/20 md:w-[92%] ${index % 2 === 0 ? "mr-auto" : "ml-auto"}`}
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full opacity-15 blur-3xl transition-opacity duration-300 group-hover:opacity-25"
                    style={{ backgroundColor: principle.accent }}
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-px opacity-90"
                    style={{ backgroundColor: principle.accent }}
                  />

                  <div className="relative grid gap-6 p-7 md:grid-cols-[140px_1fr] md:items-center md:gap-8 md:p-9">
                    <div className="flex items-center gap-5 md:block">
                      <span
                        className="grid size-20 shrink-0 place-items-center rounded-full border bg-black/20 font-mono text-2xl font-black leading-none md:size-24 md:text-3xl"
                        style={{ color: principle.accent, borderColor: `${principle.accent}55` }}
                      >
                        {principle.number}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent md:mt-6 md:block md:w-24" />
                    </div>

                    <div>
                      <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-white md:text-2xl">
                        {principle.title}
                      </h3>
                      <p className="mt-4 text-sm font-semibold leading-relaxed text-white/66 md:text-base">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <GrowthTimeline />

        <ExecutiveTeam />

      </main>

      <Footer />
    </div>
  );
}
