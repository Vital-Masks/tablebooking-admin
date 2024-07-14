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
  
  export const customerFormSchema = {
        firstname: Yup.string()
          .max(255, 'Max characters 255 only allowed')
          .required('First Name is required'),
        
        lastname: Yup.string()
          .max(255, 'Max characters 255 only allowed')
          .required('Last Name is required'),
      
        contactNumber: Yup.string()
          .max(255, 'Max characters 255 only allowed')
          .required('Contact Number is required'),
      
        email: Yup.string()
          .email('Invalid email format')
          .max(255, 'Max characters 255 only allowed')
          .required('Email Address is required'),
      
        addressLine1: Yup.string()
          .max(255, 'Max characters 255 only allowed')
          .required('Address Line 1 is required'),
      
        addressLine2: Yup.string()
          .max(255, 'Max characters 255 only allowed'),
      
        city: Yup.string()
          .max(255, 'Max characters 255 only allowed')
          .required('City is required'),
      
        stateOrProvince: Yup.string()
          .max(255, 'Max characters 255 only allowed')
          .required('State/Province is required'),
  };
  