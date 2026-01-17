
import React, { useState, useEffect } from 'react';
import { UserGoals } from '../types';
import { INITIAL_GOALS, VIRTUES, INITIAL_CHALLENGES } from '../constants';
import { Target, Clock, Zap, Anchor, HeartHandshake, Shield, Hourglass, Brain, Sword, CheckCircle2, Crown, Save, Flame, BookOpen, ChevronRight, Compass } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Onboarding, { Step } from '../components/Onboarding';

const IconMap: Record<string, any> = {
  Anchor, HeartHandshake, Shield, Hourglass, Brain, Sword
};

const Trails: React.FC = () => {
  const { t } = useLanguage();
  const [goals, setGoals] = useState<UserGoals>(INITIAL_GOALS);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lumina_goals');
    if (saved) {
      setGoals(JSON.parse(saved));
    } else {
      localStorage.setItem('lumina_goals', JSON.stringify(INITIAL_GOALS));
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('lumina_goals', JSON.stringify(goals));
    
    // Simulate API delay for effect
    setTimeout(() => {
        setIsSaving(false);
        setShowSavedToast(true);
        setTimeout(() => setShowSavedToast(false), 2000);
    }, 800);
  };

  const handleVirtueSelect = (id: string) => {
    setGoals(prev => ({ ...prev, focusVirtue: id }));
  };

  const handleJourneySelect = (id: string) => {
    setGoals(prev => ({ ...prev, targetJourneyId: id }));
  };

  // Onboarding Configuration
  const trailsOnboardingSteps: Step[] = [
    {
      targetId: 'trails-virtue',
      title: 'Foco Espiritual',
      description: 'Escolha uma virtude (como Fé ou Coragem) para ser a intenção principal do seu mês.'
    },
    {
      targetId: 'trails-rhythm',
      title: 'Metas Diárias',
      description: 'Defina quantos capítulos ler e quanto tempo estudar por dia. Isso ajusta sua barra de progresso na Home.'
    },
    {
      targetId: 'trails-journey',
      title: 'Jornada Temática',
      description: 'Selecione um plano guiado (ex: Gratidão) para receber desafios específicos sobre esse tema.'
    },
    {
      targetId: 'trails-save',
      title: 'Confirmar',
      description: 'Não esqueça de salvar suas alterações para que elas comecem a valer no seu perfil.'
    }
  ];

  return (
    <div className="space-y-8 pb-36 md:pb-40 animate-fade-in">
      <Onboarding steps={trailsOnboardingSteps} storageKey="lumina_onboarding_trails_completed" />
      
      {/* Header with Visual Element */}
      <div className="relative px-2 py-4">
         <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gold/20 text-gold-dark dark:text-gold rounded-full flex items-center justify-center">
                <Compass size={24} />
            </div>
            <h2 className="text-3xl font-serif font-black text-ink dark:text-white">
                {t.trails.title}
            </h2>
         </div>
         <p className="text-subtle text-base max-w-sm leading-relaxed ml-1">
            {t.trails.subtitle}
         </p>
      </div>

      {/* SECTION 1: VIRTUE SELECTION (Intent) */}
      <section id="trails-virtue">
          <div className="px-2 mb-4 flex justify-between items-end">
              <h3 className="text-lg font-bold font-serif flex items-center gap-2 text-ink dark:text-white">
                 <Crown className="text-orange" size={20} fill="currentColor" /> {t.trails.focusVirtue}
              </h3>
              <span className="text-[10px] font-bold bg-orange/10 text-orange uppercase tracking-wider px-3 py-1 rounded-full">
                 {t.trails.monthIntent}
              </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-8 -mx-4 px-6 snap-x snap-mandatory no-scrollbar">
              {VIRTUES.map((virtue) => {
                  const Icon = IconMap[virtue.icon];
                  const isSelected = goals.focusVirtue === virtue.id;
                  const translatedVirtue = t.virtues[virtue.id as keyof typeof t.virtues];
                  
                  return (
                      <div 
                        key={virtue.id}
                        onClick={() => handleVirtueSelect(virtue.id)}
                        className={`
                            relative flex-shrink-0 w-36 h-48 rounded-[2rem] p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 snap-center group
                            ${isSelected 
                                ? `bg-gradient-to-br ${virtue.colorFrom} ${virtue.colorTo} -translate-y-2 shadow-xl shadow-orange/20` 
                                : 'bg-surface dark:bg-stone-900 border border-stone-100 dark:border-stone-800 hover:border-gold/50'}
                        `}
                      >
                          <div className={`
                             w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors
                             ${isSelected ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-stone-100 dark:bg-stone-800 text-stone-400 group-hover:text-gold'}
                          `}>
                              <Icon size={20} />
                          </div>
                          
                          <div>
                              <h4 className={`font-bold text-lg leading-none mb-2 ${isSelected ? 'text-white' : 'text-ink dark:text-white'}`}>
                                  {translatedVirtue.name}
                              </h4>
                              <p className={`text-[10px] font-medium leading-tight ${isSelected ? 'text-white/90' : 'text-subtle'}`}>
                                  {translatedVirtue.desc}
                              </p>
                          </div>
                          
                          {isSelected && (
                              <div className="absolute top-3 right-3 text-white animate-fade-in">
                                  <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                              </div>
                          )}
                      </div>
                  );
              })}
          </div>
      </section>

      {/* SECTION 2: HABITS CONTROL CENTER */}
      <section id="trails-rhythm" className="px-2">
          <h3 className="text-lg font-bold font-serif mb-4 flex items-center gap-2 text-ink dark:text-white">
              <Flame className="text-red-500" size={20} fill="currentColor" /> {t.trails.dailyRhythm}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
              {/* Card 1: Daily Reading */}
              <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] p-6 shadow-sm border border-stone-100 dark:border-stone-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-gold/10 transition-colors"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 bg-gold/10 text-gold-dark dark:text-gold rounded-2xl flex items-center justify-center">
                          <BookOpen size={20} />
                      </div>
                      <div className="text-right">
                          <span className="block text-4xl font-black text-ink dark:text-white leading-none">{goals.dailyChapters}</span>
                          <span className="text-[10px] font-bold text-subtle uppercase tracking-wider">{t.trails.chapters}</span>
                      </div>
                  </div>

                  <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      step="1"
                      value={goals.dailyChapters}
                      onChange={(e) => setGoals({...goals, dailyChapters: parseInt(e.target.value)})}
                      className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold relative z-10"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-subtle uppercase">
                      <span>{t.trails.light}</span>
                      <span>{t.trails.intense}</span>
                  </div>
              </div>

              {/* Card 2: Study Time */}
              <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] p-6 shadow-sm border border-stone-100 dark:border-stone-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-colors"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                          <Clock size={20} />
                      </div>
                      <div className="text-right">
                          <span className="block text-4xl font-black text-ink dark:text-white leading-none">{goals.dailyStudyMinutes}</span>
                          <span className="text-[10px] font-bold text-subtle uppercase tracking-wider">{t.trails.minutes}</span>
                      </div>
                  </div>

                  <input 
                      type="range" 
                      min="5" 
                      max="60" 
                      step="5"
                      value={goals.dailyStudyMinutes}
                      onChange={(e) => setGoals({...goals, dailyStudyMinutes: parseInt(e.target.value)})}
                      className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-blue-500 relative z-10"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-subtle uppercase">
                      <span>{t.trails.quick}</span>
                      <span>{t.trails.deep}</span>
                  </div>
              </div>
          </div>
      </section>

      {/* SECTION 3: TARGET JOURNEY */}
      <section id="trails-journey" className="px-2">
          <h3 className="text-lg font-bold font-serif mb-4 flex items-center gap-2 text-ink dark:text-white">
              <Zap className="text-purple-500" size={20} fill="currentColor" /> {t.trails.nextTarget}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INITIAL_CHALLENGES.map((challenge) => {
                  const isSelected = goals.targetJourneyId === challenge.id;
                  const translatedChallenge = t.challenges[challenge.id as keyof typeof t.challenges];

                  return (
                      <div 
                        key={challenge.id}
                        onClick={() => handleJourneySelect(challenge.id)}
                        className={`
                            p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all border relative overflow-hidden group
                            ${isSelected 
                                ? 'bg-ink dark:bg-stone-100 text-white dark:text-ink border-transparent shadow-lg transform scale-[1.01]' 
                                : 'bg-surface dark:bg-stone-900 text-stone-500 dark:text-stone-400 border-stone-100 dark:border-stone-800 hover:border-gold/30'}
                        `}
                      >
                          {isSelected && <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>}
                          
                          <div className="flex items-center gap-3 relative z-10">
                              <div className={`
                                w-4 h-4 rounded-full flex items-center justify-center border
                                ${isSelected ? 'bg-gold border-gold text-ink' : 'border-stone-300 dark:border-stone-700'}
                              `}>
                                 {isSelected && <div className="w-1.5 h-1.5 bg-ink rounded-full"></div>}
                              </div>
                              <div>
                                <span className={`block font-bold text-sm md:text-base leading-tight ${isSelected ? 'text-white dark:text-ink' : 'text-ink dark:text-white'}`}>{translatedChallenge.title}</span>
                                <span className={`text-[10px] font-medium uppercase tracking-wide ${isSelected ? 'text-white/60 dark:text-ink/60' : 'text-subtle'}`}>{challenge.days} {t.trails.days}</span>
                              </div>
                          </div>
                          
                          {isSelected && <ChevronRight size={18} className="text-white/50 dark:text-ink/50" />}
                      </div>
                  )
              })}
          </div>
      </section>

      {/* FLOATING SAVE BUTTON */}
      <div id="trails-save" className="fixed bottom-0 left-0 right-0 p-6 pb-8 md:pb-6 bg-gradient-to-t from-paper via-paper to-transparent dark:from-black dark:via-black/90 pointer-events-none z-40">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button 
                onClick={handleSave}
                className={`
                    w-full shadow-2xl flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform
                    ${showSavedToast 
                        ? 'bg-green-500 text-white scale-100' 
                        : 'bg-gradient-to-r from-gold to-orange text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-orange/20'}
                `}
            >
                {showSavedToast ? (
                    <>
                        <CheckCircle2 size={24} /> {t.trails.savedSuccess}
                    </>
                ) : (
                    <>
                        {isSaving ? <span className="animate-spin">⏳</span> : <Save size={20} />}
                        {isSaving ? t.trails.saving : t.trails.saveGoals}
                    </>
                )}
            </button>
          </div>
      </div>

    </div>
  );
};

export default Trails;
