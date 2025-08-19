'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface UseAuthenticatedFetchOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  requireAuth?: boolean;
}

export function useAuthenticatedFetch(options: UseAuthenticatedFetchOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = useCallback(async <T>(
    url: string,
    fetchOptions: RequestInit = {}
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      // Get access token from localStorage or cookies
      let accessToken: string | undefined;
      
      if (options.requireAuth !== false) {
        // Try to get token from localStorage first
        accessToken = localStorage.getItem('accessToken') || undefined;
        
        // If not in localStorage, try to get from cookies (client-side)
        if (!accessToken) {
          const cookies = document.cookie.split(';');
          const accessTokenCookie = cookies.find(cookie => 
            cookie.trim().startsWith('accessToken=')
          );
          if (accessTokenCookie) {
            accessToken = accessTokenCookie.split('=')[1];
          }
        }

        if (!accessToken) {
          setError('No access token found');
          router.push('/login');
          return null;
        }
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      };

      // Add bearer token if available
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401 && options.requireAuth !== false) {
          setError('Unauthorized - please login again');
          router.push('/login');
          return null;
        }
        
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      if (options.onSuccess) {
        options.onSuccess(data);
      }
      
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      
      if (options.onError) {
        options.onError(err);
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [options, router]);

  return {
    fetchData,
    loading,
    error,
    clearError: () => setError(null),
  };
}
