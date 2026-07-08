import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-light text-white shadow-md border-b-2 border-primary-dark',
    secondary: 'bg-secondary hover:bg-secondary-light text-primary font-bold shadow-md border-b-2 border-secondary-dark',
    accent: 'bg-accent hover:bg-accent-light text-white shadow-sm border-b-2 border-accent-dark',
    outline: 'border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary/5',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-sm border-b-2 border-red-800',
    ghost: 'text-primary/70 hover:text-primary hover:bg-primary/5',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
