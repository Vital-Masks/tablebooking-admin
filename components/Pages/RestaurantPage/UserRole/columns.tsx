"use client";

import { IconEye } from "@/components/Icons";

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
    render: () => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <button>
          <IconEye />
        </button>
      </div>
    ),
  },
];
