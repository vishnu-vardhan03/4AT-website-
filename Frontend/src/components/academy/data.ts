import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ChartColumnBig,
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
    title: "Career-aligned tracks",
    body:
      "Start with the job you want, then follow a learning path built backward from that destination.",
    tags: ["Career Destination", "Role-Based"],
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
    title: "AI and automation exposure",
    body:
      "Build fluency in the digital tools modern finance teams increasingly expect.",
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
  rating: number;
  reviewsCount: number;
  description: string;
  bullets: string[];
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
  {
    title: "FinTech Engineering — Acc L1",
    subtitle: "Beginner · MNC Placement Track",
    badge: "Flagship · Freshers",
    rating: 4.8,
    reviewsCount: 141,
    description: "Practical training in finance, accounting and audit for freshers and final-semester students targeting MNC placements. The core FEP placement track.",
    bullets: [
      "60-70 Hour Program",
      "Hands-on ERP, AI & Automation Tools",
      "Soft Skills & Business Communication",
      "Global Finance & Compliance Readiness"
    ],
    locked: false,
    category: "Accounting & ERP",
    instructor: "4AT Academy Core",
    image: "/acc_l1_thumb.webp",
    badgeType: "bestseller",
    ctaText: "View Curriculum"
  },
  {
    title: "FinTech Engineering — Acc L2",
    subtitle: "Experienced Professionals",
    badge: "3+ Years",
    rating: 4.7,
    reviewsCount: 28,
    description: "A deep dive into complex financial reporting and automation for finance professionals sharpening their expertise.",
    bullets: [
      "Real-World Case Studies",
      "AI & Automation in Accounting",
      "Industry Mentorship",
      "Advanced Reporting & IFRS"
    ],
    locked: false,
    category: "Accounting & ERP",
    instructor: "Chartered Accountants Core",
    image: "/acc_l2_thumb.webp",
    badgeType: "new",
    ctaText: "Check Fit"
  },
  {
    title: "FinTech Engineering — IA L1",
    subtitle: "Internal Audit Track",
    badge: "2+ Years",
    rating: 4.9,
    reviewsCount: 21,
    description: "Internal audit, risk analysis and compliance covering SOX, internal controls, Big 4 audit standards, and practical audit simulations.",
    bullets: [
      "SOX & Internal Controls",
      "Big 4 Audit Standards",
      "Practical Audit Simulations",
      "Risk & Compliance Strategy"
    ],
    locked: false,
    category: "Audit & Risk",
    instructor: "Big 4 Audit Experts",
    image: "/ia_l1_thumb.webp",
    badgeType: "hot",
    ctaText: "Check Fit"
  },
  {
    title: "FinTech Engineering — SOC 2",
    subtitle: "Compliance & Controls Track",
    badge: "Advanced",
    rating: 4.6,
    reviewsCount: 38,
    description: "SOC 2, ISO 27001 and controls frameworks for professionals moving into compliance and assurance roles.",
    bullets: [
      "SOC 2 & ISO 27001 Controls",
      "Compliance & Assurance",
      "Risk & Governance Frameworks",
      "Security Audits & Certifications"
    ],
    locked: false,
    category: "Global Taxation",
    instructor: "Global Tax Counsel",
    image: "/soc2_thumb.webp",
    badgeType: "bestseller",
    ctaText: "Check Fit"
  },
  {
    title: "FinTech Engineering — FP&A",
    subtitle: "Financial Planning & Analysis",
    badge: "Advanced",
    rating: 4.8,
    reviewsCount: 28,
    description: "Budgeting, forecasting, variance analysis and management reporting for professionals moving into FP&A, controllership and business-partnering roles.",
    bullets: [
      "Financial Modeling & Valuation",
      "Strategic Budgeting & Forecasting",
      "Corporate FP&A Best Practices",
      "Excel & BI Dashboards"
    ],
    locked: false,
    category: "FP&A & Modeling",
    instructor: "Corporate FP&A Directors",
    image: "/fpna_thumb.webp",
    badgeType: "new",
    ctaText: "Check Fit"
  }
];

export const featuresList = [
  {
    step: "01",
    title: "Pre-assessment",
    description: "Understand current skill level and identify the right starting track.",
    icon: FileCheck2,
  },
  {
    step: "02",
    title: "Post-training assessment",
    description: "Measure practical improvement and readiness after program completion.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Interview review",
    description: "Test confidence, communication, and role fit before placement routing.",
    icon: BadgeCheck,
  },
  {
    step: "04",
    title: "Targeted mentorship",
    description: "Give extra support where a learner needs improvement before entering hiring conversations.",
    icon: GraduationCap,
  },
];
