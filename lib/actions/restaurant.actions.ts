'use server';

import { ROUTE_RESTAURANTS } from '@/constants/routes';
import { parseStringify } from '../utils';
import { fetcher, revalidate } from './fetcher';

const ENDPOINT = process.env.API_ENDPOINT;

// GET ALL RESTAURANTS
export const getRestaurantsList = async (): Promise<Restaurant[] | null> => {
  return await fetcher<Restaurant[]>('/restaurant/getAllRestaurants');
};

// ** GENERAL DETAILS ** //

//  CREATE RESTAURANT GENERAL
export const createRestaurantGeneral = async (
  general: CreateRestaurantGeneralParams
): Promise<Restaurant | null> => {
  const newRestaurant = await fetcher<Restaurant>(
    `/hospitalityChain/${general?.hospitalityChainId}/restaurant`,
    {
      method: 'POST',
      body: general,
    }
  );

  if (newRestaurant) {
    revalidate(ROUTE_RESTAURANTS);
    return parseStringify(newRestaurant);
  }
  return null;
};

// GET RESTAURANT GENERAL
export const getRestaurantGeneral = async (
  hospitalityChainId: string,
  restaurantId: string
) => {
  return await fetcher<Restaurant>(
    `/hospitalityChain/${hospitalityChainId}/restaurant/${restaurantId}`,
    {
      method: 'GET',
    }
  );
};

//  UPDATE RESTAURANT DETAIL
export const updateRestaurantGeneral = async (
  id: string,
  data: CreateRestaurantGeneralParams
): Promise<Restaurant | null> => {
  const newRestaurant = await fetcher<Restaurant>(`/restaurant/${id}`, {
    method: 'PUT',
    body: data,
  });

  if (newRestaurant) {
    revalidate(ROUTE_RESTAURANTS);
    return parseStringify(newRestaurant);
  }
  return null;
};

// ** CUISINE & MENU ** //

// GET RESTAURANT CUISINE MENU
export const getRestaurantCuisineMenu = async (
  hospitalityChainId: string,
  restaurantId: string
) => {
  return await fetcher<CuisineMenu[]>(
    `/hospitalityChain/${hospitalityChainId}/restaurant/${restaurantId}/cuisineMenu/getAllCuisineForRestaurant`,
    {
      method: 'GET',
    }
  );
};

export const getRestaurantCuisineMenuById = async (
  hospitalityChainId: string,
  restaurantId: string,
  cuisineMenuId: string
) => {
  return await fetcher<CuisineMenu>(
    `/hospitalityChain/${hospitalityChainId}/restaurant/${restaurantId}/cuisineMenu/${cuisineMenuId}`,
    {
      method: 'GET',
    }
  );
};

//  CREATE RESTAURANT CUISINE MENU
export const createRestaurantCuisineMenu = async (
  general: CreateCuisineMenuParams
): Promise<CuisineMenu | null> => {
  const newRestaurant = await fetcher<CuisineMenu>(
    `/hospitalityChain/${general?.hospitalityChainId}/restaurant/${general?.restaurantId}/cuisineMenu`,
    {
      method: 'POST',
      body: general,
    }
  );

  if (newRestaurant) {
    revalidate(
      `ROUTE_RESTAURANTS/${general?.hospitalityChainId}/${general?.restaurantId}/cuisine-menu`
    );
    return parseStringify(newRestaurant);
  }
  return null;
};

//  UPDATE RESTAURANT CUISINE MENU
export const updateRestaurantCuisineMenu = async (
  id: string,
  general: CreateCuisineMenuParams
): Promise<Restaurant | null> => {
  const newRestaurant = await fetcher<Restaurant>(
    `/hospitalityChain/${general?.hospitalityChainId}/restaurant/${general?.restaurantId}/cuisineMenu/${id}`,
    {
      method: 'PUT',
      body: general,
    }
  );

  if (newRestaurant) {
    revalidate(
      `ROUTE_RESTAURANTS/${general?.hospitalityChainId}/${general?.restaurantId}/cuisine-menu`
    );
    return parseStringify(newRestaurant);
  }
  return null;
};

// ** DINING AREAS ** //

// GET RESTAURANT CUISINE MENU
export const getRestaurantDiningAreas = async (
  hospitalityChainId: string,
  restaurantId: string
) => {
  return await fetcher<DiningArea[]>(
    `/hospitalityChain/${hospitalityChainId}/restaurant/${restaurantId}/diningArea/getAllDiningAreaForRestaurant`,
    {
      method: 'GET',
    }
  );
};

//  CREATE RESTAURANT CUISINE MENU
export const createRestaurantDiningArea = async (
  general: CreateDiningParams
): Promise<DiningArea | null> => {
  const newDining = await fetcher<Restaurant>(
    `/hospitalityChain/${general?.hospitalityChainId}/restaurant/${general?.restaurantId}/diningArea`,
    {
      method: 'POST',
      body: general,
    }
  );

  if (newDining) {
    revalidate(
      `ROUTE_RESTAURANTS/${general?.hospitalityChainId}/${general?.restaurantId}/dining-areas`
    );
    return parseStringify(newDining);
  }
  return null;
};
