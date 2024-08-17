import CuisineMenuForm from '@/components/Pages/RestaurantPage/CuisineMenu/CuisineMenuForm';
import CuisineMenuTable from '@/components/Pages/RestaurantPage/CuisineMenu/CuisineMenuTable';

const CuisinePage = ({ params }: any) => {
  return (
    <div>
      <CuisineMenuTable params={params} />
      <CuisineMenuForm params={params} />
    </div>
  );
};

export default CuisinePage;
