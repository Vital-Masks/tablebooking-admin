"use server";
import { fetcher } from "./fetcher";

export const getCustomers = async (params: string): Promise<any[] | null> => {
  try {
    const result = await fetcher<Restaurant[]>('/guestUser/getAllGuestUsers?' + params, {
      revalidate: 3600, // Cache for 1 hour
      tags: ['customers'],
    });
    return result;
  } catch (error) {
    console.error('🚨 getCustomers error:', error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  return await fetcher<any>(`/guestUser/${id}`, {
    method: "GET",
    revalidate: 3600, // Cache for 1 hour
    tags: ['customers', `customer-${id}`],
  });
};

export const getUserByEmail = async (email: string) => {
  return await fetcher<any>(`/guestUser/email/${email}`, {
    method: "GET",
    revalidate: 3600, // Cache for 1 hour
    tags: ['customers', `customer-email-${email}`],
  });
};

export const createUser = async (data: any) => {
  const body = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };

  const res: any = await fetcher(`/guestUser`, requestOptions);

  if (res.status?.includes("Successfully")) {
    return {
      success: true,
      result: res.result,
    };
  }

  return { error: res.status };
};
