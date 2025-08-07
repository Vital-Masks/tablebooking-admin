"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
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
import {
  findField,
  handleError,
  returnCommonObject,
} from "@/lib/utils";
import toast from "react-hot-toast";
import ToastBanner from "@/components/Elements/ToastBanner";
import { getUtilities } from "@/lib/actions/utilities.actions";
import { uploadMultipleFilesToS3 } from "@/lib/aws-s3";

const CuisineMenuForm = ({ params }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cuisineId = searchParams.get("edit");

  const [modal1, setModal1] = useState(false);

  const defaultInitialValues = useMemo(
    () => ({
      foodName: "",
      foodCategory: "",
      description: "",
      price: "",
      cousineType: "",
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

  const fetchCuisineMenuData = async () => {
    if (!cuisineId || params.restaurantId === "c") return;

    try {
      const response = await getRestaurantCuisineMenuById(
        params.restaurantId,
        cuisineId
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

  const handleSubmit = async (data: CreateCuisineMenuParams) => {
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

      if (cuisineId) {
        await updateRestaurantCuisineMenu(cuisineId, data);
        toast.custom((t) => (
          <ToastBanner t={t} type="SUCCESS" message="Updated Successfully!" />
        ));
      } else {
        await createRestaurantCuisineMenu(data);
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
        "An error occurred while submitting the cuisine menu form:",
        error
      );
    }
  };

  const handlePDFSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const url = formData.get("url") as string | null;
    const files: any = formData.getAll("imgFile") as File[];
    console.log(">>", files);
    if (files.length > 0) {
      const imageUrls = await uploadMultipleFilesToS3(
        files,
        "restaurant-menu-images"
      );

      handleSubmit({ pdf: imageUrls });
    } else if (url) {
      handleSubmit({ link: url });
    } else {
      toast.custom((t) => (
        <ToastBanner
          t={t}
          type="ERROR"
          message="Please upload an image or enter a URL"
        />
      ));
    }
  };

  useEffect(() => {
    if (cuisineId) {
      fetchCuisineMenuData();
    }
  }, [cuisineId]);

  useEffect(() => {
    const fetchUtilities = async () => {
      const utilities = await getUtilities();
      const options = Object.entries(utilities?.[0].foodCategory).map(
        ([key, value]) => ({
          label: value,
          value: value,
        })
      );

      findField(foodFormField, "foodCategory")["options"] = options;

      const options2 = Object.entries(utilities?.[0].Cuisine).map(
        ([key, value]) => ({
          label: value,
          value: value,
        })
      );
      findField(foodFormField, "cousineType")["options"] = options2;
    };
    fetchUtilities();
  }, []);

  return (
    <>
      <Transition appear show={modal1} as={Fragment}>
        <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </TransitionChild>
          <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
            <div className="flex items-start justify-center min-h-screen px-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  as="div"
                  className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black"
                >
                  <form
                    onSubmit={handlePDFSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="flex bg-[#fbfbfb] items-center justify-between px-5 py-3">
                      <div className="text-lg font-bold">Upload</div>
                      <button
                        type="button"
                        className="text-white-dark hover:text-dark"
                        onClick={() => setModal1(false)}
                      >
                        x
                      </button>
                    </div>
                    <div className="p-5">
                      <div>
                        <label htmlFor="imgFile">Upload your Image file</label>
                        <input
                          id="imgFile"
                          name="imgFile"
                          type="file"
                          accept="image/*"
                          multiple={true}
                          className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                        />
                      </div>
                      <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                        Or
                      </div>
                      <div>
                        <label htmlFor="url">Enter URL</label>
                        <input
                          id="url"
                          name="url"
                          type="text"
                          placeholder="https://"
                          className="form-input"
                        />
                      </div>

                      <div className="flex justify-end items-center mt-8">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => setModal1(false)}
                        >
                          Discard
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary ml-4"
                          onClick={() => setModal1(false)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <Button type="filled" className="" onClick={() => setModal1(true)}>
          + Upload PDF
        </Button>
        <Button type="filled" className="" onClick={() => setIsFormOpen(true)}>
          + Create new
        </Button>
      </div>
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
