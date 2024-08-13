'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

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
import { findField, handleError, returnCommonObject } from '@/lib/utils';
import { getHospitalChainList } from '@/lib/actions/hospitalChain.action';

export default function GeneralDetails() {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParam);
  const restaurantId = searchParam.get('restaurantId');
  const hospitalityChainId = searchParam.get('hospitalityChainId');

  const [hospitalityChains, setHospitalityChains] = useState<any>([]);
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
    registerationNumber: '',
  });

  const fetchHospitalityChain = async () => {
    const hospitalityChains = await getHospitalChainList();
    setHospitalityChains(hospitalityChains);
  };

  const onSubmit = async (data: CreateRestaurantGeneralParams) => {
    try {
      if (hospitalityChainId && restaurantId) {
        await updateRestaurantGeneral(restaurantId, data);
      } else {
        const response: any = await createRestaurantGeneral(data);

        if (response?.hospitalityChainId?._id && response?._id) {
          params.set('hospitalityChainId', response?.hospitalityChainId?._id);
          params.set('restaurantId', response?._id);
          replace(`${pathname}?${params.toString()}`);
          fetchGeneralDetails(response?.hospitalityChainId?._id, response?._id);
        }
      }
    } catch (error) {
      handleError(
        'An error occurred while submitting the restaurant (general) form:',
        error
      );
    }
  };

  const fetchGeneralDetails = async (
    hospitalityChainId: string,
    restaurantId: string
  ) => {
    try {
      const response: any = await getRestaurantGeneral(
        hospitalityChainId,
        restaurantId
      );

      if (response) {
        const data = returnCommonObject(initialValues, response);
        data['registerationNumber'] =
          response?.hospitalityChainId?.registrationNumber;
        data['hospitalityChainId'] = response?.hospitalityChainId?._id;
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
    if (hospitalityChainId && restaurantId) {
      fetchGeneralDetails(hospitalityChainId, restaurantId);
    }

    fetchHospitalityChain();
  }, [hospitalityChainId, restaurantId]);

  useEffect(() => {
    if (hospitalityChains) {
      const options = hospitalityChains.map((chain: any) => ({
        label: chain.chainName,
        value: chain._id,
      }));

      findField(generalFormField, 'hospitalityChainId')['options'] = options;
    }
  }, [hospitalityChains]);

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
