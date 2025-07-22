import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/tourGuide.css"; // Import the CSS file
import { jsonBlobLinks } from "../data/bobLinks";

const TourGuidePage = () => {
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(jsonBlobLinks[0].city); // Default to the first city
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          jsonBlobLinks.map((link) =>
            axios
              .get(link.url)
              .then((res) => ({ city: link.city, data: res.data }))
          )
        );
        setData(results);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setHoveredCard(null); // Reset hovered card when changing cities
  };

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-900 hover:text-blue-700 transition-colors duration-300">
        Explore Popular Places
      </h1>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-blue-600">Loading amazing destinations...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg shadow">
          Error fetching data. Please try again later.
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {jsonBlobLinks.map((link) => (
          <button
            key={link.city}
            onClick={() => handleCityClick(link.city)}
            className={`
              px-4 py-2 rounded-lg transition-all duration-300
              transform hover:scale-105 hover:shadow-lg
              ${
                selectedCity === link.city
                  ? "bg-blue-700 text-white shadow-blue-300/50 shadow-lg"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
            `}
          >
            {link.city}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        {selectedCity &&
          data
            .filter((item) => item.city === selectedCity)
            .map((item) => (
              <div key={item.city}>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  {item.data.location}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {item.data.places.map((place, index) => (
                    <div
                      key={index}
                      className={`
                        group relative border rounded-xl overflow-hidden
                        transition-all duration-500 ease-in-out
                        ${
                          hoveredCard === index
                            ? "shadow-2xl scale-105 z-10 bg-white"
                            : "shadow-md hover:shadow-xl bg-gray-50"
                        }
                      `}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="relative">
                        <img
                          src={`src/assets/${place.name
                            .toLowerCase()
                            .replace(/ /g, "_")}.jpg`}
                          alt={place.name}
                          className={`
                            w-full h-48 object-cover transition-transform duration-500
                            ${hoveredCard === index ? "scale-105" : "scale-100"}
                          `}
                        />
                        <div
                          className={`
                          absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                          transition-opacity duration-300
                          ${hoveredCard === index ? "opacity-70" : "opacity-0"}
                        `}
                        ></div>
                      </div>

                      <div className="p-4">
                        <h3
                          className={`
                          text-xl font-semibold transition-all duration-300
                          ${
                            hoveredCard === index
                              ? "text-blue-700 transform -translate-y-1"
                              : "text-gray-800"
                          }
                        `}
                        >
                          {place.name}
                        </h3>

                        <div
                          className={`
                          overflow-hidden transition-all duration-500 ease-in-out
                          ${
                            hoveredCard === index
                              ? "max-h-[300px] opacity-100 mt-3"
                              : "max-h-0 opacity-0"
                          }
                        `}
                        >
                          <p className="text-gray-700 leading-relaxed">
                            {place.description}
                          </p>
                          <button
                            className="
                            mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg
                            hover:bg-blue-700 transition-colors duration-300
                            transform hover:scale-105
                          "
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TourGuidePage;
