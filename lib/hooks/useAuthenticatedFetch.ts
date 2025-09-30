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
      // Check if session exists (client-side check)
      let hasSession = false;
      
      if (options.requireAuth !== false) {
        // Check if session cookie exists (we can't read httpOnly cookies client-side)
        // but we can check if the cookie exists
        const cookies = document.cookie.split(';');
        const sessionCookie = cookies.find(cookie => 
          cookie.trim().startsWith('session=')
        );
        
        hasSession = !!sessionCookie;

        if (!hasSession) {
          setError('No session found');
          router.push('/login');
          return null;
        }
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers as Record<string, string> || {}),
      };

      // Make request to your API endpoint that will handle authentication server-side
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: 'include', // Include cookies in request
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
