import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Bus, Clock, MapPin, Phone, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import translations from "../assets/translations.json";

// Make sure you have: npm i react-leaflet leaflet
// And import Leaflet CSS globally: @import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SpeedGauge = ({ speed }) => (
  <div className="w-20 h-20">
    <CircularProgressbar
      value={speed}
      maxValue={120}
      text={`${speed} km/h`}
      styles={buildStyles({
        textSize: "8px",
        pathColor: speed > 80 ? "#ef4444" : "#3b82f6",
        textColor: "#111",
        trailColor: "#ddd",
      })}
    />
  </div>
);

const BusMarker = () => (
  <motion.div
    className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg"
    animate={{ scale: [1, 1.4, 1] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
  />
);

const markerIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div id="pulse-marker"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

// ----------------- Mock Data (unchanged) -----------------
const mockBusData = [
  {
    id: "HR-01-1234",
    routeNumber: "Delhi-Chandigarh Express",
    currentLocation: [28.7041, 77.1025],
    route: [
      [28.7041, 77.1025],
      [29.1042, 77.3124],
      [30.3752, 76.7821],
    ],
    speed: 65,
    nextStop: "Panipat",
    eta: 25,
    passengers: 32,
    capacity: 50,
    driver: { en: "Rajesh Kumar", hi: "राजेश कुमार" },
    contact: "+91 98765-43210",
    status: "On Time",
  },
  {
    id: "HR-02-5678",
    routeNumber: "Gurgaon-Sonipat Express",
    currentLocation: [28.4595, 77.0266],
    route: [
      [28.4595, 77.0266],
      [28.6139, 77.209],
      [28.9931, 77.0151],
    ],
    speed: 55,
    nextStop: "Rohini",
    eta: 15,
    passengers: 28,
    capacity: 45,
    driver: { en: "Amit Singh", hi: "अमित सिंह" },
    contact: "+91 98765-43211",
    status: "Delayed",
  },
  {
    id: "HR-03-7890",
    routeNumber: "Delhi-Hisar Express",
    currentLocation: [29.1492, 75.7217],
    route: [
      [28.7041, 77.1025],
      [28.893, 76.234],
      [29.1492, 75.7217],
    ],
    speed: 50,
    nextStop: "Jhajjar",
    eta: 30,
    passengers: 35,
    capacity: 50,
    driver: { en: "Suresh Yadav", hi: "सुरेश यादव" },
    contact: "+91 98765-43212",
    status: "On Time",
  },
  {
    id: "HR-04-2468",
    routeNumber: "Chandigarh-Ambala Express",
    currentLocation: [30.3752, 76.7821],
    route: [
      [30.7333, 76.7794],
      [30.5204, 76.6505],
      [30.3752, 76.7821],
    ],
    speed: 45,
    nextStop: "Dera Bassi",
    eta: 10,
    passengers: 22,
    capacity: 40,
    driver: { en: "Mohit Verma", hi: "मोहित वर्मा" },
    contact: "+91 98765-43213",
    status: "On Time",
  },
];

// ----------------- Utilities -----------------
const highlightText = (text) => {
  const highlights = {
    Delhi: "#1e40af",
    Chandigarh: "#059669",
    Gurgaon: "#f59e0b",
    Sonipat: "#d97706",
    Express: "#2563eb",
  };
  return text.split(" ").map((word, index) => {
    const color = highlights[word];
    return (
      <span
        key={index}
        style={{ color: color || "#1e3a8a", fontWeight: "bold" }}
      >
        {word}&nbsp;
      </span>
    );
  });
};

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// ----------------- Skeletons -----------------
const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const ListItemSkeleton = () => (
  <div className="bg-white rounded-lg p-4 mb-4 shadow-lg ">
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SkeletonBlock className="w-6 h-6 rounded-full" />
        <SkeletonBlock className="w-48 h-4" />
      </div>
      <SkeletonBlock className="w-20 h-6 rounded-full" />
    </div>
    <div className="mt-4 grid grid-cols-3 gap-4">
      <SkeletonBlock className="h-10" />
      <SkeletonBlock className="h-10" />
      <SkeletonBlock className="h-10" />
    </div>
  </div>
);

const DetailsSkeleton = () => (
  <div className="bg-white rounded-lg shadow-xl p-6 mt-6">
    <SkeletonBlock className="h-6 w-64 mb-6" />
    <div className="grid grid-cols-2 gap-6">
      <SkeletonBlock className="h-20" />
      <SkeletonBlock className="h-20" />
      <SkeletonBlock className="h-20" />
      <SkeletonBlock className="h-20" />
    </div>
    <div className="mt-6 h-64 w-full rounded-lg overflow-hidden">
      <SkeletonBlock className="h-full w-full" />
    </div>
  </div>
);

// ----------------- Info Card -----------------
const InfoCard = ({ icon, label, value }) => {
  const numberStyle = { color: "#1d4ed8", fontWeight: "bold" };
  const coloredValue =
    typeof value === "string"
      ? value.split(/(\d+)/).map((part, i) =>
          /^\d+$/.test(part) ? (
            <span key={i} style={numberStyle}>
              {part}
            </span>
          ) : (
            part
          )
        )
      : value;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 dark:text-white"
    >
      <div className="flex items-center gap-2 text-blue-600 mb-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="font-semibold text-lg">{coloredValue}</div>
    </motion.div>
  );
};

// ----------------- Passenger Progress Bar -----------------
const CapacityBar = ({ passengers, capacity }) => {
  const pct = useMemo(
    () =>
      Math.round(
        (clamp(passengers, 0, capacity) / Math.max(capacity, 1)) * 100
      ),
    [passengers, capacity]
  );
  const barColor =
    pct < 60 ? "bg-green-500" : pct < 85 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div
      aria-label={`Occupancy ${passengers} of ${capacity} (${pct}%)`}
      className="w-full"
    >
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>Seats</span>
        <span>
          {passengers}/{capacity}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className={`h-2 ${barColor} rounded`}
          style={{ width: `${pct}%`, transition: "width 300ms ease" }}
        />
      </div>
    </div>
  );
};

// ----------------- Bus List Item -----------------
const BusListItem = ({ bus, onSelect, isSelected, language, index }) => {
  return (
    <motion.div
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select bus ${bus.id} on route ${bus.routeNumber}`}
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(index)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(index)}
      className="bg-white rounded-lg p-4 cursor-pointer transition-all mb-4 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      style={{
        borderLeft: isSelected ? "4px solid #3b82f6" : "4px solid transparent",
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: isSelected ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Bus color="#3b82f6" size={24} aria-hidden="true" />
            </motion.div>
            <span className="font-bold text-lg">
              {highlightText(bus.routeNumber)}
            </span>
          </div>
          <div className="text-gray-600 mt-1">{bus.id}</div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: bus.status === "On Time" ? "#dcfce7" : "#fef9c3",
            color: bus.status === "On Time" ? "#166534" : "#854d0e",
          }}
          aria-label={`Status: ${bus.status}`}
        >
          {bus.status}
        </motion.div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="flex flex-col items-center p-2 bg-gray-50 rounded"
        >
          <MapPin size={16} color="#3b82f6" aria-hidden="true" />
          <span
            className="text-sm mt-1 font-semibold"
            style={{ color: "#0f766e" }}
          >
            {language.trackerRoutes[bus.nextStop] || bus.nextStop}
          </span>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="flex flex-col items-center p-2 bg-gray-50 rounded"
        >
          <Clock size={16} color="#3b82f6" aria-hidden="true" />
          <span
            className="text-sm mt-1 font-semibold"
            style={{ color: "#1e40af" }}
          >
            {bus.eta} {language.trackerMinutes}
          </span>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="flex flex-col items-center p-2 bg-gray-50 rounded w-full"
        >
          <Users size={16} color="#3b82f6" aria-hidden="true" />
          <div className="w-full mt-1">
            <CapacityBar passengers={bus.passengers} capacity={bus.capacity} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ----------------- Bus Details (with Map) -----------------
const BusDetails = ({ bus, language, isHindi }) => {
  const routeLatLng = useMemo(
    () => bus.route.map(([lat, lng]) => ({ lat, lng })),
    [bus.route]
  );

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white rounded-lg shadow-xl p-6 mt-6 overflow-hidden dark:bg-gray-950 dark:text-white"
      aria-live="polite"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-blue-600">
          {highlightText(bus.routeNumber)}
        </h3>

        <div className="grid grid-cols-2 gap-6 dark:bg-gray-950 dark:text-white">
          <InfoCard
            icon={<Clock size={20} />}
            label={language.busInfo.speed}
            value={<SpeedGauge speed={bus.speed} />}
          />

          <InfoCard
            icon={<MapPin size={20} />}
            label={language.busInfo.nextStop}
            value={
              <span style={{ color: "#0f766e", fontWeight: "bold" }}>
                {language.trackerRoutes[bus.nextStop] || bus.nextStop}
              </span>
            }
          />
          <InfoCard
            icon={<Clock size={20} />}
            label={language.busInfo.eta}
            value={`${bus.eta} ${language.trackerMinutes}`}
          />
          <InfoCard
            icon={<Users size={20} />}
            label={language.busInfo.passengers}
            value={
              <CapacityBar
                passengers={bus.passengers}
                capacity={bus.capacity}
              />
            }
          />
        </div>

        {/* Map */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div
            className="h-64 w-full rounded-lg overflow-hidden ring-1 ring-gray-100"
            aria-label="Route map"
            role="img"
          >
            <MapContainer
              center={{
                lat: bus.currentLocation[0],
                lng: bus.currentLocation[1],
              }}
              zoom={9}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Polyline
                positions={routeLatLng}
                color="#2563eb"
                weight={4}
                opacity={0.8}
              />
              <Marker
                position={{
                  lat: bus.currentLocation[0],
                  lng: bus.currentLocation[1],
                }}
                icon={markerIcon}
              />
            </MapContainer>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users size={20} color="#3b82f6" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm text-gray-600">
                {language.busInfo.driver}
              </div>
              <div className="font-semibold" style={{ color: "#1e40af" }}>
                {isHindi ? bus.driver.hi : bus.driver.en}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Phone size={20} color="#3b82f6" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm text-gray-600">
                {language.busInfo.contact}
              </div>
              <div className="font-semibold" style={{ color: "#059669" }}>
                {bus.contact}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ----------------- Main Component -----------------
const BusTracker = ({ isHindi = false }) => {
  const [activeBuses, setActiveBuses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdatedSecs, setLastUpdatedSecs] = useState(0);

  const listContainerRef = useRef(null);
  const language = isHindi ? translations.hi : translations.en;

  // Fetch mock data + "last updated" timer
  const fetchBusLocations = useCallback(async () => {
    setLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 900));
    setActiveBuses(mockBusData);
    setLoading(false);
    setLastUpdatedSecs(0);
  }, []);

  useEffect(() => {
    fetchBusLocations();
    const refetchInterval = setInterval(fetchBusLocations, 30000); // every 30s
    return () => clearInterval(refetchInterval);
  }, [fetchBusLocations]);

  useEffect(() => {
    const t = setInterval(() => setLastUpdatedSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Keyboard navigation (Up/Down to move, Enter/Space to select)
  const handleKeyNav = (e) => {
    if (!activeBuses.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => clamp(i + 1, 0, activeBuses.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => clamp(i - 1, 0, activeBuses.length - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSelectedIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSelectedIndex(activeBuses.length - 1);
    }
  };

  const selectByIndex = (i) => setSelectedIndex(i);
  const selectedBus = activeBuses[selectedIndex] || null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-xl p-8 mb-8 text-white bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-2"
          >
            {language.trackerTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-lg"
          >
            {language.trackerSubtitle}
          </motion.p>

          {/* Last updated timer (ARIA live) */}
          <div className="mt-4 text-sm text-blue-100" aria-live="polite">
            {`Last updated: ${lastUpdatedSecs}s ago`}
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 dark:bg-gray-950 dark:text-white">
          {/* Left: List */}
          <div
            ref={listContainerRef}
            role="listbox"
            aria-label="Active buses"
            tabIndex={0}
            onKeyDown={handleKeyNav}
            className="focus:outline-none"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold mb-6 text-gray-800"
            >
              {language.trackerActiveBuses} ({loading ? 0 : activeBuses.length})
            </motion.h2>

            {/* Skeletons or List */}
            {loading ? (
              <>
                <ListItemSkeleton />
                <ListItemSkeleton />
              </>
            ) : (
              <AnimatePresence>
                {activeBuses.map((bus, i) => (
                  <BusListItem
                    key={bus.id}
                    bus={bus}
                    index={i}
                    onSelect={selectByIndex}
                    isSelected={selectedIndex === i}
                    language={language}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:sticky lg:top-8 ">
            <AnimatePresence>
              {loading ? (
                <DetailsSkeleton />
              ) : selectedBus ? (
                <BusDetails
                  bus={selectedBus}
                  language={language}
                  isHindi={isHindi}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusTracker;
