'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import PageHeader from '@/components/Elements/PageHeader';
import { findField, handleError, returnCommonObject } from '@/lib/utils';
import { ROUTE_HOSPITAL_CHAIN, ROUTE_PROMO_CODE } from '@/constants/routes';

import {
  createPromoCodes,
  getNotification,
  getPromo,
  updatePromoCode,
} from '@/lib/actions/pushNotification.action';
import {
  promoFormField,
  promoFormSchema,
} from '@/constants/FormsDataJs/PromocodeForm';

const PromocodesHeader = ({ restaurantOptions }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promoId = searchParams.get('promoId') ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    promocodeFor: '',
    promocode: '',
    valuePercentage: '',
    validFromDate: '',
    validFromTime: '',
    validTillDate: '',
    validTillTime: '',
    availabilityStatus: '',
  });

  const pageHeaderData = {
    title: 'Promo codes',
    button1: {
      title: 'Create Promo',
      action: () => setCreateForm(true),
    },
  };

  const handleCloseForm = () => {
    setCreateForm(false);
    if (promoId) {
      router.push(ROUTE_PROMO_CODE);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (promoId) {
        await updatePromoCode(promoId, data);
        router.push(ROUTE_PROMO_CODE);
      } else {
        await createPromoCodes(data);
      }
      setCreateForm(false);
    } catch (error) {
      handleError(
        'An error occurred while submitting the hospital chain form:',
        error
      );
    }
  };

  const fetchPromo = async (id: string) => {
    try {
      setCreateForm(true);
      const response = await getPromo(id);
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
    if (promoId) {
      fetchPromo(promoId);
    }
  }, [promoId]);

  useEffect(() => {
    if (restaurantOptions) {
      findField(promoFormField, 'promocodeFor')['options'] = restaurantOptions;
    }
  }, [restaurantOptions]);

  return (
    <>
      <PageHeader pageHeaderData={pageHeaderData} />
      <FormSlider isOpen={createForm}>
        <FormComponent
          title="Create Promo"
          fields={promoFormField}
          initialValues={initialValues}
          validationSchema={promoFormSchema}
          handleSubmit={handleFormSubmit}
          closeForm={() => handleCloseForm()}
        />
      </FormSlider>
    </>
  );
};

export default PromocodesHeader;
