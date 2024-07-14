'use client';
import { useState } from 'react';

import FormComponent from '@/components/Common/Form';
import { generalFormField, generalFormSchema, generalImageFormField, generalImageFormSchema } from '@/constants/FormsDataJs/GeneralDetailsForm';

export default function GeneralDetails() {
  const [initialValues, setInitialValues] = useState({
    restaurantName: '',
    restaurantType: '',
    contactNumber: '',
    whatsappNumber: '',
    email: '',
    website: '',
    address: '',
    addressEmbedURL: '',
    description: '',
    diningStyle: '',
    dressCode: '',
    paymentOptions: '',
    timeZone: '',
    availabilityStatus: '',
    promoted: '',
    coverUpload: '',
  });

  return (
    <main>
      <div>
        
        <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2">
            <FormComponent
              fields={generalFormField}
              initialValues={initialValues}
              validationSchema={generalFormSchema}
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
