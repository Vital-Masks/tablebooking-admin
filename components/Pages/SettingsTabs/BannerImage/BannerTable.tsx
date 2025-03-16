import Table from '@/components/Common/Table';
import { columns } from './columns';
import { getBannerImageList } from '@/lib/actions/bannerImage.action';

const BannerTable = async () => {
  const rowData: any[] = [];
  const bannerImages = await getBannerImageList();

  bannerImages?.map((res: any) => {
    rowData.push({
      id: res._id,
      bannerName: res.bannerName,
      bannerFor: res.bannerFor,
      redirectTo: res.redirectTo,
      status: res.isAvailable ? "Active" : "Inactive",
    });
  });

  return <Table columns={columns} rowData={rowData} />;
};

export default BannerTable;
