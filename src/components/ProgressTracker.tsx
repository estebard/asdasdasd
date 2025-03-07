import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserProgress, Achievement } from '../types';
import { Award, Calendar, MessageSquare } from 'lucide-react';

interface ProgressTrackerProps {
  progress: UserProgress;
  achievements: Achievement[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress, achievements }) => {
  const { t } = useTranslation();
  
  // Calculate total symbols used
  const totalSymbolsUsed = Object.values(progress.symbolsUsed).reduce((sum, count) => sum + count, 0);
  
  // Get unlocked achievements
  const unlockedAchievements = achievements.filter(achievement => 
    achievement.condition(progress)
  );
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{t('progress')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <MessageSquare className="text-blue-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold text-blue-700">{t('symbols')}</h3>
          </div>
          <p className="text-3xl font-bold text-blue-800">{totalSymbolsUsed}</p>
          <p className="text-sm text-blue-600">{t('totalSymbolsUsed')}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <MessageSquare className="text-green-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold text-green-700">{t('sentences')}</h3>
          </div>
          <p className="text-3xl font-bold text-green-800">{progress.sentencesCreated}</p>
          <p className="text-sm text-green-600">{t('totalSentencesCreated')}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <Calendar className="text-purple-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold text-purple-700">{t('lastUsed')}</h3>
          </div>
          <p className="text-lg font-bold text-purple-800">
            {new Date(progress.lastUsed).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <section className="mb-6">
        <div className="flex items-center mb-4">
          <Award className="text-yellow-500 mr-2" size={24} />
          <h3 className="text-xl font-semibold text-blue-700">{t('achievements')}</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map(achievement => {
            const isUnlocked = unlockedAchievements.includes(achievement);
            
            return (
              <div 
                key={achievement.id}
                className={`p-3 rounded-lg border ${
                  isUnlocked 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200 opacity-70'
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${isUnlocked ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                    <img 
                      src={achievement.icon} 
                      alt="" 
                      className="w-8 h-8" 
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className={`font-semibold ${isUnlocked ? 'text-yellow-700' : 'text-gray-500'}`}>
                      {t(`achievements.${achievement.id}`)}
                    </h4>
                    <p className={`text-sm ${isUnlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                      {t(`achievements.${achievement.id}Description`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold text-blue-700 mb-4">{t('mostUsedSymbols')}</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b text-left">{t('symbol')}</th>
                <th className="py-2 px-4 border-b text-left">{t('timesUsed')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(progress.symbolsUsed)
                .sort(([, countA], [, countB]) => countB - countA)
                .slice(0, 5)
                .map(([symbolId, count]) => (
                  <tr key={symbolId} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{t(`symbols.${symbolId}`)}</td>
                    <td className="py-2 px-4">{count}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProgressTracker;
