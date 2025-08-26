import SubscriptionForm from "@/components/Pages/RestaurantPage/Subscription/SubscriptionForm";
import SubscriptionTable from "@/components/Pages/RestaurantPage/Subscription/SubscriptionTable";
import { getAllRSubscriptionPlans } from "@/lib/actions/subscription.action";

const SubscriptionPage = async ({ params }: any) => {
  const subscriptionPlans = await getAllRSubscriptionPlans();
  const subscriptionPlansOptions = subscriptionPlans?.map((plan: any) => ({
    label: plan.name,
    value: plan._id,
  }));

  return (
    <div>
      <SubscriptionTable params={params} />
      <SubscriptionForm params={params} subscriptionPlansOptions={subscriptionPlansOptions} />
    </div>
  );
};

export default SubscriptionPage;
