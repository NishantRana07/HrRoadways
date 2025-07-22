// src/components/PopularRoutes.jsx
import { useState, useEffect } from "react";
import { ArrowRight, Map, Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRupeeSign } from "react-icons/fa";
import { popularRoutes } from "../data/popularRoutes";

const PopularRoutes = ({ onRouteClick }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRouteIndex((prev) => (prev + 1) % popularRoutes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Popular Routes</h3>
        <Map className="w-6 h-6" />
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {popularRoutes.map(
            (route, index) =>
              index === activeRouteIndex && (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div
                    className="flex items-center justify-between bg-blue-50 p-4 rounded-lg cursor-pointer hover:bg-blue-100 transition"
                    onClick={() => {
                      setSelectedRoute(route);
                      onRouteClick(route);
                    }} // Call the function passed via props
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-bold text-blue-800">
                          {route.src}
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-600 my-1" />
                        <div className="font-bold text-blue-800">
                          {route.dest}
                        </div>
                      </div>
                      <div className="border-l pl-4 space-y-2 text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{route.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaRupeeSign className="w-4 h-4 text-green-500" />
                          <span>{route.fare}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-red-500" />
                          <span>{route.frequency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {selectedRoute && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-blue-50 p-4 rounded-lg"
          >
            <h4 className="text-lg font-semibold mb-3 text-blue-800">
              Route Details
            </h4>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <div>
                <strong>Distance:</strong> {selectedRoute.details.distance}
              </div>
              <div>
                <strong>Route Type:</strong> {selectedRoute.details.type}
              </div>
              <div>
                <strong>Available Bus Types:</strong>
                <div className="flex space-x-2 mt-1">
                  {selectedRoute.details.busTypes.map((type) => (
                    <span
                      key={type}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PopularRoutes;
