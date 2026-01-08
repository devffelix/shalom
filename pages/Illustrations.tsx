
import React, { useState, useRef, useEffect } from 'react';
import { Palette, Camera, Brain, ArrowLeft, Star, CheckCircle2, Download, RefreshCw, XCircle, Heart, Smile, Sparkles, Music, Sun, Wand2, BookOpen, Crown, CloudRain, Shield, Waves, Gift, Zap, Play, Loader2, Image as ImageIcon, Rocket, Cloud } from 'lucide-react';
import ColoringBook, { VectorIllustration } from '../components/ColoringBook';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';

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

// --- INTERFACES ---
interface QuizTheme {
  id: string;
  title: string;
  icon: any; 
  color: string;
  gradient: string;
  questions: { q: string; options: string[]; a: string }[];
}

type FrameTheme = 'bubbles' | 'sparkles' | 'music' | 'nature' | 'hero' | 'love';

interface FrameConfig {
  id: number;
  label: string;
  colors: string[]; 
  text: string;
  icon: string;
  theme: FrameTheme;
  filter: string; 
}

type EffectType = 'sparkles' | 'confetti' | 'amen' | 'angel' | 'hearts';

interface EffectConfig {
  id: EffectType;
  label: string;
  icon: string;
}

// --- HELPERS ---
const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

const drawBubble = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.3;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x - r*0.3, y - r*0.3, r*0.2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fill();
  ctx.globalAlpha = 1.0;
};

const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
};

const drawTextSticker = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, fontSize: number, rotateDeg: number = 0) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotateDeg * Math.PI / 180);
    ctx.font = `900 ${fontSize}px 'Fredoka', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 8;
    ctx.strokeText(text, 0, 0);
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    ctx.restore();
};

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
    { id: 3, label: t.kids.camera.frames[2].label, colors: ["#ff9a9e", "#ff6a88"], text: t.kids.camera.frames[2].text, icon: "👑", theme: 'sparkles', filter: 'saturate(1.1) brightness(1.05)'},
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

  const renderDecorationsOnCanvas = (ctx: CanvasRenderingContext2D, w: number, h: number, theme: FrameTheme) => {
      if (theme === 'bubbles' || theme === 'nature') {
          const bubbles = [
              {x: w*0.1, y: h*0.1, r: 40}, {x: w*0.9, y: h*0.2, r: 30},
              {x: w*0.15, y: h*0.8, r: 50}, {x: w*0.85, y: h*0.85, r: 35},
              {x: w*0.05, y: h*0.5, r: 20}, {x: w*0.95, y: h*0.4, r: 25}
          ];
          bubbles.forEach(b => drawBubble(ctx, b.x, b.y, b.r, activeFrame.colors[0]));
      }

      if (theme === 'sparkles' || theme === 'hero' || theme === 'love') {
          const stars = [
              {x: w*0.1, y: h*0.15, r: 20}, {x: w*0.85, y: h*0.1, r: 30},
              {x: w*0.1, y: h*0.85, r: 25}, {x: w*0.9, y: h*0.8, r: 15}
          ];
          stars.forEach(s => drawStar(ctx, s.x, s.y, 5, s.r, s.r/2, "#FFD700"));
      }
  };

  const renderEffectsOnCanvas = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (selectedEffects.includes('confetti')) {
          const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
          for (let i = 0; i < 50; i++) {
              ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
              ctx.beginPath();
              const x = (Math.sin(i) * 0.5 + 0.5) * w; 
              const y = (Math.cos(i * 12) * 0.5 + 0.5) * h;
              ctx.arc(x, y, 8, 0, Math.PI * 2);
              ctx.fill();
          }
      }
      if (selectedEffects.includes('sparkles')) {
          for (let i = 0; i < 20; i++) {
              const x = (Math.cos(i * 5) * 0.4 + 0.5) * w;
              const y = (Math.sin(i * 7) * 0.4 + 0.5) * h;
              drawStar(ctx, x, y, 4, 15, 5, "#FFFFFF");
          }
      }
      if (selectedEffects.includes('amen')) {
          drawTextSticker(ctx, t.kids.camera.effects.amen, w * 0.8, h * 0.75, "#FFD700", 100, -10);
      }
      if (selectedEffects.includes('angel')) {
          ctx.beginPath();
          ctx.ellipse(w/2, h/3, 100, 30, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "#FFD700";
          ctx.lineWidth = 10;
          ctx.stroke();
          ctx.font = "150px serif";
          ctx.textAlign = "center";
          ctx.fillText("🕊️", w*0.2, h*0.4);
          ctx.fillText("🕊️", w*0.8, h*0.4);
      }
      if (selectedEffects.includes('hearts')) {
          const heartPositions = [{x: 0.2, y: 0.2}, {x: 0.8, y: 0.2}, {x: 0.5, y: 0.15}];
          ctx.font = "80px sans-serif";
          heartPositions.forEach(pos => {
              ctx.fillText("💖", pos.x * w, pos.y * h);
          });
      }
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

        const borderSize = 40;
        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, activeFrame.colors[0]);
        gradient.addColorStop(1, activeFrame.colors[1]);
        
        context.lineWidth = borderSize;
        context.strokeStyle = gradient;
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.lineWidth = 4;
        context.strokeStyle = "white";
        context.setLineDash([15, 15]);
        context.strokeRect(borderSize/2, borderSize/2, canvas.width - borderSize, canvas.height - borderSize);
        context.setLineDash([]);

        renderDecorationsOnCanvas(context, canvas.width, canvas.height, activeFrame.theme);
        renderEffectsOnCanvas(context, canvas.width, canvas.height);

        const bannerHeight = 120;
        const bannerY = canvas.height - bannerHeight - 20;
        
        context.save();
        context.shadowColor = "rgba(0,0,0,0.3)";
        context.shadowBlur = 10;
        context.fillStyle = gradient;
        drawRoundedRect(context, 40, bannerY, canvas.width - 80, bannerHeight, 40);
        context.fill();
        context.strokeStyle = "white";
        context.lineWidth = 5;
        context.stroke();
        context.restore();

        context.fillStyle = "white";
        context.font = "bold 50px 'Fredoka', 'Comic Sans MS', sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.lineWidth = 2;
        context.strokeStyle = "rgba(0,0,0,0.2)";
        context.strokeText(`${activeFrame.icon} ${activeFrame.text} ${activeFrame.icon}`, canvas.width / 2, bannerY + bannerHeight/2);
        context.fillText(`${activeFrame.icon} ${activeFrame.text} ${activeFrame.icon}`, canvas.width / 2, bannerY + bannerHeight/2);

        setPhotoTaken(canvas.toDataURL('image/png'));
      }
    }
  };

  const downloadPhoto = () => {
    if (photoTaken) {
      const link = document.createElement('a');
      link.href = photoTaken;
      link.download = `foto-kids-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="flex flex-col h-full animate-slide-up pb-20 md:pb-0 font-kids">
      <FontStyles />
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-md"><ArrowLeft size={24} className="text-pink-500"/></button>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-sm">{t.kids.camera.title}</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 bg-black rounded-[2.5rem] overflow-hidden relative shadow-2xl border-[6px] border-white ring-4 ring-pink-100 aspect-[3/4] md:aspect-auto mx-auto w-full max-w-md md:max-w-full group">
        {!photoTaken ? (
          <>
            {permissionError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 text-white p-6 text-center">
                    <XCircle size={48} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{t.kids.camera.noCamera}</h3>
                    <p className="text-stone-400">{t.kids.camera.permission}</p>
                    <button onClick={startCamera} className="mt-6 px-6 py-3 bg-blue-500 rounded-full font-bold">{t.kids.camera.retry}</button>
                </div>
            ) : (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100 transition-all duration-300" style={{ filter: activeFrame.filter }} />
            )}
            
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <div className="absolute inset-0 border-[20px] md:border-[30px] transition-colors duration-500" style={{ borderImage: `linear-gradient(to bottom right, ${activeFrame.colors[0]}, ${activeFrame.colors[1]}) 1` }}></div>
               <div className="absolute inset-4 border-4 border-white border-dashed rounded-3xl opacity-50"></div>

               {activeFrame.theme === 'bubbles' && (
                   <>
                     <div className="absolute top-[10%] left-[10%] w-12 h-12 bg-white/30 rounded-full border-2 border-white/60 animate-float-bubble" style={{animationDelay: '0s'}}></div>
                     <div className="absolute bottom-[20%] right-[10%] w-8 h-8 bg-white/20 rounded-full border-2 border-white/60 animate-float-bubble" style={{animationDelay: '1s'}}></div>
                   </>
               )}
               {(activeFrame.theme === 'sparkles' || activeFrame.theme === 'hero') && (
                   <Sparkles className="absolute top-[50%] left-[5%] text-white animate-pulse" size={28} />
               )}

               {selectedEffects.includes('confetti') && (
                   <div className="absolute inset-0 overflow-hidden">
                       {[...Array(10)].map((_, i) => (
                           <div key={i} className="absolute w-2 h-2 rounded-full bg-red-500 animate-fall" style={{ left: `${Math.random()*100}%`, backgroundColor: `hsl(${Math.random()*360}, 100%, 50%)`, animationDelay: `${Math.random()*2}s` }}></div>
                       ))}
                   </div>
               )}
               {selectedEffects.includes('sparkles') && (
                   <div className="absolute inset-0">
                       <Star className="absolute top-1/4 left-1/4 text-white w-6 h-6 animate-pulse" />
                       <Star className="absolute bottom-1/3 right-1/4 text-white w-4 h-4 animate-pulse" style={{animationDelay: '0.5s'}} />
                   </div>
               )}
               {selectedEffects.includes('amen') && (
                   <div className="absolute bottom-32 right-8 transform -rotate-6">
                       <span className="font-black text-4xl text-yellow-400 drop-shadow-[0_2px_0_rgba(0,0,0,0.5)] text-stroke">{t.kids.camera.effects.amen}</span>
                   </div>
               )}
               {selectedEffects.includes('hearts') && (
                   <div className="absolute inset-0">
                       <Heart className="absolute top-10 right-20 text-pink-500 fill-pink-500 w-12 h-12 animate-bounce" />
                       <Heart className="absolute top-20 left-20 text-pink-400 fill-pink-400 w-8 h-8 animate-bounce" style={{animationDelay: '0.3s'}} />
                   </div>
               )}
               {selectedEffects.includes('angel') && (
                   <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-16 border-4 border-yellow-300 rounded-[50%] shadow-[0_0_20px_gold]"></div>
               )}

               <div className="absolute bottom-8 left-6 right-6 h-20 bg-gradient-to-r rounded-full flex items-center justify-center shadow-lg border-4 border-white transform transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, ${activeFrame.colors[0]}, ${activeFrame.colors[1]})` }}>
                  <div className="text-white font-black text-xl md:text-2xl text-center flex items-center gap-3 drop-shadow-md text-stroke">
                      <span className="text-3xl filter drop-shadow-lg">{activeFrame.icon}</span> 
                      {activeFrame.text} 
                      <span className="text-3xl filter drop-shadow-lg">{activeFrame.icon}</span>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <img src={photoTaken} alt="Foto tirada" className="w-full h-full object-contain bg-black" />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {!photoTaken ? (
        <div className="mt-4 space-y-4">
           <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-2 snap-x">
              {FRAMES.map(frame => (
                <button 
                  key={frame.id}
                  onClick={() => setActiveFrame(frame)}
                  className={`
                    flex-shrink-0 snap-center w-16 h-16 rounded-xl flex flex-col items-center justify-center gap-1 transition-all border-2
                    ${activeFrame.id === frame.id 
                        ? 'border-pink-500 ring-2 ring-pink-200 scale-105' 
                        : 'border-white opacity-60'}
                  `}
                  style={{ background: `linear-gradient(135deg, ${frame.colors[0]}, ${frame.colors[1]})` }}
                >
                  <div className="text-2xl drop-shadow-md">{frame.icon}</div>
                </button>
              ))}
           </div>

           <div className="flex gap-2 items-center px-2">
               <div className="bg-purple-100 rounded-full p-1.5"><Wand2 size={16} className="text-purple-600" /></div>
               <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
                   {EFFECTS.map(effect => {
                       const active = selectedEffects.includes(effect.id);
                       return (
                           <button
                                key={effect.id}
                                onClick={() => toggleEffect(effect.id)}
                                className={`
                                    px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all flex items-center gap-1 whitespace-nowrap
                                    ${active ? 'bg-purple-500 border-purple-500 text-white' : 'bg-white border-purple-100 text-stone-500'}
                                `}
                           >
                               {effect.icon} {effect.label}
                           </button>
                       )
                   })}
               </div>
           </div>
           
           <button onClick={takePhoto} className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-3xl font-black text-2xl shadow-xl shadow-pink-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse border-4 border-white/20">
              <Camera size={32} fill="currentColor" /> {t.kids.camera.takePhoto}
           </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
           <button onClick={downloadPhoto} className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-3xl font-black text-xl shadow-lg border-b-8 border-green-700 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-2">
              <Download size={24} /> {t.kids.camera.save}
           </button>
           <button onClick={() => setPhotoTaken(null)} className="w-full py-4 bg-white text-stone-500 rounded-3xl font-bold shadow-sm border-2 border-stone-200 flex items-center justify-center gap-2 hover:bg-stone-50">
              <RefreshCw size={20} /> {t.kids.camera.retake}
           </button>
        </div>
      )}
    </div>
  );
};

// --- KIDS QUIZ COMPONENT ---
const KidsQuiz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const [activeTheme, setActiveTheme] = useState<QuizTheme | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Reconstruct Themes using Translations
  // Icons mapping for Quiz Themes
  const QUIZ_ICONS: Record<string, any> = {
    'creation': Sun,
    'noah': CloudRain,
    'david': Shield,
    'jonah': Waves
  };

  const QUIZ_STYLES: Record<string, {color: string, gradient: string}> = {
    'creation': { color: 'text-yellow-500', gradient: 'from-yellow-400 to-orange-400' },
    'noah': { color: 'text-blue-500', gradient: 'from-blue-400 to-cyan-400' },
    'david': { color: 'text-orange-500', gradient: 'from-orange-400 to-red-400' },
    'jonah': { color: 'text-teal-500', gradient: 'from-teal-400 to-emerald-400' }
  };

  const KIDS_QUIZ_THEMES: QuizTheme[] = t.kids.quiz.themes.map(theme => ({
    ...theme,
    icon: QUIZ_ICONS[theme.id],
    color: QUIZ_STYLES[theme.id].color,
    gradient: QUIZ_STYLES[theme.id].gradient
  }));

  const handleAnswer = (option: string) => {
    if (feedback || !activeTheme) return;
    if (option === activeTheme.questions[index].a) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setTimeout(() => {
      if (index < activeTheme.questions.length - 1) {
        setIndex(i => i + 1);
        setFeedback(null);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
      setActiveTheme(null);
      setIndex(0);
      setScore(0);
      setFinished(false);
      setFeedback(null);
  };

  if (!activeTheme) {
      return (
          <div className="h-full flex flex-col animate-fade-in font-kids pb-20">
              <div className="flex items-center gap-4 mb-6">
                  <button onClick={onBack} className="p-3 bg-white rounded-full shadow-md"><ArrowLeft size={24} className="text-blue-500"/></button>
                  <h2 className="text-3xl font-black text-blue-500 text-stroke-sm">{t.kids.quiz.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto pb-4 no-scrollbar p-2">
                  {KIDS_QUIZ_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme)}
                        className={`
                            relative h-36 rounded-[2.5rem] p-6 text-left transition-all hover:scale-[1.02] active:scale-95 shadow-lg group overflow-hidden border-4 border-white/20
                            bg-gradient-to-br ${theme.gradient}
                        `}
                      >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition-colors"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl -ml-6 -mb-6"></div>
                          <div className="relative z-10 flex justify-between items-center h-full">
                              <div className="flex flex-col justify-center gap-2">
                                  <h3 className="font-black text-2xl md:text-3xl text-white leading-none drop-shadow-md pr-4">{theme.title}</h3>
                                  <div className="flex items-center gap-2">
                                      <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                                          <span className="text-xs font-bold text-white uppercase tracking-wider">{theme.questions.length} {t.kids.quiz.questionsCount}</span>
                                      </div>
                                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                                          <Play size={14} className={`fill-current ${theme.color.replace('text-', 'text-')}`} />
                                      </div>
                                  </div>
                              </div>
                              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center text-white border-2 border-white/30 shadow-xl group-hover:rotate-6 transition-transform">
                                  <theme.icon size={40} />
                              </div>
                          </div>
                      </button>
                  ))}
              </div>
          </div>
      )
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center animate-slide-up bg-white rounded-[3rem] p-8 shadow-xl font-kids">
         <Star size={100} className="text-yellow-400 fill-yellow-400 mb-6 animate-spin-slow drop-shadow-lg" />
         <h2 className="text-5xl font-black text-blue-500 mb-2 text-stroke-sm">{t.kids.quiz.congrats}</h2>
         <p className="text-xl text-stone-500 mb-8 font-bold">{t.kids.quiz.correct.replace('{score}', score.toString()).replace('{total}', activeTheme.questions.length.toString())}</p>
         <div className="flex flex-col w-full gap-3">
             <button onClick={handleRestart} className="w-full py-4 bg-green-500 text-white rounded-3xl font-black text-xl shadow-lg border-b-8 border-green-700 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-2">
                <RefreshCw size={24} /> {t.kids.quiz.playAgain}
             </button>
             <button onClick={onBack} className="w-full py-4 bg-blue-500 text-white rounded-3xl font-black text-xl shadow-lg border-b-8 border-blue-700 active:border-b-0 active:translate-y-2 transition-all">
                {t.kids.quiz.exit}
             </button>
         </div>
      </div>
    )
  }

  const q = activeTheme.questions[index];

  return (
    <div className="h-full flex flex-col animate-slide-up font-kids">
       <div className="flex justify-between items-center mb-6">
          <button onClick={() => setActiveTheme(null)} className="p-3 bg-white rounded-full shadow-md hover:scale-110 transition-transform"><ArrowLeft size={28} className="text-blue-500"/></button>
          <div className="bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-black text-sm border-2 border-blue-200">
             {t.kids.quiz.question} {index + 1}/{activeTheme.questions.length}
          </div>
          <div className="w-12"></div>
       </div>

       <div className="flex-1 flex flex-col justify-center">
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border-4 border-blue-100 mb-8 text-center relative overflow-hidden group">
             <div className={`absolute top-0 left-0 w-full h-4 bg-gradient-to-r ${activeTheme.gradient}`}></div>
             {feedback === 'correct' && <div className="absolute inset-0 bg-green-400/90 flex items-center justify-center z-10 animate-fade-in backdrop-blur-sm"><CheckCircle2 size={80} className="text-white drop-shadow-lg"/></div>}
             {feedback === 'wrong' && <div className="absolute inset-0 bg-red-400/90 flex items-center justify-center z-10 animate-fade-in backdrop-blur-sm"><XCircle size={80} className="text-white drop-shadow-lg"/></div>}
             <h3 className="text-3xl font-black text-stone-700 leading-tight py-4">{q.q}</h3>
          </div>

          <div className="space-y-4">
             {q.options.map((opt) => (
               <button 
                 key={opt}
                 onClick={() => handleAnswer(opt)}
                 className="w-full p-5 bg-white border-4 border-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-3xl font-black text-xl shadow-sm transition-all active:scale-95"
               >
                 {opt}
               </button>
             ))}
          </div>
       </div>
    </div>
  );
};

// --- MAIN KIDS ZONE COMPONENT ---

export const KidsZone: React.FC = () => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'menu' | 'coloring' | 'quiz' | 'camera'>('menu');
  const [coloringImage, setColoringImage] = useState<{ type: 'svg' | 'image', data: any, title: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');

  // Drawing Ideas with Icons map
  const IDEA_ICONS: Record<string, string> = {
    'lion': '🦁', 'whale': '🐳', 'ark': '🚢', 'shepherd': '🐑',
    'david': '🪨', 'angel': '👼', 'creation': '🌍', 'nativity': '⭐'
  };

  const DRAWING_IDEAS = t.kids.coloring.ideas.map(idea => ({
    ...idea,
    icon: IDEA_ICONS[idea.id]
  }));

  const handleGenerateImage = async (customPrompt?: string) => {
    const textToUse = customPrompt || prompt;
    if (!textToUse.trim()) return;
    
    setIsGenerating(true);
    setPrompt(textToUse); // Update input to show what's being generated
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemPrompt = t.kids.coloring.aiPrompt.replace('{prompt}', textToUse);
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: systemPrompt,
            config: {
                temperature: 0.7
            }
        });

        let foundImage = null;
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    foundImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    break;
                }
            }
        }

        if (!foundImage) {
             alert("O modelo de IA não retornou uma imagem válida. Tente um tema diferente.");
        } else {
             setColoringImage({ type: 'image', data: foundImage, title: textToUse });
        }

    } catch (e) {
        console.error(e);
        alert(t.kids.coloring.error);
    } finally {
        setIsGenerating(false);
    }
  };

  // Coloring Flow
  if (coloringImage) {
    return (
      <ColoringBook 
        illustration={coloringImage.type === 'svg' ? coloringImage.data : undefined}
        imageUrl={coloringImage.type === 'image' ? coloringImage.data : undefined}
        title={coloringImage.title}
        onClose={() => setColoringImage(null)} 
      />
    );
  }

  // Camera Flow
  if (mode === 'camera') {
    return <PhotoBooth onBack={() => setMode('menu')} />;
  }

  // Quiz Flow
  if (mode === 'quiz') {
    return <KidsQuiz onBack={() => setMode('menu')} />;
  }

  // Gallery Flow (Coloring Selection)
  if (mode === 'coloring') {
    return (
      <div className="animate-fade-in pb-20 font-kids">
        <FontStyles />
        <div className="flex items-center gap-4 mb-6">
           <button onClick={() => setMode('menu')} className="p-3 bg-white rounded-full shadow-md"><ArrowLeft size={24} className="text-purple-500"/></button>
           <h2 className="text-3xl font-black text-purple-500">{t.kids.coloring.title}</h2>
        </div>

        {/* AI GENERATOR - ENHANCED VISUAL */}
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 rounded-[3rem] shadow-2xl mb-10 text-white relative overflow-hidden group">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl -ml-12 -mb-12"></div>
            <Sparkles className="absolute top-6 right-8 text-yellow-300 animate-pulse" size={32} />
            <Star className="absolute bottom-8 left-8 text-pink-300 animate-pulse delay-75" size={24} />

            <div className="relative z-10">
                <h3 className="font-black text-3xl mb-3 flex items-center gap-3 drop-shadow-md">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><Wand2 className="text-yellow-300" size={32} /></div>
                    {t.kids.coloring.magicCreator}
                </h3>
                <p className="text-base font-bold text-white/90 mb-6 leading-tight max-w-sm">
                    {t.kids.coloring.magicDesc}
                </p>
                
                <div className="flex gap-3 bg-white/10 p-2 rounded-[1.5rem] backdrop-blur-md border border-white/20">
                    <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t.kids.coloring.placeholder}
                        className="flex-1 rounded-2xl px-6 py-4 bg-white text-purple-900 font-black outline-none placeholder:text-purple-300 shadow-inner text-lg"
                    />
                    <button 
                        onClick={() => handleGenerateImage()}
                        disabled={isGenerating || !prompt.trim()}
                        className="bg-yellow-400 text-purple-900 p-4 rounded-2xl font-black shadow-lg hover:bg-yellow-300 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center w-20 border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1"
                    >
                        {isGenerating ? <Loader2 className="animate-spin w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
                    </button>
                </div>
            </div>
        </div>

        <h3 className="font-black text-2xl text-stone-600 mb-6 px-4 flex items-center gap-2">
            <Palette className="text-pink-500" /> {t.kids.coloring.readyIdeas}
        </h3>
        
        {/* PRESET GALLERY GRID */}
        <div className="grid grid-cols-2 gap-4 px-2">
             {DRAWING_IDEAS.map((idea) => (
                 <button 
                    key={idea.id}
                    onClick={() => handleGenerateImage(idea.prompt)} 
                    disabled={isGenerating}
                    className="bg-white p-5 rounded-[2rem] shadow-lg border-b-8 border-purple-100 active:scale-95 active:border-b-0 active:translate-y-2 transition-all cursor-pointer group flex flex-col items-center gap-3 relative overflow-hidden disabled:opacity-50"
                 >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform animate-wiggle">
                        {idea.icon}
                    </div>
                    <p className="text-center font-black text-stone-600 text-base leading-tight relative z-10">{idea.title}</p>
                 </button>
             ))}
        </div>
      </div>
    );
  }

  // Main Menu - REDESIGNED
  return (
    <div className="animate-fade-in min-h-screen bg-[#f0f9ff] -m-8 p-8 relative overflow-hidden font-kids">
      <FontStyles />
      
      {/* Floating Animated Decorations */}
      <div className="absolute top-10 right-10 opacity-20 animate-float-y pointer-events-none">
          <Cloud size={100} className="text-blue-300 fill-blue-100" />
      </div>
      <div className="absolute bottom-20 left-5 opacity-20 animate-float-y-delay pointer-events-none">
          <Cloud size={80} className="text-purple-300 fill-purple-100" />
      </div>
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-300"></div>

      <div className="relative z-10 max-w-lg mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 mt-4">
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
           
           {/* Featured Card: Coloring (Full Width) */}
           <button 
             onClick={() => setMode('coloring')}
             className="col-span-2 h-48 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-[2.5rem] p-6 shadow-[0_10px_20px_-5px_rgba(168,85,247,0.4)] flex flex-row items-center justify-between group hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden border-4 border-white/20"
           >
              {/* Background Shapes */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-125 transition-transform duration-700"></div>
              
              <div className="flex flex-col items-start justify-center h-full z-10">
                 <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-3 border border-white/20 flex items-center gap-1">
                    <Sparkles size={10} /> {t.kids.menu.coloring.tag}
                 </div>
                 <h3 className="text-4xl font-black text-white mb-1 drop-shadow-md text-left leading-none" dangerouslySetInnerHTML={{__html: t.kids.menu.coloring.title.replace('&', '<br/>&')}}></h3>
                 <p className="text-white/80 font-bold text-sm mt-2 flex items-center gap-1">
                    {t.kids.menu.coloring.subtitle} <ArrowLeft size={14} className="rotate-180" />
                 </p>
              </div>

              <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center text-white border-4 border-white/30 shadow-inner group-hover:rotate-12 transition-transform relative">
                 <Palette size={56} className="drop-shadow-lg" />
                 <div className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-black px-3 py-1 rounded-full border-2 border-white shadow-lg animate-bounce">
                    {t.kids.menu.coloring.new}
                 </div>
              </div>
           </button>

           {/* Secondary Card: Quiz */}
           <button 
             onClick={() => setMode('quiz')}
             className="col-span-1 h-40 bg-gradient-to-br from-sky-400 to-blue-600 rounded-[2.5rem] p-5 shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)] flex flex-col items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.95] transition-all relative overflow-hidden border-4 border-white/20"
           >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white border-2 border-white/30 shadow-lg group-hover:-rotate-6 transition-transform">
                 <Brain size={32} />
              </div>
              <div className="text-center z-10">
                 <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm" dangerouslySetInnerHTML={{__html: t.kids.menu.quiz.title.replace(' ', '<br/>')}}></h3>
              </div>
           </button>

           {/* Secondary Card: Camera */}
           <button 
             onClick={() => setMode('camera')}
             className="col-span-1 h-40 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2.5rem] p-5 shadow-[0_10px_20px_-5px_rgba(251,191,36,0.4)] flex flex-col items-center justify-center gap-3 group hover:scale-[1.03] active:scale-[0.95] transition-all relative overflow-hidden border-4 border-white/20"
           >
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white border-2 border-white/30 shadow-lg group-hover:rotate-6 transition-transform">
                 <Camera size={32} />
              </div>
              <div className="text-center z-10">
                 <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm" dangerouslySetInnerHTML={{__html: t.kids.menu.camera.title.replace(' ', '<br/>')}}></h3>
              </div>
           </button>
        </div>

        {/* Decorative Footer */}
        <div className="mt-8 flex justify-center opacity-60">
            <p className="text-blue-300 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <Rocket size={14} /> {t.kids.menu.explore}
            </p>
        </div>
      </div>
    </div>
  );
};
