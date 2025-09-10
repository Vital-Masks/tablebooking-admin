"use client";

import { useState, useEffect } from "react";
import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getReservationList } from "@/lib/actions/reservation.action";
import ReservationTableHead from "./ReservationTableHead";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";

const ReservationTable = ({ restaurants, restaurantId }: any) => {
  const [rowData, setRowData] = useState<Reservation[]>([]);
  const [initialData, setInitialData] = useState<Reservation[]>([]);
  const [systemReservations, setSystemReservations] = useState<Reservation[]>([]);
  const [manualReservations, setManualReservations] = useState<Reservation[]>([]);
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
      setSystemReservations([]);
      setManualReservations([]);
      setError(null);
    }
  }, [restaurantId]);

  // Filter data based on search
  useEffect(() => {
    if (search.trim() === "") {
      setRowData(initialData);
      filterReservationsByType(initialData);
    } else {
      const filteredData = initialData.filter((reservation) =>
        Object.values(reservation).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
      setRowData(filteredData);
      filterReservationsByType(filteredData);
    }
  }, [search, initialData]);

  // Filter reservations by type
  const filterReservationsByType = (reservations: Reservation[]) => {
    const system = rowData.filter(res => res.reservationType?.toLowerCase() === 'system');
    const manual = rowData.filter(res => res.reservationType?.toLowerCase() === 'manual');
    setSystemReservations(system);
    setManualReservations(manual);
  };

  const fetchReservations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const reservations = await getReservationList(restaurantId);
      const formattedData: Reservation[] =
        reservations?.map((res: any) => ({
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
          reservationType: res.reservationType || "",
        })) || [];

      setInitialData(formattedData);
      setRowData(formattedData);
      filterReservationsByType(formattedData);
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
    const system = filteredData.filter(res => res.reservationType?.toLowerCase() === 'system');
    const manual = filteredData.filter(res => res.reservationType?.toLowerCase() === 'manual');
    setSystemReservations(system);
    setManualReservations(manual);
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
          <p className="text-gray-600">
            Please select a restaurant to view reservations.
          </p>
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
      <TabGroup>
        <TabList className="flex flex-wrap bg-white">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`${selected ? "!border-secondary text-secondary !outline-none" : ""} flex items-center border-t-2 border-transparent bg-white p-7 py-3 before:inline-block hover:border-secondary hover:text-secondary`}
              >
                System
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`${selected ? "!border-secondary text-secondary !outline-none" : ""} flex items-center border-t-2 border-transparent bg-white p-7 py-3 before:inline-block hover:border-secondary hover:text-secondary`}
              >
                Manual
              </button>
            )}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="active">
              <Table columns={columns} rowData={systemReservations} />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="active">
              <Table columns={columns} rowData={manualReservations} />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default ReservationTable;
