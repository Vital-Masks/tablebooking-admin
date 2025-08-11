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

export const reservationFormSchema = Yup.object().shape({
  date: Yup.string()
    .trim()
    .min(1, 'Please select a valid date')
    .max(50, 'Date selection cannot exceed 50 characters')
    .required('Date is required'),
  
  time: Yup.string()
    .trim()
    .min(1, 'Please select a valid time')
    .max(20, 'Time selection cannot exceed 20 characters')
    .required('Time is required'),
  
  fullname: Yup.string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces')
    .required('Full name is required'),
  
  contactNumber: Yup.string()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid contact number')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number cannot exceed 15 digits')
    .required('Contact number is required'),
  
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email cannot exceed 255 characters')
    .required('Email address is required'),
});
