import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function BusCard({ isHindi = false }) {
  const location = useLocation();
  const bookingInfo = location.state?.bookingInfo;

  if (!bookingInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">No booking information available.</p>
      </div>
    );
  }

  const {
    busName,
    busNumber,
    from,
    to,
    departureTime,
    passengers,
    baseFare,
    tax,
    totalFare,
    contactInfo,
  } = bookingInfo;

  return (
    <motion.div
      className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-xl border border-gray-200 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      {/* Bus Details */}
      <div className="border-b pb-4 dark:bg-gray-950 dark:text-white">
        <h1 className="text-2xl font-bold text-gray-800">{busName}</h1>
        <p className="text-sm text-gray-600">Bus Number: {busNumber}</p>
        <p className="mt-2 text-gray-700">
          <strong>From:</strong> {from} <span className="mx-2">&rarr;</span> <strong>To:</strong> {to}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Departure Time:</strong> {departureTime}
        </p>
      </div>

      {/* Passenger Details */}
      <div className="my-4 text-black dark:bg-gray-950 dark:text-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Passenger Details</h2>
        {passengers && passengers.length > 0 ? (
          <div className="space-y-2">
            {passengers.map((p, index) => (
              <div key={index} className="p-2 border rounded-md">
                <p className="text-gray-800">
                  <strong>Seat:</strong> {p.seatId}
                </p>
                <p className="text-gray-800">
                  <strong>Name:</strong> {p.name}
                </p>
                <p className="text-gray-800">
                  <strong>Age:</strong> {p.age}
                </p>
                <p className="text-gray-800">
                  <strong>Gender:</strong> {p.gender}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No passengers selected.</p>
        )}
      </div>

      {/* Fare Summary */}
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:bg-gray-950 dark:text-white">Fare Summary</h2>
        <div className="space-y-1">
          <p className="text-gray-800">
            <strong>Base Fare:</strong> ₹{baseFare}
          </p>
          <p className="text-gray-800">
            <strong>Tax (18%):</strong> ₹{tax.toFixed(2)}
          </p>
          <p className="text-gray-800 text-xl font-bold">
            <strong>Total Fare:</strong> ₹{totalFare.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="my-4 border-t pt-4 dark:bg-gray-950 dark:text-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Information</h2>
        <p className="text-gray-800">
          <strong>Phone:</strong> {contactInfo.phone}
        </p>
        <p className="text-gray-800">
          <strong>Email:</strong> {contactInfo.email}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-6 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 bg-blue-600 text-white rounded-full focus:outline-none"
        >
          Confirm Ticket
        </motion.button>
      </div>
    </motion.div>
  );
}

export default BusCard;