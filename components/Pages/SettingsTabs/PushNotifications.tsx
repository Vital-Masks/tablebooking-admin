import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import IconEye from '@/components/Icons/IconEye';
import { seatingFormField, seatingFormSchema } from '@/constants/FormsDataJs/DiningAreaForm';
import { automativeField, automativeSchema, customField, customSchema } from '@/constants/FormsDataJs/NotificationForm';
import React, { useState } from 'react'
import { date } from 'yup';

const PushNotifications = () => {
    const [initialValues, setInitialValues] = useState({
        notificationType: '',
        notification: '',
        notificationTitle: '',
        customersOf: '',
        date: '',
        time: '',
        status: ''
      });
    
      const [isCreateForm, setIsCreateForm] = useState(false);
      const [isCustomForm, setIsCustomForm] = useState(false);
    
      const rowData = [
        {
          id: 1,
          notificationType: 'Birthday Wish',
          notification: 'Happy Birth Day to u',
        },
        {
            id: 2,
            notificationType: 'Anniversay Wish',
            notification: 'Happy Death day to u',
          },
      ];

      const rowData1 = [
        {
          id: 1,
          notificationTitle: 'Birthday Wish',
          notification: 'Happy Birth Day to u',
          customerOf: 'Shangri La',
          date: '12 May 2024',
          time: '04.00 PM',
          status: 'sent'
        },
        {
            id: 2,
            notificationTitle: 'Anniversay Wish',
            notification: 'Happy Death day to u',
            customerOf: 'Shangri La',
            date: '12 May 2024',
            time: '04.00 PM',
            status: 'sent'
          },
      ];
      const columns1 = [
        { accessor: 'notificationTitle', title: 'Notification Title' },
        { accessor: 'notification', title: 'Notification' },
        { accessor: 'date', title: 'Created/Scheduled' },
        { accessor: 'status', title: 'Status' },
        {
          accessor: 'action',
          title: '',
          titleClassName: '!text-center',
          render: () => (
            <div className="flex items-center gap-4 mx-auto w-max">
              <button onClick={() => setIsCreateForm(!isCreateForm)} >
                <IconEye />
              </button>
            </div>
          ),
        },
      ];
    
      const columns = [
        { accessor: 'notificationType', title: 'Notification Type' },
        { accessor: 'notification', title: 'Notification' },
        {
          accessor: 'action',
          title: '',
          titleClassName: '!text-center',
          render: () => (
            <div className="flex items-center gap-4 mx-auto w-max">
              <button onClick={() => setIsCreateForm(!isCreateForm)} >
                <IconEye />
              </button>
            </div>
          ),
        },
      ];

  return (
    <main>
      <div>
        <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
          <h2 className="text-lg text-black font-bold">Automative Notifications</h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsCreateForm(!isCreateForm)}
              type="filled"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`${isCreateForm ? 'col-span-2' : 'col-span-3'} transition-col-span duration-300`}>
            <Table columns={columns} rowData={rowData} />
          </div>
          
          {isCreateForm && (
            <FormComponent
              title="Create Automative Notification"
              fields={automativeField}
              initialValues={initialValues}
              validationSchema={automativeSchema}
            />
          )}
        </div>

        <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6 mt-5">
          <h2 className="text-lg text-black font-bold">Custom Notifications</h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsCustomForm(!isCustomForm)}
              type="filled"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`${isCustomForm ? 'col-span-2' : 'col-span-3'} transition-col-span duration-300`}>
            <Table columns={columns} rowData={rowData} />
          </div>
          
          {isCustomForm && (
            <FormComponent
              title="Create Custom Notification"
              fields={customField}
              initialValues={initialValues}
              validationSchema={customSchema}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default PushNotifications