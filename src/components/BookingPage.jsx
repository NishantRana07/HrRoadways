import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaRupeeSign, 
  FaPhone, 
  FaEnvelope 
} from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// Helper function to parse seat cost from a string formatted as "₹NNN/-"
const parseSeatCost = (priceStr) => {
  if (!priceStr) return 900; // fallback value
  const numericPart = priceStr.replace(/[^\d]/g, '');
  return Number(numericPart) || 900;
};

// Component to render an individual seat button with modern hover and splash effects
const SeatButton = ({ seat, isSelected, onClick }) => {
  let bgColor = '';
  let borderColor = '';
  if (seat.status === 'available') {
    bgColor = isSelected ? 'bg-green-500 text-white' : 'bg-white text-black';
    borderColor = isSelected ? 'border-green-500' : 'border-gray-300';
  } else if (seat.status === 'taken') {
    bgColor = 'bg-red-500 text-white';
    borderColor = 'border-red-500';
  } else if (seat.status === 'female') {
    bgColor = 'bg-purple-500 text-white';
    borderColor = 'border-purple-500';
  }
  return (
    <button 
      onClick={onClick}
      disabled={seat.status !== 'available'}
      className={`w-12 h-12 flex items-center justify-center rounded-md border-2 ${bgColor} ${borderColor} transition-transform transform hover:scale-110 hover:shadow-xl duration-200`}
    >
      {seat.id}
    </button>
  );
};

// FareSummary component with subtle hover effects and modern design
const FareSummary = ({ selectedSeats, seatCost }) => {
  const baseFare = selectedSeats.length * seatCost;
  const tax = baseFare * 0.18;
  const totalFare = baseFare + tax;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-950 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Fare Summary</h2>
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Base Fare ({selectedSeats.length} seats)</span>
          <span>₹{baseFare}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (18%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-semibold text-blue-600 pt-3 border-t border-gray-200">
          <span>Total Amount</span>
          <span>₹{totalFare.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

const BookingPage = ({ selectedBus }) => {
  const navigate = useNavigate();
  // States to keep track of seats, selected seats and other details
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [contactInfo, setContactInfo] = useState({ phone: '', email: '' });
  const [errors, setErrors] = useState({});

  // Initialize 60 seats on mount
  useEffect(() => {
    const initSeats = () => {
      const seatState = [];
      for (let i = 1; i <= 60; i++) {
        const hash = Math.abs(Math.sin(i * 9999) * 10000);
        const isTaken = hash % 100 < 30;
        const isFemale = hash % 100 >= 30 && hash % 100 < 50;
        seatState.push({ id: i, status: isTaken ? 'taken' : isFemale ? 'female' : 'available' });
      }
      setSeats(seatState);
    };
    initSeats();
  }, []);

  // Group seats into 6 blocks of 10 seats for layout (with an alley row in the UI)
  const getSeatBlocks = () => {
    const blocks = [];
    for (let b = 0; b < 6; b++) {
      const blockStart = b * 10;
      const blockSeats = seats.slice(blockStart, blockStart + 10);
      blocks.push(blockSeats);
    }
    return blocks;
  };

  const seatBlocks = getSeatBlocks();

  // Toggle seat selection and update passenger details accordingly
  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status !== 'available') return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) return prev.filter((id) => id !== seatId);
      return [...prev, seatId].sort((a, b) => a - b);
    });

    setPassengerDetails((prev) => {
      if (prev.find((p) => p.seatId === seatId)) {
        return prev.filter((p) => p.seatId !== seatId);
      }
      return [...prev, { seatId, name: '', age: '', gender: 'male' }];
    });
  };

  // Handler for updating passenger details
  const handlePassengerChange = (seatId, field, value) => {
    setPassengerDetails(
      passengerDetails.map((detail) =>
        detail.seatId === seatId ? { ...detail, [field]: value } : detail
      )
    );
  };

  // Handler for updating contact info
  const handleContactChange = (field, value) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Basic validation for the form
  const validateForm = () => {
    const newErrors = {};
    passengerDetails.forEach((passenger) => {
      if (!passenger.name) newErrors[`name-${passenger.seatId}`] = 'Name is required';
      if (!passenger.age) {
        newErrors[`age-${passenger.seatId}`] = 'Age is required';
      } else if (passenger.age < 1 || passenger.age > 120) {
        newErrors[`age-${passenger.seatId}`] = 'Enter a valid age';
      }
    });
    if (!contactInfo.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(contactInfo.phone)) {
      newErrors.phone = 'Enter a valid 10-digit number';
    }
    if (!contactInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
      newErrors.email = 'Enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to the BusCard page (ticket display) using the "/card" route
  const handleProceed = () => {
    // Check if at least one seat is selected, and associated passenger details exist.
    if (selectedSeats.length === 0 || passengerDetails.length === 0) {
      alert("Please select at least one seat and enter passenger details.");
      return;
    }
    if (validateForm()) {
      const seatCost = selectedBus?.Price ? parseSeatCost(selectedBus.Price) : 900;
      const baseFare = selectedSeats.length * seatCost;
      const tax = baseFare * 0.18;
      const totalFare = baseFare + tax;
      const bookingInfo = {
        busName: selectedBus?.from && selectedBus?.to ? `${selectedBus.from} → ${selectedBus.to}` : "Haryana Roadways Express",
        busNumber: selectedBus?.busNumber || "HR-1234",
        from: selectedBus?.from || 'Chandigarh',
        to: selectedBus?.to || 'Lucknow',
        departureTime: selectedBus?.Departure_Time || '12:00 PM',
        passengers: passengerDetails,
        baseFare: baseFare,
        tax: tax,
        totalFare: totalFare,
        contactInfo: contactInfo
      };
      navigate("/card", { state: { bookingInfo } });
    }
  };

  // Extract seat cost from selectedBus.Price which is in the format "₹NNN/-"
  const seatCost = selectedBus?.Price ? parseSeatCost(selectedBus.Price) : 900;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6 w-full">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Haryana Roadways</h1>
        <div className="flex justify-center items-center space-x-6 text-lg">
          <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-300">
            <FaMapMarkerAlt className="text-gray-600" />
            <span>{selectedBus?.from || 'Chandigarh'} → {selectedBus?.to || 'Lucknow'}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-300">
            <FaClock className="text-gray-600" />
            <span>{selectedBus?.Departure_Time || '12:00 PM'}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-300">
            <FaRupeeSign className="text-gray-600" />
            <span>{selectedBus?.Price ? selectedBus.Price : '₹900/-'}</span>
          </div>
        </div>
      </header>
      <main className="m-2 lg:flex lg:justify-around">
        <section>
          {/* Seat Layout */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Seat Layout</h2>
            <div className="flex justify-center space-x-4 bg-white rounded-xl p-2 md:p-6 shadow-lg">
              {seatBlocks.map((block, bIdx) => (
                <div key={bIdx} className="flex flex-col space-y-4">
                  {Array.from({ length: 6 }).map((_, rowIdx) => {
                    if (rowIdx === 2) {
                      return (
                        <div key={rowIdx} className="flex items-center justify-center h-8">
                          <span className="text-sm text-gray-500 italic">alley</span>
                        </div>
                      );
                    }
                    const k = rowIdx < 2 ? rowIdx : rowIdx - 1;
                    const leftSeat = block[k];
                    const rightSeat = block[k + 5];
                    return (
                      <div key={rowIdx} className="flex space-x-4">
                        {leftSeat && (
                          <SeatButton 
                            seat={leftSeat} 
                            isSelected={selectedSeats.includes(leftSeat.id)}
                            onClick={() => handleSeatClick(leftSeat.id)}
                          />
                        )}
                        {rightSeat && (
                          <SeatButton 
                            seat={rightSeat} 
                            isSelected={selectedSeats.includes(rightSeat.id)}
                            onClick={() => handleSeatClick(rightSeat.id)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>

          {/* Passenger Details */}
          {selectedSeats.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">Passenger Details</h2>
              <div className="space-y-6">
                {passengerDetails.map((passenger) => (
                  <div key={passenger.seatId} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Seat {passenger.seatId}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input 
                        type="text"
                        placeholder="Name"
                        value={passenger.name}
                        onChange={e => handlePassengerChange(passenger.seatId, 'name', e.target.value)}
                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                      />
                      <input 
                        type="number"
                        placeholder="Age"
                        value={passenger.age}
                        onChange={e => handlePassengerChange(passenger.seatId, 'age', e.target.value)}
                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                      />
                      <select
                        value={passenger.gender}
                        onChange={e => handlePassengerChange(passenger.seatId, 'gender', e.target.value)}
                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-700"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {errors[`name-${passenger.seatId}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`name-${passenger.seatId}`]}</p>
                    )}
                    {errors[`age-${passenger.seatId}`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`age-${passenger.seatId}`]}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Contact Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={contactInfo.phone}
                  onChange={e => handleContactChange('phone', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  value={contactInfo.email}
                  onChange={e => handleContactChange('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </section>
        </section>
        {/* Fare Summary and Proceed Button */}
        <section className="mb-8 xl:w-80">
          <FareSummary selectedSeats={selectedSeats} seatCost={seatCost} />
          <div className="mt-6">
            <button 
              onClick={handleProceed}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-800 transform hover:scale-105 transition duration-300 shadow-md"
            >
              Proceed with Booking
            </button>
          </div>
        </section>
      </main>
    </div>
);
}
export default BookingPage;