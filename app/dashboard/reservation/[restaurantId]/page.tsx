import type { Metadata } from 'next';
import ReservationHeader from "@/components/Pages/ReservationPage/ReservationHeader";
import ReservationTable from "@/components/Pages/ReservationPage/ReservationTable";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";
import { getRestaurantGeneral } from "@/lib/actions/restaurant.actions";

// Dynamic metadata generation with restaurant ID
export const generateMetadata = async ({ params }: { params: { restaurantId: string } }): Promise<Metadata> => {
  const restaurantId = params.restaurantId;
  
  try {
    const restaurantData = await getRestaurantGeneral(restaurantId);
    const restaurantName = restaurantData?.name || 'Restaurant';
    
    return {
      title: `${restaurantName} - Reservations | VReserve Admin`,
      description: `View and manage reservations for ${restaurantName} in VReserve Admin`,
      keywords: [restaurantName, 'reservations', 'bookings', 'restaurant reservations', 'vreserve', 'admin'],
      openGraph: {
        title: `${restaurantName} - Reservations | VReserve Admin`,
        description: `View and manage reservations for ${restaurantName} in VReserve Admin`,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Restaurant Reservations | VReserve Admin',
      description: 'View and manage restaurant reservations in VReserve Admin',
      keywords: ['reservations', 'bookings', 'restaurant reservations', 'vreserve', 'admin'],
      openGraph: {
        title: 'Restaurant Reservations | VReserve Admin',
        description: 'View and manage restaurant reservations in VReserve Admin',
        type: 'website',
      },
    };
  }
};

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
