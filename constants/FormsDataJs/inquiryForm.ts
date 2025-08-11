import * as Yup from "yup";

export const inquiryFormField = [
  { id: "firstName", name: "firstName", label: "First name", type: "text", disabled: true },
  { id: "lastName", name: "lastName", label: "Last name", type: "text", disabled: true },
  { id: "contactNo", name: "contactNo", label: "Contact number", type: "text", disabled: true },
  { id: "email", name: "email", label: "Email address", type: "email", disabled: true },
  {
    id: "companyName",
    name: "companyName",
    label: "Company Name",
    type: "text",
    disabled: true,
  },
  {
    id: "status",
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "In Progress", value: "In Progress" },
      { label: "Completed", value: "Completed" },
    ],
  },
];

export const inquiryFormSchema = Yup.object().shape({
  // Only validate status field since other fields are disabled/read-only
  status: Yup.string()
    .oneOf(['In Progress', 'Completed'], 'Please select a valid status')
    .required('Status is required'),
});
