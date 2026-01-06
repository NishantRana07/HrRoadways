import React, { useState } from 'react';
import { fallbackTravelLocations } from '../data/fallbackData';
import '../styles/tourGuide.css';

// Import local images where available
import imgGurgaon from '../assets/GURGAON.jpg';
import imgSurajkund from '../assets/Surajkund.jpg';
import imgSultanpur from '../assets/Sultanpur_National_Park.webp';
import imgKurukshetra from '../assets/Kurukshetra.jpg';
import imgPinjore from '../assets/Pinjore_Gardens.avif';
import imgMorni from '../assets/Morni_Hills.webp';
import imgPanchkula from '../assets/Panchkula.jpg';

// Map IDs to local images
const localImages = {
  'gurgaon': imgGurgaon,
  'surajkund': imgSurajkund,
  'sultanpur-np': imgSultanpur,
  'kurukshetra': imgKurukshetra,
  'pinjore-gardens': imgPinjore,
  'morni-hills': imgMorni,
  'panchkula': imgPanchkula,
};

const TourGuidePage = () => {
  // Use English data by default
  const { categories, locations, title, subtitle } = fallbackTravelLocations.en;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredLocations = selectedCategory === 'all'
    ? locations
    : locations.filter(loc => loc.category === selectedCategory);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen dark:bg-gray-950 dark:text-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 hover:text-blue-700 transition-colors duration-300 mb-4 dark:text-blue-400">
          {title}
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300">{subtitle}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-lg transition-all duration-300
              transform hover:scale-105 hover:shadow-lg
              ${selectedCategory === category.id
                ? 'bg-blue-700 text-white shadow-blue-300/50 shadow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg dark:bg-gray-900">
        {filteredLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((place, index) => (
              <div
                key={place.id}
                className={`
                  group relative border rounded-xl overflow-hidden
                  transition-all duration-500 ease-in-out
                  ${hoveredCard === index
                    ? 'shadow-2xl scale-105 z-10 bg-white dark:bg-gray-800'
                    : 'shadow-md hover:shadow-xl bg-gray-50 dark:bg-gray-800'
                  }
                  dark:border-gray-700
                `}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={localImages[place.id] || place.image}
                    alt={place.name}
                    className={`
                      w-full h-full object-cover transition-transform duration-500
                      ${hoveredCard === index ? 'scale-110' : 'scale-100'}
                    `}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                  />
                  <div className={`
                    absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
                    transition-opacity duration-300
                    ${hoveredCard === index ? 'opacity-70' : 'opacity-0'}
                  `}></div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`
                      text-xl font-semibold transition-all duration-300
                      ${hoveredCard === index
                        ? 'text-blue-700 dark:text-blue-400'
                        : 'text-gray-800 dark:text-gray-200'
                      }
                    `}>
                      {place.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200 uppercase">
                      {place.category}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {place.description}
                  </p>

                  <div className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${hoveredCard === index
                      ? 'max-h-[300px] opacity-100 mt-3'
                      : 'max-h-0 opacity-0'
                    }
                  `}>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <p><strong>Best Time:</strong> {place.bestTime}</p>
                      {place.activities && place.activities.length > 0 && (
                        <div>
                          <strong>Activities:</strong> {place.activities.join(', ')}
                        </div>
                      )}
                    </div>

                    <button className="
                      mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg
                      hover:bg-blue-700 transition-colors duration-300
                      transform hover:scale-105 shadow-md
                    ">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p>{fallbackTravelLocations.en.noLocationsFound}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourGuidePage;