"use client";

import { IconEye, IconTrash } from "@/components/Icons";
import { ROUTE_RESERVATIONS } from "@/constants/routes";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const columns = [
  { accessor: "fullname", title: "Full Name" },
  { accessor: "contact", title: "Contact No" },
  { accessor: "restaurant", title: "Restaurant" },
  { accessor: "reservedfor", title: "Reserved For" },
  { accessor: "date", title: "Date",  render: ({ date }: any) => <div>{formatDate(date)}</div> },
  { accessor: "time", title: "Time" },
  { accessor: "pax", title: "Pax" },
  { accessor: "diningarea", title: "Dining Area" },
  { accessor: "status", title: "Status" },
  { accessor: "table", title: "Table" },
  {
    accessor: "createdOn",
    title: "Created on",
    render: ({ createdOn }: any) => <div>{formatDate(createdOn)}</div>,
  },
  {
    accessor: "action",
    title: "",
    titleClassName: "!text-center",
    render: ({ id }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
          <Link href={`${ROUTE_RESERVATIONS}?reservationId=${id}`}>
            <IconEye />
          </Link>
      </div>
    ),
  },
];
