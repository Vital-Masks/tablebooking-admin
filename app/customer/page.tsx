'use client';
import { useState } from 'react';

import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye, IconTrash } from '@/components/Icons';

import { formatDate } from '@/utils/table';

import {
    customerFormField,
    customerFormSchema,
} from '@/constants/FormsDataJs/CustomerForm';
import Link from 'next/link';

export default function Home() {
  const [initialValues, setInitialValues] = useState({
    fullname: '',
    contactno: '',
    emailaddress: '',
    latestreservation: ''
  });

  const rowData = [
    {
      id: 1,
      fullname: 'Vethakulan Ananthakumar',
      contactno: '0712345678',
      emailaddress: 'johndoe@gmail.com',
      latestreservation: 'International Buffet'
    },
    {
      id: 2,
      fullname: 'Vethakulan Ananthakumar',
      contactno: '0712345678',
      emailaddress: 'johndoe@gmail.com',
      latestreservation: 'International Buffet'
    },
  ];

  const columns = [
    { accessor: 'fullname', title: 'Full Name' },
    { accessor: 'contactno', title: 'Contact No' },
    { accessor: 'emailaddress', title: 'E-Mail Address' },
    { accessor: 'latestreservation', title: 'Latest Reservation' },
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
        </div>
      ),
    },
  ];

  return (
    <main>
      <div>
        <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
          <h2 className="text-lg text-black font-bold">Customers</h2>
          <div className="flex items-center gap-2">
            <Button type="outlined">Export</Button>
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className="col-span-2">
            <Table columns={columns} rowData={rowData} />
          </div>
          <FormComponent
            title="Customer"
            fields={customerFormField}
            initialValues={initialValues}
            validationSchema={customerFormSchema}
          />
        </div>
      </div>
    </main>
  );
}
