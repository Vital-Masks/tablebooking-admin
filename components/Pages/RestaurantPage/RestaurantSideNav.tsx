"use client";
import { usePathname } from "next/navigation";
import { tabs } from "./tabs";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const RestaurantSideNav = () => {
  const pathname = usePathname();
  const restaurantId = pathname.split("/")[3]; // Get the restaurantId from the URL
  const isDisabled = restaurantId === "c";

  return (
    <div
      className={`panel absolute z-10 hidden h-full w-[250px] max-w-full flex-none space-y-3 overflow-hidden p-4 rounded-r-none xl:relative xl:block xl:h-auto xl:rounded-r-none relative`}
    >
      <div className="flex h-full flex-col pb-16">
        <div className="relative h-full grow -mr-3.5 pr-3.5">
          <div className="space-y-1">
            {tabs.map((tab, index) => {
              const isFirstTab = index === 0;
              const isTabDisabled = isDisabled && !isFirstTab;
              const isActive = pathname.split("/")[4] === tab.id;

              const linkElement = (
                <Link
                  key={tab.id}
                  href={isTabDisabled ? "#" : tab.id}
                  type="button"
                  className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium ${
                    isTabDisabled
                      ? "cursor-not-allowed opacity-50 text-gray-400"
                      : "hover:bg-white-dark/10 hover:text-primary"
                  } ${
                    isActive
                      ? "bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary"
                      : ""
                  }`}
                  onClick={
                    isTabDisabled ? (e) => e.preventDefault() : undefined
                  }
                >
                  <div className="flex items-center">
                    <div className="ml-3">{tab.name}</div>
                  </div>
                </Link>
              );

              return isTabDisabled ? (
                <Tippy
                  key={tab.id}
                  content="Submit general details to enable"
                  placement="right"
                >
                  <div>
                    {linkElement}
                  </div>
                </Tippy>
              ) : (
                linkElement
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSideNav;
