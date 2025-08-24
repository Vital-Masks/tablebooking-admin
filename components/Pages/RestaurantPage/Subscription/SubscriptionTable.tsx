import React from "react";
import { columns } from "./columns";
import Table from "@/components/Common/Table";
import { getAllRestaurantSubscriptions } from "@/lib/actions/subscription.action";
import moment from "moment";

const SubscriptionTable = async ({ params }: any) => {
  const rowData: any[] = [];
  if (params.restaurantId !== "c") {
    const subscriptions = await getAllRestaurantSubscriptions({
      restaurantId: params.restaurantId,
    });

    subscriptions?.map((res: any) => {
      rowData.push({
        id: res._id,
        subscriptionType: res.planId.name,
        period: res.planId.billingCycle,
        fromDate: moment(res.startDate).format("DD-MM-YYYY"),
        toDate: moment(res.endDate).format("DD-MM-YYYY"),
        payment: res.payment,
        amount: res.totalBill,
      });
    });
  }

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
      </div>
      <Table columns={columns} rowData={rowData} />
    </div>
  );
};

export default SubscriptionTable;
