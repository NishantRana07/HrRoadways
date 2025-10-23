import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Path to Haryana.json (bus database)
const dbPath = path.join(process.cwd(), "Databases/State_Database/Haryana.json");

// Helper function to calculate distance between two points using Google Maps API
const getDistanceMatrix = async (origins, destinations) => {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return null;
  }

  try {
    const originParams = origins.map(encodeURIComponent).join("|");
    const destinationParams = destinations.map(encodeURIComponent).join("|");
    const gmapUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originParams}&destinations=${destinationParams}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(gmapUrl);
    return response.data;
  } catch (error) {
    console.error("Google Maps API Error:", error.message);
    return null;
  }
};

// Helper function to find direct bus routes between two cities
const findDirectRoutes = (source, destination, db) => {
  return db.buses
    .filter(
      (b) =>
        b.route.toLowerCase().includes(source.toLowerCase()) &&
        b.route.toLowerCase().includes(destination.toLowerCase())
    )
    .map((bus) => ({
      busName: bus.name,
      route: bus.route,
      eta: bus.eta || 30,
      stops: bus.stops || []
    }));
};

// Implementation of a simple permutation function to generate all possible route orders
const generatePermutations = (arr) => {
  if (arr.length <= 1) return [arr];
  
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = generatePermutations(rest);
    for (const perm of perms) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
};

// Calculate total travel time for a route sequence
const calculateRouteTime = async (stops, db) => {
  let totalTime = 0;
  let transfers = 0;
  let segments = [];
  
  for (let i = 0; i < stops.length - 1; i++) {
    const source = stops[i];
    const destination = stops[i + 1];
    
    // Find direct routes
    const directRoutes = findDirectRoutes(source, destination, db);
    
    if (directRoutes.length > 0) {
      // Use the first direct route found
      const route = directRoutes[0];
      totalTime += route.eta;
      segments.push({
        from: source,
        to: destination,
        bus: route.busName,
        eta: route.eta,
        stops: route.stops
      });
    } else {
      // No direct route, need to add transfer time
      totalTime += 60; // Assume 1 hour transfer time
      transfers++;
      segments.push({
        from: source,
        to: destination,
        bus: "Transfer Required",
        eta: 60,
        stops: []
      });
    }
  }
  
  return { totalTime, transfers, segments };
};

router.post("/", async (req, res) => {
  const { stops, preference = "fastest" } = req.body;

  // Validate input
  if (!stops || !Array.isArray(stops) || stops.length < 2) {
    return res.status(400).json({ 
      message: "At least two stops are required for trip planning" 
    });
  }

  try {
    // Check if database file exists
    if (!fs.existsSync(dbPath)) {
      return res.status(404).json({ message: "Database file not found" });
    }

    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    // For simplicity, we'll implement a basic optimization
    // In a real-world scenario, we would use a more sophisticated algorithm like Dijkstra's or A*
    
    // Generate all possible permutations of stops (excluding the first stop which is fixed as start)
    const startStop = stops[0];
    const endStop = stops[stops.length - 1];
    const intermediateStops = stops.slice(1, -1);
    
    let bestRoute = null;
    let bestTime = Infinity;
    
    if (intermediateStops.length === 0) {
      // Direct route from start to end
      const { totalTime, transfers, segments } = await calculateRouteTime([startStop, endStop], db);
      bestRoute = {
        stops: [startStop, endStop],
        totalTime,
        transfers,
        segments
      };
    } else {
      // Multiple stops, find optimal order
      const permutations = generatePermutations(intermediateStops);
      
      for (const perm of permutations) {
        const routeStops = [startStop, ...perm, endStop];
        const { totalTime, transfers, segments } = await calculateRouteTime(routeStops, db);
        
        if (totalTime < bestTime) {
          bestTime = totalTime;
          bestRoute = {
            stops: routeStops,
            totalTime,
            transfers,
            segments
          };
        }
      }
    }

    // Get distance information if Google Maps API key is available
    let totalDistance = "N/A";
    if (process.env.GOOGLE_MAPS_API_KEY && bestRoute.stops.length >= 2) {
      try {
        const distanceData = await getDistanceMatrix(
          [bestRoute.stops[0]], 
          [bestRoute.stops[bestRoute.stops.length - 1]]
        );
        
        if (distanceData && 
            distanceData.rows && 
            distanceData.rows.length > 0 && 
            distanceData.rows[0].elements && 
            distanceData.rows[0].elements.length > 0 &&
            distanceData.rows[0].elements[0].status === "OK") {
          
          const element = distanceData.rows[0].elements[0];
          totalDistance = element.distance.text;
        }
      } catch (gmapError) {
        console.error("Google Maps API Error:", gmapError.message);
      }
    }

    res.json({
      route: bestRoute,
      totalDistance,
      preference
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error planning trip", 
      error: error.message 
    });
  }
});

export default router;