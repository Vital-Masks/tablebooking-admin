import DiningAreaForm from '@/components/Pages/RestaurantPage/DiningArea/DiningAreaForm';
import DiningAreaTable from '@/components/Pages/RestaurantPage/DiningArea/DiningAreaTable';

const DiningAreasPage = ({ params }: any) => {
  return (
    <div>
      <DiningAreaForm params={params}/>
      <DiningAreaTable params={params} />
    </div>
  );
};

export default DiningAreasPage;
