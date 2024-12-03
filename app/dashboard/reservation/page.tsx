import ReservationHeader from "@/components/Pages/ReservationPage/ReservationHeader";
import ReservationTable from "@/components/Pages/ReservationPage/ReservationTable";

const ReservationPage = async () => {
  return (
    <main>
      <ReservationHeader/>
      <ReservationTable />
    </main>
  );
};

export default ReservationPage;
