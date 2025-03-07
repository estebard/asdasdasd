import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TutorialProps {
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'tutorial.welcome',
      content: 'tutorial.step1',
      image: 'https://cdn-icons-png.flaticon.com/512/3062/3062912.png'
    },
    {
      title: 'tutorial.communication',
      content: 'tutorial.step2',
      image: 'https://cdn-icons-png.flaticon.com/512/745/745205.png'
    },
    {
      title: 'tutorial.categories',
      content: 'tutorial.step3',
      image: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png'
    },
    {
      title: 'tutorial.enjoy',
      content: 'tutorial.step4',
      image: 'https://cdn-icons-png.flaticon.com/512/166/166538.png'
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Close tutorial"
          >
            <X size={20} />
          </button>
          
          <div className="bg-blue-500 text-white p-4 text-center">
            <h2 className="text-xl font-bold">{t(steps[currentStep].title)}</h2>
          </div>
          
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <img 
                src={steps[currentStep].image} 
                alt="" 
                className="w-24 h-24" 
                aria-hidden="true"
              />
            </div>
            
            <p className="text-gray-700 text-center mb-8">
              {t(steps[currentStep].content)}
            </p>
            
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center ${
                  currentStep === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-500 hover:text-blue-700'
                }`}
              >
                <ChevronLeft size={20} className="mr-1" />
                {t('previous')}
              </button>
              
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                {currentStep < steps.length - 1 ? t('next') : t('finish')}
                <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
