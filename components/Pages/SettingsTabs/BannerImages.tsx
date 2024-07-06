import FormComponent from '@/components/Common/Form';
import Table from '@/components/Common/Table';
import Button from '@/components/Elements/Button';
import IconEye from '@/components/Icons/IconEye';
import { bannerFormField, bannerFormSchema } from '@/constants/FormsDataJs/BannerImagesForms';
import React, { useState } from 'react'

const BannerImages = () => {

    const [initialValues, setInitialValues] = useState({
        bannerName: '',
        bannerFor: '',
        validFromDate: '',
        validTillDate: '',
        availabilityStatus: ''
      });
    
      const [isCreateForm, setIsCreateForm] = useState(false);
    
      const rowData = [
        {
          id: 1,
          bannerName: 'Shangri La',
          bannerFor: 'Shangri La Central',
        validFromDate: '12 Jul 2024',
        validTillDate: '24 Aug 2024',
        availabilityStatus: 'Available'
        },
        {
        id: 2,
        bannerName: 'Shangri La',
          bannerFor: 'Shangri La Central',
          validFromDate: '12 Jul 2024',
          validTillDate: '24 Aug 2024',
          availabilityStatus: 'Available'
        },
      ];
    
      const columns = [
        { accessor: 'bannerName', title: 'Banner Name' },
        { accessor: 'bannerFor', title: 'Banner For' },
        { accessor: 'validFromDate', title: 'Valid From' },
        { accessor: 'validTillDate', title: 'Valid Till' },
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
          <h2 className="text-lg text-black font-bold">Banner Images</h2>
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
              fields={bannerFormField}
              initialValues={initialValues}
              validationSchema={bannerFormSchema  }
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default BannerImages