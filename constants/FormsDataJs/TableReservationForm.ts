import * as Yup from 'yup';

export const tableReservationFormField = [
  {
    id: 'date',
    name: 'date',
    label: 'Select date',
    type: 'calendar',
  },
  { id: 'time', name: 'time', label: 'Time', type: 'time' },
  { id: 'email', name: 'email', label: 'Email address', type: 'email' },
  { id: 'firstname', name: 'firstname', label: 'First name', type: 'text' },
  { id: 'lastname', name: 'lastname', label: 'Last name', type: 'text' },
  {
    id: 'contactNumber',
    name: 'contactNumber',
    label: 'Contact number',
    type: 'text',
  },

  {
    id: 'restaurant',
    name: 'restaurant',
    label: 'Restaurant',
    type: 'restaurant-select',
  },
  {
    id: 'dining',
    name: 'dining',
    label: 'Dining',
    type: 'dining-select',
  },
  {
    id: 'diningArea',
    name: 'diningArea',
    label: 'Dining Area',
    type: 'dining-area-select',
  },
  { id: 'guestSize', name: 'guestSize', label: 'Guest Size', type: 'number' },
  { id: 'occasion', name: 'occasion', label: 'Occasion', type: 'text' },
  {
    id: 'specialRequest',
    name: 'specialRequest',
    label: 'Special Note',
    type: 'textarea',
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      { id: 'tableNo', name: 'tableNo', label: 'Table No', type: 'text' },
      {
        id: 'status',
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          {
            label: 'Booked',
            value: 'Booked',
          },
          {
            label: 'Pending',
            value: 'Pending',
          },
          {
            label: 'Rejected',
            value: 'Rejected',
          },
        ],
      },
    ],
  },
  {
    id: 'promocode',
    name: 'promocode',
    label: 'Promo Code',
    type: 'text',
  },
];

export const tableReservationFormSchema = Yup.object().shape({
  date: Yup.string().required('This field cannot be empty'),
  time: Yup.string().required('This field cannot be empty'),
  firstname: Yup.string()
    .matches(/^\S.*$/, 'Cannot start with a space')
    .min(3, 'Min characters 3 only allowed')
    .max(50, 'Max characters 10 only allowed')
    .required('This field cannot be empty'),
  lastname: Yup.string()
    .matches(/^\S.*$/, 'Cannot start with a space')
    .min(3, 'Min characters 3 only allowed')
    .max(50, 'Max characters 10 only allowed')
    .required('This field cannot be empty'),
  contactNumber: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  email: Yup.string()
    .email('Invalid email format')
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  restaurant: Yup.string().required('This field cannot be empty'),
  dining: Yup.string().required('This field cannot be empty'),
  guestSize: Yup.number()
    .integer('Guest size must be an integer')
    .positive('Guest size must be a positive number')
    .required('This field cannot be empty'),
  diningArea: Yup.string().required('This field cannot be empty'),
  occasion: Yup.string()
    .matches(/^\S.*$/, 'Cannot start with a space')
    .min(3, 'Min characters 3 only allowed')
    .max(10, 'Max characters 10 only allowed')
    .required('This field cannot be empty'),
    specialRequest: Yup.string()
    .matches(/^\S.*$/, 'Cannot start with a space')
    .min(3, 'Min characters 3 only allowed')
    .max(255, 'Max characters 10 only allowed'),
  tableNo: Yup.string()
    .matches(/^\S.*$/, 'Cannot start with a space')
    .min(3, 'Min characters 3 only allowed')
    .max(10, 'Max characters 10 only allowed')
    .required('This field cannot be empty'),
  status: Yup.string().required('This field cannot be empty'),
  promocode: Yup.string().min(3, 'Min characters 3 only allowed').max(6, 'Max characters 10 only allowed').nullable(),
});
