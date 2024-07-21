
import {
  IconChat,
  IconChefHat,
  IconMenuCalendar,
  IconMenuDashboard,
  IconSettings,
  IconUserRole,
  IconPayment,
  IconCustomer
} from '@/components/Icons';

import {
  ROUTE_DASHBOARD,
  ROUTE_RESERVATIONS,
  ROUTE_RESTAURANTS,
   ROUTE_PAYMENTS, ROUTE_CUSTOMERS, ROUTE_USERROLE,
   ROUTE_SETTING,
   ROUTE_SUPPORT
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
    id: 'payments',
    title: 'Payments',
    Icon: IconPayment,
    childItems: [],
    route: ROUTE_PAYMENTS,
  },
  {
    id: 'customers',
    title: 'Customers',
    Icon: IconCustomer,
    childItems: [],
    route: ROUTE_CUSTOMERS,
  },
  {
    id: 'userrole',
    title: 'User Role',
    Icon: IconUserRole,
    childItems: [],
    route: ROUTE_USERROLE,
  },
  {
    id: 'setting',
    title: 'Setting',
    Icon: IconSettings,
    childItems: [],
    route: ROUTE_SETTING,
  },
  {
    id: 'support',
    title: 'Support',
    Icon: IconChat,
    childItems: [],
    route: ROUTE_SUPPORT,
  },
];
