"use client";

import { IconEye } from "@/components/Icons";
import { ROUTE_PUSH_NOTIFICATION } from "@/constants/routes";
import Link from "next/link";

export const columns = [
  { accessor: "promocode", title: "Promocode" },
  { accessor: "promocodeFor", title: "Promocode For" },
  { accessor: "validFromDate", title: "Valid From" },
  { accessor: "validTillDate", title: "Valid Till" },
  { accessor: "amount", title: "Amount" },
  { accessor: "availabilityStatus", title: "Availability" },
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
