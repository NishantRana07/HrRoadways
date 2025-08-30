// pages/MyBookings.js
import React, { useEffect } from "react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const mockBookings = [
  { id: 1, title: "Trip to Manali", date: "2025-08-10" },
  { id: 2, title: "Goa Beach Holiday", date: "2025-09-02" },
];

const MyBookings = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Show toast after successful login or signup
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const urlParams = new URLSearchParams(location.search);
      const loginSuccess = urlParams.get('login');
      const signupSuccess = urlParams.get('signup');
      
      // Also check localStorage as backup
      const localLogin = localStorage.getItem("login_success");
      const localSignup = localStorage.getItem("signup_success");
      
      // Check if we haven't shown a welcome message recently
      const lastWelcome = sessionStorage.getItem('last_welcome');
      const now = Date.now();
      const shouldShowWelcome = !lastWelcome || (now - parseInt(lastWelcome)) > 5000; // 5 seconds cooldown
      
      if ((loginSuccess === 'success' || localLogin) && shouldShowWelcome) {
        toast.success(" Login successful! Welcome back!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { background: "#2563eb", color: "#fff" }
        });
        localStorage.removeItem("login_success");
        sessionStorage.setItem('last_welcome', now.toString());
        // Clean URL
        if (loginSuccess) {
          navigate('/mybookings', { replace: true });
        }
      }
      
      if ((signupSuccess === 'success' || localSignup) && shouldShowWelcome) {
        toast.success("🎉 Registration successful! Welcome aboard!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          style: { background: "#2563eb", color: "#fff" }
        });
        localStorage.removeItem("signup_success");
        sessionStorage.setItem('last_welcome', now.toString());
        // Clean URL
        if (signupSuccess) {
          navigate('/mybookings', { replace: true });
        }
      }
      
      // Fallback: If user just became signed in and no other indicators, show login success
      if (shouldShowWelcome && !loginSuccess && !signupSuccess && !localLogin && !localSignup) {
        // Small delay to ensure page is ready
        const timer = setTimeout(() => {
          toast.success("Login successful! Welcome back!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true, 
            draggable: true,
            theme: "colored",
            style: { background: "#2563eb", color: "#fff" }
          });
          sessionStorage.setItem('last_welcome', Date.now().toString());
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isLoaded, isSignedIn, location.search, navigate]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Unauthorized. Please log in.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-950 dark:text-white">
      <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-md dark:bg-gray-950 dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-neutral-800">My Bookings</h1>
        <p className="text-neutral-600 mb-6">
          Welcome, {user?.firstName || user?.emailAddresses?.[0]?.emailAddress} 👋
        </p>

        {mockBookings.length > 0 ? (
          <ul className="space-y-3">
            {mockBookings.map((booking) => (
              <li key={booking.id} className="border p-4 rounded-lg">
                <p className="font-semibold text-blue-600">{booking.title}</p>
                <p className="text-sm text-neutral-500">Date: {booking.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-500">No bookings found.</p>
        )}

        <SignOutButton
          afterSignOutUrl="/"
        >
          <button 
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            onClick={() => {
              toast.info("👋 You have been logged out successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"
              });
              // Clear any welcome flags
              sessionStorage.removeItem('last_welcome');
            }}
          >
            Log Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default MyBookings;
