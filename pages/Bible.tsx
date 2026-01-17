
import React, { useState, useEffect, useRef } from 'react';
import { BIBLE_BOOKS, XP_PER_CHAPTER } from '../constants';
import { fetchChapter } from '../services/api';
import { addXp, checkAndUnlockBibleBadge, recordStudySession } from '../services/gamification';
import { UserProgress, BibleApiResponse, Note } from '../types';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Onboarding, { Step } from '../components/Onboarding';
import { Award, Crown } from 'lucide-react';

// Components
import BookSelector from '../components/bible/BookSelector';
import BibleControls from '../components/bible/BibleControls';
import BibleReader from '../components/bible/BibleReader';
import StudyTimer from '../components/bible/StudyTimer';

const Bible: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  // Navigation State
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [targetVerse, setTargetVerse] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [animKey, setAnimKey] = useState(0); // Force re-render for animation
  
  // Data State
  const [content, setContent] = useState<BibleApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isRead, setIsRead] = useState(false);
  
  // UI State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'info' | 'badge' | 'xp'>('info');
  const [fontSizeLevel, setFontSizeLevel] = useState(2);
  
  // Timer State
  const [studyTime, setStudyTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  
  // Refs
  const contentRef = useRef<HTMLDivElement>(null);
  const currentBook = BIBLE_BOOKS[selectedBookIndex];

  // --- INITIALIZATION ---
  useEffect(() => {
    // Load Settings
    const savedFont = localStorage.getItem('lumina_font_size');
    if (savedFont) setFontSizeLevel(parseInt(savedFont));
    
    const savedNotes = localStorage.getItem('lumina_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // --- TIMER LOGIC ---
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

  // --- NAVIGATION LOGIC ---
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

  // --- DATA LOADING ---
  useEffect(() => {
    loadChapter();
    checkIfRead();
    updateLastReadLocation();
  }, [selectedBookIndex, selectedChapter, language]);

  // Scroll to Verse
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

  const loadChapter = async () => {
    setLoading(true);
    setError(false);
    try {
      const apiBookName = currentBook.englishName || currentBook.name;
      const data = await fetchChapter(apiBookName, selectedChapter, language);
      setContent(data);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    } catch (e) { setError(true); setContent(null); } finally {
      setLoading(false);
      setIsMenuOpen(false);
    }
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

  const checkIfRead = () => {
    const saved = localStorage.getItem('lumina_progress');
    if (saved) {
      const p: UserProgress = JSON.parse(saved);
      const enId = `${currentBook.englishName}-${selectedChapter}`;
      const ptId = `${currentBook.name}-${selectedChapter}`;
      setIsRead(p.readChapters.includes(enId) || p.readChapters.includes(ptId));
    } else { setIsRead(false); }
  };

  const saveFontSize = (level: number) => {
    setFontSizeLevel(level);
    localStorage.setItem('lumina_font_size', level.toString());
  };

  // --- INTERACTIONS ---
  const handleMarkAsRead = () => {
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

  const handleTalkToGuide = () => {
    const text = encodeURIComponent(`Olá, Shalom! Acabei de ler ${currentBook.name} ${selectedChapter} e gostaria de tirar uma dúvida.`);
    window.open(`https://wa.me/551151989852?text=${text}`, '_blank');
  };

  const handleTimerStop = () => {
    const { minutesAdded, xpGained } = recordStudySession(studyTime); 
    setIsTimerActive(false); 
    setStudyTime(0); 
    if (minutesAdded > 0) { 
        setToastType('xp'); 
        setShowToast(`+${minutesAdded} min (+${xpGained} XP)`); 
        setTimeout(() => setShowToast(null), 4000); 
    }
  };

  // --- SWIPE HANDLERS ---
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 75;

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX); };
  const onTouchEnd = () => { if (!touchStart || !touchEnd) return; const distance = touchStart - touchEnd; if (distance > minSwipeDistance) handleNext(); else if (distance < -minSwipeDistance) handlePrev(); };

  // Onboarding Data
  const bibleOnboardingSteps: Step[] = [
    { targetId: 'bible-book-selector', title: 'Navegação', description: 'Toque aqui para escolher o Livro e o Capítulo.' },
    { targetId: 'bible-timer-btn', title: 'Cronômetro', description: 'Ative o cronômetro para ganhar XP extra.' },
    { targetId: 'bible-text-area', title: 'Interação', description: 'Toque em qualquer versículo para marcar ou grifar.' },
    { targetId: 'bible-mark-read', title: 'Concluir', description: 'Marque como lido para contabilizar no seu progresso.' }
  ];

  return (
    <div className="h-full flex flex-col relative book-perspective" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <Onboarding steps={bibleOnboardingSteps} storageKey="lumina_onboarding_bible_completed" />

      {/* Toast Notification */}
      {showToast && (
        <div className={`
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] text-white px-8 py-5 md:px-12 md:py-6 rounded-full shadow-2xl animate-slide-up flex items-center gap-4 md:gap-5 border-4 border-white/20 min-w-[300px] justify-center
            ${toastType === 'badge' ? 'bg-gradient-to-r from-gold to-orange' : toastType === 'xp' ? 'bg-green-600' : 'bg-ink'}
        `}>
          {toastType === 'badge' ? <Award size={32} fill="currentColor" className="shrink-0" /> : <Crown size={28} fill="currentColor" className="shrink-0"/>}
          <span className="text-2xl md:text-3xl font-black whitespace-nowrap tracking-tighter">{showToast}</span>
        </div>
      )}

      {/* Header / Controls */}
      <BibleControls 
        currentBook={currentBook}
        currentChapter={selectedChapter}
        onOpenBookSelector={() => setIsMenuOpen(true)}
        isTimerActive={isTimerActive}
        onToggleTimer={() => { setIsTimerActive(true); setIsTimerPaused(false); }}
        fontSizeLevel={fontSizeLevel}
        onFontSizeChange={saveFontSize}
        onNext={handleNext}
        onPrev={handlePrev}
        isFirstChapter={selectedBookIndex === 0 && selectedChapter === 1}
        isLastChapter={selectedBookIndex === BIBLE_BOOKS.length -1 && selectedChapter === currentBook.chapters}
      />

      {/* Floating Timer */}
      <StudyTimer 
        isActive={isTimerActive}
        isPaused={isTimerPaused}
        timeSeconds={studyTime}
        onTogglePause={() => setIsTimerPaused(!isTimerPaused)}
        onStop={handleTimerStop}
      />

      {/* Reader Content */}
      <BibleReader 
        key={animKey}
        loading={loading}
        error={error}
        content={content}
        currentBook={currentBook}
        currentChapter={selectedChapter}
        fontSizeLevel={fontSizeLevel}
        targetVerse={targetVerse}
        isHighlighted={isHighlighted}
        onToggleHighlight={toggleHighlight}
        isRead={isRead}
        onMarkAsRead={handleMarkAsRead}
        onTalkToGuide={handleTalkToGuide}
        direction={direction}
        contentRef={contentRef}
      />

      {/* Book Selector Modal */}
      <BookSelector 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        selectedBookIndex={selectedBookIndex}
        onSelectBook={setSelectedBookIndex}
        onSelectChapter={(c) => { setSelectedChapter(c); setIsMenuOpen(false); setDirection(null); }}
      />
    </div>
  );
};

export default Bible;
