"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

interface SuccessMessageProps {
  onClose: () => void;
  bookMeetingHref?: string;
}

export function SuccessMessage({ onClose, bookMeetingHref }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="mb-6 flex size-16 items-center justify-center rounded-full border border-[#2dd4bf]/30 bg-[#2dd4bf]/10"
      >
        <Check className="size-8 text-[#2dd4bf]" strokeWidth={2.5} />
      </motion.div>
      <h3 className="text-2xl font-black tracking-tight text-white">Thank you!</h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
        We&apos;ve received your inquiry. Our team will review your requirements and get back to
        you shortly.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        {bookMeetingHref && (
          <Link
            href={bookMeetingHref}
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            Book a Meeting
          </Link>
        )}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/60 transition hover:border-white/30 hover:text-white"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
