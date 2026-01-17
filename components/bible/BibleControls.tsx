
import React, { useState } from 'react';
import { BookOpen, Timer, Type, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { BibleBook } from '../../types';

interface BibleControlsProps {
  currentBook: BibleBook;
  currentChapter: number;
  onOpenBookSelector: () => void;
  isTimerActive: boolean;
  onToggleTimer: () => void;
  fontSizeLevel: number;
  onFontSizeChange: (level: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstChapter: boolean;
  isLastChapter: boolean;
}

const BibleControls: React.FC<BibleControlsProps> = ({
  currentBook,
  currentChapter,
  onOpenBookSelector,
  isTimerActive,
  onToggleTimer,
  fontSizeLevel,
  onFontSizeChange,
  onNext,
  onPrev,
  isFirstChapter,
  isLastChapter
}) => {
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-4 bg-surface dark:bg-stone-900 p-2 pr-2 rounded-full shadow-soft border border-stone-100 dark:border-stone-800 relative z-30">
        {/* Book Selector Button */}
        <button 
            id="bible-book-selector" 
            onClick={onOpenBookSelector} 
            className="flex-1 flex items-center gap-3 bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-full px-4 py-2 transition-colors group mr-2 overflow-hidden"
        >
          <div className="w-8 h-8 rounded-full bg-ink dark:bg-black text-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
            <BookOpen size={16} />
          </div>
          <div className="text-left min-w-0">
            <p className="text-[10px] font-bold text-subtle uppercase tracking-wider">Livro</p>
            <h2 className="text-sm md:text-base font-serif font-bold text-ink dark:text-white truncate">
                {currentBook.name} <span className="text-orange">{currentChapter}</span>
            </h2>
          </div>
        </button>

        {/* Right Controls */}
        <div className="flex items-center gap-1 md:gap-2">
          {!isTimerActive && (
              <button 
                id="bible-timer-btn" 
                onClick={onToggleTimer} 
                className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-300 flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors"
                title="Iniciar Cronômetro"
              >
                <Timer size={18} />
              </button>
          )}
          
          {/* Font Size Menu */}
          <div className="relative">
            <button 
                id="bible-font-btn" 
                onClick={() => setIsFontMenuOpen(!isFontMenuOpen)} 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFontMenuOpen ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-surface dark:bg-stone-800 text-brown dark:text-stone-300 border border-stone-200 dark:border-stone-700'}`}
            >
                <Type size={18} />
            </button>
            
            {isFontMenuOpen && (
              <div className="absolute top-12 right-0 bg-ink dark:bg-stone-800 p-2 rounded-2xl shadow-xl flex items-center gap-2 animate-slide-up z-40 border border-stone-700 min-w-[140px] justify-between">
                 <button 
                    onClick={() => onFontSizeChange(Math.max(0, fontSizeLevel - 1))} 
                    disabled={fontSizeLevel === 0} 
                    className="w-8 h-8 rounded-full bg-stone-700 text-white flex items-center justify-center disabled:opacity-30 hover:bg-stone-600"
                 >
                    <Minus size={16} />
                 </button>
                 <span className="text-white font-bold text-sm w-8 text-center">{fontSizeLevel + 1}</span>
                 <button 
                    onClick={() => onFontSizeChange(Math.min(4, fontSizeLevel + 1))} 
                    disabled={fontSizeLevel === 4} 
                    className="w-8 h-8 rounded-full bg-gold text-ink flex items-center justify-center disabled:opacity-30 hover:bg-orange"
                 >
                    <Plus size={16} />
                 </button>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-stone-200 dark:bg-stone-700 mx-1"></div>
          
          {/* Nav Buttons */}
          <button 
            onClick={onPrev} 
            disabled={isFirstChapter} 
            className="w-10 h-10 rounded-full bg-surface dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-brown dark:text-stone-300 disabled:opacity-30 hover:bg-stone-100 dark:hover:bg-stone-700"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onNext} 
            disabled={isLastChapter} 
            className="w-10 h-10 rounded-full bg-ink dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 shadow-lg hover:bg-stone-800 dark:hover:bg-white disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
  );
};

export default BibleControls;
