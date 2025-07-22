// Tutorial.jsx
import { useState } from "react";
import TutorialStep from "./TutorialStep";

import { tutorialSteps } from "../data/tutorialSteps";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-0">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Tutorials & Guidelines
        </h1>
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
                    isExpanded ? "rotate-180" : ""
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
                  isExpanded
                    ? "max-h-[2000px] ease-in opacity-100"
                    : "max-h-0 ease-out opacity-0"
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
