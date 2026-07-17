"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Star, Search, Filter, BookOpen, Clock, Award, Lock } from "lucide-react";
import { lmsCourses } from "@/components/academy/data";
import Image from "next/image";
import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";

const getCourseSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

export default function CoursesPage() {
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

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col pt-0">

      {/* Hero Banner Section */}
      <section className="relative pt-[120px] pb-16 sm:pt-[132px] sm:pb-20 border-b border-white/5 bg-[#0a0a0a]">
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="site-shell relative z-10 text-left">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase text-accent border border-accent/20 bg-accent/5 px-3 py-1 rounded-md mb-6">
            EDUCATION CATALOG
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 font-sans max-w-3xl">
            Explore Professional Finance & Accounting Tracks
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            All pathways are designed backwards from specific job role outcomes and Big 4 requirements, equipping you with decision-grade execution.
          </p>
        </div>
      </section>

      {/* Main Catalog Directory Section */}
      <section className="py-12 sm:py-16 flex-grow">
        <div className="site-shell flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
            <div className="bg-[#0b0e1a]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
                <Filter className="size-4 text-accent" />
                <h3 className="font-semibold text-sm uppercase tracking-wider font-mono">Filters</h3>
              </div>

              {/* Search Field */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#090d19] border border-white/10 focus:border-accent/40 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                />
                <Search className="absolute left-3.5 top-3.5 size-4 text-slate-500" />
              </div>

              {/* Category Filters */}
              <div>
                <h4 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-3 font-mono">
                  Categories
                </h4>
                <div className="flex flex-col gap-1.5">
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-accent/10 text-accent border border-accent/20"
                            : "text-slate-400 hover-fine:bg-white/[0.03] hover-fine:text-white"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Courses Content Area */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono border-b border-white/5 pb-4">
              <span>SHOWING {filteredCourses.length} COURSE{filteredCourses.length !== 1 ? "S" : ""}</span>
              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="text-accent hover-fine:underline"
                >
                  Clear Category Filter
                </button>
              )}
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => {
                  const slug = getCourseSlug(course.title);
                  return (
                    <Link
                      key={course.title}
                      href={`/academy/courses/${slug}`}
                      className="group flex flex-col justify-between border border-white/8 bg-[#0b0e1a]/40 hover-fine:border-accent/30 rounded-2xl p-4 transition-[border-color,box-shadow,transform] duration-300 hover-fine:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover-fine:-translate-y-1 relative"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-brand-soft/5 mb-4">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        {/* Lock Overlay for locked courses */}
                        {course.locked && (
                          <div className="absolute inset-0 bg-[#0b0e1a]/60 backdrop-blur-[2px] flex items-center justify-center">
                            <div className="bg-[#0b0e1a]/95 text-white rounded-full p-2.5 shadow-md border border-white/10">
                              <Lock className="size-4" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Badge Ribbon */}
                      {course.badgeType && (
                        <span className={`absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          course.badgeType === "bestseller" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                          course.badgeType === "new" ? "bg-accent/10 text-accent border border-accent/20" :
                          "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        } z-20`}>
                          {course.badgeType}
                        </span>
                      )}

                      <div>
                        {/* Course Category */}
                        <span className="text-[10px] font-bold font-mono tracking-widest text-accent uppercase">
                          {course.category}
                        </span>

                        {/* Title */}
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-white group-hover-fine:text-accent transition-colors duration-200 font-sans">
                          {course.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="mt-2 text-xs font-semibold text-slate-400">
                          {course.subtitle}
                        </p>

                        {/* Description */}
                        <p className="mt-4 text-xs text-slate-400 leading-relaxed line-clamp-3">
                          {course.description}
                        </p>

                        {/* Stars */}
                        <div className="mt-4 flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#fbbf24]">{course.rating.toFixed(1)}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3 ${
                                  i < Math.floor(course.rating)
                                    ? "fill-[#fbbf24] text-[#fbbf24]"
                                    : "text-white/10"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-500 font-sans">
                            ({course.reviewsCount} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Course Meta Info Strip */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono uppercase">
                          <div className="flex items-center gap-1">
                            <Clock className="size-3 text-accent" />
                            <span>12 WEEKS</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="size-3 text-accent" />
                            <span>CERTIFICATE</span>
                          </div>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-sm font-extrabold text-white">{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-[10px] font-medium line-through text-slate-500 ml-1.5">
                              {course.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
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
                  className="mt-6 text-xs text-accent border border-accent/20 bg-accent/5 px-4 py-2 rounded-xl font-semibold tracking-wider hover-fine:bg-accent/10 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      </div>
      <Footer />
    </>
  );
}
