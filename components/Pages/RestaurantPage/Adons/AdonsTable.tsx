import React from "react";
import { columns } from "./columns";
import Table from "@/components/Common/Table";
import moment from "moment";
import { getAllRestaurantAdons } from "@/lib/actions/adons.action";

const AdonsTable = async ({ params }: any) => {
  const rowData: any[] = [];
  if (params.restaurantId !== "c") {
    const adons = await getAllRestaurantAdons({
      restaurantId: params.restaurantId,
    });

    adons?.map((res: any) => {
      rowData.push({
        id: res._id,
        addonsType: res.addonType,
        period: res.period,
        fromDate: moment(res.startDate).format("DD-MM-YYYY"),
        toDate: moment(res.endDate).format("DD-MM-YYYY"),
        payment: res.paymentType,
        amount: res.totalFee,
      });
    });
  }

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold">Add Ons</h1>
      </div>
      <Table columns={columns} rowData={rowData} />
    </div>
  );
};

export default AdonsTable;
