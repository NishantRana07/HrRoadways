// src/components/Available.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, ArrowLeft, Users, Navigation, Loader2 } from "lucide-react";
import { useBusContext } from '../contexts/BusContext';
import '../styles/Available.css';

const Available = () => {
  const navigate = useNavigate();
  const { buses, searchParams, isLoading } = useBusContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="main dark:bg-gray-950 dark:text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <h3 className="text-xl font-semibold">Searching for buses...</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait while we find the best options for you.</p>
        </div>
      </div>
    );
  }

  if (!buses || buses.length === 0) {
    return (
      <div className="main dark:bg-gray-950 dark:text-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <button 
            onClick={() => navigate('/')}
            className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Search
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">No Buses Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchParams 
                ? `No buses available from ${searchParams.from} to ${searchParams.to} on ${searchParams.date}`
                : 'Please search for buses first'
              }
            </p>
            
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Search Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBookNow = (bus) => {
    navigate(`/booking`, { 
      state: { 
        bus,
        searchParams 
      } 
    });
  };

  return (
    <div className="main dark:bg-gray-950 dark:text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back button and header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Search
          </button>
          
          <div className="heading mb-6">
            <h1 className="text-3xl font-bold">
              Available Buses from <span className="text-blue-600">{searchParams?.from}</span> to <span className="text-blue-600">{searchParams?.to}</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                Date: {searchParams?.date}
              </div>
              <div className="flex items-center">
                <Users size={18} className="mr-2" />
                Passengers: {searchParams?.passengers}
              </div>
              {searchParams?.roundTrip && (
                <div className="flex items-center text-green-600">
                  <Navigation size={18} className="mr-2" />
                  Round Trip
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bus count */}
        <div className="mb-6">
          <p className="text-lg">
            Found <span className="font-bold text-blue-600">{buses.length}</span> bus{buses.length !== 1 ? 'es' : ''} available
          </p>
        </div>

        {/* Bus cards */}
        <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((bus) => (
            <div 
              key={bus.id} 
              className="bus-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Bus header with type and price */}
              <div className="bus-header p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bus-type-icon mr-3 p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Clock className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{bus.Bus_Type}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Operated by Haryana Roadways</p>
                  </div>
                </div>
                <div className="bus-price text-right">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {bus.Price.includes("₹") ? bus.Price : `₹${bus.Price}`}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {bus.Total_Distance.includes("KM") ? bus.Total_Distance : `${bus.Total_Distance} KM`}
                  </div>
                </div>
              </div>

              {/* Bus details */}
              <div className="bus-details p-4">
                <div className="space-y-3">
                  {/* Route */}
                  <div className="route-info">
                    <div className="flex items-center mb-2">
                      <MapPin className="text-red-500 mr-2" size={18} />
                      <span className="font-medium">Route</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{bus.from}</p>
                        <p className="text-sm text-gray-500">Departure</p>
                      </div>
                      <div className="mx-4 text-gray-400">→</div>
                      <div className="text-right">
                        <p className="font-semibold">{bus.to}</p>
                        <p className="text-sm text-gray-500">Destination</p>
                      </div>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="timing-info">
                    <div className="flex items-center mb-2">
                      <Clock className="text-blue-500 mr-2" size={18} />
                      <span className="font-medium">Timing</span>
                    </div>
                    <p className="font-semibold">{bus.Departure_Time}</p>
                    <p className="text-sm text-gray-500">Departure Time</p>
                  </div>

                  {/* Via */}
                  {bus.Via && bus.Via !== 'Direct' && (
                    <div className="via-info">
                      <div className="flex items-center mb-2">
                        <Navigation className="text-purple-500 mr-2" size={18} />
                        <span className="font-medium">Via</span>
                      </div>
                      <p className="font-semibold">{bus.Via}</p>
                      <p className="text-sm text-gray-500">Stoppages</p>
                    </div>
                  )}

                  {/* Additional info if available */}
                  {bus.Available_Seats && (
                    <div className="seats-info">
                      <div className="flex items-center mb-2">
                        <Users className="text-green-500 mr-2" size={18} />
                        <span className="font-medium">Seats Available</span>
                      </div>
                      <p className="font-semibold">{bus.Available_Seats}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action button */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => handleBookNow(bus)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Available;