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
      { label: "Support", href: "/product#hybrid" },
    ],
  },
  {
    title: "Academy",
    href: "/academy",
    items: [
      { label: "Program", href: "/academy#programs" },
      { label: "Blueprint", href: "/academy#features" },
      { label: "Launch", href: "/academy#enroll" },
      { label: "Connect", href: "/academy#contact-us" },
    ],
  },
  {
    title: "Company",
    href: "/about",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

const legalLinks = ["Privacy policy", "Terms of service", "Cookies"];

interface FooterProps {
  className?: string;
}

export function Footer({ className = "m-3" }: FooterProps) {
  return (
    <footer className={`overflow-hidden rounded-xl bg-[#0a0a0a] text-white ${className}`}>
      <div className="mx-auto max-w-6xl px-8 pb-6 pt-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-[1.35fr_1.45fr_repeat(3,1fr)] lg:gap-5">
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-xl font-medium tracking-[-0.02em] text-white transition-colors hover:text-sky-300"
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
                className="text-white/40 transition-colors hover:text-sky-300"
              >
                <Linkedin className="size-[18px]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-2.5 text-[13px] font-medium text-white">
                <Link href={column.href} className="transition-colors hover:text-sky-300">
                  {column.title}
                </Link>
              </h2>
              <ul className="flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={item.label} className="text-[13px] leading-5">
                    <Link href={item.href} className="text-white/50 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-white/40">© 2026 4AT. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <span key={item} className="text-xs text-white/40">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
