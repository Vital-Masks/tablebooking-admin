import * as Yup from 'yup';

export const userroleFormField = [
  
  { id: 'firstname', name: 'firstname', label: 'First name', type: 'text' },
  { id: 'lastname', name: 'lastname', label: 'Last name', type: 'text' },
  { id: 'role', name: 'role', label: 'Role/Designation', type: 'text' },
  { id: 'email', name: 'email', label: 'Email address', type: 'email' },
  { id: 'gender', name: 'gender', label: 'Gender', type: 'select' },
  { id: 'contactNumber',name: 'contactNumber',label: 'Mobile Number', type: 'text'},
  { id: 'temporaryPassword', name: 'temporaryPassword', label: 'Temporary Password', type: 'text' },
  {
    id: 'profileImage',
    name: 'profileImage',
    label: 'Profile Image',
    type: 'file',
  },
];

export const userroleFormSchema = {
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
    gender: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    role: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    temporaryPassword: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
};
