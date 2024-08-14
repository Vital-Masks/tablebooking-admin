'use client';
import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import Button from '@/components/Elements/Button';
import { seatingFormField, seatingFormSchema } from '@/constants/FormsDataJs/DiningAreaForm';
import { createRestaurantDiningArea } from '@/lib/actions/restaurant.actions';
import { handleError } from '@/lib/utils';
import React, { useState } from 'react';

const DiningAreaForm = ({ params }: any) => {
  const [isCreateForm, setIsCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    sectionName: '',
    maximumSeats: '',
    seatingAreaType: '',
  });

  const onSubmit = async (data: CreateDiningParams) => {
    try {
      if (params.hospitalityChainId && params.restaurantId) {
        data['hospitalityChainId'] = params.hospitalityChainId;
        data['restaurantId'] = params.restaurantId;
        await createRestaurantDiningArea(data);
        setIsCreateForm(false);
      }
    } catch (error) {
      handleError(
        'An error occurred while submitting the restaurant (general) form:',
        error
      );
    }
  };

  return (
    <>
      <Button
        type="filled"
        className="absolute top-5 right-5"
        onClick={() => setIsCreateForm(true)}
      >
        + Create new
      </Button>
      <FormSlider isOpen={isCreateForm}>
        <FormComponent
          title="Create dining area"
          fields={seatingFormField}
          initialValues={initialValues}
          validationSchema={seatingFormSchema}
          closeForm={() => setIsCreateForm(false)}
          handleSubmit={onSubmit}
        />
      </FormSlider>
    </>
  );
};

export default DiningAreaForm;
