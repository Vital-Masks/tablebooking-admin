"use client";

import { IconEye } from '@/components/Icons';
import { ROUTE_CUSTOMERS } from '@/constants/routes';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export const columns = [
  { accessor: 'fullname', title: 'Full Name' },
  { accessor: 'contactno', title: 'Contact No' },
  { accessor: 'emailaddress', title: 'E-Mail Address' },
  { accessor: 'latestreservation', title: 'Latest Reservation' },
  {
    accessor: 'createdOn',
    title: 'Created on',
    render: ({ createdOn }: any) => <div>{formatDate(createdOn)}</div>,
  },
  {
    accessor: 'action',
    title: '',
    titleClassName: '!text-center',
    render: ({ emailaddress }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <Link href={`${ROUTE_CUSTOMERS}?email=${emailaddress}`}>
          <IconEye />
        </Link>
      </div>
    ),
  },
];
