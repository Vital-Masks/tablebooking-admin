import * as Yup from 'yup';

export const inquiryFormField = [
  
  { id: 'firstname', name: 'firstname', label: 'First name', type: 'text' },
  { id: 'lastname', name: 'lastname', label: 'Last name', type: 'text' },
  { id: 'contactNumber',name: 'contactNumber',label: 'Contact number', type: 'text'},
  { id: 'email', name: 'email', label: 'Email address', type: 'email' },
  { id: 'restaurantName', name: 'restaurantName', label: 'Restaurant Name', type: 'text' },
  { id: 'address', name: 'address', label: 'Address', type: 'text' },
];

export const inquiryFormSchema = {
    firstname: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    lastname: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  contactNumber: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  email: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    restaurantName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    address: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
};
