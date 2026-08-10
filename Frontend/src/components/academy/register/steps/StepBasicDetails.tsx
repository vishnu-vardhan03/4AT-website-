"use client";

import type { StepProps } from "../types";
import { FormField } from "../FormField";
import { PhoneField } from "../PhoneField";
import {
  GENDER_OPTIONS,
  INPUT_CLASS,
  SELECT_CHEVRON_STYLE,
  SELECT_CLASS,
} from "../constants";

/** Personal and contact information for an academy registration. */
export function StepBasicDetails({ formData, onChange, errors }: StepProps) {
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
        <input
          type="text"
          id="country"
          autoComplete="country-name"
          placeholder="Enter country"
          value={formData.country}
          onChange={(event) => onChange({ country: event.target.value })}
          className={INPUT_CLASS}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField id="state" label="State" required error={errors.state}>
          <input
            type="text"
            id="state"
            autoComplete="address-level1"
            placeholder="Enter state"
            value={formData.state}
            onChange={(event) => onChange({ state: event.target.value })}
            className={INPUT_CLASS}
          />
        </FormField>

        <FormField id="city" label="City" required error={errors.city}>
          <input
            type="text"
            id="city"
            autoComplete="address-level2"
            placeholder="Enter city"
            value={formData.city}
            onChange={(event) => onChange({ city: event.target.value })}
            className={INPUT_CLASS}
          />
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
