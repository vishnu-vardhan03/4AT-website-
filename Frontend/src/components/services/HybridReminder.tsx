import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

export function HybridReminder() {
  return (
    <section 
      id="hybrid-reminder"
      className="relative w-full bg-transparent text-white py-24 lg:py-32 overflow-hidden border-t border-b border-white/5"
    >


      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-6"
          >
            The same hybrid model on every service
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display text-[clamp(2.5rem,5.2vw,4.5rem)] text-white font-black leading-[0.95]"
          >
            Pick any service
            <span className="block mt-2 py-2 px-1 text-[clamp(1.4rem,3vw,2.6rem)] tracking-tight bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.25)] animate-gradient-x">
              We deliver it the same way
            </span>
          </motion.h2>
        </div>

        {/* Two-Column Reminder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Column 1: AI (Science) */}
          <TiltCard className="h-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative h-full rounded-[2rem] overflow-hidden border border-white/15 bg-[#0b1020]/85 p-8 lg:p-10"
              style={{ boxShadow: "inset 0 1px 0 rgba(34, 211, 238, 0.13)" }}
            >
              {/* Glow Accent Blob */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl bg-sky-500/20 pointer-events-none" />

              {/* Top Cyan Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-sky-500/50 opacity-50 group-hover:opacity-100 transition-opacity" />

              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-sky-400 uppercase block mb-3">
                AUTOMATION LAYER
              </span>
              
              <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-white mb-6">
                AI handles the science
              </h3>

              <div className="divide-y divide-white/5 border-t border-b border-white/5 mb-8">
                {[
                  "Document intake and extraction",
                  "Workflow routing and task triggers",
                  "Reconciliation at 99.7% match accuracy",
                  "First-pass reports and journal entries",
                  "Anomaly and exception flagging"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 py-4 text-sm font-light text-zinc-300 items-start">
                    <span className="text-sky-400 font-mono font-bold text-xs select-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Powered by Iris, Atlas, Guardian, Connector
              </div>
            </motion.div>
          </TiltCard>

          {/* Column 2: Humans (Art) */}
          <TiltCard className="h-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative h-full rounded-[2rem] overflow-hidden border border-white/15 bg-[#0b1020]/85 p-8 lg:p-10"
              style={{ boxShadow: "inset 0 1px 0 rgba(167, 139, 250, 0.13)" }}
            >
              {/* Glow Accent Blob */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl bg-purple-500/20 pointer-events-none" />

              {/* Top Purple Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-purple-500/50 opacity-50 group-hover:opacity-100 transition-opacity" />

              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-purple-400 uppercase block mb-3">
                EXPERT LAYER
              </span>

              <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-white mb-6">
                Senior practitioners handle the art
              </h3>

              <div className="divide-y divide-white/5 border-t border-b border-white/5 mb-8">
                {[
                  "Technical accounting judgment",
                  "Review, sign-off, and final accountability",
                  "Complex transactions and exceptions",
                  "Controls remediation and audit defense",
                  "Client communication and decisions"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 py-4 text-sm font-light text-zinc-300 items-start">
                    <span className="text-purple-400 font-mono font-bold text-xs select-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Led by senior CPAs, controllers, and tax leads
              </div>
            </motion.div>
          </TiltCard>
        </div>

        {/* Footer & CTA Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-8 border-t border-white/5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white text-sm md:text-base leading-relaxed font-light"
          >
            Every service below runs on this same model. The only thing that changes is what we&apos;re doing for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <a
              href="#services"
              className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-sky-400 hover:text-white transition-all duration-300"
            >
              Find the service that matches your situation
              <span className="transition-transform group-hover:translate-x-1.5">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
