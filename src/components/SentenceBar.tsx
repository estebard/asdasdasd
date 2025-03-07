import React from 'react';
import { SymbolCard } from '../types';
import { Volume2, X, ArrowLeft, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SentenceBarProps {
  sentence: SymbolCard[];
  onClear: () => void;
  onRemoveLast: () => void;
  onSpeak: () => void;
  onSave?: () => void;
  symbolSize?: 'small' | 'medium' | 'large';
}

const SentenceBar: React.FC<SentenceBarProps> = ({ 
  sentence, 
  onClear, 
  onRemoveLast,
  onSpeak,
  onSave,
  symbolSize = 'medium'
}) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  };
  
  const fontSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border-2 border-blue-200">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-blue-700">{t('mySentence')}</h2>
        <div className="flex space-x-2">
          <button
            onClick={onRemoveLast}
            className="p-2 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50"
            aria-label={t('removeLast')}
            disabled={sentence.length === 0}
            title={t('removeLast')}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={onClear}
            className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
            aria-label={t('clearSentence')}
            disabled={sentence.length === 0}
            title={t('clearSentence')}
          >
            <X size={20} />
          </button>
          <button
            onClick={onSpeak}
            className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50"
            aria-label={t('speak')}
            disabled={sentence.length === 0}
            title={t('speak')}
          >
            <Volume2 size={20} />
          </button>
          {onSave && (
            <button
              onClick={onSave}
              className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
              aria-label={t('save')}
              disabled={sentence.length === 0}
              title={t('save')}
            >
              <Save size={20} />
            </button>
          )}
        </div>
      </div>
      
      {sentence.length > 0 ? (
        <div className="flex overflow-x-auto py-2 space-x-2 min-h-[100px] items-center">
          {sentence.map((symbol, index) => (
            <div key={`${symbol.id}-${index}`} className="flex-shrink-0 text-center">
              <div className={`mb-1 mx-auto ${sizeClasses[symbolSize]}`}>
                <img 
                  src={symbol.image} 
                  alt={t(symbol.text)} 
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <p className={`font-medium ${fontSizeClasses[symbolSize]}`}>{t(symbol.text)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-24 flex items-center justify-center text-gray-400">
          <p>{t('selectSymbols')}</p>
        </div>
      )}
    </div>
  );
};

export default SentenceBar;
