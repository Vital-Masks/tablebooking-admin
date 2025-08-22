import { revalidatePath } from 'next/cache';
import { getSession } from '../session';

const ENDPOINT = process.env.API_ENDPOINT;

export interface FetcherOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any;
  requireAuth?: boolean; // Set to false if the endpoint doesn't require authentication
}

export async function fetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T | null> {
  try {
    const { method = 'GET', body, requireAuth = true, ...restOptions } = options;

    // Get session to extract access token
    let accessToken: string | undefined;
    if (requireAuth) {
      const session = await getSession();
      accessToken = session?.accessToken;

      if (!accessToken) {
        console.error('🚨 No access token found in session');
        return null;
      }
    }



    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...restOptions.headers,
    };

    // Add bearer token if available
    if (accessToken) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
    }

    const fetchOptions: RequestInit = {
      ...restOptions,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(ENDPOINT + url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🚨 Response Error: ${response.status} ${errorText}`);

      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401 && requireAuth) {
        console.error('🚨 Unauthorized - token may be expired');
        // You could redirect to login here if needed
      }

      return null;
    }

    const { result } = await response.json();
    return await result;
  } catch (error) {
    console.error('🚨 Fetch error:', error);
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

export function revalidate(route: string) {
  revalidatePath(route, 'page');
}
