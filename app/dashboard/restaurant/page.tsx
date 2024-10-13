import PageHeader from '@/components/Elements/PageHeader';
import RestaurantTable from '@/components/Pages/RestaurantPage/RestaurantTable';
import { ROUTE_RESTAURANTS } from '@/constants/routes';

const RestaurantPage = async () => {
  const pageHeaderData = {
    title: 'Restaurants',
    button1: {
      title: 'export',
      action: '',
    },
    button2: {
      title: 'Create New',
      action: ROUTE_RESTAURANTS + '/c/general-detail',
    },
  };

  return (
    <main>
      <PageHeader pageHeaderData={pageHeaderData} />
      <RestaurantTable />
    </main>
  );
};

export default RestaurantPage;
