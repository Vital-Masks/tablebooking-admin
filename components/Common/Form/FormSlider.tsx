import React from 'react';

const FormSlider = ({ isOpen, children }: any) => {
  return (
    <div
      className={`absolute bg-white z-50 top-0 right-0 w-[500px] h-full overflow-scroll shadow-lg transition-all ease-linear  ${
        isOpen ? 'translate-x-0 opacity-100 z-10' : 'translate-x-96 opacity-0 -z-20 hidden'
      }`}
    >
      {children}
    </div>
  );
};

export default FormSlider;
