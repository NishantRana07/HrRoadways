import { useState, useEffect } from "react";
import { MapPin, Star, Moon } from "lucide-react";

import { hotels } from "../data/hotels";
import { defaultLanguage, eleventhTranslationURL } from "../constants";

// Enhanced Range Slider Component for Price Range
const RangeSlider = ({ min, max, values, onChange, step, formatValue }) => {
  const [isDragging, setIsDragging] = useState(null);

  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  const handleMouseDown = (index) => (e) => {
    e.preventDefault();
    setIsDragging(index);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (e) => {
    if (isDragging !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const value = Math.round((min + (percentage / 100) * (max - min)) / step) * step;
      
      const newValues = [...values];
      newValues[isDragging] = Math.max(min, Math.min(max, value));
      
      // Ensure min doesn't exceed max and vice versa
      if (isDragging === 0 && newValues[0] > newValues[1]) {
        newValues[0] = newValues[1];
      } else if (isDragging === 1 && newValues[1] < newValues[0]) {
        newValues[1] = newValues[0];
      }
      
      onChange(newValues);
    }
  };

  useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="relative w-full h-6 flex items-center" onMouseMove={handleMouseMove}>
      {/* Track */}
      <div className="absolute w-full h-2 bg-blue-100 rounded-full">
        {/* Active range */}
        <div
          className="absolute h-full bg-blue-500 rounded-full transition-all duration-150"
          style={{
            left: `${getPercentage(values[0])}%`,
            width: `${getPercentage(values[1]) - getPercentage(values[0])}%`
          }}
        />
      </div>
      
      {/* Min handle */}
      <div
        className={`absolute h-5 w-5 bg-white border-2 border-blue-500 rounded-full cursor-grab shadow-md transition-transform duration-150 ${
          isDragging === 0 ? 'scale-110 cursor-grabbing' : 'hover:scale-105'
        }`}
        style={{ left: `${getPercentage(values[0])}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown(0)}
      />
      
      {/* Max handle */}
      <div
        className={`absolute h-5 w-5 bg-white border-2 border-blue-500 rounded-full cursor-grab shadow-md transition-transform duration-150 ${
          isDragging === 1 ? 'scale-110 cursor-grabbing' : 'hover:scale-105'
        }`}
        style={{ left: `${getPercentage(values[1])}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown(1)}
      />
    </div>
  );
};

// Single Value Slider Component for Rating
const SingleSlider = ({ min, max, value, onChange, step }) => {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const newValue = Math.round((min + (percentage / 100) * (max - min)) / step) * step;
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  };

  const handleTrackClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    const newValue = Math.round((min + (percentage / 100) * (max - min)) / step) * step;
    onChange(Math.max(min, Math.min(max, newValue)));
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="relative w-full h-6 flex items-center" onMouseMove={handleMouseMove}>
      <div 
        className="absolute w-full h-2 bg-blue-100 rounded-full cursor-pointer"
        onClick={handleTrackClick}
      >
        <div
          className="absolute h-full bg-blue-500 rounded-full transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className={`absolute h-5 w-5 bg-white border-2 border-blue-500 rounded-full cursor-grab shadow-md transition-transform duration-150 ${
          isDragging ? 'scale-110 cursor-grabbing' : 'hover:scale-105'
        }`}
        style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
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
          <span className="text-sm text-gray-600">
            {currentLanguage.perNight}
          </span>
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
        <RangeSlider
          min={500}
          max={8000}
          values={filters.priceRange}
          onChange={(value) => onFilterChange("priceRange", value)}
          step={200}
          formatValue={currentLanguage.priceLabel}
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
        <SingleSlider
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
                    ? "text-blue-500 fill-blue-500"
                    : "text-gray-300"
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

const Trip = ({ isHindi = false }) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <p className="text-gray-600 font-medium">
                  {currentLanguage.noHotels}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
