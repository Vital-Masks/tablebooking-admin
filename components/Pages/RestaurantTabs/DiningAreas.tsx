'use client';
import { useState } from 'react';

import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye, IconTrash } from '@/components/Icons';

import { formatDate } from '@/utils/table';

import Link from 'next/link';
import { paymentFormField, paymentFormSchema } from '@/constants/FormsDataJs/PaymentForm';
import { seatingFormField, seatingFormSchema } from '@/constants/FormsDataJs/DiningAreaForm';

const DiningAreas = () => {
    const [initialValues, setInitialValues] = useState({
        sectionName: '',
        maximumSeats: '',
        seatingAreaType: ''
      });
    
      const [isCreateForm, setIsCreateForm] = useState(false);
    
      const rowData = [
        {
          id: 1,
          sectionName: 'Room 1',
          maximumSeats: '4 seats',
          seatingAreaType: 'Common Indoor',
        },
        {
          id: 2,
          sectionName: 'Room 2',
          maximumSeats: '5 seats',
          seatingAreaType: 'Common Indoor',
        },
      ];
    
      const columns = [
        { accessor: 'sectionName', title: 'Section Name' },
        { accessor: 'maximumSeats', title: 'Max Seat Count' },
        { accessor: 'seatingAreaType', title: 'Seating Area Type' },
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
              title="Payment"
              fields={seatingFormField}
              initialValues={initialValues}
              validationSchema={seatingFormSchema}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default DiningAreas
