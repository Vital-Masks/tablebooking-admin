import * as Yup from 'yup';

export const reservationFormField = [
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
];

export const reservationFormSchema = {
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
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
};
