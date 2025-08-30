import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full dark:bg-gray-950 dark:text-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Loading;
