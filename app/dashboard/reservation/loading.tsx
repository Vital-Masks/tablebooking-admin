import PageHeaderSkeleton from "@/components/Skeleton/PageHeaderSkeleton";
import TableSkeleton from "@/components/Skeleton/TableSkeleton";

// Main loading component
const ReservationLoading = () => {
  return (
    <main>
      <PageHeaderSkeleton />
      <TableSkeleton />
    </main>
  );
};

export default ReservationLoading;
