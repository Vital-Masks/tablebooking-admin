import React from 'react';

const FormSlider = ({ isOpen, className, children }: any) => {
  return (
    <div
      className={`absolute bg-white z-50 top-0 right-0 min-w-[400px] max-w-[400px] h-full overflow-scroll shadow-lg transition-all ease-linear  ${
        isOpen ? 'translate-x-0 opacity-100 z-10' : 'translate-x-96 opacity-0 -z-20 hidden'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default FormSlider;
