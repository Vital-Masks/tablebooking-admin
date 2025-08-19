import type { Metadata } from 'next';

// Base metadata configuration
const BASE_METADATA = {
  siteName: 'VReserve',
  description: 'VReserve Restaurant Reservation Management System',
  keywords: ['vreserve', 'restaurant', 'reservations', 'admin', 'management'],
  authors: [{ name: 'VReserve Team' }],
  creator: 'VReserve',
  publisher: 'VReserve',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    siteName: 'VReserve',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vreserve',
    creator: '@vreserve',
  },
};

// Utility function to generate consistent metadata
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  openGraph,
  twitter,
  ...rest
}: {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: Partial<Metadata['openGraph']>;
  twitter?: Partial<Metadata['twitter']>;
  [key: string]: any;
}): Metadata {
  const fullTitle = title.includes('•') ? title : `${title} • ${BASE_METADATA.siteName}`;
  const fullKeywords = [...BASE_METADATA.keywords, ...keywords];
  
  return {
    title: fullTitle,
    description,
    keywords: fullKeywords,
    authors: BASE_METADATA.authors,
    creator: BASE_METADATA.creator,
    publisher: BASE_METADATA.publisher,
    robots: BASE_METADATA.robots,
    openGraph: {
      ...BASE_METADATA.openGraph,
      title: fullTitle,
      description,
      ...openGraph,
    },
    twitter: {
      ...BASE_METADATA.twitter,
      title: fullTitle,
      description,
      ...twitter,
    },
    ...rest,
  };
}

// Predefined metadata for common pages
export const DASHBOARD_METADATA = generatePageMetadata({
  title: 'Home',
  description: 'VReserve Admin Dashboard - Manage reservations, restaurants, and system settings',
  keywords: ['dashboard', 'admin', 'reservations', 'restaurants'],
});

export const RESTAURANTS_METADATA = generatePageMetadata({
  title: 'Restaurants',
  description: 'Manage restaurants, dining areas, and restaurant settings in VReserve Admin',
  keywords: ['restaurants', 'dining areas', 'restaurant management'],
});

export const CUSTOMERS_METADATA = generatePageMetadata({
  title: 'Customers',
  description: 'Manage customer accounts, view customer data and reservations in VReserve Admin',
  keywords: ['customers', 'customer management', 'user accounts'],
});

export const RESERVATIONS_METADATA = generatePageMetadata({
  title: 'Reservations',
  description: 'View and manage restaurant reservations, booking details, and customer information in VReserve Admin',
  keywords: ['reservations', 'bookings', 'restaurant reservations', 'customer bookings'],
});

export const SETTINGS_METADATA = generatePageMetadata({
  title: 'Settings',
  description: 'Configure system settings, notifications, promocodes, and banner images in VReserve Admin',
  keywords: ['settings', 'notifications', 'promocodes', 'banner images', 'system configuration'],
});

// Function to generate restaurant-specific metadata
export function generateRestaurantMetadata(restaurantName: string, pageType: string = 'Details') {
  return generatePageMetadata({
    title: `${restaurantName} • ${pageType}`,
    description: `${pageType.toLowerCase()} for ${restaurantName} in VReserve Admin`,
    keywords: [restaurantName, 'restaurant', pageType.toLowerCase()],
  });
}

// Function to generate create/edit metadata
export function generateFormMetadata(action: 'Create' | 'Edit', itemType: string, itemName?: string) {
  const title = itemName 
    ? `${action} ${itemName}`
    : `${action} New ${itemType}`;
    
  const description = itemName
    ? `${action.toLowerCase()} ${itemName} ${itemType.toLowerCase()} in VReserve Admin`
    : `${action.toLowerCase()} a new ${itemType.toLowerCase()} in VReserve Admin`;
    
  return generatePageMetadata({
    title,
    description,
    keywords: [action.toLowerCase(), itemType.toLowerCase(), itemName].filter((item): item is string => Boolean(item)),
  });
}
