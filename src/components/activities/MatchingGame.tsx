import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SymbolCard } from '../../types';
import { symbols } from '../../data/symbols';
import { Smile, X } from 'lucide-react';

interface MatchingGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const MatchingGame: React.FC<MatchingGameProps> = ({ 
  onComplete, 
  onClose,
  difficulty = 'easy' 
}) => {
  const { t } = useTranslation();
  const [cards, setCards] = useState<(SymbolCard & { flipped: boolean; matched: boolean })[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  
  // Set up the game based on difficulty
  useEffect(() => {
    const pairCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
    
    // Select random symbols for the game
    const gameSymbols = [...symbols]
      .sort(() => Math.random() - 0.5)
      .slice(0, pairCount);
    
    // Create pairs of cards
    const gamePairs = [...gameSymbols, ...gameSymbols]
      .map(symbol => ({ ...symbol, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    
    setCards(gamePairs);
    setFlippedIndices([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
  }, [difficulty]);
  
  // Handle card click
  const handleCardClick = (index: number) => {
    // Ignore if card is already flipped or matched, or if two cards are already flipped
    if (
      cards[index].flipped || 
      cards[index].matched || 
      flippedIndices.length >= 2
    ) {
      return;
    }
    
    // Flip the card
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    
    // Add to flipped indices
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    
    // If two cards are flipped, check for a match
    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      
      const [firstIndex, secondIndex] = newFlippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];
      
      if (firstCard.id === secondCard.id) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].matched = true;
          matchedCards[secondIndex].matched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatchedPairs(matchedPairs + 1);
          
          // Check if game is complete
          if (matchedPairs + 1 === cards.length / 2) {
            setGameComplete(true);
            onComplete(calculateScore());
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const unmatchedCards = [...cards];
          unmatchedCards[firstIndex].flipped = false;
          unmatchedCards[secondIndex].flipped = false;
          setCards(unmatchedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };
  
  // Calculate score based on moves and difficulty
  const calculateScore = () => {
    const baseScore = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 200 : 300;
    const movePenalty = moves * 5;
    return Math.max(baseScore - movePenalty, 50);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-green-500 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{t('activities.matchingGame')}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Close game"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <div className="text-gray-700">
              {t('pairs')}: {matchedPairs}/{cards.length / 2}
            </div>
            <div className="text-gray-700">
              {t('moves')}: {moves}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-6">
            {cards.map((card, index) => (
              <div 
                key={index}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 transform ${
                  card.flipped || card.matched
                    ? 'rotate-y-180'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {(card.flipped || card.matched) ? (
                  <div className="flex items-center justify-center h-full bg-white border-2 border-blue-200 rounded-lg p-1">
                    <img 
                      src={card.image} 
                      alt={t(card.text)} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <span className="text-2xl">?</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {gameComplete && (
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <div className="flex justify-center mb-2">
                <Smile className="text-yellow-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-yellow-700 mb-1">
                {t('gameComplete')}
              </h3>
              <p className="text-yellow-600">
                {t('score')}: {calculateScore()}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                {t('continue')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchingGame;
