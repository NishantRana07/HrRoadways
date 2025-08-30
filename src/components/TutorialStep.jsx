// TutorialStep.jsx
import React from 'react';

const TutorialStep = ({ icon: Icon, title, description, videoUrl, stepNumber, totalSteps }) => {
  return (
    <div className="flex flex-col items-start p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-950 dark:text-white">
      {/* Step Number Indicator */}
      <div className="flex-shrink-0 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full">
          <span className="text-white font-semibold">{stepNumber}</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="ml-4 w-full">
        <div className="flex items-center">
          <Icon className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mt-1">{description}</p>

        {/* Video Section: Only show on the last step if videoUrl exists */}
        {videoUrl && stepNumber === totalSteps && (
          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-700">Watch Tutorial:</h4>
            <div className="relative pb-[56.25%] h-0 mt-2">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Completion message on the last step */}
        {stepNumber === totalSteps && (
          <div className="mt-4 text-sm text-green-600">
            🎉 You&apos;ve reached the end of this section!
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialStep;
