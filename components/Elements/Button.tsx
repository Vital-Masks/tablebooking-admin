import React from 'react';

type ButtonType = {
  type: 'filled' | 'outlined';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({ type, children, className, onClick }: ButtonType) => {
  const typeStyle = {
    filled: 'btn-primary',
    outlined: 'btn-outline-primary',
  };

  return (
    <button
      type="button"
      className={`btn shadow-none ${typeStyle[type]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
