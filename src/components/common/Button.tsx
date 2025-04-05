import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;