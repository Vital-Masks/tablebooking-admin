import React from "react";
import { columns } from "./columns";
import Table from "@/components/Common/Table";
import { getRestaurantCuisineMenu } from "@/lib/actions/restaurant.actions";
import Image from "next/image";

const CuisineMenuTable = async ({ params }: any) => {
  const rowData: any[] = [];
  let PDF_RES: any = null;

  if (params.restaurantId !== "c") {
    const cuisines: any = await getRestaurantCuisineMenu(params.restaurantId);
    PDF_RES = cuisines?.findLast((res: any) => res.pdf);

    cuisines?.map((res: any) => {
      rowData.push({
        id: res._id,
        foodName: res.pdf ? "Menu File" : res.link ? "Menu Link" : res.foodName,
        category: res.foodCategory ?? "N/A",
        price: res.price ?? "N/A",
      });
    });
  }

  return (
    <div className="p-5">
      {PDF_RES ? (
        <div className="flex w-[500px] h-[700px] overflow-x-auto border border-gray-300 rounded-md snap-x snap-mandatory touch-pan-x">
          {PDF_RES?.pdf?.map((res: any) => {
            return (
              <div
                key={res}
                className="min-w-[500px] h-full flex-1 p-2 snap-start"
              >
                <Image
                  src={res}
                  alt="PDF"
                  className="w-full h-full object-cover bg-gray-200"
                  width={480}
                  height={480}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="p-5">
            <h1 className="text-2xl font-bold">Cuisine Menu</h1>
          </div>
          <Table columns={columns} rowData={rowData} />
        </div>
      )}
    </div>
  );
};

export default CuisineMenuTable;
