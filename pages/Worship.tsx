
import React, { useState, useEffect } from 'react';
import { SongSuggestion } from '../types';
import { useAudio } from '../contexts/AudioContext';
import { Music, Search, Play, Pause, AlertCircle, Volume2, VolumeX, BarChart3, SkipBack, SkipForward, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Worship: React.FC = () => {
  const { t } = useLanguage();
  const [topic, setTopic] = useState('');
  const [songs, setSongs] = useState<SongSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  // Global Audio Context
  const { currentSong, isPlaying, playSong, togglePlay, progress, duration, seek, volume, setVolume } = useAudio();

  // Initial load of all songs (now from translations)
  useEffect(() => {
    handleSearch('');
  }, [t]); // Reload when language changes

  const handleSearch = (query: string) => {
    setLoading(true);
    // Filter local translated songs instead of calling API which had hardcoded data
    const allSongs = t.songsList || []; 
    
    if (!query || query.trim() === '') {
        setSongs(allSongs);
    } else {
        const lowerQuery = query.toLowerCase();
        const results = allSongs.filter(song => 
            song.title.toLowerCase().includes(lowerQuery) || 
            song.artist.toLowerCase().includes(lowerQuery) ||
            song.reason.toLowerCase().includes(lowerQuery)
        );
        setSongs(results);
    }
    setLoading(false);
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-stone-900 to-black dark:from-stone-900 dark:to-black rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-card">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full mix-blend-overlay filter blur-[80px] opacity-20"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-gold backdrop-blur-md">
            <Music size={24} />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-2">{t.worship.title}</h2>
          <p className="text-stone-300 max-w-sm">
            {t.worship.subtitle}
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input 
          type="text" 
          placeholder={t.worship.searchPlaceholder}
          className="w-full p-6 pl-14 bg-surface dark:bg-stone-800 rounded-[2rem] shadow-soft border-2 border-transparent focus:border-gold outline-none text-lg font-medium text-ink dark:text-white placeholder-stone-400 transition-all"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={24} />
      </div>

      {/* Active Player Controls (Premium Design) */}
      {currentSong && (
        <div className="sticky top-4 z-40 animate-slide-up mb-8">
           <div className="bg-surface/95 dark:bg-stone-900/95 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl border border-stone-200 dark:border-white/10 text-ink dark:text-white relative overflow-hidden transition-colors duration-300">
              
              {/* Background Glows */}
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-gold/10 dark:bg-gold/20 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-orange/10 dark:bg-orange/20 rounded-full blur-[80px]"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                 
                 {/* Album Art & Visualizer */}
                 <div className="relative flex-shrink-0">
                    <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full bg-stone-900 border-4 border-gold/20 flex items-center justify-center relative shadow-2xl ${isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''}`}>
                       <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                       <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-orange flex items-center justify-center shadow-inner">
                          <Music size={16} className="text-white drop-shadow-md" />
                       </div>
                    </div>
                    {/* Playing Indicator Badge */}
                    {isPlaying && (
                       <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-surface dark:border-ink flex items-center gap-1 shadow-lg">
                          <BarChart3 size={10} className="animate-pulse" /> {t.worship.playing}
                       </div>
                    )}
                 </div>

                 {/* Info & Timeline */}
                 <div className="flex-1 w-full flex flex-col justify-center text-center md:text-left min-w-0">
                    <h3 className="font-serif font-bold text-2xl text-ink dark:text-white truncate drop-shadow-sm">{currentSong.title}</h3>
                    <p className="text-orange dark:text-gold/80 font-medium text-sm truncate mb-4 tracking-wide uppercase">{currentSong.artist}</p>
                    
                    {/* Custom Timeline Slider */}
                    <div className="w-full flex items-center gap-3">
                        <span className="text-xs font-mono text-subtle w-10 text-right">{formatTime(progress)}</span>
                        <div className="relative flex-1 h-6 flex items-center group">
                            <div className="absolute w-full h-1.5 bg-stone-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-gold to-orange rounded-full relative" 
                                    style={{width: `${(progress / (duration || 1)) * 100}%`}}
                                >
                                    {/* Animated shimmer on progress bar */}
                                    {isPlaying && <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite]"></div>}
                                </div>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max={duration || 100} 
                                value={progress}
                                onChange={(e) => seek(parseFloat(e.target.value))}
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                            />
                            {/* Visual Thumb (Follows progress) */}
                            <div 
                                className="absolute h-4 w-4 bg-white rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)] pointer-events-none transition-all group-hover:scale-125 border border-stone-100 dark:border-none"
                                style={{left: `${(progress / (duration || 1)) * 100}%`, transform: 'translateX(-50%)'}}
                            ></div>
                        </div>
                        <span className="text-xs font-mono text-subtle w-10 text-left">{formatTime(duration)}</span>
                    </div>
                 </div>

                 {/* Playback Controls */}
                 <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end px-4 md:px-0">
                    {/* Volume */}
                    <div className="hidden md:flex items-center gap-2 group bg-stone-100 dark:bg-black/20 px-3 py-2 rounded-full border border-stone-200 dark:border-white/5 backdrop-blur-sm transition-colors">
                       <button onClick={() => setVolume(volume === 0 ? 1 : 0)}>
                           {volume === 0 ? <VolumeX size={16} className="text-subtle"/> : <Volume2 size={16} className="text-gold"/>}
                       </button>
                       <div className="w-16 h-1 bg-stone-300 dark:bg-stone-600 rounded-full relative">
                          <div className="absolute h-full bg-ink dark:bg-white rounded-full" style={{width: `${volume * 100}%`}}></div>
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                       </div>
                    </div>

                    <div className="flex items-center gap-4 mx-auto md:mx-0">
                        <button className="p-2 text-stone-400 hover:text-ink dark:hover:text-white transition-colors" disabled>
                            <SkipBack size={20} />
                        </button>
                        
                        <button 
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold to-orange text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange/30 border-2 border-white/10"
                        >
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                        </button>

                        <button className="p-2 text-stone-400 hover:text-ink dark:hover:text-white transition-colors" disabled>
                            <SkipForward size={20} />
                        </button>
                    </div>

                    {/* Mobile Volume Toggle (Optional) */}
                    <button className="md:hidden text-stone-400" onClick={() => setVolume(volume === 0 ? 1 : 0)}>
                         {volume === 0 ? <VolumeX size={20}/> : <Volume2 size={20}/>}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Results List */}
      <div className="space-y-4 pb-20">
        <h3 className="text-lg font-bold text-ink dark:text-white px-2 mb-4 font-serif">{t.worship.libraryTitle}</h3>
        {songs.map((song) => (
          <div key={song.id} className={`
             group rounded-[2rem] border transition-all duration-300 overflow-hidden relative cursor-pointer
             ${currentSong?.id === song.id 
                ? 'bg-ink dark:bg-stone-800 border-gold shadow-lg transform scale-[1.01]' 
                : 'bg-surface dark:bg-stone-800/50 border-stone-100 dark:border-stone-800 hover:border-gold/50 shadow-soft'}
          `}>
             <div 
                className="p-5 flex items-center gap-5"
                onClick={() => playSong(song)}
             >
                {/* Visualizer / Play Icon Box */}
                <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all flex-shrink-0 relative overflow-hidden
                    ${currentSong?.id === song.id ? 'bg-gradient-to-br from-gold to-orange text-white' : 'bg-stone-100 dark:bg-stone-700 text-stone-400 group-hover:bg-stone-200 dark:group-hover:bg-stone-600'}
                `}>
                    {currentSong?.id === song.id && isPlaying ? (
                         <div className="flex items-end gap-1 h-6">
                            <div className="w-1 bg-white animate-[height_1s_ease-in-out_infinite] h-3"></div>
                            <div className="w-1 bg-white animate-[height_1.5s_ease-in-out_infinite] h-6"></div>
                            <div className="w-1 bg-white animate-[height_0.5s_ease-in-out_infinite] h-4"></div>
                         </div>
                    ) : (
                        <Play size={24} fill="currentColor" className="ml-1" />
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-lg truncate transition-colors ${currentSong?.id === song.id ? 'text-gold' : 'text-ink dark:text-white'}`}>
                        {song.title}
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 font-medium text-sm truncate mb-1">{song.artist}</p>
                    {song.reason && <p className="text-xs text-subtle italic truncate opacity-80">"{song.reason}"</p>}
                    
                    {!song.audioUrl && (
                        <div className="flex items-center gap-1 text-red-400 text-[10px] mt-2 font-bold uppercase tracking-wider">
                            <AlertCircle size={10} /> {t.worship.noAudio}
                        </div>
                    )}
                </div>

                {/* Playing Status Text */}
                {currentSong?.id === song.id && (
                    <div className="hidden md:block px-4 py-1.5 bg-gold/10 text-gold rounded-full text-xs font-bold border border-gold/20">
                        {isPlaying ? t.worship.playing : t.worship.paused}
                    </div>
                )}
             </div>
             
             {/* Progress Bar Background for List Item */}
             {currentSong?.id === song.id && (
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-stone-800">
                     <div 
                        className="h-full bg-gold transition-all duration-300" 
                        style={{width: `${(progress / (duration || 1)) * 100}%`}}
                     ></div>
                 </div>
             )}
          </div>
        ))}
        
        {songs.length === 0 && !loading && (
          <div className="text-center py-12 px-6">
             <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-300">
                <Sparkles size={32} />
             </div>
             <p className="text-subtle font-serif">{t.worship.noResults}</p>
          </div>
        )}

        {loading && (
           <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-60">
              <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-brown font-medium">{t.worship.loading}</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Worship;
