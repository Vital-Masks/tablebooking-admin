export const restaurantTabs = {
  generalDetails: 'general-details',
  cuisineMenu: 'cuisine-menu',
  diningAreas: 'dining-areas',
  diningTimings: 'general-timings',
  userRoles: 'user-roles',
  subscriptions: 'subscriptions',
};

export const tabs = [
  {
    id: restaurantTabs.generalDetails,
    name: 'General Details',
    description: 'Update your general details here',
    // component: (name: any) => <GeneralDetails />,
  },
  {
    id: restaurantTabs.cuisineMenu,
    name: 'Cuisines & Menu',
    description: 'Update your Cuisine and Menu details here',
    // component: () => <CuisineMenu />,
  },
  {
    id: restaurantTabs.diningAreas,
    name: 'Dining Areas',
    description: 'Update your Dining area details here',
    // component: () => <DiningAreas />,
  },
  {
    id: restaurantTabs.diningTimings,
    name: 'Dining Timings',
    description: 'Update your Dining Timing details here',
    // component: () => <DiningTimings />,
  },
  {
    id: restaurantTabs.userRoles,
    name: 'User Roles',
    description: 'Update your User details here',
    // component: () => <UserRoles />,
  },
  {
    id: restaurantTabs.subscriptions,
    name: 'Subscriptions',
    description: 'Update your User Subscriptions here',
    // component: () => <Subscriptions />,
  },
];
