"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import FormComponent from "@/components/Common/Form";
import FormSlider from "@/components/Common/Form/FormSlider";
import PageHeader from "@/components/Elements/PageHeader";


import { handleError } from "@/lib/utils";
import { ROUTE_RESERVATIONS } from "@/constants/routes";
import {
  tableReservationFormField,
  tableReservationFormSchema,
} from "@/constants/FormsDataJs/TableReservationForm";
import {
  createReservation,
  getReservation,
} from "@/lib/actions/reservation.action";

const ReservationHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reservationId = searchParams.get("reservationId") ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    date: "",
    time: "",
    fullname: "",
    contactNumber: "",
    email: "",
    restaurant: "",
    reservedfor: "",
    pax: "",
    diningarea: "",
    occasion: "",
    specialnote: "",
    tableno: "",
    status: "",
  });

  const pageHeaderData = {
    title: "Reservations",
    button1: {
      title: "Add New Reservation",
      action: () => setCreateForm(true),
    },
  };

  const handleCloseForm = () => {
    setCreateForm(false);
    if (reservationId) {
      router.push(ROUTE_RESERVATIONS);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      data["guestUserId"] = "67091f41011f4aea418b87f1";
      if (reservationId) {
        //  await updateHospitalChain(reservationId, data);
        //  router.push(ROUTE_RESERVATIONS);
      } else {
        await createReservation(data);
      }
      setCreateForm(false);
    } catch (error) {
      handleError(
        "An error occurred while submitting the hospital chain form:",
        error
      );
    }
  };

  const fetchReservation = async (id: string) => {
    try {
      setCreateForm(true);
      const response = await getReservation(id);


      setInitialValues({
        date: response.date,
        time: response.time.replace('.', ':'),
        fullname: response.guestUserId.firstName,
        contactNumber: response.guestUserId.contactNo,
        email: response.guestUserId.email,
        restaurant: response.restaurantId._id,
        reservedfor: response.dining._id,
        pax: response.guestSize,
        diningarea: response.diningArea._id,
        occasion: response.occasion,
        specialnote: response.specialRequest,
        tableno: "",
        status: response.status,
      });
    } catch (error) {
      handleError(
        "An error occurred while submitting the hospital chain form:",
        error
      );
    }
  };

  useEffect(() => {
    if (reservationId) {
      fetchReservation(reservationId);
    }
  }, [reservationId]);

  return (
    <>
      <PageHeader pageHeaderData={pageHeaderData} />

      <FormSlider isOpen={createForm}>
        <FormComponent
          title="Make a Reservation"
          fields={tableReservationFormField}
          initialValues={initialValues}
          validationSchema={tableReservationFormSchema}
          handleSubmit={handleFormSubmit}
          closeForm={() => handleCloseForm()}
        />
      </FormSlider>
    </>
  );
};

export default ReservationHeader;
