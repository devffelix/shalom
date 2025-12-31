
import React, { useState, useEffect, useRef } from 'react';
import { BIBLE_BOOKS, XP_PER_CHAPTER } from '../constants';
import { fetchChapter } from '../services/api';
import { addXp, checkAndUnlockBibleBadge, recordStudySession } from '../services/gamification';
import { ChevronLeft, ChevronRight, CheckCircle, X, BookOpen, Loader2, Type, Minus, Plus, Highlighter, Bookmark, RefreshCw, Crown, Award, Play, Pause, Square, Timer, GripHorizontal, Minimize2, Maximize2, MessageCircle } from 'lucide-react';
import { UserProgress, BibleApiResponse, Note } from '../types';
import { useLocation } from 'react-router-dom';

const Bible: React.FC = () => {
  const location = useLocation();
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [targetVerse, setTargetVerse] = useState<number | null>(null);
  const [content, setContent] = useState<BibleApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'info' | 'badge' | 'xp'>('info');
  const [fontSizeLevel, setFontSizeLevel] = useState(2);
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 75;
  const [studyTime, setStudyTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timerPosition, setTimerPosition] = useState({ x: 20, y: window.innerHeight - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const currentBook = BIBLE_BOOKS[selectedBookIndex];
  const fontSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
  const lineHeight = ['leading-relaxed', 'leading-relaxed', 'leading-loose', 'leading-loose', 'leading-loose'];

  useEffect(() => {
    const savedFont = localStorage.getItem('lumina_font_size');
    if (savedFont) setFontSizeLevel(parseInt(savedFont));
    const savedNotes = localStorage.getItem('lumina_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    setTimerPosition({ x: 20, y: window.innerHeight - 220 });
  }, []);

  useEffect(() => {
    let interval: any;
    if (isTimerActive && !isTimerPaused) {
      interval = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isTimerPaused]);

  useEffect(() => {
    const handleWindowMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      setTimerPosition({ x: clientX - dragOffset.x, y: clientY - dragOffset.y });
    };
    const handleWindowUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleWindowMove);
      window.addEventListener('mouseup', handleWindowUp);
      window.addEventListener('touchmove', handleWindowMove, { passive: false });
      window.addEventListener('touchend', handleWindowUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleWindowMove);
      window.removeEventListener('mouseup', handleWindowUp);
      window.removeEventListener('touchmove', handleWindowMove);
      window.removeEventListener('touchend', handleWindowUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (location.state && location.state.book && location.state.chapter) {
      const bookNameInput = location.state.book.trim().toLowerCase();
      const chapterInput = location.state.chapter;
      const verseInput = location.state.verse;
      const index = BIBLE_BOOKS.findIndex(b => 
        b.name.toLowerCase() === bookNameInput || 
        b.englishName.toLowerCase() === bookNameInput ||
        b.abbrev.toLowerCase() === bookNameInput
      );
      if (index !== -1) {
        setSelectedBookIndex(index);
        const maxChapters = BIBLE_BOOKS[index].chapters;
        const safeChapter = (chapterInput > 0 && chapterInput <= maxChapters) ? chapterInput : 1;
        setSelectedChapter(safeChapter);
        if (verseInput) setTargetVerse(verseInput);
      }
    } else {
      const saved = localStorage.getItem('lumina_progress');
      if (saved) {
        try {
          const p: UserProgress = JSON.parse(saved);
          if (p.lastRead) {
            const parts = p.lastRead.split('-');
            if (parts.length >= 2) {
              const bookName = parts[0];
              const chapterNum = parseInt(parts[parts.length - 1]);
              const index = BIBLE_BOOKS.findIndex(b => b.name === bookName || b.englishName === bookName);
              if (index !== -1) {
                setSelectedBookIndex(index);
                setSelectedChapter(chapterNum);
              }
            }
          }
        } catch (e) { console.error(e); }
      }
    }
  }, [location.state]);

  useEffect(() => {
    loadChapter();
    checkIfRead();
    updateLastReadLocation();
  }, [selectedBookIndex, selectedChapter]);

  useEffect(() => {
    if (content && targetVerse && !loading) {
      const timer = setTimeout(() => {
        const verseElement = document.getElementById(`verse-${targetVerse}`);
        if (verseElement) verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTargetVerse(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [content, targetVerse, loading]);

  const saveFontSize = (level: number) => {
    setFontSizeLevel(level);
    localStorage.setItem('lumina_font_size', level.toString());
  };

  const updateLastReadLocation = () => {
    try {
      const saved = localStorage.getItem('lumina_progress');
      if (saved) {
        const p: UserProgress = JSON.parse(saved);
        const currentId = `${currentBook.englishName}-${selectedChapter}`;
        localStorage.setItem('lumina_progress', JSON.stringify({ ...p, lastRead: currentId }));
      }
    } catch (e) { console.error(e); }
  };

  const loadChapter = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiBookName = currentBook.englishName || currentBook.name;
      const data = await fetchChapter(apiBookName, selectedChapter);
      setContent(data);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    } catch (e) { setError(true); setContent(null); } finally {
      setLoading(false);
      setIsMenuOpen(false);
    }
  };

  const checkIfRead = () => {
    const saved = localStorage.getItem('lumina_progress');
    if (saved) {
      const p: UserProgress = JSON.parse(saved);
      const enId = `${currentBook.englishName}-${selectedChapter}`;
      const ptId = `${currentBook.name}-${selectedChapter}`;
      setIsRead(p.readChapters.includes(enId) || p.readChapters.includes(ptId));
    } else { setIsRead(false); }
  };

  const markAsRead = () => {
    const saved = localStorage.getItem('lumina_progress');
    if (saved) {
      const p: UserProgress = JSON.parse(saved);
      const enId = `${currentBook.englishName}-${selectedChapter}`;
      if (!p.readChapters.includes(enId)) {
        const newProgress = {
          ...p,
          readChapters: [...p.readChapters, enId],
          lastRead: enId,
          dailyReadCount: (p.dailyReadCount || 0) + 1
        };
        localStorage.setItem('lumina_progress', JSON.stringify(newProgress));
        setIsRead(true);
        const { leveledUp, newLevelData } = addXp(XP_PER_CHAPTER);
        setToastType('info');
        setShowToast(leveledUp ? `🎉 Nível ${newLevelData.currentTitle}!` : `+${XP_PER_CHAPTER} XP!`);
        setTimeout(() => setShowToast(null), 3000);
        const newBadge = checkAndUnlockBibleBadge(currentBook);
        if (newBadge) {
             setTimeout(() => {
                setToastType('badge');
                setShowToast(`🏆 ${newBadge.title}!`);
                setTimeout(() => setShowToast(null), 4000);
             }, 3500);
        }
      }
    }
  };

  const handleTalkToGuide = () => {
    const text = encodeURIComponent(`Olá, Shalom! Acabei de ler ${currentBook.name} ${selectedChapter} e gostaria de tirar uma dúvida.`);
    window.open(`https://wa.me/551151989852?text=${text}`, '_blank');
  };

  const handleNext = () => {
    if (selectedBookIndex === BIBLE_BOOKS.length - 1 && selectedChapter === currentBook.chapters) return;
    setDirection('next');
    setAnimKey(p => p + 1);
    if (selectedChapter < currentBook.chapters) setSelectedChapter(c => c + 1);
    else if (selectedBookIndex < BIBLE_BOOKS.length - 1) { setSelectedBookIndex(i => i + 1); setSelectedChapter(1); }
  };

  const handlePrev = () => {
    if (selectedBookIndex === 0 && selectedChapter === 1) return;
    setDirection('prev');
    setAnimKey(p => p + 1);
    if (selectedChapter > 1) setSelectedChapter(c => c - 1);
    else if (selectedBookIndex > 0) { setSelectedBookIndex(i => i - 1); setSelectedChapter(BIBLE_BOOKS[selectedBookIndex - 1].chapters); }
  };

  const onTouchStart = (e: React.TouchEvent) => { if (isDragging) return; setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => { if (isDragging) return; setTouchEnd(e.targetTouches[0].clientX); };
  const onTouchEnd = () => { if (isDragging) return; if (!touchStart || !touchEnd) return; const distance = touchStart - touchEnd; if (distance > minSwipeDistance) handleNext(); else if (distance < -minSwipeDistance) handlePrev(); };

  const toggleHighlight = (verseNum: number, text: string) => {
    const noteId = `${currentBook.englishName}-${selectedChapter}-${verseNum}`;
    const existingIndex = notes.findIndex(n => n.id === noteId);
    let newNotes = [...notes];
    if (existingIndex >= 0) newNotes.splice(existingIndex, 1);
    else newNotes.push({ id: noteId, reference: `${currentBook.name} ${selectedChapter}:${verseNum}`, text, date: new Date().toISOString(), book: currentBook.name, chapter: selectedChapter, verse: verseNum });
    setNotes(newNotes);
    localStorage.setItem('lumina_notes', JSON.stringify(newNotes));
    setToastType('info');
    setShowToast(existingIndex >= 0 ? "Marcação removida" : "Salvo em Anotações");
    setTimeout(() => setShowToast(null), 2000);
  };

  const isHighlighted = (verseNum: number) => notes.some(n => n.id === `${currentBook.englishName}-${selectedChapter}-${verseNum}`);
  const formatTime = (ts: number) => { const h = Math.floor(ts / 3600); const m = Math.floor((ts % 3600) / 60); const s = ts % 60; return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`; };

  return (
    <div className="h-full flex flex-col relative book-perspective">
      {showToast && (
        <div className={`absolute top-24 left-1/2 -translate-x-1/2 z-[60] text-white px-12 py-6 rounded-full shadow-2xl animate-slide-up flex items-center gap-5 scale-150 border-4 border-white/20 ${toastType === 'badge' ? 'bg-gradient-to-r from-gold to-orange' : toastType === 'xp' ? 'bg-green-600' : 'bg-ink'}`}>
          {toastType === 'badge' ? <Award size={36} fill="currentColor" /> : <Crown size={32} fill="currentColor"/>}
          <span className="text-4xl font-black whitespace-nowrap tracking-tighter">{showToast}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4 bg-surface dark:bg-stone-900 p-2 pr-2 rounded-full shadow-soft border border-stone-100 dark:border-stone-800 relative z-30">
        <button onClick={() => setIsMenuOpen(true)} className="flex-1 flex items-center gap-3 bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-full px-4 py-2 transition-colors group mr-2 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-ink dark:bg-black text-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0"><BookOpen size={16} /></div>
          <div className="text-left min-w-0"><p className="text-[10px] font-bold text-subtle uppercase tracking-wider">Livro</p><h2 className="text-sm md:text-base font-serif font-bold text-ink dark:text-white truncate">{currentBook.name} <span className="text-orange">{selectedChapter}</span></h2></div>
        </button>
        <div className="flex items-center gap-1 md:gap-2">
          {!isTimerActive && (
              <button onClick={() => {setIsTimerActive(true); setIsTimerPaused(false);}} className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-300 flex items-center justify-center hover:bg-green-100"><Timer size={18} /></button>
          )}
          <div className="relative">
            <button onClick={() => setIsFontMenuOpen(!isFontMenuOpen)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFontMenuOpen ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-surface dark:bg-stone-800 text-brown dark:text-stone-300 border border-stone-200'}`}><Type size={18} /></button>
            {isFontMenuOpen && (
              <div className="absolute top-12 right-0 bg-ink dark:bg-stone-800 p-2 rounded-2xl shadow-xl flex items-center gap-2 animate-slide-up z-40 border border-stone-700 min-w-[140px] justify-between">
                 <button onClick={() => saveFontSize(Math.max(0, fontSizeLevel - 1))} disabled={fontSizeLevel === 0} className="w-8 h-8 rounded-full bg-stone-700 text-white flex items-center justify-center disabled:opacity-30"><Minus size={16} /></button>
                 <span className="text-white font-bold text-sm w-8 text-center">{fontSizeLevel + 1}</span>
                 <button onClick={() => saveFontSize(Math.min(4, fontSizeLevel + 1))} disabled={fontSizeLevel === 4} className="w-8 h-8 rounded-full bg-gold text-ink flex items-center justify-center disabled:opacity-30"><Plus size={16} /></button>
              </div>
            )}
          </div>
          <div className="w-px h-6 bg-stone-200 dark:bg-stone-700 mx-1"></div>
          <button onClick={handlePrev} disabled={selectedBookIndex === 0 && selectedChapter === 1} className="w-10 h-10 rounded-full bg-surface dark:bg-stone-800 border border-stone-200 flex items-center justify-center text-brown dark:text-stone-300"><ChevronLeft size={20} /></button>
          <button onClick={handleNext} disabled={selectedBookIndex === BIBLE_BOOKS.length -1 && selectedChapter === currentBook.chapters} className="w-10 h-10 rounded-full bg-ink dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 shadow-lg"><ChevronRight size={20} /></button>
        </div>
      </div>

      {isTimerActive && (
          <div style={{ left: `${timerPosition.x}px`, top: `${timerPosition.y}px`, cursor: isDragging ? 'grabbing' : 'auto', touchAction: 'none' }} className={`fixed z-50 transition-all duration-75 ${isDragging ? 'scale-105' : ''}`}>
              {isMinimized ? (
                  <div className="relative" onMouseDown={(e) => {setIsDragging(true); setDragOffset({x: e.clientX - timerPosition.x, y: e.clientY - timerPosition.y});}} onTouchStart={(e) => {setIsDragging(true); setDragOffset({x: e.touches[0].clientX - timerPosition.x, y: e.touches[0].clientY - timerPosition.y});}}>
                      <button onClick={() => setIsMinimized(false)} className="w-16 h-16 rounded-full bg-stone-900 border-2 border-gold text-white shadow-2xl flex flex-col items-center justify-center gap-0.5"><Timer size={18} className={!isTimerPaused ? "animate-pulse text-gold" : "text-stone-400"} /><span className="text-[10px] font-mono font-bold">{formatTime(studyTime)}</span></button>
                  </div>
              ) : (
                  <div className="bg-stone-900 text-white rounded-3xl p-4 shadow-2xl border border-stone-700/50 w-[320px]">
                      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 cursor-grab" onMouseDown={(e) => {setIsDragging(true); setDragOffset({x: e.clientX - timerPosition.x, y: e.clientY - timerPosition.y});}} onTouchStart={(e) => {setIsDragging(true); setDragOffset({x: e.touches[0].clientX - timerPosition.x, y: e.touches[0].clientY - timerPosition.y});}}>
                         <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest"><GripHorizontal size={14} /> <span>Mover</span></div>
                         <button onClick={() => setIsMinimized(true)} className="p-1 text-stone-400 hover:text-white"><Minimize2 size={16} /></button>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 relative z-10">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${!isTimerPaused ? 'bg-gradient-to-br from-green-500 to-emerald-700 text-white' : 'bg-stone-800 text-stone-500'}`}><Timer size={24} className={!isTimerPaused ? "animate-pulse" : ""} /></div>
                              <div><p className="text-[10px] font-bold text-stone-400 tracking-widest mb-0.5">Tempo</p><p className={`font-mono text-2xl font-bold tabular-nums ${!isTimerPaused ? 'text-white' : 'text-stone-500'}`}>{formatTime(studyTime)}</p></div>
                          </div>
                          <div className="flex items-center gap-2">
                              <button onClick={() => setIsTimerPaused(!isTimerPaused)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isTimerPaused ? 'bg-gold text-stone-900' : 'bg-stone-800 text-white'}`}>{isTimerPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor"/>}</button>
                              <button onClick={() => { const { minutesAdded, xpGained } = recordStudySession(studyTime); setIsTimerActive(false); setStudyTime(0); if (minutesAdded > 0) { setToastType('xp'); setShowToast(`+${minutesAdded} min (+${xpGained} XP)`); setTimeout(() => setShowToast(null), 4000); } }} className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center"><Square size={16} fill="currentColor"/></button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      )}

      <div className="flex-1 bg-surface dark:bg-stone-900 rounded-tr-[20px] rounded-br-[20px] shadow-card relative overflow-hidden flex flex-col border-r-4 border-b-4 border-stone-200/50 dark:border-stone-800" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-stone-200/40 dark:from-black/60 to-transparent pointer-events-none z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.05] pointer-events-none bg-paper" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-paper/80 dark:bg-stone-900/80 backdrop-blur-sm"><Loader2 className="w-12 h-12 text-gold animate-spin" /><p className="mt-4 font-serif text-brown italic">Buscando sabedoria...</p></div>
        )}
        
        <div ref={contentRef} key={animKey} className={`flex-1 overflow-y-auto px-6 md:px-12 py-8 pb-32 scroll-smooth ${!loading && !error && direction === 'next' ? 'animate-turn-next' : ''} ${!loading && !error && direction === 'prev' ? 'animate-turn-prev' : ''} ${!loading && !error && !direction ? 'animate-fade-in' : ''}`}>
          {content && !error && (
            <div className="max-w-2xl mx-auto relative z-0">
              <div className="text-center mb-10 pb-6 border-b-2 border-stone-100 dark:border-stone-800 border-double">
                <span className="text-[10px] font-bold text-subtle uppercase tracking-[0.3em] mb-2 block">{currentBook.testament === 'Old' ? 'Antigo Testamento' : 'Novo Testamento'}</span>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-ink dark:text-white">{currentBook.name}</h1>
                <div className="text-6xl font-serif font-bold text-stone-100 dark:text-stone-800 absolute top-10 left-1/2 -translate-x-1/2 -z-10">{selectedChapter}</div>
                <span className="text-gold font-serif text-xl italic mt-2 block">Capítulo {selectedChapter}</span>
              </div>

              <div className={`${fontSizes[fontSizeLevel]} ${lineHeight[fontSizeLevel]} text-ink dark:text-stone-300 font-serif text-justify space-y-2`}>
                {content.verses ? content.verses.map((v) => {
                    const highlighted = isHighlighted(v.verse);
                    const isTarget = v.verse === targetVerse;
                    return (
                      <span key={v.verse} id={`verse-${v.verse}`} onClick={() => toggleHighlight(v.verse, v.text)} className={`inline relative cursor-pointer transition-all ${highlighted ? 'bg-gold/30 rounded py-1' : 'hover:bg-stone-100 dark:hover:bg-stone-800 rounded'} ${isTarget ? 'bg-orange/20 rounded py-1' : ''}`}><span className="text-[0.6em] font-bold text-orange align-top mr-1">{v.verse}</span><span className="mr-1">{v.text}</span></span>
                    );
                  }) : content.text.split('\n').map((para, i) => para.trim() && <p key={i} className="mb-4">{para}</p>)}
              </div>

              <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col items-center gap-6">
                <button onClick={markAsRead} disabled={isRead} className={`flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold transition-all ${isRead ? 'bg-transparent text-green-600 cursor-default' : 'bg-ink dark:bg-white text-white dark:text-ink shadow-xl hover:scale-105 active:scale-95'}`}>
                  {isRead ? <><CheckCircle size={20} /><span>Lido (+{XP_PER_CHAPTER} XP)</span></> : "Marcar como Lido"}
                </button>
                
                {/* Botão de suporte contextual do WhatsApp ao fim do capítulo */}
                <div className="w-full max-w-sm bg-green-50 dark:bg-green-900/10 p-6 rounded-3xl border border-dashed border-green-200 dark:border-green-800 text-center animate-fade-in">
                    <p className="text-sm text-green-800 dark:text-green-300 font-serif mb-4 italic">"Ficou com alguma dúvida sobre este capítulo ou precisa de uma palavra de conforto?"</p>
                    <button onClick={handleTalkToGuide} className="w-full py-3 bg-green-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 shadow-md transition-all">
                        <MessageCircle size={18} /> Conversar com Guia Espiritual
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex justify-end">
           <div className="w-full md:w-[400px] bg-paper dark:bg-stone-900 h-full shadow-2xl flex flex-col animate-slide-up relative">
              <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-surface dark:bg-stone-900 flex justify-between items-center z-10 shadow-sm">
                 <div><h3 className="font-serif font-bold text-xl text-ink dark:text-white">Índice</h3><p className="text-xs text-subtle">Selecione um livro</p></div>
                 <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-stone-100 rounded-full"><X size={20}/></button>
              </div>
              <div className="overflow-y-auto flex-1 p-4 space-y-2">
                 {BIBLE_BOOKS.map((book, idx) => (
                   <button key={book.name} onClick={() => { setSelectedBookIndex(idx); setSelectedChapter(1); setIsMenuOpen(false); setDirection(null); }} className={`w-full text-left px-5 py-4 rounded-2xl flex justify-between items-center transition-all ${selectedBookIndex === idx ? 'bg-ink dark:bg-white text-white dark:text-ink' : 'bg-surface dark:bg-stone-800'}`}><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${selectedBookIndex === idx ? 'bg-gold text-ink' : 'bg-stone-100'}`}>{book.abbrev.toUpperCase()}</div><span className="font-bold font-serif">{book.name}</span></div><span className="text-xs font-medium">{book.chapters} caps</span></button>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Bible;
