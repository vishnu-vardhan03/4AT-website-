"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { INPUT_ERROR_CLASS } from "./constants";

interface FormFieldProps {
  /** Field ID — ties label to input. */
  id: string;
  /** Visible label text. */
  label: string;
  /** Whether field is required (shows accent asterisk). */
  required?: boolean;
  /** Validation error message (if any). */
  error?: string;
  /** Extra wrapper className. */
  className?: string;
  /** The input / select / custom element. */
  children: React.ReactNode;
}

/**
 * Reusable form-field wrapper matching the existing academy design.
 * Provides: label → child input → inline error message.
 */
export function FormField({
  id,
  label,
  required = false,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-0", className)}>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>

      {/* Apply error border class to the direct child input/select */}
      <div className={cn(error && INPUT_ERROR_CLASS)}>
        {children}
      </div>

      {error && (
        <p className="text-red-400 text-[10px] mt-1.5">{error}</p>
      )}
    </div>
  );
}
