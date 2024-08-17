'use client';

import { IconEye } from '@/components/Icons';
import { ROUTE_HOSPITAL_CHAIN, ROUTE_RESTAURANTS } from '@/constants/routes';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export const columns = [
  { accessor: 'chainName', title: 'Chain Name' },
  { accessor: 'address', title: 'Address' },
  { accessor: 'registrationNumber', title: 'Reg No' },
  { accessor: 'contactNumber', title: 'Contact No' },
  { accessor: 'firstName', title: 'First Name' },
  { accessor: 'email', title: 'Email' },
  {
    accessor: 'action',
    title: '',
    titleClassName: '!text-center',
    render: ({ id }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <Link href={`${ROUTE_HOSPITAL_CHAIN}?hospitalId=${id}`}>
          <IconEye />
        </Link>
      </div>
    ),
  },
];
