import { useState, useEffect, useRef } from "react";
import { MapPin, Flower, Sun, Calendar, Star, Compass } from "lucide-react";
import "../styles/luxury.css";

import { royalHaryanaDestinations } from "../data/RoyalHaryanaDestination";
import { haryanaDestination } from "../data/translations";

const RoyalHaryanaTourism = ({ isHindi }) => {
  const [currentLanguage, setCurrentLanguage] = useState(haryanaDestination.en);
  const [destinations, setDestinations] = useState(royalHaryanaDestinations.en);
  const [searchTerm, setSearchTerm] = useState("");
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [filters, setFilters] = useState({
    season: "",
    duration: "",
  });
  const curtainRef = useRef(null);

  useEffect(() => {
    setCurrentLanguage(isHindi ? haryanaDestination.hi : haryanaDestination.en);
    setDestinations(
      isHindi ? royalHaryanaDestinations.hi : royalHaryanaDestinations.en
    );
  }, [isHindi]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtainOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterDestinations(term);
  };

  const filterDestinations = (term) => {
    let filtered = destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(term) ||
        dest.location.toLowerCase().includes(term)
    );

    if (filters.season) {
      filtered = filtered.filter((dest) =>
        dest.bestSeason.toLowerCase().includes(filters.season.toLowerCase())
      );
    }

    if (filters.duration) {
      filtered = filtered.filter((dest) =>
        dest.duration.includes(filters.duration)
      );
    }

    setDestinations(filtered);
  };

  const openDestinationModal = (destination) => {
    setSelectedDestination(destination);
  };

  const closeDestinationModal = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="royal-haryana-container">
      {/* Curtain Animation */}
      <div
        ref={curtainRef}
        className={`curtain ${curtainOpen ? "open" : ""}`}
      />

      {/* Header Section */}
      <header className="royal-header">
        <div className="header-overlay" />
        <div className="header-content">
          <h1 className="royal-title">{currentLanguage.title}</h1>
          <p className="royal-subtitle">{currentLanguage.subtitle}</p>
        </div>
      </header>

      {/* Advanced Filters */}
      <section className="royal-filters">
        <div className="filter-container">
          <select
            onChange={(e) => setFilters({ ...filters, season: e.target.value })}
            className="royal-select"
          >
            <option value="">{isHindi ? "मौसम चुनें" : "Select Season"}</option>
            <option value="Winter">{isHindi ? "सर्दी" : "Winter"}</option>
            <option value="Summer">{isHindi ? "गर्मी" : "Summer"}</option>
            <option value="Monsoon">{isHindi ? "मानसून" : "Monsoon"}</option>
          </select>

          <select
            onChange={(e) =>
              setFilters({ ...filters, duration: e.target.value })
            }
            className="royal-select"
          >
            <option value="">
              {isHindi ? "अवधि चुनें" : "Select Duration"}
            </option>
            <option value="1 Night">{isHindi ? "1 रात" : "1 Night"}</option>
            <option value="2 Nights">{isHindi ? "2 रातें" : "2 Nights"}</option>
            <option value="3 Nights">{isHindi ? "3 रातें" : "3 Nights"}</option>
          </select>
        </div>
      </section>

      {/* Features Section */}
      <section className="royal-features">
        {currentLanguage.features.map((feature, index) => (
          <div key={index} className="feature-card">
            <feature.icon className="feature-icon" />
            <div className="feature-details">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder={currentLanguage.searchPlaceholder}
            value={searchTerm}
            onChange={handleSearch}
            className="royal-search-input"
          />
          <button className="royal-search-button">
            {currentLanguage.searchButton}
          </button>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="destinations-grid">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="destination-card"
            onClick={() => openDestinationModal(destination)}
          >
            <div className="destination-header">
              <h2>{destination.name}</h2>
              <span className="destination-rating">
                <Star /> {destination.rating}
              </span>
            </div>
            <p className="destination-description">{destination.description}</p>
            <div className="destination-details">
              <span className="destination-price">{destination.price}</span>
              <span className="destination-duration">
                {destination.duration}
              </span>
              <span className="destination-location">
                <MapPin size={16} /> {destination.location}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Detailed Destination Modal */}
      {selectedDestination && (
        <div className="destination-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeDestinationModal}>
              ✕
            </button>
            <div className="modal-header">
              <h2>{selectedDestination.name}</h2>
              <div className="modal-meta">
                <span>
                  <Calendar /> {selectedDestination.duration}
                </span>
                <span>
                  <MapPin /> {selectedDestination.location}
                </span>
                <span>
                  <Sun /> {selectedDestination.bestSeason}
                </span>
              </div>
            </div>

            <div className="modal-sections">
              <div className="modal-section">
                <h3>
                  {isHindi
                    ? "गंतव्य मुख्य विशेषताएं"
                    : "Destination Highlights"}
                </h3>
                {selectedDestination.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <Flower /> {highlight}
                  </div>
                ))}
              </div>

              <div className="modal-section">
                <h3>
                  {isHindi ? "अनुशंसित गतिविधियाँ" : "Recommended Activities"}
                </h3>
                {selectedDestination.activities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <Compass /> {activity}
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="book-now">
                {isHindi ? "रॉयल अनुभव बुक करें" : "Book Royal Experience"}
              </button>
              <button className="learn-more">
                {isHindi ? "विस्तृत यात्रा कार्यक्रम" : "Detailed Itinerary"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoyalHaryanaTourism;
