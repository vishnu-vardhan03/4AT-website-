"use client";

import React from "react";
import type { StepProps } from "../types";
import { FormField } from "../FormField";
import {
  INPUT_CLASS,
  SELECT_CLASS,
  SELECT_CHEVRON_STYLE,
  COLLEGE_OPTIONS,
  ACADEMIC_YEAR_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  DEPARTMENT_OPTIONS,
} from "../constants";

/**
 * Step 2 – Professional Information
 * Displays fields dynamically based on selected Applicant Type (Student / Working Professional).
 * Includes terms and conditions checkbox.
 */
export function StepEducation({ formData, onChange, errors }: StepProps) {
  const isStudent = formData.applicantType === "student";

  return (
    <div className="space-y-5">
      {/* Applicant Type Selector */}
      <FormField id="applicantType" label="Applicant Type" required error={errors.applicantType}>
        <select
          id="applicantType"
          value={formData.applicantType}
          onChange={(e) => onChange({ applicantType: e.target.value as "student" | "professional" })}
          className={SELECT_CLASS}
          style={SELECT_CHEVRON_STYLE}
        >
          <option value="student" className="bg-[#0b0e1a]">Student</option>
          <option value="professional" className="bg-[#0b0e1a]">Working Professional</option>
        </select>
      </FormField>

      {/* Dynamic Fields */}
      {isStudent ? (
        // STUDENT FORM FIELDS
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="college" label="College / University" required error={errors.college}>
              <input
                type="text"
                id="college"
                placeholder="Enter college or university name"
                value={formData.college}
                onChange={(e) => onChange({ college: e.target.value })}
                className={INPUT_CLASS}
              />
            </FormField>

            <FormField id="programName" label="Program / Course" required error={errors.programName}>
              <input
                type="text"
                id="programName"
                placeholder="e.g. Fintech Engineering"
                value={formData.programName}
                onChange={(e) => onChange({ programName: e.target.value })}
                className={INPUT_CLASS}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="academicYear" label="Academic Year" required error={errors.academicYear}>
              <select
                id="academicYear"
                value={formData.academicYear}
                onChange={(e) => onChange({ academicYear: e.target.value })}
                className={SELECT_CLASS}
                style={SELECT_CHEVRON_STYLE}
              >
                <option value="" className="bg-[#0b0e1a]">Select academic year</option>
                {ACADEMIC_YEAR_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                ))}
              </select>
            </FormField>

            <FormField id="department" label="Department" required error={errors.department}>
              <select
                id="department"
                value={formData.department}
                onChange={(e) => onChange({ department: e.target.value })}
                className={SELECT_CLASS}
                style={SELECT_CHEVRON_STYLE}
              >
                <option value="" className="bg-[#0b0e1a]">Select department</option>
                {DEPARTMENT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
                ))}
              </select>
            </FormField>
          </div>
        </div>
      ) : (
        // WORKING PROFESSIONAL FORM FIELDS
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="companyName" label="Company Name" required error={errors.companyName}>
              <input
                type="text"
                id="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) => onChange({ companyName: e.target.value })}
                className={INPUT_CLASS}
              />
            </FormField>

            <FormField id="jobTitle" label="Job Title / Designation" required error={errors.jobTitle}>
              <input
                type="text"
                id="jobTitle"
                placeholder="e.g. Financial Analyst"
                value={formData.jobTitle}
                onChange={(e) => onChange({ jobTitle: e.target.value })}
                className={INPUT_CLASS}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="industry" label="Industry" required error={errors.industry}>
              <input
                type="text"
                id="industry"
                placeholder="e.g. Banking, Tech, Audit"
                value={formData.industry}
                onChange={(e) => onChange({ industry: e.target.value })}
                className={INPUT_CLASS}
              />
            </FormField>

            <FormField id="yearsOfExperience" label="Years of Experience" required error={errors.yearsOfExperience}>
              <select
                id="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={(e) => onChange({ yearsOfExperience: e.target.value })}
                className={SELECT_CLASS}
                style={SELECT_CHEVRON_STYLE}
              >
                <option value="" className="bg-[#0b0e1a]">Select years of experience</option>
                <option value="0-1" className="bg-[#0b0e1a]">Less than 1 year</option>
                <option value="1-3" className="bg-[#0b0e1a]">1 - 3 years</option>
                <option value="3-5" className="bg-[#0b0e1a]">3 - 5 years</option>
                <option value="5+" className="bg-[#0b0e1a]">More than 5 years</option>
              </select>
            </FormField>
          </div>
        </div>
      )}

      {/* Shared fields (Highest Education, Referred By) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="highestEducation" label="Highest Level of Education" required error={errors.highestEducation}>
          <select
            id="highestEducation"
            value={formData.highestEducation}
            onChange={(e) => onChange({ highestEducation: e.target.value })}
            className={SELECT_CLASS}
            style={SELECT_CHEVRON_STYLE}
          >
            <option value="" className="bg-[#0b0e1a]">Select education level</option>
            {EDUCATION_LEVEL_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
            ))}
          </select>
        </FormField>

        <FormField id="referredBy" label="Referred By (Optional)">
          <input
            type="text"
            id="referredBy"
            placeholder="Friend, Advisor, LinkedIn..."
            value={formData.referredBy}
            onChange={(e) => onChange({ referredBy: e.target.value })}
            className={INPUT_CLASS}
          />
        </FormField>
      </div>

      {/* Terms & Conditions */}
      <div className="pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer text-slate-400 text-[11px]">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => onChange({ termsAccepted: e.target.checked })}
            className="mt-0.5 rounded border-white/10 bg-[#04060f]/60 text-accent focus:ring-accent accent-accent size-3.5 cursor-pointer"
          />
          <span>
            I have read &amp; accept the{" "}
            <a href="/terms" target="_blank" className="text-accent hover:underline">
              Terms &amp; Conditions
            </a>{" "}
            &amp;{" "}
            <a href="/privacy" target="_blank" className="text-accent hover:underline">
              Policies
            </a>{" "}
            of 4AT Academy.
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-red-400 text-[10px] mt-1.5">{errors.termsAccepted}</p>
        )}
      </div>
    </div>
  );
}
