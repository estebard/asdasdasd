import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SymbolCard } from '../../types';
import { symbols } from '../../data/symbols';
import { Smile, X, Check } from 'lucide-react';

interface EmotionMatchProps {
  onComplete: (score: number) => void;
  onClose: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const EmotionMatch: React.FC<EmotionMatchProps> = ({ 
  onComplete, 
  onClose,
  difficulty = 'easy' 
}) => {
  const { t } = useTranslation();
  const [currentEmotion, setCurrentEmotion] = useState<SymbolCard | null>(null);
  const [options, setOptions] = useState<SymbolCard[]>([]);
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  
  // Get emotion symbols
  const emotionSymbols = symbols.filter(symbol => symbol.category === 'feelings');
  
  // Set up the game based on difficulty
  useEffect(() => {
    const totalRounds = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10;
    
    if (round > totalRounds) {
      setGameComplete(true);
      onComplete(score);
      return;
    }
    
    // Select a random emotion
    const randomEmotion = emotionSymbols[Math.floor(Math.random() * emotionSymbols.length)];
    setCurrentEmotion(randomEmotion);
    
    // Create options (including the correct one)
    const optionCount = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
    const incorrectOptions = emotionSymbols
      .filter(emotion => emotion.id !== randomEmotion.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, optionCount - 1);
    
    const allOptions = [...incorrectOptions, randomEmotion]
      .sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
    setFeedback(null);
  }, [round, difficulty]);
  
  // Handle option selection
  const handleOptionSelect = (selectedEmotion: SymbolCard) => {
    if (feedback !== null) return; // Prevent multiple selections during feedback
    
    const isCorrect = selectedEmotion.id === currentEmotion?.id;
    
    if (isCorrect) {
      setScore(score + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20));
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    
    // Move to next round after a delay
    setTimeout(() => {
      setRound(round + 1);
    }, 1500);
  };
  
  if (!currentEmotion) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-yellow-500 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{t('activities.emotionMatch')}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Close game"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {!gameComplete ? (
            <>
              <div className="flex justify-between mb-4">
                <div className="text-gray-700">
                  {t('round')}: {round}
                </div>
                <div className="text-gray-700">
                  {t('score')}: {score}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  {t('matchTheEmotion')}
                </h3>
                
                <div className="flex justify-center mb-4">
                  <img 
                    src={currentEmotion.image} 
                    alt="" 
                    className="w-24 h-24 object-contain" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-3 rounded-lg border-2 ${
                      feedback === 'correct' && option.id === currentEmotion.id
                        ? 'border-green-500 bg-green-50'
                        : feedback === 'incorrect' && option.id === currentEmotion.id
                        ? 'border-green-500 bg-green-50'
                        : feedback === 'incorrect' && option.id !== currentEmotion.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-blue-200 hover:border-blue-300'
                    }`}
                    disabled={feedback !== null}
                  >
                    <p className="text-lg font-bold text-center text-blue-700">
                      {t(option.text)}
                    </p>
                  </button>
                ))}
              </div>
              
              {feedback && (
                <div className={`mt-4 p-3 rounded-lg text-center ${
                  feedback === 'correct' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <div className="flex justify-center mb-2">
                    {feedback === 'correct' 
                      ? <Check className="text-green-500" size={24} />
                      : <X className="text-red-500" size={24} />
                    }
                  </div>
                  <p className="font-bold">
                    {feedback === 'correct' 
                      ? t('correct') 
                      : `${t('incorrect')}. ${t('correctAnswerWas')} ${t(currentEmotion.text)}`
                    }
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <div className="flex justify-center mb-2">
                <Smile className="text-yellow-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-yellow-700 mb-1">
                {t('gameComplete')}
              </h3>
              <p className="text-yellow-600">
                {t('finalScore')}: {score}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounde<boltAction type="file" filePath="src/components/activities/EmotionMatch.tsx">import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SymbolCard } from '../../types';
import { symbols } from '../../data/symbols';
import { Smile, X, Check } from 'lucide-react';

interface EmotionMatchProps {
  onComplete: (score: number) => void;
  onClose: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const EmotionMatch: React.FC<EmotionMatchProps> = ({ 
  onComplete, 
  onClose,
  difficulty = 'easy' 
}) => {
  const { t } = useTranslation();
  const [currentEmotion, setCurrentEmotion] = useState<SymbolCard | null>(null);
  const [options, setOptions] = useState<SymbolCard[]>([]);
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  
  // Get emotion symbols
  const emotionSymbols = symbols.filter(symbol => symbol.category === 'feelings');
  
  // Set up the game based on difficulty
  useEffect(() => {
    const totalRounds = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 8 : 10;
    
    if (round > totalRounds) {
      setGameComplete(true);
      onComplete(score);
      return;
    }
    
    // Select a random emotion
    const randomEmotion = emotionSymbols[Math.floor(Math.random() * emotionSymbols.length)];
    setCurrentEmotion(randomEmotion);
    
    // Create options (including the correct one)
    const optionCount = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4;
    const incorrectOptions = emotionSymbols
      .filter(emotion => emotion.id !== randomEmotion.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, optionCount - 1);
    
    const allOptions = [...incorrectOptions, randomEmotion]
      .sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
    setFeedback(null);
  }, [round, difficulty]);
  
  // Handle option selection
  const handleOptionSelect = (selectedEmotion: SymbolCard) => {
    if (feedback !== null) return; // Prevent multiple selections during feedback
    
    const isCorrect = selectedEmotion.id === currentEmotion?.id;
    
    if (isCorrect) {
      setScore(score + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20));
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    
    // Move to next round after a delay
    setTimeout(() => {
      setRound(round + 1);
    }, 1500);
  };
  
  if (!currentEmotion) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-yellow-500 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{t('activities.emotionMatch')}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Close game"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {!gameComplete ? (
            <>
              <div className="flex justify-between mb-4">
                <div className="text-gray-700">
                  {t('round')}: {round}
                </div>
                <div className="text-gray-700">
                  {t('score')}: {score}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  {t('matchTheEmotion')}
                </h3>
                
                <div className="flex justify-center mb-4">
                  <img 
                    src={currentEmotion.image} 
                    alt="" 
                    className="w-24 h-24 object-contain" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-3 rounded-lg border-2 ${
                      feedback === 'correct' && option.id === currentEmotion.id
                        ? 'border-green-500 bg-green-50'
                        : feedback === 'incorrect' && option.id === currentEmotion.id
                        ? 'border-green-500 bg-green-50'
                        : feedback === 'incorrect' && option.id !== currentEmotion.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-blue-200 hover:border-blue-300'
                    }`}
                    disabled={feedback !== null}
                  >
                    <p className="text-lg font-bold text-center text-blue-700">
                      {t(option.text)}
                    </p>
                  </button>
                ))}
              </div>
              
              {feedback && (
                <div className={`mt-4 p-3 rounded-lg text-center ${
                  feedback === 'correct' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <div className="flex justify-center mb-2">
                    {feedback === 'correct' 
                      ? <Check className="text-green-500" size={24} />
                      : <X className="text-red-500" size={24} />
                    }
                  </div>
                  <p className="font-bold">
                    {feedback === 'correct' 
                      ? t('correct') 
                      : `${t('incorrect')}. ${t('correctAnswerWas')} ${t(currentEmotion.text)}`
                    }
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <div className="flex justify-center mb-2">
                <Smile className="text-yellow-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-yellow-700 mb-1">
                {t('gameComplete')}
              </h3>
              <p className="text-yellow-600">
                {t('finalScore')}: {score}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
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

export default EmotionMatch;
