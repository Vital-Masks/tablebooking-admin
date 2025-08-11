import * as Yup from 'yup';

export const automativeField = [
  {
    id: 'notificationType',
    name: 'notificationType',
    label: 'Notification Type',
    type: 'select',
  },
  {
    id: 'notification',
    name: 'notification',
    label: 'Notification',
    type: 'text',
  },
];

export const automativeSchema = Yup.object().shape({
  notificationType: Yup.string()
    .trim()
    .min(2, 'Notification type must be at least 2 characters')
    .max(50, 'Notification type cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/, 'Notification type can only contain letters, numbers, spaces, hyphens, and underscores')
    .required('Notification type is required'),
  
  notification: Yup.string()
    .trim()
    .min(10, 'Notification content must be at least 10 characters')
    .max(500, 'Notification content cannot exceed 500 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,!?()@#$%&*+=<>[\]{}|\\/:;"'`~]+$/, 'Notification content contains invalid characters')
    .required('Notification content is required'),
});

export const customField = [
  {
    id: 'notificationTitle',
    name: 'notificationTitle',
    label: 'Notification Title',
    type: 'select',
  },
  {
    id: 'notification',
    name: 'notification',
    label: 'Notification',
    type: 'text',
  },
  {
    id: 'customersOf',
    name: 'customersOf',
    label: 'Customers Of',
    type: 'select',
  },
  {
    id: 'grid1',
    name: 'grid',
    fields: [
      { id: 'date', name: 'date', label: 'Date', type: 'date' },
      { id: 'time', name: 'time', label: 'Time', type: 'time' },
    ],
  },
];

export const customSchema = Yup.object().shape({
  notificationTitle: Yup.string()
    .trim()
    .min(3, 'Notification title must be at least 3 characters')
    .max(100, 'Notification title cannot exceed 100 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,!?()]+$/, 'Notification title can only contain letters, numbers, spaces, hyphens, underscores, and basic punctuation')
    .required('Notification title is required'),
  
  notification: Yup.string()
    .trim()
    .min(10, 'Notification content must be at least 10 characters')
    .max(500, 'Notification content cannot exceed 500 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,!?()@#$%&*+=<>[\]{}|\\/:;"'`~]+$/, 'Notification content contains invalid characters')
    .required('Notification content is required'),
  
  customersOf: Yup.string()
    .trim()
    .min(1, 'Please select customer groups')
    .required('Customer groups are required'),
  
  date: Yup.date()
    .typeError('Please enter a valid date')
    .min(new Date(), 'Date must be today or in the future')
    .required('Date is required'),
  
  time: Yup.string()
    .trim()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format')
    .required('Time is required'),
});