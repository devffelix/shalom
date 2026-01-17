import { UserProgress, LevelData, Badge, BibleBook } from '../types';
import { USER_LEVELS, STATIC_BADGES, BIBLE_BOOKS, XP_PER_BADGE } from '../constants';

export const calculateLevel = (xp: number): LevelData => {
  let currentLevelObj = USER_LEVELS[0];
  let nextLevelObj = USER_LEVELS[1];

  for (let i = 0; i < USER_LEVELS.length; i++) {
    if (xp >= USER_LEVELS[i].xp) {
      currentLevelObj = USER_LEVELS[i];
      nextLevelObj = USER_LEVELS[i + 1] || { ...USER_LEVELS[i], xp: USER_LEVELS[i].xp * 1.5 }; // Fallback for max level
    } else {
      break;
    }
  }

  const currentLevelBaseXp = currentLevelObj.xp;
  const nextLevelXp = nextLevelObj.xp;
  
  // Calculate progress within current level
  const xpInLevel = xp - currentLevelBaseXp;
  const xpNeededForNext = nextLevelXp - currentLevelBaseXp;
  
  // Avoid division by zero if at max level
  let progressPercent = xpNeededForNext > 0 ? (xpInLevel / xpNeededForNext) * 100 : 100;
  progressPercent = Math.min(100, Math.max(0, progressPercent));

  return {
    currentLevel: currentLevelObj.level,
    currentTitle: currentLevelObj.title,
    nextLevelXp,
    currentLevelBaseXp,
    progressPercent
  };
};

export const addXp = (amount: number): { newProgress: UserProgress, leveledUp: boolean, newLevelData: LevelData } => {
  const saved = localStorage.getItem('lumina_progress');
  let progress: UserProgress;

  if (saved) {
    progress = JSON.parse(saved);
    if (typeof progress.xp === 'undefined') progress.xp = 0;
  } else {
    progress = {
      readChapters: [],
      lastRead: null,
      streak: 0,
      lastLoginDate: new Date().toISOString().split('T')[0],
      xp: 0,
      dailyReadCount: 0,
      todayStudyMinutes: 0,
      earnedBadges: []
    };
  }

  const oldXp = progress.xp;
  const oldLevelData = calculateLevel(oldXp);
  
  progress.xp += amount;
  
  const newLevelData = calculateLevel(progress.xp);
  const leveledUp = newLevelData.currentLevel > oldLevelData.currentLevel;

  localStorage.setItem('lumina_progress', JSON.stringify(progress));

  return { newProgress: progress, leveledUp, newLevelData };
};

export const recordStudySession = (seconds: number): { minutesAdded: number, xpGained: number } => {
  const saved = localStorage.getItem('lumina_progress');
  if (!saved) return { minutesAdded: 0, xpGained: 0 };
  
  const progress: UserProgress = JSON.parse(saved);
  const minutes = Math.floor(seconds / 60);
  
  if (minutes < 1) return { minutesAdded: 0, xpGained: 0 };

  // Update study time
  progress.todayStudyMinutes = (progress.todayStudyMinutes || 0) + minutes;
  
  // XP Calculation: 10 XP per 5 minutes
  const xpGained = Math.floor(minutes / 5) * 10;
  progress.xp = (progress.xp || 0) + xpGained;

  localStorage.setItem('lumina_progress', JSON.stringify(progress));
  
  return { minutesAdded: minutes, xpGained };
};

export const getUserXp = (): number => {
  const saved = localStorage.getItem('lumina_progress');
  if (saved) {
    const p = JSON.parse(saved);
    return p.xp || 0;
  }
  return 0;
};

// BADGE LOGIC

export const getAllDisplayBadges = (earnedBadgeIds: string[]): { badge: Badge, earned: boolean }[] => {
  // 1. Static Badges (Journeys)
  const staticBadges = STATIC_BADGES.map(b => ({
    badge: b,
    earned: earnedBadgeIds.includes(b.id)
  }));

  // 2. Dynamic Bible Book Badges
  const earnedBibleBadges = earnedBadgeIds
    .filter(id => id.startsWith('badge_book_'))
    .map(id => {
      const bookName = id.replace('badge_book_', '');
      const realBook = BIBLE_BOOKS.find(b => b.englishName === bookName || b.name === bookName);
      return {
        badge: {
          id: id,
          title: `Leitor de ${realBook ? realBook.name : bookName}`,
          description: `Leu todos os capítulos de ${realBook ? realBook.name : bookName}.`,
          icon: 'BookOpen',
          type: 'bible'
        } as Badge,
        earned: true
      };
    });

  return [...staticBadges, ...earnedBibleBadges];
};

export const checkAndUnlockBibleBadge = (book: BibleBook): Badge | null => {
  const saved = localStorage.getItem('lumina_progress');
  if (!saved) return null;
  const progress: UserProgress = JSON.parse(saved);
  
  // Ensure earnedBadges exists
  if (!progress.earnedBadges) progress.earnedBadges = [];

  const badgeId = `badge_book_${book.englishName}`;
  
  // If already earned, return null
  if (progress.earnedBadges.includes(badgeId)) return null;

  // Check if ALL chapters are read
  // We check both English and Portuguese key formats to be safe
  let allRead = true;
  for (let i = 1; i <= book.chapters; i++) {
     const enId = `${book.englishName}-${i}`;
     const ptId = `${book.name}-${i}`;
     if (!progress.readChapters.includes(enId) && !progress.readChapters.includes(ptId)) {
        allRead = false;
        break;
     }
  }

  if (allRead) {
     // Unlock!
     progress.earnedBadges.push(badgeId);
     progress.xp += XP_PER_BADGE; // Bonus XP
     localStorage.setItem('lumina_progress', JSON.stringify(progress));
     
     return {
        id: badgeId,
        title: `Leitor de ${book.name}`,
        description: `Leu todos os capítulos de ${book.name}.`,
        icon: 'BookOpen',
        type: 'bible'
     };
  }

  return null;
};

// Modified: Just CHECKS if valid, does NOT unlock/save automatically.
// The claiming process is now manual via claimBadge
export const checkJourneyEligibility = (challengeId: string, totalDays: number): Badge | null => {
  // Mapping challenge IDs to Badge IDs
  const badgeMap: Record<string, string> = {
    'anxiety-detox': 'badge_anxiety',
    'gratitude-journey': 'badge_gratitude',
    'proverbs-wisdom': 'badge_proverbs',
    'healing-miracle': 'badge_healing',
    'open-doors': 'badge_doors',
    'restoration': 'badge_restoration',
    'impossible-causes': 'badge_impossible',
    'purpose-discovery': 'badge_purpose',
    'fearless-faith': 'badge_fearless',
    'biblical-identity': 'badge_identity',
    'stewardship-life': 'badge_stewardship'
  };

  const badgeId = badgeMap[challengeId];
  if (!badgeId) return null;

  const savedMain = localStorage.getItem('lumina_progress');
  const savedChallenge = localStorage.getItem(`lumina_challenge_progress_${challengeId}`);
  
  if (!savedMain || !savedChallenge) return null;

  const progress: UserProgress = JSON.parse(savedMain);
  const completedDays: number[] = JSON.parse(savedChallenge);

  if (!progress.earnedBadges) progress.earnedBadges = [];

  // If already earned, not eligible for new unlock
  if (progress.earnedBadges.includes(badgeId)) return null;

  if (completedDays.length >= totalDays) {
     return STATIC_BADGES.find(b => b.id === badgeId) || null;
  }

  return null;
};

export const claimBadge = (badgeId: string, xpReward: number): { success: boolean, badge: Badge | null } => {
  const saved = localStorage.getItem('lumina_progress');
  if (!saved) return { success: false, badge: null };
  
  const progress: UserProgress = JSON.parse(saved);
  if (!progress.earnedBadges) progress.earnedBadges = [];

  if (progress.earnedBadges.includes(badgeId)) {
    return { success: false, badge: null }; // Already owned
  }

  progress.earnedBadges.push(badgeId);
  progress.xp += xpReward;
  
  localStorage.setItem('lumina_progress', JSON.stringify(progress));

  // Find badge definition
  let badgeDef = STATIC_BADGES.find(b => b.id === badgeId);
  if (!badgeDef) {
     // Fallback for dynamic/bible badges if needed, but this function is primarily for Journey manual claims
     // for now, return generic structure if not found
     badgeDef = { id: badgeId, title: 'Conquista Desbloqueada', description: '', icon: 'Award', type: 'special' };
  }

  return { success: true, badge: badgeDef };
};
