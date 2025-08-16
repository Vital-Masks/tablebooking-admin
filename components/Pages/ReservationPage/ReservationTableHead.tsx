"use client";

import Modal from "@/components/Common/Modal";
import { IconFilter } from "@/components/Icons";
import { ROUTE_RESERVATIONS } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ReservationTableHead = ({ restaurants, restaurantId }: any) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Get current restaurant name for display
  const currentRestaurant = restaurants.find((r: any) => r._id === restaurantId);

  return (
    <>
      <div className="flex flex-col justify-between flex-wrap gap-5 md:flex-row md:items-center bg-white p-5 shadow-lg rounded-t-lg">
        <div className="flex items-center gap-5">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle shadow-none"
              onClick={() => setOpen(true)}
            >
              <span>
                <IconFilter className="mr-2 inline-block w-4 h-4" />
              </span>
              <span>Filter</span>
            </button>
          </div>
          <div className="w-full flex-1">
            <input
              type="text"
              className="w-full form-input"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {currentRestaurant && (
          <div className="text-sm text-gray-600">
            Current: <span className="font-medium">{currentRestaurant.restaurantName}</span>
          </div>
        )}
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Filter"
        className="!max-w-7xl"
      >
        <div className="grid grid-cols-6 gap-5 divide-x">
          <div>
            <h3 className="text-sm font-medium">Filter by Restaurants</h3>
            <div className="flex flex-col pt-5 max-h-[300px] overflow-auto">
              {restaurants.map((restaurant: any) => (
                <button
                  key={restaurant._id}
                  className={`text-left p-3 rounded-lg mb-2 transition-colors ${
                    restaurantId === restaurant._id
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => {
                    router.push(`${ROUTE_RESERVATIONS}/${restaurant._id}`);
                    setOpen(false);
                  }}
                >
                  <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{restaurant.restaurantName}</div>
                
                </button>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </Modal>
    </>
  );
};

export default ReservationTableHead;
