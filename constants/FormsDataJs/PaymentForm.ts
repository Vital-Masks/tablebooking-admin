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
export const paymentFormSchema = Yup.object().shape({
  from: Yup.string()
    .trim()
    .min(2, 'From field must be at least 2 characters')
    .max(100, 'From field cannot exceed 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,@]+$/, 'From field contains invalid characters')
    .required('From field is required'),
  
  paymentreference: Yup.string()
    .trim()
    .min(3, 'Payment reference must be at least 3 characters')
    .max(50, 'Payment reference cannot exceed 50 characters')
    .matches(/^[A-Z0-9\-_]+$/, 'Payment reference can only contain uppercase letters, numbers, hyphens, and underscores')
    .required('Payment reference is required'),
  
  subscription: Yup.string()
    .trim()
    .min(2, 'Subscription type must be at least 2 characters')
    .max(50, 'Subscription type cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/, 'Subscription type can only contain letters, numbers, spaces, hyphens, and underscores')
    .required('Subscription type is required'),
  
  amount: Yup.string()
    .trim()
    .matches(/^\d+(\.\d{1,2})?$/, 'Please enter a valid amount (e.g., 100.50)')
    .test('positive-amount', 'Amount must be greater than 0', function(value) {
      if (!value) return false;
      const numValue = parseFloat(value);
      return numValue > 0;
    })
    .required('Amount is required'),
  
  paymentdate: Yup.string()
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date in YYYY-MM-DD format')
    .test('valid-date', 'Please enter a valid date', function(value) {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .required('Payment date is required'),
  
  nextpayment: Yup.string()
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date in YYYY-MM-DD format')
    .test('valid-date', 'Please enter a valid date', function(value) {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .test('future-date', 'Next payment date must be in the future', function(value) {
      if (!value) return true; // Optional field
      const nextPaymentDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return nextPaymentDate > today;
    }),
});
