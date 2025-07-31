import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Info } from 'lucide-react';

// Import local translation data instead of fetching from external URL
import translationsData from '../assets/translations.json'; // Adjust path if needed, e.g., '../../assets/translations.json'

// Import images (these look fine, they are hosted on ibb.co)
const Gurgaon = 'https://i.ibb.co/ynW25D0R/GURGAON.jpg';
const Surajkund = 'https://i.ibb.co/9knrRy7V/Surajkund.jpg';
const Sultanpur_National_Park = 'https://i.ibb.co/jv9sS8Ld/Sultanpur-National-Park.webp';
const Kurukshetra = 'https://i.ibb.co/35jgWkDV/Kurukshetra.jpg';
const Pinjore_Gardens = 'https://i.ibb.co/zVgjsCYC/Pinjore-Gardens.jpg';
const Morni_Hills = 'https://i.ibb.co/DgY6Ty74/Morni-Hills.webp';
const Panchkula = 'https://i.ibb.co/HTJnB2k6/Panchkula.jpg';
const Panipat = 'https://i.ibb.co/4RnhhGjr/Panipat-Fort-Cover-Photo-840x425.jpg';
const Yamunanagar = 'https://i.ibb.co/JhPyNVt/Yamuna-nagar.jpg';

const TravelLocations = ({ isHindi }) => {
  // Directly use the imported data, no need for useState for translations now
  // const [translations, setTranslations] = useState(null); // REMOVE THIS LINE
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const currentLanguage = isHindi ? translationsData.hi : translationsData.en;

  // Ensure currentLanguage and currentLanguage.locations exist before filtering
  // This is the direct fix for the "Cannot read properties of undefined (reading 'locations')" error
  if (!currentLanguage || !currentLanguage.locations) {
      // This case should ideally not be hit if translationsData.json is correctly structured
      // But it's good for robustness if data structure is unexpected
      console.error("Translations data or locations array is missing.");
      return <div>Error: Travel data not available.</div>;
  }

  // Filter the locations based on search term and selected category
  const filteredLocations = currentLanguage.locations.filter(location => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{currentLanguage.title}</h2>
          <p className="text-lg text-gray-600">{currentLanguage.subtitle}</p>
        </div>

        {/* Search bar and category filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 text-black">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={currentLanguage.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 hover:shadow-lg transition duration-300 cursor-pointer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {currentLanguage.categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Locations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
          {filteredLocations.map((location, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-48">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{location.name}</h3>
                <p className="text-gray-600 mb-4">{location.description}</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">{currentLanguage.bestTime}</p>
                      <p className="text-sm text-gray-600">{location.bestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">{currentLanguage.culturalEvents}</p>
                      <p className="text-sm text-gray-600">{location.culturalEvents.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">{currentLanguage.localSpecialties}</p>
                      <p className="text-sm text-gray-600">{location.localCuisine.join(', ')}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {location.activities.map((activity, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback message if no locations are found */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600">{currentLanguage.noLocationsFound}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelLocations;
