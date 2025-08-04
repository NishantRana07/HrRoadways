// pages/MyBookings.js
import React from "react";
import { useAuthStore } from "../store/store"; // use correct path

const mockBookings = [
  { id: 1, title: "Trip to Manali", date: "2025-08-10" },
  { id: 2, title: "Goa Beach Holiday", date: "2025-09-02" },
];

const MyBookings = () => {
  const { user, logout } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Unauthorized. Please log in.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-neutral-800">My Bookings</h1>
        <p className="text-neutral-600 mb-6">Welcome, {user.name} 👋</p>

        {/* Display your bookings below: */}

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

        <button
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default MyBookings;
