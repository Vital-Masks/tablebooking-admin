'use client';

import React, { useState } from 'react';
import { IconEye, IconTrash } from '@/components/Icons';

import {
  userroleFormField,
  userroleFormSchema,
} from '@/constants/FormsDataJs/UserRoleForm';
import Button from '@/components/Elements/Button';
import Table from '@/components/Common/Table';
import FormComponent from '@/components/Common/Form';


const UserRolePage = () => {
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

  const handleSubmit = async (values: any) => {
    try {
      console.log('form submit >>>>', values);
      // Add your API call here
      // const result = await createUserRole(values);
      // if (result && result.success) {
      //   return { success: true };
      // } else {
      //   return { success: false };
      // }
      return { success: true }; // Temporary return for now
    } catch (error) {
      console.error('Error creating user role:', error);
      return { success: false };
    }
  };

  return (
    <main>
      <div>
        <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
          <h2 className="text-lg text-black font-bold">User Role</h2>
          <div className="flex items-center gap-2">
            <Button type="outlined" >Export</Button>

            <Button
              onClick={() => setIsCreateForm(!isCreateForm)}
              type="filled"
            >
              Add New Users
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`${isCreateForm ? 'col-span-2' : 'col-span-3'} transition-col-span duration-300`}>
            <Table columns={columns} rowData={rowData} />
          </div>
          {isCreateForm && (
            <FormComponent
              title="Add User Roles"
              fields={userroleFormField}
              initialValues={initialValues}
              validationSchema={userroleFormSchema}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default UserRolePage;
