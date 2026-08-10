"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Filter, BookOpen, Clock, Award, Lock, ArrowLeft, ChevronRight, ChevronDown, X, ArrowRight, Monitor } from "lucide-react";
import { lmsCourses } from "@/components/academy/data";
import Image from "next/image";
import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";

const getCourseSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const list = new Set(lmsCourses.map((c) => c.category));
    return ["All", ...Array.from(list)];
  }, []);

  const filteredCourses = useMemo(() => {
    return lmsCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const hasActiveFilters = selectedCategory !== "All" || searchQuery.trim().length > 0;

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#07090D] text-white flex flex-col pt-0 font-sans">

      {/* Hero Banner Section */}
      <section className="relative pt-[120px] pb-12 sm:pt-[132px] sm:pb-14 border-b border-white/5 bg-[#07090D] overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-[#5EEAD4]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="site-shell relative z-10 text-left">
          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/academy#courses"
              className="inline-flex h-10 items-center gap-2 rounded-full fx-ghost-btn px-4 text-xs font-semibold text-slate-300 transition-all hover:text-white active:scale-95"
              aria-label="Back to courses section"
            >
              <ArrowLeft className="size-4" />
              Back
            </Link>

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <Link
                href="/academy"
                className="transition-colors hover:text-white"
              >
                Home
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className="text-slate-300" aria-current="page">Courses</span>
            </nav>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 font-sans max-w-3xl">
            Courses Directory
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            All pathways are designed backwards from specific job role outcomes and Big 4 requirements, equipping you with decision-grade execution.
          </p>
        </div>
      </section>

      {/* Main Catalog Directory Section */}
      <section className="py-8 sm:py-12 flex-grow">
        <div className="site-shell flex flex-col gap-6">
          
          {/* Top Control Bar: Showing Courses counter, Search Bar, and Filters Category Dropdown */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-2">
            
            {/* Left: SHOWING N COURSES */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                SHOWING {filteredCourses.length} COURSE{filteredCourses.length !== 1 ? "S" : ""}
              </span>
            </div>

            {/* Right: Search Bar & Filters Category Dropdown */}
            <div className="flex flex-wrap items-center gap-3 flex-1 justify-end w-full sm:w-auto">
              
              {/* Search Field */}
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#090d19] border border-white/12 focus:border-[#5EEAD4]/50 rounded-full px-4 py-2 pl-9 pr-8 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                />
                <Search className="absolute left-3 top-2.5 size-3.5 text-slate-500" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Filters Category Dropdown Select */}
              <div className="relative inline-flex items-center">
                <Filter className="absolute left-3.5 top-2.5 size-3.5 text-teal-400 pointer-events-none z-10" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-[#090d19] border border-white/12 focus:border-[#5EEAD4]/50 rounded-full pl-9 pr-9 py-2 text-xs font-bold text-white uppercase tracking-wider outline-none cursor-pointer hover:border-white/25 transition-all shadow-inner"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#090d19] text-white py-1">
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 size-3.5 text-slate-400 pointer-events-none z-10" />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="text-xs text-slate-400 hover:text-teal-300 font-mono underline underline-offset-4 cursor-pointer whitespace-nowrap ml-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Courses Content Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const slug = getCourseSlug(course.title);
                return (
                  <div
                    key={course.title}
                    onClick={() => {
                      router.push(`/academy/courses/${slug}`);
                    }}
                    className="group relative flex flex-col justify-between p-4.5 sm:p-5 rounded-[22px] border border-white/10 bg-[#090B12] cursor-pointer transition-all duration-300 hover:border-[#A78BFA]/35 hover:shadow-[0_12px_40px_rgba(139,92,246,0.15)] hover:-translate-y-1"
                  >
                    {/* Thumbnail Image Container */}
                    <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden bg-[#04060f] mb-3 shrink-0">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Overlaid Badge Top-Right */}
                      <div className="absolute top-2.5 right-2.5 z-30 px-3 py-1 rounded-full bg-[rgba(91,33,182,0.55)] border border-[rgba(167,139,250,0.40)] backdrop-blur-md shadow-lg">
                        <span className="text-[10px] font-extrabold uppercase text-[#D8B4FE] tracking-wider font-sans whitespace-nowrap">
                          {course.badge || "FLAGSHIP • FRESHERS"}
                        </span>
                      </div>

                      {/* Lock Overlay for locked courses */}
                      {course.locked && (
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
                        {/* Metadata Row (Below Image) - with additional Certificate badge */}
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
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F131C] border border-white/10 text-slate-200 font-medium text-[11px] whitespace-nowrap">
                            <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Certificate</span>
                          </div>
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
                        className="flex-1 py-2.5 px-4 rounded-full text-[11px] tracking-[0.1em] uppercase font-bold text-white fx-primary-btn flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/academy/courses/${slug}`);
                        }}
                      >
                        <span>{course.ctaText || "VIEW CURRICULUM"}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                      <button
                        className="shrink-0 px-4 py-2.5 rounded-full text-[11px] tracking-[0.1em] uppercase font-bold text-white fx-ghost-btn transition-all duration-300 cursor-pointer whitespace-nowrap"
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
          ) : (
            <div className="bg-[#0b0e1a]/40 border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
              <BookOpen className="size-10 text-slate-600 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No Courses Found</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                We couldn&apos;t find any courses matching search phrase &quot;{searchQuery}&quot;. Please check spelling or select another filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-6 text-xs text-white fx-primary-btn px-5 py-2.5 rounded-full font-bold uppercase tracking-wider cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      </div>
      <Footer />
    </>
  );
}
