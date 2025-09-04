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
import { fallbackBusStands, fallbackBusData } from "../data/fallbackData";
import "../styles/hero.css";
import "../styles/modal.css";

// Local YYYY-MM-DD (safer than toISOString due to time zones)
const TODAY_STR = new Date().toLocaleDateString("en-CA");

// CustomAlert Component to display info and warning alerts
const CustomAlert = ({ type, children }) => (
  <div className={`custom-alert ${type === "warning" ? "warning" : "info"}`}>
    {type === "warning" ? <AlertCircle className="icon" /> : <Info className="icon" />}
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
    date: TODAY_STR,
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
  const [activeDestSuggestionIndex, setActiveDestSuggestionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    fetch("https://jsonblob.com/api/jsonBlob/1333092652136194048")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const uniqueBusStands = new Set();
        data.forEach((route) => {
          uniqueBusStands.add(route.from);
          uniqueBusStands.add(route.to);
        });
        setBusStands([...uniqueBusStands]);
      })
      .catch((error) => {
        console.error("Error fetching bus stands:", error);
        // Set fallback bus stands if API fails
        setBusStands(fallbackBusStands);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Handle input change for form fields (with past-date guard)
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Block any manual past-date entry
    if (name === "date") {
      const next = value < TODAY_STR ? TODAY_STR : value;
      setFormData((prev) => ({ ...prev, date: next }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));

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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
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
          return isExactRoute || isReverseRoute || isViaRoute || isViaReverseRoute;
        });
        setBuses(filteredBuses);
      })
      .catch((error) => {
        console.error("Error fetching buses:", error);
        // Use fallback data if API fails
        const filteredBuses = fallbackBusData.filter((bus) => {
          const isExactRoute =
            bus.from.toLowerCase() === formData.src.toLowerCase() &&
            bus.to.toLowerCase() === formData.dest.toLowerCase();
          const isReverseRoute =
            formData.roundTrip &&
            bus.from.toLowerCase() === formData.dest.toLowerCase() &&
            bus.to.toLowerCase() === formData.src.toLowerCase();
          const isViaRoute =
            bus.from.toLowerCase() === formData.src.toLowerCase() &&
            bus.Via?.toLowerCase().includes(formData.dest.toLowerCase());
          const isViaReverseRoute =
            formData.roundTrip &&
            bus.from.toLowerCase() === formData.dest.toLowerCase() &&
            bus.Via?.toLowerCase().includes(formData.src.toLowerCase());
          return isExactRoute || isReverseRoute || isViaRoute || isViaReverseRoute;
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

  if (isLoading) {
    return (
      <div
        className="hero-container text-black"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "18px", marginBottom: "10px" }}>
            Loading Haryana Roadways...
          </div>
          <div style={{ fontSize: "14px", color: "#666" }}>
            Fetching bus routes and schedules
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-container text-black dark:bg-gray-950 dark:text-white" ref={containerRef}>
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

      <div className="hero-content dark:bg-gray-950 dark:text-white">
        <div className="content-grid">
          <CustomCard className="form-card dark:bg-gray-950 dark:text-white">
            <form className="form text-slate-950" onSubmit={handleSubmit}>
              <div className="swap-wrapper">
                <FormInput
                  placeholder="Departure location"
                  label={t("hero.departure")}
                  name="src"
                  value={formData.src}
                  onChange={handleChange}
                  suggestions={srcSuggestions}
                  showSuggestions={showSrcSuggestions}
                  setShowSuggestions={setShowSrcSuggestions}
                  activeSuggestionIndex={activeSrcSuggestionIndex}
                  setActiveSuggestionIndex={setActiveSrcSuggestionIndex}
                />
                {/*  ADDING A SWAP BUTTTON HERE */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      src: prev.dest,
                      dest: prev.src,
                    }))
                  }
                  className="swap-btn"
                  title="Swap locations"
                >
                  <Repeat size={20} />
                </button>

                <FormInput
                  placeholder="Destination city or address"
                  label={t("hero.arrival")}
                  name="dest"
                  value={formData.dest}
                  onChange={handleChange}
                  suggestions={destSuggestions}
                  showSuggestions={showDestSuggestions}
                  setShowSuggestions={setShowDestSuggestions}
                  activeSuggestionIndex={activeDestSuggestionIndex}
                  setActiveSuggestionIndex={setActiveDestSuggestionIndex}
                  disabled={!formData.src}
                />
              </div>
              <FormInput
                label={t("schedule.departure")}
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                min={TODAY_STR}
              />
              <FormInput
                label={t("trip.passengers")}
                name="passengers"
                type="number"
                value={formData.passengers}
                onChange={handleChange}
                min="1"
              />
              <FormCheckbox
                label={t("trip.roundTrip")}
                name="roundTrip"
                checked={formData.roundTrip}
                onChange={() =>
                  setFormData({ ...formData, roundTrip: !formData.roundTrip })
                }
              />
              <button type="submit" className="search-button">
                {t("hero.button")}
              </button>
            </form>
          </CustomCard>

          <div className="right-panel">
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
                <BusCard key={index} bus={bus} onClick={() => handleBusCardClick(bus)} />
              ))}
            </div>
          </div>
        )}
      </div>
      <BusDetailModal isOpen={isModalOpen} onClose={closeModal} bus={selectedBus} />
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
        {name === "src" || name === "dest" ? <MapPin className="form-icon" /> : null}
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
        <div className={`suggestions-dropdown ${suggestions.length ? "show" : ""}`}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item ${index === activeSuggestionIndex ? "active" : ""}`}
              onMouseDown={() => onChange({ target: { name, value: suggestion } })}
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
    <input type="checkbox" name={name} checked={checked} onChange={onChange} className="form-checkbox ml-2" />
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
              {bus.Total_Distance.includes("KM") ? bus.Total_Distance : `${bus.Total_Distance} KM`}
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
          <div className="distance-bar-fill" style={{ width: `${fillPercentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
