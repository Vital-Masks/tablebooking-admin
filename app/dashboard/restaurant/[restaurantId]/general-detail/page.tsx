import type { Metadata } from 'next';
import GeneralDetailForm from '@/components/Pages/RestaurantPage/GeneralDetail/GeneralDetailForm';
import { getHospitalChainList } from '@/lib/actions/hospitalChain.action';
import { getRestaurantGeneral } from '@/lib/actions/restaurant.actions';
import { getUtilities } from '@/lib/actions/utilities.actions';

export const dynamic = 'force-dynamic';

// Dynamic metadata generation with params
export const generateMetadata = async ({ params }: { params: { restaurantId: string } }): Promise<Metadata> => {
  const restaurantId = params.restaurantId;
  
  // If it's a new restaurant creation page
  if (restaurantId === 'c') {
    return {
      title: 'Create New Restaurant • VReserve',
      description: 'Create a new restaurant and configure its general details in VReserve Admin',
      keywords: ['create restaurant', 'new restaurant', 'restaurant setup', 'vreserve', 'admin'],
      openGraph: {
        title: 'Create New Restaurant • VReserve',
        description: 'Create a new restaurant and configure its general details in VReserve Admin',
        type: 'website',
      },
    };
  }

  // For existing restaurant editing
  try {
    const generalDetails = await getRestaurantGeneral(restaurantId);
    const restaurantName = generalDetails?.name || 'Restaurant';
    
    return {
      title: `${restaurantName} • General Details • VReserve`,
      description: `Edit general details for ${restaurantName} in VReserve Admin`,
      keywords: [restaurantName, 'restaurant details', 'edit restaurant', 'vreserve', 'admin'],
      openGraph: {
        title: `${restaurantName} • General Details • VReserve`,
        description: `Edit general details for ${restaurantName} in VReserve Admin`,
        type: 'website',
      },
    };
  } catch (error) {
    // Fallback metadata if restaurant data can't be fetched
    return {
      title: 'Restaurant Details • VReserve',
      description: 'Edit restaurant general details in VReserve Admin',
      keywords: ['restaurant details', 'edit restaurant', 'vreserve', 'admin'],
      openGraph: {
        title: 'Restaurant Details • VReserve',
        description: 'Edit restaurant general details in VReserve Admin',
        type: 'website',
      },
    };
  }
};

const GeneralDetailPage = async ({ params }: any) => {
  const hospitalityChains = await getHospitalChainList();
  const utilities = await getUtilities();

  let generalDetails: any;
  
  if (params.restaurantId !== 'c') {
    generalDetails = await getRestaurantGeneral(params.restaurantId);
  }

  return (
    <GeneralDetailForm
      hospitalityChains={hospitalityChains}
      generalDetails={generalDetails}
      utilities={utilities}
      params={params}
    />
  );
};

export default GeneralDetailPage;
