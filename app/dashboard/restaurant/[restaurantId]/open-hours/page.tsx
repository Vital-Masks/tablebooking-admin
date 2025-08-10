"use client";

import OpeningHoursForm from "@/components/Pages/RestaurantPage/GeneralDetail/OpeningHoursForm";

const OpenHoursPage = ({ params }: any) => {
  // Example opening times data - replace this with your actual data source
  const openingTimes = [
    {"day": "Monday", "openTime": "10.00", "closeTime": "15.00"}, // Different from other weekdays
    {"day": "Tuesday", "openTime": "08.00", "closeTime": "22.00"},
    {"day": "Wednesday", "openTime": "08.00", "closeTime": "22.00"},
    {"day": "Thursday", "openTime": "08.00", "closeTime": "22.00"},
    {"day": "Friday", "openTime": "08.00", "closeTime": "22.00"},
    {"day": "Saturday", "openTime": "09.00", "closeTime": "23.00"},
    {"day": "Sunday", "openTime": "09.00", "closeTime": "23.00"}
  ];

  return (
    <OpeningHoursForm
      params={params}
      openingTimes={openingTimes}
    />
  );
};

export default OpenHoursPage;
