"use client";

import Button from "@/components/Elements/Button";
import AnalyticsCard from "@/components/Elements/AnalyticsCard";
import SubscriptionPlanCard from "@/components/Elements/SubscriptionPlanCard";
import ReservationStatusCard from "@/components/Elements/ReservationStatusCard";
import CustomerSegmentCard from "@/components/Elements/CustomerSegmentCard";
import RevenueCard from "@/components/Elements/RevenueCard";
import SubscriptionRevenueCard from "@/components/Elements/SubscriptionRevenueCard";
import AddonRevenueCard from "@/components/Elements/AddonRevenueCard";
import ReservationLeaderboardCard from "@/components/Elements/ReservationLeaderboardCard";
import RevenueLeaderboardCard from "@/components/Elements/RevenueLeaderboardCard";
import Dropdown from "@/components/Elements/Dropdown";
import { IconFilter, IconX, IconChefHat, IconMenuCalendar, IconCustomer, IconPayment } from "@/components/Icons";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import VanillaCalendar from "@/components/Common/Fields/VanillaCalendar";
import { Options } from "vanilla-calendar-pro";
import { useState, useCallback, useEffect, Fragment } from "react";
import { getRestaurantsListByHospitalityChain } from "@/lib/actions/restaurant.actions";
import IconCalendar from "@/components/Icons/IconCalendar";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

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
  const [restaurants, setRestaurants] = useState<any>({});
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
      const restaurant = restaurants.data?.find((r: any) => r._id === restaurantId);
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

  // Transform the stats data to match the analytics card format - only 4 main cards
  const analyticsData = [
    {
      title: "Total Restaurants",
      value: stats?.restaurants?.total || 0,
      icon: <IconChefHat className="w-6 h-6" />,
      trend: {
        value: 80,
        isPositive: true,
        label: "from last month"
      }
    },
    {
      title: "Total Reservations",
      value: stats?.reservations?.total || 0,
      icon: <IconMenuCalendar className="w-6 h-6" />,
      trend: {
        value: 80,
        isPositive: true,
        label: "from last month"
      }
    },
    {
      title: "Total Customers",
      value: stats?.customers?.total || 0,
      icon: <IconCustomer className="w-6 h-6" />,
      trend: {
        value: 80,
        isPositive: true,
        label: "from last month"
      }
    },
    {
      title: "Total Revenue",
      value: stats?.revenue?.total || stats?.revenue || 0,
      icon: <IconPayment className="w-6 h-6" />,
      trend: {
        value: 80,
        isPositive: true,
        label: "from last month"
      },
      isCurrency: true
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
                  {restaurants?.data?.map((restaurant: any) => (
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

        <div className="grid grid-cols-4 items-start gap-5 mb-8">
          {analyticsData.map((stat) => (
            <AnalyticsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Subscription Plan Metrics Section */}
        <div className="mt-8">
          <TabGroup>
            <TabList className="flex flex-wrap bg-white border-b border-gray-200">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${selected ? "!border-primary text-primary !outline-none" : ""} flex items-center border-b-2 border-transparent bg-white px-7 py-3 font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors`}
                  >
                    Subscription Plans
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${selected ? "!border-primary text-primary !outline-none" : ""} flex items-center border-b-2 border-transparent bg-white px-7 py-3 font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors`}
                  >
                    Reservations
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${selected ? "!border-primary text-primary !outline-none" : ""} flex items-center border-b-2 border-transparent bg-white px-7 py-3 font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors`}
                  >
                    Customer
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${selected ? "!border-primary text-primary !outline-none" : ""} flex items-center border-b-2 border-transparent bg-white px-7 py-3 font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors`}
                  >
                    Revenue
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${selected ? "!border-primary text-primary !outline-none" : ""} flex items-center border-b-2 border-transparent bg-white px-7 py-3 font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors`}
                  >
                    Leaderboard
                  </button>
                )}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="mt-5">
                  <div className="grid grid-cols-4 items-start gap-5">
                    {[
                      {
                        title: "Free",
                        total: stats?.subscriptions?.free?.total || 864,
                        monthlySubscribed: stats?.subscriptions?.free?.monthly || 654,
                        annuallySubscribed: stats?.subscriptions?.free?.annually || 210,
                        trend: { value: 80, isPositive: true, label: "from last month" }
                      },
                      {
                        title: "Classic",
                        total: stats?.subscriptions?.classic?.total || 344,
                        monthlySubscribed: stats?.subscriptions?.classic?.monthly || 300,
                        annuallySubscribed: stats?.subscriptions?.classic?.annually || 44,
                        trend: { value: 80, isPositive: true, label: "from last month" }
                      },
                      {
                        title: "Signature",
                        total: stats?.subscriptions?.signature?.total || 242,
                        monthlySubscribed: stats?.subscriptions?.signature?.monthly || 160,
                        annuallySubscribed: stats?.subscriptions?.signature?.annually || 82,
                        trend: { value: 80, isPositive: true, label: "from last month" }
                      },
                      {
                        title: "Premium",
                        total: stats?.subscriptions?.premium?.total || 118,
                        monthlySubscribed: stats?.subscriptions?.premium?.monthly || 76,
                        annuallySubscribed: stats?.subscriptions?.premium?.annually || 42,
                        trend: { value: 80, isPositive: true, label: "from last month" }
                      },
                    ].map((plan) => (
                      <SubscriptionPlanCard key={plan.title} {...plan} />
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="mt-5">
                  <div className="grid grid-cols-5 items-start gap-5">
                    {[
                      {
                        title: "Confirmed",
                        value: stats?.reservations?.confirmed || 20564,
                        trend: { value: 80, isPositive: true, label: "from last month" },
                        icon: (
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )
                      },
                      {
                        title: "Arrived",
                        value: stats?.reservations?.arrived || 22168,
                        trend: { value: 80, isPositive: true, label: "from last month" },
                        icon: (
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )
                      },
                      {
                        title: "Cancelled",
                        value: stats?.reservations?.cancelled || 568,
                        trend: { value: 80, isPositive: false, label: "from last month" },
                        icon: (
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      },
                      {
                        title: "No Show",
                        value: stats?.reservations?.noShow || 1032,
                        trend: { value: 25, isPositive: true, label: "from last month" },
                        icon: (
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        )
                      },
                      {
                        title: "Pending",
                        value: stats?.reservations?.pending || 800,
                        trend: { value: 15, isPositive: true, label: "from last month" },
                        icon: (
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" />
                            <circle cx="12" cy="12" r="1" fill="currentColor" />
                            <circle cx="7" cy="12" r="1" fill="currentColor" />
                            <circle cx="17" cy="12" r="1" fill="currentColor" />
                          </svg>
                        )
                      },
                    ].map((status) => (
                      <ReservationStatusCard key={status.title} {...status} />
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="mt-5">
                  <div className="grid grid-cols-4 items-start gap-5">
                    {[
                      {
                        title: "Active Customers",
                        value: stats?.customers?.active || 3003,
                        trend: { value: 80, isPositive: true, label: "from last month" }
                      },
                      {
                        title: "Newly Onboarded",
                        value: stats?.customers?.newlyOnboarded || 334,
                        trend: { value: 80, isPositive: true, label: "from last month" }
                      },
                      {
                        title: "Repeated Customers",
                        value: stats?.customers?.repeated || 764,
                        trend: { value: 80, isPositive: true, label: "from last month" }
                      },
                      {
                        title: "Inactive Customers",
                        value: stats?.customers?.inactive || 60,
                        trend: { value: 80, isPositive: true, label: "from last month" }
                      },
                    ].map((segment) => (
                      <CustomerSegmentCard key={segment.title} {...segment} />
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="mt-5 space-y-8">
                  {/* Revenue from Subscriptions Section */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-5">Revenue from Subscriptions</h4>
                    <div className="grid grid-cols-1 items-start gap-5 mb-6">
                      <RevenueCard
                        title="Revenue from Subscriptions (LKR)"
                        revenue={stats?.revenue?.subscriptions?.total || 19270000}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-5">
                      <SubscriptionRevenueCard
                        title="Free"
                        revenue={stats?.revenue?.subscriptions?.free || 0}
                        monthlySubscribed={stats?.subscriptions?.free?.monthly || 654}
                        annuallySubscribed={stats?.subscriptions?.free?.annually || 210}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                      <SubscriptionRevenueCard
                        title="Classic"
                        revenue={stats?.revenue?.subscriptions?.classic || 3480000}
                        monthlySubscribed={stats?.subscriptions?.classic?.monthly || 300}
                        annuallySubscribed={stats?.subscriptions?.classic?.annually || 44}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                      <SubscriptionRevenueCard
                        title="Signature"
                        revenue={stats?.revenue?.subscriptions?.signature || 8980000}
                        monthlySubscribed={stats?.subscriptions?.signature?.monthly || 160}
                        annuallySubscribed={stats?.subscriptions?.signature?.annually || 82}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                      <SubscriptionRevenueCard
                        title="Premium"
                        revenue={stats?.revenue?.subscriptions?.premium || 6810000}
                        monthlySubscribed={stats?.subscriptions?.premium?.monthly || 76}
                        annuallySubscribed={stats?.subscriptions?.premium?.annually || 42}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                    </div>
                  </div>

                  {/* Revenue from Add-ons Section */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-5">Revenue from Add-ons</h4>
                    <div className="grid grid-cols-1 items-start gap-5 mb-6">
                      <RevenueCard
                        title="Revenue from Add-ons (LKR)"
                        revenue={stats?.revenue?.addons?.total || 688298}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-5">
                      <AddonRevenueCard
                        title="Dining Timing"
                        revenue={stats?.revenue?.addons?.diningTiming || 93886}
                        noOfRestaurants={stats?.addons?.diningTiming?.restaurants || 314}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                      <AddonRevenueCard
                        title="Reservation History"
                        revenue={stats?.revenue?.addons?.reservationHistory || 60099}
                        noOfRestaurants={stats?.addons?.reservationHistory?.restaurants || 201}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                      <AddonRevenueCard
                        title="User Roles"
                        revenue={stats?.revenue?.addons?.userRoles || 81627}
                        noOfRestaurants={stats?.addons?.userRoles?.restaurants || 273}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                      <AddonRevenueCard
                        title="Booking Widget"
                        revenue={stats?.revenue?.addons?.bookingWidget || 452686}
                        noOfRestaurants={stats?.addons?.bookingWidget?.restaurants || 1514}
                        trend={{ value: 80, isPositive: true, label: "from last month" }}
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="mt-5 space-y-8">
                  {/* Reservation Leaderboard Section */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-5">#Reservation Leaderboard</h3>
                    <div className="grid grid-cols-4 items-start gap-5">
                      {[
                        {
                          rank: 1,
                          restaurantName: "The Central Restaurant",
                          reservationsMade: stats?.leaderboard?.reservations?.[0]?.reservationsMade || 654,
                          reservationsCompleted: stats?.leaderboard?.reservations?.[0]?.reservationsCompleted || 640,
                          positionChange: stats?.leaderboard?.reservations?.[0]?.positionChange || 2,
                          associatedGroup: stats?.leaderboard?.reservations?.[0]?.associatedGroup || "Shangri La"
                        },
                        {
                          rank: 2,
                          restaurantName: "Thalaipakatty Rajagiriya",
                          reservationsMade: stats?.leaderboard?.reservations?.[1]?.reservationsMade || 654,
                          reservationsCompleted: stats?.leaderboard?.reservations?.[1]?.reservationsCompleted || 590,
                          positionChange: stats?.leaderboard?.reservations?.[1]?.positionChange || -1,
                          associatedGroup: stats?.leaderboard?.reservations?.[1]?.associatedGroup || "Dindukal Thalaipakaty"
                        },
                        {
                          rank: 3,
                          restaurantName: "The Central Cafe",
                          reservationsMade: stats?.leaderboard?.reservations?.[2]?.reservationsMade || 654,
                          reservationsCompleted: stats?.leaderboard?.reservations?.[2]?.reservationsCompleted || 587,
                          positionChange: stats?.leaderboard?.reservations?.[2]?.positionChange || 1,
                          associatedGroup: stats?.leaderboard?.reservations?.[2]?.associatedGroup || "Shangri La"
                        },
                        {
                          rank: 4,
                          restaurantName: "Barista Bambalapity",
                          reservationsMade: stats?.leaderboard?.reservations?.[3]?.reservationsMade || 654,
                          reservationsCompleted: stats?.leaderboard?.reservations?.[3]?.reservationsCompleted || 512,
                          positionChange: stats?.leaderboard?.reservations?.[3]?.positionChange || 6,
                          associatedGroup: stats?.leaderboard?.reservations?.[3]?.associatedGroup || "Barista"
                        },
                      ].map((item) => (
                        <ReservationLeaderboardCard key={item.rank} {...item} />
                      ))}
                    </div>
                  </div>

                  {/* Revenue Leaderboard Section */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-5">#Revenue Leaderboard</h3>
                    <div className="grid grid-cols-4 items-start gap-5">
                      {[
                        {
                          rank: 1,
                          restaurantName: "Thalaipakatty Rajagiriya",
                          revenue: stats?.leaderboard?.revenue?.[0]?.revenue || 654500,
                          positionChange: stats?.leaderboard?.revenue?.[0]?.positionChange || 2,
                          associatedGroup: stats?.leaderboard?.revenue?.[0]?.associatedGroup || "Shangri La"
                        },
                        {
                          rank: 2,
                          restaurantName: "The Central Restaurant",
                          revenue: stats?.leaderboard?.revenue?.[1]?.revenue || 564500,
                          positionChange: stats?.leaderboard?.revenue?.[1]?.positionChange || 2,
                          associatedGroup: stats?.leaderboard?.revenue?.[1]?.associatedGroup || "Shangri La"
                        },
                        {
                          rank: 3,
                          restaurantName: "Barista Jaffna",
                          revenue: stats?.leaderboard?.revenue?.[2]?.revenue || 434500,
                          positionChange: stats?.leaderboard?.revenue?.[2]?.positionChange || 2,
                          associatedGroup: stats?.leaderboard?.revenue?.[2]?.associatedGroup || "Barista"
                        },
                        {
                          rank: 4,
                          restaurantName: "Northgate Jaffna",
                          revenue: stats?.leaderboard?.revenue?.[3]?.revenue || 214500,
                          positionChange: stats?.leaderboard?.revenue?.[3]?.positionChange || 2,
                          associatedGroup: stats?.leaderboard?.revenue?.[3]?.associatedGroup || "Northgate Hotel"
                        },
                      ].map((item) => (
                        <RevenueLeaderboardCard key={item.rank} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </main>
  );
}
