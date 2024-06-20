import * as Yup from 'yup';

export const userroleFormField = [
  
  { id: 'firstname', name: 'firstname', label: 'First name', type: 'text' },
  { id: 'lastname', name: 'lastname', label: 'Last name', type: 'text' },
  { id: 'contactNumber',name: 'contactNumber',label: 'Contact number', type: 'text'},
  { id: 'email', name: 'email', label: 'Email address', type: 'email' },
  { id: 'gender', name: 'gender', label: 'Gender', type: 'text' },
  { id: 'role', name: 'role', label: 'Role/Designation', type: 'text' },
];

export const userroleFormSchema = {
    firstname: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    lastname: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  fullname: Yup.string().required('This field cannot be empty'),
  contactNumber: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  email: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    gender: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    role: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
};
