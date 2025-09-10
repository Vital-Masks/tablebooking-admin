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

    console.log("adons >>>>", adons);

     adons?.map((res: any) => {
       rowData.push({
         id: res._id,
         addonsType: res.addonid.name,
         period: res.addontype,
         fromDate: moment(res.startDate).format("DD-MM-YYYY"),
         toDate: moment(res.endDate).format("DD-MM-YYYY"),
         payment: res.paymenttype,
         amount: res.totalfee,
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
