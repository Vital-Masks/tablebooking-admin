import * as Yup from 'yup';

// Updated form field structure for payments
export const paymentFormField = [
  { id: 'from', name: 'from', label: 'From', type: 'text' },
  { id: 'paymentreference', name: 'paymentreference', label: 'Payment Reference', type: 'text' },
//   { id: 'subscription', name: 'subscription', label: 'Subscription Type', type: 'text' },
  { id: 'amount', name: 'amount', label: 'Amount', type: 'text' },
  { id: 'paymentdate', name: 'paymentdate', label: 'Payment Date', type: 'text' },
  { id: 'nextpayment', name: 'nextpayment', label: 'Next Payment Date', type: 'text' },
];

// Updated validation schema for payments
export const paymentFormSchema = {
  from: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
//   paymentreference: Yup.string()
//     .max(255, 'Max characters 255 only allowed')
//     .required('This field cannot be empty'),
  subscription: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  amount: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  paymentdate: Yup.string()
    .max(255, 'Max characters 255 only allowed')
    .required('This field cannot be empty'),
  nextpayment: Yup.string()
    .max(255, 'Max characters 255 only allowed'),
};
