import HospitalityHeader from "@/components/Pages/HospitalChain/HospitalityHeader";
import HospitalityTable from "@/components/Pages/HospitalChain/HospitalityTable";

export const dynamic = 'force-dynamic';

const HospitalChainPage = () => {
  return (
    <main>
      <HospitalityHeader />
      <HospitalityTable />
    </main>
  );
};

export default HospitalChainPage;
