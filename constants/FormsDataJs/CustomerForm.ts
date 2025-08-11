import * as Yup from 'yup';

// Updated form field structure
export const customerFormField = [
    { id: 'firstname', name: 'firstname', label: 'First Name', type: 'text' },
    { id: 'lastname', name: 'lastname', label: 'Last Name', type: 'text' },
    {
      id: 'contactNumber',
      name: 'contactNumber',
      label: 'Contact number',
      type: 'text',
    },
    { id: 'email', name: 'email', label: 'Email address', type: 'email' },
    {
        id: 'addressLine1',
        name: 'addressLine1',
        label: 'Address Line 1',
        type: 'text'
      },
      {
        id: 'addressLine2',
        name: 'addressLine2',
        label: 'Address Line 2',
        type: 'text'
      },
      {
        id: 'city',
        name: 'city',
        label: 'City',
        type: 'text'
      },
      {
        id: 'stateOrProvince',
        name: 'stateOrProvince',
        label: 'State/Province',
        type: 'text'
      },
  ];
  
  export const customerFormSchema = Yup.object().shape({
        firstname: Yup.string()
          .trim()
          .min(2, 'First name must be at least 2 characters')
          .max(50, 'First name cannot exceed 50 characters')
          .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
          .required('First name is required'),
        
        lastname: Yup.string()
          .trim()
          .min(2, 'Last name must be at least 2 characters')
          .max(50, 'Last name cannot exceed 50 characters')
          .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
          .required('Last name is required'),
      
        contactNumber: Yup.string()
          .trim()
          .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid contact number')
          .min(10, 'Contact number must be at least 10 digits')
          .max(15, 'Contact number cannot exceed 15 digits')
          .required('Contact number is required'),
      
        email: Yup.string()
          .trim()
          .email('Please enter a valid email address')
          .max(255, 'Email cannot exceed 255 characters')
          .required('Email address is required'),
      
        addressLine1: Yup.string()
          .trim()
          .min(5, 'Address line 1 must be at least 5 characters')
          .max(255, 'Address line 1 cannot exceed 255 characters')
          .matches(/^[a-zA-Z0-9\s\-_.,#()]+$/, 'Address line 1 contains invalid characters')
          .required('Address line 1 is required'),
      
        addressLine2: Yup.string()
          .trim()
          .max(255, 'Address line 2 cannot exceed 255 characters')
          .matches(/^[a-zA-Z0-9\s\-_.,#()]*$/, 'Address line 2 contains invalid characters'),
      
        city: Yup.string()
          .trim()
          .min(2, 'City must be at least 2 characters')
          .max(100, 'City cannot exceed 100 characters')
          .matches(/^[a-zA-Z\s\-_.,()]+$/, 'City can only contain letters, spaces, hyphens, underscores, and basic punctuation')
          .required('City is required'),
      
        stateOrProvince: Yup.string()
          .trim()
          .min(2, 'State/Province must be at least 2 characters')
          .max(100, 'State/Province cannot exceed 100 characters')
          .matches(/^[a-zA-Z\s\-_.,()]+$/, 'State/Province can only contain letters, spaces, hyphens, underscores, and basic punctuation')
          .required('State/Province is required'),
  });
  