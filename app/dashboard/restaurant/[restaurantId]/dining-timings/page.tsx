import DiningTimingForm from '@/components/Pages/RestaurantPage/DiningTiming/DiningTimingForm';
import DiningTimingTable from '@/components/Pages/RestaurantPage/DiningTiming/DiningTimingTable';
import { getRestaurantDiningAreas } from '@/lib/actions/restaurant.actions';
import { getUtilities } from '@/lib/actions/utilities.actions';

export const dynamic = 'force-dynamic';

const DiningTimingPage = async ({ params }: any) => {
  const diningAreas: any[] = [];
  if (params.restaurantId !== 'c') {
    const diningArea = await getRestaurantDiningAreas(params.restaurantId);

    diningArea?.map((res: any) => {
      diningAreas.push({
        value: res.sectionName,
        label: res.sectionName,
      });
    });
  }

  const utilities = await getUtilities();


  return (
    <div>
      <DiningTimingTable params={params} />
      <DiningTimingForm params={params} diningAreas={diningAreas} utilities={utilities}/>
    </div>
  );
};

export default DiningTimingPage;
