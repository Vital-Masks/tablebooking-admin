"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import PageHeader from "@/components/Elements/PageHeader";
import { findField, handleError, returnCommonObject } from "@/lib/utils";
import { ROUTE_HOSPITAL_CHAIN } from "@/constants/routes";
import {
  customNotificationFormField,
  customNotificationFormSchema,
} from "@/constants/FormsDataJs/NotificationForms";
import {
  createCustomNotification,
  getNotification,
} from "@/lib/actions/pushNotification.action";

const NotificationHeader = ({ restaurantOptions }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const notificationId = searchParams.get("notificationId") ?? null;

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
    if (notificationId) {
      router.push(ROUTE_HOSPITAL_CHAIN);
    }
  };

  const handleFormSubmit = async (data: CreateNotificationParams) => {
    const body: CreateNotificationParams = {
      notificationTitle: data.notificationTitle,
      notification: data.notification,
      restaurantIds: data.customersOf,
      date: data.date,
      time: data.time,
    };

    try {
      if (notificationId) {
        //  await updateHospitalChain(notificationId, data);
        router.push(ROUTE_HOSPITAL_CHAIN);
      } else {
        await createCustomNotification(body);
      }
      setCreateForm(false);
    } catch (error) {
      handleError(
        "An error occurred while submitting the hospital chain form:",
        error
      );
    }
  };

  const fetchNotification = async (id: string) => {
    try {
      setCreateForm(true);
      const response = await getNotification(id);
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
    if (notificationId) {
      fetchNotification(notificationId);
    }
  }, [notificationId]);

  useEffect(() => {
    if (restaurantOptions) {
      findField(customNotificationFormField, "customersOf")["options"] =
        restaurantOptions;
    }
  }, [restaurantOptions]);

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
