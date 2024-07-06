import * as Yup from 'yup';

export const generalFormField = [
  {
    id: 'grid1',
    name: 'grid',
    fields: [
      { id: 'restaurantName', name: 'restaurantName', label: 'Restaurant Name', type: 'text' },
      { id: 'restaurantType', name: 'restaurantType', label: 'Restaurant Type', type: 'select' },
    ],
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      { id: 'contactNumber', name: 'contactNumber', label: 'Contact Number', type: 'text' },
      { id: 'whatsappNumber', name: 'whatsappNumber', label: 'WhatsApp Number', type: 'text' },
    ],
  },
  {
    id: 'grid3',
    name: 'grid',
    fields: [
      { id: 'email', name: 'email', label: 'Email Address', type: 'email' },
      { id: 'website', name: 'website', label: 'Website', type: 'url' },
    ],
  },
  {
    id: 'grid4',
    name: 'grid',
    fields: [
      { id: 'address', name: 'address', label: 'Address', type: 'text' },
      { id: 'addressEmbedURL', name: 'addressEmbedURL', label: 'Address Embed URL', type: 'url' },
    ],
  },
  { 
    id: 'description', 
    name: 'description', 
    label: 'Description', 
    type: 'textarea' 
  },
  {
    id: 'grid5',
    name: 'grid',
    fields: [
      { id: 'diningStyle', name: 'diningStyle', label: 'Dining Style', type: 'text' },
      { id: 'dressCode', name: 'dressCode', label: 'Dress Code', type: 'text' },
    ],
  },
  {
    id: 'paymentOptions', name: 'paymentOptions', label: 'Payment Options', type: 'select',
  },
  {
    id: 'grid6',
    name: 'grid',
    fields: [
      { id: 'timeZone', name: 'timeZone', label: 'Time Zone', type: 'text' },
      {
        id: 'availabilityStatus', 
        name: 'availabilityStatus', 
        label: 'Availability Status', 
        type: 'select' 
      }
    ],
  },
  { 
    id: 'promoted', 
    name: 'promoted', 
    label: 'Promoted', 
    type: 'checkbox' 
  },
];


export const generalFormSchema = Yup.object().shape({
  restaurantName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  restaurantType: Yup.string().required('This field cannot be empty'),
  contactNumber: Yup.string()
    .max(15, 'Max characters 15 only allowed')
    .required('This field cannot be empty'),
  whatsappNumber: Yup.string().max(15, 'Max characters 15 only allowed'),
  email: Yup.string()
    .email('Invalid email format')
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  website: Yup.string().url('Invalid URL format').max(255, 'Max characters 255 only allowed'),
  address: Yup.string().max(255, 'Max characters 255 only allowed'),
  addressEmbedURL: Yup.string().url('Invalid URL format').max(255, 'Max characters 255 only allowed'),
  description: Yup.string().max(1000, 'Max characters 1000 only allowed'),
  diningStyle: Yup.string().max(255, 'Max characters 255 only allowed'),
  dressCode: Yup.string().max(255, 'Max characters 255 only allowed'),
  paymentOptions: Yup.string().required('This field cannot be empty'),
  timeZone: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
  availabilityStatus: Yup.string().required('This field cannot be empty'),
  promoted: Yup.boolean(),
});

export const generalImageFormField = [
    { 
      id: 'coverUpload', 
      name: 'coverUpload', 
      label: 'Upload Cover', 
      type: 'file' 
    },
  ];

  export const generalImageFormSchema = Yup.object().shape({
    coverUpload: Yup.mixed()
      .required('A cover image is required')
  });