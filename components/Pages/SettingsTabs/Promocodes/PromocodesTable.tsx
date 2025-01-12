import Table from "@/components/Common/Table";
import { columns } from "./columns";
import { getNotificationList } from "@/lib/actions/pushNotification.action";
import moment from "moment";

const PromocodesTable = async () => {
  const rowData: NotificationType[] = [];
  const notifications = await getNotificationList();

  notifications?.map((res: any) => {
    rowData.push({
      id: res._id,
      notificationTitle: res.notificationTitle,
      customersOf: res.restaurantIds[0],
      createdAt: moment(res.dateAndTime).format("DD-MM-YYYY / hh:mm A"),
      status: 'Active',
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default PromocodesTable;
