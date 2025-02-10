import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
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
      pass: "Bus Pass",
      helpline: "24x7 Helpline",
      blog: "Blog",
      quickLinks: "Quick Links",
      travellocations: "Travel",
      guide: "Guide and Rules" // Add new translation
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
      pass: "बस पास",
      helpline: "24x7 हेल्पलाइन",
      blog: "ब्लॉग",
      quickLinks: "त्वरित लिंक",
      travellocations: "यात्रा",
      guide: "मार्गदर्शिका और नियम" // Add new translation
    },
  };

  const currentLanguage = isHindi ? translations.hi : translations.en;

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
    { title: currentLanguage.pass, path: '/pass' },
  ];

  const toggleSidebar = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="bg-blue-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
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
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="Haryana Roadways Logo" className="w-8 h-8" />
              <span className="font-bold text-xl text-blue-900">
                Haryana Roadways
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">
                {currentLanguage.home}
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="nav-link flex items-center">
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

              <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <Link to="/helpline">{currentLanguage.helpline}</Link>
              </button>
            </div>

            <button
              className="md:hidden text-blue-900"
              onClick={toggleSidebar}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              {currentLanguage.home}
            </Link>
          </li>
          <li>
            <Link to="/donate" onClick={toggleSidebar}>
              {currentLanguage.donate}
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleSidebar}>
              {currentLanguage.about}
            </Link>
          </li>
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
        </ul>
      </div>
    </>
  );
};

export default Navigation;