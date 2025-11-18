import React from 'react';
import { Icons } from './Icons';

interface StatusMessageProps {
  message: string;
  type?: 'loading' | 'error' | 'info';
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ message, type = 'loading' }) => {
  const baseClasses = "flex items-center justify-center p-6 text-md rounded-xl max-w-3xl mx-auto bg-white shadow-md border";
  const typeClasses = {
    loading: 'border-blue-200 text-blue-800',
    error: 'border-red-200 text-red-800',
    info: 'border-green-200 text-green-800',
  };

  const iconClasses = {
      loading: 'text-blue-500',
      error: 'text-red-500',
      info: 'text-green-500'
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      {type === 'loading' && <Icons.spinner className={`animate-spin h-6 w-6 mr-3 ${iconClasses[type]}`} />}
      {type === 'error' && <Icons.error className={`h-6 w-6 mr-3 ${iconClasses[type]}`} />}
      <span className="font-medium">{message}</span>
    </div>
  );
};