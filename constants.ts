import { Badge, Virtue, UserGoals } from './types';
import { BIBLE_BOOKS, TOTAL_CHAPTERS } from './data/bibleBooks';
import { TRIVIA_CATEGORIES } from './data/triviaData';
import { POPULAR_VERSES, FALLBACK_VERSES_DATA } from './data/fallbackVerses';
import { 
  ANXIOUS_PRAYERS, 
  TIRED_PRAYERS, 
  HAPPY_PRAYERS, 
  SAD_PRAYERS, 
  THANKFUL_PRAYERS, 
  CONFUSED_PRAYERS, 
  ANGRY_PRAYERS 
} from './data/prayers';

// Exporting re-imported constants for global use
export { 
  BIBLE_BOOKS, TOTAL_CHAPTERS, 
  TRIVIA_CATEGORIES, 
  POPULAR_VERSES, FALLBACK_VERSES_DATA,
  ANXIOUS_PRAYERS, TIRED_PRAYERS, HAPPY_PRAYERS, SAD_PRAYERS, THANKFUL_PRAYERS, CONFUSED_PRAYERS, ANGRY_PRAYERS
};

// Gamification Constants
export const XP_PER_CHAPTER = 50;
export const XP_PER_CHALLENGE_DAY = 100;
export const XP_PER_BADGE = 500; // Bonus XP for earning a generic badge
export const XP_REWARD_JOURNEY = 200; // Specific reward for claiming a journey
export const XP_PER_TRIVIA = 30; // XP por resposta correta no trivia

export const INITIAL_GOALS: UserGoals = {
  dailyChapters: 3,
  dailyStudyMinutes: 15,
  focusVirtue: 'hope',
  targetJourneyId: null
};

export const VIRTUES: Virtue[] = [
  {
    id: 'hope',
    name: 'Esperança',
    description: 'Confiança inabalável no futuro de Deus.',
    icon: 'Anchor',
    colorFrom: 'from-blue-400',
    colorTo: 'to-cyan-300'
  },
  {
    id: 'charity',
    name: 'Caridade',
    description: 'Amor em ação ao próximo.',
    icon: 'HeartHandshake',
    colorFrom: 'from-rose-400',
    colorTo: 'to-pink-300'
  },
  {
    id: 'faith',
    name: 'Fé',
    description: 'Certeza das coisas que não se veem.',
    icon: 'Shield',
    colorFrom: 'from-gold',
    colorTo: 'to-orange'
  },
  {
    id: 'patience',
    name: 'Paciência',
    description: 'Paz durante a espera.',
    icon: 'Hourglass',
    colorFrom: 'from-emerald-400',
    colorTo: 'to-green-300'
  },
  {
    id: 'wisdom',
    name: 'Sabedoria',
    description: 'Discernimento para escolhas divinas.',
    icon: 'Brain',
    colorFrom: 'from-purple-400',
    colorTo: 'to-indigo-300'
  },
  {
    id: 'courage',
    name: 'Coragem',
    description: 'Força para agir apesar do medo.',
    icon: 'Sword',
    colorFrom: 'from-red-500',
    colorTo: 'to-orange-400'
  }
];

export const USER_LEVELS = [
  { level: 1, xp: 0, title: "Peregrino da Fé" },
  { level: 2, xp: 100, title: "Discípulo Iniciante" },
  { level: 3, xp: 300, title: "Servo Dedicado" },
  { level: 4, xp: 600, title: "Guerreiro de Oração" },
  { level: 5, xp: 1000, title: "Semeador da Verdade" },
  { level: 6, xp: 1500, title: "Mestre da Palavra" },
  { level: 7, xp: 2200, title: "Guardião do Templo" },
  { level: 8, xp: 3000, title: "Profeta do Reino" },
  { level: 9, xp: 4000, title: "Apóstolo da Paz" },
  { level: 10, xp: 5500, title: "Embaixador do Céu" }
];

export const STATIC_BADGES: Badge[] = [
  {
    id: 'badge_anxiety',
    title: 'Mente de Paz',
    description: 'Completou o Detox de Ansiedade.',
    icon: 'Brain',
    type: 'journey'
  },
  {
    id: 'badge_gratitude',
    title: 'Coração Grato',
    description: 'Completou a Jornada da Gratidão.',
    icon: 'Heart',
    type: 'journey'
  },
  {
    id: 'badge_proverbs',
    title: 'Sábio',
    description: 'Completou a Sabedoria de Provérbios.',
    icon: 'Scroll',
    type: 'journey'
  },
  {
    id: 'badge_healing',
    title: 'Fé Curadora',
    description: 'Completou a Jornada de Cura.',
    icon: 'Cross',
    type: 'journey'
  },
  {
    id: 'badge_doors',
    title: 'Portas Abertas',
    description: 'Completou a Jornada de Provisão.',
    icon: 'Key',
    type: 'journey'
  },
  {
    id: 'badge_restoration',
    title: 'Restaurador',
    description: 'Completou a Jornada de Restauração.',
    icon: 'Users',
    type: 'journey'
  },
  {
    id: 'badge_impossible',
    title: 'Movimentador de Montes',
    description: 'Completou a Jornada de Causas Impossíveis.',
    icon: 'Mountain',
    type: 'journey'
  },
  {
    id: 'badge_purpose',
    title: 'Visionário do Reino',
    description: 'Completou a Descoberta de Propósito.',
    icon: 'Star',
    type: 'journey'
  },
  {
    id: 'badge_fearless',
    title: 'Coração Valente',
    description: 'Completou a Fé Inabalável.',
    icon: 'Shield',
    type: 'journey'
  },
  {
    id: 'badge_identity',
    title: 'Filho do Rei',
    description: 'Completou a Identidade em Cristo.',
    icon: 'Crown',
    type: 'journey'
  },
  {
    id: 'badge_stewardship',
    title: 'Mordomo Fiel',
    description: 'Completou a Jornada de Mordomia.',
    icon: 'Briefcase',
    type: 'journey'
  }
];

export const INITIAL_CHALLENGES = [
  {
    id: 'anxiety-detox',
    title: 'Detox de Ansiedade',
    description: '7 dias para trocar o medo pela paz de Deus através da entrega total.',
    days: 7,
    theme: 'Ansiedade'
  },
  {
    id: 'restoration',
    title: 'Restauração de Vínculos',
    description: '30 dias de imersão profunda no perdão, amor sacrificial e reconstrução de alianças.',
    days: 30,
    theme: 'Amor, Perdão e Casamento'
  },
  {
    id: 'gratitude-journey',
    title: 'Jornada da Gratidão',
    description: '30 dias para transformar sua mente e coração através do poder da gratidão.',
    days: 30,
    theme: 'Gratidão'
  },
  {
    id: 'purpose-discovery',
    title: 'Descoberta de Propósito',
    description: '7 dias mergulhando no plano original de Deus para sua existência.',
    days: 7,
    theme: 'Propósito'
  },
  {
    id: 'fearless-faith',
    title: 'Fé Inabalável',
    description: '7 dias para vencer o medo e a insegurança através da coragem bíblica.',
    days: 7,
    theme: 'Coragem'
  },
  {
    id: 'biblical-identity',
    title: 'Identidade em Cristo',
    description: '7 dias fortalecendo quem você é aos olhos de Deus.',
    days: 7,
    theme: 'Autoestima'
  },
  {
    id: 'stewardship-life',
    title: 'Mordomia Ativa',
    description: '7 dias de sabedoria para carreira, finanças e gestão da vida.',
    days: 7,
    theme: 'Finanças e Trabalho'
  },
  {
    id: 'proverbs-wisdom',
    title: 'Sabedoria de Provérbios',
    description: '31 dias mergulhando na fonte de sabedoria para decisões e vida prática.',
    days: 31,
    theme: 'Sabedoria'
  },
  {
    id: 'healing-miracle',
    title: 'Milagre da Cura',
    description: '14 dias fortalecendo a fé para cura física, emocional e espiritual.',
    days: 14,
    theme: 'Cura Divina'
  },
  {
    id: 'open-doors',
    title: 'Portas Abertas',
    description: '21 dias de oração por provisão, emprego e direção profissional.',
    days: 21,
    theme: 'Provisão Financeira e Emprego'
  },
  {
    id: 'impossible-causes',
    title: 'Causas Impossíveis',
    description: '7 dias de clamor intenso por milagres urgentes.',
    days: 7,
    theme: 'Fé para Milagres Urgentes'
  }
];

export const BIBLE_TRIVIA_QUESTIONS = TRIVIA_CATEGORIES.flatMap(category => category.questions);
