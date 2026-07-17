"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import raviKrovvidi from "@/assets/executive-team/ravi-krovvidi.png";
import arunaSharma from "@/assets/executive-team/aruna-sharma.png";
import prudviRaju from "@/assets/executive-team/vetukuri-prudvi-raju.png";
import shashank from "@/assets/executive-team/shashank.png";
import vinitaShastry from "@/assets/executive-team/vinita-anand-shastry.png";
import bhavanaChiriki from "@/assets/executive-team/bhavana-chiriki.png";
import vanditaKondapaneni from "@/assets/executive-team/vandita-kondapaneni.png";
import vivekVelichala from "@/assets/executive-team/vivek-varshith-velichala.png";

interface ExecutiveMember {
  name: string;
  role: string;
  bio: string;
  image: StaticImageData;
  accent: string;
  objectPosition?: string;
}

const executiveTeam: ExecutiveMember[] = [
  {
    name: "Ravi Krovvidi",
    role: "Founder & Managing Partner",
    bio: "Over 20 years of expertise in Finance & Accounting with leadership across global Pharma, IT, and Service industries. A Qualified Accountant and FP&A expert driving 4AT's vision of trusted, technology-enabled transformation.",
    image: raviKrovvidi,
    accent: "#7dd3fc",
    objectPosition: "50% 30%",
  },
  {
    name: "Aruna Sharma",
    role: "Co-Founder & Managing Partner",
    bio: "15+ years in Public Accounting and Financial Services. Part of the pioneer group establishing Big 4 offshore services in India. Deep expertise in SEC audits, Benefit Plan Audits, and M&A Transaction Services.",
    image: arunaSharma,
    accent: "#7dd3fc",
    objectPosition: "50% 45%",
  },
  {
    name: "Vetukuri Prudvi Raju",
    role: "Chief Executive Officer (CEO)",
    bio: "Visionary CEO leading 4AT with a focus on building intelligent, scalable solutions that transform finance and enterprise operations across global markets.",
    image: prudviRaju,
    accent: "#7dd3fc",
    objectPosition: "50% 8%",
  },
  {
    name: "Shashank",
    role: "Associate Partner",
    bio: "7+ years across internal and external audits, financial reporting, and business process reviews. Passionate mentor who has trained numerous professionals in accounting and audit.",
    image: shashank,
    accent: "#7dd3fc",
  },
  {
    name: "Vinita Anand Shastry",
    role: "Associate Partner",
    bio: "Contributing to 4AT's mission of transforming Accounting, Audit, Assurance, and Advisory with deep industry knowledge and client-focused insights. A collaborative leader strengthening our consulting solutions.",
    image: vinitaShastry,
    accent: "#7dd3fc",
    objectPosition: "50% 65%",
  },
  {
    name: "Bhavana Chiriki",
    role: "People & Operations Leader",
    bio: "A new generation leader bringing a people-first approach to transformation. Bridging people, processes, and technology across 4AT Consulting, 4AT.AI, and 4AT Academy to build future-ready organizations.",
    image: bhavanaChiriki,
    accent: "#7dd3fc",
  },
  {
    name: "Vandita Kondapaneni",
    role: "Manager",
    bio: "Driving operational excellence and strategic initiatives across 4AT's growing portfolio. Focused on building scalable systems that empower teams and deliver consistent client value.",
    image: vanditaKondapaneni,
    accent: "#7dd3fc",
    objectPosition: "50% 0%",
  },
  {
    name: "Vivek Varshith Velichala",
    role: "Manager",
    bio: "Spearheading the technology vision at 4AT, building intelligent automation solutions that redefine how finance and audit teams operate in the modern enterprise.",
    image: vivekVelichala,
    accent: "#7dd3fc",
  },
];

export function ExecutiveTeam() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="executive-team" className="relative scroll-mt-24 overflow-hidden bg-transparent site-section">
      <div className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:84px_84px]" />
      <div className="pointer-events-none absolute -left-44 top-24 size-[32rem] rounded-full bg-[#38bdf8]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-44 bottom-24 size-[32rem] rounded-full bg-[#38bdf8]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="section-badge">Our Leadership</span>
          <h2 className="mt-5 site-heading uppercase">
            Our <span className="text-brand-gradient-flow">Executive Team</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-relaxed text-white/70 md:text-lg">
            Experienced leaders united by a shared commitment to client trust,
            operational excellence, and technology-enabled transformation.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {executiveTeam.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: Math.min((index % 4) * 0.07, 0.21),
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setExpandedIndex(index)}
              onMouseLeave={() => setExpandedIndex(null)}
              className="group relative h-[390px] [perspective:1200px]"
            >
              <motion.button
                type="button"
                aria-expanded={expandedIndex === index}
                aria-controls={`executive-bio-${index}`}
                aria-label={`${expandedIndex === index ? "Show profile image for" : "Read biography for"} ${member.name}`}
                onClick={() =>
                  setExpandedIndex((current) => (current === index ? null : index))
                }
                animate={{ rotateY: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                className="relative block h-full w-full cursor-pointer text-left [transform-style:preserve-3d]"
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/12 bg-[#090f1f]/90 shadow-[0_24px_70px_rgba(0,0,0,.34)] [backface-visibility:hidden]">
                  <div className="relative h-[250px] overflow-hidden bg-[#101521]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                      style={{ objectPosition: member.objectPosition ?? "50% 20%" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090f1f] via-transparent to-black/10" />
                    <span
                      className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/45 font-mono text-xs font-black backdrop-blur-md"
                      style={{ color: member.accent }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative h-[140px] px-5 pb-5 pt-4 md:px-6">
                    <div
                      className="absolute inset-x-5 top-0 h-px md:inset-x-6"
                      style={{ background: `linear-gradient(90deg, ${member.accent}, transparent)` }}
                    />
                    <div className="min-w-0">
                      <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-white">
                        {member.name}
                      </h3>
                      <p
                        className="mt-2 text-[11px] font-black uppercase tracking-[0.14em]"
                        style={{ color: member.accent }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  id={`executive-bio-${index}`}
                  className="absolute inset-0 grid grid-rows-[124px_1px_1fr_auto] overflow-hidden rounded-2xl border border-[#7dd3fc]/25 bg-[linear-gradient(145deg,#10182a,#070b16)] p-6 shadow-[0_24px_70px_rgba(0,0,0,.38)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                  <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-[#7dd3fc]/15 blur-3xl" />
                  <div className="relative flex min-h-0 items-start justify-between gap-4 overflow-hidden">
                    <div className="min-w-0">
                      <span className="font-mono text-xs font-black text-[#7dd3fc]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 line-clamp-2 text-xl font-black uppercase leading-tight tracking-tight text-white">
                        {member.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[10px] font-black uppercase leading-snug tracking-[0.12em] text-[#7dd3fc]">
                        {member.role}
                      </p>
                    </div>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#7dd3fc]/25 bg-[#7dd3fc]/10 text-[#7dd3fc]">
                      <RotateCcw className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="relative h-px bg-gradient-to-r from-[#7dd3fc] to-transparent" />
                  <p className="relative line-clamp-6 overflow-hidden pt-5 text-sm font-semibold leading-relaxed text-white/72">
                    {member.bio}
                  </p>
                  <p className="relative border-t border-white/8 pt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#7dd3fc]/70">
                    4AT Executive Leadership
                  </p>
                </div>
              </motion.button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
