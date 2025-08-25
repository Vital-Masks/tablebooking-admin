"use client";
import React, { useState } from "react";
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
  updateSubscription,
} from "@/lib/actions/subscription.action";

const SubscriptionForm = ({ params }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const diningId = searchParams.get("edit");

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
        return;
      }

      const data = {
        ...formData,
        planId: "689dc427f0afdcaf0c32853f",
        restaurantId: params.restaurantId,
        discount: {
          value: formData.discountValue || 0,
          type: formData.discountType || "percentage",
        },
      };

      let result: any;
      if (diningId) {
        result = await updateSubscription(diningId, data);
        if (result && result.success) {
          toast.custom((t) => (
            <ToastBanner t={t} type="SUCCESS" message="Updated Successfully!" />
          ));
          closeForm();
        } else {
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
        }
      } else {
        result = await createSubscription(data);
        if (result && result.success) {
          toast.custom((t) => (
            <ToastBanner t={t} type="SUCCESS" message="Created Successfully!" />
          ));
          closeForm();
        } else {
          // Check for specific subscription plan error
          if (result?.error?.details?.plan) {
            toast.custom((t) => (
              <ToastBanner
                t={t}
                type="ERROR"
                message="Creation failed!"
                detail={result?.error?.details?.plan[0]}
              />
            ));
          } else {
            toast.custom((t) => (
              <ToastBanner
                t={t}
                type="ERROR"
                message="Creation failed!"
                detail={result?.error?.message}
              />
            ));
          }
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
        />
      </FormSlider>
    </>
  );
};

export default SubscriptionForm;
