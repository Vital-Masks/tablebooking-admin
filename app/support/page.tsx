'use client';
import React, { useState } from 'react';
import { IconEye, IconTrash } from '@/components/Icons';

import Button from '@/components/Elements/Button';
import Link from 'next/link';
import Table from '@/components/Common/Table';
import FormComponent from '@/components/Common/Form';
import { inquiryFormField, inquiryFormSchema } from '@/constants/FormsDataJs/inquiry';


const inquiryPage = () => {
  const [initialValues, setInitialValues] = useState({
    firstname: '',
    lastname: '',
    companyName: '',
    contactNumber: '',
    email: '',
    status: '',
  });
  const [isCreateForm, setIsCreateForm] = useState(false);

  const rowData = [
    {
      id: 1,
      firstname: 'Caroline',
      lastname: 'Jensen',
      restaurantName: 'user',
      email: 'carolinejensen@zidant.com',
      contactNumber: '+1 (821) 447-3782',
      address: 'Solved',
    },
    {
      id: 2,
      firstname: 'Caroline',
      lastname: 'Jensen',
      restaurantName: 'user',
      email: 'carolinejensen@zidant.com',
      contactNumber: '+1 (821) 447-3782',
      address: 'Unsolved',
    },
  ];

  const columns = [
    { accessor: 'firstname', title: 'First Name' },
    { accessor: 'lastname', title: 'Last Name' },
    { accessor: 'contactNumber', title: 'Contact No' },
    { accessor: 'email', title: 'Email Address' },
    { accessor: 'restaurantName', title: 'Restaurant Name' },
    { accessor: 'address', title: 'Address' },
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
          <h2 className="text-lg text-black font-bold">Support</h2>
          <div className="flex items-center gap-2">
            <Button type="outlined">Export</Button>
            <Button
              onClick={() => setIsCreateForm(!isCreateForm)}
              type="filled"
            >
              Inquiry
            </Button>

            
          </div>
        </div>
        <div className="flex items-center p-2 justify-between text-primary mb-2">
          <h2 className="text-lg text-black">Inquiries</h2>
          </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`${isCreateForm ? 'col-span-2' : 'col-span-3'} transition-col-span duration-300`}>
            <Table columns={columns} rowData={rowData} />
          </div>
          {isCreateForm && (
            <FormComponent
              title="Inquiry"
              fields={inquiryFormField}
              initialValues={initialValues}
              validationSchema={inquiryFormSchema}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default inquiryPage;
