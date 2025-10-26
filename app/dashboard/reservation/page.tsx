import type { Metadata } from 'next';
import { redirect } from "next/navigation";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";

export const dynamic = 'force-dynamic';

// Dynamic metadata generation
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Reservations | VReserve Admin',
    description: 'View and manage restaurant reservations, booking details, and customer information in VReserve Admin',
    keywords: ['reservations', 'bookings', 'restaurant reservations', 'customer bookings', 'vreserve', 'admin'],
    openGraph: {
      title: 'Reservations | VReserve Admin',
      description: 'View and manage restaurant reservations, booking details, and customer information in VReserve Admin',
      type: 'website',
    },
  };
};

const ReservationPage = async () => {
  const restaurants: any = await getRestaurantsList();
  
  // If no restaurants exist, show an empty state
  if (!restaurants || restaurants.length === 0) {
    return (
      <main>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Restaurants Found</h2>
          <p className="text-gray-600">Please add restaurants to view reservations.</p>
        </div>
      </main>
    );
  }

  // Redirect to the first restaurant's reservation page
  redirect(`/dashboard/reservation/${restaurants.data[0]._id}`);
};

export default ReservationPage;
