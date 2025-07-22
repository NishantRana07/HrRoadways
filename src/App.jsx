import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navigation from './components/nav';
import Hero from './components/hero';
import Available from './components/Available';
import AboutUs from './components/Aboutus';
import Trip from './components/Trip';
import Footer from './components/footer';
import Reviews from './components/Review';
import Blog from './components/Blog';
import DonatePage from './components/DonatePage';
import TravelLocations from './components/TravelLocation';
import HelplinePage from './components/HelpLinepage';
import BusTracker from './components/Track';
import InfoPage from './components/InfoPage';
import UnderConstruction from './components/UnderConstruction';
import ContactUs from './components/ContactUs';
import AffiliateProgram from './components/AffiliateProgram';
import BusCard from './components/BusCard';
import PaymentOptions from './components/Paymentoptions';
import RoyalHaryanaTourism from './components/RoyalHaryanaTourism';
import ServicesPage from './components/Services';
import BestRides from './components/BestRides';
import Tutorial from './components/Tutorial';
import WeeklyTimetable from './components/Timetable';
import RulesAndGuidelines from './components/Rules';
import TourGuidePage from './components/TourGuidePage';
import { getStoredLanguage, setStoredLanguage } from '../libs/languageStorage';
import NotFound from './components/NotFound';


// Make sure you have a BookingPage component in your project.
// For example, if you placed BookingPage under ./components/BookingPage:
import BookingPage from './components/BookingPage';

// Wrapper to handle passing state from react-router-dom's Link (if needed)
function BookingPageWrapper() {
  const location = useLocation();
  const { selectedBus } = (location && location.state) || {};
  return <BookingPage selectedBus={selectedBus} />;
}

function App() {
  const [isHindi, setIsHindi] = useState(() => {
    const storedLanguage = getStoredLanguage();
    return storedLanguage === 'hi';
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleToggleLanguage = () => {
    setIsHindi(!isHindi);
    setStoredLanguage(!isHindi ? 'hi' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Router>
      {/* Navigation Bar (applies to all routes) */}
      <Navigation isHindi={isHindi} onToggleLanguage={handleToggleLanguage} />

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Hero isHindi={isHindi} />} />
        <Route path="/Available" element={<Available isHindi={isHindi} />} />
        <Route path="/about" element={<AboutUs isHindi={isHindi} />} />
        <Route path="/trip" element={<Trip isHindi={isHindi} />} />
        <Route path="/bestrides" element={<BestRides isHindi={isHindi} />} />
        <Route path="/policy" element={<InfoPage isHindi={isHindi} />} />
        <Route path="/rules" element={<RulesAndGuidelines isHindi={isHindi} />} />
        <Route path="/under-construction" element={<UnderConstruction isHindi={isHindi} />} />
      
        {/* Redirect duplicate path to canonical contact route */}
        <Route path="/contactUs" element={<Navigate to="/contact" replace />} />
        <Route path="/contact" element={<ContactUs isHindi={isHindi} />} />

        <Route path="/blog" element={<Blog isHindi={isHindi} />} />
        <Route path="/payment" element={<PaymentOptions isHindi={isHindi} />} />
        <Route path="/track" element={<BusTracker isHindi={isHindi} />} />
        <Route path="/luxury" element={<RoyalHaryanaTourism isHindi={isHindi} />} />
        <Route path="/donate" element={<DonatePage isHindi={isHindi} />} />
        <Route path="/services" element={<ServicesPage isHindi={isHindi} />} />
        <Route path="/travellocations" element={<TravelLocations isHindi={isHindi} />} />
        <Route path="/helpline" element={<HelplinePage isHindi={isHindi} />} />
        <Route path="/schedule" element={<WeeklyTimetable isHindi={isHindi} />} />
        <Route path="/reviews" element={<Reviews isHindi={isHindi} />} />
        <Route path="/affiliate" element={<AffiliateProgram isHindi={isHindi} />} />
       
        <Route path="/card" element={<BusCard isHindi={isHindi} />} />
        <Route path="/guide" element={<Tutorial isHindi={isHindi} />} />
        <Route path="/tour-guide" element={<TourGuidePage />} /> {/* Add new route */}
        <Route path="*" element={<NotFound />} />

        {/* New booking route to apply same navbar & footer */}
        <Route path="/booking" element={<BookingPageWrapper />} />
      </Routes>

      {/* Footer (applies to all routes) */}
      <Footer isHindi={isHindi} />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: hovered ? '#1E90FF' : '#007BFF',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '50px',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: '1000',
            border: 'none',
            boxShadow: hovered ? '0px 4px 6px rgba(0, 0, 0, 0.2)' : 'none',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <i className="fa fa-arrow-up fa-lg"></i>
        </button>
      )}
    </Router>
  );
}

export default App;
