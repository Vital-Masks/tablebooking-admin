'use client';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import { IconEye, IconPencil, IconTrash } from '@/components/Icons';

export default function Home() {
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
      createdOn: '1989-11-19',
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
    { accessor: 'createdOn', title: 'Created on' },
    {
      accessor: 'action',
      title: '',
      titleClassName: '!text-center',
      render: () => (
        <div className="flex items-center gap-4 mx-auto w-max">
          {/* <button>
            <IconPencil />
          </button>
          <button>
            <IconTrash />
          </button> */}
          <button>
            <IconEye />
          </button>
        </div>
      ),
    },
  ];

  return (
    <main className="flex flex-col">
      <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary">
        <h2 className="text-lg text-black font-bold">Restaurants</h2>
        <div className='flex items-center gap-2'>
          <Button type="outlined">
            Export
          </Button>
          <Button type="filled" >
            Create new
          </Button>
        </div>
      </div>
      <Table columns={columns} rowData={rowData} />
    </main>
  );
}
