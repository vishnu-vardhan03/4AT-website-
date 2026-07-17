import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const HYBRID_SERVICES = ["Accounting.", "Audit.", "Advisory.", "Assurance.", "TAX.", "FP&A.", "Transformation."];

export function Hero() {
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveService((current) => (current + 1) % HYBRID_SERVICES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero-ecosystem relative min-h-screen overflow-hidden bg-transparent px-6 pb-20 pt-32 text-white md:px-12 lg:px-20" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="hero-ecosystem-grid" aria-hidden="true" />
      <div className="hero-ecosystem-glow hero-ecosystem-glow-left" aria-hidden="true" />
      <div className="hero-ecosystem-glow hero-ecosystem-glow-right" aria-hidden="true" />
      <div className="hero-ecosystem-orbit" aria-hidden="true">
        <span className="hero-ecosystem-orbit-core" />
        <span className="hero-ecosystem-orbit-ring hero-ecosystem-orbit-ring-one" />
        <span className="hero-ecosystem-orbit-ring hero-ecosystem-orbit-ring-two" />
        <span className="hero-ecosystem-orbit-ring hero-ecosystem-orbit-ring-three" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-13rem)] w-full max-w-[1200px] flex-col justify-center lg:-translate-x-8">
        <motion.span
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-[#04060f]/50 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/75 backdrop-blur"
        >
          <span
            aria-label="4AT Logo"
            role="img"
            className="brand-logo-gradient shrink-0"
            style={{ WebkitMaskImage: `url(${logo.src})`, maskImage: `url(${logo.src})` }}
          />
          <span>Introducing Hybrid Services Eco-System</span>
        </motion.span>

        <motion.h1
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl font-bold tracking-tight"
        >
          <span className="block max-w-4xl text-2xl sm:text-3xl md:text-4xl leading-[1.12]">
            The new way to run
          </span>
          <span className="site-hero-heading relative mt-5 block min-h-[1.35em] max-w-5xl overflow-visible pb-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={HYBRID_SERVICES[activeService]}
                initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -35, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-brand-gradient-flow inline-block whitespace-nowrap pb-[0.14em] leading-[1.15]"
              >
                {HYBRID_SERVICES[activeService]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.85, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-start gap-8"
        >
          <p className="site-hero-subheading max-w-2xl text-white/75">
            4AT pairs AI-powered workflows with senior practitioners in one ecosystem, so finance teams stop choosing between firms that bill by the hour and AI tools they can&apos;t sign off on.
          </p>

          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href="/services"
              className="group inline-flex items-center overflow-hidden rounded-md border border-white/20 bg-white text-sm font-bold text-[#04060f] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(125,211,252,0.25)]"
            >
              <span className="px-6 py-4">Explore Hybrid Services</span>
              <span className="flex self-stretch items-center border-l border-black/10 px-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
            <a
              href="#process"
              className="inline-flex items-center rounded-md border border-white/25 bg-white/5 px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              See How It Works
            </a>
          </div>

          <div className="flex w-full max-w-full flex-col divide-y divide-white/15 overflow-hidden rounded-xl border border-white/15 bg-white/[0.035] text-sm font-medium text-white/75 backdrop-blur-sm sm:w-fit sm:flex-row sm:divide-x sm:divide-y-0">
            <span className="px-5 py-3.5">99.7% reconciliation accuracy</span>
            <span className="px-5 py-3.5">Senior CPAs on every engagement</span>
            <span className="px-5 py-3.5">Live across 10+ countries</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
