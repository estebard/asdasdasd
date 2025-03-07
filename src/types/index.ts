export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface SymbolCard {
  id: string;
  text: string;
  image: string;
  category: string;
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  progress?: UserProgress;
}

export interface UserPreferences {
  voiceRate: number;
  voicePitch: number;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  symbolSize: 'small' | 'medium' | 'large';
  language: 'es' | 'en';
}

export interface UserProgress {
  symbolsUsed: Record<string, number>;
  sentencesCreated: number;
  achievements: string[];
  lastUsed: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  type: 'game' | 'exercise' | 'story';
  difficulty: 'easy' | 'medium' | 'hard';
  content: any;
}
