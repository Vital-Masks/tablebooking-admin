import * as Yup from 'yup';

export const bannerFormField = [
  {
    id: 'bannerName',
    name: 'bannerName',
    label: 'Banner Name',
    type: 'text',
  },
  {
    id: 'bannerFor',
    name: 'bannerFor',
    label: 'Banner for',
    type: 'select',
    options: [
      { value: 'mobile-desktop', label: 'Mobile & Desktop' },
      { value: 'mobile', label: 'Mobile' },
      { value: 'desktop', label: 'Desktop' },
    ],
  },
  {
    id: 'redirectFor',
    name: 'redirectFor',
    label: 'Redirected for',
    type: 'url',
  },
  {
    id: 'coverImage',
    name: 'coverImage',
    label: 'Cover Image',
    type: 'file',
    maxFiles: 1,
  },
  {
    id: 'grid1',
    name: 'grid',
    fields: [
      { id: 'validFromDate', name: 'validFromDate', label: 'Valid from Date', type: 'date' },
      { id: 'validFromTime', name: 'validFromTime', label: 'Valid from Time', type: 'time' },
    ],
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      { id: 'validTillDate', name: 'validTillDate', label: 'Valid till Date', type: 'date' },
      { id: 'validTillTime', name: 'validTillTime', label: 'Valid till Time', type: 'time' },
    ],
  },
  {
    id: 'isAvailable',
    name: 'isAvailable',
    label: 'Availability Status',
    type: 'select',
    options: [
      { value: true, label: 'Available' },
      { value: false, label: 'Not Available' },
    ],
  },
];

export const bannerFormSchema = Yup.object().shape({
  bannerName: Yup.string()
    .trim()
    .min(3, 'Banner name must be at least 3 characters')
    .max(100, 'Banner name cannot exceed 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,&()]+$/, 'Banner name can only contain letters, numbers, spaces, hyphens, underscores, and basic punctuation')
    .required('Banner name is required'),

  bannerFor: Yup.string()
    .required('Banner target is required'),

  redirectFor: Yup.string()
    .trim()
    .url('Please enter a valid URL')
    .matches(/^https?:\/\//, 'URL must start with http:// or https://')
    .max(500, 'URL cannot exceed 500 characters')
    .required('Redirect URL is required'),

  coverImage: Yup.mixed()
    .required('A cover image is required'),

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

  isAvailable: Yup.boolean()
    .typeError('Please select a valid availability status')
    .required('Availability status is required'),
});
