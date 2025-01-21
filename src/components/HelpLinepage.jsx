import React, { useState } from 'react';
import { Phone, Mail, Clock, MessageCircle, Search } from 'lucide-react';

const HelplinePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'booking', name: 'Booking' },
    { id: 'payment', name: 'Payment' },
    { id: 'cancellation', name: 'Cancellation' },
  ];

  const faqs = [
    {
      id: 1,
      category: 'booking',
      question: 'How can I book a ticket?',
      answer: 'You can book a ticket through our website or mobile app. Select your route, choose your seat, and proceed to payment.'
    },
    {
      id: 2,
      category: 'cancellation',
      question: 'How can I cancel my booking?',
      answer: 'To cancel your booking, go to the "My Bookings" section, select the booking, and click "Cancel". Cancellation fees may apply based on timing.'
    },
    {
      id: 3,
      category: 'payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept credit cards, debit cards, and digital wallets including PayPal, Google Pay, and Apple Pay.'
    },
    {
      id: 4,
      category: 'booking',
      question: 'Can I modify my booking?',
      answer: 'Yes, you can modify your booking up to 6 hours before departure through the "Modify Booking" option or by contacting our support team.'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      <header className="bg-blue-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h1 className="text-4xl font-bold animate-fade-in">24/7 Helpline</h1>
          <p className="text-xl mt-4 opacity-90">Always here to assist you anytime, anywhere!</p>
          
          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl mx-auto">
          <input type="text" placeholder="Search for help..." className="w-full px-6 py-3 rounded-full text-gray-800 border-2 border-transparent focus:border-blue-400 outline-none transition-all duration-300 pl-12 bg-gray-100 hover:bg-gray-50 hover:shadow-md hover:border-blue-400 focus:shadow-blue-400" value={searchQuery} onChange={(e) =>setSearchQuery(e.target.value)}/>
          <Search
            className="absolute left-4 top-3.5 text-gray-400 transition-colors duration-300 hover:text-blue-500"
            size={20}
          />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <Phone className="text-blue-600 mb-4" size={24} />
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <a href="tel:+18001234567" className="text-blue-600 hover:text-blue-800 transition-colors">
              +1 800 123 4567
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <Mail className="text-blue-600 mb-4" size={24} />
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <a href="mailto:support@busbooking.com" className="text-blue-600 hover:text-blue-800 transition-colors">
              support@haryanaroadways.com
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <MessageCircle className="text-blue-600 mb-4" size={24} />
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors">
              Start Chat
            </button>
          </div>
        </div>

        {/* FAQs Section */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">
            Frequently Asked Questions
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-100 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <span className={`transform transition-transform duration-300 ${
                    expandedFaq === faq.id ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === faq.id ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="p-4 text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Hours */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <Clock className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-blue-900">Contact Hours</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Phone Support</h3>
              <p className="text-gray-600">24/7 Available</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Email Response Time</h3>
              <p className="text-gray-600">Within 2 hours</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-4">Need more help? We're here for you!</p>
          <p className="text-sm opacity-75">© 2025 Haryana Roadways Service. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HelplinePage;