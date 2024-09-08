import * as Yup from 'yup';

export const diningFormField = [
  {
    id: 'diningType',
    name: 'diningType',
    label: 'Dining Type',
    type: 'select',
  },
  { id: 'diningName', name: 'diningName', label: 'Dining Name', type: 'text' },
  {
    id: 'description',
    name: 'description',
    label: 'Description',
    type: 'textarea',
  },
  {
    id: 'dateType',
    name: 'dateType',
    label: 'Date Type',
    type: 'select',
    options: [
      { value: 'custom_ate', label: 'Custom Date' },
      { value: 'custom_dates', label: 'Custom Dates' },
      { value: 'custom_days', label: 'Custom Days' },
    ],
  },
  // {
  //   id: 'grid1',
  //   name: 'grid',
  //   fields: [
  //     { id: 'dayFrom', name: 'dayFrom', label: 'Day From', type: 'select' },
  //     { id: 'dayTo', name: 'dayTo', label: 'Day To', type: 'select' },
  //   ],
  // },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      { id: 'dateFrom', name: 'dateFrom', label: 'Date From', type: 'date' },
      { id: 'dateTo', name: 'dateTo', label: 'Date To', type: 'date' },
    ],
  },
  {
    id: 'grid3',
    name: 'grid',
    fields: [
      { id: 'timeFrom', name: 'timeFrom', label: 'Time From', type: 'time' },
      { id: 'timeTo', name: 'timeTo', label: 'Time To', type: 'time' },
    ],
  },
  {
    id: 'grid4',
    name: 'grid',
    fields: [
      {
        id: 'pricePerPerson',
        name: 'pricePerPerson',
        label: 'Price Per Person',
        type: 'number',
      },
      {
        id: 'availabilityStatus',
        name: 'availabilityStatus',
        label: 'Availability Status',
        type: 'select',
      },
    ],
  },
  {
    id: 'diningAreas',
    name: 'diningAreas',
    label: 'Dining Areas',
    type: 'select',
  },
  // {
  //   id: 'cuisine',
  //   name: 'cuisine',
  //   label: 'Cuisine',
  //   type: 'select',
  // },
  // {
  //   id: 'coverImage',
  //   name: 'coverImage',
  //   label: 'Cover Image',
  //   type: 'file',
  // },
];

export const diningFormSchema = Yup.object().shape({
  diningType: Yup.string().required('This field cannot be empty'),
  diningName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  description: Yup.string().max(1000, 'Max characters 1000 only allowed'),
  dateType: Yup.string().required('This field cannot be empty'),

  // dayFrom: Yup.string().required('This field cannot be empty'),
  // dayTo: Yup.string().required('This field cannot be empty'),
  dateFrom: Yup.date().required('This field cannot be empty'),
  dateTo: Yup.date().required('This field cannot be empty'),
  timeFrom: Yup.string().required('This field cannot be empty'),
  timeTo: Yup.string().required('This field cannot be empty'),
  pricePerPerson: Yup.number()
    .positive('Price must be positive')
    .required('This field cannot be empty'),
  availabilityStatus: Yup.string().required('This field cannot be empty'),
  diningAreas: Yup.string().required('This field cannot be empty'),
  // cuisine: Yup.string().required('This field cannot be empty'),
  // coverImage: Yup.mixed().required('A cover image is required'),
});
