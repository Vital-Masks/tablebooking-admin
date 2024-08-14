'use client';
import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import Button from '@/components/Elements/Button';
import {
  foodFormField,
  foodFormSchema,
} from '@/constants/FormsDataJs/CuisineForm';
import {
  createRestaurantCuisineMenu,
  getRestaurantCuisineMenuById,
  updateRestaurantCuisineMenu,
} from '@/lib/actions/restaurant.actions';
import { handleError, returnCommonObject } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const CuisineMenuForm = ({ params }: any) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const cuisinId = searchParams.get('edit');
  const [isCreateForm, setIsCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    foodName: '',
    foodCategory: '',
    description: '',
    price: '',
    cousineType: '',
  });

  const onSubmit = async (data: CreateCuisineMenuParams) => {
    try {
      if (params.hospitalityChainId && params.restaurantId) {
        data['hospitalityChainId'] = params.hospitalityChainId;
        data['restaurantId'] = params.restaurantId;
        if(cuisinId){
          await updateRestaurantCuisineMenu(cuisinId, data);
          router.push(pathname, { scroll: false });
        }else{
          await createRestaurantCuisineMenu(data);
        }
        setIsCreateForm(false);
      }
    } catch (error) {
      handleError(
        'An error occurred while submitting the restaurant (general) form:',
        error
      );
    }
  };

  const getCuisineMenu = async (
    hospitalityChainId: string,
    restaurantId: string,
    cuisinId: string
  ) => {
    try {
      const response: any = await getRestaurantCuisineMenuById(
        hospitalityChainId,
        restaurantId,
        cuisinId
      );

      if (response) {
        const data = returnCommonObject(initialValues, response);
        setInitialValues(data);
      }
    } catch (error) {
      handleError(
        'An error occurred while rendering the restaurant (general) details:',
        error
      );
    }
  };

  useEffect(() => {
    if (cuisinId) {
      setIsCreateForm(true);
      getCuisineMenu(params.hospitalityChainId, params.restaurantId, cuisinId);
    }
  }, [cuisinId]);

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
          title="Create cuisine menu"
          fields={foodFormField}
          initialValues={initialValues}
          validationSchema={foodFormSchema}
          closeForm={() => {
            setIsCreateForm(false);
            router.push(pathname, { scroll: false });
            setInitialValues(initialValues)
          }}
          handleSubmit={onSubmit}
        />
      </FormSlider>
    </>
  );
};

export default CuisineMenuForm;
