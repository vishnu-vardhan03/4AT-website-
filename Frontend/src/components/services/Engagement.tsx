const steps = [
  {
    n: "1",
    title: "Subscribe",
    timeline: "Day 0",
    desc: "Pick the service(s) you need. Pay your first month. That's the entire procurement cycle. No SOW. No legal review. No 6-week sales cycle."
  },
  {
    n: "2",
    title: "Onboard",
    timeline: "Days 1–7",
    desc: "Connector ingests your ERP, ledgers, and policies. Your dedicated pod of AI agents plus senior practitioners is live within 7 days. You don't change tools. We meet you inside the systems you already use."
  },
  {
    n: "3",
    title: "We run it",
    timeline: "Day 8 onward",
    desc: "Iris reconciles. Guardian monitors controls. Atlas builds your reports. Senior practitioners review everything before it reaches you. You see it all in one dashboard. One bill. One team."
  },
  {
    n: "4",
    title: "You scale",
    timeline: "Month 3 and beyond",
    desc: "Add controls. Add tax. Add audit readiness. Add a vCFO. Every new service line plugs into the same subscription. This is where most clients start with one service and end the year running their entire finance function on 4AT."
  }
];

export function Engagement() {
  return (
    <section id="engagement" className="py-24 bg-transparent overflow-hidden border-t border-b border-white/5 relative">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-6">
              How an engagement works
            </div>
            <h2 className="text-display text-[clamp(2.5rem,5.2vw,4.5rem)] text-white font-black leading-[0.95]">
              Four steps
              <span className="block mt-2 py-2 px-1 text-[clamp(1.4rem,3vw,2.6rem)] tracking-tight bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.25)] animate-gradient-x">
                No procurement cycle
              </span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 self-end text-lg text-white leading-relaxed">
            Every service above runs on the same engagement model, whether you&apos;re subscribing to bookkeeping or hiring a Virtual CFO.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block pointer-events-none absolute left-[44px] right-[calc(25%-44px)] top-[44px] h-[2px] z-0">
              <div className="absolute inset-0 bg-sky-400" />
            </div>

            {steps.map((s) => {
              return (
                <div
                  key={s.title}
                  className="group relative transition-all duration-500 ease-out hover:-translate-y-2"
                >
                  <div
                    className="relative z-10 flex items-center justify-center h-[88px] w-[88px] rounded-full bg-[#01030e] border border-sky-400 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.15)] filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.25)] group-hover:scale-110 group-hover:border-sky-300 group-hover:text-sky-300 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all duration-500 ease-out cursor-default select-none"
                  >
                    <span>{s.n}</span>
                  </div>
                  
                  <h3 className="mt-8 text-2xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors duration-500 ease-out">
                    {s.title}
                  </h3>
                  <span className="block text-xs font-bold mt-1.5 uppercase tracking-widest select-none text-sky-400/80">
                    {s.timeline}
                  </span>
                  
                  <p className="mt-4 leading-relaxed text-sm lg:text-base font-normal text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500 ease-out">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
