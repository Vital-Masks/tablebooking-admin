import Table from "@/components/Common/Table";
import { columns } from "./columns";
import {
  getAutoNotificationList,
} from "@/lib/actions/pushNotification.action";


const AutoNotificationTable = async () => {
  const rowData: AutoNotificationType[] = [];
  const notifications = await getAutoNotificationList();

  notifications?.map((res: any) => {
    rowData.push({
      id: res._id,
      notificationType: res.automativeNotificationType,
      notification: res.notification,
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default AutoNotificationTable;
