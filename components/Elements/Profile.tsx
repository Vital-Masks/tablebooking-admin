'use client';

import React from "react";
import { IconLogout } from "../Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTimestamp');
    
    // Clear cookies
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    document.cookie = 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        {/* <img
          className="h-10 w-10 rounded-md object-cover"
          src="/images/user-profile.jpeg"
          alt="userProfile"
        /> */}
        <span className="flex justify-center items-center w-10 h-10 text-center rounded-lg object-cover bg-indigo-500 text-lg text-white">
          VR
        </span>

        <div className="truncate">
          <h4 className="text-base">
            VReserve
            <span className="rounded bg-success-light px-1 text-xs text-success ml-2">
              Pro
            </span>
          </h4>
          <button type="button" className="text-black/60 hover:text-primary">
            vreserve@gmail.com
          </button>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="!py-3 text-danger cursor-pointer"
      >
        <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90" />
      </button>
    </div>
  );
};

export default Profile;
