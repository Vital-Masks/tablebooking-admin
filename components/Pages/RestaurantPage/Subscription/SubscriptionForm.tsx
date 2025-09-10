"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import Button from "@/components/Elements/Button";

import {
  subscriptionFormFields,
  subscriptionFormSchema,
} from "@/constants/FormsDataJs/SubscriptionForm";
import toast from "react-hot-toast";
import ToastBanner from "@/components/Elements/ToastBanner";
import {
  createSubscription,
  getRestaurantSubscriptionById,
  getSubscriptionPlanById,
  updateSubscription,
} from "@/lib/actions/subscription.action";
import {
  findField,
  formatPriceInLKR,
  handleError,
  returnCommonObject,
} from "@/lib/utils";
import moment from "moment";

const SubscriptionForm = ({ params, subscriptionPlansOptions }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const subscriptionId = searchParams.get("edit");

  const [planPrice, setPlanPrice] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<any>(null);

  const defaultInitialValues = {
    subscriptionType: "",
    period: "",
    startDate: new Date(),
    endDate: new Date(),
    payment: 0,
    discountValue: 0,
    discountType: "percentage",
    isActive: false,
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  const closeForm = () => {
    setInitialValues(defaultInitialValues);
    setIsFormOpen(false);
    setPlanPrice(null);
    setTotalPrice(null);
    router.replace(pathname, { scroll: false });
  };

  const onSubmit = async (formData: CreateSubscriptionParams) => {
    try {
      if (params.restaurantId === "c") {
        toast.custom((t) => (
          <ToastBanner
            t={t}
            type="ERROR"
            message="Restaurant don't exist!"
            detail="Please fill the general details first."
          />
        ));
        return { success: false };
      }

      const data = {
        ...formData,
        planId: formData.planId,
        restaurantId: params.restaurantId,
        discount: {
          value: formData.discountValue || 0,
          type: formData.discountType || "percentage",
        },
        planFee: planPrice,
        totalFee: totalPrice,
      };

      let result: any;
      if (subscriptionId) {
        result = await updateSubscription(subscriptionId, data);
        if (result?.error) {
          // Handle API error response
          const errorMessage = result?.error?.message || "Update failed!";
          const errorDetail =
            result?.error?.details?.plan?.[0] ||
            "Please check your data and try again.";

          // Check for specific subscription plan error
          if (
            result?.error?.details?.plan?.[0]?.includes(
              "Already subscription plan exists"
            )
          ) {
            toast.custom((t) => (
              <ToastBanner
                t={t}
                type="ERROR"
                message="Subscription Plan Already Exists"
                detail="Please deactivate your current subscription plan before updating."
              />
            ));
          } else {
            toast.custom((t) => (
              <ToastBanner
                t={t}
                type="ERROR"
                message={errorMessage}
                detail={errorDetail}
              />
            ));
          }
          return { success: false };
        } else {
          toast.custom((t) => (
            <ToastBanner t={t} type="SUCCESS" message="Updated Successfully!" />
          ));
          closeForm();
          return { success: true };
        }
      } else {
        result = await createSubscription(data);
        console.log(">>", result);
        if (result && result.success) {
          toast.custom((t) => (
            <ToastBanner t={t} type="SUCCESS" message="Created Successfully!" />
          ));
          closeForm();
          return { success: true };
        } else {
          const errorDetail =
            result?.error?.details?.plan[0] ?? result?.error?.message;
          // Check for specific subscription plan error
          if (errorDetail) {
            toast.custom((t) => (
              <ToastBanner
                t={t}
                type="ERROR"
                message="Creation failed!"
                detail={errorDetail}
              />
            ));
          }
          return { success: false };
        }
      }

      
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.custom((t) => (
        <ToastBanner
          t={t}
          type="ERROR"
          message="Something went wrong!"
          detail="Please try again later."
        />
      ));
      return { success: false };
    }
  };

  const fetchSubscription = async () => {
    if (!subscriptionId || params.restaurantId === "c") return;

    try {
      const response: any = await getRestaurantSubscriptionById(subscriptionId);

      if (response) {
        let data = returnCommonObject(initialValues, response);
        data["planId"] = response.planId._id;
        data["startDate"] = moment(data["startDate"]).format("YYYY-MM-DD");
        data["endDate"] = moment(data["endDate"]).format("YYYY-MM-DD");
        data["discountType"] = response.discount?.type;
        data["discountValue"] = response?.discount?.value;
        setInitialValues(data);
        setIsFormOpen(true);
      }
    } catch (error) {
      handleError(
        "An error occurred while fetching cuisine menu details:",
        error
      );
    }
  };

  useEffect(() => {
    if (subscriptionId) {
      fetchSubscription();
    }
  }, [subscriptionId]);

  useEffect(() => {
    if (subscriptionPlansOptions) {
      findField(subscriptionFormFields, "planId")["options"] =
        subscriptionPlansOptions;
    }
  }, [subscriptionPlansOptions]);

  useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);

  // Calculate total price with discount
  const calculateTotalPrice = (basePrice: number, period: string, discountValue: number, discountType: string) => {
    const periodMultiplier = getPeriodMultiplier(period);
    let totalPrice = basePrice * periodMultiplier;
    
    if (discountValue > 0) {
      const discountAmount = discountType === "percentage" 
        ? totalPrice * (discountValue / 100)
        : discountValue;
      totalPrice -= discountAmount;
    }
    
    return Math.max(0, totalPrice);
  };

  // Get period multiplier for pricing calculation
  const getPeriodMultiplier = (period: string): number => {
    const multipliers = {
      monthly: 1,
      quarterly: 3,
      yearly: 12
    };
    return multipliers[period as keyof typeof multipliers] || 1;
  };

  // Handle form value changes
  const handleFormChange = async (values: any) => {
    if (!values.planId) {
      setPlanPrice(null);
      setTotalPrice(null);
      return;
    }

    try {
      const planData: any = await getSubscriptionPlanById(values.planId);
      
      if (!planData || typeof planData.price !== 'number') {
        console.error("Invalid plan data received");
        setPlanPrice(null);
        setTotalPrice(null);
        return;
      }
      
      const basePrice = planData.price;
      const discountValue = parseFloat(values.discountValue) || 0;
      const discountType = values.discountType || "percentage";
      
      setPlanPrice(basePrice);
      
      const calculatedTotalPrice = calculateTotalPrice(
        basePrice,
        values.period,
        discountValue,
        discountType
      );
      
      setTotalPrice(calculatedTotalPrice);
    } catch (error) {
      console.error("Error fetching plan details:", error);
      setPlanPrice(null);
      setTotalPrice(null);
    }
  };

  return (
    <>
      <Button
        type="filled"
        className="absolute top-5 right-5"
        onClick={() => setIsFormOpen(true)}
      >
        + Create new
      </Button>
      <FormSlider isOpen={isFormOpen}>
        <FormComponent
          title="Create Subscription"
          fields={subscriptionFormFields}
          initialValues={initialValues}
          validationSchema={subscriptionFormSchema}
          closeForm={closeForm}
          handleSubmit={onSubmit}
          onFormChange={handleFormChange}
        >
          {planPrice && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <p>Amount</p>
                <p></p>
              </div>
              <span className="flex justify-between items-center">
                <p>Plan Fee</p>
                <p className="font-bold">{formatPriceInLKR(planPrice)}</p>
              </span>
              <span className="flex justify-between items-center">
                <p>Total Fee</p>
                <p className="font-bold">{formatPriceInLKR(totalPrice)}</p>
              </span>
            </div>
          )}
        </FormComponent>
      </FormSlider>
    </>
  );
};

export default SubscriptionForm;
