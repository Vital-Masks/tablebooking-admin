"use server";
import { fetcher } from "./fetcher";

export const getCustomers = async (): Promise<any[] | null> => {
  const response: any = await fetcher(`/guestUser/getAllGuestUsers`);
  if (response.error) {
    throw new Error(`Failed to fetch: ${response.error}`);
  }
  return response;
};

export const getUserById = async (id: string) => {
  return await fetcher<any>(`/guestUser/${id}`, {
    method: "GET",
  });
};

export const getUserByEmail = async (email: string) => {
  return await fetcher<any>(`/guestUser/email/${email}`, {
    method: "GET",
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
