'use client';

import { IRootState } from '@/store';
import { useSelector } from 'react-redux';
import { restaurantTabs } from '../tabs';
import {
  CuisineMenu,
  DiningAreas,
  DiningTimings,
  GeneralDetails,
  Subscriptions,
  UserRoles,
} from '../../RestaurantTabs';

const RestaurantTabsRender = () => {
  const tabName = useSelector((state: IRootState) => state.restaurantConfig);

  if (tabName.tab === restaurantTabs.generalDetails) return <GeneralDetails />;
  if (tabName.tab === restaurantTabs.cuisineMenu) return <CuisineMenu />;
  if (tabName.tab === restaurantTabs.diningAreas) return <DiningAreas />;
  if (tabName.tab === restaurantTabs.diningTimings) return <DiningTimings />;
  if (tabName.tab === restaurantTabs.userRoles) return <UserRoles />;
  if (tabName.tab === restaurantTabs.subscriptions) return <Subscriptions />;
};

export default RestaurantTabsRender;
