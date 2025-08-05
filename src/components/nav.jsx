import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/nav.css';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import Register from './Register';
import { useAuthStore, useModalStore } from '../store/store';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

const Logo = 'https://i.ibb.co/kg3RQQ1S/LogoHR.png';

const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesTimer = useRef(null);

  // Using zustand store for modal and authentication state
  const { modalType, openModal } = useModalStore();
  const { user } = useAuthStore();

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
    { title: t('nav.travelPackages'), path: '/travel-packages' }, // <-- ADD THIS LINE
  ];

  const toggleSidebar = () => setIsMobileMenuOpen(x => !x);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              1800-180-2345
            </span>
            <NavLink to="/rules" className="hover:underline">
              {t('nav.guide')}
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector variant="navbar" />
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 w-full ${
          isScrolled
            ? 'shadow-lg bg-white dark:bg-gray-800'
            : 'bg-white/95 dark:bg-gray-900'
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo button that scrolls to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="Scroll to top"
            >
              <img
                src={Logo}
                alt="Haryana Roadways Logo"
                className="w-8 h-8"
              />
              <span className="font-bold text-xl text-blue-900 dark:text-white">
                Haryana Roadways
              </span>
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                {t('nav.home')}
              </NavLink>

              <div
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center dark:text-gray-300 dark:hover:text-blue-400">
                  {t('nav.services')}
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      isServicesOpen ? 'rotate-180' : ''
                    } dark:text-gray-300`}
                  />
                </button>

                <div
                  className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ${
                    isServicesOpen ? 'block' : 'hidden'
                  } dark:bg-gray-700 dark:shadow-xl`}
                >
                  {servicesDropdown.map((item, idx) => (
                    <NavLink
                      key={idx}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-600"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              </div>

              <NavLink
                to="/trip"
                className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                {t('nav.trip')}
              </NavLink>
              <NavLink
                to="/travellocations"
                className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                {t('nav.travellocations')}
              </NavLink>
              <NavLink
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                {t('nav.about')}
              </NavLink>
              <NavLink
                to="/blog"
                className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                {t('nav.blog')}
              </NavLink>
              <NavLink
                to="/donate"
                className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
              >
                {t('nav.donate')}
              </NavLink>
              <NavLink
                to="/helpline"
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center text-base font-semibold ml-4 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <Phone className="w-4 h-4 mr-1" />
                {t('nav.helpline')}
              </NavLink>
              {user ? (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                    onClick={() => {
                      // Navigate to profile or bookings page
                      window.location.href = '/mybookings';
                    }}
                  >
                    My Profile
                  </button>
                </>
              ) : (
                <>
                  {/* Conditionally render Login/Register buttons if user is not logged in */}
                  <button
                    onClick={() => openModal('login')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openModal('register')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                className="text-blue-900 focus:outline-none dark:text-white"
                onClick={toggleSidebar}
                aria-label="Toggle menu"
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

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 md:hidden dark:bg-gray-800 dark:shadow-xl`}
      >
        <div className="p-4 h-full overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ul className="space-y-4">
            {/* Language Selector at the top */}
            <li className="py-2 border-b border-gray-200 dark:border-gray-600">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                {t('common.selectLanguage', 'Select Language')}
              </div>
              <LanguageSelector variant="mobile" />
            </li>
            <li>
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                {t('nav.home')}
              </NavLink>
            </li>
            <li className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex py-2 hover:text-blue-600 items-center justify-between w-full dark:text-gray-200 dark:hover:text-blue-400"
              >
                {t('nav.services')}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isServicesOpen ? 'rotate-180' : ''
                  } dark:text-gray-200`}
                />
              </button>
              {isServicesOpen && (
                <ul className="ml-4 mt-1 space-y-2">
                  {servicesDropdown.map((item, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-600"
                        onClick={toggleSidebar}
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <NavLink
                to="/trip"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                {t('nav.trip')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/travellocations"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                {t('nav.travellocations')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                {t('nav.about')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                {t('nav.blog')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/donate"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                {t('nav.donate')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/helpline"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                {t('nav.helpline')}
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => openModal('register')}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2.5 rounded-lg text-white font-semibold transition ml-4 w-[80%]"
              >
                Register
              </button>
            </li>
            <li>
              <button
                onClick={() => openModal('login')}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2.5 rounded-lg text-white font-semibold transition ml-4 w-[80%]"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Conditionally Render Modals */}
      {modalType === 'register' && <Register />}
      {modalType === 'login' && <Login />}
      {modalType === 'forgotPassword' && <ForgotPassword />}
    </>
  );
};

export default Navigation;