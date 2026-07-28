export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-transparent py-24 lg:py-32 overflow-hidden border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-sky-500/5 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-8">
          Case Studies & Testimonials
        </div>
        
        <h2 className="text-display text-[clamp(2.2rem,4.5vw,3.5rem)] text-white font-black leading-tight mb-6">
          Quiet confidence, real outcomes.
        </h2>
        
        <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
          We&apos;re building the case studies now, written by the CFOs and firm owners who switched. Want to be one of the first?
        </p>

        <div className="flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3.5 text-sm font-semibold text-black hover:bg-sky-400 transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] cursor-pointer select-none"
          >
            Connect with us
          </a>
        </div>
      </div>
    </section>
  );
}
