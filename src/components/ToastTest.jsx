import React from 'react';
import { toast } from 'react-toastify';

const ToastTest = () => {
  const showSuccessToast = () => {
    toast.success('Login successful! Welcome back!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showErrorToast = () => {
    toast.error('Login failed! Please try again.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showInfoToast = () => {
    toast.info('You have been logged out successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showWarningToast = () => {
    toast.warn('Your session is about to expire!', {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showLoadingToast = () => {
    const toastId = toast.loading('Logging you in...', {
      position: "top-right",
    });
    
    // Simulate login process
    setTimeout(() => {
      toast.update(toastId, {
        render: "Login successful! Welcome back!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, 2000);
  };

  const showCustomToast = () => {
    toast('🚌 Booking confirmed! Have a great trip!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: '#1e40af',
        color: 'white',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-950 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          React-Toastify Demo - HR Roadways Style
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Test Different Toast Notifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              onClick={showSuccessToast}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>✅</span>
              <span>Login Success</span>
            </button>
            
            <button 
              onClick={showErrorToast}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>❌</span>
              <span>Login Error</span>
            </button>
            
            <button 
              onClick={showInfoToast}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>ℹ️</span>
              <span>Logout Info</span>
            </button>
            
            <button 
              onClick={showWarningToast}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>⚠️</span>
              <span>Session Warning</span>
            </button>
            
            <button 
              onClick={showLoadingToast}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>⏳</span>
              <span>Loading Demo</span>
            </button>
            
            <button 
              onClick={showCustomToast}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>🚌</span>
              <span>Booking Success</span>
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">How it works in your app:</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>User logs in → Redirected to /mybookings → Success toast appears</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>User signs up → Redirected to /mybookings → Welcome toast appears</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>User logs out → Info toast confirms logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastTest;