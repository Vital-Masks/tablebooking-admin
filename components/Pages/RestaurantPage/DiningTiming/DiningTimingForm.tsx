"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import Button from "@/components/Elements/Button";

import {
  createDiningTiming,
  getRestaurantDiningTimingById,
  updateDiningTiming,
} from "@/lib/actions/restaurant.actions";

import {
  findField,
  handleError,
  returnCommonObject,
} from "@/lib/utils";
import {
  diningFormField,
  diningFormSchema,
} from "@/constants/FormsDataJs/DiningTimingForm";
import toast from "react-hot-toast";
import ToastBanner from "@/components/Elements/ToastBanner";
import { uploadFileToS3 } from "@/lib/aws-s3";

const DiningTimingForm = ({ params, diningAreas, utilities }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const diningId = searchParams.get("edit");

  const defaultInitialValues = {
    diningType: "",
    diningName: "",
    description: "",
    dateType: "Custom Date",
    days: [],
    dateFrom: "",
    dateTo: "",
    timeFrom: "",
    timeTo: "",
    availabilityStatus: "",
    pricePerPerson: "",
    diningAreaIds: [],
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  const closeForm = () => {
    setInitialValues(defaultInitialValues);
    setIsFormOpen(false);
    router.replace(pathname, { scroll: false });
  };

  const fetchDining = async () => {
   
    if (!diningId || params.restaurantId === "c") return;

    try {
      const response: any = await getRestaurantDiningTimingById(
        params.restaurantId,
        diningId
      );

      console.log(">>", response);

      
      if (response) {
        let data = returnCommonObject(initialValues, response);
        data["coverImage"] = [{photo: response.coverImage}];
        data["diningAreas"] = [...response.diningAreaIds];
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

  const onSubmit = async (data: CreateDiningTimingParams) => {
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

      if(data?.coverImage){
      // Handle file uploads
      const images = await Promise.all(
        data?.coverImage?.map(async (img: any) => {
          if (img.preview) {
            const url = await uploadFileToS3(
              img.preview,
              "dining-timing-images"
            );
            return { photo: url };
          }
          return img;
        })
      );
      // Filter out failed uploads
      const validImages = images.filter(img => img.photo !== null);
      if (validImages.length === 0) {
        toast.custom((t) => (
          <ToastBanner 
            t={t} 
            type="ERROR" 
            message="File upload failed!" 
            detail="Please try uploading the image again."
          />
        ));
        return;
      }
  
      data.coverImage = validImages;
    }
      
      data.restaurantId = params.restaurantId;

      let result;
      if (diningId) {
        result = await updateDiningTiming(diningId, data);
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
        result = await createDiningTiming(data);
        if (result) {
          toast.custom((t) => (
            <ToastBanner t={t} type="SUCCESS" message="Created Successfully!" />
          ));
          closeForm();
        } else {
          toast.custom((t) => (
            <ToastBanner 
              t={t} 
              type="ERROR" 
              message="Creation failed!" 
              detail="Please check your data and try again."
            />
          ));
        }
      }
    } catch (error) {
      console.error('Error in form submission:', error);
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

  useEffect(() => {
    if (diningId) {
      fetchDining();
    }
  }, [diningId]);

  useEffect(() => {
    if (diningAreas.length > 0) {
      findField(diningFormField, "diningAreaIds")["options"] = diningAreas;
    }
  }, [diningAreas]);

  useEffect(() => {
    const options = Object.entries(utilities?.[0].experienceType).map(
      ([key, value]) => ({
        label: value,
        value: value,
      })
    );

    findField(diningFormField, "diningType")["options"] = options;
  }, [utilities]);

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
          fields={diningFormField}
          initialValues={initialValues}
          validationSchema={diningFormSchema}
          closeForm={closeForm}
          handleSubmit={onSubmit}
        />
      </FormSlider>
    </>
  );
};

export default DiningTimingForm;
