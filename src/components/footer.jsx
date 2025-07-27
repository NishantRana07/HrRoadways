import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bus,
  MapPin,
  Clock,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Share,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LOGO from "../assets/LogoHR.png"; // Adjust the path as necessary

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
    <footer className="bg-[#0a1f44] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10 relative">
        {/* Logo Header */}
        <div className="flex justify-center md:justify-start items-center mb-10">
          <img src={LOGO} alt="Logo" className="h-12 w-auto object-contain" />
          <h2 className="ml-4 text-2xl font-bold uppercase tracking-wide text-white">
            Haryana Roadways
          </h2>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
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
          ].map((section, index) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-4">
                <section.icon className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold uppercase">
                  {section.title}
                </h4>
              </div>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.to}
                      className="text-white/80 text-sm hover:text-white  duration-200 relative group pl-1"
                    >
                      {link.label}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5   group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Time and Date */}
        <div className="absolute top-6 right-6 text-sm flex gap-4 items-center max-md:static max-md:flex-col max-md:items-center max-md:mb-6">
          <div className="flex items-center gap-2 text-white/80 bg-white/10 px-4 py-2 rounded-md">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 bg-white/10 px-4 py-2 rounded-md">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{currentTime.toLocaleDateString()}</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-4 border-t border-white/20 text-center">
          {/* Social Media Row */}
          <div className="mt-6 mb-4 flex justify-center gap-5">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:text-blue-400 hover:bg-blue-400/20 transition-colors duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <p className="text-white/60 text-sm">
            © 2025 Haryana Roadways. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
