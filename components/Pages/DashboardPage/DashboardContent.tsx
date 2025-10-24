"use client";

import Button from "@/components/Elements/Button";
import AnalyticsCard from "@/components/Elements/AnalyticsCard";
import Dropdown from "@/components/Elements/Dropdown";
import { IconFilter, IconX } from "@/components/Icons";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import VanillaCalendar from "@/components/Common/Fields/VanillaCalendar";
import { Options } from "vanilla-calendar-pro";
import { useState, useCallback, useEffect } from "react";
import { getRestaurantsListByHospitalityChain } from "@/lib/actions/restaurant.actions";
import IconCalendar from "@/components/Icons/IconCalendar";

export default function DashboardContent({
  stats,
  hospitalityChains,
  lastWeek,
  todayFormatted,
  lastWeekFormatted,
}: {
  stats: any;
  hospitalityChains: any;
  lastWeek: Date;
  todayFormatted: string;
  lastWeekFormatted: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const hospitalityChainId = searchParams.get("hospitalityChainId");

  const [selectedDates, setSelectedDates] = useState<string[]>([
    lastWeekFormatted,
    todayFormatted,
  ]);

  const loadRestaurants = async ({
    hospitalityChainId,
  }: {
    hospitalityChainId: string;
  }) => {
    const restaurantsData =
      await getRestaurantsListByHospitalityChain(hospitalityChainId);
    setRestaurants(restaurantsData || []);
  };

  // Get active filters
  const getActiveFilters = () => {
    const filters = [];
    const restaurantId = searchParams.get("restaurantId");
    const city = searchParams.get("city");
    const customStart = searchParams.get("customStart");
    const customEnd = searchParams.get("customEnd");

    if (hospitalityChainId) {
      const chain = hospitalityChains?.find((c: any) => c._id === hospitalityChainId);
      filters.push({
        key: "hospitalityChainId",
        label: "Chain",
        value: chain?.chainName || hospitalityChainId,
      });
    }

    if (restaurantId) {
      const restaurant = restaurants?.find((r: any) => r._id === restaurantId);
      filters.push({
        key: "restaurantId",
        label: "Restaurant",
        value: restaurant?.restaurantName || restaurantId,
      });
    }

    if (city) {
      filters.push({
        key: "city",
        label: "City",
        value: city,
      });
    }

    if (customStart && customEnd) {
      filters.push({
        key: "dateRange",
        label: "Date Range",
        value: `${customStart} - ${customEnd}`,
      });
    }

    return filters;
  };

  // Clear specific filter
  const clearFilter = (filterKey: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    
    if (filterKey === "dateRange") {
      currentParams.delete("customStart");
      currentParams.delete("customEnd");
    } else {
      currentParams.delete(filterKey);
    }
    
    router.push(`/dashboard?${currentParams.toString()}`);
  };

  // Clear all filters
  const clearAllFilters = () => {
    router.push("/dashboard");
  };

  // Transform the stats data to match the analytics card format
  const analyticsData = [
    {
      title: "Total Reservations",
      value: stats?.reservations?.total || 0,
      icon: "🍴",
    },
    {
      title: "Restaurants Listed",
      value: stats?.restaurants?.total || 0,
      icon: "🏢",
    },
    {
      title: "Customers",
      value: stats?.customers?.total || 0,
      icon: "👤",
    },
    {
      title: "Booked Reservations",
      value: stats?.reservations?.booked || 0,
      icon: "📅",
    },
    {
      title: "Active Restaurants",
      value: stats?.restaurants?.active || 0,
      icon: "✅",
    },
    {
      title: "Active Customers",
      value: stats?.customers?.active || 0,
      icon: "👥",
    },
    {
      title: "Confirmed Reservations",
      value: stats?.reservations?.confirmed || 0,
      icon: "✅",
    },
    {
      title: "Inactive Restaurants",
      value: stats?.restaurants?.inactive || 0,
      icon: "❌",
    },
    {
      title: "Inactive Customers",
      value: stats?.customers?.inactive || 0,
      icon: "🚫",
    },
    {
      title: "Cancelled Reservations",
      value: stats?.reservations?.cancelled || 0,
      icon: "❌",
    },
  ];

  // Helper function to build query params while preserving existing ones
  const buildQueryParams = useCallback(
    (newParams: Record<string, string>) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        currentParams.set(key, value);
      });
      return Object.fromEntries(currentParams.entries());
    },
    [searchParams]
  );

  // Handle date range selection
  const handleDateRangeChange = useCallback(
    (startDate: string, endDate: string) => {
      const newParams = buildQueryParams({
        customStart: startDate,
        customEnd: endDate,
      });
      router.push(`/dashboard?${new URLSearchParams(newParams).toString()}`);
      setIsCalendarOpen(false);
    },
    [buildQueryParams, router]
  );

  const calendarOptions: Options = {
    type: "multiple",
    displayMonthsCount: 2,
    inputMode: true,
    enableEdgeDatesOnly: true,
    selectionDatesMode: "multiple-ranged",
    selectedDates: [lastWeekFormatted, todayFormatted],
    selectedMonth: lastWeek.getMonth() as
      | 0
      | 2
      | 1
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | undefined,
    selectedYear: lastWeek.getFullYear(),
    onChangeToInput(self) {
      if (!self.context.inputElement) return;
      if (self.context.selectedDates[0]) {
        setSelectedDates(self.context.selectedDates);
        router.push(
          `/dashboard?${new URLSearchParams(
            buildQueryParams({
              customStart: self.context.selectedDates[0],
              customEnd: self.context.selectedDates[1],
            })
          ).toString()}`
        );
      } else {
        setSelectedDates([lastWeekFormatted, todayFormatted]);
      }
    },
    layouts: {
      default: `
        <div className="vc-header" data-vc="header" role="toolbar" aria-label="Calendar Navigation">
          <#ArrowPrev />
          <div className="vc-header__content" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
          <#ArrowNext />
        </div>
        <div className="vc-wrapper" data-vc="wrapper">
          <#WeekNumbers />
          <div className="vc-content" data-vc="content">
            <#Week />
            <#Dates />
            <#DateRangeTooltip />
          </div>
        </div>
        <#ControlTime />
        <button id="btn-close" type="button" aria-label="Close Calendar">Close</button>
      `,
    },
  };

  useEffect(() => {
    if (hospitalityChainId) {
      loadRestaurants({ hospitalityChainId: hospitalityChainId });
    } else if (hospitalityChains) {
      loadRestaurants({ hospitalityChainId: hospitalityChains?.[0]?._id });
    }
  }, [hospitalityChainId, hospitalityChains]);

  return (
    <main>
      <div>
        <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
          <h2 className="text-lg text-black font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <div className="dropdown">
              <Dropdown
                placement="bottom-start"
                btnClassName="btn btn-primary dropdown-toggle shadow-none"
                button={
                  <>
                    <span>
                      <IconFilter className="mr-2 inline-block w-4 h-4" />
                    </span>
                    <span>Hospitality Chain</span>
                  </>
                }
              >
                <ul className="!min-w-[170px] max-h-[150px] overflow-y-auto">
                  {hospitalityChains?.map((hospitalityChain: any) => (
                    <li key={hospitalityChain._id}>
                      <Link
                        href={{
                          pathname: "/dashboard",
                          query: buildQueryParams({
                            hospitalityChainId: hospitalityChain._id,
                          }),
                        }}
                      >
                        {hospitalityChain.chainName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown">
              <Dropdown
                placement="bottom-start"
                btnClassName="btn btn-primary dropdown-toggle shadow-none"
                button={
                  <>
                    <span>
                      <IconFilter className="mr-2 inline-block w-4 h-4" />
                    </span>
                    <span>Restaurant</span>
                  </>
                }
              >
                <ul className="!min-w-[170px] max-h-[150px] overflow-y-auto">
                  {restaurants?.map((restaurant: any) => (
                    <li key={restaurant._id}>
                      <Link
                        href={{
                          pathname: "/dashboard",
                          query: buildQueryParams({
                            restaurantId: restaurant._id,
                          }),
                        }}
                      >
                        {restaurant.restaurantName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>
            <div className="dropdown">
              <Dropdown
                placement="bottom-start"
                btnClassName="btn btn-primary dropdown-toggle shadow-none"
                button={
                  <>
                    <span>
                      <IconFilter className="mr-2 inline-block w-4 h-4" />
                    </span>
                    <span>City</span>
                  </>
                }
              >
                <ul className="!min-w-[170px] max-h-[150px] overflow-y-auto">
                  <li>
                    <Link
                      href={{
                        pathname: "/dashboard",
                        query: buildQueryParams({
                          city: "Jaffna",
                        }),
                      }}
                    >
                      Jaffna
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/dashboard",
                        query: buildQueryParams({
                          city: "Colombo",
                        }),
                      }}
                    >
                      Colombo
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>

            <div className="w-[250px]">
              <VanillaCalendar
                config={calendarOptions}
                className="w-full mx-auto border rounded-md h-10 flex items-center text-xs py-2 px-2 cursor-pointer text-gray-600 font-bold"
              >
                <IconCalendar className="mr-2 inline-block w-4 h-4" />
                <span>
                  {selectedDates[0]} - {selectedDates[1]}
                </span>
              </VanillaCalendar>
            </div>
          </div>
        </div>

        {/* Active Filters Section */}
        {getActiveFilters().length > 0 && (
          <div className="panel p-3 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">
                Active Filters:
              </span>
              {getActiveFilters().map((filter) => (
                <div
                  key={filter.key}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  <span className="font-medium">{filter.label}:</span>
                  <span>{filter.value}</span>
                  <button
                    onClick={() => clearFilter(filter.key)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                    aria-label={`Clear ${filter.label} filter`}
                  >
                    <IconX className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium underline ml-2"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`col-span-3`}>
            <div className="grid grid-cols-3 mb-5 gap-5">
              {analyticsData.map((stat) => (
                <AnalyticsCard key={stat.title} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
