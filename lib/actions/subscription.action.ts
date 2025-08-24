import { fetcher } from "./fetcher";

export const getAllRestaurantSubscriptions = async ({ restaurantId }: { restaurantId: string }) => {
    return await fetcher<DiningTiming[]>(
        `/restaurantSubscription/restaurant/${restaurantId}`,
        {
            method: 'GET',
        }
    );
};