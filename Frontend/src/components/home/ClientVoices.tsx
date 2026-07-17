import Image, { type StaticImageData } from "next/image";
import client1 from "@/assets/client1.png";
import client2 from "@/assets/client2.png";
import client3 from "@/assets/client3.png";
import client4 from "@/assets/client4.png";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: StaticImageData;
  logo: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    name: "SARAH MITCHELL",
    role: "CTO, BrightPath Logistics",
    quote:
      "The AI consulting process was smooth and transparent. From strategy to implementation, every step was handled with real expertise and a focus on business outcomes.",
    image: client4,
    logo: "monaco",
  },
  {
    id: 1,
    name: "DANIEL CARTER",
    role: "Operations Manager",
    quote:
      "The team brought innovative ideas to the table while staying aligned with our business goals. A streamlined experience from discovery to deployment.",
    image: client2,
    logo: "Madrid",
  },
  {
    id: 2,
    name: "DANIEL CHEN",
    role: "VP of Engineering, VeloTech",
    quote:
      "Integrating custom machine learning models into our workflow saved us hundreds of hours. 4AT's engineering talent is top-tier.",
    image: client1,
    logo: "velotech",
  },
  {
    id: 3,
    name: "MARCUS VANCE",
    role: "Founder, Theory Partners",
    quote:
      "Their predictive analytics insights helped us capture new markets. The speed and quality of deliverables exceeded our expectations.",
    image: client3,
    logo: "theor",
  },
];

export function ClientVoices() {
  const rollingTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="client-voices"
      className="relative w-full overflow-hidden bg-transparent site-section text-white"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-4xl text-center">
          <span className="section-badge">
            Client Voices
          </span>
          <h2 className="mt-5 site-heading">
            Voices of <span className="text-brand-gradient-flow">trust.</span>
          </h2>
        </div>

        <div className="client-voices-marquee mt-14 overflow-hidden">
          <div className="client-voices-track flex w-max gap-6">
            {rollingTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.id}-${index}`}
                className="flex h-[270px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b1020]/80 shadow-[0_24px_70px_rgba(0,0,0,.28)]"
                style={{ flex: "0 0 min(500px, calc(100vw - 3rem))" }}
              >
                <div className="flex h-[194px] items-center p-6 md:p-7">
                  <p className="line-clamp-5 text-lg font-medium leading-relaxed text-white/90 md:text-xl">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>

                <div className="grid h-[76px] shrink-0 grid-cols-[1fr_auto] border-t border-white/10 bg-[#101429]/80">
                  <div className="flex min-w-0 items-center gap-3 px-5">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="size-10 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-black text-white md:text-base">
                        {testimonial.name}
                      </h3>
                      <p className="truncate text-xs text-white/45 md:text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-28 items-center justify-center border-l border-white/10 px-4">
                    <span className="rounded border border-white/20 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white/45">
                      {testimonial.logo}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
