'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import PageHeader from '@/components/Elements/PageHeader';
import {
  hospitalChainFormField,
  hospitalChainFormSchema,
} from '@/constants/FormsDataJs/HospitalChainForm';
import {
  createHospitalChain,
  getHospitalChain,
  updateHospitalChain,
} from '@/lib/actions/hospitalChain.action';
import { handleError, returnCommonObject } from '@/lib/utils';
import { ROUTE_HOSPITAL_CHAIN } from '@/constants/routes';

const HospitalityHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hospitalId = searchParams.get('hospitalId') ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    chainName: '',
    address: '',
    registrationNumber: '',
    contactNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });

  const pageHeaderData = {
    title: 'Hospitality Chains',
    button1: {
      title: 'Create Chain',
      action: () => setCreateForm(true),
    },
  };

  const handleCloseForm = () => {
    setCreateForm(false);
    if (hospitalId) {
      router.push(ROUTE_HOSPITAL_CHAIN);
    }
  };

  const handleFormSubmit = async (data: CreateHospitalChainParams) => {
    try {
      if (hospitalId) {
        await updateHospitalChain(hospitalId, data);
        router.push(ROUTE_HOSPITAL_CHAIN);
      } else {
        await createHospitalChain(data);
      }
      setCreateForm(false);
    } catch (error) {
      handleError(
        'An error occurred while submitting the hospital chain form:',
        error
      );
    }
  };

  const fetchHospitalChain = async (id: string) => {
    try {
      setCreateForm(true);
      const response = await getHospitalChain(id);
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
    if (hospitalId) {
      fetchHospitalChain(hospitalId);
    }
  }, [hospitalId]);

  return (
    <>
      <PageHeader pageHeaderData={pageHeaderData} />

      <FormSlider isOpen={createForm}>
        <FormComponent
          title="Create Hospital"
          fields={hospitalChainFormField}
          initialValues={initialValues}
          validationSchema={hospitalChainFormSchema}
          handleSubmit={handleFormSubmit}
          closeForm={() => handleCloseForm()}
        />
      </FormSlider>
    </>
  );
};

export default HospitalityHeader;
