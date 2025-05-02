"use client";

import { IconEye } from "@/components/Icons";
import { ROUTE_RESTAURANT_INQUIRY } from "@/constants/routes";
import Link from "next/link";

export const columns = [
  { accessor: "firstName", title: "First Name" },
  { accessor: "lastName", title: "Last Name" },
  { accessor: "contactNo", title: "Contact No" },
  { accessor: "email", title: "Email Address" },
  { accessor: "inquiryRelatedTo", title: "Inquiry Related To" },
  {
    accessor: "action",
    title: "",
    titleClassName: "!text-center",
    render: ({ id }: any) => (
      <div className="flex items-center gap-4 mx-auto w-max">
        <Link href={`${ROUTE_RESTAURANT_INQUIRY}?inquiryId=${id}`}>
          <IconEye />
        </Link>
      </div>
    ),
  },
];
