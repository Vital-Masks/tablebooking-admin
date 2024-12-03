import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getReservationList } from "@/lib/actions/reservation.action";

const ReservationTable = async () => {
  const rowData: Reservation[] = [];
  const reservations = await getReservationList();

  reservations?.map((res: any) => {
    rowData.push({
      id: res._id,
      fullname: 'Full name',
      contact: 'Contact No',
      restaurant: 'Restaurant',
      reservedfor: 'Reserved For',
      date: res.date,
      time: res.time,
      pax: res.guestSize,
      diningarea: 'Dining Area',
      status: 'Status',
      table: 'Table',
      createdOn: res.created_at,
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default ReservationTable;
