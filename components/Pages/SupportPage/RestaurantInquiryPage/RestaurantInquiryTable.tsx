import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getRestaurantInquiryList } from "@/lib/actions/support.action";

const RestaurantInquiryTable = async () => {
  const rowData: RestaurantInquiryType[] = [];
  const inquiries = await getRestaurantInquiryList();

  inquiries?.map((res: any) => {
    rowData.push({
      id: res._id,
      firstName: res.firstName ?? "",
      lastName: res.lastName ?? "",
      contactNo: res.contactNumber ?? "",
      email: res.email ?? "",
      inquiryRelatedTo: res.inquiryRelatedTo ?? "",
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default RestaurantInquiryTable;
