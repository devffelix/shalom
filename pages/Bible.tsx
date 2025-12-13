
import React, { useState, useEffect, useRef } from 'react';
import { BIBLE_BOOKS, XP_PER_CHAPTER } from '../constants';
import { fetchChapter } from '../services/api';
import { addXp, checkAndUnlockBibleBadge, recordStudySession } from '../services/gamification';
import { ChevronLeft, ChevronRight, CheckCircle, X, BookOpen, Loader2, Type, Minus, Plus, Highlighter, Bookmark, RefreshCw, Crown, Award, Play, Pause, Square, Timer, GripHorizontal, Minimize2, Maximize2 } from 'lucide-react';
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
  
  // Notes / Highlights System
  const [notes, setNotes] = useState<Note[]>([]);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'info' | 'badge' | 'xp'>('info');

  // Font Size State
  const [fontSizeLevel, setFontSizeLevel] = useState(2); // 0 to 4
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);

  // Animation state
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [animKey, setAnimKey] = useState(0);

  // Touch/Swipe State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 75;

  // STUDY TIMER STATE
  const [studyTime, setStudyTime] = useState(0); // seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  
  // DRAG & MINIMIZE STATE
  const [timerPosition, setTimerPosition] = useState({ x: 20, y: window.innerHeight - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const currentBook = BIBLE_BOOKS[selectedBookIndex];
  // We use englishName for ID consistency if we change languages later, or name.
  const chapterId = `${currentBook.englishName}-${selectedChapter}`;

  const fontSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
  const lineHeight = ['leading-relaxed', 'leading-relaxed', 'leading-loose', 'leading-loose', 'leading-loose'];

  useEffect(() => {
    // Load font preference
    const savedFont = localStorage.getItem('lumina_font_size');
    if (savedFont) setFontSizeLevel(parseInt(savedFont));
    
    // Load notes
    const savedNotes = localStorage.getItem('lumina_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));

    // Set initial timer position safely
    setTimerPosition({ x: 20, y: window.innerHeight - 220 });
  }, []);

  // Timer Effect
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

  // Dragging Logic Effect
  useEffect(() => {
    const handleWindowMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      // Prevent default to stop scrolling while dragging on touch devices
      if ('touches' in e) {
        // e.preventDefault(); // Commented out as it might interfere with passive listeners, use with caution
      }

      setTimerPosition({
        x: clientX - dragOffset.x,
        y: clientY - dragOffset.y
      });
    };

    const handleWindowUp = () => {
      setIsDragging(false);
    };

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


  // Listen for navigation state (e.g. from "Read Chapter" on Home) OR LocalStorage restore
  useEffect(() => {
    // 1. Check if user navigated via "Read Chapter" button or Verse of the Day
    if (location.state && location.state.book && location.state.chapter) {
      const bookNameInput = location.state.book.trim().toLowerCase();
      const chapterInput = location.state.chapter;
      const verseInput = location.state.verse;
      
      // Improved matching logic: check Portuguese name, English name, or abbreviation
      const index = BIBLE_BOOKS.findIndex(b => 
        b.name.toLowerCase() === bookNameInput || 
        b.englishName.toLowerCase() === bookNameInput ||
        b.abbrev.toLowerCase() === bookNameInput
      );

      if (index !== -1) {
        setSelectedBookIndex(index);
        
        // Validate Chapter to prevent 404s (e.g. Jude 24 case)
        const maxChapters = BIBLE_BOOKS[index].chapters;
        const safeChapter = (chapterInput > 0 && chapterInput <= maxChapters) ? chapterInput : 1;
        
        setSelectedChapter(safeChapter);
        
        if (verseInput) setTargetVerse(verseInput);
      }
    } 
    // 2. If no specific state, check LocalStorage to resume reading
    else {
      const saved = localStorage.getItem('lumina_progress');
      if (saved) {
        try {
          const p: UserProgress = JSON.parse(saved);
          if (p.lastRead) {
            // Format is "BookName-Chapter" (e.g. "Genesis-1") or "Gênesis-1" depending on version
            // We need to support legacy english keys if they exist
            const parts = p.lastRead.split('-');
            if (parts.length >= 2) {
              const bookName = parts[0];
              const chapterNum = parseInt(parts[parts.length - 1]);
              
              const index = BIBLE_BOOKS.findIndex(b => 
                b.name === bookName || b.englishName === bookName
              );
              if (index !== -1) {
                setSelectedBookIndex(index);
                setSelectedChapter(chapterNum);
              }
            }
          }
        } catch (e) {
          console.error("Error parsing saved progress", e);
        }
      }
    }
  }, [location.state]);

  // Main Effect: Load Content + Save Progress
  useEffect(() => {
    loadChapter();
    checkIfRead();
    updateLastReadLocation();
  }, [selectedBookIndex, selectedChapter]);

  // Handle auto-scrolling to verse when content loads
  useEffect(() => {
    if (content && targetVerse && !loading) {
      // Small delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        const verseElement = document.getElementById(`verse-${targetVerse}`);
        if (verseElement) {
            verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Reset target verse so it doesn't scroll again on future interactions
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
        // Use englishName for stability
        const currentId = `${currentBook.englishName}-${selectedChapter}`;
        
        // Update lastRead location so user can resume here later
        const newProgress = {
          ...p,
          lastRead: currentId
        };
        localStorage.setItem('lumina_progress', JSON.stringify(newProgress));
      }
    } catch (e) {
      console.error("Error saving reading location", e);
    }
  };

  const loadChapter = async () => {
    setLoading(true);
    setError(false);
    try {
      // Use englishName for API calls to ensure compatibility
      // Fallback to name if englishName is missing (though typed as required)
      const apiBookName = currentBook.englishName || currentBook.name;
      const data = await fetchChapter(apiBookName, selectedChapter);
      setContent(data);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    } catch (e) {
      console.error(e);
      setError(true);
      setContent(null); // Clear content on error
    } finally {
      setLoading(false);
      setIsMenuOpen(false);
    }
  };

  const checkIfRead = () => {
    const saved = localStorage.getItem('lumina_progress');
    if (saved) {
      const p: UserProgress = JSON.parse(saved);
      // Check both English (new format) and Portuguese (potential old format) IDs
      const enId = `${currentBook.englishName}-${selectedChapter}`;
      const ptId = `${currentBook.name}-${selectedChapter}`;
      setIsRead(p.readChapters.includes(enId) || p.readChapters.includes(ptId));
    } else {
      setIsRead(false);
    }
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
          dailyReadCount: (p.dailyReadCount || 0) + 1 // INCREMENT DAILY COUNT
        };
        localStorage.setItem('lumina_progress', JSON.stringify(newProgress));
        setIsRead(true);
        
        // GAMIFICATION: Add XP
        const { leveledUp, newLevelData } = addXp(XP_PER_CHAPTER);
        setToastType('info');
        
        if (leveledUp) {
            setShowToast(`🎉 Parabéns! Você subiu para o nível ${newLevelData.currentTitle}!`);
        } else {
            setShowToast(`+${XP_PER_CHAPTER} XP! Continue assim.`);
        }
        setTimeout(() => setShowToast(null), 3000);

        // CHECK BADGE UNLOCK (Book Completed?)
        const newBadge = checkAndUnlockBibleBadge(currentBook);
        if (newBadge) {
             setTimeout(() => {
                setToastType('badge');
                setShowToast(`🏆 Novo Emblema: ${newBadge.title}!`);
                setTimeout(() => setShowToast(null), 4000);
             }, 3500); // Show after XP toast
        }
      }
    }
  };

  const handleNext = () => {
    if (selectedBookIndex === BIBLE_BOOKS.length - 1 && selectedChapter === currentBook.chapters) return;

    setDirection('next');
    setAnimKey(p => p + 1);
    setError(false);
    setTargetVerse(null); // Clear target verse on manual nav
    
    if (selectedChapter < currentBook.chapters) {
      setSelectedChapter(c => c + 1);
    } else if (selectedBookIndex < BIBLE_BOOKS.length - 1) {
      setSelectedBookIndex(i => i + 1);
      setSelectedChapter(1);
    }
  };

  const handlePrev = () => {
    if (selectedBookIndex === 0 && selectedChapter === 1) return;

    setDirection('prev');
    setAnimKey(p => p + 1);
    setError(false);
    setTargetVerse(null); // Clear target verse on manual nav

    if (selectedChapter > 1) {
      setSelectedChapter(c => c - 1);
    } else if (selectedBookIndex > 0) {
      setSelectedBookIndex(i => i - 1);
      setSelectedChapter(BIBLE_BOOKS[selectedBookIndex - 1].chapters);
    }
  };

  // Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    // Only swipe on content, not when dragging timer
    if (isDragging) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (isDragging) return;
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Highlight Logic
  const toggleHighlight = (verseNum: number, text: string) => {
    // ID uses englishName for consistency
    const noteId = `${currentBook.englishName}-${selectedChapter}-${verseNum}`;
    const existingIndex = notes.findIndex(n => n.id === noteId);
    let newNotes = [...notes];
    let toastMsg = "";

    if (existingIndex >= 0) {
      newNotes.splice(existingIndex, 1);
      toastMsg = "Marcação removida";
    } else {
      newNotes.push({
        id: noteId,
        reference: `${currentBook.name} ${selectedChapter}:${verseNum}`,
        text: text,
        date: new Date().toISOString(),
        book: currentBook.name,
        chapter: selectedChapter,
        verse: verseNum
      });
      toastMsg = "Salvo em Minhas Anotações";
    }

    setNotes(newNotes);
    localStorage.setItem('lumina_notes', JSON.stringify(newNotes));
    
    setToastType('info');
    setShowToast(toastMsg);
    setTimeout(() => setShowToast(null), 2000);
  };

  const isHighlighted = (verseNum: number) => {
    return notes.some(n => n.id === `${currentBook.englishName}-${selectedChapter}-${verseNum}`);
  };

  // STUDY PLAYER LOGIC
  const startTimer = () => {
    setIsTimerActive(true);
    setIsTimerPaused(false);
    setIsMinimized(false);
    // Reset position to center-ish if needed or keep last
  };

  const toggleTimerPause = () => {
    setIsTimerPaused(!isTimerPaused);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    
    // Save Logic
    const { minutesAdded, xpGained } = recordStudySession(studyTime);
    
    if (minutesAdded > 0) {
        setToastType('xp');
        setShowToast(`Estudo Registrado: +${minutesAdded} min (+${xpGained} XP)`);
        setTimeout(() => setShowToast(null), 4000);
    }
    
    setStudyTime(0);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevent propagation to avoid conflicting with swipe
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setDragOffset({
      x: clientX - timerPosition.x,
      y: clientY - timerPosition.y
    });
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col relative book-perspective">
      
      {/* Toast Notification */}
      {showToast && (
        <div className={`
            absolute top-24 left-1/2 -translate-x-1/2 z-[60] text-white px-6 py-3 rounded-full shadow-2xl animate-fade-in flex items-center gap-2
            ${toastType === 'badge' ? 'bg-gradient-to-r from-gold to-orange' : toastType === 'xp' ? 'bg-green-600' : 'bg-ink'}
        `}>
          {toastType === 'badge' ? <Award size={18} fill="currentColor" /> : 
           toastType === 'xp' ? <Crown size={16} fill="currentColor"/> :
           showToast.includes('XP') || showToast.includes('nível') ? <Crown size={16} className="text-gold"/> : 
           <Bookmark size={16} className="text-gold" fill="currentColor" />}
          <span className="text-sm font-bold whitespace-nowrap">{showToast}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-4 bg-surface dark:bg-stone-900 p-2 pr-2 rounded-full shadow-soft border border-stone-100 dark:border-stone-800 relative z-30">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex-1 flex items-center gap-3 bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-full px-4 py-2 transition-colors group mr-2 overflow-hidden"
        >
          <div className="w-8 h-8 rounded-full bg-ink dark:bg-black text-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
             <BookOpen size={16} />
          </div>
          <div className="text-left min-w-0">
            <p className="text-[10px] font-bold text-subtle uppercase tracking-wider">Livro</p>
            <h2 className="text-sm md:text-base font-serif font-bold text-ink dark:text-white truncate">
              {currentBook.name} <span className="text-orange">{selectedChapter}</span>
            </h2>
          </div>
        </button>

        <div className="flex items-center gap-1 md:gap-2">
          
          {/* Start Timer Button (Visible only if not active) */}
          {!isTimerActive && (
              <button 
                onClick={startTimer}
                className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-300 flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 transition-colors"
                title="Iniciar Tempo de Estudo"
              >
                  <Timer size={18} />
              </button>
          )}

          {/* Font Settings Toggle */}
          <div className="relative">
            <button 
              onClick={() => setIsFontMenuOpen(!isFontMenuOpen)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFontMenuOpen ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-surface dark:bg-stone-800 text-brown dark:text-stone-300 border border-stone-200 dark:border-stone-700'}`}
            >
              <Type size={18} />
            </button>
            
            {/* Font Settings Popover */}
            {isFontMenuOpen && (
              <div className="absolute top-12 right-0 bg-ink dark:bg-stone-800 p-2 rounded-2xl shadow-xl flex items-center gap-2 animate-slide-up z-40 border border-stone-700 min-w-[140px] justify-between">
                 <button 
                   onClick={() => saveFontSize(Math.max(0, fontSizeLevel - 1))}
                   disabled={fontSizeLevel === 0}
                   className="w-8 h-8 rounded-full bg-stone-700 dark:bg-stone-600 text-white flex items-center justify-center disabled:opacity-30 active:scale-90"
                 >
                   <Minus size={16} />
                 </button>
                 <span className="text-white font-bold text-sm w-8 text-center">{fontSizeLevel + 1}</span>
                 <button 
                   onClick={() => saveFontSize(Math.min(4, fontSizeLevel + 1))}
                   disabled={fontSizeLevel === 4}
                   className="w-8 h-8 rounded-full bg-gold text-ink flex items-center justify-center disabled:opacity-30 active:scale-90"
                 >
                   <Plus size={16} />
                 </button>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-stone-200 dark:bg-stone-700 mx-1"></div>

          <button 
            onClick={handlePrev} 
            disabled={selectedBookIndex === 0 && selectedChapter === 1}
            className="w-10 h-10 rounded-full bg-surface dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-brown dark:text-stone-300 active:bg-gold active:text-white active:scale-90 transition-all disabled:opacity-30 disabled:active:scale-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext} 
            disabled={selectedBookIndex === BIBLE_BOOKS.length -1 && selectedChapter === currentBook.chapters}
            className="w-10 h-10 rounded-full bg-ink dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900 active:bg-gold active:text-ink active:scale-90 transition-all shadow-lg disabled:opacity-30 disabled:active:scale-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* FLOATING STUDY PLAYER (DRAGGABLE & MINIMIZABLE) */}
      {isTimerActive && (
          <div 
            style={{ 
              left: `${timerPosition.x}px`, 
              top: `${timerPosition.y}px`,
              cursor: isDragging ? 'grabbing' : 'auto',
              touchAction: 'none' // Crucial for drag performance on touch
            }}
            className={`fixed z-50 transition-all duration-75 ${isDragging ? 'scale-105' : ''}`}
          >
              {isMinimized ? (
                  // MINIMIZED VIEW
                  <div 
                    className="relative"
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                  >
                      <button 
                        onClick={() => setIsMinimized(false)}
                        className="w-16 h-16 rounded-full bg-stone-900 border-2 border-gold text-white shadow-2xl flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-transform relative z-10"
                      >
                         <Timer size={18} className={!isTimerPaused ? "animate-pulse text-gold" : "text-stone-400"} />
                         <span className="text-[10px] font-mono font-bold">{formatTime(studyTime)}</span>
                      </button>
                      {/* Drag Handle Indicator */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-black/50 rounded-full p-1 cursor-grab">
                         <GripHorizontal size={12} className="text-white/50" />
                      </div>
                  </div>
              ) : (
                  // EXPANDED VIEW
                  <div className="bg-stone-900 text-white rounded-3xl p-4 shadow-2xl border border-stone-700/50 relative overflow-hidden ring-1 ring-white/10 w-[320px]">
                      
                      {/* Drag Handle & Minimize Header */}
                      <div 
                        className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 cursor-grab active:cursor-grabbing"
                        onMouseDown={handleDragStart}
                        onTouchStart={handleDragStart}
                      >
                         <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
                            <GripHorizontal size={14} /> 
                            <span>Arrastar</span>
                         </div>
                         <button 
                           onClick={() => setIsMinimized(true)} 
                           className="p-1 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-white"
                           onMouseDown={(e) => e.stopPropagation()} // Prevent drag when clicking minimize
                           onTouchStart={(e) => e.stopPropagation()}
                         >
                            <Minimize2 size={16} />
                         </button>
                      </div>

                      {/* Subtle Background Glow */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50 pointer-events-none"></div>

                      <div className="flex items-center justify-between gap-4">
                          {/* Icon & Timer Info */}
                          <div className="flex items-center gap-4 relative z-10">
                              <div className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner border border-white/5 transition-all duration-500
                                ${!isTimerPaused ? 'bg-gradient-to-br from-green-500 to-emerald-700 text-white' : 'bg-stone-800 text-stone-500'}
                              `}>
                                  <Timer size={24} className={!isTimerPaused ? "animate-pulse" : ""} />
                              </div>
                              <div>
                                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-0.5">Tempo</p>
                                  <p className={`font-mono text-2xl font-bold tabular-nums tracking-tight ${!isTimerPaused ? 'text-white' : 'text-stone-500'}`}>
                                    {formatTime(studyTime)}
                                  </p>
                              </div>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center gap-2 relative z-10">
                              <button 
                                onClick={toggleTimerPause}
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg border border-white/5
                                    ${isTimerPaused 
                                        ? 'bg-gold text-stone-900 hover:bg-orange' 
                                        : 'bg-stone-800 text-white hover:bg-stone-700'}
                                `}
                              >
                                  {isTimerPaused ? <Play size={18} fill="currentColor" className="ml-0.5"/> : <Pause size={18} fill="currentColor"/>}
                              </button>
                              
                              <button 
                                onClick={stopTimer}
                                className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 flex items-center justify-center transition-all active:scale-95"
                              >
                                  <Square size={16} fill="currentColor"/>
                              </button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      )}

      {/* Book Content Area */}
      <div 
        className="flex-1 bg-surface dark:bg-stone-900 rounded-tl-[2px] rounded-bl-[2px] rounded-tr-[20px] rounded-br-[20px] shadow-card relative overflow-hidden flex flex-col border-r-4 border-b-4 border-stone-200/50 dark:border-stone-800"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        
        {/* Book Binding Shadow (Left Side) */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-stone-200/40 dark:from-black/60 to-transparent pointer-events-none z-10 mix-blend-multiply dark:mix-blend-normal"></div>
        
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.05] pointer-events-none bg-paper" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}></div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-paper/80 dark:bg-stone-900/80 backdrop-blur-sm">
             <Loader2 className="w-12 h-12 text-gold animate-spin" />
             <p className="mt-4 font-serif text-brown dark:text-stone-400 italic">Buscando sabedoria...</p>
          </div>
        )}
        
        {/* Error Overlay */}
        {error && !loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-paper/95 dark:bg-stone-900/95 p-6 text-center">
             <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500 mb-4">
               <X size={32} />
             </div>
             <h3 className="font-serif font-bold text-xl text-ink dark:text-white mb-2">Erro ao carregar</h3>
             <p className="text-stone-500 mb-6 max-w-xs">Não foi possível acessar o capítulo. Verifique sua conexão e tente novamente.</p>
             <button 
               onClick={loadChapter}
               className="flex items-center gap-2 bg-ink dark:bg-white text-white dark:text-ink px-6 py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors"
             >
               <RefreshCw size={18} /> Tentar Novamente
             </button>
          </div>
        )}

        <div 
          ref={contentRef}
          key={animKey}
          className={`
            flex-1 overflow-y-auto px-6 md:px-12 py-8 pb-32 scroll-smooth
            ${!loading && !error && direction === 'next' ? 'animate-turn-next' : ''}
            ${!loading && !error && direction === 'prev' ? 'animate-turn-prev' : ''}
            ${!loading && !error && !direction ? 'animate-fade-in' : ''}
          `}
        >
          {content && !error && (
            <div className="max-w-2xl mx-auto relative z-0">
              {/* Chapter Header */}
              <div className="text-center mb-10 pb-6 border-b-2 border-stone-100 dark:border-stone-800 border-double">
                <span className="text-[10px] font-bold text-subtle uppercase tracking-[0.3em] mb-2 block">
                  {currentBook.testament === 'Old' ? 'Antigo Testamento' : 'Novo Testamento'}
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-ink dark:text-white">
                  {currentBook.name}
                </h1>
                <div className="text-6xl font-serif font-bold text-stone-100 dark:text-stone-800 absolute top-10 left-1/2 -translate-x-1/2 -z-10 select-none">
                  {selectedChapter}
                </div>
                <span className="text-gold font-serif text-xl italic mt-2 block">Capítulo {selectedChapter}</span>
                <p className="text-xs text-stone-400 mt-2 flex items-center justify-center gap-1">
                  <Highlighter size={12} /> Toque em um versículo para grifar
                </p>
              </div>

              {/* Verses Content */}
              <div className={`
                ${fontSizes[fontSizeLevel]} ${lineHeight[fontSizeLevel]}
                text-ink dark:text-stone-300 font-serif text-justify space-y-2 transition-all duration-300
              `}>
                {content.verses ? (
                  // If API provides structured verses
                  content.verses.map((v) => {
                    const highlighted = isHighlighted(v.verse);
                    const isTarget = v.verse === targetVerse;
                    return (
                      <span 
                        key={v.verse}
                        id={`verse-${v.verse}`}
                        onClick={() => toggleHighlight(v.verse, v.text)}
                        className={`
                          inline relative cursor-pointer decoration-clone transition-all duration-500
                          ${highlighted ? 'bg-gold/30 box-decoration-clone py-1 rounded' : 'hover:bg-stone-100 dark:hover:bg-stone-800 rounded'}
                          ${isTarget ? 'bg-orange/20 dark:bg-orange/30 box-decoration-clone py-1 rounded shadow-sm' : ''}
                        `}
                      >
                        <span className="text-[0.6em] font-bold text-orange align-top mr-1 select-none opacity-80">{v.verse}</span>
                        <span className="mr-1">{v.text}</span>
                      </span>
                    );
                  })
                ) : (
                  // Fallback if API returns only text block
                  content.text.split('\n').map((para, i) => para.trim() && (
                    <p key={i} className="mb-4">{para}</p>
                  ))
                )}
              </div>

              {/* Footer / Read Button */}
              <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-800 flex flex-col items-center gap-4">
                <div className="text-center">
                  <p className="font-sans text-xs text-subtle uppercase tracking-widest mb-1">Fim do Capítulo</p>
                  <div className="w-2 h-2 rounded-full bg-gold mx-auto"></div>
                </div>

                <button
                  onClick={markAsRead}
                  disabled={isRead}
                  className={`
                    group flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold transition-all duration-500
                    ${isRead 
                      ? 'bg-transparent text-green-600 cursor-default' 
                      : 'bg-ink dark:bg-white text-white dark:text-ink shadow-xl hover:bg-orange hover:scale-105 active:scale-95'}
                  `}
                >
                  {isRead ? (
                    <>
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full"><CheckCircle size={20} /></div>
                      <span>Lido (+{XP_PER_CHAPTER} XP)</span>
                    </>
                  ) : (
                    "Marcar como Lido"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Book Selection Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex justify-end animate-fade-in">
           <div className="w-full md:w-[400px] bg-paper dark:bg-stone-900 h-full shadow-2xl overflow-hidden flex flex-col animate-slide-up relative">
              
              {/* Menu Header */}
              <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-surface dark:bg-stone-900 flex justify-between items-center z-10 shadow-sm">
                 <div>
                    <h3 className="font-serif font-bold text-xl text-ink dark:text-white">Índice</h3>
                    <p className="text-xs text-subtle">Selecione um livro para ler</p>
                 </div>
                 <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-full transition-colors text-ink dark:text-white">
                    <X size={20}/>
                 </button>
              </div>

              {/* Menu List */}
              <div className="overflow-y-auto flex-1 p-4 space-y-2 pb-safe">
                 {BIBLE_BOOKS.map((book, idx) => (
                   <button 
                    key={book.name}
                    onClick={() => {
                      setSelectedBookIndex(idx);
                      setSelectedChapter(1);
                      setIsMenuOpen(false);
                      setDirection(null);
                    }}
                    className={`
                      w-full text-left px-5 py-4 rounded-2xl flex justify-between items-center transition-all duration-200 border
                      ${selectedBookIndex === idx 
                        ? 'bg-ink dark:bg-white text-white dark:text-ink border-ink dark:border-white shadow-md transform scale-[1.02]' 
                        : 'bg-surface dark:bg-stone-800 text-brown-dark dark:text-stone-300 border-transparent hover:bg-white dark:hover:bg-stone-700 hover:border-stone-200 dark:hover:border-stone-600 hover:shadow-sm'}
                    `}
                   >
                     <div className="flex items-center gap-3">
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                            ${selectedBookIndex === idx ? 'bg-gold text-ink' : 'bg-stone-100 dark:bg-stone-700 text-subtle'}
                        `}>
                            {book.abbrev.toUpperCase()}
                        </div>
                        <span className="font-bold font-serif">{book.name}</span>
                     </div>
                     <span className={`text-xs font-medium px-2 py-1 rounded-md ${selectedBookIndex === idx ? 'bg-white/10 text-stone-200 dark:text-stone-500' : 'bg-stone-50 dark:bg-stone-700 text-subtle'}`}>
                        {book.chapters} caps
                     </span>
                   </button>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Bible;
