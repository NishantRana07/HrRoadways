import React, { useState } from "react";
import Header from "./Header";  
import Footer from "./footer";  

const faqs = [
  {
    question: "How can I book a Haryana Roadways bus ticket online?",
    answer:
      "You can book tickets through the official Haryana Roadways website under the 'Plan Journey' section. Simply enter your source, destination, and travel date to check availability and book.",
  },
  {
    question: "Can I cancel or reschedule my bus ticket? What is the refund policy?",
    answer:
      "Yes, you can cancel tickets online before the scheduled departure. Refunds are processed as per Haryana Roadways cancellation policy. Currently, rescheduling is not available, you must cancel and rebook.",
  },
  {
    question: "Are there any concessions for students, senior citizens, or women travelers?",
    answer:
      "Yes. Haryana Roadways provides concessions for students, senior citizens, and women travelers on select routes. Please check the 'Concessions' section on the website for details.",
  },
  {
    question: "How can I check bus timings and seat availability?",
    answer:
      "You can check bus schedules and seat availability under the 'Plan Journey' or 'Schedule' section of the website before booking.",
  },
  {
    question: "What facilities are available on Haryana Roadways buses?",
    answer:
      "Facilities vary depending on the bus type. AC, Sleeper, Deluxe, and Volvo buses include amenities such as comfortable seats, air-conditioning, luggage storage, and sometimes WiFi.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>

     
      <div className="w-full px-8 py-12 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions (FAQ)
        </h1>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium hover:text-blue-600 dark:text-gray-200"
              >
                {faq.question}
                <span className="ml-2 text-blue-600">
                  {openIndex === index ? "−": "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

     
    </>
  );
};

export default Faq;
