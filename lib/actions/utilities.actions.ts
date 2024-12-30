'use server';

import { fetcher } from './fetcher';

// GET ALL RESTAURANTS
export const getUtilities = async (): Promise<any[] | null> => {
  return await fetcher<any[]>('/utils', {
    method: 'GET',
  });
};