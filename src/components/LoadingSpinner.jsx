import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Memuat...' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-unkris-blue rounded-full animate-spin`}></div>
      {text && <p className="mt-3 text-sm text-gray-500">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;