import { fetcher, revalidate } from "./fetcher";

export const getAllRestaurantSubscriptions = async ({
  restaurantId,
}: {
  restaurantId: string;
}) => {
  return await fetcher<CreateSubscriptionParams[]>(
    `/restaurantSubscription/restaurant/${restaurantId}`,
    {
      method: "GET",
    }
  );
};

export const createSubscription = async (data: CreateSubscriptionParams) => {
  const result = await fetcher<CreateSubscriptionParams>(
    "/restaurantSubscription",
    {
      method: "POST",
      body: data,
    }
  );

  revalidate(`/restaurant/${data.restaurantId}/subscription`);
  return result;
};

export const updateSubscription = async (
  id: string,
  data: CreateSubscriptionParams
) => {
  const result = await fetcher<CreateSubscriptionParams>(
    `/restaurantSubscription/${id}`,
    {
      method: "PUT",
      body: data,
    }
  );

  revalidate(`/restaurant/${data.restaurantId}/subscription`);
  return result;
};
