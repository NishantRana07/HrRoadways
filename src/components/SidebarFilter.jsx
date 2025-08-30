import React from "react";
import { Star, IndianRupee, RefreshCcw, Search } from "lucide-react";

const SidebarFilter = ({
  filters,
  onFilterChange,
  currentLanguage,
  onReset,
}) => {
  const MIN_RANGE_VALUE = 0;
  const MAX_RANGE_VALUE = 8000;

  return (
    <div className="bg-white dark:bg-gray-950 dark:text-white">
      {/* Header */}
      <div className="mb-6 flex dark:bg-gray-950 dark:text-white">
        <h3 className="text-[1.75rem] font-bold text-gray-900 mb-4">
          {currentLanguage.filters}
        </h3>
        <button
          onClick={onReset}
          className="text-sm text-blue-600  flex items-center gap-1 transition ml-[8.4rem] mb-[.8rem] hover:text-amber-700"
        >
          <RefreshCcw size={16} />
          Reset
        </button>
      </div>

      {/* Enhanced Price Range with dual handles */}
      <div className="mb-6">
        <label className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
          <IndianRupee size={18} />
          {currentLanguage.priceRange}
        </label>

        {/* Custom dual range slider */}
        <div className="relative">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              ₹{filters.priceRange[0]}
            </span>
            <span className="text-sm text-gray-600">
              ₹{filters.priceRange[1]}
            </span>
          </div>

          {/* Dual Range Slider Visual Track */}
          <div className="relative h-2 bg-gray-200 rounded-full ">
            <div
              className="absolute h-2 bg-blue-600 rounded-full"
              style={{
                left: `${((filters.priceRange[0] - MIN_RANGE_VALUE) / (MAX_RANGE_VALUE - MIN_RANGE_VALUE)) * 100}%`,
                width: `${
                  ((filters.priceRange[1] - filters.priceRange[0]) /
                    (MAX_RANGE_VALUE - MIN_RANGE_VALUE)) *
                  100
                }%`,
              }}
            />

            {/* Min Range Input (Left Handle) */}
            <input
              type="range"
              min={MIN_RANGE_VALUE}
              max={MAX_RANGE_VALUE}
              step="100"
              value={filters.priceRange[0]}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                // Allow min to go up to max
                if (newMin <= filters.priceRange[1]) {
                  onFilterChange("priceRange", [newMin, filters.priceRange[1]]);
                } else {
                  // If trying to cross, set min to current max to prevent crossing
                  onFilterChange("priceRange", [filters.priceRange[1], filters.priceRange[1]]);
                }
              }}
              // Both sliders need to be at the same z-index or the active one needs to be higher
              // For dual sliders, typically set the z-index so the one being dragged is on top.
              // Here, we give the left handle a slightly lower z-index initially,
              // but you might need custom CSS to ensure proper thumb interaction.
              // The `range-slider` class needs custom styling for thumb appearance.
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider z-20" // Increased z-index from z-10
              style={{
                background: "transparent",
                pointerEvents: "auto",
              }}
            />

            {/* Max Range Input (Right Handle) */}
            <input
              type="range"
              min={MIN_RANGE_VALUE}
              max={MAX_RANGE_VALUE}
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                // Allow max to go down to min
                if (newMax >= filters.priceRange[0]) {
                  onFilterChange("priceRange", [filters.priceRange[0], newMax]);
                } else {
                  // If trying to cross, set max to current min to prevent crossing
                  onFilterChange("priceRange", [filters.priceRange[0], filters.priceRange[0]]);
                }
              }}
              // Give the right handle a higher z-index (or equal)
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider z-30" // Increased z-index from z-20
              style={{
                background: "transparent",
                pointerEvents: "auto",
              }}
            />
          </div>
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
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Hotel Type</h4>
        <div className="space-y-2">
          {["Budget", "Luxury", "Resort", "Hostel", "Premium"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
            >
              <input
                type="checkbox"
                checked={(filters.hotelTypes || []).includes(type)}
                onChange={(e) => {
                  const newTypes = e.target.checked
                    ? [...filters.hotelTypes, type]
                    : filters.hotelTypes.filter((t) => t !== type);
                  onFilterChange("hotelTypes", newTypes);
                }}
                className="rounded border-gray-300 text-blue-600 "
              />
              <span className="select-none">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;