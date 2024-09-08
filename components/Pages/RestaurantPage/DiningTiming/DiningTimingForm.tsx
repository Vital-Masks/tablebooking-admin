'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import Button from '@/components/Elements/Button';

import {
  createDiningTiming,
  getRestaurantCuisineMenuById,
  getRestaurantDiningTimingById,
} from '@/lib/actions/restaurant.actions';

import { handleError, returnCommonObject } from '@/lib/utils';
import {
  diningFormField,
  diningFormSchema,
} from '@/constants/FormsDataJs/DiningTimingForm';

const DiningTimingForm = ({ params }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const diningId = searchParams.get('edit');

  const defaultInitialValues = useMemo(
    () => ({
      diningType: '',
      diningName: '',
      description: '',
      dateType: '',
      days: ['MONDAY'],
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
    if (!diningId || !params.hospitalityChainId || !params.restaurantId) return;

    try {
      const response = await getRestaurantDiningTimingById(
        params.hospitalityChainId,
        params.restaurantId,
        diningId
      );

      if (response) {
        const data = returnCommonObject(defaultInitialValues, response);
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

  const handleSubmit = async (data: CreateDiningParams) => {
    try {
      if (!params.hospitalityChainId || !params.restaurantId) return;

      data.hospitalityChainId = params.hospitalityChainId;
      data.restaurantId = params.restaurantId;

      if (diningId) {
        // await updateRestaurantCuisineMenu(fdim, data);
      } else {
        await createDiningTiming(data);
      }
    } catch (error) {
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
          handleSubmit={handleSubmit}
        />
      </FormSlider>
    </>
  );
};

export default DiningTimingForm;
