'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import PageHeader from '@/components/Elements/PageHeader';
import { findField, handleError, returnCommonObject } from '@/lib/utils';
import {
  ROUTE_AUTO_NOTIFICATION,
} from '@/constants/routes';
import {
  autoNotificationFormField,
  autoNotificationFormSchema,
} from '@/constants/FormsDataJs/NotificationForms';
import {
  autoNotificationAction,
  getAutoNotification,
} from '@/lib/actions/pushNotification.action';

const defaultValues = {
  automativeNotificationType: '',
  notification: '',
  restaurantIds: '',
};

const AutoNotificationHeader = ({ restaurantOptions, utilities }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const notificationId = searchParams.get('notificationId') ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultValues);

  const pageHeaderData = {
    title: 'Automatice Notification',
    button1: {
      title: 'Create Notification',
      action: () => setCreateForm(true),
    },
  };

  const handleCloseForm = () => {
    setInitialValues(defaultValues);
    setCreateForm(false);
    if (notificationId) {
      router.push(ROUTE_AUTO_NOTIFICATION);
    }
  };

  const handleFormSubmit = async (data: CreateAutoNotificationParams) => {
    try {
      if (notificationId) {
        await autoNotificationAction(data, notificationId);
        router.push(ROUTE_AUTO_NOTIFICATION);
      } else {
        await autoNotificationAction(data);
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
      const response = await getAutoNotification(id);
      const commonObj = returnCommonObject(initialValues, response);

      setInitialValues({
        ...commonObj,
        restaurantIds: response?.restaurantIds?.map((res: any) => res._id),
      });
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
      findField(autoNotificationFormField, 'restaurantIds')['options'] =
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
      <PageHeader pageHeaderData={pageHeaderData} className="!mb-0 !rounded-none" />
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
