'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FormComponent from '@/components/Common/Form';
import {
  generalFormField,
  generalFormSchema,
} from '@/constants/FormsDataJs/GeneralDetailsForm';
import {
  createRestaurantGeneral,
  getRestaurantGeneral,
  updateRestaurantGeneral,
} from '@/lib/actions/restaurant.actions';
import { base64ToBlob, convertImageToBase64, findField, handleError, returnCommonObject } from '@/lib/utils';
import FilePicker from '@/components/Common/Fields/FilePicker';

export default function GeneralDetailForm({ hospitalityChains, params }: any) {
  const router = useRouter()

  const { restaurantId, hospitalityChainId } = params;

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
  const [coverImage, setCoverImage] = useState<any[]>([])

  const onSubmit = async (data: CreateRestaurantGeneralParams) => {
    try {
      convertImageToBase64(coverImage[0]).then((base64) => {
        data.images = { "photo": base64}
      })

      if (hospitalityChainId !== 'n' && restaurantId !== 'c') {
        await updateRestaurantGeneral(restaurantId, data);
      } else {
        const response: any = await createRestaurantGeneral(data);

        if (response?.hospitalityChainId?._id && response?._id) {
          router.push(`/${response?._id}/${response?.hospitalityChainId?._id}/general-detail`)
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
      console.log(">>", response)
      if (response) {
        const data = returnCommonObject(initialValues, response);
        data['registerationNumber'] =
          response?.hospitalityChainId?.registrationNumber;
        data['hospitalityChainId'] = response?.hospitalityChainId?._id;
        setCoverImage(response.images)
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
        <div className="grid grid-cols-3 items-start">
          <div className="col-span-2 border-r">
            <FormComponent
              fields={generalFormField}
              validationSchema={generalFormSchema}
              initialValues={initialValues}
              handleSubmit={onSubmit}
            />
          </div>
          <div className='p-5'>
            <FilePicker label="Cover photo" name="cover-photo" files={coverImage} setFiles={(v: any) => setCoverImage(v)} />
          </div>
        </div>
      </div>
    </main>
  );
}
