'use client';
import { useState } from 'react';

import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye, IconTrash } from '@/components/Icons';

import { formatDate } from '@/lib/utils';

import AnalyticsCard from '@/components/Elements/AnalyticsCard';
import { tableReservationFormField, tableReservationFormSchema } from '@/constants/FormsDataJs/TableReservationForm';

export default function DashboardContent() {
  const [isForm, setIsForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    date: '',
    time: '',
    fullname: '',
    contactNumber: '',
    email: '',
  });

  const rowData = [
    {
      id: 1,
      name: 'Caroline',
      type: 'Jensen',
      phone: '+1 (821) 447-3782',
      email: 'carolinejensen@zidant.com',
      address: '529 Scholes Street',
      subscription: 'Free plan',
      availability: 'Available',
      createdOn: '2004-05-28',
    },
    {
      id: 2,
      name: 'Caroline',
      type: 'Jensen',
      phone: '+1 (821) 447-3782',
      email: 'carolinejensen@zidant.com',
      address: '529 Scholes Street',
      subscription: 'Free plan',
      availability: 'Available',
      createdOn: '2004-05-28',
    },
  ];

  const columns = [
    { accessor: 'name', title: 'Name' },
    { accessor: 'type', title: 'Type' },
    { accessor: 'phone', title: 'Contact No' },
    { accessor: 'email', title: 'Email Address' },
    { accessor: 'address', title: 'Address' },
    { accessor: 'subscription', title: 'Subscription' },
    { accessor: 'availability', title: 'Acailability' },
    {
      accessor: 'createdOn',
      title: 'Created on',
      render: ({ createdOn }: any) => <div>{formatDate(createdOn)}</div>,
    },
    {
      accessor: 'action',
      title: '',
      titleClassName: '!text-center',
      render: () => (
        <div className="flex items-center gap-4 mx-auto w-max">
          <button>
            <IconEye />
          </button>
          <button>
            <IconTrash />
          </button>
        </div>
      ),
    },
  ];

  const handleSubmit = (values: any) => {
    console.log('form submit >>>>', values);
  };

  return (
    <main>
      <div>
        <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
          <h2 className="text-lg text-black font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button type="outlined">Export</Button>
            <Button type="filled" onClick={() => setIsForm(!isForm)}>
              {isForm ? 'Close Form' : ' Make Reservation'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`${isForm ? 'col-span-2' : 'col-span-3'}`}>
            <div className="grid grid-cols-3 mb-5 gap-5">
              <AnalyticsCard />
              <AnalyticsCard />
              <AnalyticsCard />
            </div>
            <Table columns={columns} rowData={rowData} />
          </div>
          {isForm && (
            <FormComponent
              title="Make a reservation"
              fields={tableReservationFormField}
              initialValues={initialValues}
              validationSchema={tableReservationFormSchema}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </main>
  );
}
