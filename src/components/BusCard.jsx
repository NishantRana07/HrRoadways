import React from 'react';
import '../assets/BusCard.css';
import { MdPinDrop } from "react-icons/md";
import { TiFlag } from "react-icons/ti";
import { FaLongArrowAltRight } from "react-icons/fa";

import busImg from '../assets/hr_bus.png';

function BusCard({ isHindi = false }) {
  // Define English and Hindi translations
  const translations = {
    en: {
      busHeading: "Haryana Roadways",
      busSubHeading: "Have a safe journey with Haryana Roadways",
      from: "Dehradun",
      to: "Yamunanagar",
      distanceLabel: "Distance : ",
      departureLabel: "Departure Time : ",
      acLabel: "AC : ",
      fareLabel: "Fare : ",
      viaLabel: "Via - ",
      checkoutBtn: "Checkout",
      compareBtn: "Compare",
      mapBtn: "Map",
      available: "Available"
    },
    hi: {
      busHeading: "हरियाणा रोडवेज",
      busSubHeading: "हरियाणा रोडवेज के साथ सुरक्षित यात्रा करें",
      from: "देहरादून",
      to: "यमुनानगर",
      distanceLabel: "दूरी : ",
      departureLabel: "प्रस्थान समय : ",
      acLabel: "एसी : ",
      fareLabel: "किराया : ",
      viaLabel: "मार्ग - ",
      checkoutBtn: "चेकआउट",
      compareBtn: "तुलना करें",
      mapBtn: "मानचित्र",
      available: "उपलब्ध"
    },
  };

  // Choose the current translation
  const t = isHindi ? translations.hi : translations.en;

  return (
    <>
      <div className="card">
        <div className="image">
          <img src={busImg} alt="Travel" className="image_tag" />
        </div>
        {/* Image */}

        <div className="card-content">
          <h2>{t.busHeading}</h2>
          <p className="description">{t.busSubHeading}</p>
          <div className="info">
            <div>
              <i className="fa-solid fa-map-pin"></i>
              <span>{t.from}</span>

              <i className="fa-solid fa-arrow-right"></i>

              <i className="fa-solid fa-location-dot"></i>
              <span>{t.to}</span>

              <i className="fa-solid fa-bolt"></i>

              <span>{t.distanceLabel}</span>
              200 km
            </div>
            <div>
              <i className="fas fa-clock"></i>
              <span>{t.departureLabel}</span>
              8:30 AM
            </div>
            <div>
              <i className="fas fa-snowflake"></i>
              <span>{t.acLabel}</span>
              {t.available}
            </div>
            <div>
              <i className="fas fa-money-bill-wave"></i>
              <span>{t.fareLabel}</span>
              ₹500
            </div>
            <div className='via'>
              <i className="fas fa-map-marker-alt"></i>
              <b>{t.viaLabel}</b> Route A
            </div>
          </div>
        </div>
        {/* Content */}

        <div className="buttons">
          <button>{t.checkoutBtn}</button>
          <button>{t.compareBtn}</button>
          <button>{t.mapBtn}</button>
        </div>
        {/* Buttons */}
      </div>
    </>
  );
}

export default BusCard;