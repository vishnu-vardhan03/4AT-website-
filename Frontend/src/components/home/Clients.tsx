import Image, { type StaticImageData } from "next/image";
import teamPhoto from "@/assets/team-photo.png";
import logo1 from "@/assets/1st image.png";
import logo3 from "@/assets/3th image.png";
import logo4 from "@/assets/4th image.png";
import logo6 from "@/assets/6th image.png";
import logo7 from "@/assets/7th image.png";
import logo8 from "@/assets/8th image.png";
import logo9 from "@/assets/9th image.png";
import logo10 from "@/assets/10th image.png";

const clientLogos: Array<{ image: StaticImageData; label: string }> = [
  { image: logo1, label: "Client logo 1" },
  { image: logo3, label: "Client logo 3" },
  { image: logo4, label: "Client logo 4" },
  { image: logo6, label: "Client logo 6" },
  { image: logo7, label: "Client logo 7" },
  { image: logo8, label: "Client logo 8" },
  { image: logo9, label: "Client logo 9" },
  { image: logo10, label: "Client logo 10" },
];

export function Clients() {
  const rollingFirstRow = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="bg-transparent site-section text-white">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/20 sm:min-h-0 md:rounded-[2rem]">
          <Image
            src={teamPhoto}
            alt="4AT team"
            className="absolute inset-0 h-full w-full object-cover object-center sm:relative sm:h-auto sm:object-contain"
            priority={false}
          />
          <div className="absolute inset-0 flex flex-col justify-start bg-gradient-to-b from-black/90 via-black/35 to-black/20 p-5 sm:block sm:bg-gradient-to-b sm:from-black/85 sm:via-black/35 sm:to-transparent sm:p-8 md:p-12">
            <p className="section-badge">
              Trusted worldwide
            </p>
            <h2 className="mt-auto max-w-full pb-3 text-left text-4xl font-black uppercase leading-[.9] tracking-tight sm:mt-4 sm:pb-0 sm:text-center sm:text-[clamp(2.5rem,6.8vw,8.8rem)]">
              <span className="block sm:whitespace-nowrap">
                Helping{" "}
                <span className="inline-block text-brand-gradient-flow drop-shadow-[0_0_28px_rgba(125,211,252,0.38)]">
                  120+ clients
                </span>
              </span>
              <span className="mt-1 block">worldwide.</span>
            </h2>
          </div>
        </div>

        <div className="client-logo-marquee mt-10 overflow-hidden border-y border-white/10 py-8">
          <div className="client-logo-track flex w-max items-center gap-16">
            {rollingFirstRow.map((logo, index) => (
              <Image
                key={`${logo.label}-${index}`}
                src={logo.image}
                alt={logo.label}
                className="h-14 w-44 shrink-0 object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
