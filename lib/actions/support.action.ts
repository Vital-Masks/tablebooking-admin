"use server";

import { handleError, parseStringify } from "../utils";
import { ROUTE_DEMO_INQUIRY } from "@/constants/routes";
import { fetcher, revalidate } from "./fetcher";

const ENDPOINT = process.env.API_ENDPOINT;

// GET ALL AUTOMATIC NOTIFICATION LIST
export const getInquiryList = async (): Promise<InquiryType[] | null> => {
  try {
    const response = await fetch(`${ENDPOINT}/demoInquiry/getAll`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const { result }: { result: InquiryType[] } = await response.json();
    return result;
  } catch (error) {
    handleError("An error occurred while retrieving the inquiry list", error);
    return null;
  }
};

// GET NOTIFICATION
export const getInquiry = async (id: string) => {
  const result = await fetcher<InquiryType[]>(`/demoInquiry/${id}`, {
    method: "GET",
  });

  return result?.[0];
};

export const createInquiry = async (
  data: any,
  id?: string
): Promise<any | null> => {
  try {
    const newCode = await fetcher<any>(
      `/demoInquiry${id ? "/" : ""}${id ?? ""}`,
      {
        method: id ? "PUT" : "POST",
        body: data,
      }
    );

    if (newCode) {
      revalidate(ROUTE_DEMO_INQUIRY);
      return parseStringify(newCode);
    }
    return null;
  } catch (error) {
    handleError("An error occurred while creating the inquiry", error);
    return null;
  }
};

// GET RESTAURANT INQUIRY
export const getRestaurantInquiryList = async (): Promise<
  RestaurantInquiryType[] | null
> => {
  try {
    const response = await fetch(
      `${ENDPOINT}/restaurantInquiry/getAllRestaurantInquirys`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const { result }: { result: RestaurantInquiryType[] } = await response.json();
    return result;
  } catch (error) {
    handleError("An error occurred while retrieving the inquiry list", error);
    return null;
  }
};

export const getRestaurantInquiry = async (id: string) => {
  const result = await fetcher<RestaurantInquiryType[]>(
    `/restaurantInquiry/${id}`,
    {
      method: "GET",
    }
  );

  return result;
};
