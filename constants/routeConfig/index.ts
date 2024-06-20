// export const menuItems: MenuItem[] = []

import { IconCoffee, IconMenuCalendar, IconMenuDashboard } from '@/components/Icons';
import { ROUTE_DASHBOARD, ROUTE_RESERVATIONS, ROUTE_RESTAURANTS, ROUTE_SETTING, ROUTE_SUPPORT, ROUTE_USERROLE } from '../routes';

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
  {
    id: 'userrole',
    title: 'User Roles',
    Icon: IconMenuCalendar,
    childItems: [],
    route: ROUTE_USERROLE,
  },
  {
    id: 'support',
    title: 'Support',
    Icon: IconMenuCalendar,
    childItems: [],
    route: ROUTE_SUPPORT,
  },
  {
    id: 'setting',
    title: 'Setting',
    Icon: IconMenuCalendar,
    childItems: [],
    route: ROUTE_SETTING,
  },
];
