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
  accept?: string;
  maxSize?: number;
  fields?: FormField[];
}

// ============================================================================
// FORM FIELDS CONFIGURATION
// ============================================================================

export const subscriptionFormFields: FormField[] = [
  {
    id: "subscriptionType",
    name: "subscriptionType",
    label: "Subscription Type",
    type: "select",
    placeholder: "Select subscription type",
    options: [
      { label: "Free", value: "free" },
      { label: "Classic", value: "classic" },
      { label: "Signature", value: "signature" },
    ],
  },
  {
    id: "period",
    name: "period",
    label: "Period",
    type: "select",
    placeholder: "Select period",
    options: [
      { label: "Monthly", value: "monthly" },
      { label: "Yearly", value: "yearly" },
    ],
  },
  {
    id: "startDate",
    name: "startDate",
    label: "From Date",
    type: "date",
    placeholder: "Select from date",
  },
  {
    id: "endDate",
    name: "endDate",
    label: "To Date",
    type: "date",
    placeholder: "Select to date",
  },
  {
    id: "payment",
    name: "payment",
    label: "Payment",
    type: "select",
    placeholder: "Select payment",
    options: [
      { label: "Cash", value: "cash" },
      { label: "Card", value: "card" },
      { label: "Bank Transfer", value: "bankTransfer" },
    ],
  },
  {
    id: "discount",
    name: "discount",
    label: "Discount",
    type: "number",
    placeholder: "Enter discount",
  },
  {
    id: "status",
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    options: AVAILABILITY_STATUSES,
  }
];

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

export const subscriptionFormSchema = Yup.object().shape({
  subscriptionType: Yup.string().required("Subscription type is required"),
  period: Yup.string().required("Period is required"),
  fromDate: Yup.date().required("From date is required"),
  toDate: Yup.date().required("To date is required"),
  payment: Yup.string().required("Payment is required"),
  discount: Yup.number().required("Discount is required"),
  status: Yup.string().required("Status is required"),
});

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

export const subscriptionFormField = subscriptionFormFields;
