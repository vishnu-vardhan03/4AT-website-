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
  price: string;
  originalPrice?: string;
  image: string;
  badgeType?: 'bestseller' | 'new' | 'hot';
};

export const lmsCourses: LmsCourse[] = [
  {
    title: "MNC Finance Readiness: Level 1",
    subtitle: "Beginner – MNC Placement Track",
    badge: "Commitment Fee: ₹999 + GST",
    rating: 4.8,
    reviewsCount: 141,
    description: "Comprehensive MNC placement training covering Accounting, ERP, Financial Tools, Automation, and soft skills.",
    bullets: [
      "60-70 Hour Program",
      "Hands-on ERP, AI & Automation Tools",
      "Soft Skills & Business Communication",
      "Global Finance & Compliance Readiness"
    ],
    locked: false,
    category: "Accounting & ERP",
    instructor: "4AT Academy Core",
    price: "₹999",
    originalPrice: "₹2,999",
    image: "/acc_l1_thumb.webp",
    badgeType: "bestseller"
  },
  {
    title: "Advanced Corporate Accounting & ERP: Level 2",
    subtitle: "For 3+ Years Experienced Professionals",
    rating: 4.7,
    reviewsCount: 28,
    description: "Deep dive into complex financial reporting, IFRS, and automation built for advancing finance professionals.",
    bullets: [
      "Real-World Case Studies",
      "AI & Automation in Accounting",
      "Industry Mentorship",
      "Advanced Reporting & IFRS"
    ],
    locked: true,
    category: "Accounting & ERP",
    instructor: "Chartered Accountants Core",
    price: "₹2,499",
    originalPrice: "₹5,999",
    image: "/acc_l2_thumb.webp",
    badgeType: "new"
  },
  {
    title: "Specialized Course in Advanced Corporate Audit & Taxation",
    subtitle: "For 2+ Years Experienced Professionals",
    rating: 4.9,
    reviewsCount: 21,
    description: "Internal audits, risk analysis, and compliance strategies structured for high-stakes audit roles.",
    bullets: [
      "SOX & Internal Controls",
      "Big 4 Audit Standards",
      "Practical Audit Simulations",
      "Risk & Compliance Strategy"
    ],
    locked: true,
    category: "Audit & Risk",
    instructor: "Big 4 Audit Experts",
    price: "₹3,499",
    originalPrice: "₹7,999",
    image: "/ia_l1_thumb.webp",
    badgeType: "hot"
  },
  {
    title: "Global Audit & Tax Management Pathway",
    subtitle: "For 5+ Years Experienced Professionals",
    rating: 4.6,
    reviewsCount: 38,
    description: "US federal tax laws, compliance, and advisory training for professionals aiming for global tax roles.",
    bullets: [
      "IRS & SEC Regulations",
      "Advanced Tax Planning",
      "Career Elevation in Global Taxation",
      "Global Audit & Compliance"
    ],
    locked: true,
    category: "Global Taxation",
    instructor: "Global Tax Counsel",
    price: "₹4,999",
    originalPrice: "₹9,999",
    image: "/soc2_thumb.webp",
    badgeType: "bestseller"
  },
  {
    title: "Strategic Program in Financial Planning & Analysis (FP&A)",
    subtitle: "For 3+ Years Experienced Professionals",
    rating: 4.8,
    reviewsCount: 28,
    description: "Financial planning, analysis, modeling, and strategic budgeting for corporate FP&A pathways.",
    bullets: [
      "Financial Modeling & Valuation",
      "Strategic Budgeting & Forecasting",
      "Corporate FP&A Best Practices",
      "Excel & BI Dashboards"
    ],
    locked: true,
    category: "FP&A & Modeling",
    instructor: "Corporate FP&A Directors",
    price: "₹3,999",
    originalPrice: "₹8,999",
    image: "/fpna_thumb.webp",
    badgeType: "new"
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
