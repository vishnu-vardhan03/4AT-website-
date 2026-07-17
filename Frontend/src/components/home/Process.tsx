"use client";

import { useState } from "react";
import Link from "next/link";

const pillars = [
  {
    eyebrow: "Hybrid Services",
    title: "The work, done.",
    body: "End-to-end accounting, audit, tax, controls, and FP&A - delivered by senior practitioners and AI agents working as one pod. Subscribe on the website, and we run it.",
    link: "Explore services",
    href: "/services",
    color: "#38bdf8",
  },
  {
    eyebrow: "4AT AI",
    title: "The engine inside.",
    body: "Finance-native AI agents - Iris reconciles, Guardian monitors controls, Atlas reports, Connector plugs into your ERP. Standard in every subscription. Available as a private deployment for firms and enterprises.",
    link: "See 4AT AI",
    href: "/product",
    color: "#a78bfa",
  },
  {
    eyebrow: "4AT Academy",
    title: "The talent behind every engagement.",
    body: "The same training pipeline that produces our senior practitioners also produces hire-ready finance talent for your team. Train them, hire them, or let us run the work for you.",
    link: "Explore the Academy",
    href: "/academy",
    color: "#2dd4bf",
  },
];

export function Process() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-transparent site-section text-white"
    >
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-4xl text-center">
          <span className="section-badge">
            The 4AT ecosystem
          </span>
          <h2 className="mt-5 site-heading">
            Three pillars.{" "}
            <span className="text-brand-gradient-flow">One ecosystem.</span> Built so finance
            teams never outgrow us.
          </h2>
          <p className="site-subheading mt-6 text-white/75 mx-auto">
            Most providers sell you one thing - services, or software, or talent. 4AT runs all
            three as a single ecosystem, so the AI that automates your books is built by the same
            team that trains the people who run them.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.eyebrow}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={`group relative min-h-[430px] overflow-hidden rounded-2xl border p-7 transition duration-500 md:p-8 ${
                active === index
                  ? "border-white/35 bg-white/[0.07]"
                  : "border-white/15 bg-[#0b1020]/75"
              }`}
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 82% 12%, ${pillar.color}24, transparent 40%)`,
                }}
              />

              {pillars.map((orb, orbIndex) =>
                orbIndex !== index ? (
                  <span
                    key={orb.eyebrow}
                    aria-hidden="true"
                    className="absolute size-8 rounded-full opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-70"
                    style={{
                      backgroundColor: orb.color,
                      boxShadow: `0 0 28px ${orb.color}`,
                      left: orbIndex === 0 ? "12%" : "78%",
                      top: orbIndex === 1 ? "20%" : "72%",
                      animation:
                        active === index
                          ? `ecosystem-orbit ${orbIndex === 0 ? "4.5s" : "6s"} linear infinite`
                          : "none",
                    }}
                  />
                ) : null,
              )}

              <div className="relative flex h-full flex-col">
                <span className="relative block size-28" aria-hidden="true">
                  <span
                    className="absolute left-4 top-4 size-20 rounded-full transition-transform duration-500"
                    style={{
                      backgroundColor: pillar.color,
                      boxShadow: `0 0 55px ${pillar.color}80`,
                      transform: active === index ? "scale(1.12)" : "scale(1)",
                    }}
                  />
                  <span
                    className="absolute inset-0 rounded-full border border-white/15"
                    style={{ borderColor: `${pillar.color}45` }}
                  />
                  <span
                    className="card-orbit-dot absolute left-1/2 top-1/2 size-3 rounded-full"
                    style={{
                      backgroundColor: pillar.color,
                      boxShadow: `0 0 18px ${pillar.color}`,
                    }}
                  />
                </span>
                <p
                  className="mt-10 text-xs font-bold uppercase tracking-[.2em]"
                  style={{ color: pillar.color }}
                >
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-4 text-3xl font-black leading-tight">{pillar.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-white/75 md:text-base">
                  {pillar.body}
                </p>
                <Link
                  href={pillar.href}
                  className="mt-auto pt-8 text-sm font-bold"
                  style={{ color: pillar.color }}
                >
                  {pillar.link} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          <p className="text-xl font-semibold leading-relaxed text-white md:text-2xl">
            One ecosystem so your finance function can grow - from books, to controls, to talent -
            without ever changing vendors.
          </p>
          <a
            href="#use-cases"
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#7dd3fc] transition hover:text-white"
          >
            See where this creates the most value <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
