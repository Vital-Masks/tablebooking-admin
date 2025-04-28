'use client';
import Link from 'next/link';
import React from 'react';
import { IconMenu } from '../Icons';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/store/themeSlice';
import Notification from '../Elements/Notification';
import Image from 'next/image';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className={`z-40`}>
      <div className="shadow-sm">
        <div className="relative flex justify-between w-full items-center bg-white px-5 py-2.5">
          <div className="horizontal-logo flex items-center justify-between mr-2 lg:hidden">
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary mr-2 lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconMenu className="h-5 w-5" />
            </button>
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <span className="hidden align-middle text-2xl font-semibold  transition-all duration-300 ml-1.5 md:inline">
                <Image src="/logo.png" alt="logo" width={100} height={100} className="h-5 !w-full object-contain" />
              </span>
            </Link>
          </div>
          <div></div>
          <Notification />
        </div>
      </div>
    </header>
  );
};

export default Header;
