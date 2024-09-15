'use server';

import { ROUTE_RESTAURANTS } from '@/constants/routes';
import { parseStringify } from '../utils';
import { fetcher, revalidate } from './fetcher';

const ENDPOINT = process.env.API_ENDPOINT;

// GET ALL RESTAURANTS
export const getRestaurantsList = async (): Promise<Restaurant[] | null> => {
  return await fetcher<Restaurant[]>('/restaurant/getAllRestaurants');
};

// ********************* //
// ** GENERAL DETAILS ** //
// ********************* //

//  CREATE RESTAURANT GENERAL
export const createRestaurantGeneral = async (
  body: CreateRestaurantGeneralParams
): Promise<Restaurant | null> => {
  const newRestaurant = await fetcher<Restaurant>(
    `/hospitalityChain/${body?.hospitalityChainId}/restaurant`,
    {
      method: 'POST',
      body: body,
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
    `/restaurant/${restaurantId}`,
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

// ********************* //
// ** CUISINE & MENU ** //
// ********************* //

// GET RESTAURANT CUISINE MENU
export const getRestaurantCuisineMenu = async (
  hospitalityChainId: string,
  restaurantId: string
) => {
  return await fetcher<CuisineMenu[]>(
    `/restaurant/${restaurantId}/cuisineMenu/getAllCuisineForRestaurant`,
    {
      method: 'GET',
    }
  );
};

// GET RESTAURANT CUISINE MENU BY ID
export const getRestaurantCuisineMenuById = async (
  hospitalityChainId: string,
  restaurantId: string,
  cuisineMenuId: string
) => {
  return await fetcher<CuisineMenu>(
    `/restaurant/${restaurantId}/cuisineMenu/${cuisineMenuId}`,
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
      `${ROUTE_RESTAURANTS}/${general?.hospitalityChainId}/${general?.restaurantId}/cuisine-menu`
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
      `${ROUTE_RESTAURANTS}/${general?.hospitalityChainId}/${general?.restaurantId}/cuisine-menu`
    );
    return parseStringify(newRestaurant);
  }
  return null;
};

// ********************* //
// ** DINING TIMIMG ** //
// ********************* //
export const getRestaurantDiningTiming = async (
  hospitalityChainId: string,
  restaurantId: string
) => {
  return await fetcher<DiningTiming[]>(
    `/restaurant/${restaurantId}/diningTiming/getAllDiningTimingForRestaurant`,
    {
      method: 'GET',
    }
  );
};

// GET RESTAURANT CUISINE MENU BY ID
export const getRestaurantDiningTimingById = async (
  hospitalityChainId: string,
  restaurantId: string,
  cuisineMenuId: string
) => {
  return await fetcher<CuisineMenu>(
    `/restaurant/${restaurantId}/diningTiming/${cuisineMenuId}`,
    {
      method: 'GET',
    }
  );
};

//  CREATE RESTAURANT CUISINE MENU
export const createDiningTiming = async (
  general: CreateDiningParams
): Promise<DiningTiming | null> => {

  const newRestaurant = await fetcher<DiningTiming>(
    `/restaurant/${general?.restaurantId}/diningTiming`,
    {
      method: 'POST',
      body: general,
    }
  );

  if (newRestaurant) {
    revalidate(
      `${ROUTE_RESTAURANTS}/${general?.hospitalityChainId}/${general?.restaurantId}/dining-timings`
    );
    return parseStringify(newRestaurant);
  }
  return null;
};

//  UPDATE RESTAURANT CUISINE MENU
export const updateDiningTiming = async (
  id: string,
  general: CreateDiningParams
): Promise<DiningTiming | null> => {
  const newRestaurant = await fetcher<DiningTiming>(
    `/hospitalityChain/${general?.hospitalityChainId}/restaurant/${general?.restaurantId}/diningTiming/${id}`,
    {
      method: 'PUT',
      body: general,
    }
  );

  if (newRestaurant) {
    revalidate(
      `${ROUTE_RESTAURANTS}/${general?.hospitalityChainId}/${general?.restaurantId}/dining-timings`
    );
    return parseStringify(newRestaurant);
  }
  return null;
};

// ********************* //
// ** DINING AREAS ** //
// ********************* //

// GET RESTAURANT CUISINE MENU
export const getRestaurantDiningAreas = async (
  hospitalityChainId: string,
  restaurantId: string
) => {
  return await fetcher<DiningArea[]>(
    `/restaurant/${restaurantId}/diningArea/getAllDiningAreaForRestaurant`,
    {
      method: 'GET',
    }
  );
};

// GET RESTAURANT CUISINE MENU BY ID
export const getRestaurantDiningAreaById = async (
  hospitalityChainId: string,
  restaurantId: string,
  diningId: string
) => {
  return await fetcher<DiningArea>(
    `/restaurant/${restaurantId}/diningArea/${diningId}`,
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

//  UPDATE RESTAURANT CUISINE MENU
export const updateRestaurantDiningArea = async (
  id: string,
  general: CreateDiningParams
): Promise<DiningArea | null> => {
  const newRestaurant = await fetcher<DiningArea>(
    `/hospitalityChain/${general?.hospitalityChainId}/restaurant/${general?.restaurantId}/diningArea/${id}`,
    {
      method: 'PUT',
      body: general,
    }
  );

  if (newRestaurant) {
    revalidate(
      `${ROUTE_RESTAURANTS}/${general?.hospitalityChainId}/${general?.restaurantId}/dining-areas`
    );
    return parseStringify(newRestaurant);
  }
  return null;
};

// ********************* //
// ** USER ROLES ** //
// ********************* //

// GET RESTAURANT USER ROLES
export const getRestaurantUserRoles = async (
  hospitalityChainId: string,
  restaurantId: string
) => {
  return await fetcher<UserRole[]>(
    `/restaurant/${restaurantId}/userRole/getAllUserRolesForRestaurant`,
    {
      method: 'GET',
    }
  );
};

// GET RESTAURANT CUISINE MENU BY ID
export const getRestaurantUserRoleById = async (
  hospitalityChainId: string,
  restaurantId: string,
  userRoleId: string
) => {
  return await fetcher<UserRole>(
    `/restaurant/${restaurantId}/userRole/${userRoleId}`,
    {
      method: 'GET',
    }
  );
};

//  CREATE RESTAURANT CUISINE MENU
export const createUserRoles = async (
  general: UserRolesParams
): Promise<UserRole | null> => {
  const newDining = await fetcher<UserRole>(
    `/hospitalityChain/${general?.hospitalityChainId}/restaurant/${general?.restaurantId}/userRole`,
    {
      method: 'POST',
      body: general,
    }
  );

  if (newDining) {
    revalidate(
      `ROUTE_RESTAURANTS/${general?.hospitalityChainId}/${general?.restaurantId}/user-roles`
    );
    return parseStringify(newDining);
  }
  return null;
};

export const updateUserRoles = async (
  id: string,
  general: UserRolesParams
): Promise<UserRole | null> => {
  const newRestaurant = await fetcher<UserRole>(
    `/hospitalityChain/${general?.hospitalityChainId}/restaurant/${general?.restaurantId}/userRole/${id}`,
    {
      method: 'PUT',
      body: general,
    }
  );

  if (newRestaurant) {
    revalidate(
      `${ROUTE_RESTAURANTS}/${general?.hospitalityChainId}/${general?.restaurantId}/user-roles`
    );
    return parseStringify(newRestaurant);
  }
  return null;
};
