import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        {/* Avatar skeleton */}
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        
        <div className="truncate">
          {/* Name skeleton */}
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
          {/* Email skeleton */}
          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      {/* Logout button skeleton */}
      <div className="w-4.5 h-4.5 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
};

export default ProfileSkeleton;
