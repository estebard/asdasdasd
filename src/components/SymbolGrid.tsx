import React from 'react';
import { SymbolCard as SymbolCardType } from '../types';
import SymbolCard from './SymbolCard';

interface SymbolGridProps {
  symbols: SymbolCardType[];
  onSymbolClick: (symbol: SymbolCardType) => void;
  favorites?: string[];
  onToggleFavorite?: (symbolId: string) => void;
  symbolSize?: 'small' | 'medium' | 'large';
}

const SymbolGrid: React.FC<SymbolGridProps> = ({ 
  symbols, 
  onSymbolClick, 
  favorites = [], 
  onToggleFavorite,
  symbolSize = 'medium'
}) => {
  const gridCols = {
    small: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6',
    medium: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    large: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3'
  };

  return (
    <div className={`grid ${gridCols[symbolSize]} gap-4`}>
      {symbols.map((symbol) => (
        <SymbolCard 
          key={symbol.id} 
          symbol={symbol} 
          onClick={onSymbolClick}
          isFavorite={favorites.includes(symbol.id)}
          onToggleFavorite={onToggleFavorite}
          size={symbolSize}
        />
      ))}
    </div>
  );
};

export default SymbolGrid;
