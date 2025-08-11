import * as Yup from 'yup';

export const customNotificationFormField = [
  {
    id: 'notificationTitle',
    name: 'notificationTitle',
    label: 'Notification Title',
    type: 'text',
  },
  {
    id: 'notification',
    name: 'notification',
    label: 'Notification',
    type: 'textarea',
  },
  {
    id: 'customersOf',
    name: 'customersOf',
    label: 'Customers of',
    type: 'select',
    options: [],
    isMulti: true,
  },
  {
    id: 'date',
    name: 'date',
    label: 'Date',
    type: 'calendar',
    hasTime: false,
  },
  {
    id: 'time',
    name: 'time',
    label: 'Time',
    type: 'time',
  },
];

export const customNotificationFormSchema = Yup.object().shape({
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
  
  customersOf: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please select at least one customer group')
    .required('Please select customer groups'),
  
  date: Yup.string()
    .required('Date is required')
    .test('is-future-date', 'Date must be in the future', function(value) {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
  
  time: Yup.string()
    .required('Time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format'),
});

export const autoNotificationFormField = [
  {
    id: 'automativeNotificationType',
    name: 'automativeNotificationType',
    label: 'Automative Notification Type',
    type: 'select',
  },
  {
    id: 'notification',
    name: 'notification',
    label: 'Notification',
    type: 'textarea',
  },
  {
    id: 'restaurantIds',
    name: 'restaurantIds',
    label: 'Customers of',
    type: 'select',
    options: [],
    isMulti: true,
  },
];

export const autoNotificationFormSchema = Yup.object().shape({
  automativeNotificationType: Yup.string()
    .trim()
    .min(3, 'Notification type must be at least 3 characters')
    .max(50, 'Notification type cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/, 'Notification type can only contain letters, numbers, spaces, hyphens, and underscores')
    .required('Notification type is required'),
  
  notification: Yup.string()
    .trim()
    .min(10, 'Notification content must be at least 10 characters')
    .max(500, 'Notification content cannot exceed 500 characters')
    .matches(/^[a-zA-Z0-9\s\-_.,!?()@#$%&*+=<>[\]{}|\\/:;"'`~]+$/, 'Notification content contains invalid characters')
    .required('Notification content is required'),
  
  restaurantIds: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please select at least one restaurant')
    .required('Please select restaurants'),
});
