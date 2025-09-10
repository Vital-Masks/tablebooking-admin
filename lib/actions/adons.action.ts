import { fetcher, revalidate } from "./fetcher";

export const getAllAdonsPlans = async () => {
  return await fetcher<[]>(`/addonPlan`, {
    method: "GET",
  });
};

export const getAdonPlanById = async (id: string) => {
  return await fetcher<[]>(`/addonPlan/${id}`, {
    method: "GET",
  });
};

export const getAllRAdons = async () => {
  return await fetcher<[]>(`/addon`, {
    method: "GET",
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
    }
  );
};

export const getRestaurantAdonById = async (adonId: string) => {
  return await fetcher<CreateAdonParams>(`/restaurantAddon/${adonId}`, {
    method: "GET",
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
