import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { getStoredLanguage, setStoredLanguage } from '../../libs/languageStorage';
const Logo = 'https://i.ibb.co/kg3RQQ1S/LogoHR.png';

const Navigation = ({ isHindi, onToggleLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); 

  const translations = {
    en: {
      home: "Home",
      contact: "Contact",
      donate: "Donate",
      about: "About Us",
      trip: "Plan Journey",
      services: "Services",
      track: "Track Bus",
      schedule: "Time Table",
      tourGuide: "Tour Guide",
      travelPackages: "Travel Packages", // <-- 1. Add new translation
      helpline: "24x7 Helpline",
      blog: "Blog",
      quickLinks: "Quick Links",
      travellocations: "Travel",
      guide: "Guide and Rules"
    },
    hi: {
      home: "मुख्य पृष्ठ",
      contact: "संपर्क करें",
      donate: "दान करें",
      about: "हमारे बारे में",
      trip: "यात्रा योजना",
      services: "सेवाएं",
      track: "बस ट्रैक करें",
      schedule: "समय सारणी",
      tourGuide: "मार्गदर्शिका",
      travelPackages: "यात्रा पैकेज", // <-- 2. Add new translation
      helpline: "24x7 हेल्पलाइन",
      blog: "ब्लॉग",
      quickLinks: "त्वरित लिंक",
      travellocations: "यात्रा",
      guide: "मार्गदर्शिका और नियम"
    },
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;
  
  useEffect(() => {
    setStoredLanguage(isHindi ? 'hi' : 'en');
  }, [isHindi]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesDropdown = [
    { title: currentLanguage.track, path: '/track' },
    { title: currentLanguage.schedule, path: '/schedule' },
    { title: currentLanguage.tourGuide, path: '/tour-guide' },
    { title: currentLanguage.travelPackages, path: '/travel-packages' }, // <-- 3. Add new item to dropdown array
  ];

  const toggleSidebar = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="hidden py-2 text-white bg-blue-900 md:block">
        <div className="container flex items-center justify-between px-4 mx-auto text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              1800-180-2345
            </span>
            <Link to="/rules" className="guide-link">
              {currentLanguage.guide}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <li className="lang">
              EN
              <div className="checkbox-wrapper-5">
                <div className="check">
                  <input
                    id="check-5"
                    type="checkbox"
                    checked={isHindi}
                    onChange={onToggleLanguage}
                  />
                  <label htmlFor="check-5" />
                </div>
              </div>
              HI
            </li>
          </div>
        </div>
      </div>
      
      <nav
        className={`sticky top-0 z-50 w-full ${
          isScrolled ? 'shadow-lg bg-white' : 'bg-white/95'
        } transition-all duration-300`}
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="Haryana Roadways Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-blue-900">
                Haryana Roadways
              </span>
            </Link>

            <div className="items-center hidden space-x-8 md:flex">
              <Link to="/" className="nav-link">
                {currentLanguage.home}
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="flex items-center nav-link">
                  {currentLanguage.services}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className={`dropdown ${isServicesOpen ? 'show' : ''}`}>
                  {servicesDropdown.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/trip" className="nav-link">
                {currentLanguage.trip}
              </Link>
              <Link to="/travellocations" className="nav-link">
                {currentLanguage.travellocations}
              </Link>
              <Link to="/about" className="nav-link">
                {currentLanguage.about}
              </Link>
              <Link to="/blog" className="nav-link">
                {currentLanguage.blog}
              </Link>
              <Link to="/donate" className="nav-link">
                {currentLanguage.donate}
              </Link>

              <button className="flex items-center px-4 py-2 text-white transition bg-blue-800 rounded-lg hover:bg-blue-900">
                <Phone className="w-4 h-4 mr-2" />
                <Link to="/helpline">{currentLanguage.helpline}</Link>
              </button>
            </div>

            <button
              className="text-blue-900 md:hidden"
              onClick={toggleSidebar}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`sidebar md:hidden ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              {currentLanguage.home}
            </Link>
          </li>
          {/* 4. Add Service links to mobile menu for better UX */}
          <li className="sidebar-subtitle">{currentLanguage.services}</li>
            {servicesDropdown.map((item, index) => (
                <li key={`mobile-${index}`} className="sidebar-subitem">
                    <Link to={item.path} onClick={toggleSidebar}>
                        {item.title}
                    </Link>
                </li>
            ))}
          <li className="sidebar-divider"></li>
          <li>
            <Link to="/trip" onClick={toggleSidebar}>
              {currentLanguage.trip}
            </Link>
          </li>
          <li>
            <Link to="/travellocations" onClick={toggleSidebar}>
              {currentLanguage.travellocations}
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={toggleSidebar}>
              {currentLanguage.blog}
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleSidebar}>
              {currentLanguage.about}
            </Link>
          </li>
          <li>
            <Link to="/donate" onClick={toggleSidebar}>
              {currentLanguage.donate}
            </Link>
          </li>
          <li className="lang">
            EN
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  id="check-5-mobile" // Use a different ID for the mobile checkbox
                  type="checkbox"
                  checked={isHindi}
                  onChange={onToggleLanguage}
                />
                <label htmlFor="check-5-mobile" />
              </div>
            </div>
            HI
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;