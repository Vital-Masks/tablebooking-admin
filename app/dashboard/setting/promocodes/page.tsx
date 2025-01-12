import PromocodesTable from "@/components/Pages/SettingsTabs/Promocodes/PromocodesTable";
import NotificationHeader from "@/components/Pages/SettingsTabs/PushNotifications/NotificationHeader";
import React from "react";

const PromoPage = () => {
  return (
    <div>
      <NotificationHeader />
      <PromocodesTable />
    </div>
  );
};

export default PromoPage;
