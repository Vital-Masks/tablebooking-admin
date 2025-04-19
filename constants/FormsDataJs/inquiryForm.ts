import * as Yup from "yup";

export const inquiryFormField = [
  { id: "firstName", name: "firstName", label: "First name", type: "text" },
  { id: "lastName", name: "lastName", label: "Last name", type: "text" },
  { id: "contactNo", name: "contactNo", label: "Contact number", type: "text" },
  { id: "email", name: "email", label: "Email address", type: "email" },
  {
    id: "companyName",
    name: "companyName",
    label: "Company Name",
    type: "text",
  },
  { id: "status", name: "status", label: "Status", type: "text" },
];

export const inquiryFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255, "Max characters 255 only allowed")
    .required("This field cannot be empty"),
  lastName: Yup.string()
    .max(255, "Max characters 255 only allowed")
    .required("This field cannot be empty"),
  contactNo: Yup.string()
    .max(255, "Max characters 255 only allowed")
    .required("This field cannot be empty"),
  email: Yup.string()
    .max(255, "Max characters 255 only allowed")
    .required("This field cannot be empty"),
  companyName: Yup.string()
    .max(255, "Max characters 255 only allowed")
    .required("This field cannot be empty"),
  status: Yup.string()
    .max(255, "Max characters 255 only allowed")
    .required("This field cannot be empty"),
});
