import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getInquiryList } from "@/lib/actions/support.action";

const InquiryTable = async () => {
  const rowData: InquiryType[] = [];
  const inquiries = await getInquiryList();

  inquiries?.map((res: any) => {
    rowData.push({
      id: res._id,
      firstName: res.firstName,
      lastName: res.lastName,
      contactNo: res.contactNo,
      email: res.email,
      companyName: res.companyName,
      status: res.status,
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default InquiryTable;
