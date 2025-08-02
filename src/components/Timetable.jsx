import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Bus,
  MapPin,
  Route,
  Search,
  X,
  ArrowRight,
  Navigation
} from 'lucide-react';

const WeeklyTimetable = () => {
  const [currentDateTime, setCurrentDateTime] = useState('2025-02-13 16:27:11');
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const [fromHighlightIndex, setFromHighlightIndex] = useState(-1);
  const [toHighlightIndex, setToHighlightIndex] = useState(-1);

  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularRoutes, setPopularRoutes] = useState([]);

  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const fromItemRefs = useRef([]);
  const toItemRefs = useRef([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('https://jsonblob.com/api/jsonBlob/1333092652136194048');
        const data = await response.json();
        setScheduleData(data);

        const routes = data.reduce((acc, curr) => {
          const route = `${curr.from} to ${curr.to}`;
          acc[route] = (acc[route] || 0) + 1;
          return acc;
        }, {});
        const topRoutes = Object.entries(routes)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([route]) => route);
        setPopularRoutes(topRoutes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setLoading(false);
      }
    };

    fetchSchedule();

    const timer = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentDateTime(formattedDate);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fromItemRefs.current = fromItemRefs.current.slice(0, fromSuggestions.length);
  }, [fromSuggestions]);

  useEffect(() => {
    toItemRefs.current = toItemRefs.current.slice(0, toSuggestions.length);
  }, [toSuggestions]);

  useEffect(() => {
    if (fromHighlightIndex >= 0 && fromItemRefs.current[fromHighlightIndex]) {
      fromItemRefs.current[fromHighlightIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [fromHighlightIndex]);

  useEffect(() => {
    if (toHighlightIndex >= 0 && toItemRefs.current[toHighlightIndex]) {
      toItemRefs.current[toHighlightIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [toHighlightIndex]);

  const updateSuggestions = (value, type) => {
    if (type === 'from') {
      const suggestions = [
        ...new Set(
          scheduleData
            .filter(schedule => schedule.from.toLowerCase().includes(value.toLowerCase()))
            .map(schedule => schedule.from)
        )
      ];
      setFromSuggestions(suggestions);
    } else {
      const suggestions = [
        ...new Set(
          scheduleData
            .filter(schedule => schedule.to.toLowerCase().includes(value.toLowerCase()))
            .map(schedule => schedule.to)
        )
      ];
      setToSuggestions(suggestions);
    }
  };

  const handleSearch = () => {
    if (searchFrom && searchTo) {
      const filtered = scheduleData.filter(schedule => 
        schedule.from.toLowerCase() === searchFrom.toLowerCase() &&
        schedule.to.toLowerCase() === searchTo.toLowerCase()
      );
      setFilteredSchedules(filtered);

      const newSearch = `${searchFrom} to ${searchTo}`;
      setRecentSearches(prev => [newSearch, ...prev.filter(search => search !== newSearch)].slice(0, 5));
    }
  };

  const handleRouteSelect = (route) => {
    const [from, to] = route.split(' to ');
    setSearchFrom(from);
    setSearchTo(to);
    
    // Trigger search immediately after setting values
    setTimeout(() => {
      if (from && to) {
        const filtered = scheduleData.filter(schedule => 
          schedule.from.toLowerCase() === from.toLowerCase() &&
          schedule.to.toLowerCase() === to.toLowerCase()
        );
        setFilteredSchedules(filtered);

        const newSearch = `${from} to ${to}`;
        setRecentSearches(prev => [newSearch, ...prev.filter(search => search !== newSearch)].slice(0, 5));
      }
    }, 0);
  };

  const handleFromKeyDown = (e) => {
    if (showFromSuggestions && fromSuggestions.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFromHighlightIndex(prev => {
            const nextIndex = prev + 1;
            return nextIndex >= fromSuggestions.slice(0, 10).length ? 0 : nextIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFromHighlightIndex(prev => {
            const nextIndex = prev - 1;
            return nextIndex < 0 ? fromSuggestions.slice(0, 10).length - 1 : nextIndex;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (fromHighlightIndex >= 0) {
            const selected = fromSuggestions.slice(0, 10)[fromHighlightIndex];
            setSearchFrom(selected);
            setShowFromSuggestions(false);
          }
          toInputRef.current.focus();
          break;
        default:
          break;
      }
    } else if (e.key === 'Enter') {
      toInputRef.current.focus();
    }
  };

  const handleToKeyDown = (e) => {
    if (showToSuggestions && toSuggestions.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setToHighlightIndex(prev => {
            const nextIndex = prev + 1;
            return nextIndex >= toSuggestions.slice(0, 10).length ? 0 : nextIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setToHighlightIndex(prev => {
            const nextIndex = prev - 1;
            return nextIndex < 0 ? toSuggestions.slice(0, 10).length - 1 : nextIndex;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (toHighlightIndex >= 0) {
            const selected = toSuggestions.slice(0, 10)[toHighlightIndex];
            setSearchTo(selected);
            setShowToSuggestions(false);
          }
          handleSearch();
          break;
        default:
          break;
      }
    } else if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-700 dark:via-slate-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-900 dark:text-gray-100">BusRoute</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="font-medium dark:text-gray-100">{currentDateTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-neutral-500 dark:via-blue-500 dark:to-indigo-800 bg-clip-text text-transparent mb-4">
            Find Your Bus Route
          </h1>
          <p className="text-xl dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
            Discover the fastest and most convenient bus routes to your destination
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900 p-8 mb-8 border border-gray-100 dark:border-gray-900">
          <div className="max-w-4xl mx-auto">
            {/* Search Inputs */}
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-8">
              {/* From Input */}
              <div className="relative">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    ref={fromInputRef}
                    type="text"
                    placeholder="From"
                    value={searchFrom}
                    onChange={(e) => {
                      setSearchFrom(e.target.value);
                      updateSuggestions(e.target.value, 'from');
                      setShowFromSuggestions(true);
                      setFromHighlightIndex(-1);
                    }}
                    onKeyDown={handleFromKeyDown}
                    className="w-full h-14 pl-12 pr-12 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-lg font-medium placeholder-gray-400"
                  />
                  {searchFrom && (
                    <button
                      onClick={() => {
                        setSearchFrom('');
                        setFromHighlightIndex(-1);
                        setShowFromSuggestions(false);
                      }}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {/* From Suggestions */}
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    {fromSuggestions.slice(0, 10).map((suggestion, index) => (
                      <button
                        key={suggestion}
                        ref={(el) => (fromItemRefs.current[index] = el)}
                        className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors ${
                          index === fromHighlightIndex ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          setSearchFrom(suggestion);
                          setShowFromSuggestions(false);
                          setFromHighlightIndex(-1);
                          toInputRef.current.focus();
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* To Input */}
              <div className="relative">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-indigo-500 group-focus-within:text-indigo-600 transition-colors" />
                  </div>
                  <input
                    ref={toInputRef}
                    type="text"
                    placeholder="To"
                    value={searchTo}
                    onChange={(e) => {
                      setSearchTo(e.target.value);
                      updateSuggestions(e.target.value, 'to');
                      setShowToSuggestions(true);
                      setToHighlightIndex(-1);
                    }}
                    onKeyDown={handleToKeyDown}
                    className="w-full h-14 pl-12 pr-12 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-lg font-medium placeholder-gray-400"
                  />
                  {searchTo && (
                    <button
                      onClick={() => {
                        setSearchTo('');
                        setToHighlightIndex(-1);
                        setShowToSuggestions(false);
                      }}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {/* To Suggestions */}
                {showToSuggestions && toSuggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    {toSuggestions.slice(0, 10).map((suggestion, index) => (
                      <button
                        key={suggestion}
                        ref={(el) => (toItemRefs.current[index] = el)}
                        className={`w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors ${
                          index === toHighlightIndex ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          setSearchTo(suggestion);
                          setShowToSuggestions(false);
                          setToHighlightIndex(-1);
                          handleSearch();
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!searchFrom || !searchTo}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              <Search className="w-5 h-5" />
              Find Buses
            </button>
          </div>
        </div>

        {/* Quick Access */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Popular Routes */}
          {popularRoutes.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-900">
              <h3 className="text-lg font-semibold dark:text-gray-100 text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Popular Routes
              </h3>
              <div className="space-y-2">
                {popularRoutes.map((route, index) => (
                  <button
                    key={index}
                    onClick={() => handleRouteSelect(route)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 text-gray-700 dark:text-gray-100 font-medium"
                  >
                    {route}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentSearches.map((route, index) => (
                  <button
                    key={index}
                    onClick={() => handleRouteSelect(route)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 text-gray-700 font-medium dark:text-gray-100"
                  >
                    {route}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Loading bus schedules...</p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && filteredSchedules.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {searchFrom} → {searchTo}
              </h2>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <Route className="w-4 h-4" />
                  {filteredSchedules[0]?.Total_Distance || 'Distance info'}
                </span>
                <span className="flex items-center gap-2">
                  <Bus className="w-4 h-4" />
                  {filteredSchedules.length} buses available
                </span>
              </div>
            </div>

            {/* Bus Cards */}
            <div className="p-6">
              <div className="grid gap-4">
                {filteredSchedules.map((schedule, index) => (
                  <div 
                    key={index}
                    className="group p-6 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-2">
                            <Bus className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            {schedule.Departure_Time}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-lg text-gray-900">
                              {schedule.Bus_Type}
                            </span>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <span className="text-lg font-bold text-green-600">
                              {schedule.Price}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <Route className="w-4 h-4" />
                            <span className="text-sm">Via: {schedule.Via}</span>
                          </div>
                          {schedule.Contact && (
                            <p className="text-sm text-gray-500">
                              Contact: {schedule.Contact}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold text-sm mb-2">
                          {schedule.Bus_Route}
                        </div>
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyTimetable;