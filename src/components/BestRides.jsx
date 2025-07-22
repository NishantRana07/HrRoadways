import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  MapPin,
  Users,
  Shield,
  Sparkles,
  Camera,
  Check,
  X,
} from "lucide-react";

import { bestRoutes } from "../data/BestRoutes";
import { fleetInfo } from "../data/fleetInfo";
import { features, statistics } from "../data/statsAndFeatures";

const BestRides = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("routes");
  const [showBookingAlert, setShowBookingAlert] = useState(false);
  const [showFleetModal, setShowFleetModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleBooking = () => {
    setShowBookingAlert(true);
    setTimeout(() => setShowBookingAlert(false), 3000);
  };

  const RouteCard = ({ route }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={route.image}
          alt={`${route.from} to ${route.to}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">{route.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {route.from} → {route.to}
          </h3>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {route.seatsAvailable} seats left
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{route.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{route.distance}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {route.amenities.map((amenity, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-2xl font-bold text-blue-600">
              {route.price}
            </div>
            <button
              onClick={() => handleBooking(route.id)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </div>

        {selectedRoute === route.id && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Premium Features
              </span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              {route.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const FleetCard = ({ fleet }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 relative">
      <div className="relative">
        <img
          src={fleet.image}
          alt={fleet.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{fleet.name}</h3>
        <div className="flex flex-col space-y-2 mt-4 text-gray-600">
          <div>Capacity: {fleet.capacity}</div>
          <div>{fleet.age}</div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-75 transition-all duration-300 flex flex-col justify-center items-center text-white p-4 overflow-y-auto opacity-0 hover:opacity-100">
        <h4 className="text-lg font-semibold mb-2">Features:</h4>
        <ul className="space-y-1">
          {fleet.features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <h4 className="text-lg font-semibold mt-4 mb-2">Safety:</h4>
        <ul className="space-y-1">
          {fleet.safety.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {showBookingAlert && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
          <div className="text-green-800">
            Booking initiated successfully! Our team will contact you shortly.
          </div>
        </div>
      )}

      <div className="relative h-96 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center pb-8">
          {" "}
          {/* Added padding-bottom */}
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              Experience Premium Travel
            </h1>
            <p className="text-xl mb-8">
              Discover why our premium routes offer the best travel experience
              in Haryana
            </p>
            <button
              onClick={() => setShowFleetModal(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-all"
            >
              <Camera className="w-5 h-5" />
              <span>Our Fleet</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8 border-b">
          {["routes", "fleet", "features"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transform transition-all hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeTab === "routes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        )}

        {activeTab === "fleet" && (
          <div className="space-y-8">
            {fleetInfo.map((fleet) => (
              <FleetCard key={fleet.id} fleet={fleet} />
            ))}
          </div>
        )}

        {activeTab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {" "}
            {/* Added padding-top */}
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-center space-x-2 text-gray-700"
                    >
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fleet Modal */}
      {showFleetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full overflow-y-auto max-h-screen">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowFleetModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fleetInfo.map((fleet) => (
                <FleetCard key={fleet.id} fleet={fleet} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestRides;
