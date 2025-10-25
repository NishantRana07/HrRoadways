import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bus, MapPin, Clock, Globe, Share, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../styles/footer.css";
import { socialMediaLinks } from "../utils/translationKeyMap";

function Footer() {
  const { t } = useTranslation();

  // 🕓 Current Time & Date
  const [currentTime, setCurrentTime] = useState(new Date());

  // 📧 Newsletter State
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // 📩 Newsletter Subscription Handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setSubscriptionStatus(t("newsletter.enterEmail"));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSubscriptionStatus(t("newsletter.invalidEmail"));
      return;
    }

    setIsLoading(true);
    setSubscriptionStatus("");

    try {
      // Mock backend API endpoint
      const API_BASE_URL = "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscriptionStatus(t("newsletter.success"));
        setEmail("");
        setSubscribed(true);
      } else {
        setSubscriptionStatus(data.message || t("newsletter.error"));
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubscriptionStatus(t("newsletter.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-overlay" />

      {/* Time and Date */}
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
        {/* Logo and Header */}
        <div className="footer-header">
          <Bus className="footer-logo-icon" />
          <h2 className="footer-title">Haryana Roadways</h2>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <Mail className="footer-newsletter-icon" />
          <h3>{t("footer.newsletterTitle") || "Subscribe to our Newsletter"}</h3>

          {!subscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer-input"
              />
              <button type="submit" disabled={isLoading} className="footer-btn">
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          ) : (
            <p className="footer-success">🎉 Thank you for subscribing!</p>
          )}

          {subscriptionStatus && (
            <p className="footer-status">{subscriptionStatus}</p>
          )}
        </div>

        {/* Footer Links */}
        <div className="footer-links-container">
          {[
            {
              title: t("footer.company") || "Company",
              icon: MapPin,
              links: [
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Privacy Policy", to: "/policy" },
                { label: "Affiliate", to: "/affiliate" },
              ],
            },
            {
              title: t("footer.help") || "Help",
              icon: Bus,
              links: [
                { label: "Contact", to: "/contact" },
                { label: "Track", to: "/track" },
                { label: "Reviews", to: "/reviews" },
              ],
            },
          ].map((section, i) => (
            <div key={i} className="footer-section">
              <section.icon className="footer-section-icon" />
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="footer-socials">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            {socialMediaLinks.map(({ Icon, href, label }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© 2025 Haryana Roadways. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
