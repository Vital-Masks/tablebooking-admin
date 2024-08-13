import { GeneralDetails } from '@/components/Pages/RestaurantTabs';
import { getHospitalChainList } from '@/lib/actions/hospitalChain.action';

const GeneralDetailPage = async () => {
  const hospitalChains = await getHospitalChainList();

  return <GeneralDetails  />;
};

export default GeneralDetailPage;
