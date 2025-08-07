import BannerHeader from "@/components/Pages/SettingsTabs/BannerImage/BannerHeader";
import BannerTable from "@/components/Pages/SettingsTabs/BannerImage/BannerTable";

export const dynamic = 'force-dynamic';

const BannerImagePage = () => {
  return (
    <div>
      <BannerHeader />
      <BannerTable />
    </div>
  );
};

export default BannerImagePage;
