"use client";

import React, { useState, useCallback } from "react";
import { CheckCircle2, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../Button";

import { StepperSidebar } from "./StepperSidebar";
import { StepBasicDetails } from "./steps/StepBasicDetails";
import { StepEducation } from "./steps/StepEducation";

import { STEPS_INFO, TOTAL_STEPS, INITIAL_FORM_DATA } from "./constants";
import { validateStep } from "./validation";
import type { RegistrationFormData } from "./types";

/**
 * Academy Registration Form — multi-step wizard orchestrator (2 Steps).
 *
 * Manages:
 * - Dynamic student / professional workflow
 * - State preservation across steps
 * - Validation & custom API payload mapping
 * - Centered Success Modal overlay
 */
export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA);

  // ── Form data updater ──────────────────────────────────────────────────────

  const handleChange = useCallback(
    (patch: Partial<RegistrationFormData>) => {
      setFormData((prev) => ({ ...prev, ...patch }));
      // Clear errors for changed fields
      setFormErrors((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(patch)) {
          delete next[key];
        }
        return next;
      });
    },
    [],
  );

  // ── Navigation ────────────────────────────────────────────────────────────

  const runValidation = (s: number): boolean => {
    const errors = validateStep(s, formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (runValidation(step)) {
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // ── Submit & Payload Mapping ──────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!runValidation(TOTAL_STEPS)) return;

    setIsSubmitting(true);
    try {
      const isStudent = formData.applicantType === "student";

      // Construct payload for the relational registrations database schema
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        gender: formData.gender,
        email: formData.email.trim(),
        mobileNumber: formData.mobileNumber,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        applicantType: formData.applicantType,
        highestEducation: formData.highestEducation,
        referredBy: formData.referredBy.trim() || null,

        // Student profile fields
        college: formData.applicantType === "student" ? formData.college.trim() : null,
        programName: formData.applicantType === "student" ? formData.programName : null,
        academicYear: formData.applicantType === "student" ? formData.academicYear : null,
        department: formData.applicantType === "student" ? formData.department : null,

        // Professional profile fields
        companyName: formData.applicantType === "professional" ? formData.companyName.trim() : null,
        jobTitle: formData.applicantType === "professional" ? formData.jobTitle.trim() : null,
        industry: formData.applicantType === "professional" ? formData.industry : null,
        yearsOfExperience: formData.applicantType === "professional" ? formData.yearsOfExperience : null,
      };

      const response = await fetch("/api/academy-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(
          result?.message ?? result?.error ?? "Registration could not be saved",
        );
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Academy registration failed", error);
      setFormErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Registration could not be saved",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step renderer ─────────────────────────────────────────────────────────

  const stepProps = { formData, onChange: handleChange, errors: formErrors };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepBasicDetails {...stepProps} />;
      case 2:
        return <StepEducation {...stepProps} />;
      default:
        return null;
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-start w-full">
      {/* Left Column: Stepper Roadmap */}
      <StepperSidebar currentStep={step} />

      {/* Right Column: Premium Multi-Step Glassmorphic Form Card */}
      <div className="relative rounded-3xl border border-white/8 bg-[#0b0e1a]/40 p-8 sm:p-10 shadow-2xl backdrop-blur-xl w-full max-w-[620px] mx-auto lg:ml-auto">
        <div className="absolute -inset-px bg-gradient-to-br from-accent/10 to-transparent rounded-3xl pointer-events-none z-0" />

        <div className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step Title Header */}
            <div className="border-b border-white/5 pb-4 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                STEP {step} OF {TOTAL_STEPS}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {STEPS_INFO[step - 1].label}
              </h3>
            </div>

            {/* Current Step Content */}
            {renderStep()}

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

              {step < TOTAL_STEPS ? (
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
                  <span>{isSubmitting ? "Saving..." : "Submit Registration"}</span>
                  <ArrowRight className="size-4 ml-1" />
                </Button>
              )}
            </div>

            {/* Submit-level error */}
            {formErrors.submit && (
              <p className="text-red-400 text-xs text-right">
                {formErrors.submit}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* ── SUCCESS POPUP MODAL OVERLAY ─────────────────────────────────────── */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative rounded-3xl border border-white/10 bg-[#0b0e1a]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl max-w-[500px] w-full text-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-accent/15 to-transparent rounded-3xl pointer-events-none z-0" />
            
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="size-8 text-accent animate-bounce" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Registration Submitted
              </h3>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Thank you for your interest in 4AT Academy.
                <br /><br />
                We've received your registration successfully. Our admissions team will review your application and contact you shortly.
                <br /><br />
                If your application is approved, you'll receive further instructions to access the LMS.
              </p>
              
              <Button
                onClick={() => router.push("/academy")}
                variant="primary"
                className="w-full sm:w-auto px-10 py-3.5 text-xs rounded-xl"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
