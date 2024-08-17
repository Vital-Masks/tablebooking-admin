import React, { useState } from 'react';
import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import IconEye from '@/components/Icons/IconEye';
import {
  automativeField,
  automativeSchema,
  customField,
  customSchema,
} from '@/constants/FormsDataJs/NotificationForm';

const PushNotifications = () => {
  const [initialValues, setInitialValues] = useState({
    notificationType: '',
    notification: '',
    notificationTitle: '',
    customersOf: '',
    date: '',
    time: '',
    status: '',
  });
  const [currentForm, setCurrentForm] = useState<any>([]);
  const [currentFormSchema, setCurrentFormSchema] = useState<any>([]);
  const [currentFormTitle, setCurrentFormTitle] = useState('');

  const [isCreateForm, setIsCreateForm] = useState(false);

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

  const columns = [
    { accessor: 'notificationType', title: 'Notification Type' },
    { accessor: 'notification', title: 'Notification' },
    {
      accessor: 'action',
      title: '',
      titleClassName: '!text-center',
      render: () => (
        <div className="flex items-center gap-4 mx-auto w-max">
          <button onClick={() => setIsCreateForm(!isCreateForm)}>
            <IconEye />
          </button>
        </div>
      ),
    },
  ];

  return (
    <main>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 items-start gap-5">
          <div
            className={`${
              currentForm[0] ? 'col-span-2' : 'col-span-3'
            } transition-col-span duration-300`}
          >
            {/* <h2 className="text-lg text-black font-bold">
              Custom Notifications
            </h2> */}
            <div className="flex flex-col gap-5">
              <Table
                title="Custom Notifications"
                columns={columns}
                rowData={rowData}
                onButtonClick={() => {
                  setCurrentForm(automativeField);
                  setCurrentFormSchema(automativeSchema);
                  setCurrentFormTitle('Create Custom Notification')
                }}
              />

              <Table
                title="Automative Notifications"
                columns={columns}
                rowData={rowData}
                onButtonClick={() => {
                  setCurrentForm(customField);
                  setCurrentFormSchema(customSchema);
                  setCurrentFormTitle('Create Automative Notification')
                }}
              />
            </div>
          </div>

          {currentForm[0] && (
            <FormComponent
              title={currentFormTitle}
              fields={currentForm.length > 0 && currentForm}
              initialValues={initialValues}
              validationSchema={
                currentFormSchema.length > 0 && currentFormSchema
              }
              closeForm={() => {
                setCurrentForm([])
                setCurrentFormSchema([])
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default PushNotifications;
