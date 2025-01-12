"use client";

import { IconEye } from "@/components/Icons";
import { ROUTE_AUTO_NOTIFICATION } from "@/constants/routes";
import Link from "next/link";

export const columns = [
  { accessor: "notificationType", title: "Notification Type" },
  { accessor: "notification", title: "Notification" },
  {
    accessor: "action",
    title: "",
    titleClassName: "!text-center",
    render: ({ id }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <Link href={`${ROUTE_AUTO_NOTIFICATION}?notificationId=${id}`}>
          <IconEye />
        </Link>
      </div>
    ),
  },
];
