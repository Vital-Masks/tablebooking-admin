import Link from 'next/link';
import React from 'react';
import Footer from '@/components/Layouts/Footer';
import HeaderAuth from '@/components/Layouts/HeaderAuth';

const changepasswordPage = () => {
  return (
    <div className="min-h-screen flex justify-center">
      
      <div className="flex w-full max-w-screen-xl flex-col main-content">
      <div className="flex flex-col min-h-screen main-content">
      <HeaderAuth />
        <div className="bg-white w-full max-w-md px-4 mb-6 rounded-lg">
        
          <h2 className="text-3xl font-bold mb-6">Change Your Password</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your New Password"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Confirm password"
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Update
            </button>
            <Link
              href="/otp"
              className="text-red font-bold px-4 hover:text-red-600"
            >
              Cancel
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

export default changepasswordPage;
