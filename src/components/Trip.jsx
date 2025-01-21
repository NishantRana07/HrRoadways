import React, { useState } from 'react';
import { MapPin, Star, Moon } from 'lucide-react';

// Example translations object
const translations = {
  en: {
    filters: "Filters",
    priceRange: "Price Range",
    minRating: "Minimum Rating",
    perNight: "per night",
    hotels: "Hotels",
    noHotels: "No hotels found",
    priceLabel: (price) => `₹${price}`,
  },
  hi: {
    filters: "फ़िल्टर",
    priceRange: "मूल्य सीमा",
    minRating: "न्यूनतम रेटिंग",
    perNight: "प्रति रात",
    hotels: "होटल",
    noHotels: "कोई होटल नहीं मिला",
    priceLabel: (price) => `₹${price}`,
  },
};

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

const CustomSlider = ({ min, max, value, onChange, step }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full h-6 flex items-center">
      <div className="absolute w-full h-2 bg-blue-100 rounded-full">
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        step={step}
        className="absolute w-full h-2 opacity-0 cursor-pointer"
      />
      <div
        className="absolute h-4 w-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer"
        style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
      />
    </div>
  );
};

const HotelCard = ({ hotel, currentLanguage }) => (
  <div className="bg-white rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-2 border-blue-100">
    <div className="relative">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-white opacity-80">
        <div
          className="h-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8L10 0L20 8L10 16L0 8Z' fill='%233B82F6' fill-opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 16px',
          }}
        />
      </div>
      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 border-2 border-blue-500">
        <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
        <span className="text-sm font-bold">{hotel.rating}</span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{hotel.name}</h3>
      <div className="flex items-center gap-2 text-gray-600 mb-3">
        <MapPin className="w-4 h-4 text-blue-500" />
        <span className="text-sm">{hotel.location}</span>
      </div>
      <div className="flex items-center justify-between mt-4 border-t border-blue-100 pt-4">
        <div className="flex items-center gap-1">
          <Moon className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">{currentLanguage.perNight}</span>
        </div>
        <div className="text-blue-600 font-bold text-lg">
          {currentLanguage.priceLabel(hotel.pricePerNight)}
        </div>
      </div>
    </div>
  </div>
);

const SidebarFilter = ({ filters, onFilterChange, currentLanguage }) => (
  <div className="bg-white p-6 rounded-lg border-2 border-blue-100">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-2 h-8 bg-blue-500 rounded-full" />
      <h3 className="text-xl font-bold text-gray-900">
        {currentLanguage.filters}
      </h3>
    </div>

    <div className="space-y-8">
      <div className="filter-section">
        <div className="flex items-center gap-2 mb-4">
          <h4 className="text-sm font-bold text-gray-700">
            {currentLanguage.priceRange}
          </h4>
          <div className="flex-1 border-b-2 border-dotted border-blue-200" />
        </div>
        <CustomSlider
          min={500}
          max={8000}
          value={filters.priceRange[0]}
          onChange={(value) => onFilterChange("priceRange", [value, filters.priceRange[1]])}
          step={200}
        />
        <div className="flex justify-between text-sm font-bold text-blue-600 mt-2">
          <span>{currentLanguage.priceLabel(filters.priceRange[0])}</span>
          <span>{currentLanguage.priceLabel(filters.priceRange[1])}</span>
        </div>
      </div>

      <div className="filter-section">
        <div className="flex items-center gap-2 mb-4">
          <h4 className="text-sm font-bold text-gray-700">
            {currentLanguage.minRating}
          </h4>
          <div className="flex-1 border-b-2 border-dotted border-blue-200" />
        </div>
        <CustomSlider
          min={0}
          max={5}
          value={filters.minRating}
          onChange={(value) => onFilterChange("minRating", value)}
          step={0.1}
        />
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(filters.minRating)
                    ? 'text-blue-500 fill-blue-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-blue-600">
            {filters.minRating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Trip = ({ isHindi }) => {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-80 flex-shrink-0">
            <SidebarFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              currentLanguage={currentLanguage}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-blue-500 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentLanguage.hotels}
                </h2>
              </div>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                {filteredHotels.length} {currentLanguage.hotels}
              </span>
            </div>

            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    currentLanguage={currentLanguage}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border-2 border-blue-100">
                <p className="text-gray-600 font-medium">{currentLanguage.noHotels}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip; 