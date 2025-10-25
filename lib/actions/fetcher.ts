"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../session";

const ENDPOINT = process.env.API_ENDPOINT;

export interface FetcherOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any;
  requireAuth?: boolean; // Set to false if the endpoint doesn't require authentication
  revalidate?: number | false; // Next.js revalidation time in seconds, false for no cache
  tags?: string[]; // Next.js cache tags for on-demand revalidation
}

export async function fetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T | null> {
  try {
    const {
      method = "GET",
      body,
      requireAuth = true,
      revalidate,
      tags,
      ...restOptions
    } = options;

    // Get session to extract access token
    let accessToken: string | undefined;
    if (requireAuth) {
      const session = await getSession();
      accessToken = session?.accessToken;

      if (!accessToken) {
        console.error("🚨 No access token found in session");
        return null;
      }
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...restOptions.headers,
    };

    // Add bearer token if available
    if (accessToken) {
      (headers as Record<string, string>)["Authorization"] =
        `Bearer ${accessToken}`;
    }

    const fetchOptions: RequestInit = {
      ...restOptions,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    // Add Next.js cache configuration
    if (revalidate !== undefined || tags) {
      fetchOptions.next = {
        ...(revalidate !== undefined && { revalidate }),
        ...(tags && { tags }),
      };
    }
    
    const response = await fetch(ENDPOINT + url, fetchOptions);
   
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`🚨 Response Error: ${response.status}`, errorData);

      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401 && requireAuth) {
        console.error("🚨 Unauthorized - token may be expired");
        // You could redirect to login here if needed
      }
      return errorData; // Return error data instead of throwing
    }

    const responseText = await response.text();
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('🚨 Failed to parse JSON response:', parseError);
      return null;
    }

    // Check if response has 'result' property
    if (responseData && typeof responseData === 'object' && 'result' in responseData) {
      return responseData.result;
    } else {
      console.log('🔍 No result property found, returning entire response:', responseData);
      return responseData;
    }
  } catch (error) {
    console.error("🚨 Fetch error:", error);
    return null;
  }
}

// Helper function for public endpoints (no auth required)
export async function publicFetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T | null> {
  return fetcher<T>(url, { ...options, requireAuth: false });
}

export async function revalidate(route: string) {
  revalidatePath(route, "page");
}
