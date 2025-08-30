// Tutorial.jsx
import React, { useState } from 'react';
import TutorialStep from './TutorialStep';
import {
  MapPin,
  Calendar,
  Users,
  Repeat,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Info,
  AlertTriangle,
  UserCheck,
  XCircle,
} from 'lucide-react';

const tutorialSteps = [
  {
    title: 'How to Book a Bus',
    description: 'Follow these simple steps to book your bus ticket with Haryana Roadways.',
    steps: [
      {
        icon: MapPin,
        title: 'Step 1: Select Route',
        description: 'Choose your departure and arrival locations.',
        // Replace the videoId with your actual YouTube video id.
        // This video URL will be used on the last step.
        videoUrl: 'https://www.youtube.com/embed/u31qwQUeGuM?si=dZ4IiHERaZAsx7tz',
      },
      {
        icon: Calendar,
        title: 'Step 2: Select Date',
        description: 'Pick your travel date from the calendar.',
      },
      {
        icon: Users,
        title: 'Step 3: Select Passengers',
        description: 'Enter the number of passengers traveling.',
      },
      {
        icon: Repeat,
        title: 'Step 4: Round Trip',
        description: 'Choose if you want a round trip or a one-way trip.',
        // The videoUrl is still passed here if needed,
        // but it will only be rendered on this last step.
        videoUrl: 'https://www.youtube.com/embed/u31qwQUeGuM?si=dZ4IiHERaZAsx7tz',
      },
    ],
  },
  {
    title: 'How to Pay for a Ticket',
    description: 'Learn how to pay for your ticket using various payment methods.',
    steps: [
      {
        icon: CreditCard,
        title: 'Step 1: Select Payment Method',
        description: 'Choose your preferred payment method (Credit Card, Debit Card, UPI, Wallet).',
      },
      {
        icon: ShieldCheck,
        title: 'Step 2: Enter Payment Details',
        description: 'Fill in your payment details securely.',
      },
      {
        icon: CheckCircle,
        title: 'Step 3: Confirm Payment',
        description: 'Review and confirm your payment.',
      },
    ],
  },
  {
    title: 'Passenger Rules in India',
    description: 'General guidelines for passengers traveling by bus across India.',
    steps: [
      {
        icon: Info,
        title: 'Valid ID',
        description: 'Carry valid identification and a printed or digital ticket.',
      },
      {
        icon: AlertTriangle,
        title: 'Restricted Items',
        description: 'Hazardous materials or banned substances are not permitted on board.',
      },
    ],
  },
  {
    title: 'Guidelines for Female Passengers',
    description: 'Points to ensure a safe and comfortable journey for female passengers.',
    steps: [
      {
        icon: UserCheck,
        title: 'Preferred Seating',
        description: 'Some buses may offer reserved seats for females; check signage when boarding.',
      },
      {
        icon: ShieldCheck,
        title: 'Security Assistance',
        description: 'Contact bus staff or a helpline if you face any discomfort.',
      },
    ],
  },
  {
    title: 'Stop Rules',
    description: 'Understand the rules and procedures for bus stops during your journey.',
    steps: [
      {
        icon: MapPin,
        title: 'Designated Stops',
        description: 'Buses stop only at authorized or scheduled stops along the route.',
      },
      {
        icon: AlertTriangle,
        title: 'Emergency Stops',
        description: 'Request an emergency stop only for genuine medical or safety issues.',
      },
    ],
  },
  {
    title: 'Booking Cancellation & Refund',
    description: 'Learn about cancellation policies, refund timelines, and modifications.',
    steps: [
      {
        icon: XCircle,
        title: 'Cancellation Window',
        description: 'Check official rules on cancellation deadlines for partial or full refunds.',
      },
      {
        icon: Calendar,
        title: 'Refund Process',
        description: 'Refunds typically take a few working days based on the payment method.',
      },
    ],
  },
];

function Tutorial() {
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (index) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter((i) => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-0 dark:bg-gray-950 dark:text-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Tutorials & Guidelines</h1>
        <p className="text-lg text-gray-600 mt-2">
          Learn how to book, pay, and follow important bus rules with ease
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-6">
        {tutorialSteps.map((section, index) => {
          const isExpanded = expandedSections.includes(index);
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header area: Title + chevron icon */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                  {section.title}
                </h2>
                <div
                  className={`transform transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  )}
                </div>
              </div>

              {/* Collapsible content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-h-[2000px] ease-in opacity-100' : 'max-h-0 ease-out opacity-0'
                }`}
              >
                <p className="text-gray-700 mt-4">{section.description}</p>
                <div className="mt-6 space-y-4">
                  {section.steps.map((step, stepIndex) => (
                    <TutorialStep
                      key={stepIndex}
                      icon={step.icon}
                      title={step.title}
                      description={step.description}
                      videoUrl={step.videoUrl}
                      stepNumber={stepIndex + 1}
                      totalSteps={section.steps.length}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tutorial;
