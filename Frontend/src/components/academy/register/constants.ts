import type { StepInfo, RegistrationFormData } from "./types";
import type { CSSProperties } from "react";

// ── Option arrays ──────────────────────────────────────────────────────────────

export const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say",
] as const;

export const COLLEGE_OPTIONS = [
  "4AT College",
  "Delhi University",
  "Mumbai University",
  "Indian Institute of Technology (IIT)",
  "Indian Institute of Management (IIM)",
  "Other / Outside India",
] as const;

export const ACADEMIC_YEAR_OPTIONS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Graduate / Completed",
] as const;

export const EDUCATION_LEVEL_OPTIONS = [
  "High School",
  "Undergraduate Degree",
  "Postgraduate Degree",
  "Doctorate / PhD",
  "Diploma / Certification",
] as const;

export const DEPARTMENT_OPTIONS = [
  "Finance & Accounting",
  "Commerce",
  "Computer Science & Engineering",
  "Business Administration",
  "Management Studies",
  "Science & Arts",
  "Other",
] as const;

// ── Steps metadata ─────────────────────────────────────────────────────────────

export const STEPS_INFO: StepInfo[] = [
  { num: 1, label: "Personal Information", desc: "First name, country & contact details" },
  { num: 2, label: "Professional Information", desc: "Applicant type & professional profile" },
];

export const TOTAL_STEPS = STEPS_INFO.length;

// ── Default form state ─────────────────────────────────────────────────────────

export const INITIAL_FORM_DATA: RegistrationFormData = {
  firstName: "",
  lastName: "",
  gender: "",
  countryIso: "IN",
  stateIso: "",
  cityName: "",
  country: "India",
  state: "",
  city: "",
  email: "",
  mobileNumber: "",

  applicantType: "student",
  college: "",
  programName: "Fintech Engineering",
  academicYear: "",
  department: "",

  companyName: "",
  jobTitle: "",
  industry: "",
  yearsOfExperience: "",

  highestEducation: "",
  referredBy: "",
  termsAccepted: false,
};


// ── Shared styles ──────────────────────────────────────────────────────────────

/** Shared SVG chevron background used on every <select>. */
export const SELECT_CHEVRON_STYLE: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 16px center",
  backgroundSize: "16px",
};

/** Base classes for text inputs. */
export const INPUT_CLASS =
  "w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-500 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors";

/** Base classes for select dropdowns. */
export const SELECT_CLASS =
  "w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors appearance-none cursor-pointer";

/** Error-state border class applied when field has validation error. */
export const INPUT_ERROR_CLASS = "!border-red-400/60";

/** Disabled-state class. */
export const INPUT_DISABLED_CLASS = "opacity-40 cursor-not-allowed pointer-events-none";
