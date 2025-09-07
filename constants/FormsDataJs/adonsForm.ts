import * as Yup from "yup";

// ============================================================================
// CONSTANTS
// ============================================================================

const AVAILABILITY_STATUSES = [
  { label: "Available", value: "active" },
  { label: "Not Available", value: "inactive" },
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
    id: "addonid",
    name: "addonid",
    label: "Addon Plan",
    type: "select",
    placeholder: "Select addons type",
    options: [],
  },
  {
    id: "count",
    name: "count",
    label: "Addons Count",
    type: "number",
    min: 1,
    step: 1,
    max: 10,
    placeholder: "Select addons count",
  },
  {
    id: "addontype",
    name: "addontype",
    label: "Addons Type",
    type: "select",
    options: [
      { label: "Monthly", value: "monthly" },
      { label: "Yearly", value: "yearly" },
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
    id: "startdate",
    name: "startdate",
    label: "From Date",
    type: "date",
    placeholder: "Select from date",
  },
  {
    id: "paymenttype",
    name: "paymenttype",
    label: "Payment",
    type: "select",
    placeholder: "Select payment",
    options: [
      { label: "Paid", value: "paid" },
      { label: "Card", value: "Card" },
      { label: "Free", value: "Free" },
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
      },
    ],
  },
  {
    id: "status",
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    options: AVAILABILITY_STATUSES,
  },
];

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

export const adonsFormSchema = Yup.object().shape({
  addonid: Yup.string().required("Addon plan is required"),
  count: Yup.number().required("Addons count is required"),
  addontype: Yup.string().required("Addons type is required"),
  period: Yup.number().required("Period is required"),
  startdate: Yup.date().required("From date is required"),
  paymenttype: Yup.string().required("Payment is required"),
  discountValue: Yup.string().required("Discount value is required"),
  discountType: Yup.string().required("Discount type is required"),
  status: Yup.string().required("Status is required"),
});

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

export const adonsFormField = adonsFormFields;
