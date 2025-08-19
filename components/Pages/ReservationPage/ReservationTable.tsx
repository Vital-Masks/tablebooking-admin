import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getReservationList } from "@/lib/actions/reservation.action";
import ReservationTableHead from "./ReservationTableHead";

const ReservationTable = async ({ restaurants, restaurantId }: any) => {
  const rowData: Reservation[] = [];
  
  // If no restaurantId is provided, show empty state
  if (!restaurantId) {
    return (
      <div>
        <ReservationTableHead restaurants={restaurants} restaurantId={restaurantId} />
        <div className="p-8 text-center">
          <p className="text-gray-600">Please select a restaurant to view reservations.</p>
        </div>
      </div>
    );
  }

  try {
    const reservations = await getReservationList(restaurantId);
    reservations?.map((res: any) => {
      rowData.push({
        id: res._id,
        restaurantId: res.restaurantId?._id,
        fullname:
          `${res.guestUserId?.firstName || ""} ${res.guestUserId?.lastName || ""}`.trim(),
        contact: res.guestUserId?.contactNo || "",
        restaurant: res.restaurantId?.restaurantName || "",
        reservedfor: res.dining?.diningName || "",
        date: res.date || "",
        time: res.time || "",
        pax: res.guestSize || "",
        diningarea: res.diningArea?.sectionName || "",
        status: res.status || "",
        table: res.tableNo || "",
        createdOn: res.created_at || "",
      });
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return (
      <div>
        <ReservationTableHead restaurants={restaurants} restaurantId={restaurantId} />
        <div className="p-8 text-center">
          <p className="text-red-600">Error loading reservations. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ReservationTableHead restaurants={restaurants} restaurantId={restaurantId} />
      <Table columns={columns} rowData={rowData} />
    </div>
  );
};

export default ReservationTable;
