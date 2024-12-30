import * as Yup from "yup";

export const seatingFormField = [
  {
    id: "sectionName",
    name: "sectionName",
    label: "Section Name",
    type: "text",
  },
  {
    id: "maximumSeats",
    name: "maximumSeats",
    label: "Maximum Seats Available",
    type: "number",
  },
  {
    id: "seatingAreaType",
    name: "seatingAreaType",
    label: "Seating Area Type",
    type: "select",
    options: [],
  },
];

export const seatingFormSchema = Yup.object().shape({
  sectionName: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(10, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  maximumSeats: Yup.number()
    .integer("Seats must be a whole number")
    .positive("Number of seats must be a positive number")
    .required("This field cannot be empty"),
  seatingAreaType: Yup.string().required("This field cannot be empty"),
});
