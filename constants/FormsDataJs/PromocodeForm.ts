import * as Yup from 'yup';

export const promoFormField = [
 
{ id: 'promocodeFor', name: 'promocodeFor', label: 'Promocode for', type: 'select', options:[] },
{ id: 'promocode', name: 'promocode', label: 'Promocode', type: 'text' },
  {
    id: 'grid1',
    name: 'grid',
    fields: [
      { id: 'valuePercentage', name: 'valuePercentage', label: 'Percentage', type: 'number' },
    ],
  },
  {
    id: 'grid2',
    name: 'grid',
    fields: [
      { id: 'validFromDate', name: 'validFromDate', label: 'Valid from Date', type: 'date' },
      { id: 'validFromTime', name: 'validFromTime', label: 'Valid from Time', type: 'time' },
    ],
  },
  {
    id: 'grid3',
    name: 'grid',
    fields: [
      { id: 'validTillDate', name: 'validTillDate', label: 'Valid till Date', type: 'date' },
      { id: 'validTillTime', name: 'validTillTime', label: 'Valid till Time', type: 'time' },
    ],
  },
  {
    id: 'availabilityStatus',
    name: 'availabilityStatus',
    label: 'Availability Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ],
  },
];

export const promoFormSchema = Yup.object().shape({
  promocodeFor: Yup.string().required('This field cannot be empty'),
  promocode: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
    valuePercentage: Yup.number()
    .positive('Percentage must be positive')
    .required('This field cannot be empty'),
  validFromDate: Yup.date().required('This field cannot be empty'),
  validFromTime: Yup.string().required('This field cannot be empty'),
  validTillDate: Yup.date().required('This field cannot be empty'),
  validTillTime: Yup.string().required('This field cannot be empty'),
  availabilityStatus: Yup.string().required('This field cannot be empty'),
});
