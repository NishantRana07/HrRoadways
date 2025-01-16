import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/nav.css';
import Logo from '../assets/Logo.png';

function Navigation({ isHindi, onToggleLanguage }) {
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

    return (
        <nav>
            <div className="left">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="right">
                <ul>
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
    );
}

export default Navigation;
