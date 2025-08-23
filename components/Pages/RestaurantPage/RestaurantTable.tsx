"use client";

import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";
import RestaurantTableHead from "./RestaurantTableHead";
import { getUtilities } from "@/lib/actions/utilities.actions";
import { useState, useEffect } from "react";

const RestaurantTable = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<any[]>([]);
  const [restaurantType, setRestaurantType] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [restaurantsData, utilsData] = await Promise.all([
          getRestaurantsList(),
          getUtilities()
        ]);

        if (restaurantsData) {
          const formattedData = restaurantsData.map((res: any) => ({
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
          setFilteredRestaurants(formattedData);
        }

        if (utilsData?.[0]?.restaurantType) {
          const typeOptions = Object.entries(utilsData[0].restaurantType).map(
            ([key, value]) => ({
              type: "checkbox",
              title: value,
              value: key,
            })
          );
          setRestaurantType(typeOptions);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.phone.includes(searchTerm)
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [searchTerm, restaurants]);

  const handleFilterChange = (filteredData: any[]) => {
    setFilteredRestaurants(filteredData);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleResetToInitial = () => {
    setFilteredRestaurants(restaurants);
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <RestaurantTableHead 
        restaurantType={restaurantType} 
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        onResetToInitial={handleResetToInitial}
      />
      <Table columns={columns} rowData={filteredRestaurants} />
    </>
  );
};

export default RestaurantTable;
