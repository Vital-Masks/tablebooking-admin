'use client';
import React, { useState } from 'react';
import { CuisineMenu, DiningAreas, DiningTimings, GeneralDetails, UserRoles } from '@/components/Pages/RestaurantTabs';
import Button from '@/components/Elements/Button';
import Subscriptions from '@/components/Pages/RestaurantTabs/Subscriptions';

const tabs = [
  {
    id: 'generalDetails',
    name: 'General Details',
    description: 'Update your general details here',
    component: (name:any) => <GeneralDetails />,
  },
  {
    id: 'cusinMenu',
    name: 'Cuisines & Menu',
    description: 'Update your Cuisine and Menu details here',
    component: () => <CuisineMenu />,
  },
  {
    id: 'diningAreas',
    name: 'Dining Areas',
    description: 'Update your Dining area details here',
    component: () => <DiningAreas />,
  },
  {
    id: 'diningTimings',
    name: 'Dining Timings',
    description: 'Update your Dining Timing details here',
    component: () => <DiningTimings />,
  },
  {
    id: 'userRoles',
    name: 'User Roles',
    description: 'Update your User details here',
    component: () => <UserRoles />,
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    description: 'Update your User Subscriptions here',
    component: () => <Subscriptions />,
  },
];

const RestaurantForm = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const isEmpty = false;

  return (
    <div>
      <div className="relative flex h-full sm:h-[calc(100vh_-_100px)]">
        <div
          className={`panel absolute z-10 hidden h-full w-[250px] max-w-full flex-none space-y-3 overflow-hidden p-4 rounded-r-none xl:relative xl:block xl:h-auto xl:rounded-r-none`}
        >
          <div className="flex h-full flex-col pb-16">
            <div className="relative h-full grow -mr-3.5 pr-3.5">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary ${
                      selectedTab === tab.id
                        ? 'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary'
                        : ''
                    }`}
                    onClick={() => {
                      setSelectedTab(tab.id);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="ml-3">{tab.name}</div>
                    </div>
                  </button>
                ))}

                <div className="h-px border-b border-white-light"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel rounded-l-none h-full flex-1 overflow-x-hidden p-0">
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap-reverse items-center justify-between gap-4 p-4">
              <div className="flex w-full items-center sm:w-auto">
                <div className="mr-4">
                  <b>{tabs.find((x) => x.id === selectedTab)?.name}</b>
                  <br></br>
                  {tabs.find((x) => x.id === selectedTab)?.description}
                </div>
                
              </div>
              <div className="flex items-center gap-2">
                  <Button type="outlined">Cancel</Button>
                  <Button type="filled">Save</Button>
                </div>
            </div>

            <div className="h-px border-b border-white-light"></div>

            <div className="table-responsive min-h-[400px] grow overflow-y-auto sm:min-h-[300px] p-5">
              {tabs.find((x) => x.id === selectedTab)?.component('ginthu')}
            </div>

            {isEmpty && (
              <div className="grid h-full min-h-[300px] place-content-center text-lg font-semibold">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantForm;
