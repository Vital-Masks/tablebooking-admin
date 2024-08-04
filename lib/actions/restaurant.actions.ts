'use server';

import { ROUTE_RESTAURANTS } from '@/constants/routes';
import { handleError, parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';
import { fetcher, revalidate } from './fetcher';

const ENDPOINT = process.env.API_ENDPOINT;

// GET ALL RESTAURANTS
export const getRestaurantsList = async (): Promise<Restaurant[] | null> => {
  return await fetcher<Restaurant[]>('/restaurant/getAllRestaurants');
};

//  CREATE RESTAURANT GENERAL
export const createRestaurantGeneral = async (
  general: CreateRestaurantGeneralParams
): Promise<Restaurant | null> => {
  const newRestaurant = await fetcher<Restaurant>('/restaurant', {
    method: 'POST',
    body: general,
  });

  if (newRestaurant) {
    revalidate(ROUTE_RESTAURANTS);
    return parseStringify(newRestaurant);
  }
  return null;
};

// GET RESTAURANT GENERAL
export const getRestaurantGeneral = async (id: string) => {
  return await fetcher<Restaurant>(`/restaurant/${id}`, {
    method: 'GET',
  });
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
