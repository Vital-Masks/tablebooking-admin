import { DASHBOARD_METADATA } from '@/lib/metadata';
import DashboardContent from '@/components/Pages/DashboardPage/DashboardContent';

// Dynamic metadata generation using utility function
export const generateMetadata = async () => DASHBOARD_METADATA;

export default function Home() {
  return <DashboardContent />;
}
