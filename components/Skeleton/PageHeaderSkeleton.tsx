import React from "react";

const PageHeaderSkeleton = () => {
  return (
    <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
      {/* Title skeleton */}
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>

      {/* Buttons skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default PageHeaderSkeleton;
