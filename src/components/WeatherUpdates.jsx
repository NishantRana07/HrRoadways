import React, { useState, useEffect } from "react";
import { CloudRain, Sun, Cloud, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

const WeatherUpdates = () => {
  const { t } = useTranslation();
  const [updates, setUpdates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  console.log(apiKey); // Use this safely

  // Define the routes and the cities along each route
  const routes = [
    { name: "Chandigarh to Delhi", cities: ["Chandigarh", "Delhi"] },
    { name: "Gurgaon to Hisar", cities: ["Gurgaon", "Hisar"] },
    { name: "Faridabad to Rohtak", cities: ["Faridabad", "Rohtak"] },
    { name: "Delhi to Karnal", cities: ["Delhi", "Karnal"] },
    { name: "Ambala to Jaipur", cities: ["Ambala", "Jaipur"] },
    { name: "Chandigarh to Hisar", cities: ["Chandigarh", "Hisar"] },
    { name: "Delhi to Panipat", cities: ["Delhi", "Panipat"] },
    { name: "Gurgaon to Chandigarh", cities: ["Gurgaon", "Chandigarh"] },
    { name: "Faridabad to Sonipat", cities: ["Faridabad", "Sonipat"] },
    { name: "Rohtak to Jaipur", cities: ["Rohtak", "Jaipur"] },
    { name: "Hisar to Delhi", cities: ["Hisar", "Delhi"] },
    { name: "Karnal to Chandigarh", cities: ["Karnal", "Chandigarh"] },
    { name: "Ambala to Delhi", cities: ["Ambala", "Delhi"] },
    { name: "Panipat to Jaipur", cities: ["Panipat", "Jaipur"] },
    { name: "Gurgaon to Rohtak", cities: ["Gurgaon", "Rohtak"] },
    { name: "Faridabad to Chandigarh", cities: ["Faridabad", "Chandigarh"] },
    { name: "Sonipat to Hisar", cities: ["Sonipat", "Hisar"] },
    { name: "Rohtak to Chandigarh", cities: ["Rohtak", "Chandigarh"] },
    { name: "Hisar to Jaipur", cities: ["Hisar", "Jaipur"] },
    { name: "Karnal to Delhi", cities: ["Karnal", "Delhi"] },
    { name: "Ambala to Hisar", cities: ["Ambala", "Hisar"] },
    { name: "Panipat to Chandigarh", cities: ["Panipat", "Chandigarh"] },
    { name: "Gurgaon to Jaipur", cities: ["Gurgaon", "Jaipur"] },
    { name: "Faridabad to Hisar", cities: ["Faridabad", "Hisar"] },
    { name: "Sonipat to Chandigarh", cities: ["Sonipat", "Chandigarh"] },
    { name: "Rohtak to Delhi", cities: ["Rohtak", "Delhi"] },
    { name: "Hisar to Chandigarh", cities: ["Hisar", "Chandigarh"] },
    { name: "Karnal to Jaipur", cities: ["Karnal", "Jaipur"] },
    { name: "Ambala to Rohtak", cities: ["Ambala", "Rohtak"] },
    { name: "Panipat to Delhi", cities: ["Panipat", "Delhi"] },
  ];

  const fetchWeatherUpdates = async () => {
    try {
      const cities = new Set();
      routes.map((route) => {
        route.cities.forEach((city) => cities.add(city));
      });

      const citiesWeather = await Promise.all(
        [...cities]?.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
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

      const routeUpdates = routes.map((route) => {
        const cities = route.cities;

        const weather = citiesWeather?.filter((city) =>
          cities.includes(city.city)
        );

        return { routeName: route.name, cityWeather: weather };
      });

      setUpdates(routeUpdates);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    console.log(updates)
    if (!updates?.length) {
      fetchWeatherUpdates();
    }

    if (updates?.length) {
      const updateInterval = setInterval(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 3) % updates.length);
          setIsAnimating(true);
        }, 500);
      }, 5000); // Switch every 5 seconds

      return () => clearInterval(updateInterval);
    }
  }, [updates]);

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
    <div className="relative bg-white/90 rounded-2xl shadow-2xl border border-blue-100/50 overflow-hidden dark:bg-gray-900 darl:text-white">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100 to-blue-200 animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-3">
            <Sun className="w-7 h-7 text-yellow-500 animate-pulse" />
            {t("liveWeatherUpdates")}
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
