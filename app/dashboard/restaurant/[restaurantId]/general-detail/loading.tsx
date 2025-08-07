import React from "react";

// Loading skeleton for form field
const FormFieldSkeleton = ({ isGrid = false }: { isGrid?: boolean }) => {
  return (
    <div className={`${isGrid ? "col-span-1" : "col-span-2"}`}>
      {/* Label skeleton */}
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
      {/* Input skeleton */}
      <div className="h-10 w-full bg-gray-100 rounded animate-pulse"></div>
    </div>
  );
};

// Loading skeleton for file upload field
const FileUploadSkeleton = () => {
  return (
    <div className="col-span-2">
      {/* Label skeleton */}
      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
      {/* File upload area skeleton */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton for textarea field
const TextareaSkeleton = () => {
  return (
    <div className="col-span-1">
      {/* Label skeleton */}
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
      {/* Textarea skeleton */}
      <div className="h-20 w-full bg-gray-100 rounded animate-pulse"></div>
    </div>
  );
};

// Loading skeleton for switch field
const SwitchSkeleton = () => {
  return (
    <div className="col-span-1">
      {/* Label skeleton */}
      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
      {/* Switch skeleton */}
      <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );
};

// Loading skeleton for grid section
const GridSectionSkeleton = ({ fieldCount = 2 }: { fieldCount?: number }) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {[...Array(fieldCount)].map((_, index) => (
        <FormFieldSkeleton key={index} isGrid={true} />
      ))}
    </div>
  );
};

// Loading skeleton for three-column grid section
const ThreeColumnGridSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <FormFieldSkeleton isGrid={true} />
      <FormFieldSkeleton isGrid={true} />
      <FormFieldSkeleton isGrid={true} />
    </div>
  );
};

// Main loading component
const GeneralDetailLoading = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="panel shadow-none">
        <div className="mb-5">
          <div className="space-y-7">
            {/* File upload section */}
            <FileUploadSkeleton />

            {/* Grid 1: Restaurant Name & Type */}
            <GridSectionSkeleton fieldCount={2} />

            {/* Grid 2: Contact & WhatsApp */}
            <GridSectionSkeleton fieldCount={2} />

            {/* Grid 3: Registration & Hospitality Chain */}
            <GridSectionSkeleton fieldCount={2} />

            {/* Grid 4: Email & Website */}
            <GridSectionSkeleton fieldCount={2} />

            {/* Grid 5: Address & Embed URL */}
            <GridSectionSkeleton fieldCount={2} />

            {/* Grid 7: Description & Currency */}
            <div className="grid grid-cols-2 gap-5">
              <TextareaSkeleton />
              <FormFieldSkeleton isGrid={true} />
            </div>

            {/* Grid 8: Dining Style & Dress Code */}
            <GridSectionSkeleton fieldCount={2} />

            {/* Grid 9: Payment Options & Cuisines */}
            <GridSectionSkeleton fieldCount={2} />

            {/* Grid 10: Time Zone & Availability */}
            <GridSectionSkeleton fieldCount={2} />

            {/* Grid 11: Opening Days, Open Time & Close Time */}
            <ThreeColumnGridSkeleton />

            {/* Grid 12: Promoted Switch */}
            <div className="grid grid-cols-2 gap-5">
              <SwitchSkeleton />
              <div></div> {/* Empty space */}
            </div>

            {/* Submit button skeleton */}
            <div className="flex justify-start mt-6">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetailLoading;
