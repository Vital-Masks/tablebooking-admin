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
      .max(255, 'Max characters 255 only allowed')
      .required('This field cannot be empty'),
    notification: Yup.string()
      .required('This field cannot be empty'),
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
        .max(255, 'Max characters 255 only allowed')
        .required('This field cannot be empty'),
      notification: Yup.string()
        .required('This field cannot be empty'),
    });