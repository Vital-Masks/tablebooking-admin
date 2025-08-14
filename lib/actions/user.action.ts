'use server';
import { fetcher } from './fetcher';
const ENDPOINT = process.env.API_ENDPOINT;

export const getCustomers = async (): Promise<any[] | null> => {
  const response = await fetch(`${ENDPOINT}/guestUser/getAllGuestUsers`);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  const { result }: { result: NotificationType[] } = await response.json();
  return result;
};

export const getUserById = async (id: string) => {
  return await fetcher<any>(`/guestUser/${id}`, {
    method: 'GET',
  });
};

export const getUserByEmail = async (email: string) => {
  return await fetcher<any>(`/guestUser/email/${email}`, {
    method: 'GET',
  });
};

export const createUser = async (data: any) => {
  const body = JSON.stringify(data);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  const res = await fetch(
    `${process.env.API_ENDPOINT}/guestUser`,
    requestOptions
  );
  const result = await res.json();

  if (result.status?.includes('Successfully')) {
    return {
      success: true,
      result: result.result,
    };
  }

  return { error: result.status };
};
