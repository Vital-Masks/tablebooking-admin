import InquiryHeader from "@/components/Pages/SupportPage/InquiryPage/InquiryHeader";
import InquiryTable from "@/components/Pages/SupportPage/InquiryPage/InquiryTable";

export const dynamic = 'force-dynamic';

const InquiryPage = () => {
  return (
    <main>
      <InquiryHeader />
      <InquiryTable />
    </main>
  );
};

export default InquiryPage;
