import NotificationHeader from "@/components/Pages/SettingsTabs/PushNotifications/NotificationHeader";
import PushNotificationTable from "@/components/Pages/SettingsTabs/PushNotifications/PushNotificationTable";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";

export const dynamic = 'force-dynamic';

const NotificationPage = async () => {
  const restaurants = await getRestaurantsList();
  const restaurantOptions = restaurants?.map((res: any) => ({
    value: res._id,
    label: res.restaurantName,
  }));

  return (
    <main>
      <NotificationHeader restaurantOptions={restaurantOptions} />
      <PushNotificationTable />
    </main>
  );
};

export default NotificationPage;
