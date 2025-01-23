import React from 'react';
import { columns } from './columns';
import Table from '@/components/Common/Table';
import { getRestaurantCuisineMenu } from '@/lib/actions/restaurant.actions';
import PdfRenderer from '@/components/Elements/PdfRenderer';
import Link from 'next/link';

const CuisineMenuTable = async ({ params }: any) => {
  const rowData: any[] = [];
  let pdf: string = '';
  let link: string = '';

  if (params.restaurantId !== 'c') {
    const cuisines = await getRestaurantCuisineMenu(params.restaurantId);

    cuisines?.map((res: any) => {
      if (res.pdf) {
        pdf = res.pdf;
        return;
      } else if (res.link) {
        link = res.link;
        return;
      }

      rowData.push({
        id: res._id,
        foodName: res.foodName,
        category: res.foodCategory,
        price: res.price,
      });
    });
  }

  return (
    <div>
      {!pdf && !link && <Table columns={columns} rowData={rowData} />}
      {pdf && (
        <div className="mt-20">
          <PdfRenderer base64String={pdf} />
        </div>
      )}
      {link && (
        <div className="mt-20 ml-5 flex items-center gap-2">
          <p>Visit the url:</p>{' '}
          <Link
            href={link}
            passHref={true}
            target="_blank"
            className="underline text-blue-700"
          >
            {link}
          </Link>
        </div>
      )}
    </div>
  );
};

export default CuisineMenuTable;
