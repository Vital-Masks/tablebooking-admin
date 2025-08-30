"use client";

import { IconEye } from "@/components/Icons";
import Link from "next/link";

export const columns = [
  { accessor: "addonsType", title: "Addons Type" },
  { accessor: "period", title: "Period" },
  { accessor: "fromDate", title: "From Date" },
  { accessor: "toDate", title: "To Date" },
  { accessor: "payment", title: "Payment" },
  { accessor: "amount", title: "Amount" },
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
