"use client";

import { IconEye } from "@/components/Icons";
import Link from "next/link";

export const columns = [
  { accessor: "sectionName", title: "Section Name" },
  { accessor: "maxSeatsCount", title: "Max Seats Count" },
  { accessor: "seatingAreaType", title: "Seating Area Type" },
  {
    accessor: "action",
    title: "",
    titleClassName: "!text-center",
    render: ({ id }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <Link href={{ query: { edit: id } }}>
          <IconEye />
        </Link>
      </div>
    ),
  },
];
