import DiningTimingForm from '@/components/Pages/RestaurantPage/DiningTiming/DiningTimingForm';
import DiningTimingTable from '@/components/Pages/RestaurantPage/DiningTiming/DiningTimingTable';

const DiningTimingPage = ({ params }: any) => {
  return (
    <div>
      <DiningTimingTable params={params} />
      <DiningTimingForm params={params} />
    </div>
  );
};

export default DiningTimingPage;
