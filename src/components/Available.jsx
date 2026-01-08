// src/components/Available.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, ArrowLeft, Users, Navigation, AlertCircle, RefreshCw, Search, Calendar, Filter, ChevronRight, HelpCircle, Phone } from 'lucide-react';
import { useBusContext } from '../contexts/BusContext';
import { useLanguage } from '../contexts/LanguageContext';

const Available = () => {
  const navigate = useNavigate();
  const { buses, searchParams, isLoading, clearSearch } = useBusContext();
  const { currentLanguage } = useLanguage();
  
  // For showing suggestions after a delay
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Show suggestions after 2 seconds if no buses
    if (!isLoading && (!buses || buses.length === 0)) {
      const timer = setTimeout(() => {
        setShowSuggestions(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowSuggestions(false);
    }
  }, [buses, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-6"></div>
          <h3 className="text-2xl font-semibold mb-3">Searching for Buses...</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Finding the best bus options for your journey from {searchParams?.from} to {searchParams?.to}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced "No Results Found" state
  if (!buses || buses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Back button */}
          <button 
            onClick={() => navigate('/')}
            className="mb-8 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Search
          </button>
          
          {/* Main content */}
          <div className="max-w-4xl mx-auto">
            {/* No results message */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-28 h-28 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle className="text-red-600 dark:text-red-400" size={60} />
                </div>
                
                <h1 className="text-4xl font-bold mb-4">
                  {currentLanguage.available?.noResultsTitle || 'No Buses Found'}
                </h1>
                
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
                  {currentLanguage.available?.noResultsMessage || `We couldn't find any buses traveling from ${searchParams?.from || 'your source'} to ${searchParams?.to || 'your destination'} on ${searchParams?.date || 'the selected date'}.`}
                </p>
                
                {/* Search details card */}
                <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <Search className="mr-2" size={20} />
                    {currentLanguage.available?.searchSummary || 'Your Search Details'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-2">
                        <MapPin className="text-blue-500 mr-2" size={18} />
                        <span className="font-medium text-gray-600 dark:text-gray-400">From</span>
                      </div>
                      <p className="text-lg font-semibold">{searchParams?.from || 'Not specified'}</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-2">
                        <MapPin className="text-green-500 mr-2" size={18} />
                        <span className="font-medium text-gray-600 dark:text-gray-400">To</span>
                      </div>
                      <p className="text-lg font-semibold">{searchParams?.to || 'Not specified'}</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-2">
                        <Calendar className="text-purple-500 mr-2" size={18} />
                        <span className="font-medium text-gray-600 dark:text-gray-400">Date</span>
                      </div>
                      <p className="text-lg font-semibold">{searchParams?.date || 'Not specified'}</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-2">
                        <Users className="text-orange-500 mr-2" size={18} />
                        <span className="font-medium text-gray-600 dark:text-gray-400">Passengers</span>
                      </div>
                      <p className="text-lg font-semibold">{searchParams?.passengers || 1}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestions section - appears after delay */}
              {showSuggestions && (
                <div 
                  className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-8"
                  style={{ animation: 'fadeIn 0.5s ease-out forwards' }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-blue-800 dark:text-blue-300 flex items-center">
                    <Filter className="mr-3" size={24} />
                    {currentLanguage.available?.suggestionsTitle || 'Try These Suggestions:'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                          <Search className="text-blue-600 dark:text-blue-400" size={24} />
                        </div>
                        <h4 className="font-semibold text-lg">
                          {currentLanguage.available?.suggestion1Title || 'Check Nearby Cities'}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {currentLanguage.available?.suggestion1Desc || 'Try searching from/to nearby cities or major transportation hubs for better connectivity.'}
                      </p>
                      <button 
                        onClick={() => navigate('/plan-journey')}
                        className="text-blue-600 dark:text-blue-400 font-medium flex items-center hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        Explore Routes
                        <ChevronRight className="ml-1" size={16} />
                      </button>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                          <Calendar className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                        <h4 className="font-semibold text-lg">
                          {currentLanguage.available?.suggestion2Title || 'Adjust Travel Date'}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {currentLanguage.available?.suggestion2Desc || 'Try a different date. Buses might be available tomorrow or on weekends.'}
                      </p>
                      <button 
                        onClick={() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          navigate('/', { 
                            state: { 
                              autoSearch: {
                                ...searchParams,
                                date: tomorrow.toISOString().split('T')[0]
                              }
                            } 
                          });
                        }}
                        className="text-green-600 dark:text-green-400 font-medium flex items-center hover:text-green-800 dark:hover:text-green-300"
                      >
                        Try Tomorrow
                        <ChevronRight className="ml-1" size={16} />
                      </button>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                          <Navigation className="text-purple-600 dark:text-purple-400" size={24} />
                        </div>
                        <h4 className="font-semibold text-lg">
                          {currentLanguage.available?.suggestion3Title || 'Alternative Routes'}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {currentLanguage.available?.suggestion3Desc || 'Consider alternative routes with transfers or different modes of transportation.'}
                      </p>
                      <button 
                        onClick={() => navigate('/travel-packages')}
                        className="text-purple-600 dark:text-purple-400 font-medium flex items-center hover:text-purple-800 dark:hover:text-purple-300"
                      >
                        View Options
                        <ChevronRight className="ml-1" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={() => {
                    clearSearch?.();
                    navigate('/');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <Search className="mr-3" size={22} />
                  {currentLanguage.available?.searchAgain || 'Search Again'}
                </button>
                
                <button 
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const tomorrowStr = tomorrow.toISOString().split('T')[0];
                    
                    navigate('/', { 
                      state: { 
                        autoSearch: {
                          ...searchParams,
                          date: tomorrowStr
                        }
                      } 
                    });
                  }}
                  className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <RefreshCw className="mr-3" size={22} />
                  {currentLanguage.available?.tryTomorrow || 'Try Tomorrow'}
                </button>
              </div>

              {/* Popular routes section */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                  <Navigation className="mr-3 text-blue-600" size={24} />
                  {currentLanguage.available?.popularRoutes || 'Popular Routes from Haryana:'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { from: 'Chandigarh', to: 'Delhi', frequency: 'Every 30 mins', duration: '4h 30m', price: '₹450' },
                    { from: 'Ambala', to: 'Hisar', frequency: 'Hourly', duration: '3h 15m', price: '₹350' },
                    { from: 'Gurugram', to: 'Chandigarh', frequency: 'Every hour', duration: '3h', price: '₹400' },
                    { from: 'Rohtak', to: 'Delhi', frequency: 'Every 45 mins', duration: '2h 30m', price: '₹280' },
                  ].map((route, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        navigate('/', { 
                          state: { 
                            autoSearch: {
                              from: route.from,
                              to: route.to,
                              date: searchParams?.date || new Date().toISOString().split('T')[0],
                              passengers: searchParams?.passengers || 1
                            }
                          } 
                        });
                      }}
                      className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition-all duration-300 text-left border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {route.from} → {route.to}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{route.frequency}</p>
                        </div>
                        <Navigation className="text-blue-500 group-hover:translate-x-1 transition-transform" size={20} />
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{route.duration}</span>
                        <span className="font-bold text-green-600 dark:text-green-400">{route.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                        Click to search this route
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Help section */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center">
                    <HelpCircle className="text-blue-600 mr-3" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {currentLanguage.available?.needHelp || 'Need help finding a bus?'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {currentLanguage.available?.contactSupportDesc || 'Our customer support team is available 24/7'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate('/contact')}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                      {currentLanguage.available?.contactSupport || 'Contact Support'}
                    </button>
                    <button 
                      onClick={() => navigate('/helpline')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                    >
                      <Phone className="mr-2" size={18} />
                      {currentLanguage.available?.helpline || 'Call Helpline'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header section */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => navigate('/')}
            className="mb-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2" size={20} />
            {currentLanguage.available?.backToSearch || 'Back to Search'}
          </button>
          
          <div className="mb-2">
            <h1 className="text-3xl font-bold mb-2">
              {currentLanguage.available?.availableBuses || 'Available Buses'} from 
              <span className="text-blue-600 dark:text-blue-400 mx-2">{searchParams?.from}</span> 
              to 
              <span className="text-blue-600 dark:text-blue-400 mx-2">{searchParams?.to}</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {currentLanguage.available?.subtitle || 'Select your preferred bus and continue to booking'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Calendar className="text-blue-500 mr-3" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{currentLanguage.available?.date || 'Date'}</p>
                <p className="font-semibold">{searchParams?.date}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="text-green-500 mr-3" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{currentLanguage.available?.passengers || 'Passengers'}</p>
                <p className="font-semibold">{searchParams?.passengers}</p>
              </div>
            </div>
            {searchParams?.roundTrip && (
              <div className="flex items-center">
                <Navigation className="text-purple-500 mr-3" size={20} />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{currentLanguage.available?.roundTrip || 'Trip Type'}</p>
                  <p className="font-semibold text-green-600 dark:text-green-400">{currentLanguage.available?.roundTrip || 'Round Trip'}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bus count */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <p className="text-lg font-semibold">
                {currentLanguage.available?.found || 'Found'} 
                <span className="text-blue-600 dark:text-blue-400 mx-1 font-bold text-2xl">{buses.length}</span> 
                {currentLanguage.available?.busPlural || ' bus'}{buses.length !== 1 ? 'es' : ''} 
                {currentLanguage.available?.available || ' available'}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {currentLanguage.available?.sortedBy || 'Sorted by: Departure Time'}
              </p>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <Clock className="text-gray-500 mr-2" size={18} />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentLanguage.available?.lastUpdated || 'Updated just now'}
              </span>
            </div>
          </div>
        </div>

        {/* Bus cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {buses.map((bus) => (
            <div 
              key={bus.id} 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1"
            >
              {/* Bus header */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="text-blue-600 dark:text-blue-400" size={26} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{bus.Bus_Type}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {currentLanguage.available?.operatedBy || 'Operated by'} Haryana Roadways
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {bus.Price.includes("₹") ? bus.Price : `₹${bus.Price}`}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {bus.Total_Distance.includes("KM") ? bus.Total_Distance : `${bus.Total_Distance} KM`}
                  </div>
                </div>
              </div>

              {/* Bus details */}
              <div className="p-5">
                <div className="space-y-5">
                  {/* Route */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                    <div className="flex items-center mb-3">
                      <MapPin className="text-red-500 mr-2" size={20} />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {currentLanguage.available?.route || 'Route'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="font-bold text-lg">{bus.from}</p>
                        <p className="text-sm text-gray-500">
                          {currentLanguage.available?.departure || 'Departure'}
                        </p>
                      </div>
                      <div className="mx-4 text-gray-400">
                        <Navigation className="text-blue-500" size={24} />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-lg">{bus.to}</p>
                        <p className="text-sm text-gray-500">
                          {currentLanguage.available?.destination || 'Destination'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                    <div className="flex items-center mb-3">
                      <Clock className="text-blue-500 mr-2" size={20} />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {currentLanguage.available?.timing || 'Timing'}
                      </span>
                    </div>
                    <p className="font-bold text-2xl text-center">{bus.Departure_Time}</p>
                    <p className="text-sm text-gray-500 text-center">
                      {currentLanguage.available?.departureTime || 'Departure Time'}
                    </p>
                  </div>

                  {/* Via */}
                  {bus.Via && bus.Via !== 'Direct' && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                      <div className="flex items-center mb-3">
                        <Navigation className="text-purple-500 mr-2" size={20} />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {currentLanguage.available?.via || 'Via'}
                        </span>
                      </div>
                      <p className="font-semibold text-center">{bus.Via}</p>
                      <p className="text-sm text-gray-500 text-center">
                        {currentLanguage.available?.stoppages || 'Stoppages'}
                      </p>
                    </div>
                  )}

                  {/* Available seats */}
                  {bus.Available_Seats && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Users className="text-green-500 mr-2" size={20} />
                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                            {currentLanguage.available?.seatsAvailable || 'Seats Available'}
                          </span>
                        </div>
                        <span className="font-bold text-lg">{bus.Available_Seats}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            bus.Available_Seats > 40 ? 'bg-green-500' :
                            bus.Available_Seats > 20 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(100, (bus.Available_Seats / 60) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0</span>
                        <span>30</span>
                        <span>60</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action button */}
              <div className="p-5 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => handleBookNow(bus)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center text-lg"
                >
                  <span>{currentLanguage.available?.bookNow || 'Book Now'}</span>
                  <ChevronRight className="ml-2" size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom help section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              {currentLanguage.available?.needAssistance || 'Need Assistance?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {currentLanguage.available?.assistanceDesc || 'Our team is here to help you with your booking or any questions you may have about your journey.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-4">
                <Phone className="text-blue-600 dark:text-blue-400 mr-3" size={24} />
                <h4 className="font-semibold text-lg">{currentLanguage.available?.helpline || '24/7 Helpline'}</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {currentLanguage.available?.helplineDesc || 'Call us anytime for immediate assistance with bookings or travel queries.'}
              </p>
              <p className="font-bold text-xl text-blue-600 dark:text-blue-400">1800-XXX-XXXX</p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center mb-4">
                <HelpCircle className="text-green-600 dark:text-green-400 mr-3" size={24} />
                <h4 className="font-semibold text-lg">{currentLanguage.available?.faq || 'FAQs'}</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {currentLanguage.available?.faqDesc || 'Find quick answers to common questions about bookings, cancellations, and travel policies.'}
              </p>
              <button 
                onClick={() => navigate('/faq')}
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-800 dark:hover:text-green-300"
              >
                Browse FAQs →
              </button>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="flex items-center mb-4">
                <Calendar className="text-purple-600 dark:text-purple-400 mr-3" size={24} />
                <h4 className="font-semibold text-lg">{currentLanguage.available?.planJourney || 'Plan Journey'}</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {currentLanguage.available?.planJourneyDesc || 'Need help planning your entire journey? Our travel experts can assist you.'}
              </p>
              <button 
                onClick={() => navigate('/plan-journey')}
                className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800 dark:hover:text-purple-300"
              >
                Plan Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Available;