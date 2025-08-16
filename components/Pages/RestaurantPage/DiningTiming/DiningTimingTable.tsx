import React from 'react';
import { columns } from './columns';
import Table from '@/components/Common/Table';
import { getRestaurantDiningTiming } from '@/lib/actions/restaurant.actions';

const DiningTimingTable = async ({ params }: any) => {
  const rowData: any[] = [];
  if (params.restaurantId !== 'c') {
    const dinings = await getRestaurantDiningTiming(
      params.restaurantId
    );

    dinings?.map((res: any) => {
      rowData.push({
        id: res._id,
        diningName: res.diningName,
        dates: res.dateType,
        dateRange: `${res.dateFrom} - ${res.dateTo}`,
        timeRange: `${res.timeFrom} - ${res.timeTo}`,
        pricePP: res.pricePerPerson,
        availability: res.availabilityStatus ? "Available" : "Not Available",
      });
    });
  }

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold">Dining Timings</h1>
      </div>
      <Table columns={columns} rowData={rowData} />
    </div>
  );
};

export default DiningTimingTable;
