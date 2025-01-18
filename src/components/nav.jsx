import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/nav.css';
import Logo from '../assets/LogoHR.png'; // Import the project logo
import { Menu, X, ChevronDown, Phone, Search } from 'lucide-react'; // Remove Bus import

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
      search: "Search Routes",
      blog: "Blog", // Added Blog in English
      quickLinks: "Quick Links"
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
      search: "मार्ग खोजें",
      blog: "ब्लॉग", // Added Blog in Hindi
      quickLinks: "त्वरित लिंक"
    }
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
    { title: currentLanguage.pass, path: '/pass' }
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
            <button className="flex items-center hover:text-blue-200">
              <Search className="w-4 h-4 mr-1" />
              {currentLanguage.search}
            </button>
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

      <nav className={`sticky top-0 z-50 w-full ${isScrolled ? 'shadow-lg bg-white' : 'bg-white/95'} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="Haryana Roadways Logo" className="w-8 h-8" />
              <span className="font-bold text-xl text-blue-900">Haryana Roadways</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">{currentLanguage.home}</Link>
              
              <div className="relative group">
                <button 
                  className="nav-link flex items-center"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  {currentLanguage.services}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-1"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
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
                )}
              </div>

              <Link to="/trip" className="nav-link">{currentLanguage.trip}</Link>
              <Link to="/about" className="nav-link">{currentLanguage.about}</Link>
              <Link to="/blog" className="nav-link">{currentLanguage.blog}</Link> {/* Added Blog Link */}
              <Link to="/contact" className="nav-link">{currentLanguage.contact}</Link>
              
              <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {currentLanguage.helpline}
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
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>{currentLanguage.home}</Link></li>
          <li><Link to="/contact" onClick={toggleSidebar}>{currentLanguage.contact}</Link></li>
          <li><Link to="/donate" onClick={toggleSidebar}>{currentLanguage.donate}</Link></li>
          <li><Link to="/about" onClick={toggleSidebar}>{currentLanguage.about}</Link></li>
          <li><Link to="/trip" onClick={toggleSidebar}>{currentLanguage.trip}</Link></li>
          <li><Link to="/blog" onClick={toggleSidebar}>{currentLanguage.blog}</Link></li> {/* Added Blog Link */}
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

      <style>{`
        .nav-link {
          position: relative;
          color: #1e3a8a;
          font-weight: 500;
          transition: color 0.2s;
        }
        
        .nav-link:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #1e3a8a;
          transform: scaleX(0);
          transition: transform 0.2s;
        }
        
        .nav-link:hover {
          color: #1e40af;
        }
        
        .nav-link:hover:after {
          transform: scaleX(1);
        }

        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%; /* Make sidebar full width on mobile screens */
          height: 100%;
          background-color: rgba(0, 0, 50, 0.9); /* Dark navy blue with slight transparency */
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
          transform: translateX(100%);
          transition: transform 0.3s;
          z-index: 1001;
          padding-top: 60px; /* To ensure it does not overlap with the nav bar */
          color: white;
        }
        
        .sidebar.open {
          transform: translateX(0);
        }
        
        .sidebar .close-btn {
          font-size: 2rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 1rem;
          text-align: center; /* Centering the close button */
          width: 100%; /* Making the button take full width */
        }
        
        .sidebar ul {
          list-style: none;
          padding: 0;
        }
        
        .sidebar ul li {
          padding: 1rem;
          text-align: center;
          border-bottom: 1px solid #eaeaea;
        }
        
        .sidebar ul li a {
          text-decoration: none;
          color: white;
          font-weight: 500;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .hamburger {
            display: block;
          }

          .nav-links {
            display: none;
          }

          .left img {
            margin-left: 0; /* Remove left margin on smaller screens */
          }

          .right {
            justify-content: space-between; /* Ensure proper alignment */
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;