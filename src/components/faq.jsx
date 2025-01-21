import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Haryana Roadways?",
      answer:
        "Haryana Roadways is a state-owned bus service that connects various cities and towns in Haryana and neighboring states. It is known for its punctuality and affordable fares.",
    },
    {
      question: "How can I book a ticket?",
      answer:
        "You can book a ticket online through the official Haryana Roadways website or visit a local bus station to purchase a ticket in person. Online booking is recommended for a hassle-free experience.",
    },
    {
      question: "What are the popular routes?",
      answer:
        "Some of the popular routes covered by Haryana Roadways include Chandigarh to Delhi, Rohtak to Hisar, and Gurgaon to Ambala. These routes are frequented by commuters and tourists alike.",
    },
    {
      question: "Can I travel without an account?",
      answer:
        "Yes, you can travel without creating an account. However, having an account allows you to track your bookings, receive updates on bus schedules, and avail of exclusive offers.",
    },
    {
      question: "How to plan journeys with Haryana Roadways?",
      answer:
        "To plan your journey with Haryana Roadways, visit the official website and enter your origin and destination cities, travel dates, and the number of passengers. The website will display available buses and fares for your trip.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mb-9 p-10 rounded-lg">
      <h1 className="text-5xl font-bold text-center mb-10 mt-12">
        Frequently Asked Questions
      </h1>
      <div className="faq-section flex flex-col space-y-6">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 transition-all hover:shadow-lg"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <h2 className="text-xl font-semibold text-gray-800  hover:text-cyan-700 ">
                {faq.question}
              </h2>
              {/* Arrow SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transform transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {activeIndex === index && (
              <p className="mt-3 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;