import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserPreferences } from '../types';

interface SettingsPanelProps {
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: Partial<UserPreferences>) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  preferences,
  onUpdatePreferences,
  onClose
}) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: 'es' | 'en') => {
    i18n.changeLanguage(language);
    onUpdatePreferences({ language });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{t('settings')}</h2>
      
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">{t('voiceSettings')}</h3>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="voiceRate">
            {t('voiceSpeed')}: {preferences.voiceRate.toFixed(1)}
          </label>
          <input
            id="voiceRate"
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={preferences.voiceRate}
            onChange={(e) => onUpdatePreferences({ voiceRate: parseFloat(e.target.value) })}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="voicePitch">
            {t('voicePitch')}: {preferences.voicePitch.toFixed(1)}
          </label>
          <input
            id="voicePitch"
            type="range"
            min="0.8"
            max="1.5"
            step="0.1"
            value={preferences.voicePitch}
            onChange={(e) => onUpdatePreferences({ voicePitch: parseFloat(e.target.value) })}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </section>
      
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">{t('displaySettings')}</h3>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">{t('fontSize')}</label>
          <div className="flex space-x-4">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => onUpdatePreferences({ fontSize: size })}
                className={`px-4 py-2 rounded-lg border ${
                  preferences.fontSize === size
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {size === 'small' ? 'A' : size === 'medium' ? 'AA' : 'AAA'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">{t('symbolSize')}</label>
          <div className="flex space-x-4">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => onUpdatePreferences({ symbolSize: size })}
                className={`px-4 py-2 rounded-lg border ${
                  preferences.symbolSize === size
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {size === 'small' ? '□' : size === 'medium' ? '■' : '■■'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={preferences.highContrast}
              onChange={(e) => onUpdatePreferences({ highContrast: e.target.checked })}
              className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            {t('highContrast')}
          </label>
        </div>
      </section>
      
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">{t('language')}</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => handleLanguageChange('es')}
            className={`px-4 py-2 rounded-lg border ${
              preferences.language === 'es'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            Español
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-4 py-2 rounded-lg border ${
              preferences.language === 'en'
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            English
          </button>
        </div>
      </section>
      
      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {t('save')}
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
