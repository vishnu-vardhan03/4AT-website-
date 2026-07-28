"use client";

import React from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  defaultCountry?: string;
}

/**
 * International phone input with country selector, dial code,
 * and dark-themed styling to match the academy glassmorphic form.
 */
export function PhoneField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder = "Enter phone number",
  defaultCountry = "in",
}: PhoneFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2"
      >
        {label} <span className="text-accent">*</span>
      </label>

      {/* `defaultCountry` is read only on mount, so a later change to it would otherwise be
          silently ignored and the dial code would stay stuck on the first country. Keying the
          input on it forces a remount so a reactive `defaultCountry` actually takes effect.
          Callers that change it must clear `value` in the same update, otherwise the country
          is re-derived from the old number's dial code. */}
      <PhoneInput
        key={defaultCountry}
        defaultCountry={defaultCountry}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputProps={{ id }}
        className="academy-phone-input"
      />

      {error && (
        <p className="text-red-400 text-[10px] mt-1.5">{error}</p>
      )}
    </div>
  );
}
