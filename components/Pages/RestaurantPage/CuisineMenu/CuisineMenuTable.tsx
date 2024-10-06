import React from 'react';
import { columns } from './columns';
import Table from '@/components/Common/Table';
import { getRestaurantCuisineMenu } from '@/lib/actions/restaurant.actions';

const CuisineMenuTable = async ({ params }: any) => {
  const rowData: any[] = [];
  if (params.restaurantId !== 'c') {
    const cuisines = await getRestaurantCuisineMenu(params.restaurantId);

    cuisines?.map((res: any) => {
      rowData.push({
        id: res._id,
        foodName: res.foodName,
        category: res.foodCategory,
        price: res.price,
      });
    });
  }

  return (
    <div>
      <Table columns={columns} rowData={rowData} />
    </div>
  );
};

export default CuisineMenuTable;
