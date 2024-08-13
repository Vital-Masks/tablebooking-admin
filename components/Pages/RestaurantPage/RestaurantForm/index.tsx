'use client';
import { IRootState } from '@/store';
import { useSelector } from 'react-redux';
import { restaurantTabs, tabs } from '../tabs';
import { CuisineMenu, DiningAreas, DiningTimings, GeneralDetails, UserRoles, Subscriptions } from '../../RestaurantTabs';

import Button from '@/components/Elements/Button';

const RestaurantForm = () => {
  const tabName = useSelector((state: IRootState) => state.restaurantConfig);

  return (
    <>
      <div className="flex flex-wrap-reverse items-center justify-between gap-4 p-4">
        <div className="flex w-full items-center sm:w-auto">
          <div className="mr-4">
            <b>{tabs.find((x) => x.id === tabName.tab)?.name}</b>
            <br></br>
            {tabs.find((x) => x.id === tabName.tab)?.description}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="outlined">Cancel</Button>
          <Button type="filled">Save</Button>
        </div>
      </div>
      <div className="h-px border-b border-white-light"></div>
      <div className="table-responsive min-h-[400px] grow overflow-y-auto sm:min-h-[300px] p-5">
        {tabName.tab === restaurantTabs.generalDetails && <GeneralDetails />}
        {tabName.tab === restaurantTabs.cuisineMenu && <CuisineMenu />}
        {tabName.tab === restaurantTabs.diningAreas && <DiningAreas />}
        {tabName.tab === restaurantTabs.diningTimings && <DiningTimings />}
        {tabName.tab === restaurantTabs.userRoles && <UserRoles />}
        {tabName.tab === restaurantTabs.subscriptions && <Subscriptions />}
      </div>
    </>
  );
};

export default RestaurantForm;
