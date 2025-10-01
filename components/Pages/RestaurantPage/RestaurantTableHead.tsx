"use client";

import FormSlider from "@/components/Common/Form/FormSlider";
import { IconFilter, IconXCircle } from "@/components/Icons";
import { useState } from "react";
import AnimateHeight from "react-animate-height";
import { filterRestaurants } from "@/lib/actions/restaurant.actions";

const RestaurantTableHead = ({
  restaurantType,
  onFilterChange,
  onSearchChange,
  onResetToInitial,
}: {
  restaurantType: any[];
  onFilterChange: (filteredData: any[]) => void;
  onSearchChange: (searchTerm: string) => void;
  onResetToInitial: () => void;
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("1");
  const [filterValues, setFilterValues] = useState({
    dateType: "",
    startDate: "",
    endDate: "",
    restaurantType: [] as string[],
    availabilityStatus: [] as string[],
    subscription: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleClearFilters = () => {
    // Reset all filter values
    setFilterValues({
      dateType: "",
      startDate: "",
      endDate: "",
      restaurantType: [],
      availabilityStatus: [],
      subscription: [],
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

  const togglePara = (value: string) => {
    setActive((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const handleFilterChange = (
    groupTitle: string,
    value: string,
    checked: boolean
  ) => {
    setFilterValues((prev) => {
      const newValues = { ...prev };

      if (groupTitle === "Timeframe") {
        newValues.dateType = checked ? value : "";
        if (value === "customDates") {
          // Handle custom dates - you might want to add date pickers
          newValues.startDate = "";
          newValues.endDate = "";
        }
      } else if (groupTitle === "Restaurant Type") {
        if (checked) {
          if (value === "all") {
            newValues.restaurantType = restaurantType.map((item) => item.value);
          } else {
            newValues.restaurantType = [...prev.restaurantType, value];
          }
        } else {
          if (value === "all") {
            newValues.restaurantType = [];
          } else {
            newValues.restaurantType = prev.restaurantType.filter(
              (item) => item !== value
            );
          }
        }
      } else if (groupTitle === "Availability") {
        if (checked) {
          if (value === "all") {
            newValues.availabilityStatus = ["Available", "Not Available"];
          } else {
            newValues.availabilityStatus = [...prev.availabilityStatus, value];
          }
        } else {
          if (value === "all") {
            newValues.availabilityStatus = [];
          } else {
            newValues.availabilityStatus = prev.availabilityStatus.filter(
              (item) => item !== value
            );
          }
        }
      } else if (groupTitle === "Subscription") {
        if (checked) {
          if (value === "all") {
            newValues.subscription = [
              "Free",
              "Classic",
              "Signature",
              "Premium",
            ];
          } else {
            newValues.subscription = [...prev.subscription, value];
          }
        } else {
          if (value === "all") {
            newValues.subscription = [];
          } else {
            newValues.subscription = prev.subscription.filter(
              (item) => item !== value
            );
          }
        }
      }

      return newValues;
    });
  };

  const handleApplyFilters = async () => {
    setIsLoading(true);
    try {
      const filterData = {
        dateType: filterValues.dateType,
        startDate: filterValues.startDate,
        endDate: filterValues.endDate,
        restaurantType: filterValues.restaurantType,
        availabilityStatus: filterValues.availabilityStatus,
        subscription: filterValues.subscription,
      };

      console.log(">>", filterData);

      const filteredRestaurants = await filterRestaurants(filterData);

      if (filteredRestaurants) {
        const formattedData = filteredRestaurants.map((res: any) => ({
          id: res._id,
          name: res.restaurantName,
          type: res.restaurantType,
          phone: res.contactNo,
          email: res.email,
          address: res.address,
          subscription: "Free plan",
          availability: res.availabilityStatus,
          createdOn: res.created_at,
          hospitalityChainId: res.hospitalityChainId?._id,
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
      title: "Restaurant Type",
      items: [
        // {
        //   type: "checkbox",
        //   title: "All",
        //   value: "all",
        // },
        ...restaurantType,
      ],
    },
    {
      title: "Availability",
      items: [
        // {
        //   type: "checkbox",
        //   title: "All",
        //   value: "all",
        // },
        {
          type: "checkbox",
          title: "Available",
          value: "available",
        },

        {
          type: "checkbox",
          title: "Unavailable",
          value: "unavailable",
        },
      ],
    },
    {
      title: "Subscription",
      items: [
        // {
        //   type: "checkbox",
        //   title: "All",
        //   value: "all",
        // },
        {
          type: "checkbox",
          title: "Free",
          value: "free",
        },
        {
          type: "checkbox",
          title: "Classic",
          value: "classic",
        },
        {
          type: "checkbox",
          title: "Signature",
          value: "signature",
        },
        {
          type: "checkbox",
          title: "Premium",
          value: "premium",
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between flex-wrap gap-5 bg-white p-6 shadow-sm border border-gray-100 rounded-lg">
        <div className="flex items-center gap-4">
          <button
            className="btn btn-primary btn-sm flex items-center gap-2 hover:shadow-md transition-all duration-200"
            onClick={() => setOpen(true)}
          >
            <IconFilter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-gray-400"
              placeholder="Search restaurants..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {filterValues.restaurantType.length > 0 && (
            <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-lg w-fit grow-0">
              Restaurant:{" "}
              <span className="font-medium">
                {filterValues.restaurantType.join(", ")}
              </span>
            </div>
          )}
          {filterValues.availabilityStatus.length > 0 && (
            <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-lg w-fit grow-0">
              Availability:{" "}
              <span className="font-medium">
                {filterValues.availabilityStatus.join(", ")}
              </span>
            </div>
          )}
          {filterValues.subscription.length > 0 && (
            <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-lg w-fit grow-0">
              Subscription:{" "}
              <span className="font-medium">
                {filterValues.subscription.join(", ")}
              </span>
            </div>
          )}
          {filterValues.dateType && (
            <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-lg w-fit grow-0">
              Date Type:{" "}
              <span className="font-medium">{filterValues.dateType}</span>
            </div>
          )}
          {filterValues.startDate && filterValues.endDate && (
            <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-lg w-fit grow-0">
              Date Range:{" "}
              <span className="font-medium">
                {filterValues.startDate} - {filterValues.endDate}
              </span>
            </div>
          )}
        </div>
      </div>

      <FormSlider isOpen={open}>
        <div className="relative p-6 bg-white">
          <div className="mb-6 flex items-center justify-between w-full">
            <h5 className="text-xl font-semibold text-gray-800">
              Filter Options
            </h5>
            <button
              onClick={handleCloseForm}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <IconXCircle className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
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
                            className="ml-3 mb-0 text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
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

export default RestaurantTableHead;
