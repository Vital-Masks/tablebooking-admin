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
    .trim()
    .min(2, 'Food name must be at least 2 characters')
    .max(100, 'Food name cannot exceed 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,&()]+$/, 'Food name can only contain letters, numbers, spaces, hyphens, underscores, and basic punctuation')
    .required('Food name is required'),
  
  foodCategory: Yup.string()
    .trim()
    .min(1, 'Please select a food category')
    .required('Food category is required'),
  
  description: Yup.string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,!?()@#$%&*+=<>[\]{}|\\/:;"'`~]+$/, 'Description contains invalid characters')
    .required('Description is required'),
  
  cousineType: Yup.string()
    .trim()
    .min(1, 'Please select a cuisine type')
    .required('Cuisine type is required'),
  
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be a positive number')
    .max(9999.99, 'Price cannot exceed $9,999.99')
    .test('decimal-places', 'Price can have maximum 2 decimal places', function(value) {
      if (!value) return false;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    })
    .required('Price is required'),
});
