import React from "react";

const TableSkeleton = () => {
  return (
    <div className="panel h-full flex-1">
      {/* Table header with filters and search */}
      <div className="flex flex-col justify-between flex-wrap gap-5 mb-5 md:flex-row md:items-center">
        <div className="flex gap-5">
          {/* Filter dropdown skeleton */}
          <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
          {/* Search input skeleton */}
          <div className="h-9 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Table content skeleton */}
      <div className="datatables h-full">
        <div className="min-h-[400px]">
          {/* Table header skeleton */}
          <div className="border-b border-gray-200 pb-3 mb-4">
            <div className="grid grid-cols-8 gap-4">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Table rows skeleton */}
          {[...Array(10)].map((_, rowIndex) => (
            <div key={rowIndex} className="border-b border-gray-100 py-3">
              <div className="grid grid-cols-8 gap-4">
                {[...Array(8)].map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className="h-4 bg-gray-100 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-8 w-8 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
