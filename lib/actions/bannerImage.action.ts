"use server";

import { handleError, parseStringify } from "../utils";
import {
  ROUTE_AUTO_NOTIFICATION,
  ROUTE_BANNER_IMAGE,
  ROUTE_PROMO_CODE
} from "@/constants/routes";
import { fetcher, revalidate } from "./fetcher";

const ENDPOINT = process.env.API_ENDPOINT;

export const bannerImageAction = async (body: any, id?: string) => {
  const newBanner = await fetcher(`/bannerImages${id ? "/" : ""}${id ?? ""}`, {
    method: id ? "PUT" : "POST",
    body: body,
  });

  if (newBanner) {
    revalidate(ROUTE_BANNER_IMAGE);
    return parseStringify(newBanner);
  }
  return null;
};

// GET ALL Notification List
export const getBannerImageList = async () => {
  try {
    const response = await fetch(`${ENDPOINT}/bannerImages/getAllBannerImages`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const { result } = await response.json();
    return result;
  } catch (error) {
    handleError(
      "An error occurred while retrieving the hospital chains",
      error
    );
    return null;
  }
};

// GET NOTIFICATION
export const getBannerImage = async (id: string) => {
  const result: any = await fetcher(
    `/bannerImages/${id}`,
    {
      method: "GET",
    }
  );

  return result;
};