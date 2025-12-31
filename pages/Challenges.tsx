
import React, { useState, useEffect } from 'react';
import { INITIAL_CHALLENGES, XP_PER_CHALLENGE_DAY, XP_REWARD_JOURNEY, STATIC_BADGES } from '../constants';
import { Challenge, Badge } from '../types';
import { generateDailyChallengeContent } from '../services/api';
import { addXp, checkJourneyEligibility, claimBadge, getAllDisplayBadges } from '../services/gamification';
import { Zap, Check, Calendar, ArrowLeft, Star, Heart, Briefcase, Cross, BookOpen, CheckCircle, Crown, Award, Gift, Brain, Scroll, Key, Users, Mountain, Lock } from 'lucide-react';

// Icon mapping for Badges
const IconMap: Record<string, any> = {
  Brain, Heart, Scroll, Cross, Key, Users, Mountain, BookOpen
};

const Challenges: React.FC = () => {
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
  }, [rewardModal, forceUpdate]); // Reload when a reward is claimed

  const handleSelectChallenge = (c: Challenge) => {
    setActiveChallenge(c);
    setSelectedDay(1);
    setDayContent(null);
    loadDayContent(c.theme, 1);
  };

  const loadDayContent = async (theme: string, day: number) => {
    setLoadingDay(true);
    const content = await generateDailyChallengeContent(theme, day);
    setDayContent(content);
    setLoadingDay(false);
  };

  const handleDayClick = (day: number) => {
    if (activeChallenge) {
      setSelectedDay(day);
      loadDayContent(activeChallenge.theme, day);
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
            setShowToast(`🎉 Nível ${newLevelData.currentLevel}: ${newLevelData.currentTitle}!`);
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
    const ChallengeIcon = getIcon(INITIAL_CHALLENGES.findIndex(c => c.id === activeChallenge.id));
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
            <h2 className="font-serif font-bold text-xl text-ink dark:text-white">Voltar</h2>
        </div>

        <div className="bg-stone-900 text-gold p-8 rounded-[2.5rem] shadow-card relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-serif font-bold mb-2 text-white">{activeChallenge.title}</h2>
            <p className="text-stone-400 text-sm leading-relaxed">{activeChallenge.description}</p>
            <div className="mt-4 flex items-center gap-2">
                 <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-white">
                    {completedDays.length} / {activeChallenge.days} Dias Concluídos
                 </span>
            </div>
          </div>
          <ChallengeIcon className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32 rotate-12" />
        </div>

        {/* Horizontal Day Scroller */}
        <div>
            <h3 className="text-xs font-bold text-subtle uppercase tracking-widest mb-3 px-2">Sua Jornada</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar px-1 snap-x">
                {Array.from({ length: activeChallenge.days }).map((_, i) => {
                    const d = i + 1;
                    const isActive = d === selectedDay;
                    const isDone = isDayCompleted(d);

                    return (
                    <button
                        key={d}
                        onClick={() => handleDayClick(d)}
                        className={`
                        snap-start flex-shrink-0 w-14 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all relative
                        ${isActive 
                            ? 'bg-orange text-white shadow-lg scale-105' 
                            : 'bg-surface dark:bg-stone-800 text-stone-400 border border-stone-100 dark:border-stone-700'}
                        `}
                    >
                        {isDone && (
                            <div className="absolute top-1 right-1 text-green-500 bg-white rounded-full">
                                <CheckCircle size={12} fill="currentColor" className="text-white" />
                            </div>
                        )}
                        <span className="text-[10px] uppercase font-bold opacity-60">Dia</span>
                        <span className="text-xl font-bold">{d}</span>
                    </button>
                    )
                })}
            </div>
        </div>

        {/* Content Card */}
        <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] p-8 shadow-card border border-stone-100 dark:border-stone-800 min-h-[400px]">
        {loadingDay ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
                <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                <p className="font-serif text-sm text-ink dark:text-stone-300">Buscando inspiração...</p>
            </div>
        ) : dayContent ? (
            <div className="animate-slide-up space-y-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-gold/20 text-gold-dark dark:text-gold rounded-full text-xs font-bold">Dia {selectedDay}</span>
                    {isCompleted && (
                        <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                            <CheckCircle size={14} /> Concluído
                        </span>
                    )}
                </div>
                
                <div>
                    <h3 className="text-2xl font-serif font-bold text-ink dark:text-white leading-tight mb-6">"{dayContent.thought}"</h3>
                    <div className="p-6 bg-paper dark:bg-stone-800 rounded-3xl border border-stone-100 dark:border-stone-700 relative">
                        <Star className="absolute top-4 right-4 text-gold fill-gold" size={16} />
                        <p className="font-serif italic text-brown-dark dark:text-stone-300 leading-relaxed">"{dayContent.verse}"</p>
                    </div>
                </div>

                {/* Reflection Section */}
                <div className="space-y-3">
                     <h4 className="font-bold text-ink dark:text-white flex items-center gap-2">
                        <BookOpen size={18} className="text-subtle" /> Reflexão Profunda
                    </h4>
                    <div className="text-stone-600 dark:text-stone-400 text-sm leading-7 font-serif text-justify border-l-2 border-gold/30 pl-4">
                        {dayContent.reflection ? dayContent.reflection : "Reflexão sendo gerada..."}
                    </div>
                </div>

                <div className="bg-ink dark:bg-black rounded-3xl p-6 text-white">
                    <h4 className="font-bold text-orange mb-2 flex items-center gap-2">
                        <Zap size={18} /> Desafio de Hoje
                    </h4>
                    <p className="text-stone-300 text-sm leading-relaxed">{dayContent.action}</p>
                </div>

                {/* Complete Button */}
                <button
                    onClick={handleCompleteDay}
                    disabled={isCompleted}
                    className={`
                        w-full py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all
                        ${isCompleted 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-default' 
                            : 'bg-gold text-ink dark:text-stone-900 hover:bg-orange hover:text-white active:scale-95'}
                    `}
                >
                    {isCompleted ? (
                        <>
                            <Check size={20} /> Dia Concluído (+{XP_PER_CHALLENGE_DAY} XP)
                        </>
                    ) : (
                        "Concluir Dia"
                    )}
                </button>
            </div>
        ) : null}
        </div>
      </div>
    );
  }

  // Main Challenges List View
  return (
    <div className="space-y-8 animate-fade-in pb-20">
      
      {/* Reward Modal */}
      {rewardModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
             <div className="bg-surface dark:bg-stone-900 p-8 rounded-[3rem] shadow-2xl max-w-sm w-full relative overflow-hidden flex flex-col items-center text-center animate-[float-up_0.6s_ease-out_forwards]">
                  {/* Confetti Background Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                  
                  <div className="w-32 h-32 bg-gradient-to-tr from-gold to-orange rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] animate-bounce-slow">
                      {(() => {
                          const Icon = IconMap[rewardModal.icon] || Award;
                          return <Icon size={64} className="text-white" />;
                      })()}
                  </div>
                  
                  <h3 className="text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange mb-2">Conquista!</h3>
                  <h4 className="text-xl font-bold text-ink dark:text-white mb-4">{rewardModal.title}</h4>
                  <p className="text-stone-500 text-sm mb-8">{rewardModal.description}</p>
                  
                  <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 px-4 py-2 rounded-full mb-8">
                       <Gift className="text-green-500" size={16} />
                       <span className="font-bold text-green-600 dark:text-green-400">+{XP_REWARD_JOURNEY} XP Recebidos</span>
                  </div>

                  <button 
                    onClick={() => setRewardModal(null)}
                    className="w-full py-4 bg-ink dark:bg-white text-white dark:text-ink rounded-2xl font-bold shadow-lg"
                  >
                      Incrível!
                  </button>
             </div>
        </div>
      )}

      <div className="px-2">
        <h2 className="text-3xl font-serif font-bold text-ink dark:text-white mb-2">Jornadas</h2>
        <p className="text-subtle text-sm">
          Planos de leitura e desafios espirituais para fortalecer sua fé.
        </p>
      </div>

      {/* Badges Section with Premium Visuals */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
          <div className="flex gap-4 w-max">
              {displayBadges.map(({badge, earned}) => {
                 const Icon = IconMap[badge.icon] || Award;
                 return (
                     <div key={badge.id} className={`
                        relative w-28 p-4 rounded-3xl border flex flex-col items-center text-center gap-2 transition-all duration-300
                        ${earned 
                          ? 'bg-gradient-to-br from-white to-orange-50 dark:from-stone-800 dark:to-stone-900 border-gold/40 shadow-sm opacity-100' 
                          : 'bg-stone-50 dark:bg-stone-800/50 border-stone-100 dark:border-stone-800 opacity-80'}
                     `}>
                        <div className={`
                            relative w-14 h-14 rounded-full flex items-center justify-center shadow-inner mb-1
                            ${earned ? 'bg-gold text-ink' : 'bg-stone-200 dark:bg-stone-700 text-stone-400 grayscale'}
                        `}>
                            <Icon size={22} />
                            {!earned && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-stone-300 dark:bg-stone-600 rounded-full flex items-center justify-center border border-white dark:border-stone-800">
                                    <Lock size={10} className="text-stone-500 dark:text-stone-300" />
                                </div>
                            )}
                        </div>
                        <span className={`text-[10px] font-bold leading-tight ${earned ? 'text-ink dark:text-white' : 'text-stone-500'}`}>
                            {badge.title}
                        </span>
                     </div>
                 )
              })}
          </div>
      </div>

      {/* Challenges List */}
      <div className="grid gap-6">
        {INITIAL_CHALLENGES.map((challenge, idx) => {
            const CurrentIcon = getIcon(idx);
            
            // Calculate progress for list view
            const saved = localStorage.getItem(`lumina_challenge_progress_${challenge.id}`);
            const progress = saved ? JSON.parse(saved).length : 0;
            const percent = Math.round((progress / challenge.days) * 100);
            const isFinished = progress >= challenge.days;

            // Check if Badge is already claimed
            const eligibleBadge = checkJourneyEligibility(challenge.id, challenge.days);
            const canClaim = !!eligibleBadge;

            return (
                <div 
                    key={challenge.id} 
                    className="bg-surface dark:bg-stone-900 rounded-[2.5rem] p-1 shadow-card border border-stone-100 dark:border-stone-800 relative overflow-hidden"
                >
                    <div 
                        onClick={() => handleSelectChallenge(challenge)}
                        className={`
                        rounded-[2.3rem] p-8 relative overflow-hidden text-white cursor-pointer transition-transform active:scale-[0.99]
                        ${getGradient(idx)}
                    `}>
                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold border border-white/10">
                                {challenge.days} Dias
                            </span>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-ink shadow-lg">
                                <CurrentIcon size={20} fill="currentColor" className={getGradient(idx).includes('gold') ? 'text-ink' : 'text-stone-700'} />
                            </div>
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="font-serif font-bold text-2xl mb-2">{challenge.title}</h3>
                            <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[90%] mb-4">
                                {challenge.description}
                            </p>
                            
                            {/* Progress Bar in Card */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-black/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white rounded-full" style={{ width: `${percent}%` }}></div>
                                </div>
                                <span className="text-[10px] font-bold">{percent}%</span>
                            </div>
                        </div>

                        {/* Decorative circle */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    </div>

                    {/* Footer: Action Area */}
                    {canClaim && (
                        <div className="p-4">
                            <button 
                                onClick={(e) => handleClaimReward(e, challenge)}
                                className="w-full py-4 rounded-2xl bg-white dark:bg-stone-800 border-2 border-gold text-gold-dark dark:text-gold font-bold shadow-lg flex items-center justify-center gap-2 animate-pulse hover:bg-gold hover:text-white transition-colors"
                            >
                                <Gift size={20} /> Resgatar Recompensa (+{XP_REWARD_JOURNEY} XP)
                            </button>
                        </div>
                    )}
                </div>
        )})}
      </div>
    </div>
  );
};

export default Challenges;
