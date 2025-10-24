import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TripPlanner = () => {
  const [stops, setStops] = useState(["", ""]);
  const [preference, setPreference] = useState("fastest");
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddStop = () => {
    setStops([...stops, ""]);
  };

  const handleRemoveStop = (index) => {
    if (stops.length <= 2) {
      toast.warn("At least two stops are required");
      return;
    }
    const newStops = [...stops];
    newStops.splice(index, 1);
    setStops(newStops);
  };

  const handleStopChange = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const handlePlanTrip = async () => {
    // Validate that we have at least two stops
    if (stops.length < 2) {
      toast.warn("Please add at least two stops");
      return;
    }

    // Check that all stops have values
    const emptyStops = stops.filter(stop => !stop.trim());
    if (emptyStops.length > 0) {
      toast.warn("Please fill in all stop locations");
      return;
    }

    try {
      setLoading(true);
      // Fix the API endpoint URL to include the trailing slash
      const response = await axios.post("/api/tripPlanner/", { 
        stops, 
        preference 
      });
      
      setTripPlan(response.data);
      toast.success("Trip plan generated successfully!");
    } catch (error) {
      console.error("Error planning trip:", error);
      toast.error("Failed to generate trip plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        AI Trip Planner
      </h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Plan Your Multi-Stop Trip</h2>
        
        <div className="space-y-4">
          {stops.map((stop, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {index === 0 ? "Start Location" : 
                   index === stops.length - 1 ? "Final Destination" : 
                   `Stop ${index}`}
                </label>
                <input
                  type="text"
                  value={stop}
                  onChange={(e) => handleStopChange(index, e.target.value)}
                  placeholder={
                    index === 0 ? "Enter starting point" : 
                    index === stops.length - 1 ? "Enter destination" : 
                    `Enter stop ${index}`
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {stops.length > 2 && (
                <button
                  onClick={() => handleRemoveStop(index)}
                  className="mt-6 text-red-500 hover:text-red-700"
                  title="Remove stop"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          
          <div className="flex gap-3">
            <button
              onClick={handleAddStop}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Stop
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trip Preference
          </label>
          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="fastest">Fastest Route</option>
            <option value="fewest_transfers">Fewest Transfers</option>
          </select>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handlePlanTrip}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Planning your trip...
              </span>
            ) : (
              "Plan My Trip"
            )}
          </button>
        </div>
      </div>
      
      {tripPlan && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Optimized Trip Plan</h2>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Trip Summary</h3>
                <p className="text-gray-600">
                  Total Time: {tripPlan.route.totalTime} minutes | 
                  Transfers: {tripPlan.route.transfers} | 
                  Distance: {tripPlan.totalDistance}
                </p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {tripPlan.preference === "fastest" ? "Fastest Route" : "Fewest Transfers"}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Route Segments</h3>
            {tripPlan.route.segments.map((segment, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">
                      {segment.from} → {segment.to}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Estimated Time: {segment.eta} minutes
                    </p>
                  </div>
                </div>
                
                <div className="ml-11">
                  <p className="font-medium">Transport: {segment.bus}</p>
                  {segment.stops && segment.stops.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Stops:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {segment.stops.map((stop, stopIndex) => (
                          <span 
                            key={stopIndex} 
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                          >
                            {stop}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;