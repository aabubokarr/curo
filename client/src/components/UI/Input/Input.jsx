import React from 'react';
import { theme } from '../../../constants/theme';

const Input = ({
  label,
  error,
  helperText,
  fullWidth = true,
  className = '',
  type = 'text',
  ...props
}) => {
  const baseInputClasses = `h-11 sm:h-12 px-4 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 text-sm sm:text-base ${
    error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:border-[#009BA9] focus:ring-[#009BA9] hover:border-gray-400'
  } ${className}`;

  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="text-sm sm:text-base font-medium"
          style={{ color: theme.colors.primary.main }}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          className={baseInputClasses}
          style={{
            backgroundColor: theme.colors.background.paper,
            color: theme.colors.text.primary,
            minHeight: '100px',
            resize: 'vertical',
          }}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={baseInputClasses}
          style={{
            backgroundColor: theme.colors.background.paper,
            color: theme.colors.text.primary,
          }}
          {...props}
        />
      )}
      {error && (
        <span className="text-xs sm:text-sm text-red-500 mt-0.5 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className="text-xs sm:text-sm text-gray-500 mt-0.5">{helperText}</span>
      )}
    </div>
  );
};

export default Input;
