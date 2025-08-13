import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Let's assume you've hosted your new JSON file somewhere, or you can import it directly
// For this example, let's use a direct import. You can replace with a fetch call.
import packagesData from '../data/travel_packages.json';
const TravelPackages = ({ isHindi }) => { // Receive isHindi prop
  const { t } = useTranslation();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // If fetching from a URL:
    // fetch('YOUR_JSON_HOSTING_LINK_FOR_PACKAGES')
    //   .then(response => response.json())
    //   .then(data => setPackages(data));

    // For local import:
    setPackages(packagesData);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          {t('packagesPage.title')}
        </h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative"
              variants={cardVariants}
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-full z-10">
                LIMITED OFFER
              </div>
              <img src={pkg.imageUrl} alt={t(`${pkg.i18nKey}.title`)} className="w-full h-56 object-cover"/>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t(`${pkg.i18nKey}.title`)}</h2>
                <p className="text-gray-600 mb-4">{t(`${pkg.i18nKey}.description`)}</p>

                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-semibold text-green-600">₹{pkg.discountedPrice.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</p>
                </div>

                <div className="text-sm text-gray-700 mb-4">
                  <p className="font-bold">{t('packagesPage.includes')}</p>
                  <ul className="list-disc list-inside mt-1">
                      {pkg.includes.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <p className="text-xs text-red-700 font-semibold mb-4">{t('packagesPage.offer_valid')} {new Date(pkg.validUntil).toLocaleDateString('en-GB')}</p>

                <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  {t('packagesPage.book_now')}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TravelPackages;