import * as Yup from 'yup';

export const userroleFormField = [
  { id: 'firstName', name: 'firstName', label: 'First name', type: 'text' },
  { id: 'lastName', name: 'lastName', label: 'Last name', type: 'text' },
  { id: 'role', name: 'role', label: 'Role/Designation', type: 'text' },
  { id: 'email', name: 'email', label: 'Email address', type: 'email' },
  { id: 'gender', name: 'gender', label: 'Gender', type: 'select' },
  {
    id: 'phoneNumber',
    name: 'phoneNumber',
    label: 'Mobile Number',
    type: 'text',
  },
  // { id: 'temporaryPassword', name: 'temporaryPassword', label: 'Temporary Password', type: 'text' },
  // {
  //   id: 'profileImage',
  //   name: 'profileImage',
  //   label: 'Profile Image',
  //   type: 'file',
  // },
];

export const userroleFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  lastName: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  phoneNumber: Yup.string()
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
  // temporaryPassword: Yup.string()
  // .max(255, 'Max characters 255 only allowed')
  // .required('This field cannot be empty'),
});
