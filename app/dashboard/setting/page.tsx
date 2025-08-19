import { SETTINGS_METADATA } from '@/lib/metadata';
import SettingsContent from '@/components/Pages/SettingsPage/SettingsContent';

// Dynamic metadata generation using utility function
export const generateMetadata = async () => SETTINGS_METADATA;

export default function SettingPage() {
  return <SettingsContent />;
}
