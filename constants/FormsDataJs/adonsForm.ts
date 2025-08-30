import * as Yup from "yup";

// ============================================================================
// CONSTANTS
// ============================================================================

const AVAILABILITY_STATUSES = [
  { label: "Available", value: true },
  { label: "Not Available", value: false },
];

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
  max?: number;
  accept?: string;
  maxSize?: number;
  fields?: FormField[];
}

// ============================================================================
// FORM FIELDS CONFIGURATION
// ============================================================================

export const adonsFormFields: FormField[] = [
  {
    id: "addonsType",
    name: "addonsType",
    label: "Subscription Type",
    type: "select",
    placeholder: "Select addons type",
    options: [
      { label: "Monthly", value: "Monthly" },
      { label: "Yearly", value: "Yearly" },
    ],
  },
  {
    id: "period",
    name: "period",
    label: "Period",
    type: "number",
    min: 1,
    step: 1,
    max: 12,
    placeholder: "Select period",
  },
  {
    id: "startDate",
    name: "startDate",
    label: "From Date",
    type: "date",
    placeholder: "Select from date",
  },
  {
    id: "paymentType",
    name: "paymentType",
    label: "Payment",
    type: "select",
    placeholder: "Select payment",
    options: [
      { label: "Cash", value: "cash" },
      { label: "Card", value: "card" },
      { label: "Free", value: "free" },
    ],
  },
  {
    id: "detailsGrid",
    name: "grid",
    fields: [
      {
        id: "discountValue",
        name: "discountValue",
        label: "Discount",
        type: "number",
        min: 0,
        step: 1,
        max: 100,
        placeholder: "Enter discount",
      },
      {
        id: "discountType",
        name: "discountType",
        label: "Discount Type",
        type: "select",
        placeholder: "Select discount type",
        options: [
          { label: "Percentage", value: "percentage" },
          { label: "Fixed", value: "fixed" },
        ],
      }
    ],
  },
  {
    id: "isActive",
    name: "isActive",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    options: AVAILABILITY_STATUSES,
  }
];

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

export const adonsFormSchema = Yup.object().shape({
  subscriptionType: Yup.string().required("Subscription type is required"),
  period: Yup.number().required("Period is required"),
  startDate: Yup.date().required("From date is required"),
  endDate: Yup.date().required("To date is required"),
  payment: Yup.string().required("Payment is required"),
  discountValue: Yup.number().required("Discount value is required"),
  discountType: Yup.string().required("Discount type is required"),
  isActive: Yup.boolean().required("Status is required"),
});

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

export const adonsFormField = adonsFormFields;
