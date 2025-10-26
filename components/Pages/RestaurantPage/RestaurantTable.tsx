"use client";

import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";
import RestaurantTableHead from "./RestaurantTableHead";
import { getUtilities } from "@/lib/actions/utilities.actions";
import { useState, useEffect } from "react";

const RestaurantTable = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [restaurantType, setRestaurantType] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchRestaurants = async (page: number = 1, limit: number = 10) => {
    setIsLoading(true);
    try {
      const params = `page=${page}&limit=${limit}`;
      const restaurantsData: any = await getRestaurantsList(params);

      if (restaurantsData?.data) {
        const formattedData = restaurantsData.data.map((res: any) => ({
          id: res._id,
          name: res.restaurantName,
          type: res.restaurantType,
          phone: res.contactNo,
          email: res.email,
          address: res.address,
          subscription: "Free plan",
          availability: res.availabilityStatus,
          createdOn: res.created_at,
          hospitalityChainId: res.hospitalityChainId?._id,
        }));
        
        setRestaurants(formattedData);
        setPagination({
          page: restaurantsData.pagination?.page || page,
          limit: restaurantsData.pagination?.limit || limit,
          total: restaurantsData.pagination?.total || 0,
          totalPages: restaurantsData.pagination?.totalPages || 0
        });
      }
    } catch (error) {
      console.error("Error loading restaurants:", error);
      setRestaurants([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadUtils = async () => {
      try {
        const utilsData: any = await getUtilities();
        if (utilsData?.[0]?.restaurantType) {
          const typeOptions = Object.entries(utilsData[0].restaurantType).map(
            ([key, value]) => ({
              type: "checkbox",
              title: value,
              value: value,
            })
          );
          setRestaurantType(typeOptions);
        }
      } catch (error) {
        console.error("Error loading utilities:", error);
      }
    };

    loadUtils();
    fetchRestaurants();
  }, []);

  const handleFilterChange = (filteredData: any[]) => {
    setRestaurants(filteredData);
  };

  const handleSearchChange = (searchTerm: string) => {
    // Search will be handled by filtering logic in RestaurantTableHead
  };

  const handleResetToInitial = () => {
    fetchRestaurants(pagination.page, pagination.limit);
  };

  const handlePageChange = (page: number) => {
    fetchRestaurants(page, pagination.limit);
  };

  return (
    <>
      <RestaurantTableHead
        restaurantType={restaurantType}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onResetToInitial={handleResetToInitial}
      />
      <Table
        columns={columns}
        rowData={restaurants}
        pagination={pagination}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default RestaurantTable;
