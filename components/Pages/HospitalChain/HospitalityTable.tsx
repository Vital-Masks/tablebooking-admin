import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getHospitalChainList } from "@/lib/actions/hospitalChain.action";

const HospitalityTable = async () => {
  const rowData: HospitalChain[] = [];
  const hospitals = await getHospitalChainList();

  hospitals?.map((res: any) => {
    rowData.push({
      id: res._id,
      chainName: res.chainName,
      address: res.address,
      registrationNumber: res.registrationNumber,
      contactNumber: res.contactNumber,
      firstName: res.firstName,
      email: res.email,
    });
  });

  return (
    <div>
      <Table columns={columns} rowData={rowData} />
    </div>
  );
};

export default HospitalityTable;
