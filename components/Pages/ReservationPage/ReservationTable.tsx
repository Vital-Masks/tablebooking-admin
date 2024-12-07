import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getReservationList } from "@/lib/actions/reservation.action";

const ReservationTable = async () => {
  const rowData: Reservation[] = [];
  const reservations = await getReservationList();

  reservations?.map((res: any) => {
    rowData.push({
      id: res._id,
      fullname: res.guestUserId.firstName,
      contact: res.guestUserId.contactNo,
      restaurant: res.restaurantId.restaurantName,
      reservedfor: res.dining.diningName,
      date: res.date,
      time: res.time,
      pax: res.guestSize,
      diningarea: res.diningArea.sectionName,
      status: res.status,
      table: 'Table',
      createdOn: res.created_at,
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default ReservationTable;
