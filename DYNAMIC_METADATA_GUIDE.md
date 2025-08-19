# Dynamic Metadata Implementation Guide

This guide shows how to implement dynamic metadata per page in your Next.js 13+ App Router application.

## Overview

Dynamic metadata allows you to:
- Set unique titles and descriptions for each page
- Include page-specific keywords and Open Graph data
- Use dynamic data from API calls or URL parameters
- Improve SEO and social media sharing

## Important: Client vs Server Components

**`generateMetadata` can only be exported from server components.** If your page uses `'use client'`, you need to:

1. **Convert the page to a server component** (remove `'use client'`)
2. **Move client-side logic** (state, event handlers) to a separate client component
3. **Import the client component** in your server component page

### Example: Converting a Client Component

**Before (❌ Won't work):**
```typescript
'use client';
import { useState } from 'react';

export const generateMetadata = async () => ({ title: 'Page' }); // ❌ Error!

export default function Page() {
  const [state, setState] = useState(false);
  // ... client-side logic
}
```

**After (✅ Works):**
```typescript
// page.tsx (Server Component)
import { DASHBOARD_METADATA } from '@/lib/metadata';
import PageContent from '@/components/Pages/PageContent';

export const generateMetadata = async () => DASHBOARD_METADATA;

export default function Page() {
  return <PageContent />;
}
```

```typescript
// components/Pages/PageContent.tsx (Client Component)
'use client';
import { useState } from 'react';

export default function PageContent() {
  const [state, setState] = useState(false);
  // ... client-side logic
}
```

## Implementation Patterns

### 1. Using Utility Functions (Recommended)

For consistent metadata across your application, use the utility functions:

```typescript
import { DASHBOARD_METADATA, generateRestaurantMetadata } from '@/lib/metadata';

// For static pages
export const generateMetadata = async () => DASHBOARD_METADATA;

// For dynamic pages with restaurant data
export const generateMetadata = async ({ params }: { params: { restaurantId: string } }) => {
  const restaurantData = await getRestaurantData(params.restaurantId);
  return generateRestaurantMetadata(restaurantData.name, 'Reservations');
};
```

### 2. Basic Static Metadata

For pages with static metadata:

```typescript
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Page Title • VReserve Admin',
    description: 'Page description for SEO',
    keywords: ['keyword1', 'keyword2', 'vreserve', 'admin'],
    openGraph: {
      title: 'Page Title • VReserve Admin',
      description: 'Page description for social sharing',
      type: 'website',
    },
  };
};
```

### 3. Dynamic Metadata with URL Parameters

For pages with dynamic routes (e.g., `[restaurantId]`):

```typescript
import type { Metadata } from 'next';

export const generateMetadata = async ({ 
  params 
}: { 
  params: { restaurantId: string } 
}): Promise<Metadata> => {
  const restaurantId = params.restaurantId;
  
  // Handle special cases
  if (restaurantId === 'c') {
    return {
      title: 'Create New Restaurant • VReserve Admin',
      description: 'Create a new restaurant in VReserve Admin',
    };
  }

  // Fetch data and create dynamic metadata
  try {
    const restaurantData = await getRestaurantData(restaurantId);
    return {
      title: `${restaurantData.name} • Details • VReserve Admin`,
      description: `Manage ${restaurantData.name} settings and configurations`,
      keywords: [restaurantData.name, 'restaurant', 'management', 'vreserve'],
    };
  } catch (error) {
    // Fallback metadata
    return {
      title: 'Restaurant Details • VReserve Admin',
      description: 'Manage restaurant settings and configurations',
    };
  }
};
```

### 4. Dynamic Metadata with Search Parameters

For pages that use search parameters:

```typescript
import type { Metadata } from 'next';

export const generateMetadata = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}): Promise<Metadata> => {
  const editId = searchParams.edit as string;
  
  if (editId) {
    // Fetch data for editing
    const itemData = await getItemData(editId);
    return {
      title: `Edit ${itemData.name} • VReserve Admin`,
      description: `Edit ${itemData.name} details and settings`,
    };
  }
  
  return {
    title: 'Create New Item • VReserve Admin',
    description: 'Create a new item in the system',
  };
};
```

### 5. Combined Parameters and Search Params

For pages with both route parameters and search parameters:

```typescript
import type { Metadata } from 'next';

export const generateMetadata = async ({ 
  params, 
  searchParams 
}: { 
  params: { restaurantId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> => {
  const restaurantId = params.restaurantId;
  const editId = searchParams.edit as string;
  
  if (restaurantId === 'c') {
    return {
      title: 'Create New Restaurant • VReserve Admin',
      description: 'Create a new restaurant with all settings',
    };
  }
  
  if (editId) {
    const editData = await getEditData(editId);
    return {
      title: `Edit ${editData.name} • ${restaurantId} • VReserve Admin`,
      description: `Edit ${editData.name} for restaurant ${restaurantId}`,
    };
  }
  
  const restaurantData = await getRestaurantData(restaurantId);
  return {
    title: `${restaurantData.name} • VReserve Admin`,
    description: `Manage ${restaurantData.name} settings and configurations`,
  };
};
```

## Utility Functions

### Available Predefined Metadata

```typescript
import { 
  DASHBOARD_METADATA,
  RESTAURANTS_METADATA,
  CUSTOMERS_METADATA,
  RESERVATIONS_METADATA,
  SETTINGS_METADATA
} from '@/lib/metadata';

// Use directly for static pages
export const generateMetadata = async () => DASHBOARD_METADATA;
```

### Custom Metadata Generation

```typescript
import { generatePageMetadata, generateRestaurantMetadata, generateFormMetadata } from '@/lib/metadata';

// Custom page metadata
export const generateMetadata = async () => {
  return generatePageMetadata({
    title: 'Custom Page',
    description: 'Custom page description',
    keywords: ['custom', 'page'],
  });
};

// Restaurant-specific metadata
export const generateMetadata = async ({ params }) => {
  const restaurantData = await getRestaurantData(params.restaurantId);
  return generateRestaurantMetadata(restaurantData.name, 'Reservations');
};

// Form metadata (create/edit)
export const generateMetadata = async ({ searchParams }) => {
  const editId = searchParams.edit;
  if (editId) {
    const itemData = await getItemData(editId);
    return generateFormMetadata('Edit', 'Restaurant', itemData.name);
  }
  return generateFormMetadata('Create', 'Restaurant');
};
```

## Metadata Properties

### Core Properties

```typescript
{
  title: string,                    // Page title
  description: string,              // Meta description
  keywords: string[],               // Meta keywords
  authors: string[],                // Page authors
  creator: string,                  // Content creator
  publisher: string,                // Content publisher
  robots: string,                   // Robots meta tag
  alternates: {                     // Alternative versions
    canonical: string,
    languages: { [key: string]: string }
  }
}
```

### Open Graph Properties

```typescript
{
  openGraph: {
    title: string,                  // OG title
    description: string,            // OG description
    url: string,                    // OG URL
    siteName: string,               // Site name
    images: [                       // OG images
      {
        url: string,
        width: number,
        height: number,
        alt: string,
      }
    ],
    locale: string,                 // Content locale
    type: string,                   // Content type
  }
}
```

### Twitter Card Properties

```typescript
{
  twitter: {
    card: 'summary_large_image',
    title: string,
    description: string,
    images: [string],
    creator: string,
    site: string,
  }
}
```

## Examples from Your Application

### Dashboard Page (Using Utility)
```typescript
import { DASHBOARD_METADATA } from '@/lib/metadata';
import DashboardContent from '@/components/Pages/DashboardPage/DashboardContent';

export const generateMetadata = async () => DASHBOARD_METADATA;

export default function Home() {
  return <DashboardContent />;
}
```

### Restaurant Details Page (Dynamic)
```typescript
import { generateRestaurantMetadata } from '@/lib/metadata';

export const generateMetadata = async ({ params }: { params: { restaurantId: string } }) => {
  const restaurantId = params.restaurantId;
  
  if (restaurantId === 'c') {
    return generateFormMetadata('Create', 'Restaurant');
  }

  try {
    const generalDetails = await getRestaurantGeneral(restaurantId);
    const restaurantName = generalDetails?.name || 'Restaurant';
    return generateRestaurantMetadata(restaurantName, 'General Details');
  } catch (error) {
    return generateRestaurantMetadata('Restaurant', 'General Details');
  }
};
```

## Best Practices

1. **Use utility functions** for consistent metadata across your application
2. **Always provide fallback metadata** for error cases
3. **Use descriptive titles** that include the page purpose
4. **Keep descriptions under 160 characters** for optimal SEO
5. **Include relevant keywords** but avoid keyword stuffing
6. **Use consistent branding** in titles (e.g., "• VReserve Admin")
7. **Handle loading states** gracefully with fallback metadata
8. **Test metadata** with social media debugging tools
9. **Separate client and server components** when using `generateMetadata`

## Common Issues and Solutions

### Issue: "You are attempting to export 'generateMetadata' from a component marked with 'use client'"

**Solution:** Convert the page to a server component and move client-side logic to a separate component.

```typescript
// ❌ Wrong - Client component with metadata
'use client';
export const generateMetadata = async () => ({ title: 'Page' });

// ✅ Correct - Server component with client component import
import PageContent from '@/components/PageContent';
export const generateMetadata = async () => ({ title: 'Page' });
export default function Page() {
  return <PageContent />;
}
```

## Testing

Use these tools to test your metadata:
- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Post Inspector
- Google Rich Results Test

## Migration Notes

- Remove static `metadata` exports from layout files
- Add `generateMetadata` functions to individual pages
- Use utility functions for consistency
- Ensure all pages have appropriate metadata
- Test SEO and social sharing for each page
- Convert client components to server components when adding metadata
