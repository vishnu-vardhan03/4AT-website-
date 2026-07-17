"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { Star, Clock, Award, CheckCircle, ChevronDown, BookOpen, AlertCircle, Sparkles, UserCheck } from "lucide-react";
import { ctaRoute, lmsCourses } from "@/components/academy/data";
import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/academy/Button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const getCourseSlug = (title: string) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Comprehensive mock curriculum details for the Udemy-like experience
const courseCurriculums: Record<string, {
  whatYouWillLearn: string[];
  requirements: string[];
  modules: {
    title: string;
    duration: string;
    lectures: string[];
  }[];
  instructorBio: {
    name: string;
    title: string;
    rating: string;
    reviews: string;
    students: string;
    bio: string;
  };
}> = {
  "fintech-engineering-acc-l1": {
    whatYouWillLearn: [
      "Master core Accounts Receivable/Payable and General Ledger workflows in corporate settings.",
      "Navigate SAP ERP software and perform real transaction simulations.",
      "Understand Big 4 general bookkeeping standards and compliance requirements.",
      "Perform automated cash and bank statement reconciliations inside actual simulations.",
      "Establish business presentation and professional interview readiness skills."
    ],
    requirements: [
      "No advanced finance experience required; designed as an outcome-first training pathway.",
      "A baseline degree or ongoing studies in Commerce, Accounting, Business, or Finance."
    ],
    modules: [
      {
        title: "Module 1: General Ledger & Cash Reconciliation",
        duration: "15 Hours · 6 Lectures",
        lectures: [
          "Understanding standard corporate accounting cycles & posting structures",
          "Closing schedules: Sub-ledger vs General Ledger reconciliations",
          "Automating Bank Statement Reconciliation in modern enterprise platforms",
          "Hands-on case study: Resolving balance discrepancies under pressure"
        ]
      },
      {
        title: "Module 2: ERP Systems & SAP Practical Operations",
        duration: "20 Hours · 8 Lectures",
        lectures: [
          "Navigating SAP GUI: Organization units and general accounting transactions",
          "Entering vendor invoices, processing client payments, and balancing books",
          "Dynamic journal postings and generating financial report extracts in SAP",
          "Managing Accounts Receivable and Accounts Payable close procedures"
        ]
      },
      {
        title: "Module 3: Accounting Tooling, Power BI & Excel Basics",
        duration: "18 Hours · 7 Lectures",
        lectures: [
          "Advanced Excel formulas for corporate finance: VLOOKUP, INDEX/MATCH, Pivot Tables",
          "Mapping transaction databases using basic Power BI data extraction",
          "Building automated finance dashboard tracking templates",
          "Using AI tools to extract transaction metadata from digital receipts"
        ]
      },
      {
        title: "Module 4: Career Readiness & Mock Interviews",
        duration: "12 Hours · 5 Lectures",
        lectures: [
          "Polishing your finance resume: Aligning keywords with Big 4 standards",
          "Handling technical interview questionnaires on corporate finance rules",
          "Soft skills: Business communication and handling corporate meetings",
          "Final placement assessment calibration"
        ]
      }
    ],
    instructorBio: {
      name: "4AT Academy Core Faculty",
      title: "Finance & ERP Advisory Team",
      rating: "4.8★",
      reviews: "1,240",
      students: "8,500+",
      bio: "Composed of active corporate accounting trainers, SAP certifiers, and placement mentors, our core team guides learners through industry-grade general ledger practices."
    }
  },
  "fintech-engineering-acc-l2": {
    whatYouWillLearn: [
      "Prepare consolidated financial statements under IFRS and US GAAP standards.",
      "Model transaction flows for complex assets, liabilities, and lease disclosures.",
      "Design robotic process automation modules for repetitive finance routines.",
      "Review SOX and internal accounting control architectures.",
      "Advise corporate boards on strategic management reporting structures."
    ],
    requirements: [
      "Completion of FINTECH Engineering Acc L1, or equivalent background in general ledger accounting.",
      "3+ years of professional practice inside corporate finance teams or compliance roles."
    ],
    modules: [
      {
        title: "Module 1: IFRS & US GAAP Reporting Frameworks",
        duration: "18 Hours · 6 Lectures",
        lectures: [
          "Mapping consolidation adjustments across parent & subsidiary accounts",
          "Lease accounting transformations under IFRS 16 guidelines",
          "Disclosing segment performance metrics in quarterly reporting",
          "Case study: Adjusting financial statements for multi-currency operations"
        ]
      },
      {
        title: "Module 2: Advanced ERP Configurations (SAP FI/CO)",
        duration: "22 Hours · 8 Lectures",
        lectures: [
          "Configuring fixed asset ledgers and depreciation key tables in SAP",
          "Cost Center Accounting setup: Designing profit segment allocations",
          "Configuring tax accounting rules for cross-border operations",
          "Extracting clean reconciliation logs for external auditing teams"
        ]
      },
      {
        title: "Module 3: Finance Automation & Robotic Controls",
        duration: "20 Hours · 7 Lectures",
        lectures: [
          "Designing Python-driven scripts to ingest transaction logs",
          "Setting up custom macros for repetitive close reconciliation tasks",
          "Automated variance alerts: Deploying compliance trackers in Slack/Teams",
          "Audit logs: Ensuring script changes are SOX-compliant"
        ]
      },
      {
        title: "Module 4: Strategic Advisory & Corporate Controller Practices",
        duration: "15 Hours · 5 Lectures",
        lectures: [
          "Designing executive board packages: Selecting operational KPIs",
          "Handling complex audit objections from statutory auditors",
          "Capital expenditure reviews and reporting recommendations",
          "Promotion interview preparations: Leadership and operations case studies"
        ]
      }
    ],
    instructorBio: {
      name: "Chartered Accountants Core Committee",
      title: "Senior IFRS Compliance Advisors",
      rating: "4.9★",
      reviews: "950",
      students: "3,800+",
      bio: "A collective of practicing Chartered Accountants and IFRS advisory consultants with direct project experience across Fortune 500 auditing boards."
    }
  },
  "fintech-engineering-ia-l1": {
    whatYouWillLearn: [
      "Design and execute SOX-compliant internal control audits from scratch.",
      "Map process walkthroughs and identify control vulnerabilities inside organizations.",
      "Formulate audit sample selections and run testing for operational effectiveness.",
      "Analyze massive transaction databases for security and fraud anomalies.",
      "Build Big 4 audit readiness folders and handle regulatory queries."
    ],
    requirements: [
      "Baseline finance background or undergraduate degree in finance/accounting.",
      "2+ years of professional experience inside corporate operations or compliance."
    ],
    modules: [
      {
        title: "Module 1: SOX Compliance & Control Design",
        duration: "15 Hours · 5 Lectures",
        lectures: [
          "The Sarbanes-Oxley Act: Frameworks, testing guidelines, and documentation",
          "Risk Control Matrix (RCM) creation: Mapping vulnerabilities to control plans",
          "Designing operational walk-throughs: Interviewing finance process owners",
          "Audit trail documentation: What constitutes acceptable evidence"
        ]
      },
      {
        title: "Module 2: Audit Execution & Sample Testing",
        duration: "20 Hours · 7 Lectures",
        lectures: [
          "Selecting test samples: Statistical vs random testing rules",
          "Testing operating effectiveness: Evaluating control execution logs",
          "Documenting control failures: Formatting deficiency logs",
          "Reviewing segregation of duties (SoD) matrices in SAP ERP"
        ]
      },
      {
        title: "Module 3: Audit Automation & Forensic Analytics",
        duration: "18 Hours · 6 Lectures",
        lectures: [
          "Using scripting tools to identify duplicated vendor payouts",
          "Automated ledger scanning: Building anomaly tracking metrics",
          "Forensic audit scenarios: Unwinding intentional reporting errors",
          "Dashboarding audit findings: Translating logs into dashboard views"
        ]
      },
      {
        title: "Module 4: Big 4 Audit Standards & Career Preparation",
        duration: "12 Hours · 5 Lectures",
        lectures: [
          "Mock statutory audit: Interacting with external audit panels",
          "How to answer tough internal control queries from senior management",
          "Resume alignment: Highlighting internal control and SOX testing expertise",
          "Case reviews: Analyzing real SEC corporate disclosure failures"
        ]
      }
    ],
    instructorBio: {
      name: "Big 4 Audit Practitioners",
      title: "Senior Risk & Assurance Directors",
      rating: "4.8★",
      reviews: "780",
      students: "4,100+",
      bio: "Practicing risk advisory professionals and former Big 4 audit managers specializing in statutory compliance, SOX audits, and corporate control reviews."
    }
  },
  "fintech-engineering-soc2": {
    whatYouWillLearn: [
      "Navigate complex US Federal Tax codes, rules, and filing methodologies.",
      "Structure corporate transfer pricing arrangements for cross-border affiliates.",
      "Prepare SEC Forms 10-K and 10-Q tax reconciliation packages.",
      "De-risk corporate direct tax structures and plan global tax exposures.",
      "Direct global tax controller teams inside Fortune 500 centers."
    ],
    requirements: [
      "Completion of Advanced Accounting L2 or equivalent corporate compliance credentials.",
      "5+ years of taxation, statutory accounting, or regulatory oversight practice."
    ],
    modules: [
      {
        title: "Module 1: US Tax Code & Corporate Direct Taxes",
        duration: "20 Hours · 7 Lectures",
        lectures: [
          "Filing Form 1120: Reconciling book income with corporate taxable income",
          "US tax reform acts: Analysis of corporate rate calculations and credits",
          "State and local tax adjustments (SALT) for diversified entities",
          "Case study: Tax accounting under ASC 740 rules"
        ]
      },
      {
        title: "Module 2: Transfer Pricing & Cross-Border Deals",
        duration: "22 Hours · 8 Lectures",
        lectures: [
          "Understanding arm's length transactions and transfer pricing methods",
          "Drafting transfer pricing documentation for tax compliance audits",
          "Double taxation relief: Navigating international tax treaty rules",
          "Anti-avoidance rules: Handling BEPS directives from the OECD"
        ]
      },
      {
        title: "Module 3: SEC Reporting & Tax Reconciliation Packs",
        duration: "18 Hours · 6 Lectures",
        lectures: [
          "Preparing tax disclosure footnotes for SEC Forms 10-K and 10-Q",
          "Calculating effective tax rates and deferred tax balances",
          "Handling tax audit disclosures for public filing reviews",
          "Reconciling permanent and temporary book-to-tax adjustments"
        ]
      },
      {
        title: "Module 4: Global Tax Strategy & Controller Leadership",
        duration: "15 Hours · 5 Lectures",
        lectures: [
          "Setting up tax controller playbooks for global delivery centers",
          "Managing relationship panels during statutory tax audits",
          "De-risking tax exposures for strategic joint ventures",
          "Leadership case study: Planning global tax structures for a merger"
        ]
      }
    ],
    instructorBio: {
      name: "Global Tax Counsel Panel",
      title: "Cross-Border Corporate Tax Experts",
      rating: "4.9★",
      reviews: "1,120",
      students: "2,500+",
      bio: "Experienced tax attorneys and international corporate tax partners advising global delivery centers on US GAAP tax disclosures and transfer pricing setups."
    }
  },
  "fintech-engineering-fpna": {
    whatYouWillLearn: [
      "Build fully integrated three-statement corporate forecasting models in Excel.",
      "Calculate dynamic capital budgeting metrics: NPV, IRR, and payback periods.",
      "Establish rolling forecasting processes and analyze budget variances.",
      "Create interactive business reports using Power BI and Excel dashboards.",
      "Structure executive presentations for board members and C-Suite panels."
    ],
    requirements: [
      "Strong analytical mindset, database familiarity, and Excel skills.",
      "3+ years of professional practice inside corporate finance or accounting."
    ],
    modules: [
      {
        title: "Module 1: Three-Statement Integrated Models",
        duration: "20 Hours · 8 Lectures",
        lectures: [
          "Model architecture: Connecting Income Statement, Balance Sheet & Cash Flow",
          "Forecasting operational revenue: Unit-driven and driver-based methods",
          "Modeling working capital: Accounts receivable, payable, and inventory cycles",
          "Handling circular references and building model sanity checks"
        ]
      },
      {
        title: "Module 2: Capital Budgeting & Scenario Modeling",
        duration: "18 Hours · 6 Lectures",
        lectures: [
          "Dynamic discount rate selections: Finding Weighted Average Cost of Capital (WACC)",
          "Evaluating asset deals: NPV, IRR, and sensitivity analysis setups",
          "Scenario analysis: Building baseline, upside, and downside forecast triggers",
          "Debt schedules: Modeling interest expense and amortization plans"
        ]
      },
      {
        title: "Module 3: Budgeting, Forecasts & Variance Control",
        duration: "16 Hours · 6 Lectures",
        lectures: [
          "Deploying rolling forecasts: Moving from static budgets to active plans",
          "Variance analysis: Breaking down price, volume, and currency impacts",
          "Connecting operational departments with budgeting schedules",
          "Strategic budgeting: Zero-based budgeting (ZBB) implementation"
        ]
      },
      {
        title: "Module 4: Business Presentation & Executive Pitching",
        duration: "14 Hours · 5 Lectures",
        lectures: [
          "Power BI setups: Linking model databases to dynamic dashboards",
          "Structuring slide decks: Telling the story behind variance reports",
          "Handling critical corporate query sessions from Chief Financial Officers (CFOs)",
          "Final case review: Presenting a strategic merger pitch"
        ]
      }
    ],
    instructorBio: {
      name: "Corporate FP&A Directors Panel",
      title: "Senior Finance Leaders & Analysts",
      rating: "4.8★",
      reviews: "830",
      students: "3,100+",
      bio: "Active finance directors, former investment analysts, and FP&A controllers who guide corporate investments and planning cycles for multinational enterprises."
    }
  }
};

const curriculumKeyMap: Record<string, string> = {
  "mnc-finance-readiness-level-1": "fintech-engineering-acc-l1",
  "advanced-corporate-accounting-erp-level-2": "fintech-engineering-acc-l2",
  "specialized-course-in-advanced-corporate-audit-taxation": "fintech-engineering-ia-l1",
  "global-audit-tax-management-pathway": "fintech-engineering-soc2",
  "strategic-program-in-financial-planning-analysis-fp-a": "fintech-engineering-fpna"
};

export default function CourseDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const course = useMemo(() => {
    return lmsCourses.find((c) => getCourseSlug(c.title) === slug);
  }, [slug]);

  const curriculum = useMemo(() => {
    const key = curriculumKeyMap[slug] || slug;
    return courseCurriculums[key] || null;
  }, [slug]);

  if (!course || !curriculum) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between pt-[72px]">
        <Nav />
        <div className="max-w-md mx-auto text-center flex flex-col items-center justify-center py-20 px-4">
          <AlertCircle className="size-12 text-rose-500 mb-4" />
          <h2 className="text-2xl font-bold font-sans mb-2">Course Not Found</h2>
          <p className="text-slate-400 text-xs leading-relaxed mb-6">
            We couldn&apos;t find any course with the path &quot;{slug}&quot;. Please verify the URL or explore our full curriculum directory.
          </p>
          <Button href="/academy/courses" variant="primary">
            Explore All Courses
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleModule = (idx: number) => {
    setExpandedModule(expandedModule === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col pt-0">
      <Nav />

      {/* Main Dynamic Header Banner */}
      <section className="relative bg-[#0a0a0a] border-b border-white/5 pt-[120px] pb-12 md:pt-[132px] lg:pt-[132px] lg:pb-16 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="site-shell relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Headline Texts */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase mb-4">
              <Link href="/" className="hover-fine:text-accent">Home</Link>
              <span>&gt;</span>
              <Link href="/academy/courses" className="hover-fine:text-accent">Courses</Link>
              <span>&gt;</span>
              <span className="text-slate-400">{course.category}</span>
            </div>

            {course.badgeType && (
              <span className="inline-flex max-w-max text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded mb-4">
                {course.badgeType}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
              {course.title}
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-3xl">
              {course.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#fbbf24]">{course.rating.toFixed(1)}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${
                        i < Math.floor(course.rating)
                          ? "fill-[#fbbf24] text-[#fbbf24]"
                          : "text-white/10"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-400">({course.reviewsCount} ratings)</span>
              </div>
              <span className="text-white/20">|</span>
              <span className="text-slate-400">1,250+ students enrolled</span>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Created by <span className="text-white font-semibold">{course.instructor}</span>
            </p>
          </div>

        </div>
      </section>

      {/* Main Section layout with Sidebar widget */}
      <section className="py-12 sm:py-16 flex-grow relative">
        <div className="site-shell relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Body Contents (Left Column) */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            
            {/* 1. What you'll learn card */}
            <div className="bg-[#0b0e1a]/40 border border-white/8 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-6">
                What you&apos;ll learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {curriculum.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="size-4.5 text-accent shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Course Curriculum Accordion */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-4">
                Course content
              </h2>
              <p className="text-xs text-slate-400 font-mono uppercase mb-6">
                {curriculum.modules.length} MODULES · 12 WEEKS TOTAL PROGRAM
              </p>

              {/* Accordion container */}
              <div className="flex flex-col border border-white/8 bg-[#0b0e1a]/20 rounded-2xl overflow-hidden divide-y divide-white/5">
                {curriculum.modules.map((mod, idx) => {
                  const isExpanded = expandedModule === idx;
                  return (
                    <div key={idx} className="flex flex-col">
                      {/* Module Trigger header */}
                      <button
                        onClick={() => toggleModule(idx)}
                        className="w-full flex items-center justify-between p-5 text-left hover-fine:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <h3 className="font-bold text-sm sm:text-base text-white hover-fine:text-accent transition-colors">
                            {mod.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] font-mono text-slate-500 uppercase hidden sm:inline">
                            {mod.duration}
                          </span>
                          <ChevronDown
                            className={`size-4.5 text-slate-400 transition-transform duration-300 ${
                              isExpanded ? "rotate-180 text-accent" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {/* Expandable Module Panel using Framer Motion Spring physics */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2 bg-[#0b0e1a]/40 flex flex-col gap-3">
                              {mod.lectures.map((lecture, lIdx) => (
                                <div key={lIdx} className="flex items-start gap-3.5 text-xs text-slate-300 border-b border-white/[0.03] last:border-b-0 pb-2.5 last:pb-0">
                                  <BookOpen className="size-4 text-accent shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{lecture}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Requirements Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-4">
                Requirements
              </h2>
              <div className="flex flex-col gap-2">
                {curriculum.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <p className="leading-relaxed">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Detailed Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-4">
                Description
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-3xl">
                {course.description} Our training focuses strictly on real-world outcomes. Led by industry practitioners, we bridge the gap between academic education and corporate finance operations. We combine SAP FI/CO layouts, advanced Excel, Power BI modeling, IFRS tax regulations, and SOX control frameworks directly into cohort projects.
              </p>
            </div>

            {/* 5. Instructor Biography */}
            <div className="border-t border-white/5 pt-8">
              <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-6">
                Instructor
              </h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <div className="size-20 rounded-full bg-accent-gradient flex items-center justify-center text-[#04060f] font-bold text-xl shadow-[0_0_20px_rgba(45,212,191,0.2)] mb-3 overflow-hidden">
                    <UserCheck className="size-8" />
                  </div>
                  <div className="flex flex-col gap-1 text-[11px] font-mono text-slate-500 uppercase text-center sm:text-left">
                    <span>{curriculum.instructorBio.rating} Instructor Rating</span>
                    <span>{curriculum.instructorBio.reviews} Reviews</span>
                    <span>{curriculum.instructorBio.students} Students</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {curriculum.instructorBio.name}
                  </h3>
                  <p className="text-xs text-accent font-semibold mb-3">
                    {curriculum.instructorBio.title}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {curriculum.instructorBio.bio}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar widget (Right Column) */}
          <div className="w-full lg:col-span-1">
            <div className="lg:sticky lg:top-28 bg-[#0b0e1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
              
              {/* Course Preview Banner */}
              <div className="relative aspect-video w-full bg-[#0b0e1a]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {course.locked && (
                  <div className="absolute inset-0 bg-[#0b0e1a]/60 flex items-center justify-center">
                    <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-[#0b0e1a]/90 border border-accent/30 px-3 py-1.5 rounded-md">
                      🔒 PREMIUM ENROLLMENT
                    </span>
                  </div>
                )}
              </div>

              {/* Price and Details Card */}
              <div className="p-6 md:p-8 flex flex-col gap-6">
                
                {/* Price tags */}
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <span className="text-3xl font-extrabold text-white font-sans">{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm font-medium line-through text-slate-500">
                      {course.originalPrice}
                    </span>
                  )}
                </div>

                {/* Main CTAs */}
                <div className="flex flex-col gap-3">
                  <Button
                    href={ctaRoute}
                    variant="primary"
                    className="w-full font-bold tracking-wider py-4 shadow-[0_0_20px_rgba(0,229,195,0.2)] text-center justify-center"
                  >
                    Enroll Now
                  </Button>
                  <Button
                    href="/#contact-us"
                    variant="secondary"
                    className="w-full font-bold tracking-wider py-4 text-center justify-center"
                  >
                    Book A Counseling Call
                  </Button>
                </div>

                {/* Course details list */}
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3.5 font-mono">
                    This course includes:
                  </h4>
                  <ul className="flex flex-col gap-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <Clock className="size-4 text-accent" />
                      <span>12 weeks structured learning</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Award className="size-4 text-accent" />
                      <span>Professional Certificate of Completion</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Sparkles className="size-4 text-accent" />
                      <span>SAP FI/CO, Power BI & AI Tool labs</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="size-4 text-accent" />
                      <span>Big 4 Interview and Placement Preparation</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
