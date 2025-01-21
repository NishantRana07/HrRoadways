import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/footer.css'; // Import the CSS file

function Footer({ isHindi }) {
  // Example translations for demonstration
  const translations = {
    en: {
      company: "company",
      aboutUs: "About us",
      services: "our services",
      privacy: "privacy policy",
      affiliate: "affiliate program",
      getHelp: "get help",
      faq: "FAQ",
      contactUs: "contact us",
      busStatus: "Bus status",
      paymentOptions: "payment options",
      rides: "Rides",
      trips: "Trips",
      luxury: "Luxury destination",
      visitCities: "Visit cities",
      bestRides: "Best rides",
      followUs: "follow us",
    },
    hi: {
      company: "कंपनी",
      aboutUs: "हमारे बारे में",
      services: "हमारी सेवाएँ",
      privacy: "गोपनीयता नीति",
      affiliate: "सहबद्ध कार्यक्रम",
      getHelp: "सहायता प्राप्त करें",
      faq: "सामान्य प्रश्न",
      contactUs: "संपर्क करें",
      busStatus: "बस स्थिति",
      paymentOptions: "भुगतान विकल्प",
      rides: "सवारी",
      trips: "यात्राएँ",
      luxury: "लग्जरी गंतव्य",
      visitCities: "शहरों की यात्रा करें",
      bestRides: "सर्वश्रेष्ठ सवारी",
      followUs: "हमें फॉलो करें",
    },
  };

  // Decide which language to use
  const t = isHindi ? translations.hi : translations.en;

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>{t.company}</h4>
              <ul>
                <li><Link to="/about">{t.aboutUs}</Link></li>
                <li><a href="/services">{t.services}</a></li>
                <li><a href="/privacy">{t.privacy}</a></li>
                <li><a href="/affiliate">{t.affiliate}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.getHelp}</h4>
              <ul>
                <li><a href="/faq">{t.faq}</a></li>
                <li><a href="/helpline">{t.contactUs}</a></li>
                <li><a href="/bus-status">{t.busStatus}</a></li>
                <li><a href="/payment-options">{t.paymentOptions}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.rides}</h4>
              <ul>
                <li><a href="/trip">{t.trips}</a></li>
                <li><a href="/luxury">{t.luxury}</a></li>
                <li><a href="/travellocations">{t.visitCities}</a></li>
                <li><a href="/bestRides">{t.bestRides}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.followUs}</h4>
              <div className="social-links">
                <a href="https://github.com/NishantRana07"><i className="fab fa-facebook-f"></i></a>
                <a href="https://github.com/NishantRana07/"><i className="fab fa-x-twitter"></i></a>
                <a href="https://github.com/NishantRana07/"><i className="fab fa-instagram"></i></a>
                <a href="https://github.com/NishantRana07/"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;