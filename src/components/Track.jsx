import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin, Phone, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom hook to fetch translations
const useTranslation = (isHindi) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const translationsUrl = 'https://jsonblob.com/api/jsonBlob/1338199785118818304';

  useEffect(() => {
    fetch(translationsUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentLanguage(isHindi ? data.hi : data.en);
      })
      .catch((error) => {
        console.error('Error fetching translations:', error);
      });
  }, [isHindi]);

  return currentLanguage;
};

const mockBusData = [
  {
    id: "HR-01-1234",
    routeNumber: "Delhi-Chandigarh Express",
    currentLocation: [28.7041, 77.1025],
    route: [
      [28.7041, 77.1025],
      [29.1042, 77.3124],
      [30.3752, 76.7821]
    ],
    speed: 65,
    nextStop: "Panipat",
    eta: 25,
    passengers: 32,
    capacity: 50,
    driver: "Rajesh Kumar",
    contact: "+91 98765-43210",
    status: "On Time"
  },
  {
    id: "HR-02-5678",
    routeNumber: "Gurgaon-Sonipat Express",
    currentLocation: [28.4595, 77.0266],
    route: [
      [28.4595, 77.0266],
      [28.6139, 77.2090],
      [28.9931, 77.0151]
    ],
    speed: 55,
    nextStop: "Rohini",
    eta: 15,
    passengers: 28,
    capacity: 45,
    driver: "Amit Singh",
    contact: "+91 98765-43211",
    status: "Delayed"
  }
];

const BusListItem = ({ bus, onClick, isSelected, language }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ scale: 1.02 }}
    onClick={() => onClick(bus)}
    className="bg-white rounded-lg p-4 cursor-pointer transition-all mb-4 shadow-lg hover:shadow-xl"
    style={{
      borderLeft: isSelected ? '4px solid #3b82f6' : '4px solid transparent',
    }}
  >
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: isSelected ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Bus color="#3b82f6" size={24} />
          </motion.div>
          <span className="font-bold text-lg">{language.routes[bus.routeNumber]}</span>
        </div>
        <div className="text-gray-600 mt-1">{bus.id}</div>
      </div>
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="px-3 py-1 rounded-full text-sm font-semibold"
        style={{
          backgroundColor: bus.status === 'On Time' ? '#dcfce7' : '#fef9c3',
          color: bus.status === 'On Time' ? '#166534' : '#854d0e'
        }}
      >
        {bus.status}
      </motion.div>
    </div>

    <div className="mt-4 grid grid-cols-3 gap-4">
      <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center p-2 bg-gray-50 rounded">
        <MapPin size={16} color="#3b82f6" />
        <span className="text-sm mt-1">{language.routes[bus.nextStop]}</span>
      </motion.div>
      <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center p-2 bg-gray-50 rounded">
        <Clock size={16} color="#3b82f6" />
        <span className="text-sm mt-1">{bus.eta} {language.minutes}</span>
      </motion.div>
      <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center p-2 bg-gray-50 rounded">
        <Users size={16} color="#3b82f6" />
        <span className="text-sm mt-1">{bus.passengers}/{bus.capacity}</span>
      </motion.div>
    </div>
  </motion.div>
);

const BusDetails = ({ bus, language }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    className="bg-white rounded-lg shadow-xl p-6 mt-6 overflow-hidden"
  >
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-blue-600">{language.routes[bus.routeNumber]}</h3>
      <div className="grid grid-cols-2 gap-6">
        <InfoCard
          icon={<Clock size={20} />}
          label={language.busInfo.speed}
          value={`${bus.speed} ${language.kmh}`}
        />
        <InfoCard
          icon={<MapPin size={20} />}
          label={language.busInfo.nextStop}
          value={language.routes[bus.nextStop]}
        />
        <InfoCard
          icon={<Clock size={20} />}
          label={language.busInfo.eta}
          value={`${bus.eta} ${language.minutes}`}
        />
        <InfoCard
          icon={<Users size={20} />}
          label={language.busInfo.passengers}
          value={`${bus.passengers}/${bus.capacity}`}
        />
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users size={20} color="#3b82f6" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{language.busInfo.driver}</div>
              <div className="font-semibold">{bus.driver}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Phone size={20} color="#3b82f6" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{language.busInfo.contact}</div>
              <div className="font-semibold">{bus.contact}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const InfoCard = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-gray-50 p-4 rounded-lg"
  >
    <div className="flex items-center gap-2 text-blue-600 mb-2">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <div className="font-semibold text-lg">{value}</div>
  </motion.div>
);

const LoadingSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
  />
);

const BusTracker = ({ isHindi = false }) => {
  const [activeBuses, setActiveBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const currentLanguage = useTranslation(isHindi);

  useEffect(() => {
    const fetchBusLocations = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActiveBuses(mockBusData);
      setLastUpdate(new Date());
      setLoading(false);
    };

    fetchBusLocations();
    const interval = setInterval(fetchBusLocations, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!currentLanguage) {
    return <div>Loading translations...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-xl p-8 mb-8 text-white bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-2"
          >
            {currentLanguage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-lg"
          >
            {currentLanguage.subtitle}
          </motion.p>
        </motion.div>

        {loading && activeBuses.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">{currentLanguage.loading}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold mb-6 text-gray-800"
              >
                {currentLanguage.activeBuses} ({activeBuses.length})
              </motion.h2>

              <AnimatePresence>
                {activeBuses.map(bus => (
                  <BusListItem
                    key={bus.id}
                    bus={bus}
                    onClick={setSelectedBus}
                    isSelected={selectedBus?.id === bus.id}
                    language={currentLanguage}
                  />
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:sticky lg:top-8">
              <AnimatePresence>
                {selectedBus && (
                  <BusDetails bus={selectedBus} language={currentLanguage} />
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BusTracker;