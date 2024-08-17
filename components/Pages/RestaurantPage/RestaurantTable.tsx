import Table from '@/components/Common/Table';
import { columns } from './columns';
import { getRestaurantsList } from '@/lib/actions/restaurant.actions';

const RestaurantTable = async () => {
  const rowData: Restaurant[] = [];
  const restaurants = await getRestaurantsList();
  restaurants?.map((res: any) => {
    rowData.push({
      id: res._id,
      name: res.restaurantName,
      type: res.restaurantType,
      phone: res.contactNo,
      email: res.email,
      address: res.address,
      subscription: 'Free plan',
      availability: res.availabilityStatus,
      createdOn: res.created_at,
      hospitalityChainId: res.hospitalityChainId?._id,
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default RestaurantTable;
