import DiningTimingForm from '@/components/Pages/RestaurantPage/DiningTiming/DiningTimingForm';
import DiningTimingTable from '@/components/Pages/RestaurantPage/DiningTiming/DiningTimingTable';
import { getRestaurantDiningAreas } from '@/lib/actions/restaurant.actions';

const DiningTimingPage = async ({ params }: any) => {
  const diningAreas: any[] = [];
  if (params.hospitalityChainId !== 'n' && params.restaurantId !== 'c') {
    const diningArea = await getRestaurantDiningAreas(
      params.hospitalityChainId,
      params.restaurantId
    );

    diningArea?.map((res: any) => {
      diningAreas.push({
        value: res.sectionName,
        label: res.sectionName,
      });
    });
  }

  return (
    <div>
      <DiningTimingTable params={params} />
      <DiningTimingForm params={params} diningAreas={diningAreas} />
    </div>
  );
};

export default DiningTimingPage;
