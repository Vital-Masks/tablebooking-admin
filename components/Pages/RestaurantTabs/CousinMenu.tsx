'use client';
import { useState } from 'react';

import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye, IconTrash } from '@/components/Icons';

import { formatDate } from '@/utils/table';

import Link from 'next/link';
import { paymentFormField, paymentFormSchema } from '@/constants/FormsDataJs/PaymentForm';
import { foodFormField, foodFormSchema } from '@/constants/FormsDataJs/CuisineForm';

const CousinMenu = () => {
  const [initialValues, setInitialValues] = useState({
    foodName: '',
    category: '',
    price: ''
  });

  const [isCreateForm, setIsCreateForm] = useState(false);

  const rowData = [
    {
      id: 1,
      foodName: 'Cheese burger',
      category: 'American',
      price: '2500 LKR',
    },
    {
      id: 2,
      foodName: 'Fries',
      category: 'American',
      price: '1500 LKR',
    },
  ];

  const columns = [
    { accessor: 'foodName', title: 'Food Name' },
    { accessor: 'category', title: 'Category' },
    { accessor: 'price', title: 'Price' },
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
        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`${isCreateForm ? 'col-span-2' : 'col-span-3'} transition-col-span duration-300`}>
            <Table columns={columns} rowData={rowData} />
          </div>
          {isCreateForm && (
            <FormComponent
              title="Edit Menu"
              fields={foodFormField}
              initialValues={initialValues}
              validationSchema={foodFormSchema}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default CousinMenu