import React, { useState, useCallback, useEffect } from 'react';
import { Heart, Settings, Activity, BarChart2, HelpCircle, Users } from 'lucide-react';
import { categories, symbols } from './data/symbols';
import { SymbolCard as SymbolCardType, UserPreferences } from './types';
import CategoryTab from './components/CategoryTab';
import SymbolGrid from './components/SymbolGrid';
import SentenceBar from './components/SentenceBar';
import SearchBar from './components/SearchBar';
import SettingsPanel from './components/SettingsPanel';
import { useTranslation } from 'react-i18next';
import './i18n';

function App() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [sentence, setSentence] = useState<SymbolCardType[]>([]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    voiceRate: 0.8,
    voicePitch: 1.2,
    fontSize: 'medium',
    highContrast: false,
    symbolSize: 'medium',
    language: 'es'
  });

  // Load saved preferences and favorites from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
    
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save preferences and favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }, [preferences]);
  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Get the list of voices when the component mounts
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      
      // Chrome loads voices asynchronously
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Filter symbols based on active category or search query
  const filteredSymbols = searchQuery
    ? symbols.filter(symbol => 
        t(symbol.text).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (symbol.tags && symbol.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    : symbols.filter(symbol => symbol.category === activeCategory);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery('');
  }, []);

  const handleSymbolClick = useCallback((symbol: SymbolCardType) => {
    setSentence((prev) => [...prev, symbol]);
  }, []);

  const handleClearSentence = useCallback(() => {
    setSentence([]);
  }, []);

  const handleRemoveLast = useCallback(() => {
    setSentence((prev) => prev.slice(0, -1));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query) {
      setActiveCategory('');
    } else {
      setActiveCategory(categories[0].id);
    }
  }, []);

  const handleToggleFavorite = useCallback((symbolId: string) => {
    setFavorites(prev => 
      prev.includes(symbolId)
        ? prev.filter(id => id !== symbolId)
        : [...prev, symbolId]
    );
  }, []);

  const handleUpdatePreferences = useCallback((newPrefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  }, []);

  const handleSpeak = useCallback(() => {
    const text = sentence.map(s => t(s.text)).join(' ');
    
    // Use the Web Speech API if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Find a Spanish voice if available
      const spanishVoice = voices.find(voice => 
        voice.lang.includes('es') && !voice.name.includes('Google')
      );
      
      // If no Spanish voice is found, try to find any Spanish Google voice
      const spanishGoogleVoice = voices.find(voice => 
        voice.lang.includes('es') && voice.name.includes('Google')
      );
      
      // Set the voice (prefer non-Google Spanish voice, then Google Spanish voice, then default)
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      } else if (spanishGoogleVoice) {
        utterance.voice = spanishGoogleVoice;
      }
      
      // Apply user preferences
      utterance.rate = preferences.voiceRate;
      utterance.pitch = preferences.voicePitch;
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert(text); // Fallback for browsers without speech synthesis
    }
  }, [sentence, t, voices, preferences.voiceRate, preferences.voicePitch]);

  // Apply high contrast mode if enabled
  const appClasses = preferences.highContrast 
    ? "min-h-screen bg-black text-white p-4 md:p-6" 
    : "min-h-screen bg-blue-50 p-4 md:p-6";

  // Apply font size
  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className={`${appClasses} ${fontSizeClasses[preferences.fontSize]}`}>
      <header className="mb-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <Heart className="text-red-500 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-blue-600">{t('appName')}</h1>
        </div>
        <p className={preferences.highContrast ? "text-white" : "text-gray-600"}>
          {t('appDescription')}
        </p>
      </header>

      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={t('settings')}
          title={t('settings')}
        >
          <Settings size={20} />
        </button>
        <button
          className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300"
          aria-label={t('activities')}
          title={t('activities')}
        >
          <Activity size={20} />
        </button>
        <button
          className="p-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          aria-label={t('progress')}
          title={t('progress')}
        >
          <BarChart2 size={20} />
        </button>
        <button
          className="p-2 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          aria-label={t('help')}
          title={t('help')}
        >
          <HelpCircle size={20} />
        </button>
        <button
          className="p-2 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          aria-label={t('community')}
          title={t('community')}
        >
          <Users size={20} />
        </button>
      </div>

      <main className="max-w-4xl mx-auto">
        <SentenceBar 
          sentence={sentence} 
          onClear={handleClearSentence} 
          onRemoveLast={handleRemoveLast}
          onSpeak={handleSpeak}
          symbolSize={preferences.symbolSize}
        />

        <SearchBar onSearch={handleSearch} />

        <div className={preferences.highContrast ? "bg-gray-800 rounded-lg shadow-md overflow-hidden border-2 border-white" : "bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-200"}>
          <div className="flex overflow-x-auto p-2 bg-blue-50 border-b">
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0 mr-2">
                <CategoryTab
                  category={category}
                  isActive={activeCategory === category.id}
                  onClick={handleCategoryClick}
                />
              </div>
            ))}
          </div>

          <div className="p-4">
            <SymbolGrid 
              symbols={filteredSymbols} 
              onSymbolClick={handleSymbolClick}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              symbolSize={preferences.symbolSize}
            />
          </div>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm">
        <p className={preferences.highContrast ? "text-white" : "text-gray-500"}>
          {t('footer')}
        </p>
      </footer>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <SettingsPanel 
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
            onClose={() => setShowSettings(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
