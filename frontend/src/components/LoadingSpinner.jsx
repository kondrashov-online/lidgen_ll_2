import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`
          animate-spin rounded-full border-2 border-gray-300 border-t-orange-500 
          ${sizeClasses[size]}
        `}
      />
    </div>
  );
};

export const LoadingPage = ({ message = 'Загрузка...' }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="xl" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  </div>
);

export const LoadingSection = ({ message = 'Загрузка...', className = '' }) => (
  <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
    <LoadingSpinner size="lg" />
    <p className="mt-4 text-gray-600">{message}</p>
  </div>
);

export default LoadingSpinner;