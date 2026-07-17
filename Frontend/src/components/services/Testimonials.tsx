import Image from "next/image";

const items = [
  {
    name: "Sarah Mitchell",
    role: "CTO, BrightPath Logistics",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "The AI consulting process was smooth and transparent. From strategy to implementation, every step was handled with real expertise and a focus on business outcomes.",
    location: "Monaco"
  },
  {
    name: "Daniel Carter",
    role: "Operations Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "The team brought innovative ideas to the table while staying aligned with our business goals. A streamlined experience from discovery to deployment.",
    location: "Madrid"
  },
  {
    name: "Daniel Chen",
    role: "VP of Engineering, VeloTech",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "Integrating custom machine learning into our workflow saved us hundreds of hours. 4AT's engineering talent is top notch and extremely responsive.",
    location: "Tokyo"
  },
  {
    name: "Emma Davis",
    role: "CMO, GlobalBrand",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "Their hybrid delivery model is unique. We get high-end strategic consulting combined with rapid, cost-effective automation engineering that scales.",
    location: "London"
  },
  {
    name: "Sophia Martinez",
    role: "Director of Ops, ScaleUp",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "Scaling our systems used to be a bottleneck. With 4AT's smart technology solutions, we handle volume surges with full confidence and zero overhead.",
    location: "Austin"
  },
  {
    name: "Marcus Aurelius",
    role: "Head of Infrastructure, NexaFlow",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "The migration of our core pipeline infrastructure went without a single minute of downtime. Their consulting was precise and delivery was execution-focused.",
    location: "Rome"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-transparent py-24 lg:py-32 overflow-hidden border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-sky-500/5 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 mb-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-6">
            Testimonials
          </div>
          <h2 className="text-display text-[clamp(2.5rem,5.2vw,4.5rem)] text-white font-black leading-[0.95]">
            In their own words
            <span className="block mt-2 py-2 px-1 text-[clamp(1.4rem,3vw,2.6rem)] tracking-tight bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(99,102,241,0.25)] animate-gradient-x">
              What our clients say about us
            </span>
          </h2>
        </div>
      </div>

      {/* Infinite scrolling marquee wrapper with fade edges */}
      <div className="relative w-full overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 md:before:w-48 before:bg-gradient-to-r before:from-[#01030e] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 md:after:w-48 after:bg-gradient-to-l after:from-[#01030e] after:to-transparent after:z-10">
        <div className="flex w-max gap-6 marquee hover:[animation-play-state:paused] py-2">
          {[...items, ...items].map((t, idx) => (
            <div
              key={idx}
              className="group relative w-[350px] md:w-[420px] shrink-0 rounded-2xl p-6 md:p-8 border border-white/15 bg-[#0b1020]/85 overflow-hidden flex flex-col justify-between"
              style={{ boxShadow: "inset 0 1px 0 rgba(34, 211, 238, 0.08)" }}
            >
              {/* Glow Accent Blob */}
              <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full blur-3xl bg-sky-500/10 pointer-events-none" />

              {/* Subtle top indicator line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-sky-500/30 opacity-40 group-hover:opacity-100 transition-opacity" />
              <blockquote className="text-white/80 text-sm md:text-base leading-relaxed font-light mb-8">
                &quot;{t.quote}&quot;
              </blockquote>

              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                <div className="flex items-center gap-3.5">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40} height={40} className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <div className="font-bold text-white text-xs md:text-sm tracking-wider uppercase">
                      {t.name}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/50 mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>
                {t.location && (
                  <div className="text-[9px] md:text-[10px] font-semibold tracking-widest text-sky-400 border border-sky-500/20 rounded-md px-2.5 py-1 bg-sky-500/5 uppercase">
                    {t.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
