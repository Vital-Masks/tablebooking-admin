'use client';
import { useState } from 'react';

import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye, IconTrash } from '@/components/Icons';

import { formatDate } from '@/utils/table';

import Link from 'next/link';
import {
  paymentFormField,
  paymentFormSchema,
} from '@/constants/FormsDataJs/PaymentForm';
import {
  seatingFormField,
  seatingFormSchema,
} from '@/constants/FormsDataJs/DiningAreaForm';
import {
  diningFormField,
  diningFormSchema,
} from '@/constants/FormsDataJs/DiningTimingForm';

const DiningTimings = () => {
  const [initialValues, setInitialValues] = useState({
    diningName: '',
    dates: '',
    dateRange: '',
    timeRange: '',
    pricePP: '',
    availability: '',
  });

  const [isCreateForm, setIsCreateForm] = useState(false);

  const rowData = [
    {
      id: 1,
      diningName: 'International Lunch Buffet',
      dates: 'Custom Dates',
      dateRange: '03 Mar 24 - 06 Mar 24',
      timeRange: '12.00 PM - 03.00 PM',
      pricePP: '3567.00 LKR',
      availability: 'Available',
    },
    {
      id: 2,
      diningName: 'International Brunch Buffet',
      dates: 'Custom Dates',
      dateRange: '07 Mar 24 - 08 Mar 24',
      timeRange: '11.00 PM - 02.00 PM',
      pricePP: '3567.00 LKR',
      availability: 'Available',
    },
  ];

  const columns = [
    { accessor: 'diningName', title: 'Dining/ Buffet Name' },
    { accessor: 'dates', title: 'Dates' },
    { accessor: 'dateRange', title: 'Dates between' },
    { accessor: 'timeRange', title: 'Time between' },
    { accessor: 'pricePP', title: 'Price PP' },
    { accessor: 'availability', title: 'Availability' },
    {
      accessor: 'action',
      title: '',
      titleClassName: '!text-center',
      render: () => (
        <div className="flex items-center gap-4 mx-auto w-max">
          <button onClick={() => setIsCreateForm(!isCreateForm)}>
            <IconEye />
          </button>
          {/* <button onClick={() => console.log('Share action')}>
                <IconShare />
              </button> */}
        </div>
      ),
    },
  ];

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
            <div className="col-span-2">
              <FormComponent
                title="Add Dining Timings"
                fields={diningFormField}
                initialValues={initialValues}
                validationSchema={diningFormSchema}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DiningTimings;
