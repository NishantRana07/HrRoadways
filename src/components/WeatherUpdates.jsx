import { useState, useEffect } from "react";
import { CloudRain, Sun, Cloud, AlertTriangle } from "lucide-react";
import { routes } from "../data/citiesRoutes";

import { weatherApi } from "../constants";
const WeatherUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const fetchWeatherUpdates = async () => {
    try {
      const updates = await Promise.all(
        routes.map(async (route) => {
          const cityWeather = await Promise.all(
            route.cities.map(async (city) => {
              const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=metric`
              );
              if (!response.ok) {
                throw new Error(`Failed to fetch weather data for ${city}`);
              }
              const data = await response.json();
              return {
                city: data.name,
                temperature: data.main.temp,
                weather: data.weather[0].description,
                icon: data.weather[0].icon,
              };
            })
          );
          return { routeName: route.name, cityWeather };
        })
      );
      setUpdates(updates);
      console.log("Weather updates:", updates); // Log the updates
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherUpdates();

    const updateInterval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 3) % updates.length);
        setIsAnimating(true);
      }, 500);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(updateInterval);
  }, [updates.length]);

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case "01d":
      case "01n":
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
    }
  };

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
            <Sun className="w-7 h-7 text-yellow-500 animate-pulse" />
            Live Weather Updates
          </h2>
          <div className="text-sm text-blue-700/70 font-medium">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="space-y-4">
          {updates
            .slice(currentIndex, currentIndex + 3)
            .map((update, index) => (
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
                bg-gradient-to-r from-blue-100/20 to-indigo-100/20
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
                    bg-gradient-to-br from-blue-500 to-indigo-500 
                    shadow-md
                  `}
                    >
                      {getWeatherIcon(update.cityWeather[0].icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900">
                        {update.routeName}
                      </h3>
                      {update.cityWeather.map((cityUpdate, cityIndex) => (
                        <p key={cityIndex} className="text-sm text-blue-700/80">
                          {cityUpdate.city}: {cityUpdate.weather},{" "}
                          {cityUpdate.temperature}°C
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-blue-700/70">
            <Cloud className="w-4 h-4 text-blue-500 animate-bounce" />
            Real-time updates powered by OpenWeatherMap
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherUpdates;
