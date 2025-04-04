"use server";

import { handleError, parseStringify } from "../utils";
import {
  ROUTE_AUTO_NOTIFICATION,
  ROUTE_PROMO_CODE,
  ROUTE_PUSH_NOTIFICATION,
} from "@/constants/routes";
import { fetcher, revalidate } from "./fetcher";

const ENDPOINT = process.env.API_ENDPOINT;

export const notificationAction = async (
  body: CreateNotificationParams,
  id: string | null = null
) => {
  const url = id ? `/notification/custom/${id}` : `/notification/custom`;
  const method = id ? "PUT" : "POST";

  const newNotification = await fetcher<NotificationType>(url, {
    method,
    body,
  });

  if (newNotification) {
    revalidate(ROUTE_PUSH_NOTIFICATION);
    return parseStringify(newNotification);
  }
  return null;
};

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

// GET NOTIFICATION
export const getNotification = async (id: string) => {
  const result = await fetcher<NotificationType[]>(
    `/notification/custom/${id}`,
    {
      method: "GET",
    }
  );

  return result[0];
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
    const { result }: { result: AutoNotificationType[] } =
      await response.json();
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
export const autoNotificationAction = async (
  body: CreateAutoNotificationParams,
  id?: string
) => {
  const newNotification = await fetcher<NotificationType>(
    `/notification/automative${id ? "/" : ""}${id}`,
    {
      method: id ? "PUT" : "POST",
      body: body,
    }
  );

  if (newNotification) {
    revalidate(ROUTE_AUTO_NOTIFICATION);
    return parseStringify(newNotification);
  }
  return null;
};

// GET NOTIFICATION
export const getAutoNotification = async (id: string) => {
  const result = await fetcher<NotificationType[]>(
    `/notification/automative/${id}`,
    {
      method: "GET",
    }
  );

  return result[0];
};

// GET ALL Notification List
export const getPromoList = async (): Promise<any[] | null> => {
  try {
    const response = await fetch(`${ENDPOINT}/promocodes/getAllPromocodes`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const { result }: { result: any[] } = await response.json();
    return result;
  } catch (error) {
    handleError(
      "An error occurred while retrieving the hospital chains",
      error
    );
    return null;
  }
};

export const getPromo = async (id: string) => {
  return await fetcher<any>(`/promocodes/${id}`, {
    method: "GET",
  });
};

export const createPromoCodes = async (data: any): Promise<any | null> => {
  const newCode = await fetcher<any>("/promocodes", {
    method: "POST",
    body: data,
  });

  if (newCode) {
    revalidate(ROUTE_PROMO_CODE);
    return parseStringify(newCode);
  }
  return null;
};

export const updatePromoCode = async (
  id: string,
  data: any
): Promise<any | null> => {
  const newRestaurant = await fetcher<any>(`/promocodes/${id}`, {
    method: "PUT",
    body: data,
  });

  if (newRestaurant) {
    revalidate(ROUTE_PROMO_CODE);
    return parseStringify(newRestaurant);
  }
  return null;
};
