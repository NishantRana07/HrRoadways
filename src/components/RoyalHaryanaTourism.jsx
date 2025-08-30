import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Flower, Leaf, Sun, Award, Clock, 
  Calendar, Shield, Star, Users, Compass
} from 'lucide-react';
import '../styles/luxury.css';

const royalHaryanaDestinations = {
  en: [
    {
      id: 1,
      name: "Sultanpur Palace, Hisar",
      description: "A majestic royal residence showcasing Haryana's architectural splendor",
      price: "₹5,999",
      rating: 4.8,
      duration: "2 Days / 1 Night",
      highlights: [
        "Heritage Palace Tour", 
        "Royal Dining Experience", 
        "Historical Museum Visit"
      ],
      location: "Hisar",
      bestSeason: "October to March",
      activities: [
        "Guided Heritage Walk",
        "Traditional Haryanvi Cuisine",
        "Architectural Photography"
      ]
    },
    {
      id: 2,
      name: "Kurukshetra Heritage Trail",
      description: "Explore the land of Mahabharata with spiritual and historical significance",
      price: "₹4,599",
      rating: 4.9,
      duration: "3 Days / 2 Nights",
      highlights: [
        "Brahma Sarovar", 
        "Jyotisar Krishna Temple", 
        "Archaeological Museums"
      ],
      location: "Kurukshetra",
      bestSeason: "Winter Months",
      activities: [
        "Spiritual Retreats",
        "Historical Exploration",
        "Cultural Workshops"
      ]
    },
    {
      id: 3,
      name: "Pehowa Royal Retreat",
      description: "Discover the serene royal heritage of ancient Haryana",
      price: "₹6,299",
      rating: 4.7,
      duration: "2 Days / 1 Night",
      highlights: [
        "Ancient Temples", 
        "Rural Luxury Experience", 
        "Traditional Craft Workshops"
      ],
      location: "Pehowa",
      bestSeason: "October to February",
      activities: [
        "Pottery Making",
        "Folk Performance",
        "Nature Walks"
      ]
    }
  ],
  hi: [
    {
      id: 1,
      name: "सुल्तानपुर पैलेस, हिसार",
      description: "हरियाणा की वास्तुकला की भव्यता को दर्शाने वाला एक शानदार रॉयल निवास",
      price: "₹5,999",
      rating: 4.8,
      duration: "2 दिन / 1 रात",
      highlights: [
        "विरासत महल यात्रा", 
        "रॉयल डाइनिंग अनुभव", 
        "ऐतिहासिक संग्रहालय यात्रा"
      ],
      location: "हिसार",
      bestSeason: "अक्टूबर से मार्च",
      activities: [
        "मार्गदर्शित विरासत चलना",
        "पारंपरिक हरियाणवी व्यंजन",
        "वास्तुकला फोटोग्राफी"
      ]
    },
    {
      id: 2,
      name: "कुरुक्षेत्र विरासत ट्रेल",
      description: "आध्यात्मिक और ऐतिहासिक महत्व के साथ महाभारत की भूमि का अन्वेषण करें",
      price: "₹4,599",
      rating: 4.9,
      duration: "3 दिन / 2 रातें",
      highlights: [
        "ब्रह्म सरोवर", 
        "ज्योतिसर कृष्ण मंदिर", 
        "पुरातात्विक संग्रहालय"
      ],
      location: "कुरुक्षेत्र",
      bestSeason: "सर्दी के महीने",
      activities: [
        "आध्यात्मिक रिट्रीट",
        "ऐतिहासिक अन्वेषण",
        "सांस्कृतिक कार्यशालाएँ"
      ]
    },
    {
      id: 3,
      name: "पिहोवा रॉयल रिट्रीट",
      description: "प्राचीन हरियाणा की शांतिपूर्ण रॉयल विरासत की खोज करें",
      price: "₹6,299",
      rating: 4.7,
      duration: "2 दिन / 1 रात",
      highlights: [
        "प्राचीन मंदिर", 
        "ग्रामीण लक्जरी अनुभव", 
        "पारंपरिक शिल्प कार्यशालाएँ"
      ],
      location: "पिहोवा",
      bestSeason: "अक्टूबर से फरवरी",
      activities: [
        "मिट्टी के बर्तन बनाना",
        "लोक प्रदर्शन",
        "प्रकृति की सैर"
      ]
    }
  ]
};

const translations = {
  en: {
    title: "Royal Haryana Odyssey",
    subtitle: "Uncover the Majestic Heritage of Haryana",
    searchPlaceholder: "Explore Royal Destinations",
    searchButton: "Discover Royal Experiences",
    features: [
      { icon: Shield, title: "Royal Safety", desc: "Comprehensive travel protection" },
      { icon: Star, title: "Curated Experiences", desc: "Handpicked royal destinations" },
      { icon: Compass, title: "Local Expertise", desc: "Expert local guides" },
      { icon: Leaf, title: "Sustainable Tourism", desc: "Eco-friendly royal experiences" }
    ]
  },
  hi: {
    title: "रॉयल हरियाणा ओडिसी",
    subtitle: "हरियाणा की भव्य विरासत का अनावरण करें",
    searchPlaceholder: "रॉयल स्थलों का अन्वेषण करें",
    searchButton: "रॉयल अनुभवों की खोज करें",
    features: [
      { icon: Shield, title: "रॉयल सुरक्षा", desc: "समग्र यात्रा संरक्षण" },
      { icon: Star, title: "संपादित अनुभव", desc: "हाथ से चुने गए रॉयल गंतव्य" },
      { icon: Compass, title: "स्थानीय विशेषज्ञता", desc: "विशेषज्ञ स्थानीय गाइड" },
      { icon: Leaf, title: "सतत पर्यटन", desc: "इको-फ्रेंडली रॉयल अनुभव" }
    ]
  }
};

const RoyalHaryanaTourism = ({ isHindi }) => {
  const [currentLanguage, setCurrentLanguage] = useState(translations.en);
  const [destinations, setDestinations] = useState(royalHaryanaDestinations.en);
  const [searchTerm, setSearchTerm] = useState('');
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [filters, setFilters] = useState({
    season: '',
    duration: ''
  });
  const curtainRef = useRef(null);

  useEffect(() => {
    setCurrentLanguage(isHindi ? translations.hi : translations.en);
    setDestinations(isHindi ? royalHaryanaDestinations.hi : royalHaryanaDestinations.en);
  }, [isHindi]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtainOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterDestinations(term);
  };

  const filterDestinations = (term) => {
    let filtered = destinations.filter(dest => 
      dest.name.toLowerCase().includes(term) ||
      dest.location.toLowerCase().includes(term)
    );

    if (filters.season) {
      filtered = filtered.filter(dest => 
        dest.bestSeason.toLowerCase().includes(filters.season.toLowerCase())
      );
    }

    if (filters.duration) {
      filtered = filtered.filter(dest => 
        dest.duration.includes(filters.duration)
      );
    }

    setDestinations(filtered);
  };

  const openDestinationModal = (destination) => {
    setSelectedDestination(destination);
  };

  const closeDestinationModal = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="royal-haryana-container dark:bg-gray-950 dark:text-white">
      {/* Curtain Animation */}
      <div 
        ref={curtainRef} 
        className={`curtain ${curtainOpen ? 'open' : ''}`}
      />

      {/* Header Section */}
      <header className="royal-header">
        <div className="header-overlay" />
        <div className="header-content">
          <h1 className="royal-title">{currentLanguage.title}</h1>
          <p className="royal-subtitle">{currentLanguage.subtitle}</p>
        </div>
      </header>

      {/* Advanced Filters */}
      <section className="royal-filters">
        <div className="filter-container">
          <select 
            onChange={(e) => setFilters({...filters, season: e.target.value})}
            className="royal-select"
          >
            <option value="">{isHindi ? "मौसम चुनें" : "Select Season"}</option>
            <option value="Winter">{isHindi ? "सर्दी" : "Winter"}</option>
            <option value="Summer">{isHindi ? "गर्मी" : "Summer"}</option>
            <option value="Monsoon">{isHindi ? "मानसून" : "Monsoon"}</option>
          </select>

          <select 
            onChange={(e) => setFilters({...filters, duration: e.target.value})}
            className="royal-select"
          >
            <option value="">{isHindi ? "अवधि चुनें" : "Select Duration"}</option>
            <option value="1 Night">{isHindi ? "1 रात" : "1 Night"}</option>
            <option value="2 Nights">{isHindi ? "2 रातें" : "2 Nights"}</option>
            <option value="3 Nights">{isHindi ? "3 रातें" : "3 Nights"}</option>
          </select>
        </div>
      </section>

      {/* Features Section */}
      <section className="royal-features">
        {currentLanguage.features.map((feature, index) => (
          <div key={index} className="feature-card">
            <feature.icon className="feature-icon" />
            <div className="feature-details">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Search Section */}
      <section className="search-section text-black">
        <div className="search-container">
          <input 
            type="text" 
            placeholder={currentLanguage.searchPlaceholder} 
            value={searchTerm}
            onChange={handleSearch}
            className="royal-search-input"
          />
          <button className="royal-search-button">
            {currentLanguage.searchButton}
          </button>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="destinations-grid">
        {destinations.map(destination => (
          <div 
            key={destination.id} 
            className="destination-card"
            onClick={() => openDestinationModal(destination)}
          >
            <div className="destination-header">
              <h2>{destination.name}</h2>
              <span className="destination-rating">
                <Star /> {destination.rating}
              </span>
            </div>
            <p className="destination-description">{destination.description}</p>
            <div className="destination-details">
              <span className="destination-price">{destination.price}</span>
              <span className="destination-duration">{destination.duration}</span>
              <span className="destination-location">
                <MapPin size={16} /> {destination.location}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Detailed Destination Modal */}
      {selectedDestination && (
        <div className="destination-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeDestinationModal}>
              ✕
            </button>
            <div className="modal-header">
              <h2>{selectedDestination.name}</h2>
              <div className="modal-meta">
                <span><Calendar /> {selectedDestination.duration}</span>
                <span><MapPin /> {selectedDestination.location}</span>
                <span><Sun /> {selectedDestination.bestSeason}</span>
              </div>
            </div>

            <div className="modal-sections">
              <div className="modal-section">
                <h3>{isHindi ? "गंतव्य मुख्य विशेषताएं" : "Destination Highlights"}</h3>
                {selectedDestination.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <Flower /> {highlight}
                  </div>
                ))}
              </div>

              <div className="modal-section">
                <h3>{isHindi ? "अनुशंसित गतिविधियाँ" : "Recommended Activities"}</h3>
                {selectedDestination.activities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <Compass /> {activity}
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="book-now">{isHindi ? "रॉयल अनुभव बुक करें" : "Book Royal Experience"}</button>
              <button className="learn-more">{isHindi ? "विस्तृत यात्रा कार्यक्रम" : "Detailed Itinerary"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoyalHaryanaTourism;