import  { useState, useEffect } from 'react';
import { Phone, Mail, Clock, MessageCircle, Search } from 'lucide-react';
import '../styles/HelpLinepage.css'

const HelplinePage = ({ isHindi }) => {
  const translations = {
    en: {
      title: '24/7 Helpline',
      description: 'Always here to assist you anytime, anywhere!',
      searchPlaceholder: 'Search for help...',
      callUs: 'Call Us',
      emailSupport: 'Email Support',
      liveChat: 'Live Chat',
      contactHours: 'Contact Hours',
      phoneSupport: 'Phone Support',
      emailResponseTime: 'Email Response Time',
      categories: [
        { id: 'all', name: 'All Topics' },
        { id: 'booking', name: 'Booking' },
        { id: 'payment', name: 'Payment' },
        { id: 'cancellation', name: 'Cancellation' },
      ],
      faqs: [
        {
          id: 1,
          category: 'booking',
          question: 'How can I book a ticket?',
          answer: 'You can book a ticket through our website or mobile app. Select your route, choose your seat, and proceed to payment.',
        },
        {
          id: 2,
          category: 'cancellation',
          question: 'How can I cancel my booking?',
          answer: 'To cancel your booking, go to the "My Bookings" section, select the booking, and click "Cancel". Cancellation fees may apply based on timing.',
        },
        {
          id: 3,
          category: 'payment',
          question: 'What payment methods are accepted?',
          answer: 'We accept credit cards, debit cards, and digital wallets including PayPal, Google Pay, and Apple Pay.',
        },
        {
          id: 4,
          category: 'booking',
          question: 'Can I modify my booking?',
          answer: 'Yes, you can modify your booking up to 6 hours before departure through the "Modify Booking" option or by contacting our support team.',
        },
      ],
      quickContact: 'Need more help? We are here for you!',
      copyright: '© 2025 Haryana Roadways Service. All rights reserved.',
    },
    hi: {
      title: '24/7 हेल्पलाइन',
      description: 'हमेशा यहाँ आपकी सहायता के लिए, कभी भी, कहीं भी!',
      searchPlaceholder: 'मदद के लिए खोजें...',
      callUs: 'हमें कॉल करें',
      emailSupport: 'ईमेल समर्थन',
      liveChat: 'लाइव चैट',
      contactHours: 'संपर्क समय',
      phoneSupport: 'फोन समर्थन',
      emailResponseTime: 'ईमेल प्रतिक्रिया समय',
      categories: [
        { id: 'all', name: 'सभी विषय' },
        { id: 'booking', name: 'बुकिंग' },
        { id: 'payment', name: 'भुगतान' },
        { id: 'cancellation', name: 'रद्द करना' },
      ],
      faqs: [
        {
          id: 1,
          category: 'booking',
          question: 'मैं टिकट कैसे बुक कर सकता हूँ?',
          answer: 'आप हमारी वेबसाइट या मोबाइल ऐप के माध्यम से टिकट बुक कर सकते हैं। अपने मार्ग का चयन करें, अपनी सीट चुनें और भुगतान के लिए आगे बढ़ें।',
        },
        {
          id: 2,
          category: 'cancellation',
          question: 'मैं अपनी बुकिंग कैसे रद्द कर सकता हूँ?',
          answer: 'अपनी बुकिंग रद्द करने के लिए, "मेरी बुकिंग" अनुभाग में जाएं, बुकिंग का चयन करें और "रद्द करें" पर क्लिक करें। समय के आधार पर रद्दीकरण शुल्क लागू हो सकता है।',
        },
        {
          id: 3,
          category: 'payment',
          question: 'कौन से भुगतान विधियाँ स्वीकार की जाती हैं?',
          answer: 'हम क्रेडिट कार्ड, डेबिट कार्ड और डिजिटल वॉलेट्स को स्वीकार करते हैं जिनमें पेपाल, गूगल पे और एप्पल पे शामिल हैं।',
        },
        {
          id: 4,
          category: 'booking',
          question: 'क्या मैं अपनी बुकिंग में संशोधन कर सकता हूँ?',
          answer: 'हाँ, आप प्रस्थान से 6 घंटे पहले तक "बुकिंग संशोधित करें" विकल्प के माध्यम से या हमारी समर्थन टीम से संपर्क करके अपनी बुकिंग में संशोधन कर सकते हैं।',
        },
      ],
      quickContact: 'अधिक सहायता चाहिए? हम आपके लिए यहाँ हैं!',
      copyright: '© 2025 हरियाणा रोडवेज सेवा। सर्वाधिकार सुरक्षित।',
    },
  };

  const [currentLanguage, setCurrentLanguage] = useState(translations.en);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    setCurrentLanguage(isHindi ? translations.hi : translations.en);
  }, [isHindi]);

  const filteredFaqs = currentLanguage.faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen dark:bg-gray-950 dark:text-white">
      <header className="bg-blue-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h1 className="text-4xl font-bold animate-fade-in-up delay-100">
            {currentLanguage.title}
          </h1>
          <p className="text-xl mt-4 opacity-90 animate-fade-in-up delay-200">
            {currentLanguage.description}
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl mx-auto animate-fade-in-up delay-300 text-black">
            <input 
              type="text" 
              placeholder={currentLanguage.searchPlaceholder} 
              className="w-full px-12 py-3 rounded-full text-gray-800 border-2 border-transparent 
                focus:border-blue-400 outline-none transition-all duration-300 shadow-md
                hover:shadow-lg focus:shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-4 top-3.5 text-gray-400 transition-all duration-300 
                hover:text-blue-500 hover:scale-110"
              size={20}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[Phone, Mail, MessageCircle].map((Icon, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform 
                hover:-translate-y-2 transition-all duration-300 hover:border-blue-100
                border-2 border-transparent animate-fade-in-up"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <Icon className="text-blue-600 mb-4 transition-all duration-300 hover:scale-125" size={24} />
              <h3 className="font-semibold text-lg mb-2">
                {currentLanguage[['callUs', 'emailSupport', 'liveChat'][index]]}
              </h3>
              {index === 0 ? (
                <a href="tel:+18001234567" className="text-blue-600 hover:text-blue-800 
                  transition-colors underline-effect">
                  +1 800 123 4567
                </a>
              ) : index === 1 ? (
                <a href="mailto:support@haryanaroadways.com" className="text-blue-600 hover:text-blue-800 
                  transition-colors underline-effect">
                  support@haryanaroadways.com
                </a>
              ) : (
                <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full 
                  hover:bg-blue-200 transition-colors hover:shadow-md">
                  {currentLanguage.liveChat}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <section className="bg-white rounded-xl shadow-xl hover:shadow-2xl p-8 transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6 animate-fade-in">
            {currentLanguage.contactHours}
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {currentLanguage.categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white scale-105 shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-100 shadow-md'
                } hover:shadow-lg`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-100 rounded-lg overflow-hidden transition-all 
                  duration-300 hover:border-blue-200 hover:shadow-lg group"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 transition-colors 
                    flex justify-between items-center"
                >
                  <span className="font-medium text-gray-800 group-hover:text-blue-800">
                    {faq.question}
                  </span>
                  <span className={`transform transition-transform duration-300 ${
                    expandedFaq === faq.id ? 'rotate-180 text-blue-600' : 'text-gray-600'
                  }`}>
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === faq.id 
                      ? 'max-h-48 border-t border-blue-50 shadow-inner' 
                      : 'max-h-0'
                  }`}
                >
                  <p className="p-4 text-gray-600 animate-fade-in">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Hours */}
        <section className="mt-12 bg-white rounded-xl shadow-lg hover:shadow-xl p-8 
          transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6 animate-pulse-slow">
            <Clock className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-blue-900">{currentLanguage.contactHours}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-medium mb-2">{currentLanguage.phoneSupport}</h3>
              <p className="text-gray-600">24/7 Available</p>
            </div>
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-medium mb-2">{currentLanguage.emailResponseTime}</h3>
              <p className="text-gray-600">Within 2 hours</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-8 mt-12 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-4 three-d-text" >
            {currentLanguage.quickContact}
          </p>
          <p className="text-sm opacity-75 hover:opacity-100 transition-opacity duration-300">
            {currentLanguage.copyright} 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HelplinePage;