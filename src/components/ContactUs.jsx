import React, { useState, useEffect } from "react";
import "../styles/ContactUs.css";
import Loading from './Loading';

// Custom hook to fetch translations
const useTranslation = (isHindi) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const translationsUrl =
    "https://jsonblob.com/api/jsonBlob/1398992308015390720";

  useEffect(() => {
    fetch(translationsUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentLanguage(isHindi ? data.hi : data.en);
      })
      .catch((error) => {
        console.error('Error fetching translations:', error);
      });
  }, [isHindi]);

  return currentLanguage;
};

const ContactUs = ({ isHindi }) => {
  const currentLanguage = useTranslation(isHindi);

  if (!currentLanguage) {
    return <Loading />;
  }

  return (
    <div className="contact-container w-full">
      {/* Header Section */}
      <div className="contact-header">
        <h1>{currentLanguage.header.title}</h1>
        <p>{currentLanguage.header.subtitle}</p>
      </div>

      {/* Contact Info Wrapper */}
      <div className="contact-info-wrapper">
        {/* Contact Numbers Section */}
        <div className="contact-numbers">
          <h2>{currentLanguage.contactNumbers.title}</h2>
          <div className="contact-details">
            <div className="contact-card">
              <i className="fa fa-phone"></i>
              <div>
                <p>{currentLanguage.contactNumbers.customerSupport}</p>
                <a href="tel:18001802345">1800-180-2345</a>
              </div>
            </div>
            <div className="contact-card">
              <i className="fa fa-phone"></i>
              <div>
                <p>{currentLanguage.contactNumbers.bookingAssistance}</p>
                <a href="tel:18001802346">1800-180-2346</a>
              </div>
            </div>
            <div className="contact-card">
              <i className="fa fa-envelope"></i>
              <div>
                <p>{currentLanguage.contactNumbers.emailSupport}</p>
                <a href="mailto:support@hrroadways.com">support@hrroadways.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Office Timings Section */}
        <div className="office-timings">
          <h2>{currentLanguage.officeTimings.title}</h2>
          <div className="timings-details">
            <p>
              <i className="fa fa-calendar"></i>
              {currentLanguage.officeTimings.weekdays}: <span>9:00 AM - 6:00 PM</span>
            </p>
            <p>
              <i className="fa fa-calendar-check"></i>
              {currentLanguage.officeTimings.saturday}: <span>10:00 AM - 4:00 PM</span>
            </p>
            <p>
              <i className="fa fa-ban"></i>
              {currentLanguage.officeTimings.sunday}: <span>{currentLanguage.officeTimings.closed}</span>
            </p>
          </div>
        </div>

        {/* Office Locations Section */}
        <div className="office-locations">
          <h2>{currentLanguage.officeLocations.title}</h2>
          <div className="location-details">
            <div className="location-card">
              <i className="fa fa-map-marker"></i>
              <div>
                <p>{currentLanguage.officeLocations.chandigarh}</p>
                <span>SCO 50-51, Sector 17, Chandigarh</span>
              </div>
            </div>
            <div className="location-card">
              <i className="fa fa-map-marker"></i>
              <div>
                <p>{currentLanguage.officeLocations.delhi}</p>
                <span>Rajiv Chowk, New Delhi, 110001</span>
              </div>
            </div>
            <div className="location-card">
              <i className="fa fa-map-marker"></i>
              <div>
                <p>{currentLanguage.officeLocations.gurgaon}</p>
                <span>Cyber Hub, DLF Phase 3, Gurgaon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;