"use client";

import { useState, useEffect, useCallback } from "react";
import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getReservationList } from "@/lib/actions/reservation.action";
import ReservationTableHead from "./ReservationTableHead";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Fragment } from "react";

const ReservationTable = ({ restaurants, restaurantId }: any) => {
  const [systemReservations, setSystemReservations] = useState<Reservation[]>([]);
  const [manualReservations, setManualReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [systemPagination, setSystemPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [manualPagination, setManualPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchReservations = useCallback(async (
    page: number = 1, 
    limit: number = 10,
    type: 'system' | 'manual'
  ) => {
    if (!restaurantId) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const params = `page=${page}&limit=${limit}&reservationType=${type}`;
      const reservations: any = await getReservationList(restaurantId, params);
      
      const formattedData: Reservation[] =
        reservations?.data?.map((res: any) => ({
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

      const paginationData = {
        page: reservations.pagination?.page || page,
        limit: reservations.pagination?.limit || limit,
        total: reservations.pagination?.total || 0,
        totalPages: reservations.pagination?.totalPages || 0
      };

      if (type === 'system') {
        setSystemReservations(formattedData);
        setSystemPagination(paginationData);
      } else {
        setManualReservations(formattedData);
        setManualPagination(paginationData);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setError("Error loading reservations. Please try again.");
      if (type === 'system') {
        setSystemReservations([]);
      } else {
        setManualReservations([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  // Fetch reservations when restaurantId changes
  useEffect(() => {
    if (restaurantId) {
      fetchReservations(1, 10, 'system');
      fetchReservations(1, 10, 'manual');
    } else {
      setSystemReservations([]);
      setManualReservations([]);
      setError(null);
    }
  }, [restaurantId, fetchReservations]);

  const handleFilterChange = (filteredData: Reservation[]) => {
    // Filter logic handled by server-side API
  };

  const handleSearchChange = (searchValue: string) => {
    // Search will be handled by server-side filtering if needed
  };

  const handleResetToInitial = () => {
    fetchReservations(1, 10, 'system');
    fetchReservations(1, 10, 'manual');
  };

  const handleSystemPageChange = (page: number) => {
    fetchReservations(page, systemPagination.limit, 'system');
  };

  const handleManualPageChange = (page: number) => {
    fetchReservations(page, manualPagination.limit, 'manual');
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
              <Table
                columns={columns}
                rowData={systemReservations}
                pagination={systemPagination}
                isLoading={isLoading}
                onPageChange={handleSystemPageChange}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="active">
              <Table
                columns={columns}
                rowData={manualReservations}
                pagination={manualPagination}
                isLoading={isLoading}
                onPageChange={handleManualPageChange}
              />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default ReservationTable;
