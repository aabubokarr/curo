import React from 'react';
import { theme } from '../../../constants/theme';

const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div
      className={`rounded-lg ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`}
      style={{
        backgroundColor: theme.colors.background.paper,
        borderColor: theme.colors.border.light,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

