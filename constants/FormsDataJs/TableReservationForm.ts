import * as Yup from 'yup';

export const tableReservationFormField = [
  {
    id: 'date',
    name: 'date',
    label: 'Select date',
    type: 'calendar',
  },
  { id: 'time', name: 'time', label: 'Time', type: 'time' },
  { id: 'fullname', name: 'fullname', label: 'Full name', type: 'text' },
  {
    id: 'contactNumber',
    name: 'contactNumber',
    label: 'Contact number',
    type: 'text',
  },
  { id: 'email', name: 'email', label: 'Email address', type: 'email' },
  { id: 'restaurant', name: 'restaurant', label: 'Restaurant', type: 'restaurant-select' },
  {
    id: 'dining',
    name: 'dining',
    label: 'Dining',
    type: 'dining-select',
  },
  { id: 'diningArea', name: 'diningArea', label: 'Dining Area', type: 'dining-area-select' },
  { id: 'guestSize', name: 'guestSize', label: 'Guest Size', type: 'number' },
  { id: 'occasion', name: 'occasion', label: 'Occasion', type: 'text' },
  {
    id: 'specialnote',
    name: 'specialnote',
    label: 'Special Note',
    type: 'textarea',
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      { id: 'tableno', name: 'tableno', label: 'Table No', type: 'select' },
      {
        id: 'status', name: 'status', label: 'Status', type: 'select', options: [{
          label: "Booked", value: 'booked'
        }, {
          label: "Pending", value: 'pending'
        }, {
          label: "Rejected", value: 'rejected'
        }
        ]
      },
    ],
  },
];

export const tableReservationFormSchema = Yup.object().shape({
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
    dining: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    guestSize: Yup.number()
    .integer('Pax must be an integer')
    .positive('Pax must be a positive number')
    .required('This field cannot be empty'),
    diningArea: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  occasion: Yup.string().max(255, 'Max characters 255 only allowed'),
  specialnote: Yup.string().max(255, 'Max characters 255 only allowed'),
  tableno: Yup.string().max(255, 'Max characters 255 only allowed'),
  status: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
});
