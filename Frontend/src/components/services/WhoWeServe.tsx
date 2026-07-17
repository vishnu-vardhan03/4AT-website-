import { motion } from "framer-motion";
import { SegmentDoodle } from "./SegmentDoodle";

const segments = [
  {
    doodleType: "cfo" as const,
    title: "CFOs and Controllers",
    desc: "At fast-growing companies stuck between Big 4 quotes they can't justify and AI tools they can't sign off on."
  },
  {
    doodleType: "firm" as const,
    title: "Accounting firm owners",
    desc: "Offering hybrid services to their own clients, or outsourcing tax-season overflow without losing margin or relationships."
  },
  {
    doodleType: "pe" as const,
    title: "PE-backed portfolio companies",
    desc: "Needing audit-ready books across multiple entities, controls that survive diligence, and reporting that satisfies the GP."
  },
  {
    doodleType: "ipo" as const,
    title: "Pre-IPO finance teams",
    desc: "12-24 months from S-1, with everything (books, controls, S-1 narrative, first earnings) still to build."
  }
];

export function WhoWeServe() {
  return (
    <section className="py-24 bg-transparent overflow-hidden border-t border-b border-white/5 relative">
      {/* Background radial glow */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 w-full">
        {/* Header Block */}
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-6">
              Who we serve
            </div>
            <h2 className="text-display text-[clamp(2.5rem,5.2vw,4.5rem)] text-white font-black leading-[0.95]">
              Built for the four kinds of teams
              <span className="block mt-2 py-2 px-1 text-[clamp(1.4rem,3vw,2.6rem)] tracking-tight bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.25)] animate-gradient-x">
                who can&apos;t afford to get this wrong
              </span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 self-end text-lg text-white leading-relaxed">
            The teams who switch to 4AT Hybrid all share one thing: they&apos;re done choosing between expensive firms and risky AI.
          </p>
        </div>

        {/* 4 Cards Grid - Static grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {segments.map((s) => {
            return (
              <div
                key={s.title}
                className="h-full"
              >
                <motion.div
                  className="group relative flex flex-col items-center justify-start h-full rounded-2xl overflow-hidden border border-white/15 bg-[#0b1020]/85 p-6 pt-8 pb-6 text-center transition-all duration-500 ease-out"
                  style={{ boxShadow: "inset 0 1px 0 rgba(34, 211, 238, 0.13)" }}
                >
                  {/* Glow Accent Blob */}
                  <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl bg-sky-500/10 pointer-events-none" />

                  {/* Subtle top indicator line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-sky-500/50 opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Enhanced Graphical Icon Container */}
                  <div className="relative mb-6 flex items-center justify-center w-16 h-16 select-none">
                    {/* Orbiting dashed ring */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-sky-500/20 animate-spin-slow group-hover:border-sky-500/50 transition-colors duration-500" />
                    
                    {/* Colored glow background */}
                    <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-sky-400/20 to-purple-500/20 opacity-40 blur-sm group-hover:opacity-80 group-hover:scale-110 transition-all duration-500" />
                    
                    {/* Core Icon Box */}
                    <div className="relative h-12 w-12 rounded-xl bg-[#0b1020] border border-white/10 flex items-center justify-center text-white group-hover:border-sky-500/50 transition-all duration-500 p-1.5 overflow-hidden">
                      <SegmentDoodle type={s.doodleType} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base lg:text-lg font-bold tracking-tight text-white group-hover:text-sky-400 transition-all duration-500 leading-snug">
                    {s.title}
                  </h3>
                  
                  {/* Description Block */}
                  <div className="mt-4 border-t border-white/5 pt-4 w-full">
                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
