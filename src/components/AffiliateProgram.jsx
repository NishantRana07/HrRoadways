import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Gift, 
  TrendingUp, 
  UserPlus, 
  Star, 
  Copy, 
  Check,
  Users, 
  Zap
} from 'lucide-react';
import '../styles/AffiliateProgram.css'; // Import the CSS file
import Loading from './Loading'

// Custom hook to fetch translations
const useTranslation = (isHindi) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  // Replace with your hosted JSON blob URL that contains the translation data
  const translationsUrl = 'https://jsonblob.com/api/jsonBlob/1398316101938634752';

  useEffect(() => {
    fetch(translationsUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentLanguage(isHindi ? data.hi : data.en);
      })
      .catch((error) => {
        console.error('Error fetching translations:', error);
      });
  }, [isHindi, translationsUrl]);

  return currentLanguage;
};

const AffiliateProgram = ({ isHindi = false }) => {
  const t = useTranslation(isHindi);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');
  const [referralCode] = useState('HR' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [stats, setStats] = useState({
    totalAffiliates: 1247,
    totalEarnings: '₹2,345,678',
    averageCommission: '₹1,890'
  });

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const tabContent = t ? {
    benefits: (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {t.benefits.map((benefit, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl shadow-lg text-center ${benefit.color}`}
          >
            <div className="flex items-center justify-center mb-4">
              <benefit.icon className="w-12 h-12" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
            <p className="text-sm">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    ),
    howItWorks: (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {[
          { 
            title: t.signUp, 
            description: t.signUpDescription,
            icon: UserPlus
          },
          { 
            title: t.share, 
            description: t.shareDescription,
            icon: Copy
          },
          { 
            title: t.earn, 
            description: t.earnDescription,
            icon: DollarSign
          }
        ].map((step, index) => (
          <div key={index} className="flex items-center p-4 space-x-6 bg-blue-50 rounded-xl">
            <div className="p-3 bg-blue-100 rounded-full">
              <step.icon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    ),
    earnings: (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {[
          { 
            title: t.totalAffiliates, 
            value: stats.totalAffiliates,
            icon: Users
          },
          { 
            title: t.totalEarnings, 
            value: stats.totalEarnings,
            icon: DollarSign
          },
          { 
            title: t.avgCommission, 
            value: stats.averageCommission,
            icon: Star
          }
        ].map((stat, index) => (
          <div 
            key={index} 
            className="p-6 text-center transition bg-white border-2 border-blue-100 rounded-xl hover:shadow-lg"
          >
            <div className="flex items-center justify-center mb-4">
              <stat.icon className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-blue-800">{stat.title}</h3>
            <p className="text-2xl font-extrabold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </motion.div>
    )
  } : {};

  if (!t) {
    return <Loading />;
  }

  return (
    <div className="affiliate-program-container">
      <div className="container px-4 mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="header"
        >
          <h1 className="header-title">
            {t.headerTitle}
          </h1>
          <p className="header-description">
            {t.headerDescription}
          </p>
        </motion.header>

        <div className="tabs-container">
          <div className="tabs">
            {Object.entries(t.tabs).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`tab ${activeTab === key ? 'active-tab' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="tabs-content">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="referral-code-container"
        >
          <h2 className="referral-code-title">{t.referralCode}</h2>
          <div className="referral-code-box">
            <div className="referral-code">
              {referralCode}
            </div>
            <button 
              onClick={copyReferralCode}
              className="copy-button"
            >
              {copiedCode ? <Check className="icon" /> : <Copy className="icon" />}
            </button>
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="footer"
        >
          <h2 className="footer-title">
            {t.footerTitle}
          </h2>
          <button className="sign-up-button">
            <Zap className="icon" />
            <span>{t.signUp}</span>
            <Zap className="icon" />
          </button>
        </motion.footer>
      </div>
    </div>
  );
};

export default AffiliateProgram;