import * as Yup from 'yup';

// ============================================================================
// CONSTANTS
// ============================================================================

const OCCASION_OPTIONS = [
  { label: 'Birthday', value: 'Birthday' },
  { label: 'Anniversary', value: 'Anniversary' },
  { label: 'Date Night', value: 'Date Night' },
  { label: 'Business Meal', value: 'Business Meal' },
  { label: 'Other', value: 'Other' },
];

const STATUS_OPTIONS = [
  { label: 'Booked', value: 'Booked' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Confirmed', value: 'Confirmed' },
  { label: 'Cancelled', value: 'Cancelled' },
];

const REASON_OPTIONS = [
  { label: 'Reservation made by mistake', value: 'Reservation made by mistake' },
  { label: 'Booked by someone else in the group', value: 'Booked by someone else in the group' },
  { label: 'Technical issue while booking', value: 'Technical issue while booking' },
  { label: 'Change of dining plans', value: 'Change of dining plans' },
  { label: 'Reservation time not suitable anymore', value: 'Reservation time not suitable anymore' },
  { label: 'Other', value: 'Other' },
];

const VALIDATION_LIMITS = {
  NAME: { min: 2, max: 50 },
  EMAIL: { min: 5, max: 100 },
  PHONE: { max: 20 },
  TABLE_NO: { min: 1, max: 20 },
  OCCASION: { min: 2, max: 50 },
  SPECIAL_REQUEST: { min: 3, max: 500 },
  PROMO_CODE: { min: 3, max: 20 },
  REASON: { min: 3, max: 500 },
  GUEST_SIZE: { min: 1, max: 100 },
} as const;

const VALIDATION_PATTERNS = {
  NAME_REGEX: /^[a-zA-Z\s'-]+$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/,
  TABLE_NO_REGEX: /^[a-zA-Z0-9\s\-_]+$/,
  NO_LEADING_SPACE: /^\S.*$/,
  TIME_REGEX: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
} as const;

// ============================================================================
// TYPES
// ============================================================================

export type Occasion = (typeof OCCASION_OPTIONS)[number]["value"];
export type Status = (typeof STATUS_OPTIONS)[number]["value"];

interface FormField {
  id: string;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
  dependant?: string;
  ifRender?: [string, string];
  fields?: FormField[];
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
      "Contact number cannot start with a space"
    )
    .matches(
      VALIDATION_PATTERNS.PHONE_REGEX,
      "Please enter a valid contact number"
    )
    .max(
      VALIDATION_LIMITS.PHONE.max,
      `Contact number cannot exceed ${VALIDATION_LIMITS.PHONE.max} characters`
    )
    .required("Contact number is required");
};

const createTableNumberValidation = () => {
  return Yup.string()
    .trim()
    .matches(
      VALIDATION_PATTERNS.NO_LEADING_SPACE,
      "Table number cannot start with a space"
    )
    .matches(
      VALIDATION_PATTERNS.TABLE_NO_REGEX,
      "Table number can only contain letters, numbers, spaces, hyphens, and underscores"
    )
    .min(
      VALIDATION_LIMITS.TABLE_NO.min,
      `Table number must be at least ${VALIDATION_LIMITS.TABLE_NO.min} character`
    )
    .max(
      VALIDATION_LIMITS.TABLE_NO.max,
      `Table number cannot exceed ${VALIDATION_LIMITS.TABLE_NO.max} characters`
    )
    .required("Table number is required");
};

const createTimeValidation = () => {
  return Yup.string()
    .matches(
      VALIDATION_PATTERNS.TIME_REGEX,
      "Please enter a valid time format (HH:MM)"
    )
    .required("Time is required");
};

const createDateValidation = () => {
  return Yup.date()
    .min(new Date(), "Date cannot be in the past")
    .required("Date is required");
};

// ============================================================================
// FORM FIELDS CONFIGURATION
// ============================================================================

export const tableReservationFormField: FormField[] = [
  {
    id: 'date',
    name: 'date',
    label: 'Select Date',
    type: 'calendar',
    placeholder: 'Choose reservation date',
    required: true,
  },
  {
    id: 'time',
    name: 'time',
    label: 'Time',
    type: 'time',
    placeholder: 'Select time',
    required: true,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter email address',
    required: true,
  },
  {
    id: 'firstname',
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name',
    required: true,
  },
  {
    id: 'lastname',
    name: 'lastname',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name',
    required: true,
  },
  {
    id: 'contactNumber',
    name: 'contactNumber',
    label: 'Contact Number',
    type: 'text',
    placeholder: 'Enter contact number',
    required: true,
  },
  {
    id: 'restaurant',
    name: 'restaurant',
    label: 'Restaurant',
    type: 'restaurant-select',
    placeholder: 'Select restaurant',
    required: true,
  },
  {
    id: 'dining',
    name: 'dining',
    label: 'Dining',
    type: 'dining-select',
    placeholder: 'Select dining session',
    required: true,
  },
  {
    id: 'diningArea',
    name: 'diningArea',
    label: 'Dining Area',
    type: 'dining-area-select',
    placeholder: 'Select dining area',
    required: true,
  },
  {
    id: 'guestSize',
    name: 'guestSize',
    label: 'Guest Size',
    type: 'number',
    placeholder: 'Number of guests',
    required: true,
  },
  {
    id: 'occasion',
    name: 'occasion',
    label: 'Occasion',
    type: 'select',
    placeholder: 'Select occasion',
    options: OCCASION_OPTIONS,
    required: true,
  },
  {
    id: 'specialRequest',
    name: 'specialRequest',
    label: 'Special Request',
    type: 'textarea',
    placeholder: 'Any special requests or notes',
    required: false,
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      {
        id: 'tableNo',
        name: 'tableNo',
        label: 'Table Number',
        type: 'text',
        placeholder: 'Enter table number',
        required: true,
      },
      {
        id: 'status',
        name: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'Select status',
        options: STATUS_OPTIONS,
        required: true,
      },
    ],
  },
  {
    id: 'promocode',
    name: 'promocode',
    label: 'Promo Code',
    type: 'text',
    placeholder: 'Enter promo code (optional)',
    required: false,
  },
  {
    id: 'reason',
    name: 'reason',
    label: 'Reason for Rejection',
    type: 'select',
    placeholder: 'Please provide a reason for rejection',
    required: false,
    options: REASON_OPTIONS,
    ifRender: ['status', 'Cancelled'],
  },
];

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

export const tableReservationFormSchema = Yup.object().shape({
  // Date validation
  date: createDateValidation(),

  // Time validation
  time: createTimeValidation(),

  // Name validations
  firstname: createNameValidation("First name"),
  lastname: createNameValidation("Last name"),

  // Contact validation
  contactNumber: createPhoneValidation(),

  // Email validation
  email: createEmailValidation(),

  // Restaurant and dining validations
  restaurant: Yup.string()
    .required("Restaurant is required"),

  dining: Yup.string()
    .required("Dining session is required"),

  diningArea: Yup.string()
    .required("Dining area is required"),

  // Guest size validation
  guestSize: Yup.number()
    .typeError("Guest size must be a number")
    .integer("Guest size must be a whole number")
    .positive("Guest size must be a positive number")
    .min(
      VALIDATION_LIMITS.GUEST_SIZE.min,
      `Guest size must be at least ${VALIDATION_LIMITS.GUEST_SIZE.min}`
    )
    .max(
      VALIDATION_LIMITS.GUEST_SIZE.max,
      `Guest size cannot exceed ${VALIDATION_LIMITS.GUEST_SIZE.max}`
    )
    .required("Guest size is required"),

  // Occasion validation
  occasion: Yup.string()
    .trim()
    .matches(
      VALIDATION_PATTERNS.NO_LEADING_SPACE,
      "Occasion cannot start with a space"
    )
    .min(
      VALIDATION_LIMITS.OCCASION.min,
      `Occasion must be at least ${VALIDATION_LIMITS.OCCASION.min} characters`
    )
    .max(
      VALIDATION_LIMITS.OCCASION.max,
      `Occasion cannot exceed ${VALIDATION_LIMITS.OCCASION.max} characters`
    )
    .oneOf(
      OCCASION_OPTIONS.map(option => option.value),
      "Please select a valid occasion"
    )
    .required("Occasion is required"),

  // Special request validation (optional)
  specialRequest: Yup.string()
    .trim()
    .matches(
      VALIDATION_PATTERNS.NO_LEADING_SPACE,
      "Special request cannot start with a space"
    )
    .min(
      VALIDATION_LIMITS.SPECIAL_REQUEST.min,
      `Special request must be at least ${VALIDATION_LIMITS.SPECIAL_REQUEST.min} characters`
    )
    .max(
      VALIDATION_LIMITS.SPECIAL_REQUEST.max,
      `Special request cannot exceed ${VALIDATION_LIMITS.SPECIAL_REQUEST.max} characters`
    )
    .optional()
    .nullable(),

  // Table number validation
  tableNo: createTableNumberValidation(),

  // Status validation
  status: Yup.string()
    .oneOf(
      STATUS_OPTIONS.map(option => option.value),
      "Please select a valid status"
    )
    .required("Status is required"),

  // Promo code validation (optional)
  promocode: Yup.string()
    .trim()
    .matches(
      VALIDATION_PATTERNS.NO_LEADING_SPACE,
      "Promo code cannot start with a space"
    )
    .min(
      VALIDATION_LIMITS.PROMO_CODE.min,
      `Promo code must be at least ${VALIDATION_LIMITS.PROMO_CODE.min} characters`
    )
    .max(
      VALIDATION_LIMITS.PROMO_CODE.max,
      `Promo code cannot exceed ${VALIDATION_LIMITS.PROMO_CODE.max} characters`
    )
    .optional()
    .nullable(),

  // Reason validation (conditional)
  reason: Yup.string().when('status', {
    is: 'Cancelled',
    then: (schema) => schema
      .trim()
      .matches(
        VALIDATION_PATTERNS.NO_LEADING_SPACE,
        "Reason cannot start with a space"
      )
      .min(
        VALIDATION_LIMITS.REASON.min,
        `Reason must be at least ${VALIDATION_LIMITS.REASON.min} characters`
      )
      .max(
        VALIDATION_LIMITS.REASON.max,
        `Reason cannot exceed ${VALIDATION_LIMITS.REASON.max} characters`
      )
      .required("Reason is required when status is Rejected"),
    otherwise: (schema) => schema.optional().nullable(),
  }),
});

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

// Export the old field name for backward compatibility
export const tableReservationFormFields = tableReservationFormField;
