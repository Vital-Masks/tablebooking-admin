import Link from 'next/link';
import React from 'react';

const varificationPage = () => {
  return (
    <form>
      <div className="grid grid-cols-8 gap-2">
        <input
          className="shadow appearance-none border items-center rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="no1"
          type="text"
          placeholder="-"
        />
        <input
          className="shadow appearance-none items-center border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="no2"
          type="text"
          placeholder="-"
        />
        <input
          className="shadow appearance-none border rounded items-center w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="no3"
          type="text"
          placeholder="-"
        />
        <input
          className="shadow appearance-none border rounded items-center w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="no4"
          type="text"
          placeholder="-"
        />
      </div>
      <button
        className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Verify
      </button>
      <Link
        href="/auth/OTP"
        className="text-blue font-bold px-4 hover:text-blue-700"
      >
        Didn&apos;t Recived OTP ? Resend Code
      </Link>
    </form>
  );
};

export default varificationPage;
