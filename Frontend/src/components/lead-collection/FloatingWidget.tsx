"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { LeadForm } from "./LeadForm";
import { trackLeadWidgetEvent } from "./analytics";

const DISPLAY_DELAY_MS = 9000;
const SCROLL_DEPTH_THRESHOLD = 0.3;
const SESSION_DISMISS_KEY = "4at:lead-widget:dismissed";

export function FloatingWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const hasTrackedDisplay = useRef(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_DISMISS_KEY)) return;

    let settled = false;
    const reveal = () => {
      if (settled) return;
      settled = true;
      setVisible(true);
    };

    const timer = window.setTimeout(reveal, DISPLAY_DELAY_MS);

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      if (window.scrollY / scrollableHeight >= SCROLL_DEPTH_THRESHOLD) reveal();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (visible && !hasTrackedDisplay.current) {
      hasTrackedDisplay.current = true;
      trackLeadWidgetEvent("widget_displayed");
    }
  }, [visible]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    trackLeadWidgetEvent("widget_opened");
  };

  const handleDismissCompact = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(SESSION_DISMISS_KEY, "1");
    } catch {
      // Storage unavailable — safe to ignore.
    }
  };

  if (!visible) return null;

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            key="lead-widget-compact"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-40 sm:bottom-8 sm:right-8"
          >
            <div className="lead-widget-float group relative">
              <button
                type="button"
                aria-label="Dismiss"
                onClick={handleDismissCompact}
                className="absolute -right-2 -top-2 z-10 grid size-5 place-items-center rounded-full border border-white/15 bg-[#070a14] text-white/50 opacity-0 shadow-md transition-opacity duration-200 hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
              >
                <X className="size-3" />
              </button>
              <motion.button
                type="button"
                onClick={handleOpen}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] py-3.5 pl-4 pr-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.1]"
              >
                <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2dd4bf] via-[#7dd3fc] to-[#a78bfa]">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#7dd3fc]/40" />
                  <Sparkles className="relative size-4 text-[#04060f]" strokeWidth={2.5} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                    Need AI Solutions?
                  </span>
                  <span className="text-sm font-bold text-white">Talk to Our Experts</span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="lead-widget-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              key="lead-widget-panel"
              initial={isMobile ? { y: "100%" } : { opacity: 0, y: 40, scale: 0.96 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isMobile ? { y: "100%" } : { opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Talk to our experts"
              className="fixed inset-x-0 bottom-0 z-[100] flex max-h-[92vh] flex-col overflow-hidden rounded-t-3xl border-t border-white/10 bg-[#070a14]/95 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:inset-x-auto sm:bottom-8 sm:right-8 sm:max-h-[85vh] sm:w-[440px] sm:rounded-3xl sm:border"
            >
              <div className="pointer-events-none absolute -inset-px rounded-t-3xl bg-gradient-to-br from-[#2dd4bf]/10 via-transparent to-[#a78bfa]/10 sm:rounded-3xl" />

              <div className="relative flex items-start justify-between gap-4 border-b border-white/8 px-6 py-6 sm:px-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7dd3fc]">
                    We&apos;re here to help
                  </span>
                  <h2 className="mt-2 text-xl font-black tracking-tight text-white">
                    Let&apos;s Build Together
                  </h2>
                  <p className="mt-1 text-xs text-white/45">
                    Tell us about your project and we&apos;ll be in touch shortly.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/25 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="relative flex-1 overflow-y-auto px-6 py-6 sm:px-8">
                <LeadForm onClose={() => setOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
