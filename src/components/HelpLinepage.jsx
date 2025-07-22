import { useState, useEffect } from "react";
import { Phone, Mail, Clock, MessageCircle, Search } from "lucide-react";

import { helpLineTranslation } from "../data/translations";

const HelplinePage = ({ isHindi }) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    helpLineTranslation.en
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    setCurrentLanguage(
      isHindi ? helpLineTranslation.hi : helpLineTranslation.en
    );
  }, [isHindi]);

  const filteredFaqs = currentLanguage.faqs.filter(
    (faq) =>
      (selectedCategory === "all" || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
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
          <div className="mt-8 relative max-w-2xl mx-auto animate-fade-in-up delay-300">
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
              <Icon
                className="text-blue-600 mb-4 transition-all duration-300 hover:scale-125"
                size={24}
              />
              <h3 className="font-semibold text-lg mb-2">
                {currentLanguage[["callUs", "emailSupport", "liveChat"][index]]}
              </h3>
              {index === 0 ? (
                <a
                  href="tel:+18001234567"
                  className="text-blue-600 hover:text-blue-800 
                  transition-colors underline-effect"
                >
                  +1 800 123 4567
                </a>
              ) : index === 1 ? (
                <a
                  href="mailto:support@haryanaroadways.com"
                  className="text-blue-600 hover:text-blue-800 
                  transition-colors underline-effect"
                >
                  support@haryanaroadways.com
                </a>
              ) : (
                <button
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full 
                  hover:bg-blue-200 transition-colors hover:shadow-md"
                >
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
            {currentLanguage.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white scale-105 shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-100 shadow-md"
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
                  onClick={() =>
                    setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                  }
                  className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 transition-colors 
                    flex justify-between items-center"
                >
                  <span className="font-medium text-gray-800 group-hover:text-blue-800">
                    {faq.question}
                  </span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      expandedFaq === faq.id
                        ? "rotate-180 text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === faq.id
                      ? "max-h-48 border-t border-blue-50 shadow-inner"
                      : "max-h-0"
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
        <section
          className="mt-12 bg-white rounded-xl shadow-lg hover:shadow-xl p-8 
          transition-shadow duration-300"
        >
          <div className="flex items-center gap-4 mb-6 animate-pulse-slow">
            <Clock className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-blue-900">
              {currentLanguage.contactHours}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-medium mb-2">
                {currentLanguage.phoneSupport}
              </h3>
              <p className="text-gray-600">24/7 Available</p>
            </div>
            <div className="hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-medium mb-2">
                {currentLanguage.emailResponseTime}
              </h3>
              <p className="text-gray-600">Within 2 hours</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-8 mt-12 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-4 animate-float">
            {currentLanguage.quickContact}
          </p>
          <p className="text-sm opacity-75 hover:opacity-100 transition-opacity duration-300">
            {currentLanguage.copyright}
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .underline-effect {
          position: relative;
          &:after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: currentColor;
            transition: width 0.3s ease;
          }
          &:hover:after {
            width: 100%;
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HelplinePage;
