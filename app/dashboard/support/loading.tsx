import React from 'react';


// Loading skeleton for content header
const ContentHeaderSkeleton = () => {
  return (
    <div className="flex flex-wrap-reverse items-center justify-between gap-4 p-4">
      <div className="flex w-full items-center sm:w-auto">
        <div className="mr-4">
          {/* Title skeleton */}
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
          {/* Description skeleton */}
          <div className="h-4 w-60 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Button skeletons */}
        <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-9 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

// Loading skeleton for table content
const TableContentSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* First table skeleton */}
      <div className="panel h-full flex-1">
        {/* Table title skeleton */}
        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
        
        {/* Table header with filters and search */}
        <div className="flex flex-col justify-between flex-wrap gap-5 mb-5 md:flex-row md:items-center">
          <div className="flex gap-5">
            {/* Filter dropdown skeleton */}
            <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
            {/* Search input skeleton */}
            <div className="h-9 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          {/* Create button skeleton */}
          <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Table content skeleton */}
        <div className="min-h-[200px]">
          {/* Table header skeleton */}
          <div className="border-b border-gray-200 pb-3 mb-4">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* Table rows skeleton */}
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} className="border-b border-gray-100 py-3">
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, colIndex) => (
                  <div key={colIndex} className="h-4 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main loading component
const SupportLoading = () => {
  return (
    <div className="relative flex h-full sm:h-[calc(100vh_-_100px)]">      
      <div className="panel rounded-l-none h-full flex-1 overflow-x-hidden p-0">
        <div className="flex h-full flex-col">
          <ContentHeaderSkeleton />
          
          <div className="h-px border-b border-white-light"></div>
          
          <div className="table-responsive min-h-[400px] grow overflow-y-auto sm:min-h-[300px] p-5">
            <TableContentSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportLoading;
