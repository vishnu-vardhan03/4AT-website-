"use client";

import { motion } from "framer-motion";
import { offerings } from "@/components/academy/data";

export function CourseDirectory({ sectionId = "courses" }: { sectionId?: string }) {
  return (
    <section id={sectionId} className="site-shell section-frame section-padding">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-[680px]">
          <p className="section-copy-label">Our Offerings & Components</p>
          <h2 className="section-title mt-6">
            A bento-structured curriculum surface that makes every component legible at a glance.
          </h2>
        </div>
        <p className="max-w-[440px] text-lead font-normal leading-[1.6] text-ink-soft">
          The layout uses double-width emphasis on the most outcome-heavy interventions so the
          section feels directional rather than evenly weighted.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 md:auto-rows-[minmax(280px,auto)] xl:grid-cols-4">
        {offerings.map((offering, index) => {
          const Icon = offering.icon;
          const featured = offering.size === "wide";

          const ambientGlow = featured && index === 0 
            ? "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_50%)]" 
            : featured ? "bg-[radial-gradient(circle_at_center,rgba(90,127,147,0.08)_0%,transparent_50%)]"
            : "bg-[radial-gradient(circle_at_center,rgba(18,34,47,0.04)_0%,transparent_50%)]";

          return (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={offering.title}
              className={`group relative z-10 min-h-[300px] overflow-hidden rounded-[28px] p-6 transition-[box-shadow,transform] duration-300 hover-fine:scale-[1.02] hover-fine:-translate-y-1.2 hover-fine:z-20 hover-fine:shadow-2xl sm:min-h-[320px] backdrop-blur-2xl ${
                featured
                  ? index === 0
                    ? "bg-brand/60 text-white shadow-panel md:col-span-2"
                    : "bg-brand/40 text-white shadow-panel md:col-span-2"
                  : "bg-white/40 text-ink shadow-soft"
              }`}
            >
              {/* Ambient hover glow effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover-fine:opacity-100">
                <div className={`absolute -left-[50%] -top-[50%] h-[200%] w-[200%] ${ambientGlow}`} />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div
                    className={`inline-flex rounded-full p-3 ${
                      featured ? "bg-white/10 text-white" : "theme-surface-icon-accent"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-8 text-h2 font-bold leading-[1.2]">{offering.title}</h3>
                  <p className={`mt-4 max-w-[34ch] text-body-md font-normal leading-[1.6] ${featured ? "text-white/80" : "text-ink-soft"}`}>
                    {offering.body}
                  </p>
                </div>
                <div className={`mt-8 h-16 rounded-[20px] ${featured ? "bg-white/10" : "bg-canvas"}`} />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
