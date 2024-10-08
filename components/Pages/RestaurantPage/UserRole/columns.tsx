'use client';

import { IconEye } from '@/components/Icons';
import Link from 'next/link';

export const columns = [
  { accessor: 'firstname', title: 'First Name' },
  { accessor: 'lastname', title: 'Last Name' },
  { accessor: 'contactNumber', title: 'Contact No' },
  { accessor: 'email', title: 'Email Address' },
  { accessor: 'gender', title: 'Gender' },
  { accessor: 'role', title: 'Role' },
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
