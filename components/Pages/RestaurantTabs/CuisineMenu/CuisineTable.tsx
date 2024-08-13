import Table from '@/components/Common/Table';
import { IconEye } from '@/components/Icons';
import { getRestaurantCuisineMenu } from '@/lib/actions/restaurant.actions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CuisineTable = ({ setIsCreateForm }: any) => {
  const searchParam = useSearchParams();
  const restaurantId = searchParam.get('restaurantId');
  const hospitalityChainId = searchParam.get('hospitalityChainId');
  const [hospitalityChains, setHospitalityChains] = useState<CuisineMenu[]>([]);

  const columns = [
    { accessor: 'foodName', title: 'Food Name' },
    { accessor: 'category', title: 'Category' },
    { accessor: 'price', title: 'Price' },
    {
      accessor: 'action',
      title: '',
      titleClassName: '!text-center',
      render: () => (
        <div className="flex items-center gap-4 mx-auto w-max">
          <button onClick={() => setIsCreateForm(true)}>
            <IconEye />
          </button>
        </div>
      ),
    },
  ];

  const fetchCuisineMenuList = async (
    hospitalityChainId: string,
    restaurantId: string
  ) => {
    try {
      const response = await getRestaurantCuisineMenu(
        hospitalityChainId,
        restaurantId
      );

    
        const rowData = response?.map((res: any) => ({
          id: res._id,
          foodName: res.foodName,
          category: res.foodCategory,
          price: res.price,
        }));
  
        setHospitalityChains(rowData);
     

    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (hospitalityChainId && restaurantId) {
      fetchCuisineMenuList(hospitalityChainId, restaurantId);
    }
  }, [hospitalityChainId, restaurantId]);

  return (
    <Table
      columns={columns}
      rowData={hospitalityChains}
      onButtonClick={() => setIsCreateForm(true)}
    />
  );
};

export default CuisineTable;
