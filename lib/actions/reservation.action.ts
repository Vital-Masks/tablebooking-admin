'use server';

import { ROUTE_RESTAURANTS } from '@/constants/routes';
import { handleError, parseStringify } from '../utils';
import { fetcher, revalidate } from './fetcher';

const ENDPOINT = process.env.API_ENDPOINT;

// GET ALL RESERVATIONS
export const getReservationList = async (restaurantId: string): Promise<
    Reservation[] | null
> => {
    try {
        const response = await fetch(
            `${ENDPOINT}/restaurant/${restaurantId}/reservation/getAllForRestaurant`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const { result }: { result: Reservation[] } = await response.json();
        return result;
    } catch (error) {
        handleError(
            'An error occurred while retrieving the hospital chains',
            error
        );
        return null;
    }
};

export const getReservation = async (id: string) => {
    return await fetcher<Reservation>(`/reservation/${id}`, {
        method: 'GET',
    });
};

//  CREATE RESERVATION
export const createReservation = async (
    body: any
): Promise<Reservation | null> => {
    const newReservation = await fetcher<Reservation>(
        `/restaurant/${body.restaurant}/reservation`,
        {
            method: 'POST',
            body: body,
        }
    );

    if (newReservation) {
        revalidate(ROUTE_RESTAURANTS);
        return parseStringify(newReservation);
    }
    return null;
};
