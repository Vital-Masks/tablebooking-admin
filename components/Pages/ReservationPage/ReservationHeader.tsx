'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import FormComponent from '@/components/Common/Form';
import FormSlider from '@/components/Common/Form/FormSlider';
import PageHeader from '@/components/Elements/PageHeader';

import { handleError } from '@/lib/utils';
import { ROUTE_RESERVATIONS } from '@/constants/routes';
import {
  tableReservationFormField,
  tableReservationFormSchema,
} from '@/constants/FormsDataJs/TableReservationForm';
import {
  createReservation,
  getReservation,
} from '@/lib/actions/reservation.action';
import { createUser, getUserByEmail } from '@/lib/actions/user.action';

const ReservationHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reservationId = searchParams.get('reservationId') ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    date: '',
    time: '',
    firstname: '',
    lastname: '',
    contactNumber: '',
    email: '',
    restaurant: '',
    reservedfor: '',
    pax: '',
    diningarea: '',
    occasion: '',
    specialnote: '',
    tableno: '',
    status: '',
  });

  const pageHeaderData = {
    title: 'Reservations',
    button1: {
      title: 'Add New Reservation',
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
      const userEmail = data.email;
      const isUserExist = await getUserByEmail(userEmail);

      if (isUserExist?.[0]) {
        data['guestUserId'] = isUserExist[0]._id;
      } else {
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          contactNo: data.contactNumber,
          email: data.email,
          password: '123456',
        };
        const newUser = await createUser(userData);
        if (newUser.error) {
        } else {
          data['guestUserId'] = newUser._id;
        }
      }

      if (reservationId) {
      } else {
        await createReservation(data);
      }
      setCreateForm(false);
    } catch (error) {
      handleError(
        'An error occurred while submitting the hospital chain form:',
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
        time: response.time?.replace('.', ':'),
        firstname: response.guestUserId?.firstName,
        lastname: response.guestUserId?.firstName,
        contactNumber: response.guestUserId?.contactNo,
        email: response.guestUserId?.email,
        restaurant: response.restaurantId?._id,
        reservedfor: response.dining?._id,
        pax: response.guestSize || '',
        diningarea: response.diningArea?._id,
        occasion: response.occasion || '',
        specialnote: response.specialRequest || '',
        tableno: '',
        status: response.status,
      });
    } catch (error) {
      handleError(
        'An error occurred while submitting the hospital chain form:',
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
