"use client";

import { CheckCircle2, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./Button";

// Option lists for selects
const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];

const COLLEGE_OPTIONS = [
  "4AT College",
  "Delhi University",
  "Mumbai University",
  "Indian Institute of Technology (IIT)",
  "Indian Institute of Management (IIM)",
  "Other / Outside India"
];

const ACADEMIC_YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate / Completed"];

const EDUCATION_LEVEL_OPTIONS = [
  "High School",
  "Undergraduate Degree",
  "Postgraduate Degree",
  "Doctorate / PhD",
  "Diploma / Certification"
];

const DEPARTMENT_OPTIONS = [
  "Finance & Accounting",
  "Commerce",
  "Computer Science & Engineering",
  "Business Administration",
  "Management Studies",
  "Science & Arts",
  "Other"
];

const COUNTRY_OPTIONS = ["India", "United States", "United Kingdom", "United Arab Emirates", "Singapore", "Canada", "Other"];

const STATE_OPTIONS = [
  "Maharashtra",
  "Delhi NCR",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Gujarat",
  "Haryana",
  "Other"
];

const CITY_OPTIONS = [
  "Mumbai",
  "New Delhi / Noida / Gurugram",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Other"
];

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    // Step 1: Basic
    firstName: "",
    lastName: "",
    gender: "",
    
    // Step 2: Additional/Education
    college: "4AT College",
    programName: "Fintech Engineering",
    academicYear: "",
    highestEducation: "",
    department: "",
    referredBy: "",

    // Step 3: Location
    country: "India",
    state: "",
    city: "",

    // Step 4: Login & Contact
    email: "",
    mobileNumber: "",
    emergencyContact: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const validateStep = (currentStep: number) => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!formData.gender) errors.gender = "Gender selection is required";
    }

    if (currentStep === 2) {
      if (!formData.college) errors.college = "College selection is required";
      if (!formData.academicYear) errors.academicYear = "Academic year is required";
      if (!formData.highestEducation) errors.highestEducation = "Highest education is required";
      if (!formData.department) errors.department = "Department is required";
    }

    if (currentStep === 3) {
      if (!formData.country) errors.country = "Country selection is required";
      if (!formData.state) errors.state = "State is required";
      if (!formData.city) errors.city = "City is required";
    }

    if (currentStep === 4) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
      if (!formData.mobileNumber || formData.mobileNumber.length < 8) {
        errors.mobileNumber = "Enter a valid phone number";
      }
      if (!formData.emergencyContact || formData.emergencyContact.length < 8) {
        errors.emergencyContact = "Enter a valid emergency contact number";
      }
      if (!formData.username.trim()) {
        errors.username = "Username is required";
      } else if (!emailRegex.test(formData.username)) {
        errors.username = "Username must be in email format";
      }
      if (!formData.password || formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      if (!formData.termsAccepted) {
        errors.termsAccepted = "You must accept the terms and policies";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/academy-register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          const result = await response.json().catch(() => null);
          throw new Error(result?.message ?? result?.error ?? "Registration could not be saved");
        }
        setIsSubmitted(true);
      } catch (error) {
        console.error("Academy registration failed", error);
        setFormErrors({ submit: error instanceof Error ? error.message : "Registration could not be saved" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Sync username field with email field for convenience
  const handleEmailChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      email: val,
      username: prev.username === prev.email ? val : prev.username || val
    }));
  };

  const stepsInfo = [
    { num: 1, label: "Basic Details", desc: "First name, last name & gender identity" },
    { num: 2, label: "Education Profile", desc: "College, department & academic level" },
    { num: 3, label: "Location", desc: "Your operating country, state & city" },
    { num: 4, label: "Security & Contact", desc: "Verification email, phone & secure login" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-start w-full">
      {/* Left Column: Stepper Roadmap */}
      <div className="lg:sticky lg:top-24">
        <span className="section-eyebrow mb-6 text-accent uppercase tracking-widest text-[11px] font-bold">
          LMS Academy Enrollment
        </span>
        <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-white mt-6 leading-none">
          Register <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">Yourself</span>
          <br />
          For the Academy.
        </h2>
        <p className="mt-6 text-base text-ink-secondary leading-relaxed max-w-[48ch]">
          Complete your profile below to gain dashboard access, customize your specialized learning path, and link directly with hiring partners.
        </p>

        {/* Stepper Wizard Indicator */}
        <div className="mt-12 relative pl-8 border-l border-white/5 space-y-10">
          {stepsInfo.map((s) => {
            const isActive = step === s.num;
            const isCompleted = step > s.num;
            return (
              <div key={s.num} className="relative group">
                {/* Node Dot */}
                <div
                  className={`absolute -left-[41px] top-1.5 flex items-center justify-center w-[25px] h-[25px] rounded-full text-[10px] font-bold border transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-[#04060f] border-accent shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                      : isCompleted
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-[#0b0e1a] text-slate-500 border-white/10"
                  }`}
                >
                  {isCompleted ? "✓" : s.num}
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? "text-accent font-extrabold" : isCompleted ? "text-emerald-400/90" : "text-slate-500"
                    }`}
                  >
                    {s.label}
                  </h4>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    isActive ? "text-slate-300" : "text-slate-500"
                  }`}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Signals Footer Block */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-6 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>128-bit Secure Registration</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Auto-creates LMS Profile</span>
          </div>
        </div>
      </div>

      {/* Right Column: Premium Multi-Step Glassmorphic Form Card */}
      <div className="relative rounded-3xl border border-white/8 bg-[#0b0e1a]/40 p-8 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden w-full max-w-[620px] mx-auto lg:ml-auto">
        <div className="absolute -inset-px bg-gradient-to-br from-accent/10 to-transparent rounded-3xl pointer-events-none z-0" />

        <div className="relative z-10">
          {isSubmitted ? (
            // Success Confirmation State
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="size-8 text-accent animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Registration Completed!</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                Welcome to 4AT Academy. Your profile has been initialized successfully. Please check your email inbox (<strong>{formData.email}</strong>) to verify your account and access the LMS portal.
              </p>
              <Button
                href="https://lms.4at-academy.com"
                variant="primary"
                className="mt-8 px-8 py-3.5 text-xs rounded-xl"
              >
                Go To LMS Dashboard →
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step Title Header */}
              <div className="border-b border-white/5 pb-4 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                  STEP {step} OF 4
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {stepsInfo[step - 1].label}
                </h3>
              </div>

              {/* Step 1: Basic Details */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        First Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                      />
                      {formErrors.firstName && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Last Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                      />
                      {formErrors.lastName && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Gender <span className="text-accent">*</span>
                    </label>
                    <select
                      id="gender"
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                        backgroundSize: "16px"
                      }}
                    >
                      <option value="" className="bg-[#0b0e1a]">Select gender</option>
                      {GENDER_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                      ))}
                    </select>
                    {formErrors.gender && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.gender}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Additional / Education Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="college" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        College <span className="text-accent">*</span>
                      </label>
                      <select
                        id="college"
                        required
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          backgroundSize: "16px"
                        }}
                      >
                        {COLLEGE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                        ))}
                      </select>
                      {formErrors.college && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.college}</p>}
                    </div>

                    <div>
                      <label htmlFor="programName" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Program Name
                      </label>
                      <input
                        type="text"
                        id="programName"
                        placeholder="e.g. Fintech Engineering"
                        value={formData.programName}
                        onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="academicYear" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Academic Year <span className="text-accent">*</span>
                      </label>
                      <select
                        id="academicYear"
                        required
                        value={formData.academicYear}
                        onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          backgroundSize: "16px"
                        }}
                      >
                        <option value="" className="bg-[#0b0e1a]">Select academic year</option>
                        {ACADEMIC_YEAR_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                        ))}
                      </select>
                      {formErrors.academicYear && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.academicYear}</p>}
                    </div>

                    <div>
                      <label htmlFor="highestEducation" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Highest Level of Education <span className="text-accent">*</span>
                      </label>
                      <select
                        id="highestEducation"
                        required
                        value={formData.highestEducation}
                        onChange={(e) => setFormData({ ...formData, highestEducation: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          backgroundSize: "16px"
                        }}
                      >
                        <option value="" className="bg-[#0b0e1a]">Select education level</option>
                        {EDUCATION_LEVEL_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                        ))}
                      </select>
                      {formErrors.highestEducation && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.highestEducation}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="department" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Department <span className="text-accent">*</span>
                      </label>
                      <select
                        id="department"
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          backgroundSize: "16px"
                        }}
                      >
                        <option value="" className="bg-[#0b0e1a]">Select department</option>
                        {DEPARTMENT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                        ))}
                      </select>
                      {formErrors.department && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.department}</p>}
                    </div>

                    <div>
                      <label htmlFor="referredBy" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Referred By
                      </label>
                      <input
                        type="text"
                        id="referredBy"
                        placeholder="Friend, Advisor, LinkedIn..."
                        value={formData.referredBy}
                        onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Location Details */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="country" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Country <span className="text-accent">*</span>
                    </label>
                    <select
                      id="country"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                        backgroundSize: "16px"
                      }}
                    >
                      {COUNTRY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                      ))}
                    </select>
                    {formErrors.country && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.country}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        State <span className="text-accent">*</span>
                      </label>
                      <select
                        id="state"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          backgroundSize: "16px"
                        }}
                      >
                        <option value="" className="bg-[#0b0e1a]">Select state</option>
                        {STATE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                        ))}
                      </select>
                      {formErrors.state && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.state}</p>}
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        City <span className="text-accent">*</span>
                      </label>
                      <select
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          backgroundSize: "16px"
                        }}
                      >
                        <option value="" className="bg-[#0b0e1a]">Select city</option>
                        {CITY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                        ))}
                      </select>
                      {formErrors.city && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.city}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Login & Contact Security */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                      />
                      {formErrors.email && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="mobileNumber" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Mobile Number <span className="text-accent">*</span>
                      </label>
                      <input
                        type="tel"
                        id="mobileNumber"
                        required
                        placeholder="Enter contact number"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                      />
                      {formErrors.mobileNumber && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.mobileNumber}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="emergencyContact" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Emergency Contact Number <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="emergencyContact"
                      required
                      placeholder="Emergency relative / guardian number"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                    />
                    {formErrors.emergencyContact && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.emergencyContact}</p>}
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-2">
                    <label htmlFor="username" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Username (Email format only) <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      required
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                    />
                    {formErrors.username && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.username}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Password <span className="text-accent">*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        required
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                      />
                      {formErrors.password && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.password}</p>}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Confirm Password <span className="text-accent">*</span>
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        required
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full rounded-xl border border-white/8 bg-[#04060f]/60 px-4 py-3 text-xs text-white placeholder-slate-660 outline-none hover:border-white/15 focus:border-accent focus:bg-[#04060f]/80 transition-colors"
                      />
                      {formErrors.confirmPassword && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.confirmPassword}</p>}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-slate-400 text-[11px]">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                        className="mt-0.5 rounded border-white/10 bg-[#04060f]/60 text-accent focus:ring-accent accent-accent size-3.5 cursor-pointer"
                      />
                      <span>
                        I have read &amp; accept the <a href="/terms" target="_blank" className="text-accent hover:underline">Terms &amp; Conditions</a> &amp; <a href="/privacy" target="_blank" className="text-accent hover:underline">Policies</a> of 4AT Academy.
                      </span>
                    </label>
                    {formErrors.termsAccepted && <p className="text-red-400 text-[10px] mt-1.5">{formErrors.termsAccepted}</p>}
                  </div>
                </div>
              )}

              {/* Navigation Button Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-2 px-3 hover:bg-white/5 rounded-lg font-bold"
                  >
                    <ChevronLeft className="size-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div /> /* Empty placeholder for alignment */
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-[#04060f] bg-accent rounded-lg hover:brightness-105 transition-all shadow-[0_4px_12px_rgba(45,212,191,0.2)]"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="size-4" />
                  </button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="!px-8 !py-3 text-xs rounded-xl"
                  >
                    <span>{isSubmitting ? "Saving..." : "Save & Submit"}</span>
                    <ArrowRight className="size-4 ml-1" />
                  </Button>
                )}
              </div>
              {formErrors.submit && <p className="text-red-400 text-xs text-right">{formErrors.submit}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
