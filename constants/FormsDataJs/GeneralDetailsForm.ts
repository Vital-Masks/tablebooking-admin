import * as Yup from 'yup';

export const generalFormField = [
  {
    id: 'grid1',
    name: 'grid',
    fields: [
      {
        id: 'restaurantName',
        name: 'restaurantName',
        label: 'Restaurant Name',
        type: 'text',
      },
      {
        id: 'restaurantType',
        name: 'restaurantType',
        label: 'Restaurant Type',
        type: 'select',
        options: [],
      },
    ],
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      {
        id: 'contactNo',
        name: 'contactNo',
        label: 'Contact Number',
        type: 'text',
      },
      {
        id: 'whatsappNo',
        name: 'whatsappNo',
        label: 'WhatsApp Number',
        type: 'text',
      },
    ],
  },
  {
    id: 'grid3',
    name: 'grid',
    fields: [
      {
        id: 'registerationNumber',
        name: 'registerationNumber',
        label: 'Registeration Number',
        type: 'text',
      },
      {
        id: 'hospitalityChainId',
        name: 'hospitalityChainId',
        label: 'Hospital Chain',
        type: 'select',
        options: [],
      },
    ],
  },
  {
    id: 'grid4',
    name: 'grid',
    fields: [
      { id: 'email', name: 'email', label: 'Email Address', type: 'email' },
      { id: 'website', name: 'website', label: 'Website', type: 'url' },
    ],
  },
  {
    id: 'grid5',
    name: 'grid',
    fields: [
      { id: 'address', name: 'address', label: 'Address', type: 'text' },
      {
        id: 'addressEmbedURL',
        name: 'addressEmbedURL',
        label: 'Address Embed URL',
        type: 'url',
      },
    ],
  },
  {
    id: 'description',
    name: 'description',
    label: 'Description',
    type: 'textarea',
  },
  {
    id: 'grid6',
    name: 'grid',
    fields: [
      {
        id: 'dinningStyle',
        name: 'dinningStyle',
        label: 'Dinning Style',
        type: 'text',
      },
      { id: 'dressCode', name: 'dressCode', label: 'Dress Code', type: 'text' },
    ],
  },
  {
    id: 'grid7',
    name: 'grid',
    fields: [
      {
        id: 'paymentOptions',
        name: 'paymentOptions',
        label: 'Payment Options',
        type: 'select',
      },
      { id: 'cuisine', name: 'cuisine', label: 'Cuisine', type: 'select' },
    ],
  },
  {
    id: 'grid8',
    name: 'grid',
    fields: [
      { id: 'timeZone', name: 'timeZone', label: 'Time Zone', type: 'text' },
      {
        id: 'availabilityStatus',
        name: 'availabilityStatus',
        label: 'Availability Status',
        type: 'select',
        options: [
          {
            label: 'Available',
            value: true,
          },
          {
            label: 'Not Available',
            value: false,
          },
        ],
      },
    ],
  },
  {
    id: 'grid9',
    name: 'grid',
    fields: [
      { id: 'openTime', name: 'openTime', label: 'Open time', type: 'time' },
      {
        id: 'closeTime',
        name: 'closeTime',
        label: 'Close time',
        type: 'time',
      },
    ],
  },
  {
    id: 'isPromoted',
    name: 'isPromoted',
    label: 'Promoted',
    type: 'switch',
  },
];

export const generalFormSchema = Yup.object().shape({
  restaurantName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  restaurantType: Yup.string().required('This field cannot be empty'),
  contactNo: Yup.string()
    .max(15, 'Max characters 15 only allowed')
    .required('This field cannot be empty'),
  whatsappNo: Yup.string().max(15, 'Max characters 15 only allowed'),
  registerationNumber: Yup.string().max(15, 'Max characters 15 only allowed'),
  hospitalityChainId: Yup.string(),
  email: Yup.string()
    .email('Invalid email format')
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  website: Yup.string()
    .url('Invalid URL format')
    .max(255, 'Max characters 255 only allowed'),
  address: Yup.string().max(255, 'Max characters 255 only allowed'),
  addressEmbedURL: Yup.string()
    .url('Invalid URL format')
    .max(255, 'Max characters 255 only allowed'),
  description: Yup.string().max(1000, 'Max characters 1000 only allowed'),
  dinningStyle: Yup.string().max(255, 'Max characters 255 only allowed'),
  dressCode: Yup.string().max(255, 'Max characters 255 only allowed'),
  paymentOptions: Yup.string().required('This field cannot be empty'),
  timeZone: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  availabilityStatus: Yup.string().required('This field cannot be empty'),
  isPromoted: Yup.boolean(),
});

export const generalImageFormField = [
  {
    id: 'coverUpload',
    name: 'coverUpload',
    label: 'Upload Cover',
    type: 'file',
  },
];

export const generalImageFormSchema = Yup.object().shape({
  coverUpload: Yup.mixed().required('A cover image is required'),
});
