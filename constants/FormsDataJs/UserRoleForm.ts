import * as Yup from "yup";

export const userroleFormField = [
  { id: "firstName", name: "firstName", label: "First name", type: "text" },
  { id: "lastName", name: "lastName", label: "Last name", type: "text" },
  { id: "role", name: "role", label: "Role/Designation", type: "text" },
  { id: "email", name: "email", label: "Email address", type: "email" },
  {
    id: "gender",
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ],
  },
  {
    id: "phoneNumber",
    name: "phoneNumber",
    label: "Mobile Number",
    type: "text",
  },
];

export const userroleFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(50, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  lastName: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(50, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  role: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(20, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  email: Yup.string()
    .email("Invalid email format")
    .min(3, "Min characters 3 only allowed")
    .max(50, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  gender: Yup.string().required("This field cannot be empty"),
  phoneNumber: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .matches(/^07\d{8}$/, "Invalid Sri Lankan phone number format")
    .required("This field cannot be empty"),
});
