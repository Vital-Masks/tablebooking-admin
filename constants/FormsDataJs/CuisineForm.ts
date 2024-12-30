import * as Yup from "yup";

export const foodFormField = [
  {
    id: "foodName",
    name: "foodName",
    label: "Food Name",
    type: "text",
  },
  {
    id: "foodCategory",
    name: "foodCategory",
    label: "Food Category",
    type: "select",
    options: [],
  },
  {
    id: "description",
    name: "description",
    label: "Description",
    type: "textarea",
  },
  {
    id: "cousineType",
    name: "cousineType",
    label: "Cuisine Type",
    type: "select",
    options: [],
  },
  {
    id: "price",
    name: "price",
    label: "Price",
    type: "number",
  },
];

export const foodFormSchema = Yup.object().shape({
  foodName: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(10, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  foodCategory: Yup.string().required("This field cannot be empty"),
  description: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .max(1000, "Max characters 255 only allowed")
    .required("This field cannot be empty"),
  cousineType: Yup.string().required("This field cannot be empty"),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("This field cannot be empty"),
});
