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
import {
  convertImageToBase64,
  findField,
  handleError,
  returnCommonObject,
} from "@/lib/utils";
import toast from "react-hot-toast";
import ToastBanner from "@/components/Elements/ToastBanner";

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
    dressCode: "",
    paymentOptions: "",
    cousines: [],
    timeZone: "",
    availabilityStatus: "",
    openTime: "",
    closeTime: "",
    isPromoted: false,
    coverImage: [],
  });

  const onSubmit = async (data: CreateRestaurantGeneralParams) => {
    try {
      const images = await Promise.all(
        data.coverImage.map(async (img: Blob) => {
          if (img instanceof Blob) {
            const base64 = await convertImageToBase64(img);
            return { photo: base64 };
          }
          return img;
        })
      );

      data.images = images;

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
      data["registerationNumber"] =
        generalDetails?.hospitalityChainId?.registrationNumber;
      data["hospitalityChainId"] = generalDetails?.hospitalityChainId?._id;
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
        value: key,
      })
    );

    findField(generalFormField, "restaurantType")["options"] = options;
    findField(generalFormField, "cousines")["options"] = options2;
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
