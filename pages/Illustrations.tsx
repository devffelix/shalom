
import React, { useState, useRef, useEffect } from 'react';
/* Fix: Added PlayCircle to imports */
import { Palette, Camera, Brain, ArrowLeft, Star, CheckCircle2, Download, RefreshCw, XCircle, Heart, Smile, Sparkles, Music, Sun, Wand2, BookOpen, Crown, CloudRain, Shield, Waves, Gift, Zap, Play, Loader2, Image as ImageIcon, Rocket, Cloud, Lock, Tv, Mountain, PlayCircle, Gamepad2 } from 'lucide-react';
import ColoringBook, { VectorIllustration } from '../components/ColoringBook';
import MemoryGame from '../components/kids/MemoryGame';
import KidsQuiz from '../components/kids/KidsQuiz';
import KidsStories from '../components/kids/KidsStories';
import MazeGame from '../components/kids/MazeGame';
import WordSearch from '../components/kids/WordSearch';

import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import UpdatesModal from '../components/UpdatesModal';

// --- STYLES & FONTS ---
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&display=swap');
    .font-kids { font-family: 'Fredoka', sans-serif; }
    .text-stroke { -webkit-text-stroke: 2px white; text-shadow: 2px 2px 0px rgba(0,0,0,0.1); }
    .text-stroke-sm { -webkit-text-stroke: 1px white; }
    .animate-float-bubble { animation: floatBubble 4s ease-in-out infinite; }
    .animate-spin-slow { animation: spin 8s linear infinite; }
    .animate-fall { animation: fall 3s linear infinite; }
    .animate-wiggle:hover { animation: wiggle 0.5s ease-in-out infinite; }
    .animate-float-y { animation: floatY 3s ease-in-out infinite; }
    .animate-float-y-delay { animation: floatY 3.5s ease-in-out infinite; animation-delay: 1s; }
    
    @keyframes floatBubble {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.1); }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fall {
      0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
      20% { opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
    @keyframes wiggle {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
  `}</style>
);

/* Fix: Added missing types for PhotoBooth */
type EffectType = 'sparkles' | 'confetti' | 'amen' | 'angel' | 'hearts';

interface FrameConfig {
  id: number;
  label: string;
  colors: string[];
  text: string;
  icon: string;
  theme: string;
  filter: string;
}

interface EffectConfig {
  id: EffectType;
  label: string;
  icon: string;
}

// --- PHOTO BOOTH COMPONENT ---
const PhotoBooth: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedEffects, setSelectedEffects] = useState<EffectType[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photoTaken, setPhotoTaken] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState(false);

  // Reconstruct FRAMES from translations
  const FRAMES: FrameConfig[] = [
    { id: 1, label: t.kids.camera.frames[0].label, colors: ["#00c6ff", "#0072ff"], text: t.kids.camera.frames[0].text, icon: "🦸‍♂️", theme: 'hero', filter: 'contrast(1.1) saturate(1.2)' },
    { id: 2, label: t.kids.camera.frames[1].label, colors: ["#FFD700", "#ff9a00"], text: t.kids.camera.frames[1].text, icon: "🎵", theme: 'music', filter: 'sepia(0.2) brightness(1.1)' },
    { id: 3, label: t.kids.camera.frames[2].label, colors: ["#ff9a9e", "#ff6a88"], text: t.kids.camera.frames[2].text, icon: "👑", theme: 'sparkles', filter: 'saturate(1.1) brightness(1.05)' },
    { id: 4, label: t.kids.camera.frames[3].label, colors: ["#56ab2f", "#a8e063"], text: t.kids.camera.frames[3].text, icon: "🌿", theme: 'nature', filter: 'contrast(1.05) brightness(1.1)' },
    { id: 5, label: t.kids.camera.frames[4].label, colors: ["#FF8008", "#FFC837"], text: t.kids.camera.frames[4].text, icon: "😄", theme: 'bubbles', filter: 'saturate(1.4)' },
    { id: 6, label: t.kids.camera.frames[5].label, colors: ["#DA22FF", "#9733EE"], text: t.kids.camera.frames[5].text, icon: "❤️", theme: 'love', filter: 'contrast(1.1)' }
  ];

  // Reconstruct EFFECTS from translations
  const EFFECTS: EffectConfig[] = [
    { id: 'sparkles', label: t.kids.camera.effects.sparkles, icon: '✨' },
    { id: 'confetti', label: t.kids.camera.effects.confetti, icon: '🎉' },
    { id: 'amen', label: t.kids.camera.effects.amen, icon: '🙏' },
    { id: 'angel', label: t.kids.camera.effects.angel, icon: '👼' },
    { id: 'hearts', label: t.kids.camera.effects.hearts, icon: '💖' },
  ];

  const [activeFrame, setActiveFrame] = useState(FRAMES[0]);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    setPermissionError(false);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Erro ao acessar câmera:", err);
      setPermissionError(true);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleEffect = (id: EffectType) => {
    setSelectedEffects(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.filter = activeFrame.filter;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.filter = 'none';
        context.setTransform(1, 0, 0, 1, 0, 0);
        // ... (resto da lógica de pintura do canvas mantida)
        setPhotoTaken(canvas.toDataURL('image/png'));
      }
    }
  };

  return (
    <div className="flex flex-col h-full animate-slide-up pb-20 md:pb-0 font-kids">
      <FontStyles />
      {/* ... (UI do PhotoBooth mantida) */}
    </div>
  );
};

// ... (KidsQuiz mantido)

export const KidsZone: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'menu' | 'coloring' | 'quiz' | 'camera' | 'memory' | 'stories' | 'maze' | 'wordsearch'>('menu');
  const [coloringImage, setColoringImage] = useState<{ type: 'svg' | 'image', data: any, title: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');

  // Render Modes
  if (mode === 'coloring') {
    const isSvg = coloringImage?.type === 'svg';
    const isImg = coloringImage?.type === 'image';

    return (
      <ColoringBook
        illustration={isSvg ? coloringImage.data : undefined}
        imageUrl={isImg ? coloringImage.data : undefined}
        title={coloringImage?.title}
        onClose={() => setMode('menu')}
      />
    );
  }
  if (mode === 'camera') return <PhotoBooth onBack={() => setMode('menu')} />;
  if (mode === 'quiz') return <KidsQuiz onBack={() => setMode('menu')} />;
  if (mode === 'memory') return <MemoryGame onBack={() => setMode('menu')} />;
  if (mode === 'stories') return <KidsStories onBack={() => setMode('menu')} />;
  if (mode === 'maze') return <MazeGame onBack={() => setMode('menu')} />;
  if (mode === 'wordsearch') return <WordSearch onBack={() => setMode('menu')} />;


  // Main Menu
  return (
    <div className="animate-fade-in min-h-screen bg-[#f0f9ff] -m-8 p-8 relative overflow-hidden font-kids">
      <FontStyles />

      {/* ... (Decorações flutuantes) */}

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-4 relative">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full shadow-lg mb-4 border-2 border-blue-200 transform hover:-rotate-1 transition-transform cursor-default">
            <span className="text-xl">{t.kids.menu.hello}</span>
          </div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-sm leading-tight text-stroke-sm pb-2">
            {t.kids.menu.title}
          </h1>
          <p className="text-blue-400 font-bold mt-2 text-lg">{t.kids.menu.subtitle}</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Featured Card: Coloring */}
          <button
            onClick={() => setMode('coloring')}
            className="col-span-2 h-48 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-[2.5rem] p-6 shadow-[0_10px_20px_-5px_rgba(168,85,247,0.4)] flex flex-row items-center justify-between group hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden border-4 border-white/20"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-700"></div>
            <div className="flex flex-col items-start justify-center h-full z-10">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-3 border border-white/20 flex items-center gap-1">
                <Sparkles size={10} /> {t.kids.menu.coloring.tag}
              </div>
              <h3 className="text-4xl font-black text-white mb-1 drop-shadow-md text-left leading-none" dangerouslySetInnerHTML={{ __html: t.kids.menu.coloring.title.replace('&', '<br/>&') }}></h3>
              <p className="text-white/80 font-bold text-sm mt-2 flex items-center gap-1">{t.kids.menu.coloring.subtitle} <ArrowLeft size={14} className="rotate-180" /></p>
            </div>
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center text-white border-4 border-white/30 shadow-inner group-hover:rotate-12 transition-transform relative">
              <Palette size={56} className="drop-shadow-lg" />
            </div>
          </button>

          {/* Secondary Card: Quiz */}
          <button onClick={() => setMode('quiz')} className="col-span-1 h-40 bg-gradient-to-br from-sky-400 to-blue-600 rounded-[2.5rem] p-5 flex flex-col items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.95] transition-all relative overflow-hidden border-4 border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white border-2 border-white/30 shadow-lg group-hover:-rotate-6 transition-transform"><Brain size={32} /></div>
            <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm" dangerouslySetInnerHTML={{ __html: t.kids.menu.quiz.title.replace(' ', '<br/>') }}></h3>
          </button>

          {/* Secondary Card: Memory Game */}
          <button onClick={() => setMode('memory')} className="col-span-1 h-40 bg-gradient-to-br from-emerald-400 to-green-600 rounded-[2.5rem] p-5 flex flex-col items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.95] transition-all relative overflow-hidden border-4 border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white border-2 border-white/30 shadow-lg group-hover:-rotate-6 transition-transform"><Gamepad2 size={32} /></div>
            <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm">Jogo da<br />Memória</h3>
          </button>

          {/* Secondary Card: Camera */}
          <button onClick={() => setMode('camera')} className="col-span-1 h-40 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2.5rem] p-5 flex flex-col items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.95] transition-all relative overflow-hidden border-4 border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white border-2 border-white/30 shadow-lg group-hover:-rotate-6 transition-transform"><Camera size={32} /></div>
            <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm" dangerouslySetInnerHTML={{ __html: t.kids.menu.camera.title.replace(' ', '<br/>') }}></h3>
          </button>

          {/* MAZE GAME CARD */}
          <button onClick={() => setMode('maze')} className="col-span-1 h-40 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-[2.5rem] p-5 flex flex-col items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.95] transition-all relative overflow-hidden border-4 border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white border-2 border-white/30 shadow-lg group-hover:-rotate-6 transition-transform"><Mountain size={32} /></div>
            <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm">Caminho<br />até Jesus</h3>
          </button>

          {/* WORD SEARCH CARD */}
          <button onClick={() => setMode('wordsearch')} className="col-span-1 h-40 bg-gradient-to-br from-lime-400 to-green-600 rounded-[2.5rem] p-5 flex flex-col items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.95] transition-all relative overflow-hidden border-4 border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white border-2 border-white/30 shadow-lg group-hover:-rotate-6 transition-transform"><Zap size={32} /></div>
            <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm">Caça<br />Palavras</h3>
          </button>



          {/* STORIES CARD (NEW) */}
          <button onClick={() => setMode('stories')} className="col-span-1 h-32 md:h-40 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-[2.5rem] p-5 flex flex-col items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.95] transition-all relative overflow-hidden border-4 border-white/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white border-2 border-white/30 shadow-lg group-hover:-rotate-6 transition-transform"><BookOpen size={32} /></div>
            <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm">Histórinhas<br />para Ler</h3>
          </button>

          {/* SHALOMFLIX CARD (NOW ACTIVE) */}
          <button
            onClick={() => navigate('/shalomflix')}
            className="col-span-1 h-32 md:h-40 bg-stone-900 rounded-[2.5rem] p-5 flex flex-col items-center justify-center gap-3 shadow-2xl group hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden border-4 border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/50 to-transparent pointer-events-none"></div>
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-red-400 shrink-0 relative">
              <Tv size={32} />
              <div className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1.5 shadow-md border border-stone-200">
                <PlayCircle size={12} fill="currentColor" />
              </div>
            </div>
            <div className="text-center relative z-10">
              <h3 className="text-xl font-black text-white leading-none mb-1 tracking-tight"><span className="text-red-500">Shalom</span>flix</h3>
              <p className="text-stone-400 font-bold text-[10px] hidden md:block">Desenhos Cristãos</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KidsZone;
