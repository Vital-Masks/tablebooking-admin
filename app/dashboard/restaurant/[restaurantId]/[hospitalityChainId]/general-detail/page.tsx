import GeneralDetailForm from '@/components/Pages/RestaurantPage/GeneralDetail/GeneralDetailForm';
import { getHospitalChainList } from '@/lib/actions/hospitalChain.action';

const GeneralDetailPage = async ({ params }: any) => {
  const hospitalityChains = await getHospitalChainList();

  return (
    <GeneralDetailForm hospitalityChains={hospitalityChains} params={params} />
  )
};

export default GeneralDetailPage;
