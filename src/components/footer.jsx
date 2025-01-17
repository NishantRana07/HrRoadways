import React from 'react';
import { Link } from 'react-router-dom';

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
                <li><a href="#">{t.services}</a></li>
                <li><a href="#">{t.privacy}</a></li>
                <li><a href="#">{t.affiliate}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.getHelp}</h4>
              <ul>
                <li><a href="#">{t.faq}</a></li>
                <li><a href="#">{t.contactUs}</a></li>
                <li><a href="#">{t.busStatus}</a></li>
                <li><a href="#">{t.paymentOptions}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.rides}</h4>
              <ul>
                <li><a href="#">{t.trips}</a></li>
                <li><a href="#">{t.luxury}</a></li>
                <li><a href="#">{t.visitCities}</a></li>
                <li><a href="#">{t.bestRides}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.followUs}</h4>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          body {
            line-height: 1.5;
            font-family: 'Poppins', sans-serif;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .container {
            max-width: 1170px;
            margin: auto;
          }
          .row {
            display: flex;
            flex-wrap: wrap;
          }
          ul {
            list-style: none;
          }
          .footer {
            background-color: #24262b;
            padding: 70px 0;
          }
          .footer-col {
            width: 25%;
            padding: 0 15px;
            margin-bottom: 30px; /* Add some space between columns */
          }
          .footer-col h4 {
            font-size: 18px;
            color: #ffffff;
            text-transform: capitalize;
            margin-bottom: 35px;
            font-weight: 500;
            position: relative;
          }
          .footer-col h4::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -10px;
            background-color: #e91e63;
            height: 2px;
            box-sizing: border-box;
            width: 50px;
          }
          .footer-col ul li:not(:last-child) {
            margin-bottom: 10px;
          }
          .footer-col ul li a {
            font-size: 16px;
            text-transform: capitalize;
            color: #bbbbbb;
            text-decoration: none;
            font-weight: 300;
            display: block;
            transition: all 0.3s ease;
          }
          .footer-col ul li a:hover {
            color: #ffffff;
            padding-left: 8px;
          }
          .footer-col .social-links a {
            display: inline-block;
            height: 40px;
            width: 40px;
            background-color: rgba(255, 255, 255, 0.2);
            margin: 0 10px 10px 0;
            text-align: center;
            line-height: 40px;
            border-radius: 50%;
            color: #ffffff;
            transition: all 0.5s ease;
          }
          .footer-col .social-links a:hover {
            color: #24262b;
            background-color: #ffffff;
          }

          /* Responsive */
          @media (max-width: 767px) {
            .footer-col {
              width: 50%;
            }
          }
          @media (max-width: 574px) {
            .footer-col {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}

export default Footer;
