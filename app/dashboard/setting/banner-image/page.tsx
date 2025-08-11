import BannerHeader from "@/components/Pages/SettingsTabs/BannerImage/BannerHeader";
import BannerTable from "@/components/Pages/SettingsTabs/BannerImage/BannerTable";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";

export const dynamic = 'force-dynamic';

const BannerImagePage = async () => {
  const restaurants = await getRestaurantsList();
  const restaurantOptions = restaurants?.map((res: any) => ({
    value: res._id,
    label: res.restaurantName,
  }));

  return (
    <div>
      <BannerHeader restaurantOptions={restaurantOptions} />
      <BannerTable />
    </div>
  );
};

export default BannerImagePage;
