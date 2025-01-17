import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/nav.css';
import Logo from '../assets/LogoHR.png';

function Navigation({ isHindi, onToggleLanguage }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const translations = {
        en: {
            home: "Home",
            contact: "Contact",
            donate: "Donate",
            about: "About Us",
            trip: "Trip",
        },
        hi: {
            home: "मुख्य पृष्ठ",
            contact: "संपर्क करें",
            donate: "दान करें",
            about: "हमारे बारे में",
            trip: "यात्रा",
        },
    };

    const currentLanguage = isHindi ? translations.hi : translations.en;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav>
                <div className="left">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="right">
                    <button className="hamburger" onClick={toggleSidebar}>
                        &#9776;
                    </button>
                    <ul className="nav-links">
                        <li><Link to="/">{currentLanguage.home}</Link></li>
                        <li><Link to="/contact">{currentLanguage.contact}</Link></li>
                        <li><Link to="/donate">{currentLanguage.donate}</Link></li>
                        <li><Link to="/about">{currentLanguage.about}</Link></li>
                        <li><Link to="/trip">{currentLanguage.trip}</Link></li>
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
            </nav>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>
                    &times;
                </button>
                <ul>
                    <li><Link to="/" onClick={toggleSidebar}>{currentLanguage.home}</Link></li>
                    <li><Link to="/contact" onClick={toggleSidebar}>{currentLanguage.contact}</Link></li>
                    <li><Link to="/donate" onClick={toggleSidebar}>{currentLanguage.donate}</Link></li>
                    <li><Link to="/about" onClick={toggleSidebar}>{currentLanguage.about}</Link></li>
                    <li><Link to="/trip" onClick={toggleSidebar}>{currentLanguage.trip}</Link></li>
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
}

export default Navigation;
