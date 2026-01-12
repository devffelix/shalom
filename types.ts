
export interface BibleBook {
  name: string;
  englishName: string; // Used for API calls
  chapters: number;
  testament: 'Old' | 'New';
  abbrev: string;
}

export interface DailyVerse {
  text: string;
  reference: string;
}

export interface UserProgress {
  readChapters: string[]; // Format: "BookName-ChapterNumber"
  lastRead: string | null;
  streak: number;
  lastLoginDate: string | null;
  xp: number; // New field for Gamification
  dailyReadCount: number; // Field for Daily Goal Meter
  todayStudyMinutes: number; // Actual minutes studied today
  earnedBadges: string[]; // List of Badge IDs
}

export interface UserGoals {
  dailyChapters: number;
  dailyStudyMinutes: number;
  focusVirtue: string; // ID of the virtue
  targetJourneyId: string | null;
}

export interface Virtue {
  id: string;
  name: string;
  description: string;
  icon: string;
  colorFrom: string;
  colorTo: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  type: 'journey' | 'bible' | 'special';
  unlockedAt?: string;
}

export enum Mood {
  Anxious = 'Ansioso',
  Happy = 'Feliz',
  Tired = 'Cansado',
  Thankful = 'Grato',
  Sad = 'Triste',
  Confused = 'Confuso',
  Angry = 'Com Raiva'
}

export interface SongSuggestion {
  id: string;
  title: string;
  artist: string;
  reason: string;
  audioUrl?: string; // Link direto para o arquivo MP3
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  days: number;
  theme: string;
}

export interface ChallengeDayContent {
  verse: string;
  thought: string;
  action: string;
  reflection: string;
}

export interface BibleApiResponse {
  reference: string;
  verses: {
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}

export interface Note {
  id: string;
  reference: string;
  text: string;
  date: string;
  book: string;
  chapter: number;
  verse: number;
}

export interface AudioContextType {
  currentSong: SongSuggestion | null;
  isPlaying: boolean;
  progress: number; // Current time in seconds
  duration: number; // Total duration in seconds
  volume: number; // 0 to 1
  playSong: (song: SongSuggestion) => Promise<void>;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (level: number) => void; // level 0 to 1
  closePlayer: () => void;
}

export interface LevelData {
  currentLevel: number;
  currentTitle: string;
  nextLevelXp: number;
  currentLevelBaseXp: number;
  progressPercent: number;
}

export interface BibleTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  reference: string; // Ex: "Mateus 16:18"
  explanation: string;
}

export interface TriviaCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  questions: BibleTriviaQuestion[];
}

// Analytics Types
export interface QuizSession {
  id: string;
  created_at: string;
  utm_source: string;
  status: string;
}

export interface AnalyticsTraffic {
  source_name: string;
  total_leads: number;
  percentage: number;
}

export interface AnalyticsAnswerStats {
  question_id: number;
  answer_text: string;
  count: number;
  percentage: number;
}

export interface AnalyticsFunnel {
  question_id: number;
  total_views: number;
}
