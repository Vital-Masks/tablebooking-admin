'use server';

import { fetcher } from './fetcher';

// GET ALL RESTAURANTS
export const getStats = async (queryParams: Record<string, any>): Promise<any[] | null> => {
    const queryString = new URLSearchParams(queryParams).toString();
    return await fetcher<any[]>(`/dashboard/stats?${queryString}`, {
        method: 'GET',
    });
};