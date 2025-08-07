export default function Loading() {
  return (
    <main>
      <div>
        {/* Header Skeleton */}
        <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 items-start gap-5">
          <div className="col-span-3">
            {/* Analytics Cards Skeleton */}
            <div className="grid grid-cols-3 mb-5 gap-5">
              {[1, 2, 3].map((index) => (
                <div key={index} className="panel h-full p-0">
                  <div className="flex gap-2 p-5">
                    <div className="h-11 w-11 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-6 w-16 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Skeleton */}
            <div className="panel h-full flex-1">
              {/* Table Header Controls */}
              <div className="flex flex-col justify-between flex-wrap gap-5 mb-5 md:flex-row md:items-center">
                <div className="flex gap-5">
                  <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-9 w-48 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Table Content */}
              <div className="datatables h-full">
                <div className="min-h-[400px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-9 gap-4 p-4 border-b bg-gray-50">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                      <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>

                  {/* Table Rows */}
                  {[1, 2, 3, 4, 5].map((rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-9 gap-4 p-4 border-b">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((colIndex) => (
                        <div key={colIndex} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
