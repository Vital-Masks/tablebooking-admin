import AdonsForm from "@/components/Pages/RestaurantPage/Adons/AdonsForm";
import AdonsTable from "@/components/Pages/RestaurantPage/Adons/AdonsTable";
import React from "react";

const Adons = ({ params }: any) => {
  return (
    <div>
      <AdonsTable params={params} />
      <AdonsForm params={params} />
    </div>
  );
};

export default Adons;
