import Link from 'next/link';
import React from 'react';
import { IconMenu } from '../Icons';

const Header = () => {
  return (
    <header className={`z-40`}>
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5">
          <div className="horizontal-logo flex items-center justify-between mr-2 lg:hidden">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">
                RRESERVED
              </span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
              // onClick={() => dispatch(toggleSidebar())}
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
          <p>Header</p>
        </div>
      </div>
    </header>
  );
};

export default Header;