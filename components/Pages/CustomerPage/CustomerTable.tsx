import Table from '@/components/Common/Table';
import { columns } from './columns';
import { getCustomers } from '@/lib/actions/user.action';

const CustomerTable = async () => {
  const rowData: Customers[] = [];
  const customers = await getCustomers();

  customers?.map((res: any) => {
    rowData.push({
      id: res._id,
      fullname: res.firstName + ' ' + res.lastName,
      contactno: res.contactNo,
      emailaddress: res.email,
      latestreservation: res.latestReservation?.restaurantId,
      createdOn: res.created_at,
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default CustomerTable;
