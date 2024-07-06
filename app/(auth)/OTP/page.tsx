import Link from 'next/link';
import React from 'react';
import Footer from '@/components/Layouts/Footer';
import HeaderAuth from '@/components/Layouts/HeaderAuth';

const varificationPage = () => {
  return (
    <div className="min-h-screen flex justify-center">
      
      <div className="flex w-full max-w-screen-xl flex-col main-content">
      <div className="flex flex-col min-h-screen main-content">
      <HeaderAuth />
        <div className="bg-white w-full max-w-md px-4 mb-6 rounded-lg">
        
          <h2 className="text-3xl font-bold mb-6">Verify it&apos;s You</h2>
          <p className="text-1xl mb-6"> 4 Digits </p>
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
            <Link href='/auth/OTP'
              className="text-blue font-bold px-4 hover:text-blue-700"
            >
              Didn&apos;t Recived OTP ? Resend Code
            </Link>

          </form>
        </div>
        
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center h-screen rounded-lg"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80)',
          }}
        ></div>
 
        
        <Footer />
      </div>
      
    </div>
    </div>
  );
};

export default varificationPage;
