import type { Metadata } from "next";
import CustomerHeader from "@/components/Pages/CustomerPage/CustomerHeader";
import CustomerTable from "@/components/Pages/CustomerPage/CustomerTable";

export const dynamic = "force-dynamic";

// Dynamic metadata generation
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Customers | VReserve Admin",
    description:
      "Manage customer accounts, view customer data and reservations in VReserve Admin",
    keywords: [
      "customers",
      "customer management",
      "user accounts",
      "vreserve",
      "admin",
    ],
    openGraph: {
      title: "Customers | VReserve Admin",
      description:
        "Manage customer accounts, view customer data and reservations in VReserve Admin",
      type: "website",
    },
  };
};

export default function CustomerPage() {
  return (
    <main>
      <CustomerHeader />
      <CustomerTable />
    </main>
  );
}
