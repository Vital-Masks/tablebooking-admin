'use server';

import { handleError, parseStringify } from '../utils';
import { ROUTE_HOSPITAL_CHAIN } from '@/constants/routes';
import { fetcher, revalidate } from './fetcher';

const ENDPOINT = process.env.API_ENDPOINT;



// GET ALL Notification List
export const getNotificationList = async (): Promise<
NotificationType[] | null
> => {
  try {
    const response = await fetch(
      `${ENDPOINT}/notification/getAll/custom`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const { result }: { result: NotificationType[] } = await response.json();
    return result;
  } catch (error) {
    handleError(
      'An error occurred while retrieving the hospital chains',
      error
    );
    return null;
  }
};

// CREATE CUSTOM NOTIFICATION
export const createCustomNotification = async (
  general: CreateNotificationParams
): Promise<NotificationType | null> => {
  const newRestaurant = await fetcher<NotificationType>('/hospitalityChain', {
    method: 'POST',
    body: general,
  });

  if (newRestaurant) {
    revalidate(ROUTE_HOSPITAL_CHAIN);
    return parseStringify(newRestaurant);
  }
  return null;
};

// GET HOSPITAL CHAIN
export const getHospitalChain = async (id: string) => {
  return await fetcher<HospitalChain>(`/hospitalityChain/${id}`, {
    method: 'GET',
  });
};

// UPDATE HOSPITAL CHAIN
export const updateHospitalChain = async (
  id: string,
  data: CreateHospitalChainParams
): Promise<HospitalChain | null> => {
  const newRestaurant = await fetcher<HospitalChain>(
    `/hospitalityChain/${id}`,
    {
      method: 'PUT',
      body: data,
    }
  );

  if (newRestaurant) {
    revalidate(ROUTE_HOSPITAL_CHAIN);
    return parseStringify(newRestaurant);
  }
  return null;
};
