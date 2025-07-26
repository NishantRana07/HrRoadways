import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Star, Moon, Phone, Mail, Wifi, Car, Coffee, Utensils, ArrowLeft, Calendar, Clock, Users, Shield } from "lucide-react";
import { hotels } from "../data/hotelsData.js";

// Default translations
const defaultLanguage = {
  backToHotels: "Back to Hotels",
  aboutHotel: "About This Hotel",
  amenities: "Amenities",
  features: "Special Features",
  contact: "Contact Information",
  gallery: "Gallery",
  bookNow: "Book Now",
  priceLabel: (price) => `₹${price}`,
  perNight: "per night",
  phone: "Phone",
  email: "Email",
  hotelNotFound: "Hotel not found",
  goBack: "Go Back",
};

const HotelDetail = ({ isHindi = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [selectedImage, setSelectedImage] = useState(0);

  const hotel = hotels.find(h => h.id === parseInt(id));

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentLanguage.hotelNotFound}</h2>
          <button
            onClick={() => navigate('/trip')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            {currentLanguage.goBack}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/trip')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            {currentLanguage.backToHotels}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <img
                  src={hotel.gallery[selectedImage]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 border-2 border-blue-500">
                  <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                  <span className="text-sm font-bold">{hotel.rating}</span>
                </div>
              </div>
              
              {/* Gallery Thumbnails */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {hotel.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${hotel.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span className="text-lg">{hotel.location}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  {currentLanguage.aboutHotel}
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{hotel.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  {currentLanguage.amenities}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Features */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  {currentLanguage.features}
                </h3>
                <div className="space-y-3">
                  {hotel.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <Star className="w-5 h-5 text-blue-500 fill-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {currentLanguage.priceLabel(hotel.pricePerNight)}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Moon className="w-4 h-4" />
                    <span>{currentLanguage.perNight}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {currentLanguage.bookNow}
                </button>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                  {currentLanguage.contact}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{currentLanguage.phone}</div>
                      <div className="font-semibold text-gray-900">{hotel.contact.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{currentLanguage.email}</div>
                      <div className="font-semibold text-gray-900">{hotel.contact.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
