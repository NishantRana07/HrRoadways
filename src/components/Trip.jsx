import React, { useState } from "react";
import "../assets/Trip.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// Translations object for UI text only
const translations = {
  en: {
    filters: "Filters",
    priceRange: "Price Range",
    minRating: "Minimum Rating",
    priceLabel: (price) => `₹${price}`,
    ratingLabel: (rating) => `${rating} Stars`,
    hotels: "Hotels",
    noHotels: "No hotels match your criteria.",
    perNight: "/ night",
    rating: "Rating",
    stars: "/ 5",
  },
  hi: {
    filters: "फिल्टर",
    priceRange: "मूल्य सीमा",
    minRating: "न्यूनतम रेटिंग",
    priceLabel: (price) => `₹${price}`,
    ratingLabel: (rating) => `${rating} सितारे`,
    hotels: "होटल",
    noHotels: "आपके मानदंडों से मेल खाने वाले कोई होटल नहीं हैं।",
    perNight: "/ रात",
    rating: "रेटिंग",
    stars: "/ 5",
  },
};

// Original hotel data without translations
const hotels = [
  {
    id: 1,
    name: "Heritage Haveli",
    location: "Kurukshetra, Haryana",
    pricePerNight: 3500,
    rating: 4.5,
    image: "/HotelImages/Hotel01.jpg",
  },
  {
    id: 2,
    name: "City Comfort Inn",
    location: "Panipat, Haryana",
    pricePerNight: 2200,
    rating: 4.2,
    image: "/HotelImages/Hotel02.jpg",
  },
  {
    id: 3,
    name: "Luxury Stay",
    location: "Gurugram, Haryana",
    pricePerNight: 5000,
    rating: 4.8,
    image: "/HotelImages/Hotel03.jpg",
  },
  {
    id: 4,
    name: "Desert Resort",
    location: "Hisar, Haryana",
    pricePerNight: 4000,
    rating: 4.4,
    image: "/HotelImages/Hotel04.jpeg",
  },
  {
    id: 5,
    name: "Hilltop Paradise",
    location: "Panchkula, Haryana",
    pricePerNight: 4500,
    rating: 4.7,
    image: "/HotelImages/Hotel01.jpg",
  },
  {
    id: 6,
    name: "Urban Retreat",
    location: "Faridabad, Haryana",
    pricePerNight: 3000,
    rating: 4.3,
    image: "/HotelImages/Hotel02.jpg",
  },
  {
    id: 7,
    name: "Green Valley Inn",
    location: "Karnal, Haryana",
    pricePerNight: 2500,
    rating: 4.1,
    image: "/HotelImages/Hotel03.jpg",
  },
  {
    id: 8,
    name: "Lakeview Lodge",
    location: "Rohtak, Haryana",
    pricePerNight: 3800,
    rating: 4.6,
    image: "/HotelImages/Hotel04.jpeg",
  },
];

// SidebarFilter component
function SidebarFilter({ filters, onFilterChange, currentLanguage }) {
  const [priceRange, setPriceRange] = useState([500, 8000]);
  const [minRating, setMinRating] = useState(0);

  const handlePriceChange = (range) => {
    setPriceRange(range);
    onFilterChange("priceRange", range);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    onFilterChange("minRating", rating);
  };

  return (
    <div className="sidebar-filter">
      <h3>{currentLanguage.filters}</h3>
      <div className="filter-section">
        <h4>{currentLanguage.priceRange}</h4>
        <Slider
          range
          min={500}
          max={8000}
          step={200}
          value={priceRange}
          onChange={handlePriceChange}
          className="slider"
        />
        <div className="range-labels">
          <span>{currentLanguage.priceLabel(priceRange[0])}</span>
          <span>{currentLanguage.priceLabel(priceRange[1])}</span>
        </div>
      </div>
      <div className="filter-section">
        <h4>{currentLanguage.minRating}</h4>
        <Slider
          min={0}
          max={5}
          step={0.1}
          value={minRating}
          onChange={handleRatingChange}
          className="slider"
        />
        <div className="range-labels">
          <span>{currentLanguage.ratingLabel(minRating)}</span>
        </div>
      </div>
    </div>
  );
}

// HotelCard component
function HotelCard({ hotel, currentLanguage }) {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <div className="hotel-details">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-location">{hotel.location}</p>
        <p className="hotel-price">
          {currentLanguage.priceLabel(hotel.pricePerNight)}{" "}
          {currentLanguage.perNight}
        </p>
        <p className="hotel-rating">
          {currentLanguage.rating}: {hotel.rating} {currentLanguage.stars}
        </p>
      </div>
    </div>
  );
}

// Trip component with language toggle
function Trip({ isHindi }) {
  const currentLanguage = isHindi ? translations.hi : translations.en;

  const [filters, setFilters] = useState({
    priceRange: [500, 8000],
    minRating: 0,
  });

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesPrice =
      hotel.pricePerNight >= filters.priceRange[0] &&
      hotel.pricePerNight <= filters.priceRange[1];
    const matchesRating = hotel.rating >= filters.minRating;
    return matchesPrice && matchesRating;
  });

  return (
    <div className="trip-container">
      <div className="trip-sidebar">
        <SidebarFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          currentLanguage={currentLanguage}
        />
      </div>
      <div className="trip-main">
        <h2 className="trip-title">{currentLanguage.hotels}</h2>
        <div className="hotel-grid">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                currentLanguage={currentLanguage}
              />
            ))
          ) : (
            <p>{currentLanguage.noHotels}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trip;