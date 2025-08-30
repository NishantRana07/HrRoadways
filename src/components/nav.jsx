import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { Menu, X, ChevronDown, Phone, ChevronRight } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useModalStore } from '../store/store';
import Login from './Login';
import SignUpModal from './SignUp';
import '../styles/nav.css';

const Logo = 'https://i.ibb.co/kg3RQQ1S/LogoHR.png';

const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimer = useRef(null);
  const location = useLocation();


  // Using zustand store for modal state
  // Using Clerk for authentication state

  const { modalType, openModal } = useModalStore();
  const { isSignedIn, user } = useUser();

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const section = document.getElementById('mainSection');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
 
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(servicesTimer.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    servicesTimer.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const servicesDropdown = [
    { title: t('nav.track'), path: '/track' },
    { title: t('nav.schedule'), path: '/schedule' },
    { title: t('nav.tourGuide'), path: '/tour-guide' },
  ];

  const toggleSidebar = () => setIsMobileMenuOpen(x => !x);
 
  return (
    <>
      {/* Full Width Top Strip */}
      <div className="top-strip bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-1.5 text-[14px] text-white h-9 flex items-center w-screen">
        <div className="w-full">
          <div className="flex justify-between items-center px-4">
            <div className="flex-1">
              <NavLink 
                to="/rules" 
                className={({ isActive }) => 
                  `flex items-center hover:text-blue-200 transition-colors text-[12px] leading-none ${isActive ? 'text-blue-300 font-semibold' : 'text-white'}`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Rules & Guidelines</span>
              </NavLink>
            </div>
            <div className="flex items-center justify-center overflow-hidden w-48">
              <div className="flex items-center font-medium leading-none animate-marquee whitespace-nowrap">
                <Phone className="w-3 h-3 mr-1.5 flex-shrink-0" />
                <span>1800-180-2345</span>
                <span className="inline-block w-16"></span> {/* Gap */}
                <Phone className="w-3 h-3 mr-1.5 flex-shrink-0" />
                <span>1800-180-2345</span>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <LanguageSelector variant="navbar" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 w-full transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="w-full mx-auto px-2 sm:px-4">
            <div className="flex justify-between items-center h-16">
              {/* Brand/Logo */}
              <NavLink 
                to="/" 
                className="flex items-center group -ml-2" 
                onClick={handleLogoClick}
              >
                <img 
                  src={Logo} 
                  alt="Haryana Roadways" 
                  className="h-8 w-auto mr-1.5 transition-transform duration-300 group-hover:scale-105" 
                />
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300 whitespace-nowrap">
                  Haryana Roadways
                </span>
              </NavLink>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-4">
                <NavLink 
                  to="/" 
                  end
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  {t('nav.home')}
                </NavLink>
                
                <div 
                  className="dropdown-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    className="nav-link flex items-center group"
                    aria-haspopup="true"
                    aria-expanded={isServicesOpen}
                  >
                    {t('nav.services')}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="dropdown-menu">
                    {servicesDropdown.map((item, idx) => (
                      <NavLink
                        key={idx}
                        to={item.path}
                        className="dropdown-item"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {['trip', 'travellocations', 'about', 'blog', 'donate'].map((path) => (
                  <NavLink 
                    key={path}
                    to={`/${path}`}
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {t(`nav.${path}`)}
                  </NavLink>
                ))}
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden lg:flex items-center space-x-3 ml-4">
                <NavLink 
                  to="/helpline" 
                  className="btn btn-primary px-4 py-2 text-sm flex items-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t('nav.helpline')}
                </NavLink>
                
                {isSignedIn ? (
                  <button
                    onClick={() => window.location.href = "/mybookings"}
                    className="btn btn-primary px-4 py-2 text-sm"
                  >
                    {user?.firstName || t('nav.profile')}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => openModal("login")}
                      className="btn btn-secondary px-4 py-2 text-sm"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => openModal("signup")}
                      className="btn btn-primary px-4 py-2 text-sm"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center">
                <button 
                  onClick={toggleSidebar}
                  className="p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 focus:outline-none"
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) toggleSidebar();
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div 
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <img src={Logo} alt="Logo" className="h-8 w-auto" />
                <span className="font-bold text-lg text-gray-900 dark:text-white">Menu</span>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-2">
              <nav className="px-4 space-y-1">
                <NavLink
                  to="/"
                  onClick={toggleSidebar}
                  className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  {t('nav.home')}
                </NavLink>

                <div className="relative">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <span>{t('nav.services')}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <div className={`pl-6 mt-1 space-y-1 ${isServicesOpen ? 'block' : 'hidden'}`}>
                    {servicesDropdown.map((item, idx) => (
                      <NavLink
                        key={idx}
                        to={item.path}
                        onClick={() => {
                          setIsServicesOpen(false);
                          toggleSidebar();
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {['trip', 'travellocations', 'about', 'blog', 'donate'].map((path) => (
                  <NavLink
                    key={path}
                    to={`/${path}`}
                    onClick={toggleSidebar}
                    className="flex items-center justify-between px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    {t(`nav.${path}`)}
                  </NavLink>
                ))}
              </nav>

              <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700 mt-auto">
                {isSignedIn ? (
                  <button
                    onClick={() => {
                      window.location.href = "/mybookings";
                      toggleSidebar();
                    }}
                    className="w-full btn btn-primary py-2.5 px-4 text-base font-medium"
                  >
                    {user?.firstName || t('nav.profile')}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        openModal("login");
                        toggleSidebar();
                      }}
                      className="w-full btn btn-secondary py-2.5 px-4 text-base font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        openModal("signup");
                        toggleSidebar();
                      }}
                      className="w-full btn btn-primary py-2.5 px-4 text-base font-medium"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={toggleSidebar}></div>}

      {/* Conditionally Render Modals */}
      {modalType === 'login' && <Login />}
      {modalType === 'signup' && <SignUpModal />}
    </>
  );

};

export default Navigation;
