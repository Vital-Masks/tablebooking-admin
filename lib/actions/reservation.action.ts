"use server";

import { ROUTE_RESTAURANTS } from "@/constants/routes";
import { handleError, parseStringify } from "../utils";
import { fetcher, revalidate } from "./fetcher";

// GET ALL RESERVATIONS
export const getReservationList = async (
  restaurantId: string
): Promise<Reservation[] | null> => {
  try {
    const response: any = await fetcher(
      `/restaurant/${restaurantId}/reservation/getAllForRestaurant`,
      {
        revalidate: 300, // Cache for 5 minutes (reservations change frequently)
        tags: [`restaurant-${restaurantId}-reservations`],
      }
    );
    if (response.error) {
      throw new Error(`Failed to fetch: ${response.error}`);
    }
    return response;
  } catch (error) {
    handleError(
      "An error occurred while retrieving the hospital chains",
      error
    );
    return null;
  }
};

export const getReservation = async (id: string) => {
  return await fetcher<Reservation>(`/reservation/${id}`, {
    method: "GET",
    revalidate: 300, // Cache for 5 minutes (reservations change frequently)
    tags: ['reservations', `reservation-${id}`],
  });
};

//  CREATE RESERVATION
export const createReservation = async (
  body: any
): Promise<Reservation | null> => {
  const newReservation = await fetcher<Reservation>(
    `/restaurant/${body.restaurant}/reservation`,
    {
      method: "POST",
      body: body,
    }
  );

  if (newReservation) {
    revalidate(ROUTE_RESTAURANTS);
    return parseStringify(newReservation);
  }
  return null;
};

//  UPDATE RESERVATION
export const updateReservation = async (
  id: string,
  body: any
): Promise<Reservation | null> => {
  const newReservation = await fetcher<Reservation>(
    `/restaurant/${body.restaurant}/reservation/${id}`,
    {
      method: "PUT",
      body: body,
    }
  );

  if (newReservation) {
    revalidate(ROUTE_RESTAURANTS);
    return parseStringify(newReservation);
  }
  return null;
};

// FILTER RESTAURANTS
export const filterReservations = async (filterData: {
  dateType?: string;
  startDate?: string;
  endDate?: string;
  status?: string[];
  table?: string[];
}): Promise<Restaurant[] | null> => {
  return await fetcher<Restaurant[]>("/adminFilter/reservationFilter", {
    method: "POST",
    body: filterData,
  });
};
