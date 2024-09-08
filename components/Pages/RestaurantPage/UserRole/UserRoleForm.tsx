'use client';
import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import Button from '@/components/Elements/Button';
import {
  userroleFormField,
  userroleFormSchema,
} from '@/constants/FormsDataJs/UserRoleForm';
import {
  createUserRoles,
  getRestaurantUserRoleById,
  updateUserRoles,
} from '@/lib/actions/restaurant.actions';
import { handleError, returnCommonObject } from '@/lib/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import React, { useEffect, useMemo, useState } from 'react';

const UserRoleForm = ({ params }: any) => {
  const searchParams = useSearchParams();
  const userRoleId = searchParams.get('edit');
  const router = useRouter();
  const pathname = usePathname();

  const defaultInitialValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      gender: '',
      phoneNumber: '',
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

  const fetchUserRoles = async () => {
    if (!userRoleId || !params.hospitalityChainId || !params.restaurantId)
      return;

    try {
      const response = await getRestaurantUserRoleById(
        params.hospitalityChainId,
        params.restaurantId,
        userRoleId
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

  const onSubmit = async (data: UserRolesParams) => {
    try {
      if (!params.hospitalityChainId || !params.restaurantId) return;

      data.hospitalityChainId = params.hospitalityChainId;
      data.restaurantId = params.restaurantId;

      if (userRoleId) {
        await updateUserRoles(userRoleId, data);
      } else {
        await createUserRoles(data);
      }

      // closeForm();
    } catch (error) {
      handleError(
        'An error occurred while submitting the restaurant (general) form:',
        error
      );
    }
  };

  useEffect(() => {
    if (userRoleId) {
      fetchUserRoles();
    }
  }, [userRoleId]);

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
          fields={userroleFormField}
          initialValues={initialValues}
          validationSchema={userroleFormSchema}
          closeForm={closeForm}
          handleSubmit={onSubmit}
        />
      </FormSlider>
    </>
  );
};

export default UserRoleForm;
