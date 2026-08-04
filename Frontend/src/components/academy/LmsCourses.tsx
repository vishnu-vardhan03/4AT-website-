"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lmsCourses } from "@/components/academy/data";
import { Lock, ArrowLeft, ArrowRight, Star, Clock, Check, Building2, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SectionPill } from "@/components/academy/SectionPill";

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Accounting & ERP":
      return {
        text: "text-[#5EEAD4]", // Cyan
        bg: "bg-[#5EEAD4]",
        bgSubtle: "bg-[#5EEAD4]/10",
        border: "rgba(94, 234, 212, 0.3)",
        borderHover: "rgba(167, 139, 250, 0.25)",
        btnBg: "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]",
        btnText: "text-black",
        accentHex: "#5EEAD4",
        badgeText: "ACCOUNTING"
      };
    case "Audit & Risk":
      return {
        text: "text-[#60A5FA]", // Blue
        bg: "bg-[#60A5FA]",
        bgSubtle: "bg-[#60A5FA]/10",
        border: "rgba(96, 165, 250, 0.3)",
        borderHover: "rgba(167, 139, 250, 0.25)",
        btnBg: "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]",
        btnText: "text-black",
        accentHex: "#60A5FA",
        badgeText: "AUDIT"
      };
    case "Global Taxation":
      return {
        text: "text-[#A78BFA]", // Lavender
        bg: "bg-[#A78BFA]",
        bgSubtle: "bg-[#A78BFA]/10",
        border: "rgba(167, 139, 250, 0.3)",
        borderHover: "rgba(167, 139, 250, 0.25)",
        btnBg: "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]",
        btnText: "text-black",
        accentHex: "#A78BFA",
        badgeText: "TAXATION"
      };
    case "FP&A & Modeling":
      return {
        text: "text-[#8B5CF6]", // Violet
        bg: "bg-[#8B5CF6]",
        bgSubtle: "bg-[#8B5CF6]/10",
        border: "rgba(139, 92, 246, 0.3)",
        borderHover: "rgba(167, 139, 250, 0.25)",
        btnBg: "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]",
        btnText: "text-black",
        accentHex: "#8B5CF6",
        badgeText: "FP&A"
      };
    default:
      return {
        text: "text-[#A78BFA]",
        bg: "bg-[#A78BFA]",
        bgSubtle: "bg-[#A78BFA]/10",
        border: "rgba(167, 139, 250, 0.3)",
        borderHover: "rgba(167, 139, 250, 0.25)",
        btnBg: "bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]",
        btnText: "text-black",
        accentHex: "#A78BFA",
        badgeText: "COURSE"
      };
  }
};

export function LmsCourses({ sectionId = "courses" }: { sectionId?: string }) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Accounting & ERP", "Audit & Risk", "Global Taxation", "FP&A & Modeling"];

  const filteredCourses = lmsCourses.filter(
    (course) => selectedCategory === "All" || course.category === selectedCategory
  );

  useEffect(() => {
    cardRefs.current = [];
  }, [selectedCategory]);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 290;
    container.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 290;
    container.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, [isMobile]);

  // GSAP Interaction for Card Hover Dimming/Lifting
  const handleMouseEnter = (index: number) => {
    if (isMobile) return;
    setHoveredIndex(index);

    const cards = cardRefs.current.filter(Boolean);
    cards.forEach((card, idx) => {
      if (idx === index) {
        gsap.to(card, {
          y: -6,
          borderColor: "rgba(167, 139, 250, 0.25)",
          boxShadow: "0 10px 40px rgba(139, 92, 246, 0.10)",
          opacity: 1,
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(card, {
          opacity: 0.55,
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHoveredIndex(null);

    const cards = cardRefs.current.filter(Boolean);
    cards.forEach((card) => {
      gsap.to(card, {
        y: 0,
        borderColor: "rgba(255, 255, 255, 0.07)",
        boxShadow: "none",
        opacity: 1,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="w-full section-padding font-sans select-none overflow-x-hidden relative"
      style={{ backgroundColor: "#07090D", color: "#ffffff" }}
    >
      
      {/* Subtle Gradient Blobs replacing original big orb */}
      <div 
        className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/5 blur-[100px] pointer-events-none z-0 animate-pulse" 
        style={{ animationDuration: "12s" }} 
      />
      <div 
        className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[#5EEAD4]/5 blur-[120px] pointer-events-none z-0 animate-pulse" 
        style={{ animationDuration: "16s" }} 
      />

      {/* Diagonal Light Lines Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] rotate-12 border-t border-b border-white/[0.04] pointer-events-none" />
        <div className="absolute top-[-30%] left-[-30%] w-[160%] h-[160%] -rotate-12 border-l border-r border-white/[0.03] pointer-events-none" />
      </div>

      <div className="site-shell relative z-10">
        
        {/* Section Header */}
        <div id="explore-pathways-header" className="flex flex-col items-start text-left max-w-[850px] mb-10">
          <SectionPill className="mb-7">
            PROGRAMS
          </SectionPill>

          <h2 className="section-title">
            Programs that turn{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">graduates</span>{" "}
            into professionals.
          </h2>
        </div>

        {/* Tools Strip */}
        <div className="border border-white/[0.06] rounded-[24px] bg-[#0b0e1a]/50 backdrop-blur-xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/40 block mb-2">
                The tools the industry actually uses
              </span>
              <p className="text-sm sm:text-base font-semibold text-white font-display leading-snug mb-5">
                Hands-on, practical training on the platforms you&apos;ll use from day one.
              </p>
              {/* Tool chips */}
              <div className="flex flex-wrap gap-2">
                {["QuickBooks (QBO)", "SAP", "Bill.com", "Excel", "NetSuite", "4AT AI Tools"].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-full text-[11px] font-semibold font-mono tracking-wide border border-emerald-500/25 bg-emerald-500/5 text-emerald-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-[1px] bg-white/[0.06] self-stretch" />
            {/* Facts */}
            <div className="flex flex-col gap-3 shrink-0 justify-center">
              {["Classroom + Live Online", "6-month LMS access", "Practice-led — simulations & live projects"].map((fact) => (
                <div key={fact} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] shrink-0" />
                  <span className="text-[13px] text-white/65 font-sans">{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Category Pills & Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6 border-b border-white/5 pb-6">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-[#5EEAD4] text-black border-[#5EEAD4] shadow-[0_0_15px_rgba(94,234,212,0.25)]"
                      : "bg-white/[0.02] text-slate-400 border-[rgba(94,234,212,0.18)] hover:border-[#5EEAD4] hover:shadow-[0_0_12px_rgba(94,234,212,0.12)] hover:text-white"
                  }`}
                >
                  {cat === "All" ? "ALL" : cat}
                </button>
              );
            })}
          </div>

          {/* Navigation Arrows (Secondary Button style) */}
          <div className="flex items-center gap-3 shrink-0 justify-end">
            <Link
              href="/academy/courses"
              className="h-11 px-5 rounded-[16px] border border-[#5EEAD4]/30 bg-[#5EEAD4]/10 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#5EEAD4] hover:bg-[#5EEAD4] hover:text-black hover:shadow-[0_0_15px_rgba(94,234,212,0.22)] active:scale-95 transition-all"
              aria-label="View all courses"
            >
              View all courses
            </Link>
            <button
              onClick={scrollLeft}
              className="w-11 h-11 rounded-[16px] border border-white/10 bg-transparent flex items-center justify-center text-white hover:border-[#A78BFA] hover:shadow-[0_0_15px_rgba(167,139,250,0.2)] active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="w-11 h-11 rounded-[16px] border border-white/10 bg-transparent flex items-center justify-center text-white hover:border-[#A78BFA] hover:shadow-[0_0_15px_rgba(167,139,250,0.2)] active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div className="relative w-full">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pt-4 pb-8 -mt-4 w-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredCourses.map((course, idx) => {
              const isLocked = course.locked;
              const colors = getCategoryColor(course.category);

              return (
                <div
                  key={course.title}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  data-cursor-view="true"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    const slug = course.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    router.push(`/academy/courses/${slug}`);
                  }}
                  className={`snap-start shrink-0 w-[280px] sm:w-[310px] md:w-[335px] group relative flex flex-col justify-between p-4.5 sm:p-5 rounded-[22px] border border-white/10 bg-[#090B12] cursor-pointer transition-all duration-300 min-h-[340px] ${
                    isMobile ? "active:scale-[0.98] transition-transform duration-200" : ""
                  }`}
                  style={{
                    willChange: "transform",
                    borderColor: hoveredIndex === idx ? "rgba(167, 139, 250, 0.35)" : "rgba(255, 255, 255, 0.09)",
                    boxShadow: hoveredIndex === idx ? "0 12px 40px rgba(139, 92, 246, 0.15)" : "none"
                  }}
                >
                  {/* Thumbnail Image Container (Preserving existing image) */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#04060f] mb-3 shrink-0">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Overlaid Badge Top-Right */}
                    <div className="absolute top-2.5 right-2.5 z-30 px-3 py-1 rounded-full bg-[rgba(91,33,182,0.55)] border border-[rgba(167,139,250,0.40)] backdrop-blur-md shadow-lg">
                      <span className="text-[10px] font-extrabold uppercase text-[#D8B4FE] tracking-wider font-sans whitespace-nowrap">
                        {course.badge || "FLAGSHIP • FRESHERS"}
                      </span>
                    </div>

                    {/* Lock Overlay for locked courses */}
                    {isLocked && (
                      <div className="absolute inset-0 bg-[#04060f]/60 backdrop-blur-[2px] flex items-center justify-center z-20">
                        <div className="bg-[#0b0e1a]/95 text-white rounded-full p-2 shadow-md border border-white/10">
                          <Lock className="size-3.5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Main Body */}
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      {/* Metadata Row (Below Image) */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2.5 min-h-[26px]">
                        {course.duration && (
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F131C] border border-white/10 text-slate-200 font-medium text-[11px] whitespace-nowrap">
                            <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{course.duration}</span>
                          </div>
                        )}
                        {course.mode && (
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F131C] border border-white/10 text-slate-200 font-medium text-[11px] whitespace-nowrap">
                            <Monitor className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{course.mode}</span>
                          </div>
                        )}
                      </div>

                      {/* Category Label */}
                      <span className="text-[10px] font-medium tracking-wider uppercase text-slate-400 font-mono block mt-1">
                        {course.category === "Accounting & ERP" ? "F&A" : course.category === "Audit & Risk" ? "D&A" : course.category === "Global Taxation" ? "T&I" : course.category === "FP&A & Modeling" ? "B&M" : course.category}
                      </span>

                      {/* Title */}
                      <h3 className="font-bold text-lg sm:text-[1.2rem] tracking-tight text-white transition-colors duration-300 group-hover:text-[#A78BFA] font-sans mt-0.5 leading-snug line-clamp-1">
                        {course.title}
                      </h3>

                      {/* Subtitle */}
                      {course.subtitle && (
                        <p className="text-[12.5px] font-semibold text-[#818CF8] mt-0.5 line-clamp-1">
                          {course.subtitle}
                        </p>
                      )}

                      {/* Description */}
                      <p className="mt-2 text-[12px] font-normal leading-relaxed text-slate-300/80 font-sans line-clamp-3">
                        {course.description}
                      </p>

                      {/* Covers / Key Topics */}
                      {course.bullets && course.bullets.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/5">
                          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 font-mono block mb-1.5">
                            Covers:
                          </span>
                          <ul className="space-y-1">
                            {course.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2 text-[11.5px] text-slate-200/90 font-sans leading-snug">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0 shadow-[0_0_6px_#10B981]" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-4 pt-2.5 border-t border-white/5 z-10 shrink-0 flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-xl text-[11px] tracking-[0.14em] uppercase font-bold text-black bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A78BFA] shadow-[0_6px_20px_rgba(139,92,246,0.22)] hover:-translate-y-0.5 hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        const slug = course.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        router.push(`/academy/courses/${slug}`);
                      }}
                    >
                      <span>{course.ctaText || "VIEW CURRICULUM"}</span>
                      <span className="text-sm font-normal">→</span>
                    </button>
                    <button
                      className="shrink-0 px-3.5 py-2.5 rounded-xl text-[11px] tracking-[0.14em] uppercase font-bold text-white/70 border border-white/10 hover:border-[#A78BFA]/50 hover:text-[#A78BFA] hover:bg-[#A78BFA]/5 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/academy/register");
                      }}
                    >
                      Check fit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
