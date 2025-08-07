import RestaurantInquiryHeader from "@/components/Pages/SupportPage/RestaurantInquiryPage/RestaurantInquiryHeader";
import RestaurantInquiryTable from "@/components/Pages/SupportPage/RestaurantInquiryPage/RestaurantInquiryTable";

export const dynamic = 'force-dynamic';

const RestaurantInquiryPage = () => {
  return (
    <main>
      <RestaurantInquiryHeader />
      <RestaurantInquiryTable />
    </main>
  );
};

export default RestaurantInquiryPage;
