'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import FormSlider from '@/components/Common/Form/FormSlider';
import PageHeader from '@/components/Elements/PageHeader';
import { handleError } from '@/lib/utils';
import { ROUTE_CUSTOMERS } from '@/constants/routes';
import {  getUserById } from '@/lib/actions/user.action';
import { IconEye, IconXCircle } from '@/components/Icons';
import moment from 'moment';

const CustomerHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') ?? null;

  const [isOpen, setIsOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<any>({});

  const pageHeaderData = {
    title: 'Customers',
    button1: {
      title: 'Export',
      action: () => setIsOpen(true),
    },
  };

  const handleCloseForm = () => {
    setIsOpen(false);
    setCustomerDetails({});
    if (id) {
      router.push(ROUTE_CUSTOMERS);
    }
  };

  const fetchCustomers = async (id: string) => {
    try {
      setIsOpen(true);
      const response = await getUserById(id);
      setCustomerDetails(response);
      
    } catch (error) {
      handleError(
        'An error occurred while submitting the hospital chain form:',
        error
      );
    }
  };

  useEffect(() => {
    if (id) {
      fetchCustomers(id);
    }
  }, [id]);

  return (
    <>
      <PageHeader pageHeaderData={pageHeaderData} />

      <FormSlider isOpen={isOpen} className="!min-w-[800px]">
        <div className="grid grid-cols-4 p-10 relative">
          <button className="absolute top-5 right-5" onClick={handleCloseForm}>
            <IconXCircle />
          </button>
          <div className="col-span-4 flex items-center gap-4 border p-4 mt-4 rounded-t-sm">
            <div className="w-14 h-14 rounded-full bg-neutral-100"></div>
            <div>
              <h1 className="text-base font-bold">
                {customerDetails.firstName ?? 'Undefined'}{' '}
                {customerDetails.lastName ?? 'Undefined'}
              </h1>
              <div className="flex items-center gap-5">
                <div className="flex itewms-center gap-2">
                  <IconEye />
                  <span className="text-sm text-neutral-600">
                    {customerDetails.email ?? 'Undefined'}
                  </span>
                </div>
                <div className="flex itewms-center gap-2">
                  <IconEye />
                  <span className="text-sm text-neutral-600">
                    {customerDetails.contactNo ?? 'Undefined'}
                  </span>
                </div>
                <div className="flex itewms-center gap-2">
                  <IconEye />
                  <span className="text-sm text-neutral-600">
                    {customerDetails.addressLine1},{' '}
                    {customerDetails.addressLine2}, {customerDetails.city},{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center col-span-2 border p-4  border-t-0 rounded-t-sm">
            <p className="font-bold text-neutral-500">Reservation Made</p>
            <p className="text-xl text-neutral-900">{customerDetails.reservationCount}</p>
          </div>
          <div className="text-center col-span-2 border p-4  border-t-0 rounded-t-sm">
            <p className="font-bold text-neutral-500">Reviews Made</p>
            <p className="text-xl text-neutral-900">{customerDetails.reviewsCount}</p>
          </div>
          <p className="col-span-4 text-right mt-2">
            Members since{' '}
            {customerDetails.created_at
              ? moment(customerDetails.created_at).format('DD MMM YYYY')
              : ''}
          </p>
        </div>
      </FormSlider>
    </>
  );
};

export default CustomerHeader;
