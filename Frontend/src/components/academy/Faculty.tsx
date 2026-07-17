"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Globe, FileText, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TrackItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface StatItem {
  value: string;
  label: string;
}

interface Mentor {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string;
  expertise: string[];
  tracks: TrackItem[];
  stats: StatItem[];
}

const mentorsData: Mentor[] = [
  {
    id: "vikas",
    name: "Vikas Juneja",
    role: "Head of FP&A",
    department: "FP&A Expert",
    bio: "Led FP&A for high-growth SaaS and fintech teams; Specialist in strategic forecasting, valuations, and corporate budgeting.",
    image: "/faculty/david.webp",
    expertise: ["Financial Modeling", "SaaS Valuations", "Forecasting", "Corporate Budgeting"],
    tracks: [
      { name: "Financial Planning", icon: Globe },
      { name: "Strategic Forecasting", icon: FileText },
      { name: "Capital Valuations", icon: Users }
    ],
    stats: [
      { value: "12+", label: "Years in Corporate Finance" },
      { value: "400+", label: "Professionals Trained" },
      { value: "25+", label: "MNCs Advised" }
    ]
  },
  {
    id: "neha-anand",
    name: "Neha Anand",
    role: "Corporate Finance Lead",
    department: "Corporate Finance",
    bio: "Specialist in cross-border capital structure, treasury operations, and multinational fundraising strategies.",
    image: "/faculty/emily.webp",
    expertise: ["Capital Structure", "Treasury Ops", "Fundraising", "Corporate Finance"],
    tracks: [
      { name: "Capital Structure", icon: Globe },
      { name: "Treasury Management", icon: FileText },
      { name: "Corporate Operations", icon: Users }
    ],
    stats: [
      { value: "10+", label: "Years Combined Experience" },
      { value: "300+", label: "Professionals Trained" },
      { value: "20+", label: "MNCs Advised" }
    ]
  },
  {
    id: "neha-verma",
    name: "Neha Verma",
    role: "Head of Global Taxation",
    department: "Global Taxation",
    bio: "US & Cross-border tax specialist with 8+ years advising MNCs on tax structuring, compliance and corporate filings.",
    image: "/faculty/emily.webp",
    expertise: ["International Tax", "GST", "Corporate Tax", "Tax Compliance", "Cross-border Structuring"],
    tracks: [
      { name: "Global Taxation", icon: Globe },
      { name: "Corporate Taxation", icon: FileText },
      { name: "M&A Tax Strategy", icon: Users }
    ],
    stats: [
      { value: "15+", label: "Years in Tax Advisory" },
      { value: "500+", label: "Professionals Trained" },
      { value: "35+", label: "MNCs Advised" }
    ]
  },
  {
    id: "anand",
    name: "Anand S. Patel",
    role: "Director of Audit",
    department: "Audit & Assurance",
    bio: "12+ years in corporate accounting and global ERP integrations; Former Controller at Fortune 500 tech firm.",
    image: "/faculty/robert.webp",
    expertise: ["SAP ERP", "GAAP Accounting", "Consolidations", "Financial Reporting"],
    tracks: [
      { name: "Audit & Assurance", icon: Globe },
      { name: "Internal Controls", icon: FileText },
      { name: "SOX Compliance", icon: Users }
    ],
    stats: [
      { value: "12+", label: "Years in Corporate Accounting" },
      { value: "600+", label: "Professionals Trained" },
      { value: "45+", label: "MNCs Advised" }
    ]
  },
  {
    id: "sarah",
    name: "Sarah Khan",
    role: "Finance Automation Lead",
    department: "Finance Automation",
    bio: "Expert in financial workflow automation, RPA implementation, and building dashboard systems using Power BI.",
    image: "/faculty/sarah.webp",
    expertise: ["RPA", "Power BI", "Process Automation", "Python for Finance"],
    tracks: [
      { name: "Finance Automation", icon: Globe },
      { name: "Dashboard Design", icon: FileText },
      { name: "RPA Operations", icon: Users }
    ],
    stats: [
      { value: "9+", label: "Years in Automation" },
      { value: "450+", label: "Professionals Trained" },
      { value: "30+", label: "MNCs Advised" }
    ]
  }
];

export function Faculty({ sectionId = "faculty" }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>("neha-verma");
  const [fadeOpacity, setFadeOpacity] = useState<number>(1);
  const [isAnimated, setIsAnimated] = useState(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = mentorsData.findIndex((m) => m.id === activeId);
  const activeMentor = mentorsData[activeIndex] || mentorsData[2];

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
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, []);

  const handleSelectMentor = (id: string) => {
    if (id === activeId) return;
    setFadeOpacity(0);
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    
    transitionTimeout.current = setTimeout(() => {
      setActiveId(id);
      setFadeOpacity(1);
    }, 180);
  };

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + mentorsData.length) % mentorsData.length;
    handleSelectMentor(mentorsData[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % mentorsData.length;
    handleSelectMentor(mentorsData[nextIdx].id);
  };

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`site-shell section-padding overflow-x-hidden relative mentors-section-layout ${
        isAnimated ? "animate-active" : ""
      }`}
    >
      <style>{`
        .mentors-section-layout {
          background-color: transparent;
          color: #ffffff;
        }

        .gradient-accent-text {
          background: linear-gradient(to right, #8B5CF6, #5EEAD4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .custom-avatar-glow {
          box-shadow: 0 0 20px rgba(42, 205, 255, 0.45), 0 0 40px rgba(156, 91, 255, 0.25);
        }

        /* Association Logos Styling */
        .deloitte-logo {
          font-family: Arial, sans-serif;
          font-weight: 800;
          color: #ffffff;
          font-size: 16px;
        }
        .deloitte-dot {
          color: #86bc25;
        }
        .pwc-logo {
          font-family: Georgia, serif;
          font-weight: 700;
          color: #ffffff;
          font-size: 16px;
        }
        .pwc-accent {
          color: #ffb600;
        }
      `}</style>

      {/* Subtle Background Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      <div className="site-shell relative z-10">
        
        {/* Header Block: Two Column style top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 faculty-reveal">
          
          <div className="max-w-[620px] flex flex-col items-start">
            {/* Section Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 border border-[rgba(94,234,212,0.18)] bg-white/[0.02] rounded-full py-1.5 px-4 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5EEAD4] font-sans">
                EXECUTIVE MENTORS
              </span>
            </div>

            <h2 className="section-title">
              Finance leaders behind the training <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">standard.</span>
            </h2>

            <p className="section-desc">
              Learn from seasoned finance executives who bring real-world expertise into every module.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex gap-4 self-end md:self-auto">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-white/10 bg-transparent flex items-center justify-center text-white hover:border-[#5EEAD4] active:scale-95 transition-all cursor-pointer"
              aria-label="Previous mentor"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-white/10 bg-transparent flex items-center justify-center text-white hover:border-[#5EEAD4] active:scale-95 transition-all cursor-pointer"
              aria-label="Next mentor"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mentor Avatars Selector Row */}
        <div className="flex justify-center items-center gap-8 md:gap-14 mb-16 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory faculty-reveal">
          {mentorsData.map((mentor) => {
            const isActive = mentor.id === activeId;
            return (
              <button
                key={mentor.id}
                onClick={() => handleSelectMentor(mentor.id)}
                className="flex flex-col items-center gap-3 shrink-0 select-none outline-none focus:outline-none snap-center group cursor-pointer"
              >
                {/* Profile Circle Avatar Wrapper */}
                <div 
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] transition-all duration-300 relative ${
                    isActive 
                      ? "bg-gradient-to-r from-[#2ACDFF] via-[#8B5CF6] to-[#5EEAD4] custom-avatar-glow scale-105" 
                      : "bg-white/5 group-hover:bg-white/15 scale-100"
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#07090D]">
                    <Image
                      src={mentor.image}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-500"
                      alt={mentor.name}
                    />
                  </div>
                </div>

                {/* Name / Role Label */}
                <div className="text-center">
                  <h4 
                    className={`text-xs font-bold font-sans transition-colors duration-300 ${
                      isActive ? "text-[#5EEAD4]" : "text-white/60 group-hover:text-white"
                    }`}
                  >
                    {mentor.name}
                  </h4>
                  <p className="text-[10px] text-white/40 font-sans mt-0.5">
                    {mentor.department}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Details Card (Smooth transition fade) */}
        <div className="faculty-reveal flex justify-center w-full">
          {/* Gradient border wrapper */}
          <div
            className="w-full max-w-[1100px] rounded-[22px] p-[1px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{
              background: "linear-gradient(135deg, rgba(34,211,238,0.35) 0%, rgba(168,85,247,0.18) 40%, rgba(52,211,153,0.25) 100%)",
              opacity: fadeOpacity,
              transitionDuration: fadeOpacity === 0 ? "180ms" : "250ms",
              transition: "opacity " + (fadeOpacity === 0 ? "180ms" : "250ms")
            }}
          >
          <div 
            className="w-full rounded-[21px] bg-[#090c12] backdrop-blur-[14px] p-8 md:p-10 transition-all duration-300"
          >
            {/* Grid Layout inside Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
              
              {/* Col 1: Vertical Portrait Photo (3 cols) */}
              <div className="col-span-1 md:col-span-3 flex flex-col">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#07090D] border border-white/5 shadow-inner">
                  <Image
                    src={activeMentor.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover brightness-100 transition-all duration-700"
                    alt={activeMentor.name}
                  />
                  {/* LinkedIn Icon Button */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-[#090d14]/90 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1.5 text-[9px] font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-all shadow-md"
                  >
                    <svg className="w-3 h-3 text-[#0077B5] fill-[#0077B5]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    View on LinkedIn
                  </a>
                </div>
              </div>

              {/* Col 2: Info details (4 cols) */}
              <div className="col-span-1 md:col-span-4 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold font-mono tracking-widest text-[#8B5CF6] uppercase block">
                    MENTOR
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white mt-1 font-sans">
                    {activeMentor.name}
                  </h3>
                  <p className="text-xs text-[#5EEAD4] font-semibold font-sans mt-0.5">
                    {activeMentor.role}
                  </p>
                  
                  {/* Quote / Bio */}
                  <p className="text-[13px] text-white/70 leading-relaxed font-sans mt-6 italic">
                    &quot;{activeMentor.bio}&quot;
                  </p>
                </div>

                {/* Expert In Tags */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <span className="text-[9px] font-bold font-mono tracking-widest text-white/40 uppercase block">
                    EXPERT IN
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeMentor.expertise.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-sans border border-white/5 bg-white/[0.02] px-2.5 py-1 rounded-lg text-white/80 hover:border-[#5EEAD4] transition-colors duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Col 3: Tracks & Associations (3 cols) */}
              <div className="col-span-1 md:col-span-3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-8">
                <div>
                  <span className="text-[9px] font-bold font-mono tracking-widest text-white/40 uppercase block mb-3">
                    TRACKS
                  </span>
                  <div className="flex flex-col gap-2">
                    {activeMentor.tracks.map((track, i) => {
                      const TrackIcon = track.icon;
                      // First item gets active style matching the image mockup
                      const isTrackActive = i === 0;
                      return (
                        <div
                          key={track.name}
                          className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl border text-xs transition-colors ${
                            isTrackActive
                              ? "bg-white/[0.01] border-[#5EEAD4]/30 text-[#5EEAD4]"
                              : "bg-transparent border-white/[0.04] text-white/70"
                          }`}
                        >
                          <TrackIcon className={`w-3.5 h-3.5 ${isTrackActive ? "text-[#5EEAD4]" : "text-white/40"}`} />
                          <span className="font-semibold font-sans">{track.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Past Associations */}
                <div className="mt-8">
                  <span className="text-[9px] font-bold font-mono tracking-widest text-white/40 uppercase block mb-3.5">
                    PAST ASSOCIATIONS
                  </span>
                  <div className="flex items-center gap-6 opacity-60 hover:opacity-90 transition-opacity">
                    {/* Microsoft Logo SVG */}
                    <div className="flex items-center gap-1.5">
                      <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                        <div className="bg-[#f25f22] w-1.5 h-1.5" />
                        <div className="bg-[#7fba00] w-1.5 h-1.5" />
                        <div className="bg-[#00a4ef] w-1.5 h-1.5" />
                        <div className="bg-[#ffb900] w-1.5 h-1.5" />
                      </div>
                      <span className="text-[10px] font-semibold font-sans text-white/90">Microsoft</span>
                    </div>

                    {/* Deloitte Logo */}
                    <span className="deloitte-logo text-[11px]">
                      Deloitte<span className="deloitte-dot">.</span>
                    </span>

                    {/* PwC Logo */}
                    <span className="pwc-logo text-[11px]">
                      pwc
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 4: Experience statistics (2 cols) */}
              <div className="col-span-1 md:col-span-2 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-8">
                <span className="text-[9px] font-bold font-mono tracking-widest text-white/40 uppercase block mb-4">
                  EXPERIENCE
                </span>
                
                <div className="flex flex-col gap-6 justify-center h-full">
                  {activeMentor.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col border-b border-white/[0.04] pb-4 last:border-0 last:pb-0">
                      <span className="text-3xl font-extrabold tracking-tight text-white leading-none font-sans font-mono gradient-accent-text">
                        {stat.value}
                      </span>
                      <span className="text-[10px] text-white/50 mt-1.5 leading-snug font-sans font-semibold">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
          </div>
        </div>

      </div>
    </section>
  );
}
