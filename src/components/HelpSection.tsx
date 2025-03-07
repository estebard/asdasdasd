import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, HelpCircle, Book, Video, MessageSquare } from 'lucide-react';

interface HelpSectionProps {
  onClose: () => void;
  onStartTutorial: () => void;
}

const HelpSection: React.FC<HelpSectionProps> = ({ onClose, onStartTutorial }) => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden">
        <div className="bg-yellow-500 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <HelpCircle className="mr-2" size={24} />
            {t('help')}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Close help"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <button
              onClick={onStartTutorial}
              className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center hover:bg-blue-100 transition-colors"
            >
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Book className="text-blue-500" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-blue-700">{t('startTutorial')}</h3>
                <p className="text-blue-600 text-sm">{t('tutorialDescription')}</p>
              </div>
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
              <Video className="mr-2 text-yellow-500" size={20} />
              {t('howToUse')}
            </h3>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2">{t('basicUsage')}</h4>
              <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                <li>{t('helpStep1')}</li>
                <li>{t('helpStep2')}</li>
                <li>{t('helpStep3')}</li>
                <li>{t('helpStep4')}</li>
              </ol>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
              <MessageSquare className="mr-2 text-green-500" size={20} />
              {t('frequentlyAskedQuestions')}
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-1">{t('faq1')}</h4>
                <p className="text-gray-600">{t('faq1Answer')}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-1">{t('faq2')}</h4>
                <p className="text-gray-600">{t('faq2Answer')}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-1">{t('faq3')}</h4>
                <p className="text-gray-600">{t('faq3Answer')}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
