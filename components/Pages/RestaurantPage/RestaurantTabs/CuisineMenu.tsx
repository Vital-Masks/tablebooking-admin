// import { useState } from 'react';
import Table from '@/components/Common/Table';
// import FormSlider from '@/components/Common/Form/FormSlider';
// import FormComponent from '@/components/Common/Form';
// import {
//   foodFormField,
//   foodFormSchema,
// } from '@/constants/FormsDataJs/CuisineForm';
// import {  useSearchParams } from 'next/navigation';
// import { createRestaurantCuisineMenu } from '@/lib/actions/restaurant.actions';
// import { handleError } from '@/lib/utils';

const CuisineMenu = async ({ params }: any) => {


    const columns = [
        { accessor: 'foodName', title: 'Food Name' },
        { accessor: 'category', title: 'Category' },
        { accessor: 'price', title: 'Price' },
        {
          accessor: 'action',
          title: '',
          titleClassName: '!text-center',
        //   render: () => (
        //     <div className="flex items-center gap-4 mx-auto w-max">
        //       {/* <button onClick={() => setIsCreateForm(true)}>
        //         <IconEye />
        //       </button> */}
        //     </div>
        //   ),
        },
      ];

      const rowData: HospitalChain[] = [];
//   const searchParam = useSearchParams();
//   const restaurantId = searchParam.get('restaurantId');
//   const hospitalityChainId = searchParam.get('hospitalityChainId');
//   const [isCreateForm, setIsCreateForm] = useState(false);
//   const [initialValues, setInitialValues] = useState({
//     foodName: '',
//     category: '',
//     price: '',
//   });
  

//   const onSubmit = async (data: CreateCuisineMenuParams) => {
//     try {
//         if(hospitalityChainId && restaurantId){ 
//           data['hospitalityChainId'] = hospitalityChainId;
//           data['restaurantId'] = restaurantId;
//           await createRestaurantCuisineMenu(data);
//           setIsCreateForm(false)
//         }


//       // if (hospitalityChainId && restaurantId) {
//       //   await updateRestaurantGeneral(restaurantId, data);
//       // } else {
      
//         // data['hospitalityChainId'] = hospitalityChainId ?? undefined;
//         // data['restaurantId'] = restaurantId ?? undefined;

//         // const response = await createRestaurantCuisineMenu(data);

//         // if (response?.hospitalityChainId?._id && response?._id) {
//         //   params.set('hospitalityChainId', response?.hospitalityChainId?._id);
//         //   params.set('restaurantId', response?._id);
//         //   replace(`${pathname}?${params.toString()}`);
//         //   fetchGeneralDetails(response?.hospitalityChainId?._id, response?._id);
//         // }
//       // }
//     } catch (error) {
//       handleError(
//         'An error occurred while submitting the restaurant (general) form:',
//         error
//       );
//     }
//   };

//   // TODO: Check cuisine

  return (
    <main>
    
      {/* <CuisineTable /> */}
      {/* <FormSlider isOpen={isCreateForm}>
        <FormComponent
          title="Create cuisine menu"
          fields={foodFormField}
          initialValues={initialValues}
          validationSchema={foodFormSchema}
          closeForm={() => setIsCreateForm(false)}
          handleSubmit={onSubmit}
        />
      </FormSlider> */}
    </main>
  );
};

export default CuisineMenu;
