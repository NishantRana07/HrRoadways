import React from "react";
import { Star, IndianRupee, RefreshCcw } from "lucide-react";

const SidebarFilter = ({ filters, onFilterChange, currentLanguage, onReset }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 w-full transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-blue-700 tracking-wide">
          {currentLanguage.filters}
        </h3>
        <button
          onClick={onReset}
          className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition"
        >
          <RefreshCcw size={16} />
          Reset
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
          <IndianRupee size={18} />
          {currentLanguage.priceRange}
        </label>
        <input
          type="range"
          min="500"
          max="8000"
          step="100"
          value={filters.priceRange[1]}
          onChange={(e) =>
            onFilterChange("priceRange", [filters.priceRange[0], Number(e.target.value)])
          }
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="mb-6">
        <label className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
          <Star size={18} className="text-yellow-500" />
          {currentLanguage.minRating}
        </label>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => onFilterChange("minRating", rating)}
              className={`px-3 py-1 rounded-full border text-sm ${
                filters.minRating === rating
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              } transition`}
            >
              {rating === 0 ? "All" : `${rating}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Type */}
      <div className="mb-6">
        <label className="block text-gray-800 font-semibold mb-2">
          Hotel Type
        </label>
        <div className="flex flex-col gap-2">
          {["Budget", "Luxury", "Resort", "Hostel", "Premium"].map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={(filters.hotelTypes || []).includes(type)}
                onChange={(e) => {
                  const newTypes = e.target.checked
                    ? [...filters.hotelTypes, type]
                    : filters.hotelTypes.filter((t) => t !== type);
                  onFilterChange("hotelTypes", newTypes);
                }}
                className="accent-blue-600"
              />
              {type}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
