import Button from "@/components/Elements/Button";
import AnalyticsCard from "@/components/Elements/AnalyticsCard";
export default function DashboardContent() {
  const stats = [
    {
      title: "Total Reservations",
      value: 24568,
      icon: "🍴",
    },
    {
      title: "Restaurants Listed",
      value: 568,
      icon: "🏢",
    },
    {
      title: "Customers",
      value: 3559,
      icon: "👤",
    },
    {
      title: "Completed Reservations",
      value: 1234,
      icon: "🍴",
    },
    {
      title: "Active Restaurants",
      value: 1234,
      icon: "🏢",
    },
    {
      title: "Active Customers",
      value: 1234,
      icon: "👤",
    },
    {
      title: "Pending Reservations",
      value: 1234,
      icon: "🍴",
    },
    {
      title: "Non Active Restaurants",
      value: 1234,
      icon: "🏢",
    },
    {
      title: "Non Active Customers",
      value: 0,
      icon: "👤",
    },
    {
      title: "Cancelled Reservations",
      value: 1234,
      icon: "🍴",
    },
  ];

  return (
    <main>
      <div>
        <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
          <h2 className="text-lg text-black font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button type="outlined">Export</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`col-span-3`}>
            <div className="grid grid-cols-3 mb-5 gap-5">
              {stats.map((stat) => (
                <AnalyticsCard key={stat.title} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
