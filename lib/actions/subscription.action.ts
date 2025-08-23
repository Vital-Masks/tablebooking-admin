import { fetcher } from "./fetcher";

export const getAllRestaurantSubscriptions = async () => {
    return await fetcher<DiningTiming[]>(
        `/restaurantSubscription`,
        {
            method: 'GET',
        }
    );
};