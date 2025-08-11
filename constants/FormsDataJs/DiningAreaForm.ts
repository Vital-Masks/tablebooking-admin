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
    .trim()
    .min(2, 'Section name must be at least 2 characters')
    .max(50, 'Section name cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,&()]+$/, 'Section name can only contain letters, numbers, spaces, hyphens, underscores, and basic punctuation')
    .required('Section name is required'),
  
  maximumSeats: Yup.number()
    .typeError('Maximum seats must be a number')
    .integer('Seats must be a whole number')
    .positive('Number of seats must be a positive number')
    .max(1000, 'Maximum seats cannot exceed 1,000')
    .required('Maximum seats is required'),
  
  seatingAreaType: Yup.string()
    .trim()
    .min(1, 'Please select a seating area type')
    .required('Seating area type is required'),
});
