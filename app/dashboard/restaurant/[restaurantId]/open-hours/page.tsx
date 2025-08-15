

import OpeningHoursForm from "@/components/Pages/RestaurantPage/GeneralDetail/OpeningHoursForm";
import { getRestaurantGeneral } from "@/lib/actions/restaurant.actions";

const OpenHoursPage = async ({ params }: any) => {
  const generalDetails: any = await getRestaurantGeneral(params.restaurantId);

  return (
    <OpeningHoursForm
      params={params}
      openingTimes={generalDetails.openingTimes}
    />
  );
};

export default OpenHoursPage;
