import React, {useState} from "react";
import {MapPin, Star, Moon, Wifi, Car, Utensils, Dumbbell, Eye} from "lucide-react";
import SidebarFilter from "./SidebarFilter";

const defaultLanguage = {
  filters: "Filters",
  priceRange: "Price Range (₹)",
  minRating: "Minimum Rating",
  perNight: "per night",
  hotels: "Hotels",
  noHotels: "No hotels found",
  priceLabel: (price) => `₹${price}`,
  viewDetails: "View Details",
  bookNow: "Book Now",
  facilities: "Facilities",
};

const hotels = [
  {
    id: 1,
    name: "Hotel Saffron",
    location: "Kurukshetra, Haryana",
    address: "Sector 20, MAIT Complex, Near Railway Station, Kurukshetra, Haryana 136118",
    priceRange: [1900, 2300],
    rating: 4.2,
    type: "Premium",
    facilities: ["Free Wifi", "Parking", "Restaurant", "Room Service"],
    image: "https://r1imghtlak.mmtcdn.com/09c7c7e648bf11ea81fd0242ac110002.jpg",
    bookingLink:
      "https://www.makemytrip.com/hotels/hotel-details/?hotelId=201409241303552966&_uCurrency=INR&checkin=date_2&checkout=date_3&city=CTXVT&cmp=SEM%7CD%7CDH%7CB%7CHname%7CDomestic_HName_RLSA_Exact_11%7C201409241303552966%7CRSA%7C&country=IN&lat=29.97464&lng=76.87196&locusId=CTXVT&locusType=city&msclkid=862c670674b615cd01220f8539c67404&rank=1&reference=hotel&roomStayQualifier=2e0e&searchText=Kurukshetra&topHtlId=201409241303552966&type=city&mtkeys=undefined&isPropSearch=T",
  },
  {
    id: 2,
    name: "Hotel 9th Planet",
    location: "Kurukshetra, Haryana",
    address: "Plot No. 45, Sector 12, Industrial Area, Kurukshetra, Haryana 136118",
    priceRange: [1400, 1800],
    rating: 3.8,
    type: "Budget",
    facilities: ["Free Wifi", "AC", "Elevator", "24/7 Front Desk"],
    image:
      "https://r1imghtlak.mmtcdn.com/8a95a5f4bb4411eeb4fa0a58a9feac02.jpeg?&downsize=520:350&crop=520:350;0,85&output-format=webp&downsize=480:336&crop=480:336",
    bookingLink:
      "https://www.makemytrip.com/hotels/address-of-hotel_9th_planet-details-kurukshetra.html",
  },
  {
    id: 3,
    name: "Hotel Pearl Marc",
    location: "Kurukshetra, Haryana",
    address: "NH-1, Grand Trunk Road, Near Bus Stand, Kurukshetra, Haryana 136118",
    priceRange: [2500, 3000],
    rating: 4.4,
    type: "Luxury",
    facilities: ["Free Wifi", "Swimming Pool", "Spa", "Gym", "Valet Parking"],
    image:
      "https://pix8.agoda.net/hotelImages/228847/0/89dad00180168f8fca698caa5bbbb223.jpeg?s=1024x",
    bookingLink:
      "https://www.makemytrip.com/hotels/hotel_pearl_marc-details-kurukshetra.html",
  },
  {
    id: 4,
    name: "Divine Clarks Inn",
    location: "Kurukshetra, Haryana",
    address: "Plot 234, Sector 7, Near Brahma Sarovar, Kurukshetra, Haryana 136118",
    priceRange: [2800, 3500],
    rating: 4.5,
    type: "Luxury",
    facilities: ["Free Wifi", "Restaurant", "Bar", "Conference Room", "Laundry"],
    image:
      "https://images.getaroom-cdn.com/image/upload/s---LyXwCWp--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1743786542/bf496c34140a06f88fe770636affd62520043c7d?_a=BACAEuDL&atc=e7cd1cfa",
    bookingLink:
      "https://www.makemytrip.com/hotels/hotel-details/?hotelId=201808171453277910&_uCurrency=INR&checkin=date_2&checkout=date_3&city=CTXVT&cmp=SEM%7CD%7CDH%7CB%7CHname%7CDomestic_HName_RLSA_Exact_11%7C201808171453277910%7CRSA%7C&country=IN&lat=29.97527&lng=76.86694&locusId=CTXVT&locusType=city&msclkid=f799946b969211366aecfce8dae88563&rank=1&reference=hotel&roomStayQualifier=2e0e&searchText=Kurukshetra&topHtlId=201808171453277910&type=city&mtkeys=undefined&isPropSearch=T",
  },
  {
    id: 5,
    name: "Hotel Velga",
    location: "Kurukshetra, Haryana",
    address: "Main Market Road, Near Government Hospital, Kurukshetra, Haryana 136118",
    priceRange: [1700, 2000],
    rating: 3.9,
    type: "Budget",
    facilities: ["Free Wifi", "Restaurant", "Parking", "Room Service"],
    image:
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/671648265.jpg?k=6000fe5f72777b885acd7e1b67dd717a3802305370a05fc5590afef4bf1b75f6&o=&s=375x",
    bookingLink:
      "https://www.booking.com/searchresults.html?aid=357028&label=bin859jc-1DCAsobEIFdmVsZ2FIM1gDaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AtOZjcQGwAIB0gIkZjEzZTM4YmYtZDllNy00ZjM2LWJiYWQtYzI4MzJiNzk0Yzgx2AIE4AIB&highlighted_hotels=13956451&checkin=2025-07-27&redirected=1&city=900059969&hlrd=user_sh&source=hotel&checkout=2025-07-28&keep_landing=1&sid=14a040bd03e7ea30ddf362acc337333d",
  },
];

const HotelCard = ({hotel, currentLanguage}) => (
  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 mb-4">
    <div className="flex">
      {/* Hotel Image */}
      <div className="relative w-64 h-48 flex-shrink-0">
        <img
          src={hotel.image}
          alt={`Image of ${hotel.name}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hotel Details */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Hotel Name and Type */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  {hotel.type}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    {hotel.rating}
                  </span>
                  <span className="text-sm text-gray-500">({Math.floor(Math.random() * 500) + 100} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 text-gray-600 mb-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm leading-relaxed">{hotel.address}</span>
          </div>

          {/* Facilities */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Facilities:</span>
              <div className="flex flex-wrap gap-1">
                {hotel.facilities.map((facility, index) => (
                  <span key={index} className="text-gray-600">
                    {facility}{index < hotel.facilities.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Moon className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">{currentLanguage.perNight}</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {currentLanguage.priceLabel(hotel.priceRange[0])} - {currentLanguage.priceLabel(hotel.priceRange[1])}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              className="px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
              aria-label={`View details for ${hotel.name}`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {currentLanguage.viewDetails}
              </div>
            </button>
            
            {hotel.bookingLink && hotel.bookingLink.startsWith("https://") ? (
              <a
                href={hotel.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                aria-label={`Book ${hotel.name} now`}
              >
                {currentLanguage.bookNow}
              </a>
            ) : (
              <button
                className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
                disabled
                aria-label="Booking link not available"
              >
                Booking Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Trip = ({isHindi = false}) => {
  const [currentLanguage] = useState(defaultLanguage);
  const [filters, setFilters] = useState({
    priceRange: [500, 8000],
    minRating: 0,
    hotelTypes: [],
  });

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({...prev, [type]: value}));
  };

  const handleReset = () => {
    setFilters({
      priceRange: [500, 8000],
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Sidebar - Independent Scrolling */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          <div className="p-6">
            <SidebarFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              currentLanguage={currentLanguage}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Right Content Area - Independent Scrolling */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredHotels.length} OYOs in paharganj
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Map View</span>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="sr-only" />
                    <div className="block bg-blue-600 w-12 h-6 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-6"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort By</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Hotel Listings */}
            <div className="space-y-4">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    currentLanguage={currentLanguage}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-600 font-medium text-lg">
                    {currentLanguage.noHotels}
                  </p>
                  <p className="text-gray-500 mt-2">
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

export default Trip;
