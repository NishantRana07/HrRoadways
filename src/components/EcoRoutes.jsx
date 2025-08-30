import React, { useState } from "react";
// Advanced AI-powered eco-friendly route suggestions page
const EcoRoutes = ({ scheduleData, onSelectRoute }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  // Enhanced scoring logic
  const getEcoScore = (schedule) => {
    let score = 0;
    if (schedule.busType && /electric|ev/i.test(schedule.busType)) score += 50;
    if (schedule.occupancy && schedule.occupancy > 40) score += 25;
    if (schedule.avgSpeed && schedule.avgSpeed < 50) score += 25;
    if (schedule.route && schedule.route.length < 5) score += 10;
    return score;
  };
  // Filter and sort eco routes
  const filteredRoutes = (scheduleData || []).filter(route =>
    route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.to.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const ecoRoutes = [...filteredRoutes]
    .sort((a, b) => getEcoScore(b) - getEcoScore(a) || a.eta - b.eta)
    .slice(0, 5);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">Eco-Friendly Bus Routes</h1>
        <input
          type="text"
          placeholder="Search by city or destination..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <ul>
          {ecoRoutes.map((route, idx) => (
            <li key={idx} className="mb-6 p-4 rounded-xl shadow bg-white border-l-4 border-green-400">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">{route.from} → {route.to}</span>
                <span className={`font-bold ${getEcoScore(route) > 80 ? 'text-green-700' : 'text-green-600'}`}>Eco Score: {getEcoScore(route)} {getEcoScore(route) > 80 ? '🌱' : getEcoScore(route) > 60 ? '🌿' : '🌳'}</span>
              </div>
              <div className="mt-2 text-gray-700">ETA: {route.eta} min | Occupancy: {route.occupancy || 'N/A'} | Bus Type: {route.busType || 'Standard'} | Route Length: {route.route ? route.route.length : 'N/A'}</div>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => setSelectedRoute(route)}>View Details</button>
            </li>
          ))}
        </ul>
        {selectedRoute && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-green-700">Route Details</h2>
              <p><strong>From:</strong> {selectedRoute.from}</p>
              <p><strong>To:</strong> {selectedRoute.to}</p>
              <p><strong>Eco Score:</strong> {getEcoScore(selectedRoute)}</p>
              <p><strong>ETA:</strong> {selectedRoute.eta} min</p>
              <p><strong>Occupancy:</strong> {selectedRoute.occupancy || 'N/A'}</p>
              <p><strong>Bus Type:</strong> {selectedRoute.busType || 'Standard'}</p>
              <p><strong>Route Length:</strong> {selectedRoute.route ? selectedRoute.route.length : 'N/A'}</p>
              <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => setSelectedRoute(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default EcoRoutes;