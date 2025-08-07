import GeneralDetailForm from '@/components/Pages/RestaurantPage/GeneralDetail/GeneralDetailForm';
import { getHospitalChainList } from '@/lib/actions/hospitalChain.action';
import { getRestaurantGeneral } from '@/lib/actions/restaurant.actions';
import { getUtilities } from '@/lib/actions/utilities.actions';

export const dynamic = 'force-dynamic';

const GeneralDetailPage = async ({ params }: any) => {
  const hospitalityChains = await getHospitalChainList();
  const utilities = await getUtilities();

  let generalDetails: any;
  
  if (params.restaurantId !== 'c') {
    generalDetails = await getRestaurantGeneral(params.restaurantId);
  }

  return (
    <GeneralDetailForm
      hospitalityChains={hospitalityChains}
      generalDetails={generalDetails}
      utilities={utilities}
      params={params}
    />
  );
};

export default GeneralDetailPage;
