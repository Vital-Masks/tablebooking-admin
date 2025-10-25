"use client";
import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import Button from "@/components/Elements/Button";
import ToastBanner from "@/components/Elements/ToastBanner";
import {
  userroleFormField,
  userroleFormSchema,
} from "@/constants/FormsDataJs/UserRoleForm";
import {
  createUserRoles,
  getRestaurantUserRoleById,
  updateUserRoles,
} from "@/lib/actions/restaurant.actions";
import { createUser } from "@/lib/actions/user.action";
import { handleError, returnCommonObject } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const UserRoleForm = ({ params }: any) => {
  const searchParams = useSearchParams();
  const userRoleId = searchParams.get("edit");
  const router = useRouter();
  const pathname = usePathname();

  const defaultInitialValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      gender: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
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
    if (!userRoleId || params.restaurantId === "c") return;

    try {
      const response = await getRestaurantUserRoleById(
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
        "An error occurred while fetching cuisine menu details:",
        error
      );
    }
  };

  const onSubmit = async (data: UserRolesParams) => {
    try {
      if (params.restaurantId === "c") {
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

      if (userRoleId) {
        await updateUserRoles(userRoleId, data);
        toast.custom((t) => (
          <ToastBanner t={t} type="SUCCESS" message="Updated Successfully!" />
        ));
      } else {
        await createUserRoles(data);
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
        "An error occurred while submitting the restaurant (general) form:",
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
          title={userRoleId ? "Edit User Role" : "Create User Role"}
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
