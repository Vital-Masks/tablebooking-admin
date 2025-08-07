"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getReservationList } from "@/lib/actions/reservation.action";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";

// Custom hook for managing restaurants data
const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getRestaurantsList();
      
      if (response) {
        setRestaurants(response);
      } else {
        setError("Failed to fetch restaurants");
      }
    } catch (err) {
      setError("An error occurred while fetching restaurants");
      console.error("Error fetching restaurants:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    restaurants,
    isLoading,
    error,
    fetchRestaurants,
  };
};

// Custom hook for managing reservations data
const useReservations = (restaurantId: string | null) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    if (!restaurantId) {
      setReservations([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await getReservationList(restaurantId);

      if (response) {
        const mappedReservations = response.map((res: any) => ({
          id: res._id,
          fullname: `${res.guestUserId?.firstName || ""} ${res.guestUserId?.lastName || ""}`.trim(),
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
        }));

        setReservations(mappedReservations);
      } else {
        setReservations([]);
        setError("Failed to fetch reservations");
      }
    } catch (err) {
      setError("An error occurred while fetching reservations");
      console.error("Error fetching reservations:", err);
      setReservations([]);
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  return {
    reservations,
    isLoading,
    error,
    fetchReservations,
  };
};

// Restaurant filter component
const RestaurantFilter = ({
  restaurants,
  selectedRestaurantId,
  onRestaurantSelect,
  isLoading,
}: {
  restaurants: Restaurant[];
  selectedRestaurantId: string | null;
  onRestaurantSelect: (id: string) => void;
  isLoading: boolean;
}) => {
  return (
    <ul className="!min-w-[300px] max-h-[300px] overflow-auto">
      <p className="p-4 border-b bg-neutral-50 font-medium">Restaurants</p>
      {isLoading ? (
        <li className="p-4">
          <p className="text-gray-500">Loading restaurants...</p>
        </li>
      ) : restaurants.length === 0 ? (
        <li className="p-4">
          <p className="text-gray-500">No restaurants available</p>
        </li>
      ) : (
        restaurants.map((restaurant) => (
          <li key={restaurant._id || restaurant.id}>
            <button
              type="button"
              onClick={() => onRestaurantSelect(restaurant._id || restaurant.id)}
              className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                selectedRestaurantId === (restaurant._id || restaurant.id)
                  ? "bg-blue-50 text-blue-600"
                  : ""
              }`}
              aria-pressed={selectedRestaurantId === (restaurant._id || restaurant.id)}
            >
              {restaurant.restaurantName || restaurant.name}
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

RestaurantFilter.displayName = 'RestaurantFilter';

const ReservationTable = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  
  const {
    restaurants,
    isLoading: isLoadingRestaurants,
    error: restaurantsError,
    fetchRestaurants,
  } = useRestaurants();

  const {
    reservations,
    isLoading: isLoadingReservations,
    error: reservationsError,
    fetchReservations,
  } = useReservations(selectedRestaurantId);

  // Memoized filter component
  const Filter = useMemo(
    () => {
      const FilterComponent = () => (
        <RestaurantFilter
          restaurants={restaurants}
          selectedRestaurantId={selectedRestaurantId}
          onRestaurantSelect={setSelectedRestaurantId}
          isLoading={isLoadingRestaurants}
        />
      );
      FilterComponent.displayName = 'Filter';
      return FilterComponent;
    },
    [restaurants, selectedRestaurantId, isLoadingRestaurants]
  );

  // Memoized table title
  const tableTitle = useMemo(() => {
    const selectedRestaurant = restaurants.find(
      (restaurant) => (restaurant._id || restaurant.id) === selectedRestaurantId
    );
    return `Reservations at ${selectedRestaurant?.restaurantName || selectedRestaurant?.name || "All Restaurants"}`;
  }, [restaurants, selectedRestaurantId]);

  // Initialize data on component mount
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  // Fetch reservations when restaurant selection changes
  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // Set first restaurant as default when restaurants are loaded
  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurantId) {
      setSelectedRestaurantId(restaurants[0]._id || restaurants[0].id);
    }
  }, [restaurants, selectedRestaurantId]);

  // Show error state if there are errors
  if (restaurantsError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 mb-2">Error loading restaurants</p>
        <button
          onClick={fetchRestaurants}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {reservationsError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600 text-sm">{reservationsError}</p>
        </div>
      )}
      
      <Table
        title={tableTitle}
        columns={columns}
        rowData={reservations}
        Filter={Filter}
        isLoading={isLoadingReservations}
      />
    </div>
  );
};

ReservationTable.displayName = 'ReservationTable';

export default ReservationTable;
