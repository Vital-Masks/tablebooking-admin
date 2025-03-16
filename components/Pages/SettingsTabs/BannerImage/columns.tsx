"use client";

import { IconEye } from "@/components/Icons";
import { ROUTE_BANNER_IMAGE } from "@/constants/routes";
import Link from "next/link";

export const columns = [
  { accessor: "bannerName", title: "Banner Name" },
  { accessor: "bannerFor", title: "Banner For" },
  { accessor: "redirectTo", title: "Redirect To" },
  { accessor: "status", title: "Status" },
  {
    accessor: "action",
    title: "",
    titleClassName: "!text-center",
    render: ({ id }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <Link href={`${ROUTE_BANNER_IMAGE}?bannerId=${id}`}>
          <IconEye />
        </Link>
      </div>
    ),
  },
];
