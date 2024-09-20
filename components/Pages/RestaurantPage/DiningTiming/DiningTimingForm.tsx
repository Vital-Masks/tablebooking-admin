'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import Button from '@/components/Elements/Button';

import {
  createDiningTiming,
  getRestaurantDiningTimingById,
  updateDiningTiming,
} from '@/lib/actions/restaurant.actions';

import { handleError, returnCommonObject } from '@/lib/utils';
import {
  diningFormField,
  diningFormSchema,
} from '@/constants/FormsDataJs/DiningTimingForm';
import toast from 'react-hot-toast';
import ToastBanner from '@/components/Elements/ToastBanner';

const DiningTimingForm = ({ params, diningAreas }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const diningId = searchParams.get('edit');

  const defaultInitialValues = useMemo(
    () => ({
      diningType: '',
      diningName: '',
      description: '',
      dateType: 'customDate',
      days: [],
      dateFrom: '',
      dateTo: '',
      timeFrom: '',
      timeTo: '',
      availabilityStatus: true,
      pricePerPerson: '',
      diningAreas: '',
    }),
    []
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  const closeForm = () => {
    setIsFormOpen(false);
    router.replace(pathname, { scroll: false });
    setInitialValues(defaultInitialValues);
  };

  const fetchDining = async () => {
    if (!diningId || params.hospitalityChainId === 'n' || params.restaurantId === 'c') return;

    try {
      const response = await getRestaurantDiningTimingById(
        params.hospitalityChainId,
        params.restaurantId,
        diningId
      );

      if (response) {
        let data = returnCommonObject(defaultInitialValues, response);
        setInitialValues(data);
        setIsFormOpen(true);
      }
    } catch (error) {
      handleError(
        'An error occurred while fetching cuisine menu details:',
        error
      );
    }
  };

  const onSubmit = async (data: CreateDiningTimingParams) => {
    try {
      if (params.hospitalityChainId === 'n' || params.restaurantId === 'c') {
        toast.custom((t) => (
          <ToastBanner t={t} type="ERROR" message="Resaurant don't exist!" detail="please fill the general details first." />
        ));
        return;
      }

      data.hospitalityChainId = params.hospitalityChainId;
      data.restaurantId = params.restaurantId;
      data.days = data.days.map((day: any) => day.code);

      if (diningId) {
        await updateDiningTiming(diningId, data);
        toast.custom((t) => (
          <ToastBanner t={t} type="SUCCESS" message="Updated Successfully!" />
        ));
      } else {
        await createDiningTiming(data);
        toast.custom((t) => (
          <ToastBanner t={t} type="SUCCESS" message="Created Successfully!" />
        ));
      }
    } catch (error) {
      toast.custom((t) => (
        <ToastBanner t={t} type="ERROR" message="Something went wrong!" />
      ));
      handleError(
        'An error occurred while submitting the dining timing form:',
        error
      );
    }
  };

  useEffect(() => {
    if (diningId) {
      fetchDining();
    }
  }, [diningId]);

  useEffect(() => {
    if (diningAreas.length > 0) {
      diningFormField.find((x: any) => x.id === 'diningAreas')['options'] =
        diningAreas;
    }
  }, [diningAreas]);

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
          title="Create cuisine menu"
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
