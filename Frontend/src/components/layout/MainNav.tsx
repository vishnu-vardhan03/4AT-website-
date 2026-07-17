"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const productMenuItems = [
  { label: "Product", href: "/product#capabilities" },
  { label: "AI Agents", href: "/product#agents" },
  { label: "Integration", href: "/product#integrations" },
  { label: "Pricing", href: "/product#pricing" },
  { label: "Support", href: "/product#hybrid" },
];

const serviceMenuItems = [
  { label: "Run My Finance Operations", href: "/services#run-finance-operations" },
  { label: "Get Audit-Ready", href: "/services#audit-ready" },
  { label: "Prepare for a Transaction", href: "/services#prepare-transaction" },
  { label: "Modernize Your Finance Stack", href: "/services#modernize-finance-stack" },
];

const academyMenuItems = [
  { label: "Program", href: "/academy#courses" },
  { label: "Blueprint", href: "/academy#features" },
  { label: "Launch", href: "/academy#enroll" },
  { label: "Connect", href: "/academy#contact-us" },
];

const aboutMenuItems = [
  { label: "Vision", href: "/about#vision" },
  { label: "Mission", href: "/about#mission" },
  { label: "Our Values", href: "/about#our-values" },
  { label: "Leadership Principles", href: "/about#leadership-principles" },
  { label: "Our Growth", href: "/about#our-growth" },
  { label: "Our Leadership", href: "/about#executive-team" },
];

const mobileNavGroups = [
  { label: "About", href: "/about", items: aboutMenuItems },
  { label: "Services", href: "/services", items: serviceMenuItems },
  { label: "Product", href: "/product", items: productMenuItems },
  { label: "Academy", href: "/academy", items: academyMenuItems },
];

const activeNavClass = "relative text-sky-300 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-gradient-to-r after:from-cyan-300 after:to-violet-400";

const isPathActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

type NavDropdownProps = {
  label: string;
  href: string;
  imageHref: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  items: Array<{ label: string; href: string }>;
  isDarkBg: boolean;
  isActive: boolean;
};

function NavDropdown({
  label,
  href,
  imageHref,
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  items,
  isDarkBg,
  isActive,
}: NavDropdownProps) {
  return (
    <div className="group relative">
      <Link
        href={href}
        aria-haspopup="menu"
        aria-current={isActive ? "page" : undefined}
        className={`flex items-center gap-1 transition-colors ${isActive ? activeNavClass : isDarkBg ? "hover:text-white" : "hover:text-black"}`}
      >
        {label}
        <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>

      <div className="pointer-events-none invisible absolute left-1/2 top-full z-[80] w-[640px] -translate-x-1/2 translate-y-2 pt-5 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="grid grid-cols-[1.05fr_.95fr] gap-3 overflow-hidden rounded-2xl border border-white/12 bg-[#070a14]/95 p-3 shadow-[0_28px_80px_rgba(0,0,0,.55)] backdrop-blur-2xl">
          <Link
            href={imageHref}
            className="group/image relative min-h-[250px] overflow-hidden rounded-xl border border-white/10"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="320px"
              className="object-cover transition-transform duration-500 group-hover/image:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050711] via-[#050711]/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#7dd3fc]">{eyebrow}</span>
              <p className="mt-2 text-lg font-bold leading-tight">{headline}</p>
            </div>
          </Link>

          <div className="flex flex-col rounded-xl border border-white/8 bg-white/[.025] p-2" role="menu">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                role="menuitem"
                className="group/item flex flex-1 items-center justify-between gap-3 rounded-lg border border-transparent px-4 text-sm font-semibold leading-tight text-zinc-300 transition hover:border-white/8 hover:bg-white/[.055] hover:text-white focus-visible:border-white/15 focus-visible:bg-white/[.055] focus-visible:text-white focus-visible:outline-none"
              >
                {item.label}
                <span className="shrink-0 text-[#7dd3fc] opacity-0 transition group-hover/item:translate-x-0.5 group-hover/item:opacity-100">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Nav({ contactHref = "/contact" }: { contactHref?: string }) {
  const pathname = usePathname();
  const [isDarkBg, setIsDarkBg] = useState(true);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileGroup(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerPos = 60; // position of navbar on screen
      const sections = document.querySelectorAll("section, div[id]");
      let activeBgIsLight = false;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= headerPos && rect.bottom >= headerPos) {
          const isLightSec = sec.getAttribute("data-nav-theme") === "light";
          if (isLightSec) {
            activeBgIsLight = true;
          }
        }
      });
      setIsDarkBg(!activeBgIsLight);

      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 24 || mobileOpen) {
        setIsNavHidden(false);
      } else if (scrollDelta > 10) {
        setIsNavHidden(true);
      } else if (scrollDelta < -10) {
        setIsNavHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={isNavHidden ? { opacity: 0, y: -88 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="fixed left-1/2 top-3 z-50 w-[min(1400px,calc(100%-2rem))] -translate-x-1/2 font-[family-name:var(--font-geist-sans)]"
    >
      <div
        className="grid min-h-14 grid-cols-[1fr_auto] items-center gap-4 px-1 transition-all duration-300 md:grid-cols-[1fr_auto_1fr] md:px-3"
      >
        <Link
          href="/"
          className="relative flex items-center justify-self-start"
        >
          <motion.div
            initial="initial"
            whileHover="hover"
            className="flex items-center cursor-pointer"
          >
            <motion.span
              aria-label="4AT Logo"
              role="img"
              className="brand-logo-gradient relative z-10 !h-8 !w-12"
              style={{ WebkitMaskImage: `url(${logo.src})`, maskImage: `url(${logo.src})` }}
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.1 }
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
            <motion.span
              variants={{
                initial: { width: 0, opacity: 0, marginLeft: 0 },
                hover: { width: "auto", opacity: 1, marginLeft: 10 }
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`overflow-hidden whitespace-nowrap text-[28px] font-black uppercase leading-7 tracking-wide ${
                isDarkBg ? "text-white" : "text-black"
              }`}
            >
              4AT
            </motion.span>
          </motion.div>
        </Link>
        <nav
          className={`hidden items-center justify-self-center gap-6 text-[16px] font-semibold leading-7 transition-colors duration-300 md:flex xl:gap-10 ${isDarkBg ? "text-zinc-300" : "text-zinc-800"
          }`}
        >
          <NavDropdown
            label="About"
            href="/about"
            imageHref="/about#vision"
            imageSrc="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80"
            imageAlt="4AT team collaborating"
            eyebrow="About 4AT"
            headline="Meet the vision, values, and people behind 4AT"
            items={aboutMenuItems}
            isDarkBg={isDarkBg}
            isActive={isPathActive(pathname, "/about")}
          />
          <NavDropdown
            label="Services"
            href="/services"
            imageHref="/services#run-finance-operations"
            imageSrc="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"
            imageAlt="Placeholder for 4AT services"
            eyebrow="4AT Services"
            headline="Choose the outcome your finance team needs"
            items={serviceMenuItems}
            isDarkBg={isDarkBg}
            isActive={isPathActive(pathname, "/services")}
          />
          <div className="group relative">
            <Link
              href="/product"
              aria-haspopup="menu"
              aria-current={isPathActive(pathname, "/product") ? "page" : undefined}
              className={`flex items-center gap-1 transition-colors ${isPathActive(pathname, "/product") ? activeNavClass : isDarkBg ? "hover:text-white" : "hover:text-black"}`}
            >
              Product
              <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
            </Link>

            <div className="pointer-events-none invisible absolute left-1/2 top-full z-[80] w-[640px] -translate-x-1/2 translate-y-2 pt-5 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="grid grid-cols-[1.05fr_.95fr] gap-3 overflow-hidden rounded-2xl border border-white/12 bg-[#070a14]/95 p-3 shadow-[0_28px_80px_rgba(0,0,0,.55)] backdrop-blur-2xl">
                <Link
                  href="/product#capabilities"
                  className="group/image relative min-h-[250px] overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
                    alt="Placeholder for 4AT product"
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-500 group-hover/image:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050711] via-[#050711]/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#7dd3fc]">4AT Product</span>
                    <p className="mt-2 text-lg font-bold leading-tight">Explore the finance-native AI platform</p>
                  </div>
                </Link>

                <div className="flex flex-col rounded-xl border border-white/8 bg-white/[.025] p-2" role="menu">
                  {productMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      role="menuitem"
                      className="group/item flex flex-1 items-center justify-between rounded-lg border border-transparent px-4 text-sm font-semibold text-zinc-300 transition hover:border-white/8 hover:bg-white/[.055] hover:text-white focus-visible:border-white/15 focus-visible:bg-white/[.055] focus-visible:text-white focus-visible:outline-none"
                    >
                      {item.label}
                      <span className="text-[#7dd3fc] opacity-0 transition group-hover/item:translate-x-0.5 group-hover/item:opacity-100">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <NavDropdown
            label="Academy"
            href="/academy"
            imageHref="/academy#courses"
            imageSrc="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
            imageAlt="Placeholder for 4AT Academy"
            eyebrow="4AT Academy"
            headline="Build your path from learning to launch"
            items={academyMenuItems}
            isDarkBg={isDarkBg}
            isActive={isPathActive(pathname, "/academy")}
          />
        </nav>
        <div className="flex items-center justify-self-end gap-2">
          <Link
            href={contactHref}
            className={`hidden min-h-10 items-center rounded-full px-5 py-2 text-[16px] font-medium leading-7 transition-all duration-300 md:inline-flex ${isDarkBg
                ? "bg-white text-black hover:shadow-[0_0_24px_rgba(255,255,255,0.4)]"
                : "bg-black text-white hover:shadow-[0_0_24px_rgba(0,0,0,0.2)]"
              }`}
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className={`grid size-10 place-items-center rounded-full border transition md:hidden ${isDarkBg
              ? "border-white/12 bg-white/[.06] text-white"
              : "border-black/12 bg-black/[.06] text-black"
            }`}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-3 max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#070a14]/97 p-3 text-white shadow-[0_24px_70px_rgba(0,0,0,.55)] backdrop-blur-2xl md:hidden"
        >
          {mobileNavGroups.map((group) => {
            const expanded = mobileGroup === group.label;
            const active = isPathActive(pathname, group.href);

            return (
              <div key={group.label} className="border-t border-white/8">
                <div className="flex min-h-12 items-center gap-2">
                  <Link
                    href={group.href}
                    onClick={closeMobileMenu}
                    aria-current={active ? "page" : undefined}
                    className={`flex flex-1 items-center rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-white/[.06] ${active ? "bg-sky-400/10 text-sky-300" : ""}`}
                  >
                    {group.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${expanded ? "Collapse" : "Expand"} ${group.label} links`}
                    aria-expanded={expanded}
                    onClick={() => setMobileGroup(expanded ? null : group.label)}
                    className="mr-1 grid size-10 shrink-0 place-items-center rounded-xl border border-white/8 bg-white/[.035] text-white/75"
                  >
                    <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {expanded && (
                  <div className="mb-3 ml-4 grid gap-1 border-l border-[#7dd3fc]/25 pl-3">
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="rounded-lg px-3 py-2.5 text-xs font-medium leading-snug text-zinc-300 transition hover:bg-white/[.055] hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href={contactHref}
            onClick={closeMobileMenu}
            className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-white px-4 text-sm font-bold text-black"
          >
            Let&apos;s talk
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
