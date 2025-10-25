import { fetcher, revalidate } from "./fetcher";

export const getAllAdonsPlans = async () => {
  return await fetcher<[]>(`/addonPlan`, {
    method: "GET",
    revalidate: 3600, // Cache for 1 hour
    tags: ['addon-plans'],
  });
};

export const getAdonPlanById = async (id: string) => {
  return await fetcher<[]>(`/addonPlan/${id}`, {
    method: "GET",
    revalidate: 3600, // Cache for 1 hour
    tags: ['addon-plans', `addon-plan-${id}`],
  });
};

export const getAllRAdons = async () => {
  return await fetcher<[]>(`/addon`, {
    method: "GET",
    revalidate: 3600, // Cache for 1 hour
    tags: ['addons'],
  });
};

export const getAllRestaurantAdons = async ({
  restaurantId,
}: {
  restaurantId: string;
}) => {
  return await fetcher<CreateAdonParams[]>(
    `/restaurantAddon/restaurant/${restaurantId}`,
    {
      method: "GET",
      revalidate: 3600, // Cache for 1 hour
      tags: [`restaurant-${restaurantId}-addons`],
    }
  );
};

export const getRestaurantAdonById = async (adonId: string) => {
  return await fetcher<CreateAdonParams>(`/restaurantAddon/${adonId}`, {
    method: "GET",
    revalidate: 3600, // Cache for 1 hour
    tags: ['restaurant-addons', `restaurant-addon-${adonId}`],
  });
};

export const createAdon = async (data: CreateAdonParams) => {
  const result = await fetcher<CreateAdonParams>("/restaurantAddon", {
    method: "POST",
    body: data,
  });

  revalidate(`/restaurant/${data.restaurantid}/add-ons`);
  return result;
};

export const updateAdon = async (id: string, data: CreateAdonParams) => {
  const result = await fetcher<CreateAdonParams>(`/restaurantAddon/${id}`, {
    method: "PUT",
    body: data,
  });

  revalidate(`/restaurant/${data.restaurantid}/add-ons`);
  return result;
};
