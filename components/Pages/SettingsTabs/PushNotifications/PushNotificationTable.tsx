import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getNotificationList } from "@/lib/actions/pushNotification.action";

const PushNotificationTable = async () => {
  const rowData: NotificationType[] = [];
  const notifications = await getNotificationList();

  notifications?.map((res: any) => {
    rowData.push({
      id: res._id,
      notificationType: res.notificationTitle,
      message: res.notification,
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default PushNotificationTable;
