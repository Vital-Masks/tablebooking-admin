import GeneralDetailForm from '@/components/Pages/RestaurantPage/GeneralDetail/GeneralDetailForm';
import { getHospitalChainList } from '@/lib/actions/hospitalChain.action';
import { getUtilities } from '@/lib/actions/utilities.actions';

const GeneralDetailPage = async ({ params }: any) => {
  const hospitalityChains = await getHospitalChainList();
  const utilities = await getUtilities();

  return (
    <GeneralDetailForm hospitalityChains={hospitalityChains} utilities={utilities} params={params} />
  )
};

export default GeneralDetailPage;
