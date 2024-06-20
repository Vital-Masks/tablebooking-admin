import {
  IconChat,
  IconChefHat,
  IconMenuCalendar,
  IconMenuDashboard,
  IconSettings,
  IconUserRole,
} from '@/components/Icons';
import {
  ROUTE_DASHBOARD,
  ROUTE_RESERVATIONS,
  ROUTE_RESTAURANTS,
  ROUTE_SETTING,
  ROUTE_SUPPORT,
  ROUTE_USERROLE,
} from '../routes';

export const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    Icon: IconMenuDashboard,
    childItems: [],
    route: ROUTE_DASHBOARD,
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    Icon: IconChefHat,
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
    id: 'reservation',
    title: 'Reservation',
    Icon: IconMenuCalendar,
    childItems: [],
    route: ROUTE_RESERVATIONS,
  },
  {
    id: 'userrole',
    title: 'User Role',
    Icon: IconUserRole,
    childItems: [],
    route: ROUTE_USERROLE,
  },
  {
    id: 'support',
    title: 'Support',
    Icon: IconChat,
    childItems: [],
    route: ROUTE_SUPPORT,
  },
  {
    id: 'setting',
    title: 'Setting',
    Icon: IconSettings,
    childItems: [],
    route: ROUTE_SETTING,
  },
];
