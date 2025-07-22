import { useState, useEffect } from "react";
import { Wind, Zap } from "lucide-react";

import { generateTrafficUpdates } from "../helpers/generateTrafficUpdate";

const TrafficUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setUpdates(generateTrafficUpdates());

    const updateInterval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setUpdates(generateTrafficUpdates());
        setIsAnimating(true);
      }, 500);
    }, 10000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className="relative bg-white/90 rounded-2xl shadow-2xl border border-blue-100/50 overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100 to-blue-200 animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-3">
            <Zap className="w-7 h-7 text-yellow-500 animate-pulse" />
            Live Traffic Updates
          </h2>
          <div className="text-sm text-blue-700/70 font-medium">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="space-y-4">
          {updates.map((update, index) => (
            <div
              key={index}
              className={`
                transform transition-all duration-700 
                ${
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
                rounded-xl p-4 border 
                ${update.bgGradient}
                border-blue-200/50 
                hover:shadow-lg hover:scale-[1.02] 
                transition-all duration-300 
                cursor-pointer
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    p-2 rounded-full 
                    bg-gradient-to-br ${update.gradient} 
                    shadow-md
                  `}
                  >
                    <update.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900">{update.title}</h3>
                    <p className="text-sm text-blue-700/80">{update.details}</p>
                  </div>
                </div>
                <div
                  className={`
                  px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                  ${
                    update.severity === "warning"
                      ? "bg-orange-500/20 text-orange-700"
                      : update.severity === "info"
                      ? "bg-blue-500/20 text-blue-700"
                      : "bg-green-500/20 text-green-700"
                  }
                `}
                >
                  {update.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-blue-700/70">
            <Wind className="w-4 h-4 text-blue-500 animate-bounce" />
            Real-time updates powered by Haryana Roadways
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficUpdates;
