'use client';
import React, { useState } from 'react';
import { IconEye, IconTrash } from '@/components/Icons';

import {
  userroleFormField,
  userroleFormSchema,
} from '@/constants/FormsDataJs/UserRoleForm';
import Button from '@/components/Elements/Button';
import Link from 'next/link';
import Table from '@/components/Common/Table';
import FormComponent from '@/components/Common/Form';

const UserRoles = () => {
  const [initialValues, setInitialValues] = useState({
    firstname: '',
    lastname: '',
    role: '',
    contactNumber: '',
    email: '',
    gender: '',
  });
  const [isCreateForm, setIsCreateForm] = useState(false);

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
        <div className="grid grid-cols-5 items-start gap-5">
          <div
            className={`${
              isCreateForm ? 'col-span-3' : 'col-span-5'
            } transition-col-span duration-300`}
          >
            <Table
              columns={columns}
              rowData={rowData}
              onButtonClick={() => setIsCreateForm(!isCreateForm)}
            />
          </div>
          {isCreateForm && (
            <div className=" col-span-2">
              <FormComponent
                title="Add User Roles"
                fields={userroleFormField}
                initialValues={initialValues}
                validationSchema={userroleFormSchema}
                handleSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserRoles;
