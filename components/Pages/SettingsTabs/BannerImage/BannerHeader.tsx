"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import PageHeader from "@/components/Elements/PageHeader";
import {
  convertImageToBase64,
  handleError,
  returnCommonObject,
} from "@/lib/utils";
import { ROUTE_BANNER_IMAGE } from "@/constants/routes";
import moment from "moment";
import {
  bannerFormField,
  bannerFormSchema,
} from "@/constants/FormsDataJs/BannerImagesForms";
import {
  bannerImageAction,
  getBannerImage,
} from "@/lib/actions/bannerImage.action";
import { uploadFileToS3 } from "@/lib/aws-s3";

const BannerHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bannerId = searchParams.get("bannerId") ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    bannerName: "",
    bannerFor: "",
    redirectFor: "",
    coverImage: "",
    validFromDate: "",
    validFromTime: "",
    validTillDate: "",
    validTillTime: "",
    isAvailable: "",
  });

  const pageHeaderData = {
    title: "Banner Image",
    button1: {
      title: "Create Banner",
      action: () => setCreateForm(true),
    },
  };

  const handleCloseForm = () => {
    setCreateForm(false);
    setInitialValues({
      bannerName: "",
      bannerFor: "",
      redirectFor: "",
      coverImage: "",
      validFromDate: "",
      validFromTime: "",
      validTillDate: "",
      validTillTime: "",
      isAvailable: "",
    })

    if (bannerId) {
      router.push(ROUTE_BANNER_IMAGE);
    }
  };

  const handleFormSubmit = async (data: CreateBannerParams) => {
    const coverImage: any = data.coverImage[0];
    const url = await uploadFileToS3(coverImage.preview, "banner-images");

    const body = {
      bannerName: data.bannerName,
      bannerFor: Array.isArray(data.bannerFor) ? data.bannerFor : [data.bannerFor],
      redirectFor: data.redirectFor,
      coverImage: data.coverImage,
      validFromDateTime: moment(
        data.validFromDate + " " + data.validFromTime
      ).toLocaleString(),
      validTillDateTime: moment(
        data.validTillDate + " " + data.validTillTime
      ).toLocaleString(),
      isAvailable: data.isAvailable,
    };

    try {
      if (bannerId) {
        await bannerImageAction(body, bannerId);
        router.push(ROUTE_BANNER_IMAGE);
      } else {
        await bannerImageAction(body);
      }
      setCreateForm(false);
    } catch (error) {
      handleError(
        "An error occurred while submitting the hospital chain form:",
        error
      );
    }
  };

  const fetchBannerImage = async (id: string) => {
    try {
      setCreateForm(true);
      const response = await getBannerImage(id);
      const commonObj = returnCommonObject(initialValues, response);

      setInitialValues({
        ...commonObj,
        validFromDate: moment(response.validFromDateTime).format("YYYY-MM-DD"),
        validFromTime: moment(response.validFromDateTime).format("HH:mm"),
        validTillDate: moment(response.validTillDateTime).format("YYYY-MM-DD"),
        validTillTime: moment(response.validTillDateTime).format("HH:mm"),
      });
    } catch (error) {
      handleError(
        "An error occurred while submitting the hospital chain form:",
        error
      );
    }
  };

  useEffect(() => {
    if (bannerId) {
      fetchBannerImage(bannerId);
    }
  }, [bannerId]);

  return (
    <>
      <PageHeader
        pageHeaderData={pageHeaderData}
        className="!mb-0 !rounded-none"
      />
      <FormSlider isOpen={createForm}>
        <FormComponent
          title="Create Banner"
          fields={bannerFormField}
          initialValues={initialValues}
          validationSchema={bannerFormSchema}
          handleSubmit={handleFormSubmit}
          closeForm={() => handleCloseForm()}
        />
      </FormSlider>
    </>
  );
};

export default BannerHeader;
