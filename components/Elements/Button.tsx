import React from 'react';

type ButtonType = {
  type: 'filled' | 'outlined';
  children: React.ReactNode;
};

const Button = ({ type, children }: ButtonType) => {
    const typeStyle = {
        filled: 'btn-primary',
        outlined: 'btn-outline-primary',
    }

  return (
    <button
      type="button"
      className={`btn shadow-none ${typeStyle[type]}`}
    >
      {children}
    </button>
  );
};

export default Button;
