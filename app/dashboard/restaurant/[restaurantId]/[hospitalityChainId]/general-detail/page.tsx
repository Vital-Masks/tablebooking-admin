import { GeneralDetails } from '@/components/Pages/RestaurantPage/RestaurantTabs';
import { getHospitalChainList } from '@/lib/actions/hospitalChain.action';

const GeneralDetailPage = async ({ params }: any) => {
  const hospitalityChains = await getHospitalChainList();

  return (
    <>
      <GeneralDetails hospitalityChains={hospitalityChains} params={params} />
    </>
  )
};

export default GeneralDetailPage;
