import React from 'react';
import { theme } from '../../../constants/theme';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: `bg-[${theme.colors.primary.main}] hover:bg-[${theme.colors.primary.hover}] text-white focus:ring-[${theme.colors.primary.main}] shadow-md hover:shadow-lg`,
    secondary: `bg-[${theme.colors.secondary.main}] hover:bg-[${theme.colors.secondary.dark}] text-[${theme.colors.text.primary}] focus:ring-[${theme.colors.primary.main}]`,
    outline: `border-2 border-[${theme.colors.primary.main}] text-[${theme.colors.primary.main}] hover:bg-[${theme.colors.primary.main}] hover:text-white focus:ring-[${theme.colors.primary.main}]`,
    ghost: `text-[${theme.colors.primary.main}] hover:bg-[${theme.colors.secondary.main}] focus:ring-[${theme.colors.primary.main}]`,
    danger: `bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-md hover:shadow-lg`,
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 sm:h-12 px-5 sm:px-6 text-sm sm:text-base',
    lg: 'h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? theme.colors.primary.main : variant === 'secondary' ? theme.colors.secondary.main : variant === 'danger' ? '#EF4444' : 'transparent',
        color: variant === 'primary' || variant === 'outline' || variant === 'danger' ? theme.colors.text.white : theme.colors.text.primary,
        borderColor: variant === 'outline' ? theme.colors.primary.main : 'transparent',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
            e.target.style.backgroundColor = theme.colors.primary.hover;
          } else if (variant === 'secondary') {
            e.target.style.backgroundColor = theme.colors.secondary.dark;
          } else if (variant === 'outline') {
            e.target.style.backgroundColor = theme.colors.primary.main;
            e.target.style.color = theme.colors.text.white;
          } else if (variant === 'danger') {
            e.target.style.backgroundColor = '#DC2626';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.target.style.backgroundColor = theme.colors.primary.main;
        } else if (variant === 'secondary') {
          e.target.style.backgroundColor = theme.colors.secondary.main;
        } else if (variant === 'outline') {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = theme.colors.primary.main;
        } else if (variant === 'danger') {
          e.target.style.backgroundColor = '#EF4444';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
