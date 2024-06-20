'use client';
import { useState } from 'react';

import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye, IconTrash } from '@/components/Icons';

import { formatDate } from '@/utils/table';

import {
  userroleFormField,
  userroleFormSchema,
} from '@/constants/FormsDataJs/UserRoleForm';
import Link from 'next/link';

export default function UserRoles() {
  const [initialValues, setInitialValues] = useState({
    firstname: '',
    lastname: '',
    role: '',
    contactNumber: '',
    email: '',
    gender:'',
  });

  const rowData = [
    {
      id: 1,
      firstname: 'Caroline',
      lastname: 'Jensen',
      role: 'user',
      email: 'carolinejensen@zidant.com',
      contactNumber: '+1 (821) 447-3782',
      gender: 'Male',
      
      
    },
    {
      id: 2,
      firstname: 'Caroline',
      lastname: 'Jensen',
      role: 'user',
      email: 'carolinejensen@zidant.com',
      contactNumber: '+1 (821) 447-3782',
      gender: 'Female',
      
      
    },
  ];

  const columns = [
    { accessor: 'firstname', title: 'First Name' },
    { accessor: 'lastname', title: 'Last Name' },
    { accessor: 'contactNumber', title: 'Contact No' },
    { accessor: 'email', title: 'Email Address' },
    { accessor: 'gender', title: 'Gender' },
    { accessor: 'role', title: 'Role' },
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
          <h2 className="text-lg text-black font-bold">User Role</h2>
          <div className="flex items-center gap-2">
            <Button type="outlined">Export</Button>
            <Link href="restaurant/new">
              <Button type="filled">Add New Users</Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className="col-span-2">
            <Table columns={columns} rowData={rowData} />
          </div>
          <FormComponent
            title="Add User Roles"
            fields={userroleFormField}
            initialValues={initialValues}
            validationSchema={userroleFormSchema}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
}
