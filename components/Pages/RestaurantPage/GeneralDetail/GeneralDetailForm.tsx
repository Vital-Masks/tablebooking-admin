"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormComponent from "@/components/Common/Form";
import {
  generalFormField,
  generalFormSchema,
} from "@/constants/FormsDataJs/GeneralDetailsForm";
import {
  createRestaurantGeneral,
  updateRestaurantGeneral,
} from "@/lib/actions/restaurant.actions";
import { findField, handleError, returnCommonObject } from "@/lib/utils";
import toast from "react-hot-toast";
import ToastBanner from "@/components/Elements/ToastBanner";
import { timezones } from "@/constants/timezones";
import { uploadFileToS3 } from "@/lib/aws-s3";

export default function GeneralDetailForm({
  hospitalityChains,
  generalDetails,
  utilities,
  params,
}: any) {
  const router = useRouter();

  const { restaurantId } = params;

  const [initialValues, setInitialValues] = useState({
    restaurantName: "",
    restaurantType: "",
    contactNo: "",
    whatsappNo: "",
    registerationNumber: "",
    hospitalityChainId: "",
    email: "",
    website: "",
    address: "",
    addressEmbedURL: "",
    description: "",
    dinningStyle: "",
    dressCode: [],
    paymentOptions: [],
    cousines: [],
    timeZone: "",
    availabilityStatus: "",
    openingDays: [],
    openTime: "",
    closeTime: "",
    isPromoted: false,
    coverImage: [],
    currency: "",
  });

  const onSubmit = async (data: CreateRestaurantGeneralParams) => {
    try {
      const images = await Promise.all(
        data.coverImage.map(async (img: any) => {
          if (img.preview) {
            const url = await uploadFileToS3(img.preview, "restaurant-images");
            console.log(">>", url);
            return url;
          }
          return img;
        })
      );

      data.images = images;

      const openingTimes = data.openingDays.map((day: any) => ({
        day: day,
        openTime: data.openTime,
        closeTime: data.closeTime,
      }));

      data.openingTimes = openingTimes;

      if (restaurantId !== "c") {
        await updateRestaurantGeneral(restaurantId, data);
        toast.custom((t) => (
          <ToastBanner t={t} type="SUCCESS" message="Updated Successfully!" />
        ));
        return;
      }

      // Create new restaurant and handle response
      const response = await createRestaurantGeneral(data);
      toast.custom((t) => (
        <ToastBanner t={t} type="SUCCESS" message="Created Successfully!" />
      ));
      // Navigate and fetch details if response contains IDs
      if (response?._id) {
        const { _id: restaurantId } = response;
        router.push(`/dashboard/restaurant/${restaurantId}/general-detail`);
      }
    } catch (error) {
      // General error handling
      toast.custom((t) => (
        <ToastBanner t={t} type="ERROR" message="Something went wrong!" />
      ));
      handleError(
        "An error occurred while submitting the restaurant (general) form:",
        error
      );
    }
  };

  useEffect(() => {
    if (hospitalityChains) {
      const options = hospitalityChains.map((chain: any) => ({
        label: chain.chainName,
        value: chain._id,
      }));

      findField(generalFormField, "hospitalityChainId")["options"] = options;
    }
  }, [hospitalityChains]);

  useEffect(() => {
    if (generalDetails) {
      const data = returnCommonObject(initialValues, generalDetails);
      console.log(">>", generalDetails);
      const openingDays = generalDetails?.openingTimes?.map((day: any) => {
        return day.day;
      });
      data["openingDays"] = openingDays;

      data["registerationNumber"] =
        generalDetails?.hospitalityChainId?.registrationNumber ?? "";
      data["hospitalityChainId"] = generalDetails?.hospitalityChainId;
      data["coverImage"] = generalDetails.images;
      setInitialValues(data);
    }
  }, [generalDetails]);

  useEffect(() => {
    const options = Object.entries(utilities?.[0].restaurantType).map(
      ([key, value]) => ({
        label: value,
        value: value,
      })
    );

    const options2 = Object.entries(utilities?.[0].Cuisine).map(
      ([key, value]) => ({
        label: value,
        value: value,
      })
    );

    const timezoneOptions = timezones.map((timezone: any) => ({
      label: timezone.zone + " " + timezone.gmt,
      value: timezone.zone + " " + timezone.gmt,
    }));

    const dinningStyleOptions = Object.entries(utilities?.[0].dinningStyle).map(
      ([key, value]) => ({
        label: value,
        value: value,
      })
    );

    const dressCodeOptions = Object.entries(utilities?.[0].dressCode).map(
      ([key, value]) => ({
        label: value,
        value: value,
      })
    );

    const paymentOptions = Object.entries(utilities?.[0].paymentOptions).map(
      ([key, value]) => ({
        label: value,
        value: value,
      })
    );

    const currencyOptions = Object.entries(utilities?.[0].currency).map(
      ([key, value]) => ({
        label: value,
        value: value,
      })
    );

    findField(generalFormField, "restaurantType")["options"] = options;
    findField(generalFormField, "cousines")["options"] = options2;
    findField(generalFormField, "timeZone")["options"] = timezoneOptions;
    findField(generalFormField, "dinningStyle")["options"] =
      dinningStyleOptions;
    findField(generalFormField, "dressCode")["options"] = dressCodeOptions;
    findField(generalFormField, "paymentOptions")["options"] = paymentOptions;
    findField(generalFormField, "currency")["options"] = currencyOptions;
  }, [utilities]);

  return (
    <main>
      <FormComponent
        fields={generalFormField}
        validationSchema={generalFormSchema}
        initialValues={initialValues}
        handleSubmit={onSubmit}
      />
    </main>
  );
}
