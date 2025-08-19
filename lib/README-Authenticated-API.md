# Authenticated API Requests with Bearer Tokens

This project now automatically includes bearer tokens in all API requests. Here's how to use it:

## Server-Side API Calls (Server Components/Actions)

### Basic Usage
```typescript
import { fetcher } from '@/lib/actions/fetcher';

// All requests automatically include bearer token
const data = await fetcher('/api/users');
const user = await fetcher('/api/users/123');
const newUser = await fetcher('/api/users', {
  method: 'POST',
  body: { name: 'John', email: 'john@example.com' }
});
```

### Public Endpoints (No Auth Required)
```typescript
import { publicFetcher } from '@/lib/actions/fetcher';

// For endpoints that don't require authentication
const publicData = await publicFetcher('/api/public/data');
```

## Client-Side API Calls (React Components)

### Using the Hook
```typescript
import { useAuthenticatedFetch } from '@/lib/hooks/useAuthenticatedFetch';

function MyComponent() {
  const { fetchData, loading, error } = useAuthenticatedFetch({
    onSuccess: (data) => console.log('Success:', data),
    onError: (error) => console.error('Error:', error)
  });

  const handleFetch = async () => {
    const data = await fetchData('/api/users');
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

### Public Endpoints (Client-Side)
```typescript
const { fetchData } = useAuthenticatedFetch({ requireAuth: false });

const publicData = await fetchData('/api/public/data');
```

## Features

### Automatic Token Management
- ✅ Automatically includes `Authorization: Bearer <token>` header
- ✅ Handles 401 Unauthorized responses
- ✅ Redirects to login on authentication failures
- ✅ Supports both server-side and client-side requests

### Error Handling
- ✅ Automatic error logging
- ✅ 401 handling with redirect to login
- ✅ Graceful fallbacks for missing tokens

### Session Integration
- ✅ Uses session tokens from cookies (server-side)
- ✅ Uses localStorage tokens (client-side)
- ✅ Automatic token extraction and validation

## API Endpoint Configuration

Make sure your API endpoints expect the bearer token in the Authorization header:

```typescript
// Your API route should extract the token like this:
const authHeader = request.headers.get('authorization');
const token = authHeader?.replace('Bearer ', '');

if (!token) {
  return new Response('Unauthorized', { status: 401 });
}
```

## Security Notes

- Tokens are stored in httpOnly cookies for server-side access
- Tokens are also stored in localStorage for client-side access
- Automatic cleanup on logout
- Secure token transmission over HTTPS
