import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Battery, Heart, CloudRain, Zap, Book, ArrowRight, X, Sparkles, Bookmark, Trash2, Share2, Music, Calendar, HelpCircle, Frown, Loader2, Download, RefreshCw, MessageCircle, Crown, ScrollText, CheckCircle2, Flame, Target, ChevronRight, HeartHandshake, Trophy, Brain } from 'lucide-react';
import { generatePrayer, fetchVerse } from '../services/api';
import { calculateLevel, getUserXp } from '../services/gamification';
import { Mood, UserProgress, Note, LevelData } from '../types';
import { TOTAL_CHAPTERS, POPULAR_VERSES } from '../constants';

const MOOD_IMAGES: Record<string, string> = {
  [Mood.Anxious]: "https://images.unsplash.com/photo-1457139621581-298d1801c832?q=80&w=1103&auto=format&fit=crop", 
  [Mood.Tired]: "https://images.unsplash.com/photo-1612620980838-5541dad8e254?q=80&w=1074&auto=format&fit=crop", 
  [Mood.Happy]: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?q=80&w=1170&auto=format&fit=crop", 
  [Mood.Sad]: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop", 
  [Mood.Thankful]: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000&auto=format&fit=crop", 
  [Mood.Confused]: "https://images.unsplash.com/photo-1444312645910-ffa973656eba?q=80&w=1000&auto=format&fit=crop", 
  [Mood.Angry]: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1000&auto=format&fit=crop"  
};

const LANDSCAPE_IMAGES = [
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501854140884-074cf2b2c3af?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534067783865-2913f5fdbe23?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop"
];

const MoodCard: React.FC<{ mood: Mood; icon: React.ReactNode; active: boolean; onClick: () => void }> = ({ mood, icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      relative flex-shrink-0 w-24 h-32 md:w-28 md:h-44 rounded-3xl overflow-hidden transition-all duration-300 group shadow-lg
      ${active ? 'ring-4 ring-gold scale-95 shadow-xl ring-offset-2 ring-offset-paper' : 'scale-100 hover:scale-[1.05] hover:shadow-orange/20'}
    `}
  >
    <img 
      src={MOOD_IMAGES[mood]} 
      alt={mood} 
      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${active ? 'scale-110' : 'group-hover:scale-110'}`}
    />
    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300 ${active ? 'opacity-90' : 'opacity-70'}`}></div>
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 ${active ? 'bg-gold text-ink scale-110' : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
       {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
    </div>
    <div className="absolute bottom-3 left-0 right-0 text-center">
      <span className={`block font-sans font-bold text-xs md:text-sm tracking-wide transition-colors ${active ? 'text-gold' : 'text-white'}`}>
        {mood}
      </span>
    </div>
  </button>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [verse, setVerse] = useState<{ text: string; ref: string } | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [heroImage, setHeroImage] = useState<string>(LANDSCAPE_IMAGES[0]);
  const [aiPrayer, setAiPrayer] = useState<string>('');
  const [isLoadingPrayer, setIsLoadingPrayer] = useState(false);
  const [isLoadingVerse, setIsLoadingVerse] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [levelData, setLevelData] = useState<LevelData | null>(null);
  const [userName, setUserName] = useState('Viajante');
  const [isAmenAnimating, setIsAmenAnimating] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const prayerCardRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateString = today.toLocaleDateString('pt-BR', dateOptions);
  
  const hour = today.getHours();
  let timeGreeting = 'Bom dia';
  if (hour >= 12 && hour < 18) timeGreeting = 'Boa tarde';
  if (hour >= 18) timeGreeting = 'Boa noite';

  useEffect(() => {
    const saved = localStorage.getItem('lumina_progress');
    if (saved) {
        const p = JSON.parse(saved);
        setProgress(p);
        setLevelData(calculateLevel(p.xp || 0));
    } else {
        setLevelData(calculateLevel(0));
    }
    const savedNotes = localStorage.getItem('lumina_notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    const savedName = localStorage.getItem('lumina_username');
    if (savedName) setUserName(savedName);
    handleRefreshVerse();
  }, []);

  const handleRefreshVerse = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsLoadingVerse(true);
    try {
      const randomIndex = Math.floor(Math.random() * POPULAR_VERSES.length);
      const randomRef = POPULAR_VERSES[randomIndex];
      const targetRef = (verse && verse.ref === randomRef) 
          ? POPULAR_VERSES[(randomIndex + 1) % POPULAR_VERSES.length] 
          : randomRef;
      const v = await fetchVerse(targetRef);
      setVerse({ text: v.text, ref: v.reference });
      const randomImgIndex = Math.floor(Math.random() * LANDSCAPE_IMAGES.length);
      setHeroImage(LANDSCAPE_IMAGES[randomImgIndex]);
    } catch (e) {
      setVerse({ text: "O Senhor é o meu pastor, nada me faltará.", ref: "Psalms 23:1" });
    } finally {
      setIsLoadingVerse(false);
    }
  };

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    setIsLoadingPrayer(true);
    const prayer = await generatePrayer(mood);
    setAiPrayer(prayer);
    setIsLoadingPrayer(false);
  };

  const handleAmen = () => {
    setIsAmenAnimating(true);
    setTimeout(() => {
      setIsAmenAnimating(false);
      setSelectedMood(null);
    }, 2000);
  };

  const handleTalkToGuide = () => {
    const moodText = selectedMood ? `estou me sentindo ${selectedMood.toLowerCase()} e ` : "";
    const text = encodeURIComponent(`Olá, Shalom! ${moodText}gostaria de conversar ou desabafar com o Guia Espiritual.`);
    window.open(`https://wa.me/551151989852?text=${text}`, '_blank');
  };

  const handleShareVerse = async () => {
    if (verse && navigator.share) {
      try {
        await navigator.share({
          title: 'Versículo do Dia - Shalom',
          text: `"${verse.text}" - ${verse.ref}`,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    }
  };

  const handleStudyVerse = (note: Note) => {
    const message = `Olá! Gostaria de tirar uma dúvida sobre este versículo: "${note.text}" - ${note.reference}`;
    const url = `https://wa.me/551151989852?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleDownloadImage = async () => {
    if (!prayerCardRef.current) return;
    // @ts-ignore
    const html2canvas = window.html2canvas;
    if (html2canvas) {
        try {
            const canvas = await html2canvas(prayerCardRef.current, {
                useCORS: true, 
                scale: 2, 
                backgroundColor: null, 
            });
            const image = canvas.toDataURL("image/png");
            if (navigator.share) {
                 const blob = await (await fetch(image)).blob();
                 const file = new File([blob], 'oracao-shalom.png', { type: blob.type });
                 if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: 'Minha Oração',
                        text: 'Uma oração especial do app Shalom.',
                    });
                    return;
                 }
            }
            const link = document.createElement('a');
            link.href = image;
            link.download = `oracao-${selectedMood?.toLowerCase()}.png`;
            link.click();
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Não foi possível salvar a imagem. Tente novamente.");
        }
    } else {
        alert("Recurso de imagem ainda carregando, tente em alguns segundos.");
    }
  };

  const handleReadChapter = () => {
    if (!verse) return;
    try {
      const parts = verse.ref.split(':');
      const refPart = parts[0]; 
      const verseNumPart = parts[1];
      const lastSpaceIndex = refPart.lastIndexOf(' ');
      if (lastSpaceIndex !== -1) {
        const bookName = refPart.substring(0, lastSpaceIndex); 
        const chapter = parseInt(refPart.substring(lastSpaceIndex + 1)); 
        const verseNum = verseNumPart ? parseInt(verseNumPart) : undefined;
        navigate('/bible', { 
            state: { book: bookName, chapter: chapter, verse: verseNum } 
        });
      } else {
        navigate('/bible');
      }
    } catch (e) {
      console.error("Error parsing reference", e);
      navigate('/bible');
    }
  };

  const deleteNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newNotes = notes.filter(n => n.id !== noteId);
    setNotes(newNotes);
    localStorage.setItem('lumina_notes', JSON.stringify(newNotes));
  };

  const percentage = progress ? Math.round((progress.readChapters.length / TOTAL_CHAPTERS) * 100) : 0;
  const dailyGoal = 3;
  const dailyCount = progress?.dailyReadCount || 0;
  const dailyProgressPercent = Math.min((dailyCount / dailyGoal) * 100, 100);

  return (
    <div className="space-y-6 animate-fade-in pb-4 relative">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="flex flex-col gap-1 px-2 pt-2 relative">
        <div className="flex justify-between items-start">
             <div>
                <div className="flex items-center gap-2 text-subtle mb-1">
                <Calendar size={12} className="text-orange" />
                <p className="text-[10px] font-bold uppercase tracking-widest">{dateString}</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink dark:text-white leading-tight">
                {timeGreeting}, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-gold">{userName}</span>.
                </h2>
             </div>
             <div className="bg-surface dark:bg-stone-800 p-4 pr-6 rounded-full shadow-soft flex items-center gap-4 border border-stone-100 dark:border-stone-700 animate-slide-up scale-110">
                 <div className="w-14 h-14 bg-orange/10 rounded-full flex items-center justify-center text-orange relative">
                     <Flame size={32} fill="currentColor" className="animate-pulse" />
                     <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-stone-800"></div>
                 </div>
                 <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-subtle uppercase">Ofensiva</span>
                     <span className="text-4xl font-black text-ink dark:text-white leading-none tracking-tighter">{progress?.streak || 0} Dias</span>
                 </div>
             </div>
        </div>
        {levelData && (
          <div className="mt-6 flex items-center gap-4 animate-fade-in bg-white/50 dark:bg-stone-900/50 p-4 rounded-3xl backdrop-blur-sm border border-stone-100 dark:border-stone-800">
             <div className="bg-gold p-2 rounded-xl text-ink shadow-sm">
                <Crown size={20} fill="currentColor" />
             </div>
             <div className="flex-1">
                 <div className="flex justify-between text-sm font-black uppercase mb-1.5 text-ink dark:text-white tracking-wider">
                     <span>Nível {levelData.currentLevel}</span>
                     <span className="text-orange">{levelData.currentTitle}</span>
                 </div>
                 <div className="w-full h-3 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden shadow-inner">
                     <div className="h-full bg-gradient-to-r from-gold to-orange rounded-full transition-all duration-1000 relative" style={{ width: `${levelData.progressPercent}%` }}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                     </div>
                 </div>
             </div>
          </div>
        )}
      </div>

      <div className="relative w-full min-h-[26rem] rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-orange/20 flex flex-col border border-white/10">
        <img src={heroImage} alt="Verse Background" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[30s] ease-in-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
        <button onClick={handleRefreshVerse} disabled={isLoadingVerse} className="absolute top-6 right-6 p-2.5 rounded-full bg-black/30 backdrop-blur-md text-white/80 hover:bg-white hover:text-ink transition-all z-20 border border-white/20 active:scale-90">
           <RefreshCw size={18} className={isLoadingVerse ? "animate-spin" : ""} />
        </button>
        <div className="relative z-10 flex flex-col items-center justify-between flex-1 text-center px-6 py-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg mb-4">
             <Sparkles size={12} className="text-gold animate-pulse" />
             <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90">Palavra do Dia</span>
          </div>
          {verse && !isLoadingVerse ? (
            <div className="flex-1 flex flex-col justify-center w-full max-w-2xl animate-fade-in my-2">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white drop-shadow-2xl mb-6 break-words font-medium">"{verse.text}"</p>
              <div className="flex flex-col items-center gap-3">
                 <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80"></div>
                 <p className="font-sans font-bold text-sm tracking-widest text-gold uppercase">{verse.ref}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 w-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white/50 animate-spin" />
            </div>
          )}
          <div className="flex gap-3 w-full max-w-sm justify-center mt-6">
            <button onClick={handleReadChapter} className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl text-white text-xs font-bold transition-all border border-white/10 active:scale-95 shadow-lg">
               <Book size={16} /> Ler Capítulo
            </button>
            <button onClick={handleShareVerse} className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-white text-ink hover:bg-stone-100 rounded-2xl text-xs font-bold transition-all shadow-xl active:scale-95">
               <Share2 size={16} /> Compartilhar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-64">
          <div onClick={() => navigate('/bible')} className="col-span-1 md:col-span-2 row-span-2 bg-surface dark:bg-stone-800 rounded-[2.5rem] p-6 shadow-sm border border-stone-100 dark:border-stone-700 relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange/5 rounded-full blur-3xl -mr-10 -mt-10 transition-colors group-hover:bg-orange/10"></div>
              <div className="flex flex-col justify-between h-full relative z-10">
                 <div className="flex justify-between items-start mb-4">
                     <div className="w-12 h-12 bg-orange/10 text-orange rounded-2xl flex items-center justify-center"><Book size={24} /></div>
                     <div className="bg-paper dark:bg-stone-900 px-3 py-1 rounded-full text-[10px] font-bold text-subtle border border-stone-200 dark:border-stone-700 uppercase">Bíblia</div>
                 </div>
                 <div>
                     <h4 className="font-serif font-bold text-xl text-ink dark:text-white mb-1 group-hover:text-orange transition-colors">Continuar Leitura</h4>
                     <p className="text-xs text-subtle mb-4">Você leu {percentage}% das escrituras.</p>
                     <div className="w-full h-2 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange to-red-500 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                     </div>
                 </div>
              </div>
          </div>
          <div onClick={() => navigate('/worship')} className="col-span-1 md:col-span-2 bg-stone-900 text-white rounded-[2.5rem] p-6 shadow-lg relative overflow-hidden group cursor-pointer flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-900 to-black"></div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gold rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                          <Music size={24} className="text-gold" />
                      </div>
                      <div>
                          <h4 className="font-bold text-lg">Louvor</h4>
                          <p className="text-xs text-stone-400">Atmosfera de Adoração</p>
                      </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><ChevronRight size={18} /></div>
              </div>
          </div>
          <div onClick={() => navigate('/trails')} className="col-span-1 bg-gradient-to-br from-gold to-orange text-white rounded-[2.5rem] p-6 shadow-lg shadow-orange/20 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-40 md:h-auto">
              <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150 group-hover:rotate-12 transition-transform"><Target size={60} /></div>
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"><Target size={20} /></div>
              <div><h4 className="font-bold text-lg leading-none mb-1">Metas</h4><p className="text-[10px] text-white/80 font-medium">Foco Diário</p></div>
          </div>
          {/* Card Especial de WhatsApp/Desabafo */}
          <div onClick={() => {
              const text = encodeURIComponent("Olá, Shalom! Gostaria de uma palavra de sabedoria.");
              window.open(`https://wa.me/551151989852?text=${text}`, '_blank');
          }} className="col-span-1 bg-green-500 text-white rounded-[2.5rem] p-6 shadow-lg shadow-green-500/20 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-40 md:h-auto animate-pulse">
              <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150 group-hover:rotate-12 transition-transform"><HeartHandshake size={60} /></div>
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"><MessageCircle size={20} /></div>
              <div><h4 className="font-bold text-lg leading-none mb-1">Guia</h4><p className="text-[10px] text-white/80 font-medium">Falar Agora</p></div>
          </div>
      </div>

      <div className="-mx-4 md:mx-0 py-4">
        <div className="flex justify-between items-end px-6 md:px-2 mb-4">
           <div><h3 className="text-xl font-bold text-ink dark:text-white font-serif flex items-center gap-2"><Heart className="text-red-500" size={20} fill="currentColor" /> Como está seu coração?</h3></div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-8 px-6 md:px-2 no-scrollbar snap-x items-center">
          <div className="snap-start"><MoodCard mood={Mood.Anxious} icon={<Zap />} active={selectedMood === Mood.Anxious} onClick={() => handleMoodSelect(Mood.Anxious)} /></div>
          <div className="snap-start"><MoodCard mood={Mood.Tired} icon={<Battery />} active={selectedMood === Mood.Tired} onClick={() => handleMoodSelect(Mood.Tired)} /></div>
          <div className="snap-start"><MoodCard mood={Mood.Happy} icon={<Sun />} active={selectedMood === Mood.Happy} onClick={() => handleMoodSelect(Mood.Happy)} /></div>
          <div className="snap-start"><MoodCard mood={Mood.Sad} icon={<CloudRain />} active={selectedMood === Mood.Sad} onClick={() => handleMoodSelect(Mood.Sad)} /></div>
          <div className="snap-start"><MoodCard mood={Mood.Thankful} icon={<Heart />} active={selectedMood === Mood.Thankful} onClick={() => handleMoodSelect(Mood.Thankful)} /></div>
          <div className="snap-start"><MoodCard mood={Mood.Confused} icon={<HelpCircle />} active={selectedMood === Mood.Confused} onClick={() => handleMoodSelect(Mood.Confused)} /></div>
          <div className="snap-start"><MoodCard mood={Mood.Angry} icon={<Frown />} active={selectedMood === Mood.Angry} onClick={() => handleMoodSelect(Mood.Angry)} /></div>
        </div>
      </div>

      <div className="bg-surface dark:bg-stone-900 p-8 rounded-[2.5rem] shadow-card border border-stone-100 dark:border-stone-800 flex items-center gap-8 relative overflow-hidden group">
         <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-orange/5 to-transparent pointer-events-none"></div>
         <div className="w-24 h-24 rounded-2xl bg-orange/10 flex items-center justify-center flex-shrink-0 text-orange border border-orange/10 shadow-sm"><ScrollText size={48} /></div>
         <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-black text-ink dark:text-white text-2xl uppercase tracking-tighter">Meta Diária</h3>
                <span className="text-3xl font-black text-orange bg-orange/10 px-4 py-2 rounded-2xl uppercase tracking-tighter">{dailyCount} de {dailyGoal}</span>
            </div>
            <div className="h-6 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden shadow-inner border border-stone-200 dark:border-stone-700">
                <div className="h-full bg-gradient-to-r from-orange via-gold to-orange rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${dailyProgressPercent}%` }}>
                   {dailyCount >= dailyGoal && <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>}
                </div>
            </div>
            {dailyCount >= dailyGoal && <div className="mt-5 text-base font-black text-green-600 flex items-center gap-2 animate-fade-in bg-green-50 dark:bg-green-900/20 px-5 py-3 rounded-2xl w-fit shadow-sm"><CheckCircle2 size={20} /> Meta alcançada! +50 XP Bônus.</div>}
         </div>
      </div>

      {/* CALL TO ACTION: TRIVIA GAME */}
      <div 
        onClick={() => navigate('/trivia')}
        className="mt-6 w-full relative overflow-hidden rounded-[2.5rem] shadow-2xl cursor-pointer group animate-slide-up"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
        
        <div className="relative z-10 p-8 flex items-center justify-between">
            <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-3 border border-white/10">
                    <Trophy size={12} className="text-yellow-300" /> Game Show
                </div>
                <h3 className="text-3xl font-serif font-black text-white leading-tight mb-2">
                    Desafio Bíblico
                </h3>
                <p className="text-white/80 font-medium text-sm leading-relaxed max-w-xs">
                    Teste seus conhecimentos em temas como: Vida de Jesus, Antigo Testamento e muito mais.
                </p>
                <div className="mt-6 flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
                    Jogar Agora <ArrowRight size={18} />
                </div>
            </div>
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                <Brain size={40} className="text-white" />
            </div>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="pt-4 animate-fade-in">
          <div className="flex justify-between items-end px-2 mb-5">
            <h3 className="text-xl font-bold text-ink dark:text-white font-serif flex items-center gap-2"><Bookmark className="text-gold" size={20} fill="currentColor" /> Minhas Anotações</h3>
            <button onClick={() => setShowAllNotes(!showAllNotes)} className="text-xs font-bold text-subtle hover:text-ink transition-colors uppercase tracking-wider bg-surface dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700">{showAllNotes ? 'Ver menos' : 'Ver todas'}</button>
          </div>
          <div className="grid gap-4">
            {notes.slice(0, showAllNotes ? undefined : 2).map((note) => (
              <div key={note.id} className="bg-surface dark:bg-stone-800 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-700 shadow-sm relative group hover:border-gold/30 transition-colors">
                 <button onClick={(e) => deleteNote(note.id, e)} className="absolute top-5 right-5 p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                 <div className="flex items-center gap-2 mb-3"><span className="text-xs font-bold text-gold uppercase tracking-wider bg-gold/10 px-2 py-1 rounded-md">{note.reference}</span></div>
                 <p className="font-serif text-ink dark:text-stone-200 italic leading-relaxed text-lg mb-6">"{note.text}"</p>
                 <div className="flex items-center justify-between">
                    <button onClick={() => handleStudyVerse(note)} className="flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"><MessageCircle size={14} /> Perguntar ao Guia</button>
                    <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest bg-paper dark:bg-stone-900 px-2 py-1 rounded">{new Date(note.date).toLocaleDateString()}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMood && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4 bg-ink/60 backdrop-blur-md animate-fade-in">
          {isAmenAnimating && (
            <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="absolute text-4xl animate-float-up" style={{left: `${50 + (Math.random() * 60 - 30)}%`, bottom: '20%', animationDelay: `${Math.random() * 0.5}s`, animationDuration: `${1 + Math.random()}s`}}>
                  {['🙏', '✨', '🙌', '🤍', '🕊️'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          )}
          <div className="bg-paper dark:bg-stone-900 md:rounded-[2.5rem] rounded-t-[2.5rem] w-full max-w-md p-0 relative shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto overflow-x-hidden" style={{ boxShadow: "0 -10px 40px rgba(0,0,0,0.3)" }}>
            <div ref={prayerCardRef} className="bg-paper dark:bg-stone-900 md:rounded-t-[2.5rem]">
                <div className="h-48 w-full relative bg-ink md:rounded-t-[2.5rem]">
                    <img src={MOOD_IMAGES[selectedMood]} className="w-full h-full object-cover" alt="Header" crossOrigin="anonymous" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper dark:to-stone-900"></div>
                </div>
                <div className="px-8 pb-8 -mt-16 relative z-10">
                    <div className="flex justify-center mb-6"><div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface dark:bg-stone-800 text-gold shadow-2xl border-4 border-paper dark:border-stone-900"><Heart size={40} fill="currentColor" /></div></div>
                    <div className="text-center mb-8"><h3 className="text-2xl font-serif font-bold text-ink dark:text-white leading-tight">Oração para<br/><span className="text-gold text-3xl">{selectedMood}</span></h3></div>
                    {isLoadingPrayer && !aiPrayer ? (
                    <div className="space-y-4 py-4"><div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4 mx-auto animate-pulse"></div><div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full animate-pulse"></div><div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-5/6 mx-auto animate-pulse"></div><div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-2/3 mx-auto animate-pulse"></div></div>
                    ) : (
                    <div className="text-center animate-fade-in">
                        <div className="relative mb-6"><span className="absolute -top-6 left-0 text-8xl text-gold/10 font-serif leading-none">"</span><p className="text-lg text-brown-dark dark:text-stone-300 leading-loose font-serif italic px-2">{aiPrayer}</p><span className="absolute -bottom-10 right-0 text-8xl text-gold/10 font-serif leading-none">"</span></div>
                        <div className="text-xs text-subtle font-bold uppercase tracking-widest mt-8 mb-2">Shalom App</div>
                    </div>
                    )}
                </div>
            </div>
            <button onClick={() => setSelectedMood(null)} className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 border border-white/10 z-50"><X size={20} /></button>
            <div className="px-8 pb-8 pt-0 flex flex-col gap-3">
                 <div className="flex gap-3">
                    <button onClick={handleDownloadImage} disabled={isLoadingPrayer} className="flex-1 bg-surface dark:bg-stone-800 text-ink dark:text-white py-4 rounded-2xl font-bold text-sm shadow-md border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all flex items-center justify-center gap-2"><Download size={18} /> Salvar</button>
                    <button onClick={handleAmen} disabled={isAmenAnimating} className={`flex-[2] bg-ink dark:bg-gold text-white dark:text-stone-900 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-stone-800 dark:hover:bg-orange transition-all active:scale-[0.98] ${isAmenAnimating ? 'scale-95 opacity-80' : ''}`}>{isAmenAnimating ? 'Amém! 🙏' : 'Amém'}</button>
                 </div>
                 {/* Novo Botão de Desabafo Contextual no Modal */}
                 <button onClick={handleTalkToGuide} className="w-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 py-4 rounded-2xl font-bold text-sm border border-green-200 dark:border-green-800 flex items-center justify-center gap-2 hover:bg-green-100 transition-all"><MessageCircle size={18} /> Preciso desabafar com alguém</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;