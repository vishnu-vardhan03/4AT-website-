"use client";

import React, { useMemo } from "react";
import { Country, State, City } from "country-state-city";
import type { StepProps } from "../types";
import { FormField } from "../FormField";
import { PhoneField } from "../PhoneField";
import { cn } from "@/lib/utils";
import {
  INPUT_CLASS,
  SELECT_CLASS,
  SELECT_CHEVRON_STYLE,
  GENDER_OPTIONS,
  INPUT_DISABLED_CLASS,
} from "../constants";

/**
 * Step 1 – Personal Information
 * Includes: First Name, Last Name, Gender, Country, State, City, Email, Phone, Emergency Contact.
 */
export function StepBasicDetails({ formData, onChange, errors }: StepProps) {
  // ── Memoized lists for location dropdowns ──────────────────────────────

  const countries = useMemo(() => {
    const all = Country.getAllCountries();
    // Move India to top since it's the primary market
    const india = all.find((c) => c.isoCode === "IN");
    const rest = all.filter((c) => c.isoCode !== "IN");
    return india ? [india, ...rest] : all;
  }, []);

  const states = useMemo(() => {
    if (!formData.countryIso) return [];
    return State.getStatesOfCountry(formData.countryIso);
  }, [formData.countryIso]);

  const cities = useMemo(() => {
    if (!formData.countryIso || !formData.stateIso) return [];
    return City.getCitiesOfState(formData.countryIso, formData.stateIso);
  }, [formData.countryIso, formData.stateIso]);

  // ── Handlers ───────────────────────────────────────────────────────────

  const handleCountryChange = (isoCode: string) => {
    const selected = countries.find((c) => c.isoCode === isoCode);
    onChange({
      countryIso: isoCode,
      country: selected?.name ?? "",
      stateIso: "",
      state: "",
      cityName: "",
      city: "",
    });
  };

  const handleStateChange = (isoCode: string) => {
    const selected = states.find((s) => s.isoCode === isoCode);
    onChange({
      stateIso: isoCode,
      state: selected?.name ?? "",
      cityName: "",
      city: "",
    });
  };

  const handleCityChange = (name: string) => {
    onChange({
      cityName: name,
      city: name,
    });
  };

  const hasCountry = Boolean(formData.countryIso);
  const hasState = Boolean(formData.stateIso);

  return (
    <div className="space-y-5">
      {/* Name fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="firstName" label="First Name" required error={errors.firstName}>
          <input
            type="text"
            id="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className={INPUT_CLASS}
          />
        </FormField>

        <FormField id="lastName" label="Last Name" required error={errors.lastName}>
          <input
            type="text"
            id="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className={INPUT_CLASS}
          />
        </FormField>
      </div>

      {/* Gender */}
      <FormField id="gender" label="Gender" required error={errors.gender}>
        <select
          id="gender"
          value={formData.gender}
          onChange={(e) => onChange({ gender: e.target.value })}
          className={SELECT_CLASS}
          style={SELECT_CHEVRON_STYLE}
        >
          <option value="" className="bg-[#0b0e1a]">Select gender</option>
          {GENDER_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0b0e1a]">{opt}</option>
          ))}
        </select>
      </FormField>

      {/* Location - Country */}
      <FormField id="country" label="Country" required error={errors.country}>
        <select
          id="country"
          value={formData.countryIso}
          onChange={(e) => handleCountryChange(e.target.value)}
          className={SELECT_CLASS}
          style={SELECT_CHEVRON_STYLE}
        >
          <option value="" className="bg-[#0b0e1a]">Select country</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode} className="bg-[#0b0e1a]">
              {c.flag}{"\u00A0\u00A0\u00A0"}{c.name}
            </option>
          ))}
        </select>
      </FormField>

      {/* Location - State & City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="state" label="State" required error={errors.state}>
          <select
            id="state"
            value={formData.stateIso}
            onChange={(e) => handleStateChange(e.target.value)}
            disabled={!hasCountry}
            className={cn(SELECT_CLASS, !hasCountry && INPUT_DISABLED_CLASS)}
            style={SELECT_CHEVRON_STYLE}
          >
            <option value="" className="bg-[#0b0e1a]">
              {hasCountry ? "Select state" : "Select a country first"}
            </option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.isoCode} className="bg-[#0b0e1a]">
                {s.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="city" label="City" required error={errors.city}>
          <select
            id="city"
            value={formData.cityName}
            onChange={(e) => handleCityChange(e.target.value)}
            disabled={!hasState}
            className={cn(SELECT_CLASS, !hasState && INPUT_DISABLED_CLASS)}
            style={SELECT_CHEVRON_STYLE}
          >
            <option value="" className="bg-[#0b0e1a]">
              {hasState ? "Select city" : "Select a state first"}
            </option>
            {cities.map((c) => (
              <option key={`${c.name}-${c.latitude}`} value={c.name} className="bg-[#0b0e1a]">
                {c.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Email + Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="email" label="Email Address" required error={errors.email}>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className={INPUT_CLASS}
          />
        </FormField>

        <PhoneField
          id="mobileNumber"
          label="Mobile Number"
          value={formData.mobileNumber}
          onChange={(val) => onChange({ mobileNumber: val })}
          error={errors.mobileNumber}
          placeholder="Enter mobile number"
          defaultCountry={formData.countryIso ? formData.countryIso.toLowerCase() : "in"}
        />
      </div>
    </div>
  );
}

