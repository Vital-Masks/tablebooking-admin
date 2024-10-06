'use client';
import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import Button from '@/components/Elements/Button';
import ToastBanner from '@/components/Elements/ToastBanner';
import {
  seatingFormField,
  seatingFormSchema,
} from '@/constants/FormsDataJs/DiningAreaForm';
import {
  createRestaurantDiningArea,
  getRestaurantDiningAreaById,
  updateRestaurantDiningArea,
} from '@/lib/actions/restaurant.actions';
import { getUtilities } from '@/lib/actions/utilities.actions';
import { findField, handleError, returnCommonObject } from '@/lib/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const DiningAreaForm = ({ params }: any) => {
  const searchParams = useSearchParams();
  const diningId = searchParams.get('edit');
  const router = useRouter();
  const pathname = usePathname();

  const defaultInitialValues = useMemo(
    () => ({
      sectionName: '',
      maximumSeats: '',
      seatingAreaType: '',
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

  const fetchDinigAreaData = async () => {
    if (!diningId || params.restaurantId === 'c') return;

    try {
      const response = await getRestaurantDiningAreaById(
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

  const onSubmit = async (data: CreateDiningParams) => {
    try {
      if (params.restaurantId === 'c') {
        toast.custom((t) => (
          <ToastBanner
            t={t}
            type="ERROR"
            message="Resaurant don't exist!"
            detail="please fill the general details first."
          />
        ));
        return;
      }
      data.restaurantId = params.restaurantId;

      if (diningId) {
        await updateRestaurantDiningArea(diningId, data);
        toast.custom((t) => (
          <ToastBanner t={t} type="SUCCESS" message="Updated Successfully!" />
        ));
      } else {
        await createRestaurantDiningArea(data);
        toast.custom((t) => (
          <ToastBanner t={t} type="SUCCESS" message="Created Successfully!" />
        ));
      }

      closeForm();
    } catch (error) {
      toast.custom((t) => (
        <ToastBanner t={t} type="ERROR" message="Something went wrong!" />
      ));
      handleError(
        'An error occurred while submitting the restaurant (general) form:',
        error
      );
    }
  };

  useEffect(() => {
    if (diningId) {
      fetchDinigAreaData();
    }
  }, [diningId]);

  useEffect(() => {
    const fetchUtilities = async () => {
      const utilities = await getUtilities();
      const options = Object.entries(utilities?.[0].SeatingArea).map(
        ([key, value]) => ({
          label: value,
          value: key,
        })
      );
      findField(seatingFormField, 'seatingAreaType')['options'] = options;
    };
    fetchUtilities();
  }, []);

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
          title="Create dining area"
          fields={seatingFormField}
          initialValues={initialValues}
          validationSchema={seatingFormSchema}
          closeForm={closeForm}
          handleSubmit={onSubmit}
        />
      </FormSlider>
    </>
  );
};

export default DiningAreaForm;
