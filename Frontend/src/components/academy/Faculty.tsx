"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionPill } from "./SectionPill";

interface Mentor {
  id: string;
  name: string;
  role: string;
  image: string;
}

const mentorsData: Mentor[] = [
  {
    id: "jose",
    name: "Jose Abraham",
    role: "FP&A & Financial Analysis",
    image: "/faculty/david.webp",
  },
  {
    id: "rajesh",
    name: "Rajesh Vennapureddy",
    role: "F&A Operations",
    image: "/faculty/emily.webp",
  },
  {
    id: "surya",
    name: "Surya Teja",
    role: "ERP & Finance Systems",
    image: "/faculty/emily.webp",
  },
  {
    id: "aruna",
    name: "Aruna Sharma",
    role: "Audit",
    image: "/faculty/robert.webp",
  },
  {
    id: "shashank",
    name: "Shashank Bala",
    role: "Global Risk & Compliance",
    image: "/faculty/sarah.webp",
  },
  {
    id: "bhagat",
    name: "Bhagat Reddy",
    role: "AI in F&A",
    image: "/faculty/robert.webp",
  }
];

export function Faculty({ sectionId = "faculty" }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // GSAP scroll reveals
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faculty-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef.current || undefined);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`w-full section-padding overflow-x-hidden relative mentors-section-layout ${
        isAnimated ? "animate-active" : ""
      }`}
    >
      <style>{`
        .mentors-section-layout {
          background-color: transparent;
          color: #ffffff;
        }
      `}</style>

      {/* Subtle Background Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      <div className="site-shell relative z-10">

        {/* Header Block */}
        <div className="flex flex-col items-start mb-14 faculty-reveal">
          <SectionPill className="mb-6">
            EXECUTIVE MENTORSHIP
          </SectionPill>

          <h2 className="section-title">
            Learn from people who{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">
              do the job
            </span>
          </h2>

          <p className="section-desc max-w-[620px]">
            Mentored by finance leaders and practitioners from 4AT&apos;s consulting practice.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12 place-items-center faculty-reveal">
          {mentorsData.map((mentor) => (
            <div
              key={mentor.id}
              className="group flex flex-col items-center gap-3 text-center"
            >
              {/* Circular Portrait */}
              <div className="relative w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] lg:w-[104px] lg:h-[104px] rounded-full overflow-hidden bg-[#07090D] border border-[#5EEAD4]/25 shadow-[0_0_16px_rgba(42,205,255,0.3),0_0_28px_rgba(156,91,255,0.15)] transition-all duration-300 group-hover:border-[#5EEAD4]/50 group-hover:scale-[1.05] group-hover:shadow-[0_0_22px_rgba(42,205,255,0.45),0_0_40px_rgba(156,91,255,0.25)]">
                <Image
                  src={mentor.image}
                  fill
                  sizes="120px"
                  className="object-cover brightness-95 group-hover:brightness-100 transition-all duration-300"
                  alt={mentor.name}
                />
              </div>

              {/* Name / Designation */}
              <div>
                <h4 className="text-sm font-bold font-sans text-white transition-colors duration-300 group-hover:text-[#5EEAD4]">
                  {mentor.name}
                </h4>
                <p className="text-[11px] text-white/50 font-sans mt-0.5 leading-snug line-clamp-2 max-w-[128px]">
                  {mentor.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
