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
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  bannerFor: Yup.string().required('This field cannot be empty'),
  redirectFor: Yup.string().required('This field cannot be empty'),
  coverImage: Yup.mixed().required('A cover image is required'),
  validFromDate: Yup.date().required('This field cannot be empty'),
  validFromTime: Yup.string().required('This field cannot be empty'),
  validTillDate: Yup.date().required('This field cannot be empty'),
  validTillTime: Yup.string().required('This field cannot be empty'),
  isAvailable: Yup.string().required('This field cannot be empty'),
});
