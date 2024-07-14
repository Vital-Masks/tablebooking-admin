'use client';
import { useState } from 'react';

import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye, IconTrash } from '@/components/Icons';

import { formatDate } from '@/utils/table';

import {
    paymentFormField,
    paymentFormSchema,
} from '@/constants/FormsDataJs/PaymentForm';
import Link from 'next/link';

export default function Home() {
  const [initialValues, setInitialValues] = useState({
    from: '',
    paymentreference: '',
    subscription: '',
    amount: '',
    paymentdate: '',
    nextpayment:''
  });

  const [isCreateForm, setIsCreateForm] = useState(false);

  const rowData = [
    {
      id: 1,
      from: 'Shangri La Central',
      paymentreference: '1MNDGFER435456',
      subscription: 'Starter/ Month',
      amount: '5000 LKR',
      paymentDate: '12 May 2024 - 05.00 PM',
      nextpayment: '12 May 2025 - 05.00 PM',
      createdOn: '2004-05-28',
    },
    {
      id: 2,
      from: 'Shangri La Central',
      paymentreference: '1MNDGFER435456',
      subscription: 'Starter/ Month',
      amount: '5000 LKR',
      paymentDate: '12 May 2024 - 05.00 PM',
      nextpayment: '12 May 2025 - 05.00 PM',
      createdOn: '2004-05-28',
    },
  ];

  const columns = [
    { accessor: 'from', title: 'From' },
    { accessor: 'paymentreference', title: 'Payment Reference' },
    { accessor: 'subscription', title: 'Subscription Type' },
    { accessor: 'amount', title: 'Amount' },
    { accessor: 'paymentDate', title: 'Payment Date' },
    { accessor: 'nextpayment', title: 'Next Payment' },
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
          <h2 className="text-lg text-black font-bold">Payments</h2>
          <div className="flex items-center gap-2">
            <Button type="outlined">Export</Button>
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`${isCreateForm ? 'col-span-2' : 'col-span-3'} transition-col-span duration-300`}>
            <Table columns={columns} rowData={rowData} />
          </div>
          {isCreateForm && (
            <FormComponent
              title="Payment"
              fields={paymentFormField}
              initialValues={initialValues}
              validationSchema={paymentFormSchema}
            />
          )}
        </div>
      </div>
    </main>
  );
}
