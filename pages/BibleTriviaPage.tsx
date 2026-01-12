
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TRIVIA_CATEGORIES, XP_PER_TRIVIA } from '../constants';
import { addXp, getUserXp } from '../services/gamification';
import { TriviaCategory } from '../types';
import { ArrowLeft, Trophy, Cross, Scroll, Map, Brain, CheckCircle2, XCircle, ArrowRight, Lightbulb, HelpCircle, Star, Crown, BookOpen, Heart, Flame, Home, RefreshCw, Sun, Mountain } from 'lucide-react';

const IconMap: Record<string, any> = {
  Cross, Scroll, Map, Brain, BookOpen, Heart, Flame, Crown, Sun, Mountain
};

const BibleTriviaPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<TriviaCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [userXp, setUserXp] = useState(getUserXp());
  const [isCompleted, setIsCompleted] = useState(false);
  const [combo, setCombo] = useState(0);

  // Animation states
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    // Reset state when category is deselected
    if (!selectedCategory) {
        setIsCompleted(false);
        setScore(0);
        setCurrentQuestionIndex(0);
        setCombo(0);
    }
  }, [selectedCategory]);

  const handleSelectCategory = (category: TriviaCategory) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setIsCompleted(false);
    setCombo(0);
  };

  const handleAnswer = (option: string) => {
    if (showResult || !selectedCategory) return;

    setSelectedOption(option);
    const question = selectedCategory.questions[currentQuestionIndex];
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(s => s + 1);
      setCombo(c => c + 1);
      // Bonus XP for combos
      const bonus = Math.floor(combo / 3) * 10;
      addXp(XP_PER_TRIVIA + bonus);
      setUserXp(prev => prev + XP_PER_TRIVIA + bonus);
    } else {
        setCombo(0);
    }
  };

  const nextQuestion = () => {
    if (!selectedCategory) return;
    
    setAnimatingOut(true);
    setTimeout(() => {
        if (currentQuestionIndex < selectedCategory.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setShowResult(false);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            setIsCompleted(true);
        }
        setAnimatingOut(false);
    }, 300);
  };

  const quitGame = () => {
    setSelectedCategory(null);
  };

  // --- VIEW 1: CATEGORY SELECTION ---
  if (!selectedCategory) {
    return (
      <div className="animate-fade-in pb-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 px-2 pt-2">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/app')} className="p-3 bg-white dark:bg-stone-800 rounded-2xl shadow-sm hover:scale-105 transition-transform"><ArrowLeft size={22} /></button>
                <div>
                    <h2 className="text-3xl font-serif font-black text-ink dark:text-white leading-none">Desafio</h2>
                    <span className="text-xs font-bold text-subtle uppercase tracking-widest">Bíblico</span>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-gold to-orange px-4 py-2 rounded-2xl text-white shadow-lg shadow-orange/20">
                <Crown size={18} fill="currentColor" />
                <span className="font-black text-sm">{userXp}</span>
            </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-5 px-2">
            {TRIVIA_CATEGORIES.map((cat, idx) => {
                const Icon = IconMap[cat.icon] || HelpCircle;
                return (
                    <button 
                        key={cat.id} 
                        onClick={() => handleSelectCategory(cat)}
                        className="group relative overflow-hidden rounded-[2.5rem] text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-card hover:shadow-2xl h-40"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                        
                        {/* Decorative Circles */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>

                        <div className="relative z-10 h-full p-8 flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 opacity-80">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Tema {idx + 1}</span>
                                </div>
                                <h3 className="text-white font-serif font-black text-3xl mb-1 leading-tight">{cat.title}</h3>
                                <p className="text-white/80 text-sm font-medium line-clamp-1">{cat.questions.length} Perguntas</p>
                            </div>
                            
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-lg group-hover:rotate-12 transition-transform duration-500">
                                <Icon size={32} />
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
      </div>
    );
  }

  // --- VIEW 3: COMPLETION SCREEN ---
  if (isCompleted) {
      const total = selectedCategory.questions.length;
      const percentage = (score / total) * 100;
      let stars = 1;
      if (percentage > 50) stars = 2;
      if (percentage === 100) stars = 3;

      return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in px-6 text-center">
              <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedCategory.gradient} blur-3xl opacity-20 rounded-full`}></div>
                  
                  {/* Stars Container */}
                  <div className="relative flex gap-2 mb-6">
                      {[1, 2, 3].map((s) => (
                          <div key={s} className={`transform transition-all duration-700 ${s <= stars ? 'scale-100' : 'scale-75 opacity-30'}`} style={{transitionDelay: `${s*200}ms`}}>
                              <Star 
                                size={s === 2 ? 64 : 48} 
                                className={`${s <= stars ? 'text-gold fill-gold drop-shadow-lg' : 'text-stone-300'}`} 
                                strokeWidth={s <= stars ? 0 : 2}
                              />
                          </div>
                      ))}
                  </div>
              </div>

              <h2 className="text-4xl font-serif font-black text-ink dark:text-white mb-2">
                  {percentage === 100 ? 'Perfeito!' : percentage > 50 ? 'Muito Bem!' : 'Bom Esforço!'}
              </h2>
              <p className="text-subtle text-lg mb-8">
                  Você acertou <span className="font-bold text-ink dark:text-white">{score}</span> de {total} questões.
              </p>

              <div className="bg-surface dark:bg-stone-900 rounded-3xl p-6 w-full max-w-sm mb-8 shadow-card border border-stone-100 dark:border-stone-800">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                      <span className="text-subtle font-bold text-sm">XP Ganho</span>
                      <span className="font-black text-xl text-gold">+{score * XP_PER_TRIVIA} XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                      <span className="text-subtle font-bold text-sm">Precisão</span>
                      <span className={`font-black text-xl ${percentage > 70 ? 'text-green-500' : 'text-orange'}`}>{Math.round(percentage)}%</span>
                  </div>
              </div>

              <div className="flex flex-col w-full max-w-sm gap-3">
                  <button 
                    onClick={() => { setSelectedCategory(null); }}
                    className="w-full py-4 bg-ink dark:bg-white text-white dark:text-ink rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                      <Home size={20} /> Escolher Outro Tema
                  </button>
                  <button 
                    onClick={() => {
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setIsCompleted(false);
                        setShowResult(false);
                    }}
                    className="w-full py-4 bg-transparent text-subtle font-bold text-sm hover:text-ink dark:hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                      <RefreshCw size={16} /> Tentar Novamente
                  </button>
              </div>
          </div>
      )
  }

  // --- VIEW 2: GAME INTERFACE ---
  const currentQuestion = selectedCategory.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / selectedCategory.questions.length) * 100;

  return (
    <div className={`flex flex-col h-[calc(100vh-100px)] animate-fade-in relative transition-opacity duration-300 ${animatingOut ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 px-2 pt-2">
            <button onClick={quitGame} className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-subtle hover:text-ink dark:hover:text-white transition-colors">
                <XCircle size={20} />
            </button>
            <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-subtle uppercase tracking-widest">{selectedCategory.title}</span>
                <div className="flex gap-1 mt-1">
                    {selectedCategory.questions.map((_, i) => (
                        <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i === currentQuestionIndex ? 'bg-gold' : i < currentQuestionIndex ? 'bg-green-500' : 'bg-stone-200 dark:bg-stone-800'}`}></div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full text-xs font-black text-ink dark:text-white border border-stone-200 dark:border-stone-700">
                <Trophy size={14} className="text-gold" /> {score}
            </div>
        </div>

        {/* Combo Indicator */}
        {combo > 1 && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-orange text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg animate-bounce transform rotate-2 z-20">
                🔥 {combo}x Combo!
            </div>
        )}

        {/* Question Card */}
        <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 shadow-card border border-stone-100 dark:border-stone-800 mb-6 relative overflow-hidden group">
                {/* Dynamic Gradient Bar */}
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${selectedCategory.gradient}`}></div>
                
                <span className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4 block">
                    Pergunta {currentQuestionIndex + 1}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif font-black text-ink dark:text-white leading-tight mb-4">
                    {currentQuestion.question}
                </h3>

                {/* Optional Hint Logic could go here */}
            </div>

            {/* Options */}
            <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                    let btnClass = "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-gold dark:hover:border-gold";
                    let icon = null;
                    let textClass = "text-stone-600 dark:text-stone-300";

                    if (showResult) {
                        if (opt === currentQuestion.correctAnswer) {
                            btnClass = "bg-green-500 border-green-500 shadow-lg shadow-green-500/30 scale-[1.02]";
                            textClass = "text-white";
                            icon = <CheckCircle2 size={20} className="text-white" />;
                        } else if (opt === selectedOption) {
                            btnClass = "bg-red-500 border-red-500 shadow-lg shadow-red-500/30";
                            textClass = "text-white";
                            icon = <XCircle size={20} className="text-white" />;
                        } else {
                            btnClass = "opacity-40 bg-stone-100 dark:bg-stone-800 border-transparent grayscale";
                        }
                    } else {
                        // Default state styles
                        btnClass = "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 active:scale-[0.98] shadow-sm";
                    }

                    return (
                        <button
                            key={idx}
                            disabled={showResult}
                            onClick={() => handleAnswer(opt)}
                            className={`w-full p-5 rounded-2xl border-2 text-left font-bold text-lg transition-all duration-300 flex items-center justify-between ${btnClass}`}
                        >
                            <span className={textClass}>{opt}</span>
                            {icon}
                        </button>
                    )
                })}
            </div>
        </div>

        {/* Feedback / Next Button */}
        {showResult && (
            <div className="mt-4 animate-slide-up pb-6">
                <div className={`p-5 rounded-3xl mb-4 flex gap-4 items-start border shadow-sm ${isCorrect ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30' : 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30'}`}>
                    <div className={`p-2 rounded-full shrink-0 ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange'}`}>
                        {isCorrect ? <CheckCircle2 size={20} /> : <Lightbulb size={20} />}
                    </div>
                    <div>
                        <p className={`font-black text-sm mb-1 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'}`}>
                            {isCorrect ? 'Excelente!' : 'Não foi dessa vez...'}
                        </p>
                        <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-medium">
                            {currentQuestion.explanation} <span className="block mt-1 font-bold text-xs opacity-70 uppercase tracking-wider">{currentQuestion.reference}</span>
                        </p>
                    </div>
                </div>
                <button 
                    onClick={nextQuestion}
                    className="w-full py-4 bg-ink dark:bg-white text-white dark:text-ink rounded-2xl font-black text-xl shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    {currentQuestionIndex < selectedCategory.questions.length - 1 ? 'Próxima' : 'Ver Resultado'} <ArrowRight size={24} />
                </button>
            </div>
        )}
    </div>
  );
};

export default BibleTriviaPage;
