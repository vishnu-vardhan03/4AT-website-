"use client";

import Link from "next/link";

const paths = [
  { title: "Ready to start", audience: "Accounting Firms, CFO’s and Business owners who have made the decision and have strong understanding of what they need and how they wanted to operate their business.", body: "Subscribe: quick onboarding, hassle-free integrations, live instantly, cancel anytime.", action: "Start your subscription", href: "/contact", color: "#38bdf8" },
  { title: "Want to talk first", audience: "Those who need additional information, wanted customize their product and services, explore other possibilities.", body: "Book a 30 min quick call, quick response from us, our professional executives connect with you and customize your requirements for going live.", action: "Book a call", href: "/contact", color: "#a78bfa" },
  { title: "Explore AI stand alone", audience: "Businesses, and professionals looking for AI solutions only and would wanted to operate the relationship in SAAS model and seeing the demo, product updates, features and other techno functional aspects", body: "", action: "Subscribe for SAAS", href: "/contact", color: "#2dd4bf" },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-transparent site-section text-white">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="max-w-4xl text-left">
          <span className="section-badge">Choose your path</span>
          <h2 className="mt-5 site-heading">
            Stop choosing between firms that drain your resources and{" "}
            <span className="text-brand-gradient-flow">AI you can’t audit.</span>
          </h2>
          <p className="site-subheading mt-6 text-white/75">
            AI powers the speed. Our experienced finance professionals bring the judgment. And you stay focused on running your business. Hassel free entry and anytime exit
          </p>
          <p className="mt-5 text-lg font-bold leading-relaxed text-white md:text-xl">
            Choose the path that fits where you are: and scales with where you’re going.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {paths.map((path, index) => (
            <article key={path.title} className="relative flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b1020]/85 p-6 md:min-h-[390px] md:p-8">
              <div className="absolute -right-10 -top-10 size-44 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: path.color }} />
              <div className="relative">
                <span className="text-sm font-bold" style={{ color: path.color }}>0{index + 1}</span>
                <h3 className="mt-4 text-2xl font-black leading-tight md:mt-6 md:text-3xl">{path.title}</h3>
                <p className="mt-5 text-sm font-semibold leading-relaxed" style={{ color: path.color }}>{path.audience}</p>
                {path.body && <p className="mt-5 text-sm leading-relaxed text-white/75 md:text-base">{path.body}</p>}
              </div>
              <Link href={path.href} className="relative mt-7 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold md:mt-auto md:pt-8" style={{ color: path.color }}>
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
