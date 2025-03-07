import React from 'react';
import { SymbolCard as SymbolCardType } from '../types';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

interface SymbolCardProps {
  symbol: SymbolCardType;
  onClick: (symbol: SymbolCardType) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (symbolId: string) => void;
  size?: 'small' | 'medium' | 'large';
}

const SymbolCard: React.FC<SymbolCardProps> = ({ 
  symbol, 
  onClick, 
  isFavorite = false,
  onToggleFavorite,
  size = 'medium'
}) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-20 h-20',
    large: 'w-24 h-24'
  };
  
  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl'
  };
  
  return (
    <div className="relative">
      <button
        className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 border-2 border-blue-100 w-full"
        onClick={() => onClick(symbol)}
        aria-label={t(symbol.text)}
      >
        <div className={`overflow-hidden mb-2 ${sizeClasses[size]}`}>
          <img 
            src={symbol.image} 
            alt={t(symbol.text)} 
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <p className={`font-bold text-center text-blue-700 ${fontSizeClasses[size]}`}>
          {t(symbol.text)}
        </p>
      </button>
      
      {onToggleFavorite && (
        <button 
          className={`absolute top-1 right-1 p-1 rounded-full ${
            isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(symbol.id);
          }}
          aria-label={isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
        >
          <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      )}
    </div>
  );
};

export default SymbolCard;
