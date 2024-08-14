import * as Yup from 'yup';

export const foodFormField = [
  {
    id: 'foodName',
    name: 'foodName',
    label: 'Food Name',
    type: 'text',
  },
  {
    id: 'foodCategory',
    name: 'foodCategory',
    label: 'Food Category',
    type: 'select',
  },
  {
    id: 'description',
    name: 'description',
    label: 'Description',
    type: 'textarea',
  },
  {
    id: 'cousineType',
    name: 'cousineType',
    label: 'Cuisine Type',
    type: 'select',
  },
  {
    id: 'price',
    name: 'price',
    label: 'Price',
    type: 'number',
  },
];

export const foodFormSchema = Yup.object().shape({
  foodName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  foodCategory: Yup.string().required('This field cannot be empty'),
  description: Yup.string().max(1000, 'Max characters 1000 only allowed'),
  cousineType: Yup.string().required('This field cannot be empty'),
  price: Yup.number()
    .positive('Price must be a positive number')
    .required('This field cannot be empty'),
});
