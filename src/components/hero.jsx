import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Info,
  Repeat,
  Shield,
  Star,
  Phone,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import TrafficUpdates from "./TrafficUpdates";
import PopularRoutes from "./PopularRoutes";
import BusDetailModal from "./BusDetailModal";
import WeatherUpdates from "./WeatherUpdates";
import "../styles/hero.css";
import "../styles/modal.css";

// CustomAlert Component to display info and warning alerts
const CustomAlert = ({ type, children }) => (
  <div className={`custom-alert ${type === "warning" ? "warning" : "info"}`}>
    {type === "warning" ? (
      <AlertCircle className="icon" />
    ) : (
      <Info className="icon" />
    )}
    <p className="text">{children}</p>
  </div>
);

// CustomCard Component for reusable card layout
const CustomCard = ({ children, className }) => (
  <div className={`custom-card ${className}`}>{children}</div>
);

// Hero Component - Main Component
const Hero = () => {
  const { t } = useTranslation();

  // State management
  const [formData, setFormData] = useState({
    src: "",
    dest: "",
    date: new Date().toISOString().split("T")[0],
    passengers: 1,
    roundTrip: false,
  });
  const [busStands, setBusStands] = useState([]);
  const [srcSuggestions, setSrcSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [showSrcSuggestions, setShowSrcSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [buses, setBuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [activeSrcSuggestionIndex, setActiveSrcSuggestionIndex] = useState(-1);
  const [activeDestSuggestionIndex, setActiveDestSuggestionIndex] =
    useState(-1);

  const inputRefs = useRef([]);
  const containerRef = useRef(null);

  // Fetch alerts
  useEffect(() => {
    setAlerts([
      {
        type: "info",
        message: "Extra buses available on Delhi-Chandigarh route",
      },
      {
        type: "warning",
        message: "Weather alert: Fog expected in northern Haryana",
      },
    ]);
  }, []);

  // Fetch bus stands
  useEffect(() => {
    fetch("https://jsonblob.com/api/jsonBlob/1333092652136194048")
      .then((response) => response.json())
      .then((data) => {
        const uniqueBusStands = new Set();
        data.forEach((route) => {
          uniqueBusStands.add(route.from);
          uniqueBusStands.add(route.to);
        });
        setBusStands([...uniqueBusStands]);
      });
  }, []);

  // Handle input change for form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "src") {
      const filtered = busStands
        .filter((stand) => stand.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10); // Limit to 10 locations
      setSrcSuggestions(filtered);
      setShowSrcSuggestions(true);
      setActiveSrcSuggestionIndex(-1);
    } else if (name === "dest") {
      const filtered = busStands
        .filter((stand) => stand.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10); // Limit to 10 locations
      setDestSuggestions(filtered);
      setShowDestSuggestions(true);
      setActiveDestSuggestionIndex(-1);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://jsonblob.com/api/jsonBlob/1333092652136194048")
      .then((response) => response.json())
      .then((data) => {
        const filteredBuses = data.filter((bus) => {
          const isExactRoute =
            bus.from.toLowerCase() === formData.src.toLowerCase() &&
            bus.to.toLowerCase() === formData.dest.toLowerCase();
          const isReverseRoute =
            formData.roundTrip &&
            bus.from.toLowerCase() === formData.dest.toLowerCase() &&
            bus.to.toLowerCase() === formData.src.toLowerCase();
          const isViaRoute =
            bus.from.toLowerCase() === formData.src.toLowerCase() &&
            bus.via?.toLowerCase().includes(formData.dest.toLowerCase());
          const isViaReverseRoute =
            formData.roundTrip &&
            bus.from.toLowerCase() === formData.dest.toLowerCase() &&
            bus.via?.toLowerCase().includes(formData.src.toLowerCase());
          return (
            isExactRoute || isReverseRoute || isViaRoute || isViaReverseRoute
          );
        });
        setBuses(filteredBuses);
      });
  };

  // Handle bus card click to open modal
  const handleBusCardClick = (bus) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBus(null);
  };

  return (
    <div className="hero-container" ref={containerRef}>
      <div className="hero-header">
        <div className="hero-header-overlay" />
        <div className="hero-header-content">
          <h1 className="hero-heading">{t("hero.heading")}</h1>
          <p className="hero-subheading">{t("hero.subheading")}</p>
        </div>
      </div>

      <div className="hero-features">
        <div className="features-container">
          <div className="feature-item">
            <Shield className="feature-icon" />
            <div>
              <div className="feature-title">{t("about.safety")}</div>
              <div className="feature-desc">{t("about.safetyDesc")}</div>
            </div>
          </div>
          <div className="feature-item">
            <Clock className="feature-icon" />
            <div>
              <div className="feature-title">{t("about.reliability")}</div>
              <div className="feature-desc">{t("about.reliabilityDesc")}</div>
            </div>
          </div>
          <div className="feature-item">
            <Star className="feature-icon" />
            <div>
              <div className="feature-title">{t("about.comfort")}</div>
              <div className="feature-desc">{t("about.comfortDesc")}</div>
            </div>
          </div>
          <div className="feature-item">
            <Phone className="feature-icon" />
            <div>
              <div className="feature-title">{t("services.support")}</div>
              <div className="feature-desc">{t("services.supportDesc")}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-content">
        <div className="content-grid">
          <CustomCard className="min-h-screen rounded-xl border border-gray-200 flex items-center justify-center p-4 font-inter">
            <div ref={containerRef} className="bg-white p-8  h-full w-full  ">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Find Your Bus
              </h2>

              {/* Alerts Section */}
              {alerts.length > 0 && (
                <div className="mb-6 space-y-3">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        alert.type === "info"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : alert.type === "warning"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {alert.message}
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* From Input */}
                <div className="relative">
                  <label
                    htmlFor="src"
                    className="flex items-center text-gray-700 text-sm font-medium mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    From
                  </label>
                  <input
                    type="text"
                    id="src"
                    name="src"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400 text-gray-800"
                    placeholder="Departure location"
                    value={formData.src}
                    onChange={handleChange}
                    onFocus={() => setShowSrcSuggestions(true)}
                    onKeyDown={(e) => handleKeyDown(e, "src")}
                    required
                  />
                  {showSrcSuggestions && srcSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                      {srcSuggestions.map((suggestion, index) => (
                        <li
                          key={suggestion}
                          className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                            index === activeSrcSuggestionIndex
                              ? "bg-blue-100"
                              : ""
                          }`}
                          onClick={() => selectSuggestion("src", suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* To Input */}
                <div className="relative">
                  <label
                    htmlFor="dest"
                    className="flex items-center text-gray-700 text-sm font-medium mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-teal-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    To
                  </label>
                  <input
                    type="text"
                    id="dest"
                    name="dest"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400 text-gray-800"
                    placeholder="Destination city or address"
                    value={formData.dest}
                    onChange={handleChange}
                    onFocus={() => setShowDestSuggestions(true)}
                    onKeyDown={(e) => handleKeyDown(e, "dest")}
                    required
                  />
                  {showDestSuggestions && destSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                      {destSuggestions.map((suggestion, index) => (
                        <li
                          key={suggestion}
                          className={`px-4 py-2 cursor-pointer hover:bg-teal-100 ${
                            index === activeDestSuggestionIndex
                              ? "bg-teal-100"
                              : ""
                          }`}
                          onClick={() => selectSuggestion("dest", suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Departure Date Input */}
                <div>
                  <label
                    htmlFor="date"
                    className="flex items-center text-gray-700 text-sm font-medium mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-purple-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Departure
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Passengers Input */}
                <div>
                  <label
                    htmlFor="passengers"
                    className="flex items-center text-gray-700 text-sm font-medium mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-orange-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-6 9a1 1 0 011-1h2a1 1 0 011 1v2h3a1 1 0 110 2H6a1 1 0 110-2h3v-2z" />
                    </svg>
                    Passengers
                  </label>
                  <input
                    type="number"
                    id="passengers"
                    name="passengers"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
                    value={formData.passengers}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                {/* Round Trip Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="roundTrip"
                    name="roundTrip"
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    checked={formData.roundTrip}
                    onChange={() =>
                                       setFormData((prev) => ({
                        ...prev,
                        roundTrip: !prev.roundTrip,
                      }))
                                      }
                  />

                  <label
                    htmlFor="roundTrip"
                    className="ml-2 text-gray-700 text-sm font-medium cursor-pointer "
                  >
                    Round Trip
                  </label>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-200 ease-in-out hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">

                  Search Buses
                </button>
              </form>

              {/* Display Buses (Placeholder) */}
              {buses.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Available Buses:
                  </h3>
                  <div className="space-y-4">
                    {buses.map((bus, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
                        onClick={() => handleBusCardClick(bus)}
                      >
                        <p className="font-bold text-lg text-gray-900">
                          {bus.from} to {bus.to}
                        </p>
                        <p className="text-gray-600">
                          Departure: {bus.departureTime}
                        </p>
                        <p className="text-gray-600">Price: ${bus.price}</p>
                        {bus.via && (
                          <p className="text-gray-500 text-sm">
                            Via: {bus.via}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bus Details Modal */}
              {isModalOpen && selectedBus && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm relative">
                    <button
                      onClick={closeModal}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    >
                      &times;
                    </button>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Bus Details
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Route:</span>{" "}
                      {selectedBus.from} to {selectedBus.to}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Departure:</span>{" "}
                      {selectedBus.departureTime}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Arrival:</span>{" "}
                      {selectedBus.arrivalTime}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Price:</span> $
                      {selectedBus.price}
                    </p>
                    {selectedBus.via && (
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Via:</span>{" "}
                        {selectedBus.via}
                      </p>
                    )}
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Seats Available:</span>{" "}
                      {selectedBus.availableSeats}
                    </p>
                    <button
                      className="mt-6 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                      onClick={() => {
                        alert(
                          "Booking functionality not implemented in this demo."
                        );
                        closeModal();
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </CustomCard>

          <div className="right-panel flex flex-col space-y-6">
            <PopularRoutes
              onRouteClick={(route) =>
                handleChange({ target: { name: "src", value: route.src } })
              }
            />
            <WeatherUpdates />
          </div>
        </div>

        {buses.length > 0 && (
          <div className="bus-results">
            <h3 className="bus-results-heading">{t("hero.allBuses")}</h3>
            <div className="bus-grid">
              {buses.map((bus, index) => (
                <BusCard
                  key={index}
                  bus={bus}
                  onClick={() => handleBusCardClick(bus)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <BusDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        bus={selectedBus}
      />
    </div>
  );
};

// FormInput Component - Reusable input field with suggestions
const FormInput = ({
  placeholder,
  label,
  name,
  value,
  onChange,
  suggestions = [],
  showSuggestions,
  setShowSuggestions,
  type = "text",
  disabled = false,
  min,
  activeSuggestionIndex,
  setActiveSuggestionIndex,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handlePosition = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const dropdown = inputRef.current.nextElementSibling;
        if (dropdown) {
          dropdown.parentElement.setAttribute(
            "data-dropdown-up",
            rect.bottom + dropdown.offsetHeight > window.innerHeight
          );
        }
      }
    };

    window.addEventListener("resize", handlePosition);
    handlePosition();

    return () => {
      window.removeEventListener("resize", handlePosition);
    };
  }, [value]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        onChange({
          target: { name, value: suggestions[activeSuggestionIndex] },
        });
        setShowSuggestions(false);
      }
    } else if (event.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div
      className="form-group"
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
    >
      <label className="form-label">
        {name === "src" || name === "dest" ? (
          <MapPin className="form-icon" />
        ) : null}
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
        autoComplete="off"
        disabled={disabled}
        min={min}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <div
          className={`suggestions-dropdown ${suggestions.length ? "show" : ""}`}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item ${
                index === activeSuggestionIndex ? "active" : ""
              }`}
              onMouseDown={() =>
                onChange({ target: { name, value: suggestion } })
              }
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// FormCheckbox Component - Reusable checkbox input
const FormCheckbox = ({ label, name, checked, onChange }) => (
  <div className="form-group">
    <label className="form-label">
      <Repeat className="form-icon mb-3" />
      {label}
    </label>
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="form-checkbox ml-2"
    />
  </div>
);

// BusCard Component - Bus card displaying bus details
const BusCard = ({ bus, onClick }) => {
  const distance = parseFloat(bus.Total_Distance.replace(/[^0-9.]/g, ""));
  const fillPercentage = Math.min((distance / 1000) * 100, 100);

  return (
    <div className="bus-item" onClick={onClick}>
      <div className="bus-info">
        <div className="bus-card-header">
          <div className="bus-card-title">
            <Clock size={20} className="text-blue-600" />
            <span>{bus.Bus_Type}</span>
          </div>
          <div className="bus-card-price">
            <div className="bus-card-price-value">
              {bus.Price.includes("₹") ? bus.Price : `₹${bus.Price}`}
            </div>
            <div className="bus-card-price-distance">
              {bus.Total_Distance.includes("KM")
                ? bus.Total_Distance
                : `${bus.Total_Distance} KM`}
            </div>
          </div>
        </div>
        <div className="bus-card-details">
          <div className="bus-card-detail">
            <MapPin size={16} className="text-gray-400" />
            <span>{bus.Departure_Time}</span>
          </div>
          <div className="bus-card-detail">
            <MapPin size={16} className="text-gray-400" />
            <span>Via: {bus.Via}</span>
          </div>
        </div>
        <div className="distance-bar-wrapper">
          <div
            className="distance-bar-fill"
            style={{ width: `${fillPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
