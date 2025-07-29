import React, { useState, useEffect, useRef, useCallback } from "react";
import { Clock, Bus, MapPin, Route, Search, X, ArrowRight, Info, CalendarDays, Wallet } from "lucide-react"; // Added new icons

const WeeklyTimetable = () => {
  // State for current date and time, formatted for display
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling

  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

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
  // Separate refs for suggestion containers to better manage click-outside
  const fromSuggestionsRef = useRef(null);
  const toSuggestionsRef = useRef(null);


  // --- Utility Functions ---

  // Function to format date and time
  const formatDateTime = useCallback(() => {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    setCurrentDateTime(now.toLocaleString('en-US', options));
    setCurrentDay(now.toLocaleString('en-US', { weekday: 'long' }));
  }, []);

  // Filter schedules based on 'from' and 'to' inputs
  const filterScheduleData = useCallback((from, to) => {
    if (!from || !to) {
      setFilteredSchedules([]);
      return;
    }
    const filtered = scheduleData.filter(
      (schedule) =>
        schedule.from.toLowerCase() === from.toLowerCase() &&
        schedule.to.toLowerCase() === to.toLowerCase()
    );
    setFilteredSchedules(filtered);
  }, [scheduleData]); // Dependencies for useCallback

  // --- Effects ---

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          "https://jsonblob.com/api/jsonBlob/1333092652136194048"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setScheduleData(data);

        // Calculate popular routes (can be cached or pre-calculated in a real app)
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
      } catch (e) {
        console.error("Error fetching schedule:", e);
        setError("Failed to load schedule data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
    formatDateTime(); // Initial call

    const timer = setInterval(formatDateTime, 1000); // Update time every second

    // Load recent searches from localStorage on mount
    const storedRecentSearches = localStorage.getItem("recentBusSearches");
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }

    return () => clearInterval(timer); // Cleanup timer
  }, [formatDateTime]); // Dependency for useCallback

  // Update recent searches in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recentBusSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Handle click outside for suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target) &&
          fromSuggestionsRef.current && !fromSuggestionsRef.current.contains(event.target)) {
        setShowFromSuggestions(false);
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target) &&
          toSuggestionsRef.current && !toSuggestionsRef.current.contains(event.target)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to trigger search when both 'from' and 'to' are filled
  // This makes the search more "reactive"
  useEffect(() => {
    if (searchFrom && searchTo) {
      filterScheduleData(searchFrom, searchTo);
    } else {
      setFilteredSchedules([]); // Clear results if inputs are incomplete
    }
  }, [searchFrom, searchTo, filterScheduleData]);


  // --- Event Handlers ---

  const updateSuggestions = (value, type) => {
    const allLocations = [...new Set(scheduleData.map((s) => s.from).concat(scheduleData.map((s) => s.to)))];
    const filtered = allLocations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    if (type === "from") {
      setFromSuggestions(filtered.slice(0, 10)); // Limit suggestions to 10
      setFromHighlightIndex(-1); // Reset highlight
    } else {
      setToSuggestions(filtered.slice(0, 10)); // Limit suggestions to 10
      setToHighlightIndex(-1); // Reset highlight
    }
  };

  const handleSearchClick = () => {
    if (searchFrom && searchTo) {
      filterScheduleData(searchFrom, searchTo);
      const newSearch = `${searchFrom} to ${searchTo}`;
      setRecentSearches((prev) =>
        [newSearch, ...prev.filter((search) => search !== newSearch)].slice(
          0,
          5
        )
      );
      // Ensure suggestions are hidden after explicit search
      setShowFromSuggestions(false);
      setShowToSuggestions(false);
      setFromHighlightIndex(-1);
      setToHighlightIndex(-1);
    }
  };

  const handleRouteSelect = (route) => {
    const [from, to] = route.split(" to ");
    setSearchFrom(from);
    setSearchTo(to);
    // Automatically trigger search
    // filterScheduleData(from, to); // This is now handled by the useEffect above for searchFrom/searchTo
    // Add to recent searches
    setRecentSearches((prev) =>
      [route, ...prev.filter((search) => search !== route)].slice(0, 5)
    );
    // Hide suggestions after selecting a popular/recent route
    setShowFromSuggestions(false);
    setShowToSuggestions(false);
    setFromHighlightIndex(-1);
    setToHighlightIndex(-1);
  };

  const handleClearSearch = () => {
    setSearchFrom("");
    setSearchTo("");
    setFilteredSchedules([]);
    setShowFromSuggestions(false);
    setShowToSuggestions(false);
    setFromHighlightIndex(-1);
    setToHighlightIndex(-1);
    fromInputRef.current.focus(); // Focus on 'From' input after clearing
  };

  const handleSuggestionClick = (suggestion, type) => {
    if (type === "from") {
      setSearchFrom(suggestion);
      setShowFromSuggestions(false);
      setFromHighlightIndex(-1);
      toInputRef.current.focus(); // Move focus to the next input
    } else {
      setSearchTo(suggestion);
      setShowToSuggestions(false);
      setToHighlightIndex(-1);
      // Trigger search after selecting the 'To' location
      // handleSearchClick(); // This is handled by the useEffect for searchFrom/searchTo
    }
  };


  const handleKeyDown = (e, type) => {
    const suggestions = type === "from" ? fromSuggestions : toSuggestions;
    const highlightIndex = type === "from" ? fromHighlightIndex : toHighlightIndex;
    const setHighlightIndex = type === "from" ? setFromHighlightIndex : setToHighlightIndex;
    const setShowSuggestions = type === "from" ? setShowFromSuggestions : setShowToSuggestions;
    const nextInputRef = type === "from" ? toInputRef : null;
    const setInputValue = type === "from" ? setSearchFrom : setSearchTo;

    if (suggestions.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev === suggestions.length - 1 ? 0 : prev + 1
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev === 0 ? suggestions.length - 1 : prev - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightIndex >= 0) {
            setInputValue(suggestions[highlightIndex]); // Update input value
            setShowSuggestions(false);
            setHighlightIndex(-1);
            if (nextInputRef) {
              nextInputRef.current.focus();
            } else {
              handleSearchClick(); // Trigger search if 'To' input
            }
          } else {
            // If no suggestion highlighted, and Enter is pressed, act like normal form submission
            if (type === "to") {
              handleSearchClick();
            } else if (nextInputRef) {
              nextInputRef.current.focus();
            }
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          setHighlightIndex(-1);
          break;
        default:
          break;
      }
    } else if (e.key === "Enter" && type === "to") {
      handleSearchClick();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Header with Time and Date */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center border border-gray-100">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-3 sm:mb-0">
            Bus Timetable
          </h1>
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock size={20} className="text-blue-600" />
            </div>
            <span className="font-medium text-lg">{currentDateTime}</span>
          </div>
        </div>

        {/* Main Content Area: Search Card on left, Results on right */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left Column: Search Card */}
          <div className="w-full lg:w-2/5 xl:w-1/3 flex-shrink-0">
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-center mb-6 text-zinc-900">
                Find Your <span className="text-blue-600">Bus Route</span>
              </h2>

              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 mb-6 relative">
                  {/* From Input */}
                  <div className="relative flex-1">
                    <MapPin
                      size={20}
                      className="absolute left-3 top-4 text-blue-600"
                    />
                    <input
                      ref={fromInputRef}
                      type="text"
                      placeholder="Departure Location"
                      value={searchFrom}
                      onChange={(e) => {
                        setSearchFrom(e.target.value);
                        updateSuggestions(e.target.value, "from");
                        setShowFromSuggestions(true);
                      }}
                      onFocus={() => setShowFromSuggestions(true)}
                      onKeyDown={(e) => handleKeyDown(e, "from")}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
                      aria-label="Departure Location"
                    />
                    {searchFrom && (
                      <button
                        onClick={() => {
                          setSearchFrom("");
                          setShowFromSuggestions(false);
                          setFromHighlightIndex(-1);
                          fromInputRef.current.focus();
                        }}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Clear departure location"
                      >
                        <X size={16} className="absolute  top-2 right-1" />
                      </button>
                    )}
                    {showFromSuggestions && fromSuggestions.length > 0 && (
                      <div ref={fromSuggestionsRef} className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-48 overflow-y-auto custom-scrollbar">
                        {fromSuggestions.map((suggestion, index) => (
                          <button
                            key={`from-${suggestion}`}
                            className={`w-full px-4 py-3 text-left hover:bg-blue-50 text-gray-800 ${ // Changed text color to gray-800
                              index === fromHighlightIndex
                                ? "bg-blue-100 text-blue-800" // Highlighted state
                                : ""
                            } ${index === 0 ? "rounded-t-xl" : ""} ${
                              index === fromSuggestions.length - 1
                                ? "rounded-b-xl"
                                : ""
                            }`}
                            onMouseDown={(e) => { // Use onMouseDown to prevent blur
                              e.preventDefault(); // Prevent input from losing focus immediately
                              handleSuggestionClick(suggestion, "from");
                            }}
                            onMouseEnter={() => setFromHighlightIndex(index)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight size={24} className="text-blue-600" />
                  </div>

                  {/* To Input */}
                  <div className="relative flex-1">
                    <MapPin
                      size={20}
                      className="absolute left-3 top-4 text-blue-600"
                    />
                    <input
                      ref={toInputRef}
                      type="text"
                      placeholder="Arrival Location"
                      value={searchTo}
                      onChange={(e) => {
                        setSearchTo(e.target.value);
                        updateSuggestions(e.target.value, "to");
                        setShowToSuggestions(true);
                      }}
                      onFocus={() => setShowToSuggestions(true)}
                      onKeyDown={(e) => handleKeyDown(e, "to")}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
                      aria-label="Arrival Location"
                    />
                    {searchTo && (
                      <button
                        onClick={() => {
                          setSearchTo("");
                          setShowToSuggestions(false);
                          setToHighlightIndex(-1);
                        }}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Clear arrival location"
                      >
                        <X size={16} className="absolute  top-2 right-1" /> 
                      </button>
                    )}
                    {showToSuggestions && toSuggestions.length > 0 && (
                      <div ref={toSuggestionsRef} className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-48 overflow-y-auto custom-scrollbar">
                        {toSuggestions.map((suggestion, index) => (
                          <button
                            key={`to-${suggestion}`}
                            className={`w-full px-4 py-3 text-left hover:bg-blue-50 text-gray-800 ${ // Changed text color to gray-800
                              index === toHighlightIndex ? "bg-blue-100 text-blue-800" : ""
                            } ${index === 0 ? "rounded-t-xl" : ""} ${
                              index === toSuggestions.length - 1
                                ? "rounded-b-xl"
                                : ""
                            }`}
                            onMouseDown={(e) => { // Use onMouseDown to prevent blur
                              e.preventDefault(); // Prevent input from losing focus immediately
                              handleSuggestionClick(suggestion, "to");
                            }}
                            onMouseEnter={() => setToHighlightIndex(index)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSearchClick}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!searchFrom || !searchTo} // Disable if inputs are empty
                    aria-label="Find Buses"
                  >
                    <Search size={20} className="mt-[1px]" />
                    <span>Find Buses</span>
                  </button>
                  {(searchFrom || searchTo) && (
                    <button
                      onClick={handleClearSearch}
                      className="bg-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 font-semibold shadow-sm"
                      aria-label="Clear Search"
                    >
                      <X size={20} />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  )}
                </div>

                {/* Quick Links */}
                <div className="mt-8 max-h-[20rem] overflow-y-auto pr-2 custom-scrollbar">
                  {popularRoutes.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                        <Info size={16} /> Popular Routes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularRoutes.map((route) => (
                          <button
                            key={route}
                            onClick={() => handleRouteSelect(route)}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium whitespace-nowrap"
                          >
                            {route}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                        <Clock size={16} /> Recent Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((route) => (
                          <button
                            key={route}
                            onClick={() => handleRouteSelect(route)}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap"
                          >
                            {route}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results Section */}
          <div className="w-full lg:w-3/5 xl:w-2/3 min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-64 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-lg text-gray-700">Loading schedules...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center h-64 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 text-center text-red-600 border border-red-200">
                <Info size={40} className="mb-4" />
                <p className="text-lg font-medium">{error}</p>
                <p className="text-sm text-gray-500 mt-2">Please check your internet connection or try again later.</p>
              </div>
            ) : filteredSchedules.length > 0 ? (
              <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="mb-6 border-b pb-4 border-gray-200">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Bus Schedules
                  </h2>
                  <p className="text-gray-600 text-lg">
                    <span className="font-semibold text-blue-700">{searchFrom}</span> to <span className="font-semibold text-blue-700">{searchTo}</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    <CalendarDays size={16} className="inline-block mr-1" /> Today, {currentDay} • {filteredSchedules[0].Total_Distance} • {filteredSchedules.length} buses available
                  </p>
                </div>

                {/* Bus Cards Grid */}
                <div className="grid gap-4 max-h-[26rem] pr-2 overflow-y-auto custom-scrollbar">
                  {filteredSchedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200 flex flex-col md:flex-row justify-between items-start md:items-center"
                    >
                      <div className="flex-1 mb-4 md:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-blue-50 p-3 rounded-xl">
                            <Bus size={24} className="text-blue-600" />
                          </div>
                          <div>
                            <span className="font-extrabold text-2xl text-zinc-800 block">
                              {schedule.Departure_Time}
                            </span>
                            <span className="text-sm text-gray-500">Departure</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          <span className="font-semibold text-base">
                            {schedule.Bus_Type}
                          </span>
                          <span>•</span>
                          <span className="text-green-600 font-bold text-lg flex items-center gap-1">
                            <Wallet size={18} /> {schedule.Price}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                          <Route size={16} className="mt-1 flex-shrink-0 text-indigo-500" />
                          <span>Via: {schedule.Via}</span>
                        </div>
                      </div>
                      <div className="text-left md:text-right flex flex-col items-start md:items-end">
                        <div className="text-blue-700 font-bold text-lg mb-1">
                          Route: {schedule.Bus_Route}
                        </div>
                        {schedule.Contact && (
                          <div className="text-sm text-gray-600">
                            Contact: <a href={`tel:${schedule.Contact}`} className="text-blue-500 hover:underline">{schedule.Contact}</a>
                          </div>
                        )}
                        <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md flex items-center gap-2">
                          View Details <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 text-center text-gray-500 border border-gray-100">
                <Bus size={60} className="mx-auto mb-4 text-blue-400" />
                <p className="text-xl font-semibold mb-2">
                  No direct buses found for this route.
                </p>
                <p className="text-base text-gray-600">
                  Try adjusting your search or explore nearby locations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimetable;