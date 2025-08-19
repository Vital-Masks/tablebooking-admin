import * as Yup from "yup";

// ============================================================================
// CONSTANTS
// ============================================================================

const AVAILABILITY_STATUSES = [
  { label: "Available", value: true },
  { label: "Not Available", value: false },
];

const FILE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: "image/*",
} as const;

const VALIDATION_LIMITS = {
  DINING_NAME: { min: 3, max: 50 },
  DESCRIPTION: { min: 10, max: 500 },
  PRICE: { min: 0, max: 10000 },
  TIME_REGEX: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
  NAME_REGEX: /^[a-zA-Z0-9\s\-_]+$/,
} as const;

// ============================================================================
// TYPES
// ============================================================================

export type AvailabilityStatus =
  (typeof AVAILABILITY_STATUSES)[number]["value"];

interface FormField {
  id: string;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string | boolean }>;
  dependant?: string;
  isMulti?: boolean;
  min?: number;
  step?: number;
  accept?: string;
  maxSize?: number;
  fields?: FormField[];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const createTimeValidation = (fieldName: string, isEndTime = false) => {
  return Yup.string()
    .matches(
      VALIDATION_LIMITS.TIME_REGEX,
      "Please enter a valid time format (HH:MM)"
    )
    .required(`${fieldName} is required`)
    .test(
      "time-comparison",
      "End time must be after start time",
      function (value) {
        if (!isEndTime) return true;
        const { timeFrom } = this.parent;
        if (!timeFrom || !value) return true;
        return (
          new Date(`2000-01-01T${value}`) > new Date(`2000-01-01T${timeFrom}`)
        );
      }
    );
};

const createFileValidation = () => {
  return Yup.array()
    .min(1, "Please upload a cover image")
    .max(1, "Only one cover image is allowed")
    .required("Cover image is required")
    .test(
      "file-size",
      `File size must be less than ${FILE_CONFIG.MAX_SIZE / (1024 * 1024)}MB`,
      function (value) {
        if (!value || value.length === 0) return true;

        const fileObj = value[0];
        if (!fileObj) return true;

        // Handle both direct file objects and preview objects
        const file = fileObj.preview || fileObj;
        if (!file || !file.size) return true;

        // Convert file size to MB for comparison
        const fileSizeInBytes = file.size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
        const maxSizeInMB = FILE_CONFIG.MAX_SIZE / (1024 * 1024);

        return fileSizeInMB <= maxSizeInMB;
      }
    )
    .test("file-type", "Only image files are allowed", function (value) {
      if (!value || value.length === 0) return true;
      const fileObj = value[0];
      if (!fileObj) return true;

      // Handle both direct file objects and preview objects
      const file = fileObj.preview || fileObj;
      if (!file || !file.type) return true;
      return file.type.startsWith("image/");
    });
};

// ============================================================================
// FORM FIELDS CONFIGURATION
// ============================================================================

export const diningFormFields: FormField[] = [
  {
    id: "diningType",
    name: "diningType",
    label: "Dining Type",
    type: "select",
    placeholder: "Select dining type",
    options: [],
  },
  {
    id: "diningName",
    name: "diningName",
    label: "Dining Name",
    type: "text",
    placeholder:
      "Enter dining session name (e.g., Sunday Brunch, Evening Dinner)",
  },
  {
    id: "description",
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder:
      "Describe the dining experience, special features, or any additional information",
  },
  {
    id: "dateFrom",
    name: "dateFrom",
    label: "Start Date",
    type: "customDateCalendar",
    placeholder: "Select start date",
    dependant: "dateType",
  },
  {
    id: "timeGrid",
    name: "grid",
    fields: [
      {
        id: "timeFrom",
        name: "timeFrom",
        label: "Start Time",
        type: "time",
        placeholder: "Select start time",
      },
      {
        id: "timeTo",
        name: "timeTo",
        label: "End Time",
        type: "time",
        placeholder: "Select end time",
      },
    ],
  },
  {
    id: "detailsGrid",
    name: "grid",
    fields: [
      {
        id: "pricePerPerson",
        name: "pricePerPerson",
        label: "Price Per Person",
        type: "number",
        placeholder: "Enter price",
        min: VALIDATION_LIMITS.PRICE.min,
        step: 0.01,
      },
      {
        id: "availabilityStatus",
        name: "availabilityStatus",
        label: "Availability Status",
        type: "select",
        placeholder: "Select availability status",
        options: AVAILABILITY_STATUSES,
      },
    ],
  },
  {
    id: "diningAreaIds",
    name: "diningAreaIds",
    label: "Dining Areas",
    type: "select",
    placeholder: "Select dining areas",
    options: [],
    isMulti: true,
  },
  {
    id: "coverImage",
    name: "coverImage",
    label: "Cover Image",
    type: "file",
    placeholder: "Upload dining session cover image",
    accept: FILE_CONFIG.ACCEPTED_TYPES,
    maxSize: FILE_CONFIG.MAX_SIZE,
  },
];

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

export const diningFormSchema = Yup.object().shape({
  diningType: Yup.string().required("Dining type is required"),
  diningName: Yup.string()
    .trim()
    .matches(
      VALIDATION_LIMITS.NAME_REGEX,
      "Only letters, numbers, spaces, hyphens, and underscores are allowed"
    )
    .min(
      VALIDATION_LIMITS.DINING_NAME.min,
      `Dining name must be at least ${VALIDATION_LIMITS.DINING_NAME.min} characters`
    )
    .max(
      VALIDATION_LIMITS.DINING_NAME.max,
      `Dining name cannot exceed ${VALIDATION_LIMITS.DINING_NAME.max} characters`
    )
    .required("Dining name is required"),

  description: Yup.string()
    .trim()
    .min(
      VALIDATION_LIMITS.DESCRIPTION.min,
      `Description must be at least ${VALIDATION_LIMITS.DESCRIPTION.min} characters`
    )
    .max(
      VALIDATION_LIMITS.DESCRIPTION.max,
      `Description cannot exceed ${VALIDATION_LIMITS.DESCRIPTION.max} characters`
    )
    .required("Description is required"),

  dateFrom: Yup.date()
    .min(new Date(), "Start date cannot be in the past")
    .required("Start date is required"),

  days: Yup.array().when(["dateType"], ([dateType], schema) => {
    return dateType === "Custom Days"
      ? schema
          .min(1, "Please select at least one day")
          .required("Please select days for custom schedule")
      : schema;
  }),

  timeFrom: createTimeValidation("Start time"),
  timeTo: createTimeValidation("End time", true),

  pricePerPerson: Yup.number()
    .typeError("Price must be a valid number")
    .positive("Price must be greater than 0")
    .max(
      VALIDATION_LIMITS.PRICE.max,
      `Price cannot exceed $${VALIDATION_LIMITS.PRICE.max.toLocaleString()}`
    )
    .required("Price per person is required"),

  availabilityStatus: Yup.boolean().required("Availability status is required"),
  diningAreaIds: Yup.array()
    .min(1, "Please select at least one dining area")
    .required("Dining areas are required"),

  // coverImage: createFileValidation(),
});

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

export const diningFormField = diningFormFields;
