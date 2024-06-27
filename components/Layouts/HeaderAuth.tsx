'use client';
import { useState } from 'react';
import Link from 'next/link';

const HeaderAuth = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="py-6 px-4 xl:px-0">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto ">
          <h3 className="text-xl font-semibold leading-6 text-gray-900">
            RESERVED
          </h3>
          <div className="hidden lg:flex items-center gap-5">
            <button className="bg-indigo-500 py-2 px-6 text-white text-sm hover:bg-indigo-600 transition-colors duration-150 ease-linear rounded">
              Login
            </button>
          </div>
          
        </div>
      </div>
      
    </>
  );
};

export default HeaderAuth;
