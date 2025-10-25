'use server';

import { fetcher } from './fetcher';

// GET ALL RESTAURANTS
export const getUtilities = async (): Promise<any[] | null> => {
  return await fetcher<any[]>('/utils', {
    method: 'GET',
    revalidate: 3600, // Cache for 1 hour
    tags: ['utilities'],
  });
};