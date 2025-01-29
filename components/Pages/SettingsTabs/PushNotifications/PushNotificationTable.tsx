import Table from '@/components/Common/Table';
import { columns } from './columns';
import { getNotificationList } from '@/lib/actions/pushNotification.action';
import moment from 'moment';

const PushNotificationTable = async () => {
  const rowData: NotificationType[] = [];
  const notifications = await getNotificationList();

  notifications?.map((res: any) => {
    rowData.push({
      id: res._id,
      notificationTitle: res.notificationTitle,
      customersOf: res.restaurantIds.map((res: any) => res.restaurantName),
      createdAt: moment(res.date).format('DD-MM-YYYY') + ' / ' + res.time,
      status: 'Active',
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default PushNotificationTable;
