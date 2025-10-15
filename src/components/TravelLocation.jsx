// src/components/TravelLocations.jsx
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { fallbackTravelLocations } from '../data/fallbackData';

const TravelLocations = () => {
  const { currentLanguage } = useLanguage();
  const [travelData, setTravelData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch data from API or fallback
  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const response = await fetch('http://jsonblob.com/1336700697919545344');
        if (!response.ok) throw new Error('API fetch failed');
        const data = await response.json();
        setTravelData(data);
      } catch (err) {
        console.warn('API failed, using fallback data.', err);
        setTravelData(fallbackTravelLocations);
      }
    };
    fetchTravelData();
  }, []);

  // Select language data (default English)
  const languageData = travelData?.[currentLanguage] || fallbackTravelLocations.en;

  if (!languageData || !languageData.locations) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Unable to load travel data. Please try again later.
        </p>
      </div>
    );
  }

  // Filter logic
  const filteredLocations = languageData.locations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{languageData.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{languageData.subtitle}</p>
        </div>

        {/* Search + Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 text-black dark:text-white">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400" size={20} />
            <input
              type="text"
              placeholder={languageData.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {languageData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap border ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black dark:text-white">
          {filteredLocations.map((location, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src={location.image} alt={location.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{location.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{location.description}</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{languageData.bestTime}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{location.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{languageData.culturalEvents}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{location.culturalEvents.join(', ') || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{languageData.localSpecialties}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{location.localCuisine.join(', ') || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {location.activities.map((activity, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results fallback */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <p className="text-gray-600 dark:text-gray-300">{languageData.noLocationsFound}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelLocations;
