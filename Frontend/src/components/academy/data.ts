import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ChartColumnBig,
  Cpu,
  FileCheck2,
  GraduationCap,
  Handshake,
  Layers3,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export const heroAssets = {
  background:
    "/hero-bg.jpg",
  logo: "/logo/logo.webp",
};

export const partnerLogos = [
  { name: "Burkland", src: "/partners/burkland.svg" },
  { name: "SES", src: "/partners/ses.png" },
  { name: "Partner 9", src: "/partners/partner9.png" },
  { name: "Partner 8", src: "/partners/partner8.png" },
  { name: "Partner 7", src: "/partners/partner7.png" },
  { name: "Partner 6", src: "/partners/partner6.png" },
  { name: "Partner 3", src: "/partners/partner3.png" },
  { name: "Partner 2", src: "/partners/partner2.png" },
  { name: "Partner 1", src: "/partners/partner1.png" },
  { name: "Mojler", src: "/partners/mojler.png" },
  { name: "GGF", src: "/partners/ggf.png" },
  { name: "Caranium", src: "/partners/caranium.png" },
];


export type FeatureCard = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  tone: "dark" | "light" | "accent";
  span?: "single" | "double";
};

export const featureCards: FeatureCard[] = [
  {
    id: "01",
    title: "Built by a working F&A firm",
    body:
      "You learn on real client standards from a firm that runs finance & accounting for global clients, not from a textbook.",
    tags: ["Career Destination", "ROI-Focussed"],
    tone: "dark",
  },
  {
    id: "02",
    title: "Practical finance training",
    body:
      "Learn the workflows, tools, and reporting logic used in real accounting, audit, tax, and FP&A environments.",
    tags: ["Accounting", "Audit & Tax", "FP&A"],
    tone: "light",
  },
  {
    id: "03",
    title: "Our own AI platform",
    body:
      "You train on 4AT's AI-powered finance tools alongside industry platforms, learning to work with AI, not around it.",
    tags: ["Digital Fluency", "Modern Tools"],
    tone: "light",
  },
  {
    id: "04",
    title: "Readiness for global standards",
    body:
      "Train in the context of IFRS, SOX, audit discipline, and employer expectations from day one.",
    tags: ["SOX & IFRS", "Employer Expectation"],
    tone: "light",
  },
  {
    id: "05",
    title: "Assessment and placement support",
    body:
      "Move through pre-assessment, post-training evaluation, and interview support before placement routing.",
    tags: ["Pre-Assessment", "Evaluation", "Interview Prep"],
    tone: "accent",
    span: "double",
  },
];

export const ratings = [
  { value: "4.8★", label: "average rating across all courses" },
  { value: "141+", label: "verified learner reviews" },
  { value: "5", label: "specialised fintech tracks" },
  { value: "₹999", label: "commitment fee to start" },
];

export type StepCard = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const workflowSteps: StepCard[] = [
  {
    step: "01",
    title: "Choose a role outcome",
    description:
      "Learners enter through a role-based lane so the program starts with a destination, not a generic syllabus.",
    icon: Target,
  },
  {
    step: "02",
    title: "Baseline skill audit",
    description:
      "We benchmark accounting, compliance, reporting, and tool fluency to place each learner at the right operating level.",
    icon: FileCheck2,
  },
  {
    step: "03",
    title: "Live cohort sessions",
    description:
      "Mentor-led classes translate frameworks into repeatable operating playbooks with guided practice.",
    icon: MonitorPlay,
  },
  {
    step: "04",
    title: "Case-led application",
    description:
      "Simulations, workpaper reviews, and reporting drills shift theory into decision-grade execution.",
    icon: ChartColumnBig,
  },
  {
    step: "05",
    title: "Interview positioning",
    description:
      "Mock interviews, portfolio prep, and recruiter calibration align learners with real hiring expectations.",
    icon: BriefcaseBusiness,
  },
  {
    step: "06",
    title: "Hire and deploy",
    description:
      "Qualified talent moves into partner pipelines with placement support and employer-facing readiness signals.",
    icon: Handshake,
  },
];

export const audienceCards = [
  {
    title: "Freshers",
    subtitle: "Build role clarity, confidence, and your first credible finance portfolio.",
    bullets: [
      "Structured MNC accounting and audit tracks",
      "Interview and resume calibration from day one",
      "Tool-first learning with guided mentorship",
    ],
    icon: GraduationCap,
  },
  {
    title: "Professionals",
    subtitle: "Move from experience to specialization with sharper compliance and strategic exposure.",
    bullets: [
      "Advanced IFRS, SOX, IA, and FP&A pathways",
      "Promotion-oriented project simulations",
      "Placement support for global finance teams",
    ],
    icon: Users,
  },
];

export const offerings = [
  {
    title: "Live Sessions",
    body: "High-context mentor-led sessions that unpack reporting, controls, compliance, and operational judgment.",
    icon: MonitorPlay,
    size: "wide",
  },
  {
    title: "Mock Interviews",
    body: "Role-specific interview rounds with actionable recruiter feedback and performance breakdowns.",
    icon: BadgeCheck,
    size: "standard",
  },
  {
    title: "Projects",
    body: "Portfolio-grade assignments rooted in actual finance workflows rather than academic exercises.",
    icon: Layers3,
    size: "standard",
  },
  {
    title: "Compliance Labs",
    body: "Structured practice across IFRS, SOX, and audit controls so learners can operate under pressure.",
    icon: ShieldCheck,
    size: "standard",
  },
  {
    title: "Career Sprint Reviews",
    body: "Weekly checkpoints that blend performance analytics with mentor corrections and momentum planning.",
    icon: Sparkles,
    size: "wide",
  },
];

export const impactStats = [
  { value: "1L+", label: "learners moved through finance-first training pathways" },
  { value: "92%", label: "report higher confidence in real-world role tasks" },
  { value: "5", label: "specialized tracks aligned to distinct finance functions" },
];

export const ctaRoute = "/academy/register";

export const navigationItems = ["About", "Features", "Courses", "Contact Us"];

export const badgeCopy =
  "Building Finance Teams for the Big 4 & Leading Global Enterprises";

export const footerLegal = "© 2026 4AT Academy. All rights reserved.";

export type LmsCourse = {
  title: string;
  subtitle: string;
  badge?: string;
  duration?: string;
  format?: string;
  mode?: string;
  modePills?: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  bullets: string[];
  topics?: string[];
  locked: boolean;
  category: string;
  instructor: string;
  price?: string;
  originalPrice?: string;
  image: string;
  badgeType?: 'bestseller' | 'new' | 'hot';
  ctaText?: string;
};

export const lmsCourses: LmsCourse[] = [
  // ── Freshers ──────────────────────────────────────────────────────────────
  {
    title: "FinTech Engineering — Acc L1",
    subtitle: "Freshers · Accounting · Flagship",
    badge: "FLAGSHIP · FRESHERS",
    duration: "2 months",
    mode: "Hybrid",
    rating: 4.8,
    reviewsCount: 141,
    description: "Practical finance, accounting and audit — ending in certification, internship and placement.",
    bullets: [
      "Finance, Accounting & Audit",
      "Accounting platforms & tools",
      "AI-powered automation",
      "Client-facing readiness"
    ],
    topics: [
      "Live ERP accounting systems",
      "AI-powered finance tools",
      "Client-facing projects",
      "Internship & placement pathway"
    ],
    locked: false,
    category: "Accounting & ERP",
    instructor: "4AT Academy Core",
    image: "/acc_l1_thumb.webp",
    badgeType: "bestseller",
    ctaText: "VIEW CURRICULUM"
  },
  {
    title: "FinTech Engineering — IA L1",
    subtitle: "Freshers · Audit",
    badge: "AUDIT · FRESHERS",
    duration: "2 months",
    mode: "Hybrid",
    rating: 4.9,
    reviewsCount: 21,
    description: "Internal audit, risk and controls, SOX and Big 4 standards, taught through practical simulations. Ends in certification, internship and placement.",
    bullets: [
      "Internal Audit & Risk",
      "SOX & Internal Controls",
      "Big 4 Audit Standards",
      "Practical Audit Simulations"
    ],
    topics: [
      "SOX internal controls",
      "Big 4 audit workpapers",
      "Risk & fraud testing",
      "Compliance strategy"
    ],
    locked: false,
    category: "Audit & Risk",
    instructor: "Big 4 Audit Experts",
    image: "/ia_l1_thumb.webp",
    badgeType: "hot",
    ctaText: "VIEW CURRICULUM"
  },
  {
    title: "FinTech Engineering — SOC 2",
    subtitle: "Freshers · Risk & Compliance",
    badge: "RISK & COMPLIANCE · FRESHERS",
    duration: "1.5 months",
    mode: "Hybrid",
    rating: 4.6,
    reviewsCount: 38,
    description: "SOC 2, ISO 27001 and controls frameworks, built from the ground up. Ends in certification, internship and placement.",
    bullets: [
      "SOC 2 & ISO 27001",
      "Controls Design & Testing",
      "Risk & Compliance",
      "Audit-Readiness & Reporting"
    ],
    topics: [
      "SOC 2 & ISO 27001 controls",
      "Security evidence audits",
      "Risk & governance frameworks",
      "Continuous compliance AI"
    ],
    locked: false,
    category: "Global Taxation",
    instructor: "Global Tax Counsel",
    image: "/soc2_thumb.webp",
    badgeType: "bestseller",
    ctaText: "VIEW CURRICULUM"
  },
  // ── Experienced ───────────────────────────────────────────────────────────
  {
    title: "FinTech Engineering — Acc L2",
    subtitle: "Experienced · 3+ years",
    badge: "EXPERIENCED · 3+ YRS",
    duration: "1.5 months",
    mode: "Hybrid",
    rating: 4.7,
    reviewsCount: 28,
    description: "Advanced financial reporting, GAAP and automation to deepen your expertise.",
    bullets: [
      "Complex Reporting & GAAP",
      "Close & Consolidation",
      "AI & Automation",
      "Management Reporting"
    ],
    topics: [
      "Multi-entity consolidation",
      "IFRS & SOX reporting standards",
      "AI & accounting automation",
      "Executive case simulations"
    ],
    locked: false,
    category: "Accounting & ERP",
    instructor: "Chartered Accountants Core",
    image: "/acc_l2_thumb.webp",
    badgeType: "new",
    ctaText: "VIEW CURRICULUM"
  },
  {
    title: "FinTech Engineering — FP&A",
    subtitle: "Experienced",
    badge: "FP&A · EXPERIENCED",
    duration: "1.5 months",
    mode: "Hybrid",
    rating: 4.8,
    reviewsCount: 28,
    description: "Planning & analysis, controllership and business partnering: budgeting, forecasting and management reporting.",
    bullets: [
      "Budgeting & Forecasting",
      "Variance & Reporting",
      "Controllership",
      "Business Partnering"
    ],
    topics: [
      "Financial modeling & valuation",
      "Strategic budgeting & forecasting",
      "Corporate BI & dashboards",
      "Executive business partnering"
    ],
    locked: false,
    category: "FP&A & Modeling",
    instructor: "Corporate FP&A Directors",
    image: "/fpna_thumb.webp",
    badgeType: "new",
    ctaText: "VIEW CURRICULUM"
  }
];



export const featuresList = [
  {
    step: "01",
    title: "Pre-assessment",
    description: "Choose your track & take a free eligibility check.",
    icon: FileCheck2,
  },
  {
    step: "02",
    title: "Confirm seat",
    description: "Secure your spot with ₹999 + GST.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Learn",
    description: "Hands-on training from industry experts.",
    icon: GraduationCap,
  },
  {
    step: "04",
    title: "AI & ML",
    description: "Master AI-driven finance tools & automation.",
    icon: Cpu,
  },
  {
    step: "05",
    title: "Mentorship",
    description: "Finance-leader mentoring & career readiness.",
    icon: Users,
  },
  {
    step: "06",
    title: "Assess & Place",
    description: "Post-assessment → interview → placement.",
    icon: BadgeCheck,
  },
];
