
import React, { useState, useEffect } from 'react';
import { BIBLE_TRIVIA_QUESTIONS, XP_PER_TRIVIA } from '../constants';
import { addXp } from '../services/gamification';
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight, Lightbulb } from 'lucide-react';
import { BibleTriviaQuestion } from '../types';

const BibleTrivia: React.FC = () => {
  const [question, setQuestion] = useState<BibleTriviaQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [xpGained, setXpGained] = useState(false);

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const loadNewQuestion = () => {
    // Pick a random question
    const randomIndex = Math.floor(Math.random() * BIBLE_TRIVIA_QUESTIONS.length);
    setQuestion(BIBLE_TRIVIA_QUESTIONS[randomIndex]);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowResult(false);
    setXpGained(false);
  };

  const handleOptionClick = (option: string) => {
    if (showResult || !question) return;

    setSelectedOption(option);
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct && !xpGained) {
      addXp(XP_PER_TRIVIA);
      setXpGained(true);
    }
  };

  if (!question) return null;

  return (
    <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] p-6 shadow-card border border-stone-100 dark:border-stone-800 relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-purple-500/10 transition-colors"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center">
            <HelpCircle size={20} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-ink dark:text-white leading-tight">Desafio Bíblico</h3>
            <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">Trivia do Dia</p>
          </div>
        </div>
        
        {showResult && (
          <button 
            onClick={loadNewQuestion}
            className="p-2 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors text-subtle"
            title="Nova Pergunta"
          >
            <RefreshCw size={16} />
          </button>
        )}
      </div>

      {/* Question */}
      <div className="mb-6 relative z-10">
        <p className="font-medium text-ink dark:text-stone-200 text-lg leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2 relative z-10">
        {question.options.map((opt, idx) => {
          let btnClass = "border-stone-200 dark:border-stone-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20";
          let icon = null;

          if (showResult) {
            if (opt === question.correctAnswer) {
              btnClass = "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300 font-bold";
              icon = <CheckCircle2 size={18} className="text-green-600" />;
            } else if (opt === selectedOption) {
              btnClass = "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300";
              icon = <XCircle size={18} className="text-red-600" />;
            } else {
              btnClass = "opacity-50 border-stone-100 dark:border-stone-800";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(opt)}
              disabled={showResult}
              className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between group/btn ${btnClass}`}
            >
              <span className="text-sm">{opt}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Result Feedback */}
      {showResult && (
        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 animate-slide-up">
          {isCorrect ? (
            <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
              <Trophy size={20} className="fill-current" />
              <div>
                <p className="font-bold text-sm">Resposta Correta!</p>
                <p className="text-xs text-green-600/80 dark:text-green-400/80">+{XP_PER_TRIVIA} XP adicionados.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
              <Lightbulb size={20} className="text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-ink dark:text-white">Sabia dessa?</p>
                <p className="text-xs mt-1 leading-relaxed">{question.explanation} <span className="font-bold text-gold">({question.reference})</span></p>
              </div>
            </div>
          )}
          
          <button 
            onClick={loadNewQuestion}
            className="w-full mt-4 py-3 bg-ink dark:bg-white text-white dark:text-ink rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Próxima Pergunta <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BibleTrivia;
