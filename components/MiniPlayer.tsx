import React from 'react';
import { useAudio } from '../contexts/AudioContext';
import { Play, Pause, X, Music, Volume2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const MiniPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, closePlayer, progress, duration } = useAudio();
  const location = useLocation();

  // Don't show mini player on Worship page (it has the full player)
  // or if no song is loaded
  if (!currentSong || location.pathname === '/worship') return null;

  const percentage = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-up w-full max-w-[320px] md:max-w-xs">
      <div className="bg-gradient-to-br from-orange/90 to-red-500/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden group">
        
        {/* Progress Bar Background */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-black/10 w-full">
           <div className="h-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300" style={{ width: `${percentage}%` }}></div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
            {/* Vinyl Icon Animation */}
            <div className={`w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20 ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`}>
                <Music size={16} className="text-white" />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate text-white shadow-sm">{currentSong.title}</h4>
                <p className="text-xs text-white/80 truncate font-medium">{currentSong.artist}</p>
            </div>

            <div className="flex items-center gap-2">
                <button 
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-white text-orange shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
                >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                </button>
                <button 
                  onClick={closePlayer}
                  className="p-1.5 text-white/70 hover:text-white transition-colors bg-black/10 rounded-full hover:bg-black/20"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;