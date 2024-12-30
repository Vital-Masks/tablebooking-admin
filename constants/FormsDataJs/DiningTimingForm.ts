import * as Yup from "yup";

export const diningFormField: any = [
  {
    id: "diningType",
    name: "diningType",
    label: "Dining Type",
    type: "select",
    options: [],
  },
  { id: "diningName", name: "diningName", label: "Dining Name", type: "text" },
  {
    id: "description",
    name: "description",
    label: "Description",
    type: "textarea",
  },
  {
    id: "dateFrom",
    name: "dateFrom",
    label: "Select date",
    type: "customDateCalendar",
    dependant: "dateType",
  },
  {
    id: "grid3",
    name: "grid",
    fields: [
      { id: "timeFrom", name: "timeFrom", label: "Time From", type: "time" },
      { id: "timeTo", name: "timeTo", label: "Time To", type: "time" },
    ],
  },
  {
    id: "grid4",
    name: "grid",
    fields: [
      {
        id: "pricePerPerson",
        name: "pricePerPerson",
        label: "Price Per Person",
        type: "number",
      },
      {
        id: "availabilityStatus",
        name: "availabilityStatus",
        label: "Availability Status",
        type: "select",
        options: [
          {
            label: "Available",
            value: 'true',
          },
          {
            label: "Not Available",
            value: 'false',
          },
        ],
      },
    ],
  },
  {
    id: "diningAreas",
    name: "diningAreas",
    label: "Dining Areas",
    type: "select",
    options: [],
  }
];

export const diningFormSchema = Yup.object().shape({
  diningType: Yup.string().required("This field cannot be empty"),
  diningName: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(10, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  description: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(10, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  dateFrom: Yup.date().required("This field cannot be empty"),
  timeFrom: Yup.string().required("This field cannot be empty"),
  timeTo: Yup.string().required("This field cannot be empty"),
  pricePerPerson: Yup.number()
    .positive("Price must be positive")
    .required("This field cannot be empty"),
  availabilityStatus: Yup.string().required("This field cannot be empty"),
  diningAreas: Yup.string().required("This field cannot be empty"),
});
