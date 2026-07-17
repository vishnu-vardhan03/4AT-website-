"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lmsCourses } from "@/components/academy/data";
import { Lock, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/academy/Button";

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
      className="site-shell section-padding font-sans select-none overflow-x-hidden relative"
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
        
        {/* Harmonized Section Header */}
        <div id="explore-pathways-header" className="flex flex-col items-start text-left max-w-[850px] mb-16">
          {/* Eyebrow Badge Pill */}
          <div className="inline-flex items-center gap-2 border border-[rgba(167,139,250,0.22)] bg-[rgba(124,58,237,0.08)] rounded-full py-2 px-[18px] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#A78BFA] font-sans">
              EXPLORE PATHWAYS
            </span>
          </div>

          {/* Title with Gradient */}
          <h2 className="section-title">
            Specialized Finance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">Curriculum</span> built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">execution.</span>
          </h2>
          
          {/* Optional Description */}
          <p className="section-desc">
            Deep dive into our highly actionable, workflow-driven pathways designed to align your capabilities with the modern expectations of elite global employers.
          </p>
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
          <div className="flex gap-4 shrink-0 justify-end">
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
                  className={`snap-start shrink-0 w-[230px] sm:w-[260px] md:w-[290px] group relative flex flex-col justify-between p-4 rounded-[22px] border border-white/[0.07] bg-[#141318] cursor-pointer transition-[border-color,transform,opacity,box-shadow] duration-300 min-h-[390px] ${
                    isMobile ? "active:scale-[0.98] transition-transform duration-200" : ""
                  }`}
                  style={{
                    willChange: "transform",
                    borderColor: hoveredIndex === idx ? "rgba(167, 139, 250, 0.25)" : "rgba(255, 255, 255, 0.07)",
                    boxShadow: hoveredIndex === idx ? "0 10px 40px rgba(139, 92, 246, 0.10)" : "none"
                  }}
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#04060f] mb-4">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Category badge top-right */}
                    <div className="absolute top-3 right-3 z-30 px-3 py-1.5 rounded-full bg-[rgba(91,33,182,0.20)] border border-[rgba(167,139,250,0.18)] backdrop-blur-md">
                      <span className="text-[11px] font-bold uppercase text-[#A78BFA] tracking-wider">
                        {colors.badgeText}
                      </span>
                    </div>

                    {/* Lock Overlay for locked courses */}
                    {isLocked && (
                      <div className="absolute inset-0 bg-[#04060f]/60 backdrop-blur-[2px] flex items-center justify-center z-20">
                        <div className="bg-[#0b0e1a]/95 text-white rounded-full p-2.5 shadow-md border border-white/10">
                          <Lock className="size-4" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-grow">
                    {/* Course Category Label */}
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/40 font-mono mt-1">
                      {course.category === "Accounting & ERP" ? "F&A" : course.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-bold text-lead tracking-tight text-white transition-colors duration-300 group-hover:text-[#A78BFA] font-sans mt-1.5 line-clamp-2 min-h-[40px] sm:min-h-[44px]">
                      {course.title}
                    </h3>

                    {/* Instructor / Subtitle */}
                    <p className="text-[13px] font-semibold leading-[1.4] text-slate-400 mt-1">
                      {course.instructor || "4AT Academy Core"}
                    </p>

                    {/* Rating Row */}
                    <div className="mt-2.5 flex items-center gap-1">
                      <span className="text-[13px] font-bold leading-[1.4] text-amber-500">{course.rating.toFixed(1)}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => {
                          const isFilled = i < Math.floor(course.rating);
                          return (
                            <Star
                              key={i}
                              className={`size-3 ${isFilled ? "fill-amber-500 text-amber-500" : "text-white/10"}`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-[10px] font-medium tracking-[0.13em] uppercase text-white/40 font-sans">
                        ({course.reviewsCount})
                      </span>
                    </div>

                    {/* Description subtitle with horizontal line */}
                    <p className="mt-3.5 text-[13px] font-medium leading-[1.4] italic text-white/68 line-clamp-1 border-t border-white/5 pt-2.5">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Footer Container */}
                  <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between z-10">
                    <div className="flex items-baseline">
                      <span className="text-[15px] font-extrabold leading-[1.4] text-white">{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-[11px] font-medium leading-[1.4] line-through text-white/40 ml-1.5">
                          {course.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Harmonized Primary Button / Locked state */}
                    {!isLocked ? (
                      <button
                        className="px-5 py-2.5 rounded-xl text-[11px] tracking-[0.12em] uppercase font-bold text-black bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] shadow-[0_8px_28px_rgba(139,92,246,0.25)] hover:-translate-y-1 hover:brightness-110 active:scale-95 transition-all duration-300 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          const slug = course.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                          router.push(`/academy/courses/${slug}`);
                        }}
                      >
                        Enroll
                      </button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled
                        className="!px-5 !py-2.5 rounded-xl !text-[11px] !tracking-[0.12em] uppercase font-bold !bg-[#04060f] !border-white/10 !text-white/35 !shadow-none cursor-not-allowed"
                      >
                        Locked
                      </Button>
                    )}
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
