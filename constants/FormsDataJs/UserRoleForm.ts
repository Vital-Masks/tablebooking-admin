import * as Yup from "yup";

// ============================================================================
// CONSTANTS
// ============================================================================

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const VALIDATION_LIMITS = {
  NAME: { min: 2, max: 50 },
  ROLE: { min: 2, max: 50 },
  EMAIL: { min: 5, max: 100 },
  PHONE: { pattern: /^07\d{8}$/ },
} as const;

const VALIDATION_PATTERNS = {
  NAME_REGEX: /^[a-zA-Z\s'-]+$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: VALIDATION_LIMITS.PHONE.pattern,
  NO_LEADING_SPACE: /^\S.*$/,
} as const;

// ============================================================================
// TYPES
// ============================================================================

export type Gender = (typeof GENDER_OPTIONS)[number]["value"];

interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
}

// ============================================================================
// VALIDATION UTILITY FUNCTIONS
// ============================================================================

const createNameValidation = (fieldName: string, limits = VALIDATION_LIMITS.NAME) => {
  return Yup.string()
    .trim()
    .matches(
      VALIDATION_PATTERNS.NO_LEADING_SPACE,
      `${fieldName} cannot start with a space`
    )
    .matches(
      VALIDATION_PATTERNS.NAME_REGEX,
      `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`
    )
    .min(
      limits.min,
      `${fieldName} must be at least ${limits.min} characters`
    )
    .max(
      limits.max,
      `${fieldName} cannot exceed ${limits.max} characters`
    )
    .required(`${fieldName} is required`);
};

const createEmailValidation = () => {
  return Yup.string()
    .trim()
    .matches(
      VALIDATION_PATTERNS.NO_LEADING_SPACE,
      "Email cannot start with a space"
    )
    .matches(
      VALIDATION_PATTERNS.EMAIL_REGEX,
      "Please enter a valid email address"
    )
    .min(
      VALIDATION_LIMITS.EMAIL.min,
      `Email must be at least ${VALIDATION_LIMITS.EMAIL.min} characters`
    )
    .max(
      VALIDATION_LIMITS.EMAIL.max,
      `Email cannot exceed ${VALIDATION_LIMITS.EMAIL.max} characters`
    )
    .required("Email address is required");
};

const createPhoneValidation = () => {
  return Yup.string()
    .trim()
    .matches(
      VALIDATION_PATTERNS.NO_LEADING_SPACE,
      "Phone number cannot start with a space"
    )
    .matches(
      VALIDATION_PATTERNS.PHONE_REGEX,
      "Please enter a valid Sri Lankan phone number (07XXXXXXXX)"
    )
    .required("Phone number is required");
};

// ============================================================================
// FORM FIELDS CONFIGURATION
// ============================================================================

export const userroleFormField: FormField[] = [
  {
    id: "firstName",
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    required: true,
  },
  {
    id: "lastName",
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
    required: true,
  },
  {
    id: "role",
    name: "role",
    label: "Role/Designation",
    type: "select",
    placeholder: "Enter role or designation",
    required: true,
    options: [
      { label: "Admin", value: "Admin" },
      { label: "Manager", value: "Manager" },
      { label: "Supervisor", value: "Supervisor" },
    ],
  },
  {
    id: "email",
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter email address",
    required: true,
  },
  {
    id: "gender",
    name: "gender",
    label: "Gender",
    type: "select",
    placeholder: "Select gender",
    options: GENDER_OPTIONS,
    required: true,
  },
  {
    id: "phoneNumber",
    name: "phoneNumber",
    label: "Mobile Number",
    type: "text",
    placeholder: "07XXXXXXXX",
    required: true,
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "text",
  },
];

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

export const userroleFormSchema = Yup.object().shape({
  firstName: createNameValidation("First name"),

  lastName: createNameValidation("Last name"),

  role: Yup.string()
    .trim()
    .matches(
      VALIDATION_PATTERNS.NO_LEADING_SPACE,
      "Role cannot start with a space"
    )
    .min(
      VALIDATION_LIMITS.ROLE.min,
      `Role must be at least ${VALIDATION_LIMITS.ROLE.min} characters`
    )
    .max(
      VALIDATION_LIMITS.ROLE.max,
      `Role cannot exceed ${VALIDATION_LIMITS.ROLE.max} characters`
    )
    .required("Role/Designation is required"),

  email: createEmailValidation(),

  gender: Yup.string()
    .oneOf(
      GENDER_OPTIONS.map(option => option.value),
      "Please select a valid gender"
    )
    .required("Gender is required"),

  phoneNumber: createPhoneValidation(),

  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(255, 'Password cannot exceed 255 characters')
    .required('Password is required'),
});

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

// Export the old field name for backward compatibility
export const userroleFormFields = userroleFormField;
