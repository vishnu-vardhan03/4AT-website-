export interface RegistrationFormData {
  // Step 1 – Personal Information
  firstName: string;
  lastName: string;
  gender: string;
  countryIso: string;
  stateIso: string;
  cityName: string;
  country: string;
  state: string;
  city: string;
  email: string;
  mobileNumber: string;

  // Step 2 – Professional Information (dynamic by applicant type)
  applicantType: "student" | "professional";
  
  // Student specific
  college: string;
  programName: string;
  academicYear: string;
  department: string;

  // Professional specific
  companyName: string;
  jobTitle: string;
  industry: string;
  yearsOfExperience: string;

  // Shared / Optional
  highestEducation: string;
  referredBy: string;
  termsAccepted: boolean;
}


/** Metadata for a single wizard step. */
export interface StepInfo {
  num: number;
  label: string;
  desc: string;
}

/** Callback used by step components to update form data. */
export type FormUpdater = (
  patch: Partial<RegistrationFormData>,
) => void;

/** Props shared by every step component. */
export interface StepProps {
  formData: RegistrationFormData;
  onChange: FormUpdater;
  errors: Record<string, string>;
}
