import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus,
  Shield,
  CreditCard,
  MapPin,
  Wifi,
  CheckCircle,
  Headphones,
  TrendingUp,
  Clock,
  Smartphone,
  AlertTriangle,
} from "lucide-react";
import "../styles/OurServices.css";
import Loading from "./Loading";

const iconMap = {
  Bus,
  Wifi,
  CreditCard,
  Shield,
  MapPin,
  CheckCircle,
  Headphones,
  TrendingUp,
  Clock,
  Smartphone,
  AlertTriangle,
};

// Custom hook to fetch translations
const useTranslation = (isHindi) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  // Replace with your hosted JSON blob URL that contains the translation data
  const translationsUrl =
    "https://jsonblob.com/api/jsonBlob/1398339756236136448";

  useEffect(() => {
    fetch(translationsUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentLanguage(isHindi ? data.hi : data.en);
      })
      .catch((error) => {
        console.error("Error fetching translations:", error);
      });
  }, [isHindi, translationsUrl]);

  return currentLanguage;
};

const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};

const ServiceCard = ({ icon: Icon, title, description, color }) => {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 50,
      }}
      transition={{ duration: 0.5 }}
      className="service-card group"
    >
      <div className={`service-icon bg-${color}-100 text-${color}-600`}>
        <Icon className="w-10 h-10 m-auto" />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <div className="service-hover-effect">
        <span className="hover-text">Learn More</span>
      </div>
    </motion.div>
  );
};

const ServiceCategories = ({ isHindi }) => {
  const t = useTranslation(isHindi);
  const [activeCategory, setActiveCategory] = useState("passenger");

  if (!t) {
    return <Loading />;
  }

  const categories = [
    {
      id: "passenger",
      icon: Bus,
      title: t.passenger.title,
      services: t.passenger.services,
    },
    {
      id: "digital",
      icon: Smartphone,
      title: t.digital.title,
      services: t.digital.services,
    },
    {
      id: "safety",
      icon: Shield,
      title: t.safety.title,
      services: t.safety.services,
    },
  ];

  return (
    <div className="service-categories-container dark:bg-gray-950 dark:text-white">
      <div className="category-tabs ">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={ `category-tab ${
              activeCategory === category.id ? "active" : ""
            }`}
          >
            <category.icon className="tab-icon" />
            {category.title}
          </button>
        ))}
      </div>
      <div className="category-content">
        <AnimatePresence mode="wait">
          {categories.map(
            (category) =>
              activeCategory === category.id && (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="category-services"
                >
                  {category.services.map((service, index) => (
                    <div key={index} className="category-service-item">
                      <CheckCircle className="service-check-icon" />
                      <div>
                        <h4 className="service-item-title">{service.title}</h4>
                        <p className="service-item-description">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ServicesPage = ({ isHindi }) => {
  const t = useTranslation(isHindi);
  const [stats, setStats] = useState({
    dailyPassengers: 50000,
    coverageArea: 120,
    busFleet: 2500,
    customerSatisfaction: 4.5,
  });

  const statsRef = useRef(null);
  const isStatsVisible = useIntersectionObserver(statsRef, { threshold: 0.1 });

  if (!t) {
    return <Loading />;
  }

  return (
    <div className="services-page dark:bg-gray-950 dark:text-white">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="services-header"
      >
        <h1 className="services-title">{t.title}</h1>
        <p className="services-subtitle">{t.subtitle}</p>
      </motion.header>

      <section className="key-services dark:bg-gray-950 dark:text-white">
        <div className="services-grid">
          {t.keyServices.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <ServiceCard
                key={index}
                icon={IconComponent}
                title={service.title}
                description={service.description}
                color={service.color}
              />
            );
          })}
        </div>
      </section>

      <ServiceCategories isHindi={isHindi} />

      <section ref={statsRef} className="services-stats rounded-lg dark:bg-gray-950 dark:text-white">
        <div className="stats-container">
          {Object.entries(stats).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isStatsVisible ? 1 : 0,
                scale: isStatsVisible ? 1 : 0.8,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="stat-item"
            >
              <div className="stat-value">
                {key === "customerSatisfaction" ? `${value}/5` : value}
                {key === "coverageArea" && "+"}
              </div>
              <div className="stat-label">{t.statsLabels[key]}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="additional-services rounded-lg mt-8 dark:bg-gray-950 dark:text-white">
        <h2 className="section-title text-gray-800">{t.additionalSupport}</h2>
        <div className="support-grid">
          {t.additionalServices.map((service, index) => {
            const IconComponent = iconMap[service.icon]
            return (
            <div key={index} className="support-card">
              <IconComponent className="support-icon" />
              <h3 className="text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          )})}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
