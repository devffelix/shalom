
import React from 'react';
import { Loader2, CheckCircle, MessageCircle } from 'lucide-react';
import { BibleApiResponse, BibleBook } from '../../types';
import { XP_PER_CHAPTER } from '../../constants';

interface BibleReaderProps {
  loading: boolean;
  error: boolean;
  content: BibleApiResponse | null;
  currentBook: BibleBook;
  currentChapter: number;
  fontSizeLevel: number;
  targetVerse: number | null;
  isHighlighted: (verse: number) => boolean;
  onToggleHighlight: (verse: number, text: string) => void;
  isRead: boolean;
  onMarkAsRead: () => void;
  onTalkToGuide: () => void;
  direction: 'next' | 'prev' | null;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const fontSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
const lineHeight = ['leading-relaxed', 'leading-relaxed', 'leading-loose', 'leading-loose', 'leading-loose'];

const BibleReader: React.FC<BibleReaderProps> = ({
  loading,
  error,
  content,
  currentBook,
  currentChapter,
  fontSizeLevel,
  targetVerse,
  isHighlighted,
  onToggleHighlight,
  isRead,
  onMarkAsRead,
  onTalkToGuide,
  direction,
  contentRef
}) => {
  
  // Animation classes based on direction
  const animationClass = !loading && !error 
    ? (direction === 'next' ? 'animate-turn-next' : direction === 'prev' ? 'animate-turn-prev' : 'animate-fade-in')
    : '';

  return (
    <div className="flex-1 bg-surface dark:bg-stone-900 rounded-tr-[20px] rounded-br-[20px] shadow-card relative overflow-hidden flex flex-col border-r-4 border-b-4 border-stone-200/50 dark:border-stone-800">
        {/* Book Binding Visual Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-stone-200/40 dark:from-black/60 to-transparent pointer-events-none z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.05] pointer-events-none bg-paper" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>
        
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-paper/80 dark:bg-stone-900/80 backdrop-blur-sm">
            <Loader2 className="w-12 h-12 text-gold animate-spin" />
            <p className="mt-4 font-serif text-brown italic">Buscando sabedoria...</p>
          </div>
        )}
        
        <div 
            id="bible-text-area" 
            ref={contentRef} 
            className={`flex-1 overflow-y-auto px-6 md:px-12 py-8 pb-32 scroll-smooth ${animationClass}`}
        >
          {content && !error && (
            <div className="max-w-2xl mx-auto relative z-0">
              <div className="text-center mb-10 pb-6 border-b-2 border-stone-100 dark:border-stone-800 border-double">
                <span className="text-[10px] font-bold text-subtle uppercase tracking-[0.3em] mb-2 block">
                    {currentBook.testament === 'Old' ? 'Antigo Testamento' : 'Novo Testamento'}
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-ink dark:text-white">
                    {currentBook.name}
                </h1>
                <div className="text-6xl font-serif font-bold text-stone-100 dark:text-stone-800 absolute top-10 left-1/2 -translate-x-1/2 -z-10">
                    {currentChapter}
                </div>
                <span className="text-gold font-serif text-xl italic mt-2 block">Capítulo {currentChapter}</span>
              </div>

              <div className={`${fontSizes[fontSizeLevel]} ${lineHeight[fontSizeLevel]} text-ink dark:text-stone-300 font-serif text-justify space-y-2`}>
                {content.verses ? content.verses.map((v) => {
                    const highlighted = isHighlighted(v.verse);
                    const isTarget = v.verse === targetVerse;
                    return (
                      <span 
                        key={v.verse} 
                        id={`verse-${v.verse}`} 
                        onClick={() => onToggleHighlight(v.verse, v.text)} 
                        className={`inline relative cursor-pointer transition-all ${highlighted ? 'bg-gold/30 rounded py-1' : 'hover:bg-stone-100 dark:hover:bg-stone-800 rounded'} ${isTarget ? 'bg-orange/20 rounded py-1' : ''}`}
                      >
                        <span className="text-[0.6em] font-bold text-orange align-top mr-1">{v.verse}</span>
                        <span className="mr-1">{v.text}</span>
                      </span>
                    );
                  }) : content.text.split('\n').map((para, i) => para.trim() && <p key={i} className="mb-4">{para}</p>)}
              </div>

              <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col items-center gap-6">
                <button 
                    id="bible-mark-read" 
                    onClick={onMarkAsRead} 
                    disabled={isRead} 
                    className={`flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold transition-all ${isRead ? 'bg-transparent text-green-600 cursor-default' : 'bg-ink dark:bg-white text-white dark:text-ink shadow-xl hover:scale-105 active:scale-95'}`}
                >
                  {isRead ? <><CheckCircle size={20} /><span>Lido (+{XP_PER_CHAPTER} XP)</span></> : "Marcar como Lido"}
                </button>
                
                {/* Contextual Guide Button */}
                <div className="w-full max-w-sm bg-green-50 dark:bg-green-900/10 p-6 rounded-3xl border border-dashed border-green-200 dark:border-green-800 text-center animate-fade-in">
                    <p className="text-sm text-green-800 dark:text-green-300 font-serif mb-4 italic">"Ficou com alguma dúvida sobre este capítulo ou precisa de uma palavra de conforto?"</p>
                    <button onClick={onTalkToGuide} className="w-full py-3 bg-green-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 shadow-md transition-all">
                        <MessageCircle size={18} /> Conversar com Guia Espiritual
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default BibleReader;
