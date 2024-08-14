'use client';

import { IconEye } from '@/components/Icons';
import Link from 'next/link';

export const columns = [
  { accessor: 'foodName', title: 'Food Name' },
  { accessor: 'category', title: 'Category' },
  { accessor: 'price', title: 'Price' },
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
