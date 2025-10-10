import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const SmartRoute = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFindRoutes = async () => {
    if (!source || !destination) {
      alert("Please enter both source and destination");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/smart-route", {
        source,
        destination,
      });
      setRoutes(res.data.routes);
    } catch (error) {
      console.error(error);
      alert("Error fetching routes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 bg-white rounded-2xl shadow-md max-w-xl mx-auto mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        🧭 Smart Route Suggestions
      </h2>

      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Enter Source"
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter Destination"
          className="border p-2 rounded-lg"
        />
        <button
          onClick={handleFindRoutes}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Finding..." : "Find Best Route"}
        </button>
      </div>

      <div className="space-y-3">
        {routes.map((r, index) => (
          <motion.div
            key={index}
            className="p-4 border rounded-lg bg-gray-50 shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold text-lg">{r.busName}</h3>
            <p>🚍 Time: {r.travelTime}</p>
            <p>🛣️ Distance: {r.distance}</p>
            <p>🌱 Mode: {r.type}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SmartRoute;
