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
      title: 'create new',
      action: ROUTE_RESTAURANTS + '/c/n/general-detail',
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
