// export const menuItems: MenuItem[] = []

import { IconCoffee, IconMenuCalendar, IconMenuDashboard } from '@/components/Icons';
import { ROUTE_DASHBOARD, ROUTE_RESERVATIONS, ROUTE_RESTAURANTS } from '../routes';

export const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    Icon: IconMenuDashboard,
    childItems: [],
    route: ROUTE_DASHBOARD,
  },
  {
    id: 'restaurants',
    title: 'Restaurants',
    Icon: IconCoffee,
    childItems: [
      {
        id: 'restaurant1',
        route: ROUTE_RESTAURANTS,
        title: 'Restaurant 1',
      },
    ],
    route: ROUTE_RESTAURANTS,
  },
  {
    id: 'reservations',
    title: 'Reservations',
    Icon: IconMenuCalendar,
    childItems: [],
    route: ROUTE_RESERVATIONS,
  },
];
