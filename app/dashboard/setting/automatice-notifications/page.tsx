import AutoNotificationHeader from "@/components/Pages/SettingsTabs/AutomaticNotifications/AutoNotificationHeader";
import AutoNotificationTable from "@/components/Pages/SettingsTabs/AutomaticNotifications/AutoNotificationTable";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";
import { getUtilities } from "@/lib/actions/utilities.actions";

const AutomaticNotificationPage = async () => {
  const restaurants = await getRestaurantsList();
  const restaurantOptions = restaurants?.map((res: any) => ({
    value: res._id,
    label: res.restaurantName,
  }));
  const utilities = await getUtilities();

  return (
    <main>
      <AutoNotificationHeader restaurantOptions={restaurantOptions} utilities={utilities} />
      <AutoNotificationTable />
    </main>
  );
};

export default AutomaticNotificationPage;
