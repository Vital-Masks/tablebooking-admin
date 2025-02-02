"use client";

import { IconEye } from "@/components/Icons";
import { ROUTE_PUSH_NOTIFICATION } from "@/constants/routes";
import Link from "next/link";

export const columns = [
  { accessor: "notificationTitle", title: "Notification Title" },
  { accessor: "customersOf", title: "Customers Of" },
  { accessor: "createdAt", title: "Scheduled" },
  { accessor: "status", title: "Status" },
  {
    accessor: "action",
    title: "",
    titleClassName: "!text-center",
    render: ({ id }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <Link href={`${ROUTE_PUSH_NOTIFICATION}?notificationId=${id}`}>
          <IconEye />
        </Link>
      </div>
    ),
  },
];
