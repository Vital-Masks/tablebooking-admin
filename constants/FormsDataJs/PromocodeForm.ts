import * as Yup from 'yup';

export const promoFormField = [
  {
    id: 'restaurantIds',
    name: 'restaurantIds',
    label: 'Promocode for',
    type: 'select',
    options: [],
    isMulti: true,
  },
  { id: 'promocode', name: 'promocode', label: 'Promocode', type: 'text' },
  {
    id: 'grid1',
    name: 'grid',
    fields: [
      {
        id: 'valuePercentage',
        name: 'valuePercentage',
        label: 'Percentage',
        type: 'number',
      },
    ],
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      {
        id: 'validFromDate',
        name: 'validFromDate',
        label: 'Valid from Date',
        type: 'date',
      },
      {
        id: 'validFromTime',
        name: 'validFromTime',
        label: 'Valid from Time',
        type: 'time',
      },
    ],
  },
  {
    id: 'grid3',
    name: 'grid',
    fields: [
      {
        id: 'validTillDate',
        name: 'validTillDate',
        label: 'Valid till Date',
        type: 'date',
      },
      {
        id: 'validTillTime',
        name: 'validTillTime',
        label: 'Valid till Time',
        type: 'time',
      },
    ],
  },
  {
    id: 'availabilityStatus',
    name: 'availabilityStatus',
    label: 'Availability Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ],
  },
];

export const promoFormSchema = Yup.object().shape({
  restaurantIds: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please select at least one restaurant')
    .required('Please select restaurants'),
  
  promocode: Yup.string()
    .trim()
    .min(3, 'Promocode must be at least 3 characters')
    .max(20, 'Promocode cannot exceed 20 characters')
    .matches(/^[A-Z0-9\-_]+$/, 'Promocode can only contain uppercase letters, numbers, hyphens, and underscores')
    .required('Promocode is required'),
  
  valuePercentage: Yup.number()
    .typeError('Percentage must be a number')
    .positive('Percentage must be positive')
    .max(100, 'Percentage cannot exceed 100%')
    .required('Percentage is required'),
  
  validFromDate: Yup.date()
    .typeError('Please enter a valid date')
    .min(new Date(), 'Valid from date must be today or in the future')
    .required('Valid from date is required'),
  
  validFromTime: Yup.string()
    .trim()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format')
    .required('Valid from time is required'),
  
  validTillDate: Yup.date()
    .typeError('Please enter a valid date')
    .min(Yup.ref('validFromDate'), 'Valid till date must be after valid from date')
    .required('Valid till date is required'),
  
  validTillTime: Yup.string()
    .trim()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format')
    .required('Valid till time is required'),
  
  availabilityStatus: Yup.string()
    .oneOf(['Active', 'Inactive'], 'Please select a valid status')
    .required('Availability status is required'),
});
