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
    .trim()
    .min(2, 'Chain name must be at least 2 characters')
    .max(255, 'Chain name cannot exceed 255 characters')
    .matches(/^[a-zA-Z0-9\s\-&.()]+$/, 'Chain name can only contain letters, numbers, spaces, hyphens, ampersands, and parentheses')
    .required('Chain name is required'),
  
  address: Yup.string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(255, 'Address cannot exceed 255 characters')
    .required('Address is required'),
  
  registrationNumber: Yup.string()
    .trim()
    .min(3, 'Registration number must be at least 3 characters')
    .max(50, 'Registration number cannot exceed 50 characters')
    .matches(/^[A-Z0-9\-_]+$/, 'Registration number can only contain uppercase letters, numbers, hyphens, and underscores')
    .required('Registration number is required'),
  
  contactNumber: Yup.string()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid contact number')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number cannot exceed 15 digits')
    .required('Contact number is required'),
  
  firstName: Yup.string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
    .required('First name is required'),
  
  lastName: Yup.string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
    .required('Last name is required'),
  
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email cannot exceed 255 characters')
    .required('Email is required'),
  
  mobileNumber: Yup.string()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid mobile number')
    .min(10, 'Mobile number must be at least 10 digits')
    .max(15, 'Mobile number cannot exceed 15 digits')
    .required('Mobile number is required'),
});
