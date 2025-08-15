import * as Yup from 'yup';

const VALIDATION_PATTERNS = {
  NAME_REGEX: /^[a-zA-Z\s'-]+$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/,
  TABLE_NO_REGEX: /^[a-zA-Z0-9\s\-_]+$/,
  NO_LEADING_SPACE: /^\S.*$/,
  TIME_REGEX: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
} as const;

const VALIDATION_LIMITS = {
  NAME: { min: 2, max: 50 },
  EMAIL: { min: 5, max: 100 },
  PHONE: { max: 20 },
  TABLE_NO: { min: 1, max: 20 },
  OCCASION: { min: 2, max: 50 },
  SPECIAL_REQUEST: { min: 3, max: 500 },
  PROMO_CODE: { min: 3, max: 20 },
  REASON: { min: 3, max: 500 },
  GUEST_SIZE: { min: 1, max: 100 },
} as const;

const createPhoneValidation = () => {
  return Yup.string()
    .trim()
    .matches(
      VALIDATION_PATTERNS.NO_LEADING_SPACE,
      "Contact number cannot start with a space"
    )
    .matches(
      VALIDATION_PATTERNS.PHONE_REGEX,
      "Please enter a valid contact number"
    )
    .max(
      VALIDATION_LIMITS.PHONE.max,
      `Contact number cannot exceed ${VALIDATION_LIMITS.PHONE.max} characters`
    )
    .required("Contact number is required");
};

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
  {
    id: 'grid5',
    name: 'grid',
    fields: [
      { id: 'password', name: 'password', label: 'Password', type: 'text' },
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
    .matches(/^[\+]?[0-9]{10,15}$/, 'Please enter a valid contact number')
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
    .matches(/^[\+]?[0-9]{10,15}$/, 'Please enter a valid contact number')
    .min(10, 'Mobile number must be at least 10 digits')
    .max(15, 'Mobile number cannot exceed 15 digits')
    .required('Mobile number is required'),

  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(255, 'Password cannot exceed 255 characters')
    .required('Password is required'),
});
