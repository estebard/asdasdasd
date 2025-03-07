import React from 'react';
import { Activity } from '../types';
import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  onSelect: (activity: Activity) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onSelect }) => {
  const { t } = useTranslation();
  
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    hard: 'bg-red-100 text-red-800 border-red-200'
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-100 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-700 mb-1">{t(`activities.${activity.id}`)}</h3>
        <p className="text-gray-600 text-sm mb-3">{t(`activities.${activity.id}Description`)}</p>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[activity.difficulty]}`}>
            {t(`difficulty.${activity.difficulty}`)}
          </span>
          
          <button
            onClick={() => onSelect(activity)}
            className="flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={t('play')}
          >
            <Play size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
