"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import Button from "@/components/Elements/Button";

import {
  findField,
  formatPriceInLKR,
  handleError,
  returnCommonObject,
} from "@/lib/utils";
import {
  adonsFormFields,
  adonsFormSchema,
} from "@/constants/FormsDataJs/adonsForm";
import toast from "react-hot-toast";
import ToastBanner from "@/components/Elements/ToastBanner";
import {
  createAdon,
  getAdonPlanById,
  getRestaurantAdonById,
  updateAdon,
} from "@/lib/actions/adons.action";
import moment from "moment";

const AdonsForm = ({ params, adonsPlansOptions }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const adonId = searchParams.get("edit");
  const [planPrice, setPlanPrice] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<any>(null);

  const defaultInitialValues = {
    addonid: "",
    count: "",
    addontype: "",
    period: "",
    startdate: "",
    paymenttype: "",
    discountValue: "",
    discountType: "",
    status: "",
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

  const fetchAdon = async () => {
    if (!adonId || params.restaurantId === "c") return;

    try {
      const response: any = await getRestaurantAdonById(adonId);
   
      if (response) {
        const data = {
          addonid: response.addonid._id,
          count: response.count,
          addontype: response.addontype,
          period: response.period,
          startdate: moment(response.startdate).format("YYYY-MM-DD"),
          paymenttype: response.paymenttype,
          discountValue: response.discount.value,
          discountType: response.discount.type,
          status: response.status,
        };

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

  const onSubmit = async (formData: CreateAdonParams) => {
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
        restaurantid: params.restaurantId,
        discount: {
          value: formData.discountValue || 0,
          type: formData.discountType || "percentage",
        },
        addonfee: planPrice,
        totalfee: totalPrice,
      };
      let result: any;
      if (adonId) {
        result = await updateAdon(adonId, data);
        if (result) {
          toast.custom((t) => (
            <ToastBanner t={t} type="SUCCESS" message="Updated Successfully!" />
          ));
          closeForm();
        } else {
          toast.custom((t) => (
            <ToastBanner
              t={t}
              type="ERROR"
              message="Update failed!"
              detail="Please check your data and try again."
            />
          ));
        }
      } else {
        result = await createAdon(data);
        if (!result?.success) {
          toast.custom((t) => (
            <ToastBanner
              t={t}
              type="ERROR"
              message="Creation failed!"
              detail={result?.error?.message}
            />
          ));
          closeForm();
        } else {
          toast.custom((t) => (
            <ToastBanner t={t} type="SUCCESS" message="Created Successfully!" />
          ));
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

  // Calculate total price with discount
  const calculateTotalPrice = (
    basePrice: number,
    period: string,
    discountValue: number,
    discountType: string
  ) => {
    const periodMultiplier = getPeriodMultiplier(period);
    let totalPrice = basePrice * periodMultiplier;

    if (discountValue > 0) {
      const discountAmount =
        discountType === "percentage"
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
      yearly: 12,
    };
    return multipliers[period as keyof typeof multipliers] || 1;
  };

  // Handle form value changes
  const handleFormChange = async (values: any) => {
    if (!values.addonid) {
      setPlanPrice(null);
      setTotalPrice(null);
      return;
    }

    try {
      const planData: any = await getAdonPlanById(values.addonid);
      if (!planData || typeof planData.price !== "number") {
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

  useEffect(() => {
    if (adonId) {
      fetchAdon();
    }
  }, [adonId]);

  useEffect(() => {
    if (adonsPlansOptions) {
      findField(adonsFormFields, "addonid")["options"] = adonsPlansOptions;
    }
  }, [adonsPlansOptions]);

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
          title="Create Dining Timing"
          fields={adonsFormFields}
          initialValues={initialValues}
          validationSchema={adonsFormSchema}
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
            </div>
          )}
          {totalPrice && (
            <div className="space-y-1">
              <span className="flex justify-between items-center">
                <p>Total</p>
                <p className="font-bold">{formatPriceInLKR(totalPrice)}</p>
              </span>
            </div>
          )}
        </FormComponent>
      </FormSlider>
    </>
  );
};

export default AdonsForm;
