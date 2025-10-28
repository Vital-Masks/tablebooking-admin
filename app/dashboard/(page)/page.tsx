import { DASHBOARD_METADATA } from "@/lib/metadata";
import DashboardContent from "@/components/Pages/DashboardPage/DashboardContent";
import { getStats } from "@/lib/actions/dashboard.action";
import { getRestaurantsList } from "@/lib/actions/restaurant.actions";
import { getHospitalChainList } from "@/lib/actions/hospitalChain.action";

// Force dynamic rendering (uses cookies for auth)
export const dynamic = 'force-dynamic';

// Dynamic metadata generation using utility function
export const generateMetadata = async () => DASHBOARD_METADATA;

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: DashboardPageProps) {
  const restaurants: any = await getRestaurantsList();
  const hospitalityChains = await getHospitalChainList();

  // Extract URL parameters with fallbacks
  const hospitalityChainId =
    (searchParams.hospitalityChainId as string) || hospitalityChains?.[0]?._id;

  const restaurantId =
    (searchParams.restaurantId as string) || restaurants?.[0]?._id;

  const customStart = searchParams.customStart as string;
  const customEnd = searchParams.customEnd as string;

  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const todayFormatted = today.toISOString().slice(0, 10);
  const lastWeekFormatted = lastWeek.toISOString().slice(0, 10);

  const stats = await getStats({
    userType: "VreservSuperAdmin",
    hospitalityChainId,
    restaurantId,
    dateType: "customRange",
    customStart:
      customStart ||
      lastWeekFormatted,
    customEnd: customEnd || todayFormatted,
  });

  return (
    <DashboardContent 
      stats={stats ?? {}}
      hospitalityChains={hospitalityChains}
      lastWeek={lastWeek}
      todayFormatted={todayFormatted}
      lastWeekFormatted={lastWeekFormatted}
    />
  );
}
