import Link from "next/link";
import { Linkedin } from "lucide-react";

type FooterItem = {
  label: string;
  href: string;
};

const footerColumns: Array<{ title: string; href: string; items: FooterItem[] }> = [
  {
    title: "Services",
    href: "/services",
    items: [
      { label: "Run My Finance Operations", href: "/services#run-finance-operations" },
      { label: "Get Audit-Ready", href: "/services#audit-ready" },
      { label: "Prepare for a Transaction", href: "/services#prepare-transaction" },
      { label: "Modernize Your Finance Stack", href: "/services#modernize-finance-stack" },
    ],
  },
  {
    title: "Product",
    href: "/product",
    items: [
      { label: "Product", href: "/product#capabilities" },
      { label: "AI Agents", href: "/product#agents" },
      { label: "Integration", href: "/product#integrations" },
      { label: "Pricing", href: "/product#pricing" },
    ],
  },
  {
    title: "Academy",
    href: "/academy",
    items: [
      { label: "Programs", href: "/academy/courses" },
      { label: "How it works", href: "/academy#program" },
      { label: "Placements", href: "/academy#outcomes" },
      { label: "Pre-assessment", href: "/academy/register" },
    ],
  },
  {
    title: "Explore",
    href: "/academy",
    items: [
      { label: "For employers", href: "/contact" },
      { label: "Fees & financing", href: "/academy/courses" },
      { label: "Certification", href: "/academy#outcomes" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    href: "/privacy",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/terms" },
      { label: "Student Login", href: "/admin/login" },
    ],
  },
];

const legalLinks: FooterItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/terms" },
  { label: "Student Login", href: "/admin/login" },
];

interface FooterProps {
  className?: string;
}

export function Footer({ className = "m-3" }: FooterProps) {
  return (
    <footer className={`overflow-hidden rounded-xl bg-[#0a0a0a] text-white ${className}`}>
      <div className="mx-auto max-w-7xl px-8 pb-6 pt-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-[1.25fr_repeat(5,1fr)] lg:gap-6">
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-xl font-medium tracking-[-0.02em] text-white transition-colors hover-fine:text-sky-300"
            >
              4AT
            </Link>
            <p className="mt-2.5 max-w-[220px] text-[13px] leading-[1.6] text-white/50">
              The hybrid AI-and-human financial ecosystem for finance, accounting, and audit teams.
            </p>
            <div className="mt-4 flex gap-3.5">
              <a
                href="https://www.linkedin.com/company/4at-consulting/"
                target="_blank"
                rel="noreferrer"
                aria-label="4AT on LinkedIn"
                className="text-white/40 transition-colors hover-fine:text-sky-300"
              >
                <Linkedin className="size-[18px]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-2.5 text-[13px] font-semibold text-white uppercase tracking-wider font-mono">
                <Link href={column.href} className="transition-colors hover-fine:text-sky-300">
                  {column.title}
                </Link>
              </h2>
              <ul className="flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={item.label} className="text-[13px] leading-5 font-sans">
                    <Link href={item.href} className="text-white/50 transition-colors hover-fine:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-white/40 font-mono">© 2026 4AT. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <Link key={item.label} href={item.href} className="text-xs text-white/40 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
