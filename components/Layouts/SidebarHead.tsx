'use client';

import Link from 'next/link';
import { IconCaretsDown } from '../Icons';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/store/themeSlice';
import Image from 'next/image';

const SidebarHead = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Link href="/" className="flex items-center main-logo shrink-0">
        <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">
        <Image src="/logo.png" alt="logo" width={100} height={100} className="h-5 !w-full object-contain" />
        </span>
      </Link>

      <button
        type="button"
        className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
        onClick={() => dispatch(toggleSidebar())}
      >
        <IconCaretsDown className="m-auto rotate-90" />
      </button>
    </div>
  );
};

export default SidebarHead;
