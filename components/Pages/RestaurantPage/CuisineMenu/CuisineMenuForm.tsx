"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import Button from "@/components/Elements/Button";
import {
  foodFormField,
  foodFormSchema,
} from "@/constants/FormsDataJs/CuisineForm";
import {
  createRestaurantCuisineMenu,
  getRestaurantCuisineMenuById,
  updateRestaurantCuisineMenu,
} from "@/lib/actions/restaurant.actions";
import { handleError, returnCommonObject } from "@/lib/utils";

const CuisineMenuForm = ({ params }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cuisineId = searchParams.get("edit");

  const defaultInitialValues = useMemo(
    () => ({
      foodName: "",
      foodCategory: "",
      description: "",
      price: "",
      cousineType: "",
    }),
    [],
  );
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  const closeForm = () => {
    setIsFormOpen(false);
    router.replace(pathname, { scroll: false });
    setInitialValues(defaultInitialValues);
  };

  const fetchCuisineMenuData = async () => {
    if (!cuisineId || !params.hospitalityChainId || !params.restaurantId)
      return;

    try {
      const response = await getRestaurantCuisineMenuById(
        params.hospitalityChainId,
        params.restaurantId,
        cuisineId,
      );


      if (response) {
        const data = returnCommonObject(defaultInitialValues, response);
        setInitialValues(data);
        setIsFormOpen(true);
      }
    } catch (error) {
      handleError(
        "An error occurred while fetching cuisine menu details:",
        error,
      );
    }
  };

  const handleSubmit = async (data: CreateCuisineMenuParams) => {
    try {
      if (!params.hospitalityChainId || !params.restaurantId) return;

      data.hospitalityChainId = params.hospitalityChainId;
      data.restaurantId = params.restaurantId;

      if (cuisineId) {
        await updateRestaurantCuisineMenu(cuisineId, data);
      } else {
        await createRestaurantCuisineMenu(data);
      }

      // closeForm();
    } catch (error) {
      handleError(
        "An error occurred while submitting the cuisine menu form:",
        error,
      );
    }
  };

  useEffect(() => {
    if (cuisineId) {
      fetchCuisineMenuData();
    }
  }, [cuisineId]);

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
          title="Create cuisine menu"
          fields={foodFormField}
          initialValues={initialValues}
          validationSchema={foodFormSchema}
          closeForm={closeForm}
          handleSubmit={handleSubmit}
        />
      </FormSlider>
    </>
  );
};

export default CuisineMenuForm;
