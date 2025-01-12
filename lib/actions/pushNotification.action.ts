"use server";

import { handleError, parseStringify } from "../utils";
import {
  ROUTE_AUTO_NOTIFICATION,
  ROUTE_HOSPITAL_CHAIN,
  ROUTE_PUSH_NOTIFICATION,
} from "@/constants/routes";
import { fetcher, revalidate } from "./fetcher";

const ENDPOINT = process.env.API_ENDPOINT;

// GET ALL Notification List
export const getNotificationList = async (): Promise<
  NotificationType[] | null
> => {
  try {
    const response = await fetch(`${ENDPOINT}/notification/getAll/custom`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const { result }: { result: NotificationType[] } = await response.json();
    return result;
  } catch (error) {
    handleError(
      "An error occurred while retrieving the hospital chains",
      error
    );
    return null;
  }
};

// CREATE CUSTOM NOTIFICATION
export const createCustomNotification = async (
  data: CreateNotificationParams
): Promise<NotificationType | null> => {
  const newNotification = await fetcher<NotificationType>(
    "/notification/custom",
    {
      method: "POST",
      body: data,
    }
  );

  if (newNotification) {
    revalidate(ROUTE_PUSH_NOTIFICATION);
    return parseStringify(newNotification);
  }
  return null;
};

// GET NOTIFICATION
export const getNotification = async (id: string) => {
  return await fetcher<NotificationType>(`/notification/custom/${id}`, {
    method: "GET",
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
      method: "PUT",
      body: data,
    }
  );

  if (newRestaurant) {
    revalidate(ROUTE_HOSPITAL_CHAIN);
    return parseStringify(newRestaurant);
  }
  return null;
};

// GET ALL AUTOMATIC NOTIFICATION LIST
export const getAutoNotificationList = async (): Promise<
  AutoNotificationType[] | null
> => {
  try {
    const response = await fetch(`${ENDPOINT}/notification/getAll/automative`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const { result }: { result: AutoNotificationType[] } = await response.json();
    return result;
  } catch (error) {
    handleError(
      "An error occurred while retrieving the hospital chains",
      error
    );
    return null;
  }
};

// CREATE CUSTOM NOTIFICATION
export const createAutoNotification = async (
  data: CreateAutoNotificationParams
): Promise<AutoNotificationType | null> => {
  const newNotification = await fetcher<AutoNotificationType>(
    "/notification/automative",
    {
      method: "POST",
      body: data,
    }
  );

  if (newNotification) {
    revalidate(ROUTE_AUTO_NOTIFICATION);
    return parseStringify(newNotification);
  }
  return null;
};