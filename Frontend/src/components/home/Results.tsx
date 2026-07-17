"use client";

import { TiltCard } from "@/components/home/TiltCard";

const aiTasks = [
  "Document intake and extraction",
  "Workflow routing and task triggers",
  "Reconciliation at 99.7% match accuracy",
  "First-pass reports and journal entries",
  "Anomaly and exception flagging",
];

const expertTasks = [
  "Technical accounting judgment",
  "Review, sign-off, and final accountability",
  "Complex transactions and exceptions",
  "Controls remediation and audit defense",
  "Client communication and decisions",
];

function TaskColumn({
  title,
  label,
  tasks,
  footer,
  accent,
}: {
  title: string;
  label: string;
  tasks: string[];
  footer: string;
  accent: string;
}) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0b1020]/85 p-6 md:p-8"
      style={{ boxShadow: `inset 0 1px 0 ${accent}22` }}
    >
      <div
        className="absolute -right-16 -top-16 size-48 rounded-full blur-3xl"
        style={{ backgroundColor: `${accent}33` }}
      />
      <div className="relative">
        <span
          className="text-xs font-bold uppercase tracking-[.2em]"
          style={{ color: accent }}
        >
          {label}
        </span>
        <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">{title}</h3>
        <ul className="mt-7 space-y-0 border-t border-white/10">
          {tasks.map((task, index) => (
            <li
              key={task}
              className="flex gap-4 border-b border-white/10 py-4 text-sm leading-relaxed text-white/85 md:text-base"
            >
              <span className="pt-0.5 text-xs font-bold" style={{ color: accent }}>
                0{index + 1}
              </span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm font-semibold" style={{ color: accent }}>
          {footer}
        </p>
      </div>
    </article>
  );
}

export function Results() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-transparent site-section text-white"
    >
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="max-w-4xl">
          <span className="section-badge">
            How Hybrid works
          </span>
          <h2 className="mt-5 max-w-4xl site-heading">
            The science goes to{" "}
            <span className="text-brand-gradient-flow">AI.</span> The art stays with our
            experts.
          </h2>
          <p className="site-subheading mt-6 max-w-4xl text-white/75">
            Hybrid isn&apos;t &quot;people plus software.&quot; It&apos;s a structured
              operating model that routes every task to the layer that does it best, with a
            single dashboard where you see all of it.
          </p>
        </div>

        {/* Two cards — each wrapped in a TiltCard for 3D hover animation */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <TiltCard>
            <TaskColumn
              title="AI handles the science"
              label="Automation layer"
              tasks={aiTasks}
              footer="Powered by Iris, Atlas, Connector"
              accent="#2dd4bf"
            />
          </TiltCard>
          <TiltCard>
            <TaskColumn
              title="Senior practitioners handle the art"
              label="Expert layer"
              tasks={expertTasks}
              footer="Led by senior CPAs, controllers, and tax leads"
              accent="#a78bfa"
            />
          </TiltCard>
        </div>

        <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.035] px-6 py-8 text-center md:px-10 md:py-10">
          <span className="section-badge">
            What changes for you
          </span>
          <p className="mt-3 text-xl font-bold text-white md:text-2xl">
            The result for your finance team:
          </p>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#process"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#7dd3fc] transition hover:text-white"
          >
            That&apos;s the model. Here&apos;s why finance teams pick 4AT specifically{" "}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
