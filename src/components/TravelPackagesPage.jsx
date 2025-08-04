import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import packagesData from '../data/travel_packages.json'; // This path is correct

// This component uses the in-component translation method.
const TravelPackagesPage = ({ isHindi }) => {

  // 1. Define all text for English and Hindi here
  const translations = {
    en: {
      pageTitle: "Exclusive Travel Packages",
      offerValid: "Offer valid until",
      bookNow: "Book Now",
      includes: "Package Includes:",
      packageDetails: {
        manali_adventure: {
          title: "Manali Adventure Trip",
          description: "Experience the thrilling mountains and serene landscapes of Manali."
        },
        jaipur_royal: {
          title: "Royal Jaipur Getaway",
          description: "Explore the majestic forts and rich culture of the Pink City."
        }
      }
    },
    hi: {
      pageTitle: "विशेष यात्रा पैकेज",
      offerValid: "ऑफ़र तक वैध है",
      bookNow: "अभी बुक करें",
      includes: "पैकेज में शामिल हैं:",
      packageDetails: {
        manali_adventure: {
          title: "मनाली एडवेंचर ट्रिप",
          description: "मनाली के रोमांचक पहाड़ों और शांत परिदृश्यों का अनुभव करें।"
        },
        jaipur_royal: {
          title: "शाही जयपुर गेटअवे",
          description: "गुलाबी शहर के राजसी किलों और समृद्ध संस्कृति का अन्वेषण करें।"
        }
      }
    }
  };

  // 2. Select the current language based on the isHindi prop
  const currentLanguage = isHindi ? translations.hi : translations.en;

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    setPackages(packagesData);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          {/* 3. Use the selected language text */}
          {currentLanguage.pageTitle}
        </h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {packages.map((pkg) => {
            // Get the specific package details from our translations object
            const details = currentLanguage.packageDetails[pkg.i18nKey.split('.')[1]];

            return (
              <motion.div
                key={pkg.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative"
                variants={cardVariants}
              >
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full z-10">
                  LIMITED OFFER
                </div>
                <img src={pkg.imageUrl} alt={details.title} className="w-full h-56 object-cover"/>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{details.title}</h2>
                  <p className="text-gray-600 mb-4">{details.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-green-600">₹{pkg.discountedPrice.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="text-sm text-gray-700 mb-4">
                    <p className="font-bold">{currentLanguage.includes}</p>
                    <ul className="list-disc list-inside mt-1">
                        {pkg.includes.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  
                  <p className="text-xs text-red-700 font-semibold mb-4">{currentLanguage.offerValid} {new Date(pkg.validUntil).toLocaleDateString('en-GB')}</p>

                  <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    {currentLanguage.bookNow}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default TravelPackagesPage;