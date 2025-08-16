import React from 'react';
import { columns } from './columns';
import Table from '@/components/Common/Table';
import { getRestaurantDiningAreas } from '@/lib/actions/restaurant.actions';

const DiningAreaTable = async ({ params }: any) => {
  const rowData: any[] = [];
  if (params.restaurantId !== 'c') {
    const diningArea = await getRestaurantDiningAreas(params.restaurantId);

    diningArea?.map((res: any) => {
      rowData.push({
        id: res._id,
        sectionName: res.sectionName,
        maxSeatsCount: res.maximumSeats,
        seatingAreaType: res.seatingAreaType,
      });
    });
  }

  return (
    <div>
       <div className="p-5">
        <h1 className="text-2xl font-bold">Dining Areas</h1>
      </div>
      <Table columns={columns} rowData={rowData} />
    </div>
  );
};

export default DiningAreaTable;
