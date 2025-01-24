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
import { IconEye, IconXCircle } from '@/components/Icons';

const ReservationHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reservationId = searchParams.get('reservationId') ?? null;

  const [createForm, setCreateForm] = useState(false);
  const [viewForm, setViewForm] = useState(false);
  const [reservation, setReservation] = useState<any>({})
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
    setViewForm(false);
    setReservation({});
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
      setViewForm(true);
      const response = await getReservation(id);
      setReservation(response);
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
      <FormSlider isOpen={viewForm} className="!min-w-[800px]">
        <div className="grid grid-cols-4 p-10 relative">
          <button className="absolute top-5 right-5" onClick={handleCloseForm}>
            <IconXCircle />
          </button>
          <div className="col-span-4 flex items-center gap-4 border p-4 mt-4 rounded-t-sm">
            <div className="w-14 h-14 rounded-full bg-neutral-100"></div>
            <div>
              <h1 className="text-base font-bold">
                {initialValues.firstname ?? 'Undefined'}{' '}
                {initialValues.lastname ?? 'Undefined'}
              </h1>
              <div className="flex items-center gap-5">
                <div className="flex itewms-center gap-2">
                  <IconEye />
                  <span className="text-sm text-neutral-600">
                    {initialValues.email ?? 'Undefined'}
                  </span>
                </div>
                <div className="flex itewms-center gap-2">
                  <IconEye />
                  <span className="text-sm text-neutral-600">
                    {initialValues.contactNumber ?? 'Undefined'}
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-auto">Status: {initialValues.status}</div>
          </div>
          <div className="border p-4 border-t-0">
            <p className="font-bold text-neutral-500">Restaurant</p>
            <p className="text-base text-neutral-900">{reservation.restaurantId?.restaurantName}</p>
          </div>
          <div className="border p-4 border-t-0">
            <p className="font-bold text-neutral-500">Dining</p>
            <p className="text-base text-neutral-900">{reservation.dining?.diningName}</p>
          </div>
          <div className="border p-4 border-t-0">
            <p className="font-bold text-neutral-500">Dining Area</p>
            <p className="text-base text-neutral-900">{reservation.diningArea?.sectionName}</p>
          </div>
          <div className="border p-4 border-t-0">
            <p className="font-bold text-neutral-500">Guest Size</p>
            <p className="text-base text-neutral-900">{reservation.guestSize}</p>
          </div>
          <div className="border p-4 border-t-0">
            <p className="font-bold text-neutral-500">Occation</p>
            <p className="text-base text-neutral-900">{reservation.occasion}</p>
          </div>
          <div className="border p-4 border-t-0">
            <p className="font-bold text-neutral-500">Table</p>
            <p className="text-base text-neutral-900">{reservation.tableno}</p>
          </div>
          <div className="border p-4 border-t-0 col-span-2">
            <p className="font-bold text-neutral-500">Date time</p>
            <p className="text-neutral-900">{reservation.date} - {reservation.time}</p>
          </div>
       
       
          {/* <div>
            <h1>View Reservation</h1>
            <p>First Name: {initialValues.firstname}</p>
            <p>Last Name: {initialValues.lastname}</p>
            <p>Contact Number: {initialValues.contactNumber}</p>
            <p>Email: {initialValues.email}</p>
            <p>Restaurant: {initialValues.restaurant}</p>
            <p>Reserved For: {initialValues.reservedfor}</p>
            <p>Pax: {initialValues.pax}</p>
            <p>Dining Area: {initialValues.diningarea}</p>
            <p>Occasion: {initialValues.occasion}</p>
            <p>Special Note: {initialValues.specialnote}</p>
            <p>Table No: {initialValues.tableno}</p>
            <p>Status: {initialValues.status}</p>
          </div> */}
        </div>
      </FormSlider>
    </>
  );
};

export default ReservationHeader;
