// src/components/PopularRoutes.jsx
import React, { useState, useEffect } from 'react';
import { ArrowRight, Map, Clock, DollarSign, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const popularRoutes = [
  {
    id: 1,
    src: 'Chandigarh',
    dest: 'Delhi',
    time: '2h 30m',
    fare: '₹450',
    frequency: 'Every 30 mins',
    details: {
      distance: '250 km',
      type: 'Intercity',
      busTypes: ['AC', 'Non-AC', 'Sleeper']
    }
  },
  {
    id: 2,
    src: 'Gurugram',
    dest: 'Panipat',
    time: '1h 45m',
    fare: '₹250',
    frequency: 'Every 45 mins',
    details: {
      distance: '120 km',
      type: 'Regional',
      busTypes: ['Express', 'Ordinary']
    }
  },
  {
    id: 3,
    src: 'Faridabad',
    dest: 'Hisar',
    time: '3h',
    fare: '₹500',
    frequency: 'Every hour',
    details: {
      distance: '300 km',
      type: 'Long Distance',
      busTypes: ['Super Deluxe', 'AC']
    }
  },
  {
    id: 4,
    src: 'Rohtak',
    dest: 'Ambala',
    time: '2h 15m',
    fare: '₹350',
    frequency: 'Every hour',
    details: {
      distance: '180 km',
      type: 'Intercity',
      busTypes: ['Express', 'AC']
    }
  }
];

const PopularRoutes = ({ onRouteClick }) => {
  const { t } = useTranslation();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRouteIndex((prev) => (prev + 1) % popularRoutes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-5 dark:bg-gray-950 dark:text-white">
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">{t('popularRoutes')}</h3>
        <Map className="w-6 h-6" />
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {popularRoutes.map((route, index) => (
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
                  }}  // Call the function passed via props
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="font-bold text-blue-800">{route.src}</div>
                      <ArrowRight className="w-5 h-5 text-blue-600 my-1" />
                      <div className="font-bold text-blue-800">{route.dest}</div>
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
          ))}
        </AnimatePresence>

        {selectedRoute && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-blue-50 p-4 rounded-lg"
          >
            <h4 className="text-lg font-semibold mb-3 text-blue-800">{t('routeDetails')}</h4>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <div>
                <strong>{t('distance')}:</strong> {selectedRoute.details.distance}
              </div>
              <div>
                <strong>{t('routeType')}:</strong> {selectedRoute.details.type}
              </div>
              <div>
                <strong>{t('availableBusTypes')}:</strong>
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