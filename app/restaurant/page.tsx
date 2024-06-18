'use client';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye } from '@/components/Icons';
import { formatDate } from '@/utils/table';
import Link from 'next/link';
import React from 'react';

const RestaurantPage = () => {
  const rowData = [
    {
      id: 1,
      name: 'Caroline',
      type: 'Jensen',
      phone: '+1 (821) 447-3782',
      email: 'carolinejensen@zidant.com',
      address: '529 Scholes Street',
      subscription: 'Free plan',
      availability: 'Available',
      createdOn: '2004-05-28',
    },
    {
      id: 2,
      name: 'Caroline',
      type: 'Jensen',
      phone: '+1 (821) 447-3782',
      email: 'carolinejensen@zidant.com',
      address: '529 Scholes Street',
      subscription: 'Free plan',
      availability: 'Available',
      createdOn: '2004-05-28',
    },
  ];

  const columns = [
    { accessor: 'name', title: 'Name' },
    { accessor: 'type', title: 'Type' },
    { accessor: 'phone', title: 'Contact No' },
    { accessor: 'email', title: 'Email Address' },
    { accessor: 'address', title: 'Address' },
    { accessor: 'subscription', title: 'Subscription' },
    { accessor: 'availability', title: 'Acailability' },
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
          <h2 className="text-lg text-black font-bold">Restaurants</h2>
          <div className="flex items-center gap-2">
            <Button type="outlined">Export</Button>
            <Link href="restaurant/new">
              <Button type="filled">Create new</Button>
            </Link>
          </div>
        </div>
        <div>
          <div>
            <Table columns={columns} rowData={rowData} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default RestaurantPage;
