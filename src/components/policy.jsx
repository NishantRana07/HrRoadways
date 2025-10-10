import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  MapPin, 
  Shield, 
  Phone, 
  Mail, 
  CreditCard, 
  Headphones, 
  AlertTriangle, 
  Lock, 
  Hammer,
  MessageCircle,
  HelpCircle,
  Star,
  ClipboardList,
  Download,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';
import Loading from './Loading';

// Custom hook to fetch translations
const useTranslation = (initialLanguage) => {
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const translationsUrl = 'https://jsonblob.com/api/jsonBlob/1338192958461239296';

  useEffect(() => {
    fetch(translationsUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentLanguage(initialLanguage === 'hi' ? data.hi : data.en);
      })
      .catch((error) => {
        console.error('Error fetching translations:', error);
      });
  }, [initialLanguage]);

  return currentLanguage;
};

const InfoPage = ({ initialLanguage = 'en' }) => {
  const currentTranslation = useTranslation(initialLanguage);
  const [language, setLanguage] = useState(initialLanguage);
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedFAQs, setExpandedFAQs] = useState({});
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState(''); // 🔹 ADD: Newsletter email state
  const [isSubscribing, setIsSubscribing] = useState(false); // 🔹 ADD: Subscribing loader

  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
  };

  const toggleFAQ = (index) => {
    setExpandedFAQs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSupportFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Support Request Submitted', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    setSupportModalOpen(false);
  };

  // 🔹 ADD: Newsletter subscription submit handler
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Subscribed Email:', newsletterEmail);
    setNewsletterEmail('');
    setIsSubscribing(false);
    alert('Thank you for subscribing!');
  };

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeSection]);

  if (!currentTranslation) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 text-gray-800 dark:bg-gray-950 dark:text-white">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
              <Globe className="text-white h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {currentTranslation.header.title}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
            >
              <span className="font-medium">{language === 'en' ? 'हिं' : 'EN'}</span>
              <Globe className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setSupportModalOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Headphones className="h-5 w-5" />
              <span className="font-semibold">Support</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Enhanced Sidebar */}
        <div className="md:col-span-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sticky top-24 h-fit border border-gray-100">
          {Object.entries(currentTranslation.sections).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full text-left p-4 rounded-xl mb-2 flex items-center space-x-3 transition-all duration-300 ${
                activeSection === key 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'hover:bg-gray-50/80 text-gray-700 hover:shadow-md'
              }`}
            >
              {key === 'overview' && <MapPin className="h-5 w-5" />}
              {key === 'guidelines' && <ClipboardList className="h-5 w-5" />}
              {key === 'emergencySupport' && <AlertTriangle className="h-5 w-5" />}
              {key === 'privacyPolicy' && <Lock className="h-5 w-5" />}
              {key === 'customerCare' && <Headphones className="h-5 w-5" />}
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Enhanced Content Sections */}
        <div className="md:col-span-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100" ref={sectionRef}>
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                {currentTranslation.header.subtitle}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentTranslation.overviewContent.description}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {currentTranslation.overviewContent.keyFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                        <Star className="h-6 w-6 text-blue-600 group-hover:text-white" />
                      </div>
                      <span className="text-lg font-semibold text-gray-800">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'guidelines' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Travel Guidelines & FAQs
              </h2>
              {currentTranslation.faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                    <div className="p-2 bg-blue-100 rounded-full">
                      {expandedFAQs[index] ? 
                        <ChevronUp className="h-5 w-5 text-blue-600" /> : 
                        <ChevronDown className="h-5 w-5 text-blue-600" />}
                    </div>
                  </div>
                  {expandedFAQs[index] && (
                    <p className="mt-4 text-gray-600 pl-2 border-l-4 border-blue-600 animate-fade-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'emergencySupport' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Emergency Support Services
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {currentTranslation.emergencySections.map((section, index) => (
                  <div 
                    key={index} 
                    className="relative bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="mb-5 flex justify-center">
                        <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
                          {React.cloneElement(section.icon, { className: 'h-8 w-8 text-white' })}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 text-center mb-4">
                        {section.description}
                      </p>
                      <div className="text-center">
                        <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                          {section.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentTranslation.supportForm.title}
              </h2>
              <button 
                onClick={() => setSupportModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentTranslation.supportForm.namePlaceholder}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleSupportFormChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentTranslation.supportForm.emailPlaceholder}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleSupportFormChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentTranslation.supportForm.messagePlaceholder}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleSupportFormChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-32"
                  required
                />
              </div>

                      {/* 🔹 ADD: Newsletter Subscription Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                  {isSubscribing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Subscribe"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setNewsletterEmail('')}
                  className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300"
                >
                  No thanks
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                By subscribing, you agree to our{' '}
                <a href="/privacy-policy" className="underline">Privacy Policy</a> and{' '}
                <a href="/terms-of-service" className="underline">Terms of Service</a>.
              </p>
            </form>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Email: support@example.com
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Phone: +91 12345 67890
            </p>
          </div>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700">
          &copy; {new Date().getFullYear()} HR Roadways. All rights reserved.
        </div>
      </footer>
          
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    {currentTranslation.supportForm.submitButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default InfoPage;
