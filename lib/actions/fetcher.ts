import { revalidatePath } from 'next/cache';
const ENDPOINT = process.env.API_ENDPOINT;

export interface FetcherOptions extends RequestInit {
  headers?: HeadersInit;
  body?: any;
}

export async function fetcher<T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T | null> {
  try {
    const { method = 'GET', body, ...restOptions } = options;

    const fetchOptions: RequestInit = {
      ...restOptions,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...restOptions.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(ENDPOINT + url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🚨 Response Error: ${response.status} ${errorText}`);
      return null;
    }

    const { result } = await response.json();
    return await result;
  } catch (error) {
    console.error('🚨 Fetch error:', error);
    return null;
  }
}

export function revalidate(route: string) {
  revalidatePath(route, 'page');
}
