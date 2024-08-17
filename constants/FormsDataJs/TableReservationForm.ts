import * as Yup from 'yup';

export const tableReservationFormField = [
  {
    id: 'grid1',
    name: 'grid',
    fields: [
      { id: 'date', name: 'date', label: 'Date', type: 'select' },
      { id: 'time', name: 'time', label: 'Time', type: 'select' },
    ],
  },
  { id: 'fullname', name: 'fullname', label: 'Full name', type: 'text' },
  {
    id: 'contactNumber',
    name: 'contactNumber',
    label: 'Contact number',
    type: 'text',
  },
  { id: 'email', name: 'email', label: 'Email address', type: 'email' },
  { id: 'restaurant', name: 'restaurant', label: 'Restaurant', type: 'text' },
  {
    id: 'reservedfor',
    name: 'reservedfor',
    label: 'Reserved For',
    type: 'text',
  },
  { id: 'pax', name: 'pax', label: 'Pax', type: 'number' },
  { id: 'diningarea', name: 'diningarea', label: 'Dining Area', type: 'text' },
  { id: 'occasion', name: 'occasion', label: 'Occasion', type: 'text' },
  {
    id: 'specialnote',
    name: 'specialnote',
    label: 'Special Note',
    type: 'text',
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      { id: 'tableno', name: 'tableno', label: 'Table No', type: 'select' },
      { id: 'status', name: 'status', label: 'Status', type: 'select' },
    ],
  },
];

export const tableReservationFormSchema = {
  date: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  time: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  fullname: Yup.string().required('This field cannot be empty'),
  contactNumber: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  email: Yup.string()
    .email('Invalid email format')
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  restaurant: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  reservedfor: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  pax: Yup.number()
    .integer('Pax must be an integer')
    .positive('Pax must be a positive number')
    .required('This field cannot be empty'),
  diningarea: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  occasion: Yup.string().max(255, 'Max characters 255 only allowed'),
  specialnote: Yup.string().max(255, 'Max characters 255 only allowed'),
  tableno: Yup.string().max(255, 'Max characters 255 only allowed'),
  status: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
};
