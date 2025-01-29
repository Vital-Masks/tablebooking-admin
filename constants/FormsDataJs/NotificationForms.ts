import * as Yup from "yup";

export const customNotificationFormField = [
  {
    id: "notificationTitle",
    name: "notificationTitle",
    label: "Notification Title",
    type: "text",
  },
  {
    id: "notification",
    name: "notification",
    label: "Notification",
    type: "textarea",
  },
  {
    id: "customersOf",
    name: "customersOf",
    label: "Customers of",
    type: "select",
    options: [],
    isMulti: true,
  },
  {
    id: "date",
    name: "date",
    label: "Date",
    type: "calendar",
    hasTime: false,
  },
  {
    id: "time",
    name: "time",
    label: "Time",
    type: "time",
  }
];

export const customNotificationFormSchema = Yup.object().shape({
  notificationTitle: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(10, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  notification: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(20, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  customersOf: Yup.array()
    .min(1, "At least one cuisine must be selected")
    .required("This field cannot be empty"),
  date: Yup.string().required("This field cannot be empty"),
  time: Yup.string().required("This field cannot be empty"),
});

export const autoNotificationFormField = [
  {
    id: "automativeNotificationType",
    name: "automativeNotificationType",
    label: "Automative Notification Type",
    type: "select",
  },
  {
    id: "notification",
    name: "notification",
    label: "Notification",
    type: "textarea",
  },
  {
    id: "customersOf",
    name: "customersOf",
    label: "Customers of",
    type: "select",
    options: [],
    isMulti: true,
  },
];

export const autoNotificationFormSchema = Yup.object().shape({
  automativeNotificationType: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(20, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  notification: Yup.string()
    .matches(/^\S.*$/, "Cannot start with a space")
    .min(3, "Min characters 3 only allowed")
    .max(20, "Max characters 10 only allowed")
    .required("This field cannot be empty"),
  customersOf: Yup.array()
    .min(1, "At least one cuisine must be selected")
    .required("This field cannot be empty"),
});
