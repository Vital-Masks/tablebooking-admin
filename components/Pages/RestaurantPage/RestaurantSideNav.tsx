'use client';
import { ROUTE_RESTAURANTS } from '@/constants/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    id: 'general-detail',
    name: 'General Details',
    description: 'Update your general details here',
  },
  {
    id: 'cuisine-menu',
    name: 'Cuisine & Menu',
    description: 'Update your Cuisine and Menu details here',
  },
  {
    id: 'dining-areas',
    name: 'Dining Areas',
    description: 'Update your Dining area details here',
  },
  {
    id: 'dining-timings',
    name: 'Dining Timings',
    description: 'Update your Dining Timing details here',
  },
  {
    id: 'user-roles',
    name: 'User Roles',
    description: 'Update your User details here',
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    description: 'Update your User Subscriptions here',
  },
];

const RestaurantSideNav = () => {
  const pathname = usePathname().split('/').pop();
  return (
    <div
      className={`panel absolute z-10 hidden h-full w-[250px] max-w-full flex-none space-y-3 overflow-hidden p-4 rounded-r-none xl:relative xl:block xl:h-auto xl:rounded-r-none`}
    >
      <div className="flex h-full flex-col pb-16">
        <div className="relative h-full grow -mr-3.5 pr-3.5">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={`${ROUTE_RESTAURANTS}/create/${tab.id}`}
                type="button"
                className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary ${
                  pathname === tab.id
                    ? 'bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary'
                    : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="ml-3">{tab.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSideNav;
