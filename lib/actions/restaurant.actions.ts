'use server';

import { ROUTE_RESTAURANTS } from '@/constants/routes';
import { handleError, parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';

const ENDPOINT = process.env.API_ENDPOINT;

// GET ALL RESTAURANTS
export const getRestaurantsList = async (): Promise<Restaurant[] | null> => {
  try {
    const response = await fetch(`${ENDPOINT}/restaurant/getAllRestaurants`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const { result }: { result: Restaurant[] } = await response.json();
    return result;
  } catch (error) {
    handleError('An error occurred while retrieving the restaurants', error);
    return null;
  }
};

//  CREATE RESTAURANT GENERAL
export const createRestaurantGeneral = async (
  general: CreateRestaurantGeneralParams
): Promise<Restaurant | null> => {
  try {
    const response = await fetch(`${ENDPOINT}/restaurant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(general),
    });
    if (!response.ok) {
      throw new Error(`Failed to create: ${response.statusText}`);
    }
    const newRestaurantGeneral: Restaurant = await response.json();

    revalidatePath(ROUTE_RESTAURANTS);
    return parseStringify(newRestaurantGeneral);
  } catch (error) {
    handleError(
      'An error occurred while creating a new restaurant (general)',
      error
    );
    return null;
  }
};

// GET RESTAURANT GENERAL
export const getRestaurantGeneral = async (restaurantId: string) => {
  try {
    const response = await fetch(`${ENDPOINT}/restaurant/${restaurantId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const { result }: { result: Restaurant } = await response.json();
    return result;
  } catch (error) {
    handleError(
      'An error occurred while retrieving the existing restaurant:',
      error
    );
  }
};

//  UPDATE RESTAURANT DETAIL
export const updateRestaurantGeneral = async (
  restaurantId: string,
  general: CreateRestaurantGeneralParams
) => {
  try {
    const response = await fetch(`${ENDPOINT}/restaurant/${restaurantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(general),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    revalidatePath(ROUTE_RESTAURANTS);
    return parseStringify(response);
  } catch (error) {
    handleError('An error occurred while updating a restaurant:', error);
  }
};
