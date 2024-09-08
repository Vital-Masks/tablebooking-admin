'use client';

import { IconEye } from '@/components/Icons';
import Link from 'next/link';

export const columns = [
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
    render: ({ id }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <Link href={{ query: { edit: id } }}>
          <IconEye />
        </Link>
      </div>
    ),
  },
];
