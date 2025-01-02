"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import PageHeader from "@/components/Elements/PageHeader";
import {
  createHospitalChain,
  getHospitalChain,
  updateHospitalChain,
} from "@/lib/actions/hospitalChain.action";
import { handleError, returnCommonObject } from "@/lib/utils";
import { ROUTE_HOSPITAL_CHAIN } from "@/constants/routes";
import {
  customNotificationFormField,
  customNotificationFormSchema,
} from "@/constants/FormsDataJs/NotificationForms";
import { createCustomNotification } from "@/lib/actions/pushNotification.action";

const NotificationHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hospitalId = searchParams.get("hospitalId") ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    notificationTitle: "",
    notification: "",
    customersOf: "",
    date: "",
    time: "",
  });

  const pageHeaderData = {
    title: "Custom Notification",
    button1: {
      title: "Create Notification",
      action: () => setCreateForm(true),
    },
  };

  const handleCloseForm = () => {
    setCreateForm(false);
    if (hospitalId) {
      router.push(ROUTE_HOSPITAL_CHAIN);
    }
  };

  const handleFormSubmit = async (data: CreateNotificationParams) => {

     try {
       if (hospitalId) {
        //  await updateHospitalChain(hospitalId, data);
         router.push(ROUTE_HOSPITAL_CHAIN);
       } else {
         await createCustomNotification(data);
       }
       setCreateForm(false);
     } catch (error) {
       handleError(
         "An error occurred while submitting the hospital chain form:",
         error
       );
     }
  };

  const fetchHospitalChain = async (id: string) => {
    try {
      setCreateForm(true);
      const response = await getHospitalChain(id);
      setInitialValues((prevValues) =>
        returnCommonObject(prevValues, response)
      );
    } catch (error) {
      handleError(
        "An error occurred while submitting the hospital chain form:",
        error
      );
    }
  };

  useEffect(() => {
    if (hospitalId) {
      fetchHospitalChain(hospitalId);
    }
  }, [hospitalId]);

  return (
    <>
      <PageHeader pageHeaderData={pageHeaderData} />
      <FormSlider isOpen={createForm}>
        <FormComponent
          title="Create Notification"
          fields={customNotificationFormField}
          initialValues={initialValues}
          validationSchema={customNotificationFormSchema}
          handleSubmit={handleFormSubmit}
          closeForm={() => handleCloseForm()}
        />
      </FormSlider>
    </>
  );
};

export default NotificationHeader;
