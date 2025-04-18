import {
  IconChat,
  IconChefHat,
  IconMenuCalendar,
  IconMenuDashboard,
  IconSettings,
  IconUserRole,
  IconPayment,
  IconCustomer,
  IconShop,
} from '@/components/Icons';

import {
  ROUTE_DASHBOARD,
  ROUTE_RESERVATIONS,
  ROUTE_RESTAURANTS,
  ROUTE_PAYMENTS,
  ROUTE_CUSTOMERS,
  ROUTE_USERROLE,
  ROUTE_HOSPITAL_CHAIN,
  ROUTE_PUSH_NOTIFICATION,
  ROUTE_DEMO_INQUIRY,
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
      // {
      //   id: 'restaurant1',
      //   route: ROUTE_RESTAURANTS,
      //   title: 'Restaurant 1',
      // },
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
    route: ROUTE_PUSH_NOTIFICATION,
  },
  {
    id: 'support',
    title: 'Support',
    Icon: IconChat,
    childItems: [],
    route: ROUTE_DEMO_INQUIRY,
  },
  {
    id: 'hospitalChain',
    title: 'Hospitality Chains',
    Icon: IconShop,
    childItems: [],
    route: ROUTE_HOSPITAL_CHAIN,
  },
];
