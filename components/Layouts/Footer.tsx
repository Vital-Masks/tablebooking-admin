import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="mx-4 max-w-screen-xl xl:mx-auto lg:w-full">
      <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-semibold leading-6 text-gray-900">
            RESERVED
          </h3>
        </div>
        <div className='flex items-center gap-5 text-sm text-gray-500 mt-2 lg:mt-0'>
          <Link href="#">Link</Link>
          <Link href="#">Link</Link>
          <Link href="#">Link</Link>
          <Link href="#">Link</Link>
        </div>
      </div>
      <div className="my-8 border-t border-gray-900/10 pt-8 flex flex-col md:flex-row items-center md:justify-between">
        <div className="flex lg:space-x-6 md:order-2">
            <button className='bg-gray-100 py-1 px-3 rounded text-sm text-gray-600'>
                Use RESERVED at your business
            </button>
        </div>
        <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
          &copy; {new Date().getFullYear()} Reserved, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
