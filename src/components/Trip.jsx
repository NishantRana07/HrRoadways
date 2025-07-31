import React, { useState } from "react";
import { MapPin, Star, Moon, Eye } from "lucide-react";
import SidebarFilter from "./SidebarFilter";

const defaultLanguage = {
  filters: "Filters",
  priceRange: "Price Range (₹)",
  minRating: "Minimum Rating",
  perNight: "per night",
  hotels: "Hotels",
  noHotels: "No hotels found",
  priceLabel: (price) => `₹${price}`,
  bookNow: "Book Now",
};

const hotels = [
  {
    id: 1,
    name: "Hotel Saffron",
    location: "Kurukshetra, Haryana",
    address:
      "Sector 20, MAIT Complex, Near Railway Station, Kurukshetra, Haryana 136118",
    priceRange: [1900, 2300],
    rating: 4.2,
    numberOfReviews: 320, // ADDED: numberOfReviews for popularity logic
    type: "Premium",
    facilities: ["Free Wifi", "Parking", "Restaurant", "Room Service"],
    image: "https://r1imghtlak.mmtcdn.com/09c7c7e648bf11ea81fd0242ac110002.jpg",
    bookingLink: "https://www.makemytrip.com/hotels/hotel-details/",
  },
  {
    id: 2,
    name: "Hotel 9th Planet",
    location: "Kurukshetra, Haryana",
    address:
      "Plot No. 45, Sector 12, Industrial Area, Kurukshetra, Haryana 136118",
    priceRange: [1400, 1800],
    rating: 3.8,
    numberOfReviews: 180, // ADDED: numberOfReviews
    type: "Budget",
    facilities: ["Free Wifi", "AC", "Elevator", "24/7 Front Desk"],
    image:
      "https://r1imghtlak.mmtcdn.com/8a95a5f4bb4411eeb4fa0a58a9feac02.jpeg",
    bookingLink: "https://www.makemytrip.com/hotels/hotel-details/",
  },
  {
    id: 3,
    name: "Hotel Pearl Marc",
    location: "Kurukshetra, Haryana",
    address: "Main Road, Near Bus Stand, Kurukshetra, Haryana 136118",
    priceRange: [2500, 3000],
    rating: 4.4,
    numberOfReviews: 450, // ADDED: numberOfReviews
    type: "Luxury",
    facilities: ["Free Wifi", "Swimming Pool", "Spa", "Restaurant"],
    image:
      "https://pix8.agoda.net/hotelImages/228847/0/89dad00180168f8fca698caa5bbbb223.jpeg",
    bookingLink: "https://www.makemytrip.com/hotels/hotel-details/",
  },
  {
    id: 4,
    name: "Divine Clarks Inn",
    location: "Kurukshetra, Haryana",
    address: "Civil Lines, Near Railway Station, Kurukshetra, Haryana 136118",
    priceRange: [2800, 3500],
    rating: 4.5,
    numberOfReviews: 510, // ADDED: numberOfReviews
    type: "Luxury",
    facilities: ["Free Wifi", "Gym", "Restaurant", "Business Center"],
    image:
      "https://images.getaroom-cdn.com/image/upload/s---LyXwCWp--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1743786542/bf496c34140a06f88fe770636affd62520043c7d",
    bookingLink: "https://www.makemytrip.com/hotels/hotel-details/",
  },
  {
    id: 5,
    name: "Hotel Velga",
    location: "Kurukshetra, Haryana",
    address: "Near Police Station, Main Market, Kurukshetra, Haryana 136118",
    priceRange: [1700, 2000],
    rating: 3.9,
    numberOfReviews: 250, // ADDED: numberOfReviews
    type: "Budget",
    facilities: ["Free Wifi", "Restaurant", "Parking", "Room Service"],
    image:
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/671648265.jpg",
    bookingLink: "https://www.booking.com/searchresults.html",
  },
];

const HotelCard = ({ hotel, currentLanguage }) => {
  const getTypeColorClasses = (type) => {
    switch (type.toLowerCase()) {
      case "premium":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "budget":
        return "bg-green-100 text-green-700 border-green-200";
      case "luxury":
        return "bg-blue-200 text-blue-700 border-blue-200";
      case "resort":
        return "bg-cyan-100 text-cyan-700 border-cyan-200";
      case "hostel":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="bg-white  overflow-hidden border-b border-gray-200 mb-4">
      <div className="flex">
        <div className="relative w-64 h-56 flex-shrink-0">
          <img
            src={hotel.image}
            alt={`Image of ${hotel.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-medium border ${getTypeColorClasses(
                      hotel.type
                    )}`}
                  >
                    {hotel.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      {hotel.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({hotel.numberOfReviews} reviews) {/* CHANGED: Use hotel.numberOfReviews */}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-gray-600 mb-3">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{hotel.address}</span>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Facilities:</span>
                <div className="flex flex-wrap gap-1">
                  {hotel.facilities.map((facility, index) => (
                    <span key={index} className="text-gray-600">
                      {facility}
                      {index < hotel.facilities.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-1 ">
                <Moon className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600 pb-1">
                  {currentLanguage.perNight}
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {currentLanguage.priceLabel(hotel.priceRange[0])} -{" "}
                {currentLanguage.priceLabel(hotel.priceRange[1])}
              </div>
            </div>

            <div className="flex gap-3 mb-1">
              <a
                href={hotel.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keep the component name as Trip as requested
const Trip = ({ isHindi = false }) => {
  const [currentLanguage] = useState(defaultLanguage);
  const [filters, setFilters] = useState({
    priceRange: [0, 8000],
    minRating: 0,
    hotelTypes: [],
  });
  const [sortBy, setSortBy] = useState("popularity");

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 8000],
      minRating: 0,
      hotelTypes: [],
    });
  };

  const filteredHotels = hotels.filter((hotel) => {
    const [minPrice, maxPrice] = hotel.priceRange;
    const [selectedMin, selectedMax] = filters.priceRange;

    const isPriceOverlapping =
      maxPrice >= selectedMin && minPrice <= selectedMax;
    const isRatingOk = hotel.rating >= filters.minRating;
    const isTypeOk =
      filters.hotelTypes.length === 0 ||
      filters.hotelTypes.includes(hotel.type);

    return isPriceOverlapping && isRatingOk && isTypeOk;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case "priceLowToHigh":
        return a.priceRange[0] - b.priceRange[0];
      case "priceHighToLow":
        return b.priceRange[0] - a.priceRange[0];
      case "rating":
        return b.rating - a.rating;
      case "popularity":
        // FIXED LOGIC for popularity: Sort by numberOfReviews (desc), then by rating (desc) as tie-breaker
        if (b.numberOfReviews !== a.numberOfReviews) {
          return b.numberOfReviews - a.numberOfReviews;
        }
        return b.rating - a.rating; // Tie-breaker for same number of reviews
      default:
        // Default case for sortBy, e.g., if 'popularity' is not selected, fallback to rating
        return b.rating - a.rating;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto shadow-lg">
          <div className="p-6">
            <SidebarFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              currentLanguage={currentLanguage}
              onReset={handleReset}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white border border-gray-100 m- ml-0">
          <div className="p-6">
            <div className="flex items-center justify-between bg-gradient-to-r pb-4 bg-white overflow-hidden border-b border-gray-200 mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900 ">
                  {sortedHotels.length} Hotels in paharganj
                </h2>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">
                    Sort By
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-zinc-900 bg-white hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
            {/* THIS IS THE CORRECTED SECTION */}
            <div className="space-y-1"> {/* This div was present in the original correct code block */}
              {sortedHotels.length > 0 ? (
                sortedHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    currentLanguage={currentLanguage}
                  />
                ))
              ) : (
                <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                      <Star className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium text-lg mb-2">
                    {currentLanguage.noHotels}
                  </p>
                  <p className="text-gray-500">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// No export statement added, as requested.
// export default Trip; // Moved export to the very end as it was in your original snippet
export default Trip;