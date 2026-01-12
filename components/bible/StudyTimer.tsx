
import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, Square, GripHorizontal, Minimize2 } from 'lucide-react';

interface StudyTimerProps {
  isActive: boolean;
  isPaused: boolean;
  timeSeconds: number;
  onTogglePause: () => void;
  onStop: () => void;
  initialPosition?: { x: number, y: number };
}

const StudyTimer: React.FC<StudyTimerProps> = ({
  isActive,
  isPaused,
  timeSeconds,
  onTogglePause,
  onStop,
  initialPosition = { x: 20, y: window.innerHeight - 220 }
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleWindowMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      const x = Math.max(0, Math.min(clientX - dragOffset.x, window.innerWidth - 60));
      const y = Math.max(0, Math.min(clientY - dragOffset.y, window.innerHeight - 60));
      
      setPosition({ x, y });
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

  const formatTime = (ts: number) => { 
      const h = Math.floor(ts / 3600); 
      const m = Math.floor((ts % 3600) / 60); 
      const s = ts % 60; 
      return h > 0 
        ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` 
        : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`; 
  };

  if (!isActive) return null;

  return (
    <div 
        style={{ left: `${position.x}px`, top: `${position.y}px`, cursor: isDragging ? 'grabbing' : 'auto', touchAction: 'none' }} 
        className={`fixed z-50 transition-all duration-75 ${isDragging ? 'scale-105' : ''}`}
    >
        {isMinimized ? (
            <div 
                className="relative" 
                onMouseDown={(e) => {setIsDragging(true); setDragOffset({x: e.clientX - position.x, y: e.clientY - position.y});}} 
                onTouchStart={(e) => {setIsDragging(true); setDragOffset({x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y});}}
            >
                <button onClick={() => setIsMinimized(false)} className="w-16 h-16 rounded-full bg-stone-900 border-2 border-gold text-white shadow-2xl flex flex-col items-center justify-center gap-0.5">
                    <Timer size={18} className={!isPaused ? "animate-pulse text-gold" : "text-stone-400"} />
                    <span className="text-[10px] font-mono font-bold">{formatTime(timeSeconds)}</span>
                </button>
            </div>
        ) : (
            <div className="bg-stone-900 text-white rounded-3xl p-4 shadow-2xl border border-stone-700/50 w-[300px] md:w-[320px]">
                <div 
                    className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 cursor-grab" 
                    onMouseDown={(e) => {setIsDragging(true); setDragOffset({x: e.clientX - position.x, y: e.clientY - position.y});}} 
                    onTouchStart={(e) => {setIsDragging(true); setDragOffset({x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y});}}
                >
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
                        <GripHorizontal size={14} /> <span>Mover</span>
                    </div>
                    <button onClick={() => setIsMinimized(true)} className="p-1 text-stone-400 hover:text-white">
                        <Minimize2 size={16} />
                    </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${!isPaused ? 'bg-gradient-to-br from-green-500 to-emerald-700 text-white' : 'bg-stone-800 text-stone-500'}`}>
                            <Timer size={24} className={!isPaused ? "animate-pulse" : ""} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-stone-400 tracking-widest mb-0.5">Tempo</p>
                            <p className={`font-mono text-2xl font-bold tabular-nums ${!isPaused ? 'text-white' : 'text-stone-500'}`}>{formatTime(timeSeconds)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={onTogglePause} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPaused ? 'bg-gold text-stone-900' : 'bg-stone-800 text-white'}`}>
                            {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor"/>}
                        </button>
                        <button onClick={onStop} className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-colors">
                            <Square size={16} fill="currentColor"/>
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default StudyTimer;
