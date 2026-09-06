"use client";

import React, { useMemo } from "react";
import { State, City } from "country-state-city";
import type { StepProps } from "../types";
import { FormField } from "../FormField";
import { PhoneField } from "../PhoneField";
import {
  GENDER_OPTIONS,
  COUNTRIES,
  INPUT_CLASS,
  INPUT_DISABLED_CLASS,
  SELECT_CHEVRON_STYLE,
  SELECT_CLASS,
} from "../constants";

/** Personal and contact information for an academy registration. */
export function StepBasicDetails({ formData, onChange, errors }: StepProps) {
  // Derived, not stored: states/cities are looked up live from the selected
  // country/state ISO codes so they always reflect the current selection.
  const states = useMemo(
    () => (formData.countryIso ? State.getStatesOfCountry(formData.countryIso) : []),
    [formData.countryIso]
  );

  const cities = useMemo(
    () =>
      formData.countryIso && formData.stateIso
        ? City.getCitiesOfState(formData.countryIso, formData.stateIso)
        : [],
    [formData.countryIso, formData.stateIso]
  );

  const handleCountryChange = (isoCode: string) => {
    const country = COUNTRIES.find((c) => c.isoCode === isoCode);
    onChange({
      countryIso: isoCode,
      country: country?.name ?? "",
      // A new country invalidates whatever state/city was previously picked.
      stateIso: "",
      state: "",
      city: "",
    });
  };

  const handleStateChange = (isoCode: string) => {
    const state = states.find((s) => s.isoCode === isoCode);
    onChange({
      stateIso: isoCode,
      state: state?.name ?? "",
      // A new state invalidates whatever city was previously picked.
      city: "",
    });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="firstName" label="First Name" required error={errors.firstName}>
          <input
            type="text"
            id="firstName"
            autoComplete="given-name"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(event) => onChange({ firstName: event.target.value })}
            className={INPUT_CLASS}
          />
        </FormField>

        <FormField id="lastName" label="Last Name" required error={errors.lastName}>
          <input
            type="text"
            id="lastName"
            autoComplete="family-name"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(event) => onChange({ lastName: event.target.value })}
            className={INPUT_CLASS}
          />
        </FormField>
      </div>

      <FormField id="gender" label="Gender" required error={errors.gender}>
        <select
          id="gender"
          value={formData.gender}
          onChange={(event) => onChange({ gender: event.target.value })}
          className={SELECT_CLASS}
          style={SELECT_CHEVRON_STYLE}
        >
          <option value="" className="bg-[#0b0e1a]">Select gender</option>
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-[#0b0e1a]">{option}</option>
          ))}
        </select>
      </FormField>

      <FormField id="country" label="Country" required error={errors.country}>
        <select
          id="country"
          autoComplete="country-name"
          value={formData.countryIso}
          onChange={(event) => handleCountryChange(event.target.value)}
          className={SELECT_CLASS}
          style={SELECT_CHEVRON_STYLE}
        >
          <option value="" className="bg-[#0b0e1a]">Select country</option>
          {COUNTRIES.map((country) => (
            <option key={country.isoCode} value={country.isoCode} className="bg-[#0b0e1a]">
              {country.name}
            </option>
          ))}
        </select>
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="state" label="State" required error={errors.state}>
          {!formData.countryIso ? (
            <select disabled value="" className={`${SELECT_CLASS} ${INPUT_DISABLED_CLASS}`} style={SELECT_CHEVRON_STYLE}>
              <option value="" className="bg-[#0b0e1a]">Select country first</option>
            </select>
          ) : states.length > 0 ? (
            <select
              id="state"
              autoComplete="address-level1"
              value={formData.stateIso}
              onChange={(event) => handleStateChange(event.target.value)}
              className={SELECT_CLASS}
              style={SELECT_CHEVRON_STYLE}
            >
              <option value="" className="bg-[#0b0e1a]">Select state</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode} className="bg-[#0b0e1a]">
                  {state.name}
                </option>
              ))}
            </select>
          ) : (
            // No state-level data for this country in the dataset, let the applicant type it.
            <input
              type="text"
              id="state"
              autoComplete="address-level1"
              placeholder="Enter state"
              value={formData.state}
              onChange={(event) => onChange({ state: event.target.value, stateIso: "", city: "" })}
              className={INPUT_CLASS}
            />
          )}
        </FormField>

        <FormField id="city" label="City" required error={errors.city}>
          {!formData.countryIso || (states.length > 0 && !formData.stateIso) ? (
            <select disabled value="" className={`${SELECT_CLASS} ${INPUT_DISABLED_CLASS}`} style={SELECT_CHEVRON_STYLE}>
              <option value="" className="bg-[#0b0e1a]">
                {!formData.countryIso ? "Select country first" : "Select state first"}
              </option>
            </select>
          ) : cities.length > 0 ? (
            <select
              id="city"
              autoComplete="address-level2"
              value={formData.city}
              onChange={(event) => onChange({ city: event.target.value })}
              className={SELECT_CLASS}
              style={SELECT_CHEVRON_STYLE}
            >
              <option value="" className="bg-[#0b0e1a]">Select city</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name} className="bg-[#0b0e1a]">
                  {city.name}
                </option>
              ))}
            </select>
          ) : (
            // No city-level data for this state in the dataset, let the applicant type it.
            <input
              type="text"
              id="city"
              autoComplete="address-level2"
              placeholder="Enter city"
              value={formData.city}
              onChange={(event) => onChange({ city: event.target.value })}
              className={INPUT_CLASS}
            />
          )}
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="email" label="Email Address" required error={errors.email}>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(event) => onChange({ email: event.target.value })}
            className={INPUT_CLASS}
          />
        </FormField>

        <PhoneField
          id="mobileNumber"
          label="Mobile Number"
          value={formData.mobileNumber}
          onChange={(value) => onChange({ mobileNumber: value })}
          error={errors.mobileNumber}
          placeholder="Enter mobile number"
          defaultCountry={formData.countryIso ? formData.countryIso.toLowerCase() : "in"}
        />
      </div>
    </div>
  );
}
