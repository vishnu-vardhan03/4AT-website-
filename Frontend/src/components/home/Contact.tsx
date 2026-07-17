"use client";

import Link from "next/link";

const paths = [
  { title: "Ready to start", audience: "For CFOs and firm owners who've made the decision", body: "Subscribe in minutes. Your dedicated pod is live within 7 days. Cancel any month.", action: "Start your subscription", href: "/contact", color: "#38bdf8" },
  { title: "Want to talk first", audience: "For buyers who want a senior practitioner on the call", body: "Book a 30-minute call. No deck. We'll ask about your current finance stack and tell you whether Hybrid actually fits.", action: "Book a call", href: "/contact", color: "#a78bfa" },
  { title: "Exploring the AI separately", audience: "For firms and enterprises who want the AI agents on their own infrastructure", body: "Join the 4AT AI waitlist or request a private deployment briefing.", action: "See 4AT AI", href: "/contact", color: "#2dd4bf" },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-transparent site-section text-white">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="max-w-4xl text-left">
          <span className="section-badge">Choose your path</span>
          <h2 className="mt-5 site-heading">
            Stop choosing between firms you can&apos;t afford and{" "}
            <span className="text-brand-gradient-flow">AI you can&apos;t audit.</span>
          </h2>
          <p className="site-subheading mt-6 text-white/75">
            4AT Hybrid is the third option. AI runs the speed, our senior practitioners run the judgment, and you run your business. Pick the path that fits where you are.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {paths.map((path, index) => (
            <article key={path.title} className="relative flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b1020]/85 p-7 md:p-8">
              <div className="absolute -right-10 -top-10 size-44 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: path.color }} />
              <div className="relative">
                <span className="text-sm font-bold" style={{ color: path.color }}>0{index + 1}</span>
                <h3 className="mt-6 text-3xl font-black leading-tight">{path.title}</h3>
                <p className="mt-5 text-sm font-semibold leading-relaxed" style={{ color: path.color }}>{path.audience}</p>
                <p className="mt-5 text-sm leading-relaxed text-white/75 md:text-base">{path.body}</p>
              </div>
              <Link href={path.href} className="relative mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-bold" style={{ color: path.color }}>
                {path.action} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] p-[1px] shadow-[0_24px_80px_rgba(56,189,248,0.12)]">
          <p className="rounded-xl bg-[#060914]/90 px-6 py-7 text-center text-2xl font-black leading-tight tracking-tight text-white md:px-10 md:py-9 md:text-4xl">
            Every month you wait is another{" "}
            <span className="text-brand-gradient-flow">close cycle</span>, another{" "}
            <span className="text-brand-gradient-flow">audit prep</span>, another{" "}
            <span className="text-brand-gradient-flow">tax season</span> run the old way.
          </p>
        </div>
      </div>
    </section>
  );
}
