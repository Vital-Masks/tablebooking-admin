'use client';

import { IconEye } from '@/components/Icons';

export const columns = [
  { accessor: 'sectionName', title: 'Section Name' },
  { accessor: 'maxSeatsCount', title: 'Max Seats Count' },
  { accessor: 'seatingAreaType', title: 'Seating Area Type' },
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
