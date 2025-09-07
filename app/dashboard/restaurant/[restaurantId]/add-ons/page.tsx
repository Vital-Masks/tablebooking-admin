import AdonsForm from "@/components/Pages/RestaurantPage/Adons/AdonsForm";
import AdonsTable from "@/components/Pages/RestaurantPage/Adons/AdonsTable";
import { getAllAdonsPlans } from "@/lib/actions/adons.action";
import React from "react";

const Adons = async ({ params }: any) => {
  const subscriptionPlans = await getAllAdonsPlans();
  const subscriptionPlansOptions = subscriptionPlans?.map((plan: any) => ({
    label: plan.name,
    value: plan._id,
  }));

  return (
    <div>
      <AdonsTable params={params} />
      <AdonsForm params={params} adonsPlansOptions={subscriptionPlansOptions} />
    </div>
  );
};

export default Adons;
