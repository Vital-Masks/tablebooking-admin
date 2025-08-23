"use client";

import { useState, useEffect } from "react";
import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getReservationList } from "@/lib/actions/reservation.action";
import ReservationTableHead from "./ReservationTableHead";

const ReservationTable = ({ restaurants, restaurantId }: any) => {
  const [rowData, setRowData] = useState<Reservation[]>([]);
  const [initialData, setInitialData] = useState<Reservation[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data when restaurantId changes
  useEffect(() => {
    if (restaurantId) {
      fetchReservations();
    } else {
      setRowData([]);
      setInitialData([]);
      setError(null);
    }
  }, [restaurantId]);

  // Filter data based on search
  useEffect(() => {
    if (search.trim() === "") {
      setRowData(initialData);
    } else {
      const filteredData = initialData.filter((reservation) =>
        Object.values(reservation).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
      setRowData(filteredData);
    }
  }, [search, initialData]);

  const fetchReservations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const reservations = await getReservationList(restaurantId);
      const formattedData: Reservation[] = reservations?.map((res: any) => ({
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
      })) || [];

      setInitialData(formattedData);
      setRowData(formattedData);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setError("Error loading reservations. Please try again.");
      setInitialData([]);
      setRowData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filteredData: Reservation[]) => {
    setRowData(filteredData);
  };

  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleResetToInitial = () => {
    setRowData(initialData);
    setSearch("");
  };

  // If no restaurantId is provided, show empty state
  if (!restaurantId) {
    return (
      <div>
        <ReservationTableHead 
          restaurants={restaurants} 
          restaurantId={restaurantId} 
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          onResetToInitial={handleResetToInitial}
        />
        <div className="p-8 text-center">
          <p className="text-gray-600">Please select a restaurant to view reservations.</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <ReservationTableHead 
          restaurants={restaurants} 
          restaurantId={restaurantId} 
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          onResetToInitial={handleResetToInitial}
        />
        <div className="p-8 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div>
        <ReservationTableHead 
          restaurants={restaurants} 
          restaurantId={restaurantId} 
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          onResetToInitial={handleResetToInitial}
        />
        <div className="p-8 text-center">
          <p className="text-gray-600">Loading reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ReservationTableHead 
        restaurants={restaurants} 
        restaurantId={restaurantId} 
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onResetToInitial={handleResetToInitial}
      />
      <Table columns={columns} rowData={rowData} />
    </div>
  );
};

export default ReservationTable;
