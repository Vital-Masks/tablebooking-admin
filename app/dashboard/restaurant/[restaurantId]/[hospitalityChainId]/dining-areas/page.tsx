import DiningAreaForm from '@/components/Pages/RestaurantPage/DiningArea/DiningAreaForm';
import DiningAreaTable from '@/components/Pages/RestaurantPage/DiningArea/DiningAreaTable';

const DiningAreasPage = ({ params }: any) => {
  return (
    <div>
      <DiningAreaTable params={params} />
      <DiningAreaForm params={params}/>
    </div>
  );
};

export default DiningAreasPage;
