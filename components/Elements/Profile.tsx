import React from 'react';
import { IconLogout } from '../Icons';

const Profile = () => {
  return (
    <div className='flex items-center justify-between gap-2'>
      <div className="flex items-center gap-3">
        <img
          className="h-10 w-10 rounded-md object-cover"
          src="/images/user-profile.jpeg"
          alt="userProfile"
        />
        <div className="truncate">
          <h4 className="text-base">
            John Doe
            <span className="rounded bg-success-light px-1 text-xs text-success ml-2">
              Pro
            </span>
          </h4>
          <button type="button" className="text-black/60 hover:text-primary">
            johndoe@gmail.com
          </button>
        </div>
      </div>

      <button className="!py-3 text-danger">
        <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90" />
      </button>
    </div>
  );
};

export default Profile;
