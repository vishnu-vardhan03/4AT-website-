"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LEAD_FORM_STORAGE_KEY, type LeadFormData } from "./types";
import { trackLeadWidgetEvent } from "./analytics";

const EMPTY_FORM: LeadFormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  companySize: "",
  budget: "",
  description: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;
export type LeadFormStatus = "idle" | "submitting" | "success" | "error";

function validate(data: LeadFormData): LeadFormErrors {
  const errors: LeadFormErrors = {};
  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.company.trim()) errors.company = "Company name is required";
  if (!data.email.trim()) errors.email = "Business email is required";
  else if (!EMAIL_REGEX.test(data.email.trim())) errors.email = "Enter a valid email address";
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  if (!data.service) errors.service = "Please select a service";
  if (!data.companySize) errors.companySize = "Please select a company size";
  if (!data.budget) errors.budget = "Please select a budget range";
  if (!data.description.trim()) errors.description = "Tell us a bit about your project";
  else if (data.description.trim().length < 10)
    errors.description = "Please add a few more details";
  return errors;
}

function readDraft(): Partial<LeadFormData> | null {
  try {
    const raw = window.localStorage.getItem(LEAD_FORM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useLeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(() => ({
    ...EMPTY_FORM,
    ...readDraft(),
  }));
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(LEAD_FORM_STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // Storage unavailable (e.g. private browsing) — safe to ignore.
    }
  }, [formData]);

  const updateField = useCallback(
    <K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => {
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        trackLeadWidgetEvent("form_started");
      }
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    },
    [],
  );

  const reset = useCallback(() => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setHoneypot("");
    setStatus("idle");
    setErrorMessage(null);
    try {
      window.localStorage.removeItem(LEAD_FORM_STORAGE_KEY);
    } catch {
      // Storage unavailable — safe to ignore.
    }
  }, []);

  const submit = useCallback(async () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (honeypot) {
      // Hidden field only a bot would fill — pretend success, skip the API.
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);
    trackLeadWidgetEvent("form_submitted");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackLeadWidgetEvent("form_completed");
      try {
        window.localStorage.removeItem(LEAD_FORM_STORAGE_KEY);
      } catch {
        // Storage unavailable — safe to ignore.
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }, [formData, honeypot]);

  return {
    formData,
    updateField,
    errors,
    status,
    errorMessage,
    honeypot,
    setHoneypot,
    submit,
    reset,
  };
}
