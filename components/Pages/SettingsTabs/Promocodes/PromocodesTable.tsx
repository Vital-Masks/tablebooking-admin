import Table from '@/components/Common/Table';
import { columns } from './columns';
import { getPromoList } from '@/lib/actions/pushNotification.action';

const PromocodesTable = async () => {
  const rowData: any[] = [];
  const promos = await getPromoList();

  promos?.map((res: any) => {
    rowData.push({
      id: res._id,
      promocode: res.promocode,
      promocodeFor: res.promocodeFor,
      validFromDate: res.validFromDate,
      validTillDate: res.validTillDate,
      amount: res.valuePercentage,
      availabilityStatus: res.availabilityStatus,
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default PromocodesTable;
