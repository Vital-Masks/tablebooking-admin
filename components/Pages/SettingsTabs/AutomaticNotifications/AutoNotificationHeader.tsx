'use client';

import { use, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import PageHeader from '@/components/Elements/PageHeader';
import { findField, handleError, returnCommonObject } from '@/lib/utils';
import { ROUTE_HOSPITAL_CHAIN } from '@/constants/routes';
import {
  autoNotificationFormField,
  autoNotificationFormSchema,
} from '@/constants/FormsDataJs/NotificationForms';
import {
  createAutoNotification,
  createCustomNotification,
  getNotification,
} from '@/lib/actions/pushNotification.action';

const AutoNotificationHeader = ({ restaurantOptions, utilities }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const notificationId = searchParams.get('notificationId') ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    automativeNotificationType: '',
    notification: '',
    customersOf: '',
  });

  const pageHeaderData = {
    title: 'Automatice Notification',
    button1: {
      title: 'Create Notification',
      action: () => setCreateForm(true),
    },
  };

  const handleCloseForm = () => {
    setCreateForm(false);
    if (notificationId) {
      router.push(ROUTE_HOSPITAL_CHAIN);
    }
  };

  const handleFormSubmit = async (data: CreateAutoNotificationParams) => {
    try {
      if (notificationId) {
        //  await updateHospitalChain(notificationId, data);
        router.push(ROUTE_HOSPITAL_CHAIN);
      } else {
        await createAutoNotification(data);
      }
      setCreateForm(false);
    } catch (error) {
      handleError(
        'An error occurred while submitting the hospital chain form:',
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
        'An error occurred while submitting the hospital chain form:',
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
      findField(autoNotificationFormField, 'customersOf')['options'] =
        restaurantOptions;
    }
  }, [restaurantOptions]);

  useEffect(() => {
    if (utilities) {
      const options2 = Object.entries(utilities?.[0].notificationType).map(
        ([key, value]) => ({
          label: value,
          value: value,
        })
      );

      findField(autoNotificationFormField, 'automativeNotificationType')[
        'options'
      ] = options2;
    }
  }, [utilities]);

  return (
    <>
      <PageHeader pageHeaderData={pageHeaderData} />
      <FormSlider isOpen={createForm}>
        <FormComponent
          title="Create Notification"
          fields={autoNotificationFormField}
          initialValues={initialValues}
          validationSchema={autoNotificationFormSchema}
          handleSubmit={handleFormSubmit}
          closeForm={() => handleCloseForm()}
        />
      </FormSlider>
    </>
  );
};

export default AutoNotificationHeader;
