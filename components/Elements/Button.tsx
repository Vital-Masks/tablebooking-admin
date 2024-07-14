import React from 'react';

type ButtonType = {
  type: 'filled' | 'outlined';
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ type, children, onClick }: ButtonType) => {
    const typeStyle = {
        filled: 'btn-primary',
        outlined: 'btn-outline-primary',
    }

  return (
    <button
      type="button"
      className={`btn shadow-none ${typeStyle[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
