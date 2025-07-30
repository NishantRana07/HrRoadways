import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bus, MapPin, Clock, Globe, Facebook, Instagram, Linkedin, Share } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/footer.css';

const XIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1227"
    fill="currentColor"
  >
    <path d="M713.7 545.7 1160.9 0H1052L677.9 483.4 382.7 0H0l465.2 758.2L0 1226.8h108.9l397.5-500.5 
    309.7 500.5h382.7L713.7 545.7z" />
  </svg>
);


function Footer() {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-bg-overlay" />
      <div className="footer-time">
        <div className="footer-time-content">
          <Globe className="footer-time-icon" />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
        <div className="footer-date-content">
          <Clock className="footer-date-icon" />
          <span>{currentTime.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-header">
          <div className="footer-logo">
            <Bus className="footer-logo-icon" />
            <h2 className="footer-title">Haryana Roadways</h2>
          </div>
        </div>

        <div className="footer-sections">
          {[
            {
              title: t('footer.company'),
              icon: MapPin,
              links: [
                { label: t('nav.about'), to: "/about" },
                { label: t('nav.services'), to: "/services" },
                { label: t('footer.privacy'), to: "/policy" },
                { label: t('affiliate.title'), to: "/affiliate" },
              ],
            },
            {
              title: t('footer.getHelp'),
              icon: Bus,
              links: [
                { label: t('reviews.title'), to: "/reviews" },
                { label: t('nav.contact'), to: "/contact" },
                { label: t('nav.track'), to: "/track" },
                { label: t('payment.title'), to: "/payment" },
              ],
            },
            {
              title: t('footer.rides'),
              icon: Globe,
              links: [
                { label: t('nav.trip'), to: "/trip" },
                { label: t('footer.luxury'), to: "/luxury" },
                { label: t('nav.travellocations'), to: "/travellocations" },
                { label: t('nav.bestrides'), to: "/bestrides" },
              ],
            },
            {
              title: t('footer.followUs'),
              icon: Share,
              links: [],
            },
          ].map((section, index) => (
            <div key={index} className="footer-section">
              <div className="footer-section-header">
                <section.icon className="footer-section-icon" />
                <h4 className="footer-section-title">{section.title}</h4>
              </div>
              {section.links.length > 0 ? (
                <ul className="footer-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.to} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="footer-social-links">
                  {[
                    { Icon: Facebook, color: "social-facebook", href: "#" },
                    { Icon: XIcon, color: "social-twitter", href: "#" },
                    { Icon: Instagram, color: "social-instagram", href: "#" },
                    { Icon: Linkedin, color: "social-linkedin", href: "https://www.linkedin.com/in/nishantrana07/" },
                  ].map(({ Icon, color, href }, idx) => (
                    <a key={idx} href={href} className="footer-social-link">
                      <Icon className={`footer-social-icon ${color}`} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <Bus className="footer-bottom-icon" />
            <p className="footer-bottom-text">{t('footer.copyright')}</p>
            <Bus className="footer-bottom-icon" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
