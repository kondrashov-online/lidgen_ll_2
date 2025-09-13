import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

const ErrorMessage = ({ 
  message = 'Произошла ошибка', 
  onRetry, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Что-то пошло не так
      </h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline" 
          className="flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Попробовать снова
        </Button>
      )}
    </div>
  );
};

export const ErrorPage = ({ message, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      <ErrorMessage message={message} onRetry={onRetry} />
    </div>
  </div>
);

export const ErrorSection = ({ message, onRetry, className = '' }) => (
  <div className={`py-12 ${className}`}>
    <ErrorMessage message={message} onRetry={onRetry} />
  </div>
);

export default ErrorMessage;