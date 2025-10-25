import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/nav.css";

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleLanguage = () => setLanguage(language === "EN" ? "FR" : "EN");

  return (
    <>
      {/* Navbar */}
      <header>
        <nav className="flex justify-between items-center p-4 bg-blue-900 text-white relative">
          <div className="logo font-bold text-xl">
            <Link to="/">MyApp</Link>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-6 items-center">
            <li>
              <NavLink to="/" className="nav-link" activeclassname="active">
                Home
              </NavLink>
            </li>
            <li
              className="group relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="nav-link cursor-pointer">Services</span>
              <ul className={`dropdown ${dropdownOpen ? "show" : ""}`}>
                <li>
                  <Link to="/web">Web Development</Link>
                </li>
                <li>
                  <Link to="/mobile">Mobile Apps</Link>
                </li>
                <li>
                  <Link to="/design">UI/UX Design</Link>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to="/about"
                className="nav-link"
                activeclassname="active"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="nav-link"
                activeclassname="active"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <button className="guide-link">Guide</button>
            </li>
            <li>
              {/* Language toggle */}
              <div className="checkbox-wrapper-5">
                <div className="check">
                  <input
                    type="checkbox"
                    checked={language === "FR"}
                    onChange={toggleLanguage}
                  />
                  <label />
                </div>
              </div>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Sidebar for Mobile */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        <ul>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              activeclassname="active"
              onClick={toggleSidebar}
            >
              Home
            </NavLink>
          </li>
          <li>
            <div className="nav-link cursor-pointer" onClick={toggleDropdown}>
              Services
            </div>
            <ul className={`dropdown ${dropdownOpen ? "show" : ""}`}>
              <li>
                <Link to="/web" onClick={toggleSidebar}>
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/mobile" onClick={toggleSidebar}>
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link to="/design" onClick={toggleSidebar}>
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/about"
              className="nav-link"
              activeclassname="active"
              onClick={toggleSidebar}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="nav-link"
              activeclassname="active"
              onClick={toggleSidebar}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <button className="guide-link" onClick={toggleSidebar}>
              Guide
            </button>
          </li>
          <li className="language-selector-mobile">
            {/* Mobile Language Toggle */}
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  type="checkbox"
                  checked={language === "FR"}
                  onChange={toggleLanguage}
                />
                <label />
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Nav;
