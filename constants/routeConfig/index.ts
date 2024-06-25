// export const menuItems: MenuItem[] = []

import { IconCoffee, IconMenuCalendar, IconMenuDashboard } from '@/components/Icons';
import { ROUTE_DASHBOARD, ROUTE_RESERVATIONS, ROUTE_RESTAURANTS, ROUTE_PAYMENTS, ROUTE_CUSTOMERS } from '../routes';
import IconSettings from '@/components/Icons/IconSetting';
import IconCustomers from '@/components/Icons/IconCustomer';
import IconPayments from '@/components/Icons/IconPayment';

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
    id: 'payments',
    title: 'Payments',
    Icon: IconPayments,
    childItems: [],
    route: ROUTE_PAYMENTS,
  },
  {
    id: 'customers',
    title: 'Customers',
    Icon: IconCustomers,
    childItems: [],
    route: ROUTE_CUSTOMERS,
  },
];
