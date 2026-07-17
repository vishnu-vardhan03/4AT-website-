"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { SelectField, TextareaField, TextField } from "./FormFields";
import { SuccessMessage } from "./SuccessMessage";
import { BUDGET_OPTIONS, COMPANY_SIZE_OPTIONS, SERVICE_OPTIONS } from "./types";
import { useLeadForm } from "./useLeadForm";

interface LeadFormProps {
  onClose: () => void;
  bookMeetingHref?: string;
}

export function LeadForm({ onClose, bookMeetingHref = "/contact" }: LeadFormProps) {
  const { formData, updateField, errors, status, errorMessage, honeypot, setHoneypot, submit } =
    useLeadForm();
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  if (status === "success") {
    return <SuccessMessage onClose={onClose} bookMeetingHref={bookMeetingHref} />;
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="relative space-y-5"
    >
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="lead-widget-website">Website</label>
        <input
          id="lead-widget-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          ref={nameInputRef}
          id="lead-name"
          label="Full Name"
          required
          placeholder="Jane Doe"
          autoComplete="name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          error={errors.name}
        />
        <TextField
          id="lead-company"
          label="Company Name"
          required
          placeholder="Acme Inc."
          autoComplete="organization"
          value={formData.company}
          onChange={(e) => updateField("company", e.target.value)}
          error={errors.company}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="lead-email"
          type="email"
          label="Business Email"
          required
          placeholder="jane@acme.com"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
        />
        <TextField
          id="lead-phone"
          type="tel"
          label="Phone Number"
          required
          placeholder="+1 000 000 0000"
          autoComplete="tel"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          error={errors.phone}
        />
      </div>

      <SelectField
        id="lead-service"
        label="Service Interested In"
        required
        placeholder="Select a service"
        options={SERVICE_OPTIONS}
        value={formData.service}
        onChange={(e) => updateField("service", e.target.value as typeof formData.service)}
        error={errors.service}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          id="lead-company-size"
          label="Company Size"
          required
          placeholder="Select company size"
          options={COMPANY_SIZE_OPTIONS}
          value={formData.companySize}
          onChange={(e) =>
            updateField("companySize", e.target.value as typeof formData.companySize)
          }
          error={errors.companySize}
        />
        <SelectField
          id="lead-budget"
          label="Estimated Budget"
          required
          placeholder="Select a budget"
          options={BUDGET_OPTIONS}
          value={formData.budget}
          onChange={(e) => updateField("budget", e.target.value as typeof formData.budget)}
          error={errors.budget}
        />
      </div>

      <TextareaField
        id="lead-description"
        label="Project Description"
        required
        rows={4}
        placeholder="Tell us about your project, current challenges, and how we can help."
        value={formData.description}
        onChange={(e) => updateField("description", e.target.value)}
        error={errors.description}
      />

      {status === "error" && errorMessage && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-300">
          {errorMessage}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: status === "submitting" ? 1 : 1.01 }}
        whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
        className="relative w-full overflow-hidden rounded-xl bg-white px-6 py-4 text-sm font-black uppercase tracking-wide text-black transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          className={`flex items-center justify-center gap-2 transition-opacity duration-200 ${status === "submitting" ? "opacity-0" : "opacity-100"}`}
        >
          Submit Inquiry
        </span>
        {status === "submitting" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-5 animate-spin" />
          </span>
        )}
      </motion.button>

      <p className="text-center text-[11px] text-white/30">
        No spam, ever. We usually respond within one business day.
      </p>
    </form>
  );
}
