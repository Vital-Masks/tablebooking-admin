'use server';

import { fetcher } from './fetcher';


export const getUserByEmail = async (email: string): Promise<any[] | null> => {
  const { result }: any = await fetcher<any[]>(`/guestUser/email/${email}`, {
    method: 'GET',
  });

  return result;
};

export const createUser = async (data: any) => {
    const body = JSON.stringify(data);
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body,
    };
  
    const res = await fetch(
      `${process.env.API_ENDPOINT}/guestUser`,
      requestOptions
    );
    const result = await res.json();
  
    if (result.status?.includes('Successfully')) {
      return result.result;
    }
  
    return { error: result.status };
  };