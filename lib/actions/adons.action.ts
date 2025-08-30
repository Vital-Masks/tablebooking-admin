import { fetcher, revalidate } from "./fetcher";

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
    `/addon/restaurant/${restaurantId}`,
    {
      method: "GET",
    }
  );
};

export const getRestaurantAdonById = async ( adonId: string) => {
  return await fetcher<CreateAdonParams>(
    `/addon/restaurant/${adonId}`,
    {
      method: "GET",
    }
  );
};

export const createAdon = async (data: CreateAdonParams) => {
  const result = await fetcher<CreateAdonParams>(
    "/addon",
    {
      method: "POST",
      body: data,
    }
  );

  revalidate(`/restaurant/${data.restaurantId}/add-ons`);
  return result;
};

export const updateAdon = async (
  id: string,
  data: CreateAdonParams
) => {
  const result = await fetcher<CreateAdonParams>(
    `/addon/${id}`,
    {
      method: "PUT",
      body: data,
    }
  );

  revalidate(`/restaurant/${data.restaurantId}/add-ons`);
  return result;
};
