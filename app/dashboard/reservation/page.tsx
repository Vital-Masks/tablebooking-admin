'use client';
import { useState } from 'react';

import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye, IconTrash } from '@/components/Icons';

import { formatDate } from '@/utils/table';

import {
    tableReservationFormField,
  tableReservationFormSchema,
} from '@/constants/FormsDataJs/TableReservationForm';
import Link from 'next/link';

export default function Home() {
  const [initialValues, setInitialValues] = useState({
    date: '',
    time: '',
    fullname: '',
    contactNumber: '',
    email: '',
    restaurant:'',
    reservedfor:'',
    pax:'',
    diningarea:'',
    occasion:'',
    specialnote:'',
    tableno:'',
    status:''
  });

  const [isCreateForm, setIsCreateForm] = useState(false);

  const rowData = [
    {
      id: 1,
      fullname: 'Vethakulan Anandakumar',
      contact: '+1 (821) 447-3782',
      restaurant: 'Shnagri La',
      reservedfor: 'Lunch Buffet',
      date: '12 May 2024',
      time: '12.00 PM',
      pax: '06',
      diningarea: 'Private Indoor',
      status: 'confirmed',
      table: '04 A',
      createdOn: '2004-05-28',
    },
    {
        id: 2,
        fullname: 'Vethakulan Anandakumar',
        contact: '+1 (821) 447-3782',
        restaurant: 'Shnagri La',
        reservedfor: 'Lunch Buffet',
        date: '12 May 2024',
        time: '12.00 PM',
        pax: '06',
        diningarea: 'Private Indoor',
        status: 'confirmed',
        table: '04 A',
        createdOn: '2004-05-28',
      },
  ];

  const columns = [
    { accessor: 'fullname', title: 'Full Name' },
    { accessor: 'contact', title: 'Contact No' },
    { accessor: 'restaurant', title: 'Restaurant' },
    { accessor: 'reservedfor', title: 'Reserved For' },
    { accessor: 'date', title: 'Date' },
    { accessor: 'time', title: 'Time' },
    { accessor: 'pax', title: 'Pax' },
    { accessor: 'diningarea', title: 'Dining Area' },
    { accessor: 'status', title: 'Status' },
    { accessor: 'table', title: 'Table' },
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
          <h2 className="text-lg text-black font-bold">Reservations</h2>
          <div className="flex items-center gap-2">
            <Button type="outlined">Export</Button>
            <Button onClick={() => setIsCreateForm(!isCreateForm)} type="filled">Add New Reservation</Button>
            
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`${isCreateForm ? 'col-span-2' : 'col-span-3'} transition-col-span duration-300`}>
            <Table columns={columns} rowData={rowData} />
          </div>
          {isCreateForm && (
            <FormComponent
              title="Make a Reservation"
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
