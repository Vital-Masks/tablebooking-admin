import AutoNotificationHeader from "@/components/Pages/SettingsTabs/AutomaticNotifications/AutoNotificationHeader";
import AutoNotificationTable from "@/components/Pages/SettingsTabs/AutomaticNotifications/AutoNotificationTable";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";

const AutomaticNotificationPage = async () => {
  const restaurants = await getRestaurantsList();
  const restaurantOptions = restaurants?.map((res: any) => ({
    value: res._id,
    label: res.restaurantName,
  }));

  return (
    <main>
      <AutoNotificationHeader restaurantOptions={restaurantOptions} />
      <AutoNotificationTable />
    </main>
  );
};

export default AutomaticNotificationPage;
