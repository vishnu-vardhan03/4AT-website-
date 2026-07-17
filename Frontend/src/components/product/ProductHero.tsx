"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#04060f]"
    >
     {/* Background */}
<div className="absolute inset-0">

  {/* Video Background */}
  <video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  className="absolute inset-0 w-full h-full object-cover"
  style={{
    objectPosition: "center center",
  }}
>
  <source src="/hero-bg.mp4" type="video/mp4" />
</video>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-[#04060f]/55 md:bg-[#04060f]/65" />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "900px",
            height: "900px",
            background:
              "radial-gradient(circle, rgba(167,139,250,.18) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        {/* Bottom Grid */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[250px] opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167,139,250,.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167,139,250,.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: "perspective(800px) rotateX(75deg)",
            transformOrigin: "bottom",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(4,6,15,.25) 55%, rgba(4,6,15,.95) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-8"
            style={{
              border: "1px solid rgba(167,139,250,.25)",
              background: "rgba(167,139,250,.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-violet-400" />
            <span
              className="uppercase tracking-[4px] text-xs font-medium"
              style={{ color: "#a78bfa" }}
            >
              Applied AI For Finance
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-black tracking-[-0.05em] leading-[0.9]">
  <span className="block text-white text-5xl md:text-7xl lg:text-8xl">
    FINANCE-NATIVE AI
  </span>

  <span className="block bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl">
    FOR ACCOUNTING &
  </span>

  <span className="block text-violet-400 text-3xl md:text-5xl my-2">
    {/* ✦  */} 
  </span>

  <span className="block text-white text-4xl md:text-6xl lg:text-7xl">
    FINANCE WORKFLOWS
  </span>
</h1>
          {/* Description */}
          <p
            className="mx-auto mt-8 max-w-3xl leading-relaxed px-4"
            style={{
              fontSize: "clamp(1.1rem,1.6vw,1.35rem)",
              color: "white",
            }}
          >
            4AT brings finance-native AI into the workflows where accounting
            teams lose the most time, reconciliation, exception review,
            document handling, and reporting, so automation fits the realities
            of finance, not just the promise of software.
          </p>

          {/* Capability Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8">
            {[
              "Reconciliation",
              "Exception Review",
              "Document Handling",
              "Financial Reporting",
              "Audit Support",
              "ERP Integration",
            ].map((item) => (
              <span
                key={item}
                className="px-3 md:px-5 py-2 rounded-xl text-xs md:text-sm"
                style={{
                  border: "1px solid rgba(167,139,250,.2)",
                  background: "rgba(255,255,255,.02)",
                  color: "white",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
            <a
              href="/product#capabilities"
              className="px-8 py-4 rounded-xl text-white font-semibold transition-all hover:-translate-y-1 text-center"
              style={{
                background:
                  "linear-gradient(90deg,#a78bfa,#c084fc)",
              }}
            >
              Explore AI Solutions →
            </a>

            <a
              href="/contact"
              className="px-8 py-4 rounded-xl text-white font-semibold border text-center"
              style={{
                borderColor: "rgba(255,255,255,.15)",
                background: "rgba(255,255,255,.03)",
              }}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[3px]"
        style={{ color: "rgba(255,255,255,.25)" }}
      >
        Scroll
      </div>
    </section>
  );
}
