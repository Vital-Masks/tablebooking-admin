"use client";

import FormSlider from "@/components/Common/Form/FormSlider";
import { IconFilter, IconXCircle } from "@/components/Icons";
import { ROUTE_RESERVATIONS } from "@/constants/routes";
import { filterReservations } from "@/lib/actions/reservation.action";
import Link from "next/link";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

const ReservationTableHead = ({
  restaurants,
  restaurantId,
  onFilterChange,
  onSearchChange,
  onResetToInitial,
}: any) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    dateType: "",
    startDate: "",
    endDate: "",
    status: [] as string[],
    table: [] as string[],
  });

  // Get current restaurant name for display
  const currentRestaurant = restaurants.find(
    (r: any) => r._id === restaurantId
  );

  const togglePara = (value: string) => {
    setActive((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const handleFilterChange = (groupTitle: string, value: string, checked: boolean) => {
    setFilterValues((prev) => {
      const newValues = { ...prev };

      if (groupTitle === "Timeframe") {
        newValues.dateType = checked ? value : "";
        if (value === "customDates") {
          newValues.startDate = "";
          newValues.endDate = "";
        }
      } else if (groupTitle === "Status") {
        newValues.status = checked 
          ? [...newValues.status, value] 
          : newValues.status.filter((item) => item !== value);
      } else if (groupTitle === "Table") {
        newValues.table = checked 
          ? [...newValues.table, value] 
          : newValues.table.filter((item) => item !== value);
      }
      return newValues;
    });
  };

  const handleClearFilters = () => {
    // Reset all filter values
    setFilterValues({
      dateType: "",
      startDate: "",
      endDate: "",
      status: [],
      table: [],
    });

    // Reset search
    setSearch("");
    onSearchChange("");

    // Reset all form inputs
    const inputs = document.querySelectorAll(
      'input[type="radio"], input[type="checkbox"]'
    );
    inputs.forEach((input: any) => {
      input.checked = false;
    });

    // Reset table to initial data
    onResetToInitial();

    // Close the form
    setOpen(false);
  };

  const handleApplyFilters = async () => {
    setIsLoading(true);
    try {
      const filterData = {
        dateType: filterValues.dateType,
        startDate: filterValues.startDate,
        endDate: filterValues.endDate,
        status: filterValues.status,
        table: filterValues.table,
      };

      const filteredReservations = await filterReservations(filterData);

      if (filteredReservations) {
        const formattedData = filteredReservations.map((res: any) => ({
          id: res._id,
          restaurantId: res.restaurantId?._id,
          fullname:
            `${res.guestUserId?.firstName || ""} ${res.guestUserId?.lastName || ""}`.trim(),
          contact: res.guestUserId?.contactNo || "",
          restaurant: res.restaurantId?.restaurantName || "",
          reservedfor: res.dining?.diningName || "",
          date: res.date || "",
          time: res.time || "",
          pax: res.guestSize || "",
          diningarea: res.diningArea?.sectionName || "",
          status: res.status || "",
          table: res.tableNo || "",
          createdOn: res.created_at || "",
        }));

        onFilterChange(formattedData);
      }

      setOpen(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  const filterGroup = [
    {
      title: "Timeframe",
      items: [
        {
          type: "radio",
          title: "All Time",
          value: "allTime",
        },
        {
          type: "radio",
          title: "Today",
          value: "today",
        },
        {
          type: "radio",
          title: "This Week",
          value: "thisWeek",
        },
        {
          type: "radio",
          title: "This Month",
          value: "thisMonth",
        },
        {
          type: "radio",
          title: "Custom Dates",
          value: "customDates",
        },
      ],
    },
    {
      title: "Status",
      items: [
        {
          type: "checkbox",
          title: "Booked",
          value: "booked",
        },
        {
          type: "checkbox",
          title: "Confirmed",
          value: "confirmed",
        },

        {
          type: "checkbox",
          title: "Arrived",
          value: "arrived",
        },
        {
          type: "checkbox",
          title: "Cancelled",
          value: "cancelled",
        },
      ],
    },
    {
      title: "Table",
      items: [
        {
          type: "checkbox",
          title: "Assigned",
          value: "assigned",
        },
        {
          type: "checkbox",
          title: "Unassigned",
          value: "unassigned",
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between flex-wrap gap-5 bg-white p-5 shadow-lg rounded-t-lg">
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
          <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-lg w-fit grow-0">
            Restaurant:{" "}
            <span className="font-medium">
              {currentRestaurant.restaurantName}
            </span>
          </div>
        )}
      </div>
      <FormSlider isOpen={open}>
        <div className="relative p-6 bg-white">
          <div className="mb-6 flex items-center justify-between w-full">
            <h5 className="text-xl font-semibold text-gray-800">
              Filter Options
            </h5>
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <IconXCircle className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <button
                type="button"
                className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  active === "0" ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => togglePara("0")}
              >
                <span className="font-medium text-gray-700">Restaurant</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    active === "0" ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimateHeight
                duration={300}
                height={active === "0" ? "auto" : 0}
              >
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="space-y-3">
                    {restaurants.map((restaurant: any) => (
                      <div key={restaurant._id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`restaurant-${restaurant._id}`}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          checked={restaurantId === restaurant._id}
                        />
                        <Link
                          href={`${ROUTE_RESERVATIONS}/${restaurant._id}`}
                          className="ml-3 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
                        >
                          {restaurant.restaurantName}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateHeight>
            </div>
            {filterGroup?.map((group: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 ${
                    active === String(index + 1) ? "bg-gray-50" : "bg-white"
                  }`}
                  onClick={() => togglePara(String(index + 1))}
                >
                  <span className="font-medium text-gray-700">
                    {group.title}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      active === String(index + 1) ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimateHeight
                  duration={300}
                  height={active === String(index + 1) ? "auto" : 0}
                >
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="space-y-3">
                      {group.items.map((item: any, itemIndex: number) => (
                        <div key={itemIndex} className="flex items-center">
                          <input
                            type={item.type}
                            id={`${group.title}-${item.value}`}
                            name={group.title}
                            className={`${
                              item.type === "radio"
                                ? "w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                                : "w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            }`}
                            onChange={(e) =>
                              handleFilterChange(
                                group.title,
                                item.value,
                                e.target.checked
                              )
                            }
                          />
                          <label
                            htmlFor={`${group.title}-${item.value}`}
                            className="ml-3 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
                          >
                            {item.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3 pt-4 border-t border-gray-200">
            <button
              className="flex-1 btn btn-outline-secondary"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
            <button
              className="flex-1 btn btn-primary"
              onClick={handleApplyFilters}
              disabled={isLoading}
            >
              {isLoading ? "Applying..." : "Apply Filters"}
            </button>
          </div>
        </div>
      </FormSlider>
    </>
  );
};

export default ReservationTableHead;
