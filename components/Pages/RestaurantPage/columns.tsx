'use client';

import { IconEye } from '@/components/Icons';
import { ROUTE_RESTAURANTS } from '@/constants/routes';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export const columns = [
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
    render: ({ id, hospitalityChainId }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <Link
          href={`${ROUTE_RESTAURANTS}/general-detail?restaurantId=${id}&hospitalityChainId=${hospitalityChainId}`}
        >
          <IconEye />
        </Link>
      </div>
    ),
  },
];
