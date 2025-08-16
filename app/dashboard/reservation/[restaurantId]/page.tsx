import ReservationHeader from "@/components/Pages/ReservationPage/ReservationHeader";
import ReservationTable from "@/components/Pages/ReservationPage/ReservationTable";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";

const ReservationByRestaurantPage = async ({params}: any) => {
  const restaurants = await getRestaurantsList();

  return (
    <main>
      <ReservationHeader />
      <ReservationTable restaurants={restaurants || []} restaurantId={params.restaurantId} />
    </main>
  );
};

export default ReservationByRestaurantPage;
