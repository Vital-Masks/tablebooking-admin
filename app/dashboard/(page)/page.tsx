import { DASHBOARD_METADATA } from "@/lib/metadata";
import DashboardContent from "@/components/Pages/DashboardPage/DashboardContent";
import { getStats } from "@/lib/actions/dashboard.action";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";
import { getHospitalChainList } from "@/lib/actions/hospitalChain.action";

// Dynamic metadata generation using utility function
export const generateMetadata = async () => DASHBOARD_METADATA;

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: DashboardPageProps) {
  const restaurants = await getRestaurantsList();
  const hospitalityChains = await getHospitalChainList();

  // Extract URL parameters with fallbacks
  const hospitalityChainId = 
    (searchParams.hospitalityChainId as string) || 
    hospitalityChains?.[0]?._id;
  
  const restaurantId = 
    (searchParams.restaurantId as string) || 
    restaurants?.[0]?._id;

  const stats = await getStats({
    userType: "VreservSuperAdmin",
    hospitalityChainId,
    restaurantId,
    dateType: "customRange",
    customStart: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    customEnd: new Date().toISOString().split("T")[0],
  });

  return <DashboardContent stats={stats ?? {}} restaurants={restaurants} hospitalityChains={hospitalityChains} />;
}
