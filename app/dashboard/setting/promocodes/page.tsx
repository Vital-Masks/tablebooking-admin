import PromocodesHeader from "@/components/Pages/SettingsTabs/Promocodes/PromocodesHeader";
import PromocodesTable from "@/components/Pages/SettingsTabs/Promocodes/PromocodesTable";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";

export const dynamic = 'force-dynamic';

const PromoPage = async () => {
    const restaurants: any = await getRestaurantsList();
    const restaurantOptions = restaurants?.data?.map((res: any) => ({
      value: res._id,
      label: res.restaurantName,
    }));
    

  return (
    <div>
      <PromocodesHeader restaurantOptions={restaurantOptions} />
      <PromocodesTable />
    </div>
  );
};

export default PromoPage;
