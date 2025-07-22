

const Navigation = ({ isHindi, onToggleLanguage }) => {
  // ─── State Hooks ───────────────────────────────────────
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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
            <Link to="/rules" className="hover:underline">
              {currentLanguage.guide}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="lang flex items-center">
              EN
              <div className="checkbox-wrapper-5 ml-2 mr-2">
                <div className="check">
                  <input
                    id="check-5"
                    type="checkbox"
                    checked={isHindi}
                    onChange={onToggleLanguage}
                    className="sr-only"
                  />
                  <label htmlFor="check-5" className="toggle-label"></label>
                </div>
              </div>
              HI
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`sticky top-0 z-50 w-full ${
          isScrolled ? "shadow-lg bg-white" : "bg-white/95"
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} alt="Haryana Roadways Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-blue-900">
                Haryana Roadways
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {currentLanguage.home}
              </Link>

              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                  {currentLanguage.services}
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                    <Link
                      key={idx}
                      to={item.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/trip"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {currentLanguage.trip}
              </Link>
              <Link
                to="/travellocations"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {currentLanguage.travellocations}
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {currentLanguage.about}
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {currentLanguage.blog}
              </Link>
              <Link
                to="/donate"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {currentLanguage.donate}
              </Link>

              <Link
                to="/helpline"
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center text-base font-semibold ml-4"
              >
                <Phone className="w-4 h-4 mr-1" />
                {currentLanguage.helpline}
              </Link>
            </div>


              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

                />
              </button>
              {isServicesOpen && (
                <ul className="ml-4 mt-1 space-y-2">
                  {servicesDropdown.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={toggleSidebar}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/trip"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600"
              >
                {currentLanguage.trip}
              </Link>
            </li>
            <li>
              <Link
                to="/travellocations"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600"
              >
                {currentLanguage.travellocations}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600"
              >
                {currentLanguage.about}
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600"
              >
                {currentLanguage.blog}
              </Link>
            </li>
            <li>
              <Link
                to="/donate"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600"
              >
                {currentLanguage.donate}
              </Link>
            </li>
            <li>
              <Link
                to="/helpline"
                onClick={toggleSidebar}
                className="block py-2 hover:text-blue-600"
              >
                {currentLanguage.helpline}
              </Link>
            </li>

            <li className="flex items-center justify-between py-2">
              <span>EN</span>
              <div className="checkbox-wrapper-5">
                <div className="check">
                  <input
                    id="mobile-check-5"
                    type="checkbox"
                    checked={isHindi}
                    onChange={onToggleLanguage}
                    className="sr-only"
                  />
                  <label htmlFor="mobile-check-5" className="toggle-label"></label>
                </div>
              </div>
              <span>HI</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
