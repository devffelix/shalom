import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AudioContextType, SongSuggestion } from '../types';

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<SongSuggestion | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio Object once
  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);
    const onError = (e: Event) => {
      console.error("Audio error:", e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.pause();
    };
  }, []);

  const playSong = async (song: SongSuggestion) => {
    if (!audioRef.current || !song.audioUrl) return;

    // Handle same song toggle
    if (currentSong?.audioUrl === song.audioUrl) {
      togglePlay();
      return;
    }

    const audio = audioRef.current;

    try {
      // 1. Pause currently playing audio to avoid overlapping requests
      audio.pause();
      
      // 2. Update state
      setCurrentSong(song);
      setIsPlaying(false); // Reset playing state while loading

      // 3. Set new source
      audio.src = song.audioUrl;
      audio.volume = volume;
      audio.load(); // Explicitly load

      // 4. Play with promise handling
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Ignore interruption errors (happens when switching songs quickly)
            if (error.name === 'AbortError' || error.message.includes('interrupted')) {
              // This is expected behavior during rapid song switching
            } else {
              console.error("Playback error:", error);
              setIsPlaying(false);
            }
          });
      }
    } catch (e) {
      console.error("Setup error:", e);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(e => console.error("Resume error:", e));
      }
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const setVolume = (level: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(1, level));
    audioRef.current.volume = clamped;
    setVolumeState(clamped);
  };

  const closePlayer = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentSong(null);
  };

  return (
    <AudioContext.Provider value={{
      currentSong,
      isPlaying,
      progress,
      duration,
      volume,
      playSong,
      togglePlay,
      seek,
      setVolume,
      closePlayer
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};