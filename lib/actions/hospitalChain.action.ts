"use server";

import { handleError, parseStringify } from "../utils";
import { ROUTE_HOSPITAL_CHAIN } from "@/constants/routes";
import { fetcher, revalidate } from "./fetcher";

const ENDPOINT = process.env.API_ENDPOINT;

// GET ALL HOSPITAL CHAINS
export const getHospitalChainList = async (): Promise<
  HospitalChain[] | null
> => {
  try {
    const response: any = await fetcher<HospitalChain[]>(
      `/hospitalityChain/getAllHospitalityChains`,
      {
        method: "GET",
      }
    );

    console.log("response >>>", response);

    if (response?.error) {
      throw new Error(`Failed to fetch: ${response.error}`);
    }

    return response;
  } catch (error) {
    handleError(
      "An error occurred while retrieving the hospital chains",
      error
    );
    return null;
  }
};

// CREATE HOSPITAL CHAIN
export const createHospitalChain = async (
  general: CreateHospitalChainParams
): Promise<HospitalChain | null> => {
  const newRestaurant = await fetcher<HospitalChain>("/hospitalityChain", {
    method: "POST",
    body: general,
  });

  if (newRestaurant) {
    revalidate(ROUTE_HOSPITAL_CHAIN);
    return parseStringify(newRestaurant);
  }
  return null;
};

// GET HOSPITAL CHAIN
export const getHospitalChain = async (id: string) => {
  return await fetcher<HospitalChain>(`/hospitalityChain/${id}`, {
    method: "GET",
  });
};

// UPDATE HOSPITAL CHAIN
export const updateHospitalChain = async (
  id: string,
  data: CreateHospitalChainParams
): Promise<HospitalChain | null> => {
  const newRestaurant = await fetcher<HospitalChain>(
    `/hospitalityChain/${id}`,
    {
      method: "PUT",
      body: data,
    }
  );

  if (newRestaurant) {
    revalidate(ROUTE_HOSPITAL_CHAIN);
    return parseStringify(newRestaurant);
  }
  return null;
};
