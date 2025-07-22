import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#3c6975] text-white text-center px-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-2">Page Not Found</p>
      <p className="text-lg text-gray-300 mb-6">Sorry, the page you are looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
