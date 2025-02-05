import * as Yup from 'yup';

export const generalFormField = [
  {
    id: 'coverImage',
    name: 'coverImage',
    label: 'Cover Image',
    type: 'file',
  },
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
    id: 'grid7',
    name: 'grid',
    fields: [
      {
        id: 'description',
        name: 'description',
        label: 'Description',
        type: 'textarea',
      },
      {
        id: 'currency',
        name: 'currency',
        label: 'Currency',
        type: 'select',
      },
    ],
  },
  {
    id: 'grid8',
    name: 'grid',
    fields: [
      {
        id: 'dinningStyle',
        name: 'dinningStyle',
        label: 'Dinning Style',
        type: 'select',
        options: [],
        isMulti: true,
      },
      {
        id: 'dressCode',
        name: 'dressCode',
        label: 'Dress Code',
        type: 'select',
        options: [],
        isMulti: true,
      },
    ],
  },
  {
    id: 'grid9',
    name: 'grid',
    fields: [
      {
        id: 'paymentOptions',
        name: 'paymentOptions',
        label: 'Payment Options',
        type: 'select',
        options: [
          {
            label: 'Cash',
            value: 'cash',
          },
          {
            label: 'Visa',
            value: 'visa',
          },
          {
            label: 'Master',
            value: 'master',
          },
        ],
        isMulti: true,
      },
      {
        id: 'cousines',
        name: 'cousines',
        label: 'Cuisines',
        type: 'select',
        isMulti: true,
      },
    ],
  },
  {
    id: 'grid10',
    name: 'grid',
    fields: [
      {
        id: 'timeZone',
        name: 'timeZone',
        label: 'Time Zone',
        type: 'select',
        options: [],
      },
      {
        id: 'availabilityStatus',
        name: 'availabilityStatus',
        label: 'Availability Status',
        type: 'select',
        options: [
          {
            label: 'Available',
            value: 'Available',
          },
          {
            label: 'Not Available',
            value: 'Not Available',
          },
        ],
      },
    ],
  },
  {
    id: 'grid11',
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
    id: 'grid12',
    name: 'grid',
    fields: [
      {
        id: 'isPromoted',
        name: 'isPromoted',
        label: 'Promoted',
        type: 'switch',
      },
    ],
  },
];

export const generalFormSchema = Yup.object().shape({
  restaurantName: Yup.string()
    .matches(/^\S.*$/, 'Cannot start with a space')
    .min(3, 'Min characters 255 only allowed')
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  restaurantType: Yup.string().required('This field cannot be empty'),
  contactNo: Yup.string()
    .matches(/^\S.*$/, 'Cannot start with a space')
    .matches(/^07\d{8}$/, 'Invalid Sri Lankan phone number format')
    .required('This field cannot be empty'),
  whatsappNo: Yup.string()
    .matches(/^\S.*$/, 'Cannot start with a space')
    .matches(/^07\d{8}$/, 'Invalid Sri Lankan phone number format')
    .required('This field cannot be empty'),
  registerationNumber: Yup.string()
    .max(15, 'Max characters 15 only allowed')
    .required('This field cannot be empty'),
  hospitalityChainId: Yup.string().required('This field cannot be empty'),
  email: Yup.string()
    .email('Invalid email format')
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  website: Yup.string()
    .url('Invalid URL format')
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  address: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  addressEmbedURL: Yup.string()
    .url('Invalid URL format')
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  description: Yup.string()
    .max(1000, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  dinningStyle: Yup.array()
  .min(1, 'At least one cuisine must be selected')
  .required('This field cannot be empty'),
  dressCode: Yup.array()
  .min(1, 'At least one cuisine must be selected')
  .required('This field cannot be empty'),
  cousines: Yup.array()
    .min(1, 'At least one cuisine must be selected')
    .required('This field cannot be empty'),
  paymentOptions: Yup.array()
  .min(1, 'At least one cuisine must be selected')
  .required('This field cannot be empty'),
  timeZone: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  availabilityStatus: Yup.string().required('This field cannot be empty'),
  closeTime: Yup.string().required('This field cannot be empty'),
  openTime: Yup.string().required('This field cannot be empty'),
  isPromoted: Yup.boolean(),
  coverImage: Yup.array()
    .min(5, 'At least 5 cover images must be selected')
    .required('This field cannot be empty'),
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
