import React, { useState } from "react";
import { MapPin, Star, Moon } from "lucide-react";
import SidebarFilter from "./SidebarFilter";

const defaultLanguage = {
  filters: "Filters",
  priceRange: "Price Range (₹)",
  minRating: "Minimum Rating",
  perNight: "per night",
  hotels: "Hotels",
  noHotels: "No hotels found",
  priceLabel: (price) => `₹${price}`,
};

const hotels = [
  {
    id: 1,
    name: "Hotel Saffron",
    location: "Kurukshetra, Haryana",
    priceRange: [1900, 2300],
    rating: 4.2,
    type: "Premium",
    image: "https://r1imghtlak.mmtcdn.com/09c7c7e648bf11ea81fd0242ac110002.jpg",
    bookingLink: "https://www.makemytrip.com/hotels/hotel-details/?hotelId=201409241303552966&_uCurrency=INR&checkin=date_2&checkout=date_3&city=CTXVT&cmp=SEM%7CD%7CDH%7CB%7CHname%7CDomestic_HName_RLSA_Exact_11%7C201409241303552966%7CRSA%7C&country=IN&lat=29.97464&lng=76.87196&locusId=CTXVT&locusType=city&msclkid=862c670674b615cd01220f8539c67404&rank=1&reference=hotel&roomStayQualifier=2e0e&searchText=Kurukshetra&topHtlId=201409241303552966&type=city&mtkeys=undefined&isPropSearch=T",
  },
  {
    id: 2,
    name: "Hotel 9th Planet",
    location: "Kurukshetra, Haryana",
    priceRange: [1400, 1800],
    rating: 3.8,
    type: "Budget",
    image: "https://r1imghtlak.mmtcdn.com/8a95a5f4bb4411eeb4fa0a58a9feac02.jpeg?&downsize=520:350&crop=520:350;0,85&output-format=webp&downsize=480:336&crop=480:336",
    bookingLink: "https://www.makemytrip.com/hotels/address-of-hotel_9th_planet-details-kurukshetra.html",
  },
  {
    id: 3,
    name: "Hotel Pearl Marc",
    location: "Kurukshetra, Haryana",
    priceRange: [2500, 3000],
    rating: 4.4,
    type: "Luxury",
    image: "https://pix8.agoda.net/hotelImages/228847/0/89dad00180168f8fca698caa5bbbb223.jpeg?s=1024x",
    bookingLink: "https://www.makemytrip.com/hotels/hotel_pearl_marc-details-kurukshetra.html",
  },
  {
    id: 4,
    name: "Divine Clarks Inn",
    location: "Kurukshetra, Haryana",
    priceRange: [2800, 3500],
    rating: 4.5,
    type: "Luxury",
    image: "https://images.getaroom-cdn.com/image/upload/s---LyXwCWp--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1743786542/bf496c34140a06f88fe770636affd62520043c7d?_a=BACAEuDL&atc=e7cd1cfa",
    bookingLink: "https://www.makemytrip.com/hotels/hotel-details/?hotelId=201808171453277910&_uCurrency=INR&checkin=date_2&checkout=date_3&city=CTXVT&cmp=SEM%7CD%7CDH%7CB%7CHname%7CDomestic_HName_RLSA_Exact_11%7C201808171453277910%7CRSA%7C&country=IN&lat=29.97527&lng=76.86694&locusId=CTXVT&locusType=city&msclkid=f799946b969211366aecfce8dae88563&rank=1&reference=hotel&roomStayQualifier=2e0e&searchText=Kurukshetra&topHtlId=201808171453277910&type=city&mtkeys=undefined&isPropSearch=T",
  },
  {
    id: 5,
    name: "Hotel Velga",
    location: "Kurukshetra, Haryana",
    priceRange: [1700, 2000],
    rating: 3.9,
    type: "Budget",
    image: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/671648265.jpg?k=6000fe5f72777b885acd7e1b67dd717a3802305370a05fc5590afef4bf1b75f6&o=&s=375x",
    bookingLink: "https://www.booking.com/searchresults.html?aid=357028&label=bin859jc-1DCAsobEIFdmVsZ2FIM1gDaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AtOZjcQGwAIB0gIkZjEzZTM4YmYtZDllNy00ZjM2LWJiYWQtYzI4MzJiNzk0Yzgx2AIE4AIB&highlighted_hotels=13956451&checkin=2025-07-27&redirected=1&city=900059969&hlrd=user_sh&source=hotel&checkout=2025-07-28&keep_landing=1&sid=14a040bd03e7ea30ddf362acc337333d",
  },
  
];

const HotelCard = ({ hotel, currentLanguage }) => (
  <div className="bg-white rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-2 border-blue-100 flex flex-col">
    <div className="relative">
      <img
        src={hotel.image}
        alt={`Image of ${hotel.name}`}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 border-2 border-blue-500">
        <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
        <span
          className="text-sm font-bold"
          aria-label={`Rating: ${hotel.rating} stars`}
          title={`${hotel.rating} stars`}
        >
          {hotel.rating}
        </span>
      </div>
    </div>

    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{hotel.name}</h3>

      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <MapPin className="w-4 h-4 text-blue-500" />
        <span className="text-sm">{hotel.location}</span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium"
          title={`Hotel type: ${hotel.type}`}
        >
          {hotel.type}
        </span>

        <div className="flex items-center gap-1">
          <Moon className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">{currentLanguage.perNight}</span>
        </div>
      </div>

      <div
        className="text-blue-600 font-bold text-lg"
        aria-label={`Price range: ₹${hotel.priceRange[0]} to ₹${hotel.priceRange[1]}`}
      >
        {currentLanguage.priceLabel(hotel.priceRange[0])} -{" "}
        {currentLanguage.priceLabel(hotel.priceRange[1])}
      </div>

      {hotel.bookingLink && hotel.bookingLink.startsWith("https://") ? (
        <a
          href={hotel.bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Book ${hotel.name} now`}
          title={`Book ${hotel.name} now`}
          className="mt-4 inline-block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Book Now
        </a>
      ) : (
        <button
          className="mt-4 inline-block text-center bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
          disabled
          aria-label="Booking link not available"
          title="Booking link not available"
        >
          Booking Unavailable
        </button>
      )}
    </div>
  </div>
);

const Trip = ({ isHindi = false }) => {
  const [currentLanguage] = useState(defaultLanguage);
  const [filters, setFilters] = useState({
    priceRange: [500, 8000],
    minRating: 0,
    hotelTypes: [],
  });

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
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
    return (
      minPrice >= filters.priceRange[0] &&
      maxPrice <= filters.priceRange[1] &&
      hotel.rating >= filters.minRating &&
      (filters.hotelTypes.length === 0 || filters.hotelTypes.includes(hotel.type))
    );
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
              onReset={handleReset}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-blue-500 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">{currentLanguage.hotels}</h2>
              </div>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                {filteredHotels.length} {currentLanguage.hotels}
              </span>
            </div>
            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} currentLanguage={currentLanguage} />
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
