import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bus, MapPin, Clock, Globe, Share } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../styles/footer.css";
import { socialMediaLinks } from "../utils/translationKeyMap";
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
    <footer className="footer w-full">

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
              title: t("footer.company"),
              icon: MapPin,
              links: [
                { label: t("nav.about"), to: "/about" },
                { label: t("nav.services"), to: "/services" },
                { label: t("footer.privacy"), to: "/policy" },
                { label: t("affiliate.title"), to: "/affiliate" },
              ],
            },
            {
              title: t("footer.getHelp"),
              icon: Bus,
              links: [
                { label: t("reviews.title"), to: "/reviews" },
                { label: t("nav.contact"), to: "/contact" },
                { label: t("nav.track"), to: "/track" },
                { label: t("payment.title"), to: "/payment" },
              ],
            },
            {
              title: t("footer.rides"),
              icon: Globe,
              links: [
                { label: t("nav.trip"), to: "/trip" },
                { label: t("footer.luxury"), to: "/luxury" },
                { label: t("nav.travellocations"), to: "/travellocations" },
                { label: t("nav.bestrides"), to: "/bestrides" },
              ],
            },
            {
              title: t("footer.followUs"),
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
                  {socialMediaLinks.map(
                    ({ Icon, color, href, target, rel, label }, idx) => (
                      <a
                        key={idx}
                        href={href}
                        target={target}
                        rel={rel}
                        aria-label={label}
                        className="footer-social-link"
                      >
                        <Icon className={`footer-social-icon ${color}`} />
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-bottom-text">{t("footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
