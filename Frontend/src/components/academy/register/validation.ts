/**
 * Pure validation functions for the Academy Registration Form.
 * No React dependencies — easily unit-testable.
 */
import type { RegistrationFormData } from "./types";
import { isValidPhoneNumber } from "libphonenumber-js";

// ── Individual field validators ────────────────────────────────────────────────
// Each returns an error string or null.

const ALPHA_REGEX = /^[A-Za-z]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(value: string, label: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  if (trimmed.length < 2) return `${label} must be at least 2 characters`;
  if (trimmed.length > 50) return `${label} must be 50 characters or less`;
  if (!ALPHA_REGEX.test(trimmed)) return `${label} may only contain letters (no spaces or special characters)`;
  return null;
}

export function validateRequired(value: string, label: string): string | null {
  if (!value || !value.trim()) return `${label} is required`;
  return null;
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email address is required";
  if (!EMAIL_REGEX.test(value.trim())) return "Please enter a valid email address";
  return null;
}

export function validatePhone(value: string, label: string): string | null {
  if (!value || value.trim() === "" || value.trim() === "+") {
    return `${label} is required`;
  }
  try {
    if (!isValidPhoneNumber(value)) {
      return `Please enter a valid ${label.toLowerCase()} matching country standards`;
    }
  } catch (e) {
    return `Please enter a valid ${label.toLowerCase()} matching country standards`;
  }
  return null;
}

export function validatePassword(value: string): string | null {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
  if (!/\d/.test(value)) return "Password must contain at least one number";
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(value))
    return "Password must contain at least one special character";
  return null;
}

export function validateConfirmPassword(password: string, confirm: string): string | null {
  if (!confirm) return "Please confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return null;
}

// ── Password strength meter ────────────────────────────────────────────────────

export type PasswordStrength = 0 | 1 | 2 | 3 | 4;

export function getPasswordStrength(pw: string): PasswordStrength {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score as PasswordStrength;
}

export const STRENGTH_LABELS: Record<PasswordStrength, string> = {
  0: "",
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
};

export const STRENGTH_COLORS: Record<PasswordStrength, string> = {
  0: "bg-white/10",
  1: "bg-red-500",
  2: "bg-amber-500",
  3: "bg-blue-400",
  4: "bg-emerald-400",
};

// ── Per-step validation ────────────────────────────────────────────────────────

export function validateStep(
  step: number,
  data: RegistrationFormData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 1) {
    const fn = validateName(data.firstName, "First name");
    if (fn) errors.firstName = fn;
    
    const ln = validateName(data.lastName, "Last name");
    if (ln) errors.lastName = ln;
    
    const g = validateRequired(data.gender, "Gender selection");
    if (g) errors.gender = g;

    const co = validateRequired(data.country, "Country");
    if (co) errors.country = co;

    const st = validateRequired(data.state, "State");
    if (st) errors.state = st;

    const ci = validateRequired(data.city, "City");
    if (ci) errors.city = ci;

    const em = validateEmail(data.email);
    if (em) errors.email = em;

    const mn = validatePhone(data.mobileNumber, "Mobile number");
    if (mn) errors.mobileNumber = mn;
  }

  if (step === 2) {
    const he = validateRequired(data.highestEducation, "Highest education");
    if (he) errors.highestEducation = he;

    if (data.applicantType === "student") {
      const c = validateRequired(data.college, "College");
      if (c) errors.college = c;

      const d = validateRequired(data.department, "Department");
      if (d) errors.department = d;

      const p = validateRequired(data.programName, "Program / Course");
      if (p) errors.programName = p;

      const ay = validateRequired(data.academicYear, "Academic year");
      if (ay) errors.academicYear = ay;
    } else {
      const cn = validateRequired(data.companyName, "Company name");
      if (cn) errors.companyName = cn;

      const jt = validateRequired(data.jobTitle, "Job title / Designation");
      if (jt) errors.jobTitle = jt;

      const ind = validateRequired(data.industry, "Industry");
      if (ind) errors.industry = ind;

      const yoe = validateRequired(data.yearsOfExperience, "Years of experience");
      if (yoe) errors.yearsOfExperience = yoe;
    }

    if (!data.termsAccepted) {
      errors.termsAccepted = "You must accept the terms and policies";
    }
  }

  return errors;
}

