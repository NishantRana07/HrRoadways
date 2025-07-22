import { useState, useEffect, useRef } from "react";
import { Clock, Bus, MapPin, Route, Search, X, ArrowRight } from "lucide-react";
import { busStandURL } from "../constants";

const WeeklyTimetable = () => {
  const [currentDateTime, setCurrentDateTime] = useState("2025-02-13 16:27:11");
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fromItemRefs = useRef([]);
  const toItemRefs = useRef([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(busStandURL);
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
        console.error("Error fetching schedule:", error);
        setLoading(false);
      }
    };

    fetchSchedule();

    const timer = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
      setCurrentDateTime(formattedDate);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fromItemRefs.current = fromItemRefs.current.slice(
      0,
      fromSuggestions.length
    );
  }, [fromSuggestions]);

  useEffect(() => {
    toItemRefs.current = toItemRefs.current.slice(0, toSuggestions.length);
  }, [toSuggestions]);

  useEffect(() => {
    if (fromHighlightIndex >= 0 && fromItemRefs.current[fromHighlightIndex]) {
      fromItemRefs.current[fromHighlightIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [fromHighlightIndex]);

  useEffect(() => {
    if (toHighlightIndex >= 0 && toItemRefs.current[toHighlightIndex]) {
      toItemRefs.current[toHighlightIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [toHighlightIndex]);

  const updateSuggestions = (value, type) => {
    if (type === "from") {
      const suggestions = [
        ...new Set(
          scheduleData
            .filter((schedule) =>
              schedule.from.toLowerCase().includes(value.toLowerCase())
            )
            .map((schedule) => schedule.from)
        ),
      ];
      setFromSuggestions(suggestions);
    } else {
      const suggestions = [
        ...new Set(
          scheduleData
            .filter((schedule) =>
              schedule.to.toLowerCase().includes(value.toLowerCase())
            )
            .map((schedule) => schedule.to)
        ),
      ];
      setToSuggestions(suggestions);
    }
  };

  const handleSearch = () => {
    if (searchFrom && searchTo) {
      const filtered = scheduleData.filter(
        (schedule) =>
          schedule.from.toLowerCase() === searchFrom.toLowerCase() &&
          schedule.to.toLowerCase() === searchTo.toLowerCase()
      );
      setFilteredSchedules(filtered);

      const newSearch = `${searchFrom} to ${searchTo}`;
      setRecentSearches((prev) =>
        [newSearch, ...prev.filter((search) => search !== newSearch)].slice(
          0,
          5
        )
      );
    }
  };

  const handleRouteSelect = (route) => {
    const [from, to] = route.split(" to ");
    setSearchFrom(from);
    setSearchTo(to);
    handleSearch();
  };

  const handleFromKeyDown = (e) => {
    if (showFromSuggestions && fromSuggestions.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFromHighlightIndex((prev) => {
            const nextIndex = prev + 1;
            return nextIndex >= fromSuggestions.slice(0, 10).length
              ? 0
              : nextIndex;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setFromHighlightIndex((prev) => {
            const nextIndex = prev - 1;
            return nextIndex < 0
              ? fromSuggestions.slice(0, 10).length - 1
              : nextIndex;
          });
          break;
        case "Enter":
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
    } else if (e.key === "Enter") {
      toInputRef.current.focus();
    }
  };

  const handleToKeyDown = (e) => {
    if (showToSuggestions && toSuggestions.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setToHighlightIndex((prev) => {
            const nextIndex = prev + 1;
            return nextIndex >= toSuggestions.slice(0, 10).length
              ? 0
              : nextIndex;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setToHighlightIndex((prev) => {
            const nextIndex = prev - 1;
            return nextIndex < 0
              ? toSuggestions.slice(0, 10).length - 1
              : nextIndex;
          });
          break;
        case "Enter":
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
    } else if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Time */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6 flex justify-end items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock size={20} className="text-blue-600" />
            </div>
            <span className="font-medium">{currentDateTime}</span>
          </div>
        </div>

        {/* Main Search Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Find Your <span className="text-blue-600">Bus Route</span>
          </h1>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* From Input */}
              <div className="relative flex-1">
                <div className="relative">
                  <MapPin
                    size={20}
                    className="absolute left-3 top-3 text-blue-600"
                  />
                  <input
                    ref={fromInputRef}
                    type="text"
                    placeholder="From"
                    value={searchFrom}
                    onChange={(e) => {
                      setSearchFrom(e.target.value);
                      updateSuggestions(e.target.value, "from");
                      setShowFromSuggestions(true);
                      setFromHighlightIndex(-1);
                    }}
                    onKeyDown={handleFromKeyDown}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {searchFrom && (
                    <button
                      onClick={() => {
                        setSearchFrom("");
                        setFromHighlightIndex(-1);
                      }}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
                    {fromSuggestions.slice(0, 10).map((suggestion, index) => (
                      <button
                        key={suggestion}
                        ref={(el) => (fromItemRefs.current[index] = el)}
                        className={`w-full px-4 py-2 text-left hover:bg-blue-50 first:rounded-t-xl last:rounded-b-xl ${
                          index === fromHighlightIndex ? "bg-blue-100" : ""
                        }`}
                        onClick={() => {
                          setSearchFrom(suggestion);
                          setShowFromSuggestions(false);
                          setFromHighlightIndex(-1);
                          toInputRef.current.focus();
                        }}
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
                <div className="relative">
                  <MapPin
                    size={20}
                    className="absolute left-3 top-3 text-blue-600"
                  />
                  <input
                    ref={toInputRef}
                    type="text"
                    placeholder="To"
                    value={searchTo}
                    onChange={(e) => {
                      setSearchTo(e.target.value);
                      updateSuggestions(e.target.value, "to");
                      setShowToSuggestions(true);
                      setToHighlightIndex(-1);
                    }}
                    onKeyDown={handleToKeyDown}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {searchTo && (
                    <button
                      onClick={() => {
                        setSearchTo("");
                        setToHighlightIndex(-1);
                      }}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                {showToSuggestions && toSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
                    {toSuggestions.slice(0, 10).map((suggestion, index) => (
                      <button
                        key={suggestion}
                        ref={(el) => (toItemRefs.current[index] = el)}
                        className={`w-full px-4 py-2 text-left hover:bg-blue-50 first:rounded-t-xl last:rounded-b-xl ${
                          index === toHighlightIndex ? "bg-blue-100" : ""
                        }`}
                        onClick={() => {
                          setSearchTo(suggestion);
                          setShowToSuggestions(false);
                          setToHighlightIndex(-1);
                          handleSearch();
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Find Buses
            </button>

            {/* Quick Links */}
            <div className="mt-8">
              {popularRoutes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Popular Routes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularRoutes.map((route, index) => (
                      <button
                        key={index}
                        onClick={() => handleRouteSelect(route)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        {route}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((route, index) => (
                      <button
                        key={index}
                        onClick={() => handleRouteSelect(route)}
                        className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
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

        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {filteredSchedules.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {searchFrom} → {searchTo}
                  </h2>
                  <p className="text-gray-600">
                    {filteredSchedules[0].Total_Distance} •{" "}
                    {filteredSchedules.length} buses available
                  </p>
                </div>

                {/* Grid layout to reduce vertical scrolling */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSchedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Bus size={20} className="text-blue-600" />
                            </div>
                            <span className="font-semibold text-lg">
                              {schedule.Departure_Time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <span className="font-medium">
                              {schedule.Bus_Type}
                            </span>
                            <span>•</span>
                            <span className="text-green-600 font-medium">
                              {schedule.Price}
                            </span>
                          </div>
                          <div className="flex items-start gap-2 text-sm text-gray-500">
                            <Route size={16} className="mt-1 flex-shrink-0" />
                            <span>Via: {schedule.Via}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-blue-600 font-medium mb-1">
                            {schedule.Bus_Route}
                          </div>
                          {schedule.Contact && (
                            <div className="text-sm text-gray-500">
                              Contact: {schedule.Contact}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WeeklyTimetable;
