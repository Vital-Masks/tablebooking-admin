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
  {
    id: 'reason',
    name: 'reason',
    label: 'Reason for rejection',
    type: 'text',
    ifRender: ['status', 'Rejected'], // Only show when status is "Rejected"
  },
];

export const tableReservationFormSchema = Yup.object().shape({
  // Date - Required
  date: Yup.string()
    .required('Date is required'),

  // Time - Required
  time: Yup.string()
    .required('Time is required'),

  // First Name - Required, 3-50 characters, no leading spaces
  firstname: Yup.string()
    .trim()
    .min(3, 'First name must be at least 3 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .matches(/^\S/, 'First name cannot start with a space')
    .required('First name is required'),

  // Last Name - Required, 3-50 characters, no leading spaces
  lastname: Yup.string()
    .trim()
    .min(3, 'Last name must be at least 3 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .matches(/^\S/, 'Last name cannot start with a space')
    .required('Last name is required'),

  // Contact Number - Required, max 255 characters
  contactNumber: Yup.string()
    .trim()
    .max(255, 'Contact number cannot exceed 255 characters')
    .required('Contact number is required'),

  // Email - Required, valid email format, max 255 characters
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email address cannot exceed 255 characters')
    .required('Email address is required'),

  // Restaurant - Required
  restaurant: Yup.string()
    .required('Restaurant is required'),

  // Dining - Required
  dining: Yup.string()
    .required('Dining is required'),

  // Guest Size - Required, positive integer
  guestSize: Yup.number()
    .typeError('Guest size must be a number')
    .integer('Guest size must be a whole number')
    .positive('Guest size must be a positive number')
    .min(1, 'Guest size must be at least 1')
    .max(100, 'Guest size cannot exceed 100')
    .required('Guest size is required'),

  // Dining Area - Required
  diningArea: Yup.string()
    .required('Dining area is required'),

  // Occasion - Required, 3-50 characters, no leading spaces
  occasion: Yup.string()
    .trim()
    .min(3, 'Occasion must be at least 3 characters')
    .max(50, 'Occasion cannot exceed 50 characters')
    .matches(/^\S/, 'Occasion cannot start with a space')
    .required('Occasion is required'),

  // Special Request - Optional, 3-255 characters, no leading spaces
  specialRequest: Yup.string()
    .trim()
    .min(3, 'Special request must be at least 3 characters')
    .max(255, 'Special request cannot exceed 255 characters')
    .matches(/^\S/, 'Special request cannot start with a space')
    .optional(),

  // Table Number - Required, 3-20 characters, no leading spaces
  tableNo: Yup.string()
    .trim()
    .min(3, 'Table number must be at least 3 characters')
    .max(20, 'Table number cannot exceed 20 characters')
    .matches(/^\S/, 'Table number cannot start with a space')
    .required('Table number is required'),

  // Status - Required
  status: Yup.string()
    .required('Status is required'),

  // Promo Code - Optional, 3-20 characters
  promocode: Yup.string()
    .trim()
    .min(3, 'Promo code must be at least 3 characters')
    .max(20, 'Promo code cannot exceed 20 characters')
    .optional()
    .nullable(),

  // Reason - Conditional validation based on status
  reason: Yup.string().when('status', {
    is: 'Rejected',
    then: (schema) => schema
      .trim()
      .min(3, 'Reason must be at least 3 characters')
      .max(255, 'Reason cannot exceed 255 characters')
      .matches(/^\S/, 'Reason cannot start with a space')
      .required('Reason is required when status is Rejected'),
    otherwise: (schema) => schema.optional(),
  }),
});
