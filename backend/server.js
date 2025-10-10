import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Path to Haryana.json (bus database)
const dbPath = path.join(process.cwd(), "Databases/State_Database/Haryana.json");

router.post("/", async (req, res) => {
  const { source, destination } = req.body;

  try {
    // Check if database file exists
    if (!fs.existsSync(dbPath)) {
      return res.status(404).json({ message: "Database file not found" });
    }

    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    // Step 1: Get travel time + distance from Google Maps
    const gmapUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      source
    )}&destinations=${encodeURIComponent(destination)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(gmapUrl);
    const travelTime = response.data.rows[0].elements[0].duration.text;
    const distance = response.data.rows[0].elements[0].distance.text;

    // Step 2: Match the source and destination in bus database
    const bestMatches = db.buses
      .filter(
        (b) =>
          b.route.toLowerCase().includes(source.toLowerCase()) &&
          b.route.toLowerCase().includes(destination.toLowerCase())
      )
      .map((bus) => ({
        busName: bus.name,
        travelTime,
        distance,
        type: "Fastest Route",
        eta: bus.eta || 30,
        stops: bus.stops || []
      }));

    res.json({ routes: bestMatches.slice(0, 3) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error finding smart routes", error: error.message });
  }
});

export default router;