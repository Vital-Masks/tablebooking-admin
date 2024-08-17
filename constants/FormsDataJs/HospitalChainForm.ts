import * as Yup from 'yup';

export const hospitalChainFormField = [
  {
    id: 'grid1',
    name: 'grid',
    fields: [
      { id: 'chainName', name: 'chainName', label: 'Chain Name', type: 'text' },
      { id: 'address', name: 'address', label: 'Address', type: 'text' },
    ],
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      {
        id: 'registrationNumber',
        name: 'registrationNumber',
        label: 'Registration Number',
        type: 'text',
      },
      {
        id: 'contactNumber',
        name: 'contactNumber',
        label: 'Contact Number',
        type: 'text',
      },
    ],
  },
  {
    id: 'header',
    type: 'header',
    content: 'Contact person details',
  },
  {
    id: 'grid3',
    name: 'grid',
    fields: [
      { id: 'firstName', name: 'firstName', label: 'First Name', type: 'text' },
      { id: 'lastName', name: 'lastName', label: 'Last Name', type: 'text' },
    ],
  },
  {
    id: 'grid4',
    name: 'grid',
    fields: [
      { id: 'email', name: 'email', label: 'Email', type: 'text' },
      {
        id: 'mobileNumber',
        name: 'mobileNumber',
        label: 'Mobile Number',
        type: 'text',
      },
    ],
  },
];

export const hospitalChainFormSchema = Yup.object().shape({
  chainName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  address: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  registrationNumber: Yup.string().required('This field cannot be empty'),
  contactNumber: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  firstName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  lastName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  email: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  mobileNumber: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
});
