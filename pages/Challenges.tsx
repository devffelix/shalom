
import React, { useState, useEffect } from 'react';
import { XP_PER_CHALLENGE_DAY, XP_REWARD_JOURNEY } from '../constants';
import { Challenge, Badge } from '../types';
import { generateDailyChallengeContent } from '../services/api';
import { addXp, checkJourneyEligibility, claimBadge, getAllDisplayBadges } from '../services/gamification';
import { Zap, Check, Calendar, ArrowLeft, Star, Heart, Briefcase, Cross, BookOpen, CheckCircle, Crown, Award, Gift, Brain, Scroll, Key, Users, Mountain, Lock, Loader2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Icon mapping for Badges
const IconMap: Record<string, any> = {
  Brain, Heart, Scroll, Cross, Key, Users, Mountain, BookOpen
};

const Challenges: React.FC = () => {
  const { t } = useLanguage();
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [dayContent, setDayContent] = useState<{verse: string, thought: string, action: string, reflection: string} | null>(null);
  const [loadingDay, setLoadingDay] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  
  // Toast State
  const [showToast, setShowToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'info' | 'badge'>('info');

  // Badge/Reward State
  const [displayBadges, setDisplayBadges] = useState<{ badge: Badge, earned: boolean }[]>([]);
  const [rewardModal, setRewardModal] = useState<Badge | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0); // Trigger re-renders for list updates

  // Load progress when active challenge changes
  useEffect(() => {
    if (activeChallenge) {
      const savedProgress = localStorage.getItem(`lumina_challenge_progress_${activeChallenge.id}`);
      if (savedProgress) {
        setCompletedDays(JSON.parse(savedProgress));
      } else {
        setCompletedDays([]);
      }
    }
  }, [activeChallenge]);

  // Load Badges on Mount or Update
  useEffect(() => {
    const savedProgress = localStorage.getItem('lumina_progress');
    const earnedIds = savedProgress ? JSON.parse(savedProgress).earnedBadges || [] : [];
    // Filter only Journey type badges for this view
    const all = getAllDisplayBadges(earnedIds);
    setDisplayBadges(all.filter(b => b.badge.type === 'journey'));
  }, [rewardModal, forceUpdate, t]); // Reload when a reward is claimed or language changes

  const handleSelectChallenge = (c: Challenge) => {
    setActiveChallenge(c);
    setSelectedDay(1);
    setDayContent(null);
    loadDayContent(c.id, 1); // Using ID for stability
  };

  const loadDayContent = async (challengeId: string, day: number) => {
    setLoadingDay(true);
    const content = await generateDailyChallengeContent(challengeId, day);
    setDayContent(content);
    setLoadingDay(false);
  };

  const handleDayClick = (day: number) => {
    if (activeChallenge) {
      setSelectedDay(day);
      loadDayContent(activeChallenge.id, day);
    }
  };

  const handleCompleteDay = () => {
    if (!activeChallenge) return;

    let newCompleted = [...completedDays];
    if (newCompleted.includes(selectedDay)) {
        // Already done
    } else {
        newCompleted.push(selectedDay);
        
        // GAMIFICATION - Just XP, no auto-unlock badge anymore
        const { leveledUp, newLevelData } = addXp(XP_PER_CHALLENGE_DAY);
        setToastType('info');
        if (leveledUp) {
            setShowToast(`🎉 ${t.home.level} ${newLevelData.currentLevel}: ${newLevelData.currentTitle}!`);
        } else {
            setShowToast(`+${XP_PER_CHALLENGE_DAY} XP!`);
        }
        setTimeout(() => setShowToast(null), 3000);
        
        // Update forceUpdate to refresh the list view progress/eligibility
        setForceUpdate(prev => prev + 1);
    }

    setCompletedDays(newCompleted);
    localStorage.setItem(`lumina_challenge_progress_${activeChallenge.id}`, JSON.stringify(newCompleted));
  };

  const handleClaimReward = (e: React.MouseEvent, challenge: Challenge) => {
    e.stopPropagation();
    
    // Check eligibility again to be safe
    const eligibleBadge = checkJourneyEligibility(challenge.id, challenge.days);
    
    if (eligibleBadge) {
        const { success, badge } = claimBadge(eligibleBadge.id, XP_REWARD_JOURNEY);
        if (success && badge) {
            setRewardModal(badge);
            setForceUpdate(prev => prev + 1);
        }
    }
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-orange to-red-500',         // Detox (Orange/Red)
      'from-stone-900 to-stone-800',    // Gratidão (Dark)
      'from-gold-dark to-yellow-600',   // Sabedoria (Gold)
      'from-emerald-600 to-teal-500',   // Cura (Green/Teal)
      'from-blue-600 to-indigo-600',    // Emprego (Blue)
      'from-rose-500 to-pink-600',      // Casamento (Pink)
      'from-violet-600 to-purple-700'   // Impossíveis (Purple)
    ];
    return `bg-gradient-to-br ${gradients[index % gradients.length]}`;
  };

  const getIcon = (index: number) => {
    const icons = [
        Zap,        // Detox
        Heart,      // Gratidão
        Star,       // Sabedoria
        Cross,      // Cura
        Briefcase,  // Emprego
        Heart,      // Casamento
        Zap         // Impossíveis
    ];
    return icons[index % icons.length];
  }

  const isDayCompleted = (day: number) => completedDays.includes(day);

  // Active Challenge View
  if (activeChallenge) {
    const CHALLENGES_LIST = t.challengesList || [];
    // Find index based on ID to ensure consistent icon/gradient
    const originalIndex = CHALLENGES_LIST.findIndex(c => c.id === activeChallenge.id);
    const ChallengeIcon = getIcon(originalIndex >= 0 ? originalIndex : 0);
    const isCompleted = isDayCompleted(selectedDay);

    return (
      <div className="animate-fade-in space-y-6 pb-20 relative">
        {showToast && (
            <div className={`
                fixed top-24 left-1/2 -translate-x-1/2 z-50 text-white px-10 py-5 rounded-full shadow-2xl animate-fade-in flex items-center gap-4 border-4 border-white/20 scale-125
                ${toastType === 'badge' ? 'bg-gradient-to-r from-gold to-orange' : 'bg-ink'}
            `}>
                {toastType === 'badge' ? <Award size={24} fill="currentColor" /> : <Crown size={24} className="text-gold" fill="currentColor"/>}
                <span className="text-3xl font-black tracking-tighter">{showToast}</span>
            </div>
        )}

        <div className="flex items-center gap-4 mb-2">
            <button 
            onClick={() => setActiveChallenge(null)}
            className="w-10 h-10 rounded-full bg-surface dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-ink dark:text-white hover:bg-stone-100 dark:hover:bg-stone-700"
            >
            <ArrowLeft size={20} />
            </button>
            <h2 className="font-serif font-bold text-xl text-ink dark:text-white">{t.journey.back}</h2>
        </div>

        <div className="bg-stone-900 text-gold p-8 rounded-[2.5rem] shadow-card relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-serif font-bold mb-2 text-white">{activeChallenge.title}</h2>
            <p className="text-stone-400 text-sm leading-relaxed">{activeChallenge.description}</p>
            <div className="mt-4 flex items-center gap-2">
                 <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-white">
                    {completedDays.length} / {activeChallenge.days} {t.journey.completedDays}
                 </span>
            </div>
          </div>
          <ChallengeIcon className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32 rotate-12" />
        </div>

        {/* Horizontal Day Scroller */}
        <div>
            <h3 className="text-xs font-bold text-subtle uppercase tracking-widest mb-3 px-2">{t.journey.yourJourney}</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar px-1 snap-x">
                {Array.from({ length: activeChallenge.days }).map((_, i) => {
                    const d = i + 1;
                    const isActive = d === selectedDay;
                    const isDone = completedDays.includes(d);
                    
                    return (
                        <button
                            key={d}
                            onClick={() => handleDayClick(d)}
                            className={`
                                flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all snap-center relative overflow-hidden
                                ${isActive ? 'bg-ink dark:bg-white text-white dark:text-ink shadow-lg scale-105' : 'bg-surface dark:bg-stone-800 border border-stone-100 dark:border-stone-700'}
                            `}
                        >
                            <span className="text-[10px] font-bold opacity-60 uppercase">{t.journey.day}</span>
                            <span className="text-xl font-black">{d}</span>
                            {isDone && (
                                <div className="absolute top-1 right-1">
                                    <CheckCircle size={12} className="text-green-500" fill="currentColor" />
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>

        {/* Day Content */}
        <div className="space-y-6">
            {loadingDay ? (
                <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-4">
                    <Loader2 size={32} className="animate-spin text-orange" />
                    <p className="font-serif text-sm animate-pulse">{t.journey.searching}</p>
                </div>
            ) : dayContent ? (
                <>
                    {/* Verse Card */}
                    <div className="bg-surface dark:bg-stone-900 p-8 rounded-[2.5rem] shadow-soft border border-stone-100 dark:border-stone-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><BookOpen size={80} /></div>
                        <p className="font-serif text-xl md:text-2xl text-ink dark:text-white leading-relaxed mb-6">"{dayContent.verse}"</p>
                        <div className="h-1 w-20 bg-gradient-to-r from-gold to-orange rounded-full"></div>
                    </div>

                    {/* Reflection */}
                    <div className="bg-stone-50 dark:bg-stone-800/50 p-6 rounded-[2rem] border border-stone-200 dark:border-stone-700">
                        <h3 className="font-bold text-ink dark:text-white flex items-center gap-2 mb-3">
                            <Brain size={18} className="text-purple-500" /> {t.journey.reflectionTitle}
                        </h3>
                        <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm">
                            {dayContent.reflection}
                        </p>
                    </div>

                    {/* Action */}
                    <div className="bg-gradient-to-br from-orange/10 to-gold/10 p-6 rounded-[2rem] border border-orange/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-ink dark:text-white flex items-center gap-2 mb-3">
                                <Zap size={18} className="text-orange" fill="currentColor" /> {t.journey.challengeTitle}
                            </h3>
                            <p className="text-ink dark:text-white font-medium text-lg leading-snug">
                                {dayContent.action}
                            </p>
                        </div>
                    </div>

                    {/* Complete Button */}
                    <button 
                        onClick={handleCompleteDay}
                        disabled={isCompleted}
                        className={`
                            w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3
                            ${isCompleted 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-default' 
                                : 'bg-ink dark:bg-white text-white dark:text-ink hover:scale-[1.02] active:scale-[0.98]'}
                        `}
                    >
                        {isCompleted ? (
                            <><CheckCircle size={24} /> {t.journey.completedButton}</>
                        ) : (
                            <>{t.journey.completeButton}</>
                        )}
                    </button>
                </>
            ) : (
                <div className="text-center py-20 text-stone-400">
                    Conteúdo não disponível.
                </div>
            )}
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW (LIST) ---
  const CHALLENGES_LIST = t.challengesList || [];

  return (
    <div className="animate-fade-in space-y-8 pb-24">
      
      {/* Reward Modal */}
      {rewardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setRewardModal(null)}>
              <div className="bg-white dark:bg-stone-900 w-full max-w-sm rounded-[3rem] p-8 text-center relative animate-slide-up border-4 border-gold/30 shadow-2xl" onClick={e => e.stopPropagation()}>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-orange flex items-center justify-center border-4 border-white dark:border-stone-900 shadow-xl animate-bounce-slow">
                          <Crown size={40} className="text-white" fill="currentColor" />
                      </div>
                  </div>
                  <div className="mt-10">
                      <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange mb-2 uppercase tracking-tighter">{t.journey.conquest}</h2>
                      <h3 className="text-xl font-bold text-ink dark:text-white mb-4">{rewardModal.title}</h3>
                      <p className="text-stone-500 mb-8 leading-relaxed">
                          {t.journey.awesome} <br/>
                          <span className="font-bold text-green-500">+{XP_REWARD_JOURNEY} {t.journey.xpReceived}</span>
                      </p>
                      <button onClick={() => setRewardModal(null)} className="w-full py-4 bg-ink dark:bg-white text-white dark:text-ink rounded-2xl font-bold shadow-lg">
                          {t.common.close}
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="px-2">
        <h2 className="text-3xl font-serif font-black text-ink dark:text-white mb-2">{t.journey.title}</h2>
        <p className="text-subtle text-sm max-w-xs">{t.journey.subtitle}</p>
      </div>

      {/* Challenge List */}
      <div className="grid gap-5">
        {CHALLENGES_LIST.map((challenge, index) => {
            const ChallengeIcon = getIcon(index);
            const saved = localStorage.getItem(`lumina_challenge_progress_${challenge.id}`);
            const progress = saved ? JSON.parse(saved) : [];
            const progressPercent = Math.round((progress.length / challenge.days) * 100);
            
            // Check reward status
            const eligibleForReward = checkJourneyEligibility(challenge.id, challenge.days);
            // We check if badge is already earned to show "Completed" state vs "Claim" state
            // (Assuming checkJourneyEligibility returns null if already claimed, we need a separate check for display)
            // But for simplicity in this view:
            // If eligible -> Show "Claim Reward"
            // If not eligible but 100% -> Show "Completed" or Badge icon
            
            // Re-use logic to check if owned
            const savedMain = localStorage.getItem('lumina_progress');
            const earnedBadges = savedMain ? JSON.parse(savedMain).earnedBadges || [] : [];
            // Map challenge ID to Badge ID manually (same logic as gamification.ts)
            const badgeMap: Record<string, string> = {
                'anxiety-detox': 'badge_anxiety',
                'gratitude-journey': 'badge_gratitude',
                'proverbs-wisdom': 'badge_proverbs',
                'healing-miracle': 'badge_healing',
                'open-doors': 'badge_doors',
                'restoration': 'badge_restoration',
                'impossible-causes': 'badge_impossible'
            };
            const badgeId = badgeMap[challenge.id];
            const isBadgeEarned = earnedBadges.includes(badgeId);

            return (
                <div 
                    key={challenge.id}
                    onClick={() => handleSelectChallenge(challenge)}
                    className="relative bg-surface dark:bg-stone-900 rounded-[2.5rem] p-6 shadow-card border border-stone-100 dark:border-stone-800 overflow-hidden cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    {/* Gradient Bar */}
                    <div className={`absolute top-0 bottom-0 left-0 w-3 ${getGradient(index)}`}></div>
                    
                    <div className="flex justify-between items-start mb-4 pl-4 relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md">
                                    {challenge.days} {t.journey.day}s
                                </span>
                                {isBadgeEarned && (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                                        <Award size={10} /> {t.journey.conquest}
                                    </span>
                                )}
                            </div>
                            <h3 className="font-serif font-bold text-xl text-ink dark:text-white leading-tight">{challenge.title}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getGradient(index)} text-white shadow-lg`}>
                            <ChallengeIcon size={24} />
                        </div>
                    </div>

                    <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 pl-4 leading-relaxed line-clamp-2">
                        {challenge.description}
                    </p>

                    {/* Progress Bar & Footer */}
                    <div className="pl-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-ink dark:text-white">{progressPercent}%</span>
                            <span className="text-xs text-stone-400">{progress.length}/{challenge.days}</span>
                        </div>
                        <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mb-4">
                            <div className={`h-full ${getGradient(index)} transition-all duration-1000`} style={{ width: `${progressPercent}%` }}></div>
                        </div>

                        {/* Action Area */}
                        {eligibleForReward ? (
                            <button 
                                onClick={(e) => handleClaimReward(e, challenge)}
                                className="w-full py-3 bg-gradient-to-r from-gold to-orange text-white rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 animate-pulse"
                            >
                                <Gift size={16} /> {t.journey.claimReward}
                            </button>
                        ) : (
                            <div className="flex justify-between items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                                <div className="flex -space-x-2">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 border-2 border-white dark:border-stone-900"></div>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-stone-400 flex items-center gap-1 group-hover:text-orange transition-colors">
                                    {isBadgeEarned ? t.journey.completedButton : t.common.confirm} <ChevronRight size={14} />
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default Challenges;
