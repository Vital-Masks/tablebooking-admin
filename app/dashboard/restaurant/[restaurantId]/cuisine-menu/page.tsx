import CuisineMenuForm from '@/components/Pages/RestaurantPage/CuisineMenu/CuisineMenuForm';
import CuisineMenuTable from '@/components/Pages/RestaurantPage/CuisineMenu/CuisineMenuTable';
import { getRestaurantCuisineMenu } from '@/lib/actions/restaurant.actions';

const CuisinePage = async ({ params }: any) => {
  let PDF_RES: any = null;
  
  if (params.restaurantId !== "c") {
    const cuisines: any = await getRestaurantCuisineMenu(params.restaurantId);
    PDF_RES = cuisines?.findLast((res: any) => res.pdf.length);
  }

  console.log("PDF_RES >>>>", PDF_RES.pdf.length);

  return (
    <div>
      <CuisineMenuTable params={params} />
      <CuisineMenuForm params={params} pdfData={PDF_RES} />
    </div>
  );
};

export default CuisinePage;
