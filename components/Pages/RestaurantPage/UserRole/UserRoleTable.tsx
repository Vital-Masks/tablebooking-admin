import React from 'react';
import { columns } from './columns';
import Table from '@/components/Common/Table';
import { getRestaurantUserRoles } from '@/lib/actions/restaurant.actions';

const UserRoleTable = async ({ params }: any) => {
  const rowData: any[] = [];
  if (params.hospitalityChainId !== 'n' && params.restaurantId !== 'c') {
    const userRoles = await getRestaurantUserRoles(
      params.hospitalityChainId,
      params.restaurantId
    );

    userRoles?.map((res: any) => {
      rowData.push({
        id: res._id,
        firstname: res.firstName,
        lastname: res.lastName,
        role: res.role,
        email: res.email,
        contactNumber: res.phoneNumber,
        gender: res.gender,
      });
    });
  }

  return (
    <div>
      <Table columns={columns} rowData={rowData} />
    </div>
  );
};

export default UserRoleTable;
