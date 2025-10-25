import { fetcher, revalidate } from "./fetcher";

export const getAllRSubscriptionPlans = async () => {
  return await fetcher<[]>(`/subscriptionPlans`, {
    method: "GET",
    revalidate: 3600, // Cache for 1 hour
    tags: ['subscription-plans'],
  });
};

export const getSubscriptionPlanById = async (id: string) => {
  return await fetcher<CreateSubscriptionParams>(`/subscriptionPlans/${id}`, {
    method: "GET",
    revalidate: 3600, // Cache for 1 hour
    tags: ['subscription-plans', `subscription-plan-${id}`],
  });
};


export const getAllRestaurantSubscriptions = async ({
  restaurantId,
}: {
  restaurantId: string;
}) => {
  return await fetcher<CreateSubscriptionParams[]>(
    `/restaurantSubscription/restaurant/${restaurantId}`,
    {
      method: "GET",
      revalidate: 3600, // Cache for 1 hour
      tags: [`restaurant-${restaurantId}-subscriptions`],
    }
  );
};

export const getRestaurantSubscriptionById = async (subscriptionId: string) => {
  return await fetcher<CreateSubscriptionParams>(
    `/restaurantSubscription/${subscriptionId}`,
    {
      method: "GET",
      revalidate: 3600, // Cache for 1 hour
      tags: ['restaurant-subscriptions', `restaurant-subscription-${subscriptionId}`],
    }
  );
};

export const createSubscription = async (data: CreateSubscriptionParams) => {
  const result: any = await fetcher<CreateSubscriptionParams>(
    "/restaurantSubscription",
    {
      method: "POST",
      body: data,
    }
  );

  revalidate(`/restaurant/${data.restaurantId}/subscription`);
  if (!result.error) {
    return { success: true, result };
  }
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
