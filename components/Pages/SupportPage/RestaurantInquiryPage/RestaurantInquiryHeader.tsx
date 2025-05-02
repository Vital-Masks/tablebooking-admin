"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import PageHeader from "@/components/Elements/PageHeader";
import { handleError, returnCommonObject } from "@/lib/utils";
import { ROUTE_RESTAURANT_INQUIRY } from "@/constants/routes";
import { createInquiry, getRestaurantInquiry } from "@/lib/actions/support.action";
import {
  inquiryFormField,
  inquiryFormSchema,
} from "@/constants/FormsDataJs/inquiryForm";

const RestaurantInquiryHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inquiryId = searchParams.get("inquiryId") ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    contactNo: "",
    email: "",
    status: "",
  });

  const pageHeaderData = {
    title: "Restaurant Inquiry",
    // button1: {
    //   title: "Create Inquiry",
    //   action: () => setCreateForm(true),
    // },
  };

  const handleCloseForm = () => {
    setCreateForm(false);
    if (inquiryId) {
      router.push(ROUTE_RESTAURANT_INQUIRY);
    }
  };

  const handleFormSubmit = async (data: CreateInquiryParams) => {
    try {
      if (inquiryId) {
        await createInquiry(data, inquiryId);
        router.push(ROUTE_RESTAURANT_INQUIRY);
      } else {
        await createInquiry(data);
      }
      setCreateForm(false);
    } catch (error) {
      handleError(
        "An error occurred while submitting the hospital chain form:",
        error
      );
    }
  };

  const fetchInquiry = async (id: string) => {
    try {
      setCreateForm(true);
      const response = await getRestaurantInquiry(id);
      console.log("response >>", response);
      const commonObj = returnCommonObject(initialValues, response);
      setInitialValues({
        ...commonObj,
      });
    } catch (error) {
      handleError(
        "An error occurred while submitting the hospital chain form:",
        error
      );
    }
  };

  useEffect(() => {
    if (inquiryId) {
      fetchInquiry(inquiryId);
    }
  }, [inquiryId]);

  return (
    <>
      <PageHeader
        pageHeaderData={pageHeaderData}
        className="!mb-0 !rounded-none"
      />
      <FormSlider isOpen={createForm}>
        <FormComponent
          title={inquiryId ? "Edit Inquiry" : "Create Inquiry"}
          fields={inquiryFormField}
          initialValues={initialValues}
          validationSchema={inquiryFormSchema}
          handleSubmit={handleFormSubmit}
          closeForm={() => handleCloseForm()}
        />
      </FormSlider>
    </>
  );
};

export default RestaurantInquiryHeader;
