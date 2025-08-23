import SubscriptionForm from "@/components/Pages/RestaurantPage/Subscription/SubscriptionForm";
import SubscriptionTable from "@/components/Pages/RestaurantPage/Subscription/SubscriptionTable";

const SubscriptionPage = ({ params }: any) => {
  return (
    <div>
      <SubscriptionTable params={params} />
      <SubscriptionForm params={params} />
    </div>
  );
};

export default SubscriptionPage;
