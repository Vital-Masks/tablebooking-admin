"use client";

import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getReservationList } from "@/lib/actions/reservation.action";
import { useEffect, useState } from "react";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";

const ReservationTable = () => {
  const [rowData, setRowData] = useState<Reservation[]>([]);
  const [restaurantId, setRestaurantId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);

  const Filter = () => {
    return (
      <ul className="!min-w-[300px] max-h-[300px] overflow-auto">
        <p className="p-4 border-b bg-neutral-50">Restaurants</p>
        {isLoadingFilter ? (
          <li className="p-4">
            <p>Loading...</p>
          </li>
        ) : (
          restaurants?.map((restaurant) => (
            <li>
              <button
                type="button"
                onClick={() => setRestaurantId(restaurant.id)}
              >
                {restaurant.name}
              </button>
            </li>
          ))
        )}
      </ul>
    );
  };

  const fetchRestaurants = async () => {
    const res = await getRestaurantsList();

    if (res) {
      setRestaurantId(res[0]._id);
      setRestaurants(
        res.map((restaurant) => ({
          id: restaurant._id,
          name: restaurant.restaurantName,
        }))
      );
      setIsLoadingFilter(false);
    }
  };

  const fetchReservation = async () => {
    const reservations = await getReservationList(restaurantId);

    if (reservations) {
      const mapped = reservations.map((res: any) => ({
        id: res._id,
        fullname: res.guestUserId?.firstName + " " + res.guestUserId?.lastName,
        contact: res.guestUserId?.contactNo,
        restaurant: res.restaurantId?.restaurantName,
        reservedfor: res.dining?.diningName,
        date: res.date,
        time: res.time,
        pax: res.guestSize,
        diningarea: res.diningArea?.sectionName,
        status: res.status,
        table: res.tableNo,
        createdOn: res.created_at,
      }));

      setRowData(mapped);
    } else {
      setRowData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchReservation();
  }, [restaurantId]);

  useEffect(() => {
    setIsLoadingFilter(true);
    fetchRestaurants();
  }, []);

  return (
    <>
      <Table
        title={
          "Reservations at " +
          restaurants?.find((x) => x.id === restaurantId)?.name
        }
        columns={columns}
        rowData={rowData}
        Filter={Filter}
        isLoading={isLoading}
      />
    </>
  );
};

export default ReservationTable;
