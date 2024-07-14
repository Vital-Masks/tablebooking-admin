import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import IconEye from '@/components/Icons/IconEye';
import { diningFormField, diningFormSchema } from '@/constants/FormsDataJs/DiningTimingForm';
import { promoFormField, promoFormSchema } from '@/constants/FormsDataJs/PromocodeForm';
import React, { useState } from 'react'

const Promocodes = () => {
    const [initialValues, setInitialValues] = useState({
        promocode: '',
        promocodeFor: '',
        validFromDate: '',
        validTillDate: '',
        amount: '',
        availabilityStatus: ''
      });
    
      const [isCreateForm, setIsCreateForm] = useState(false);
    
      const rowData = [
        {
          id: 1,
          promocode: 'FHB20034535',
        promocodeFor: 'Shangri La Central',
        validFromDate: '12 Jul 2024',
        validTillDate: '24 Aug 2024',
        amount: '400.00 LKR',
        availabilityStatus: 'Available'
        },
        {
        id: 2,
        promocode: 'FHB20034535',
          promocodeFor: 'Shangri La Central',
          validFromDate: '12 Jul 2024',
          validTillDate: '24 Aug 2024',
          amount: '400.00 LKR',
          availabilityStatus: 'Available'
        },
      ];
    
      const columns = [
        { accessor: 'promocode', title: 'Promocode' },
        { accessor: 'promocodeFor', title: 'Promocode For' },
        { accessor: 'validFromDate', title: 'Valid From' },
        { accessor: 'validTillDate', title: 'Valid Till' },
        { accessor: 'amount', title: 'Amount' },
        { accessor: 'availabilityStatus', title: 'Availability' },
        {
          accessor: 'action',
          title: '',
          titleClassName: '!text-center',
          render: () => (
            <div className="flex items-center gap-4 mx-auto w-max">
              <button onClick={() => setIsCreateForm(!isCreateForm)}>
                <IconEye />
              </button>
              {/* <button onClick={() => console.log('Share action')}>
                <IconShare />
              </button> */}
            </div>
          ),
        },
      ];

      
  return (
    <main>
      <div>
      <div className="flex items-center p-3 justify-between panel whitespace-nowrap text-primary mb-6">
          <h2 className="text-lg text-black font-bold">Promocode</h2>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsCreateForm(!isCreateForm)} type="filled">Add New</Button>
            
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-5">
          <div className={`${isCreateForm ? 'col-span-2' : 'col-span-3'} transition-col-span duration-300`}>
            <Table columns={columns} rowData={rowData} />
          </div>
          {isCreateForm && (
            <FormComponent
              title="Add Promocode"
              fields={promoFormField}
              initialValues={initialValues}
              validationSchema={promoFormSchema }
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default Promocodes