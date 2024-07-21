'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import FormComponent from '@/components/Common/Form';
import {
  generalFormField,
  generalFormSchema,
  generalImageFormField,
  generalImageFormSchema,
} from '@/constants/FormsDataJs/GeneralDetailsForm';
import {
  createRestaurantGeneral,
  getRestaurantGeneral,
  updateRestaurantGeneral,
} from '@/lib/actions/restaurant.actions';
import { handleError, returnCommonObject } from '@/lib/utils';

export default function GeneralDetails() {
  const pathname = usePathname();
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState({
    restaurantName: '',
    restaurantType: '',
    contactNo: '',
    whatsappNo: '',
    email: '',
    website: '',
    address: '',
    addressEmbedURL: '',
    description: '',
    dinningStyle: '',
    dressCode: '',
    paymentOptions: '',
    timeZone: '',
    availabilityStatus: '',
    isPromoted: false,
  });

  const onSubmit = async (data: CreateRestaurantGeneralParams) => {
    try {
      if (restaurantId) {
        await updateRestaurantGeneral(restaurantId, data);
        fetchGeneralDetails(restaurantId);
      } else {
        await createRestaurantGeneral(data);
      }
    } catch (error) {
      handleError(
        'An error occurred while submitting the restaurant (general) form:',
        error
      );
    }
  };

  const fetchGeneralDetails = async (restaurantId: string) => {
    try {
      const response = await getRestaurantGeneral(restaurantId);
      if (response) {
        const data = returnCommonObject(initialValues, response);
        setInitialValues(data);
        setRestaurantId(response._id);
      }
    } catch (error) {
      handleError(
        'An error occurred while rendering the restaurant (general) details:',
        error
      );
    }
  };

  useEffect(() => {
    if (pathname.split('/')[3] !== 'create') {
      fetchGeneralDetails(pathname.split('/')[3]);
    }
  }, [pathname]);

  return (
    <main>
      <div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className="col-span-2">
            <FormComponent
              fields={generalFormField}
              validationSchema={generalFormSchema}
              initialValues={initialValues}
              handleSubmit={onSubmit}
            />
          </div>
          <FormComponent
            fields={generalImageFormField}
            initialValues={initialValues}
            validationSchema={generalImageFormSchema}
          />
        </div>
      </div>
    </main>
  );
}
